#!/usr/bin/env python3
"""Vykreslí kalendar-novinek-<year>.png z events.json (1600x900, brand Dirtypulls).
Použití: python3 radce/kalendar/render.py   (vyžaduje playwright + chromium)
"""
import datetime as dt, json
from pathlib import Path

HERE = Path(__file__).parent
cfg = json.loads((HERE / "events.json").read_text())
Y = cfg["year"]
X0, MW = 230.0, 109.1667          # levý okraj osy, šířka měsíce

GAMES = [("pokemon", "Pokémon", "#FFCB3D", [255, 340]),
         ("magic", "Magic", "#7C5CFF", [430, 515]),
         ("lorcana", "Lorcana", "#22D3C5", [605, 690])]
MONTHS = ["led", "úno", "bře", "dub", "kvě", "čvn", "čvc", "srp", "zář", "říj", "lis", "pro"]


def xpos(d):
    d = dt.date.fromisoformat(d)
    return X0 + (d.month - 1 + (d.day - 1) / 31) * MW


RANGES = {"latin": "U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215",
          "latin-ext": "U+0100-02AF,U+0304,U+0308,U+0329,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF"}


def font(fam, w, files):
    out = ""
    for f in files:
        r = RANGES["latin-ext" if "latin-ext" in f else "latin"]
        out += f"@font-face{{font-family:{fam};font-weight:{w};src:url('fonts/{f}') format('woff2');unicode-range:{r}}}"
    return out


css = (font("Anton", 400, ["anton-latin-400-normal.woff2", "anton-latin-ext-400-normal.woff2"]) +
       font("Inter", 400, ["inter-latin-400-normal.woff2", "inter-latin-ext-400-normal.woff2"]) +
       font("Inter", 800, ["inter-latin-800-normal.woff2", "inter-latin-ext-800-normal.woff2"]))
css += """
*{margin:0;box-sizing:border-box}body{width:1600px;height:900px;background:#14141A;color:#E8E4DA;font-family:Inter;position:relative;overflow:hidden}
.r{position:absolute;inset:0;background:radial-gradient(circle at 10% 0%,#7C5CFF35,transparent 45%),radial-gradient(circle at 95% 100%,#22D3C530,transparent 45%)}
.g{background:linear-gradient(90deg,#7C5CFF,#22D3C5);-webkit-background-clip:text;color:transparent}
.h{position:absolute;left:60px;top:44px;font-family:Anton;font-size:72px;text-transform:uppercase;line-height:1}
.k{position:absolute;left:62px;top:128px;font-weight:800;font-size:20px;letter-spacing:5px;text-transform:uppercase}
.m{position:absolute;top:190px;font-size:18px;font-weight:800;color:#8d8a99;text-transform:uppercase;letter-spacing:2px;text-align:center;width:109px}
.v{position:absolute;top:220px;bottom:90px;width:1px;background:#2A2A35}
.lab{position:absolute;left:60px;font-family:Anton;font-size:34px;text-transform:uppercase}
.ev{position:absolute;padding:12px 14px;border-radius:14px;background:#1E1E27;border:2px solid;min-width:150px;white-space:nowrap}
.ev b{display:block;font-size:20px;line-height:1.15}.ev span{display:block;font-size:15px;color:#bdb8ad;margin-top:4px}
.ev.unofficial,.ev.window{border-style:dashed}
.leg{position:absolute;left:60px;bottom:28px;font-size:16px;color:#bdb8ad}
.logo{position:absolute;right:60px;top:40px;width:180px}
.line{position:absolute;left:0;right:0;bottom:0;height:8px;background:linear-gradient(90deg,#7C5CFF,#22D3C5)}
"""
upd = dt.date.fromisoformat(cfg["updated"])
h = [f"<html><head><meta charset=utf-8><style>{css}</style></head><body><div class=r></div>",
     f"<div class=h>Kalendář novinek <span class=g>{Y}</span></div>",
     "<div class='k g'>Pokémon · Magic: The Gathering · Disney Lorcana</div><img class=logo src='logo.png'>"]
for i, m in enumerate(MONTHS):
    x = X0 + i * MW
    h.append(f"<div class=m style='left:{x:.0f}px'>{m}</div><div class=v style='left:{x:.0f}px'></div>")
for key, lab, col, lanes in GAMES:
    h.append(f"<div class=lab style='top:{lanes[0] + 10}px;color:{col}'>{lab}</div>")
    ends = [-1e9] * len(lanes)
    evs = sorted([e for e in cfg["events"] if e["game"] == key and e["date"].startswith(str(Y))], key=lambda e: e["date"])
    for e in evs:
        x = max(xpos(e["date"]), X0 + 10)
        box = max(150, 30 + 11 * max(len(e["name"]), len(e["label"]) * 0.8))  # odhad šířky karty
        x = min(x, 1600 - 40 - box)
        lane = next((i for i, end in enumerate(ends) if x >= end + 8), None)
        if lane is None:  # žádný volný pruh -> posuň doprava za nejdřív končící
            lane = min(range(len(ends)), key=lambda i: ends[i])
            x = ends[lane] + 8
            print("POZOR: posunutá karta", e["name"])
        ends[lane] = x + box
        h.append(f"<div class='ev {e['status']}' style='left:{x:.0f}px;top:{lanes[lane]}px;border-color:{col}'>"
                 f"<b>{e['name']}</b><span>{e['label']}</span></div>")
h.append(f"<div class=leg>Plný rámeček = oficiálně oznámené datum vydání &nbsp;·&nbsp; čárkovaně = zatím jen období nebo neoficiální info"
         f" &nbsp;·&nbsp; stav k {upd.day}. {upd.month}. {upd.year}, zdroje v článku na dirtypulls.cz</div><div class=line></div></body></html>")
out_html = HERE / "kalendar.html"
out_html.write_text("".join(h))

from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page(viewport={"width": 1600, "height": 900})
    pg.goto(out_html.resolve().as_uri())
    pg.wait_for_timeout(500)
    pg.screenshot(path=str(HERE / f"kalendar-novinek-{Y}.png"))
    b.close()
print("ok", HERE / f"kalendar-novinek-{Y}.png")
