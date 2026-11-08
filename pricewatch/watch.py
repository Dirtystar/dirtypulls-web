#!/usr/bin/env python3
"""Dirtypulls pricewatch – denně stáhne Cardmarket Price Guide (Pokémon) a porovná s cenami v e-shopu.

Výstupy (v adresáři pricewatch/):
  history.csv  – jeden řádek na produkt a den
  latest.json  – poslední stav (čte ho dashboard a ranní souhrn)
  report.md    – čitelný přehled + kandidáti pro produkty bez cm_id
"""
import csv, datetime as dt, json, re, sys, urllib.request
from pathlib import Path

HERE = Path(__file__).parent
UA = {"User-Agent": "Mozilla/5.0 (dirtypulls-pricewatch)"}
CM = "https://downloads.s3.cardmarket.com/productCatalog"
GUIDE = f"{CM}/priceGuide/price_guide_6.json"
NONSINGLES = f"{CM}/productList/products_nonsingles_6.json"
CNB = "https://www.cnb.cz/cs/financni-trhy/devizovy-trh/kurzy-devizoveho-trhu/kurzy-devizoveho-trhu/denni_kurz.txt"


def get(url, as_json=True):
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=120) as r:
        data = r.read()
    return json.loads(data) if as_json else data.decode("utf-8", "replace")


def eur_czk():
    try:
        for line in get(CNB, False).splitlines():
            p = line.split("|")
            if len(p) == 5 and p[3] == "EUR":
                return float(p[4].replace(",", ".")) / float(p[2])
    except Exception as e:
        print("CNB kurz selhal:", e, file=sys.stderr)
    return 25.0


def shop_price(url):
    """Cena z veřejné stránky produktu (u variant nejnižší = 'od')."""
    try:
        html = get(url, False)
    except Exception as e:
        print("shop selhal", url, e, file=sys.stderr)
        return None
    m = re.findall(r'itemprop="price"\s+content="([\d.]+)"', html) or \
        re.findall(r'"price"\s*:\s*"?([\d.]+)', html)
    vals = [float(x) for x in m if float(x) > 0]
    return min(vals) if vals else None


def match(products, p):
    inc = [w.lower() for w in p.get("cm_match", [])]
    exc = [w.lower() for w in p.get("cm_exclude", [])]
    out = []
    for x in products:
        n = x["name"].lower()
        if all(w in n for w in inc) and not any(w in n for w in exc):
            out.append(x)
    return out


def main():
    cfg = json.loads((HERE / "products.json").read_text())
    guide = get(GUIDE)
    cat = get(NONSINGLES)
    prices = {g["idProduct"]: g for g in guide["priceGuides"]}
    names = {x["idProduct"]: x for x in cat["products"]}
    rate = eur_czk()
    today = dt.date.today().isoformat()

    prev = {}
    hist_path = HERE / "history.csv"
    if hist_path.exists():
        for r in csv.DictReader(hist_path.open()):
            if r["date"] < today:
                prev[r["code"]] = r  # poslední předchozí den vyhrává

    rows, report, alerts = [], [], []
    report.append(f"# Pricewatch – {today}\n")
    report.append(f"Kurz ČNB: 1 EUR = {rate:.3f} Kč · Cardmarket guide z {guide.get('createdAt','?')} · POZOR: low/trend jsou napříč jazyky (EN/DE/FR…), ne jen EN\n")
    report.append("| Produkt | Můj e-shop | CM low (všechny jazyky) | CM trend (všechny jazyky) | CM avg 7d | Rozdíl vs trend |")
    report.append("|---|---:|---:|---:|---:|---:|")
    candidates = []

    for p in cfg["products"]:
        cid = p.get("cm_id")
        if not cid:
            c = match(cat["products"], p)
            candidates.append((p, c))
            if len(c) == 1:
                cid = c[0]["idProduct"]
        g = prices.get(cid, {}) if cid else {}
        low, trend, avg7 = g.get("low"), g.get("trend"), g.get("avg7")
        czk = lambda v: round(v * rate) if v else None
        mine = shop_price(p["shop_url"])
        diff = (mine / czk(trend) - 1) * 100 if mine and trend else None
        row = {
            "date": today, "code": p["code"], "name": p["name"], "cm_id": cid or "",
            "cm_name": names.get(cid, {}).get("name", "") if cid else "",
            "low_eur": low or "", "trend_eur": trend or "", "avg7_eur": avg7 or "",
            "low_czk": czk(low) or "", "trend_czk": czk(trend) or "", "my_czk": mine or "",
            "diff_vs_trend_pct": round(diff, 1) if diff is not None else "",
        }
        rows.append(row)
        fmt = lambda v: f"{v:,.0f} Kč".replace(",", " ") if v else "–"
        report.append(f"| {p['name']} | {fmt(mine)} | {fmt(czk(low))} | {fmt(czk(trend))} | {fmt(czk(avg7))} | "
                      f"{(f'{diff:+.0f} %') if diff is not None else '–'} |")
        # alerty: pohyb trendu oproti minulému běhu
        pr = prev.get(p["code"])
        if pr and pr.get("trend_eur") and trend:
            ch = (trend / float(pr["trend_eur"]) - 1) * 100
            if abs(ch) >= cfg.get("alert_pct", 5):
                alerts.append(f"{p['name']}: CM trend {ch:+.1f} % ({float(pr['trend_eur']):.2f} → {trend:.2f} €)")
        if mine and low and mine < czk(low):
            alerts.append(f"{p['name']}: můj e-shop ({fmt(mine)}) je pod CM low ({fmt(czk(low))}) – možná moc levně")

    if alerts:
        report.append("\n## Upozornění\n" + "\n".join(f"- {a}" for a in alerts))
    unresolved = [(p, c) for p, c in candidates if len(c) != 1]
    if candidates:
        report.append("\n## Párování s Cardmarketem\n")
        for p, c in candidates:
            report.append(f"**{p['name']}** – {len(c)} kandidátů (doplň `cm_id` do products.json):")
            for x in c[:15]:
                g = prices.get(x["idProduct"], {})
                report.append(f"- `{x['idProduct']}` {x['name']} ({x.get('categoryName','')}) – trend {g.get('trend','?')} €")
            report.append("")

    fields = list(rows[0].keys())
    old = []
    if hist_path.exists():
        old = [r for r in csv.DictReader(hist_path.open()) if r["date"] != today]
    with hist_path.open("w", newline="") as f:
        w = csv.DictWriter(f, fieldnames=fields)
        w.writeheader()
        for r in old + rows:
            w.writerow({k: r.get(k, "") for k in fields})
    (HERE / "latest.json").write_text(json.dumps(
        {"date": today, "eur_czk": rate, "rows": rows, "alerts": alerts,
         "unresolved": [p["code"] for p, _ in unresolved]}, ensure_ascii=False, indent=1))
    (HERE / "report.md").write_text("\n".join(report) + "\n")
    print("\n".join(report))


if __name__ == "__main__":
    main()
