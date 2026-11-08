import urllib.request, urllib.parse, re, json
H = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36",
     "Accept-Language": "cs,en;q=0.8", "Accept": "text/html"}
shops = ["https://www.chytjevsechny-poke.cz/", "https://www.cdmc.cz/", "https://www.professoronyx.com/", "https://ofscards.com/",
 "https://www.imago.cz/", "https://pokectcg.cz/", "https://www.tcgshop.cz/", "https://www.bulbazard.cz/", "https://www.pokemall.cz/",
 "https://www.najada.games/", "https://www.masterball.cz/", "https://cernyrytir.cz/", "https://www.mysticshop.cz/", "https://www.fantasyobchod.cz/"]
def get(u):
    r = urllib.request.urlopen(urllib.request.Request(u, headers=H), timeout=30)
    return r.geturl(), r.read().decode("utf-8", "replace")
out = []
for s in shops:
    try:
        url, h = get(s)
    except Exception as e:
        out.append(f"## {s} ERR {e}"); continue
    base = re.match(r"https?://[^/]+", url).group(0)
    cands = []
    if "/action/ProductSearch/prepareString/" in h:
        cands.append(base + "/vyhledavani/?string={q}")
    if "woocommerce" in h.lower() or "wp-content" in h:
        cands.append(base + "/?s={q}&post_type=product")
    for act, body in re.findall(r'<form([^>]*)>(.*?)</form>', h, re.S):
        if 'post' in act.lower(): continue
        a = re.search(r'action="([^"]*)"', act)
        names = re.findall(r'<input[^>]*type="(?:search|text)"[^>]*name="([^"]+)"|<input[^>]*name="([^"]+)"[^>]*type="(?:search|text)"', body)
        names = [x or y for x, y in names]
        if names:
            act_url = a.group(1) if a else "/"
            act_url = act_url if act_url.startswith("http") else base + ("" if act_url.startswith("/") else "/") + act_url
            cands.append(act_url + ("&" if "?" in act_url else "?") + names[0] + "={q}")
    if "najada" in base: cands += [base + "/cs/hledat?q={q}", base + "/cs/vyhledavani?query={q}"]
    if "masterball" in base: cands += [base + "/hledani?q={q}", base + "/vyhledavani/?string={q}", base + "/search?q={q}"]
    res = []
    for c in dict.fromkeys(cands):
        try:
            u2, h2 = get(c.format(q="mewtwo"))
            n = len(re.findall(r"(?i)mewtwo", h2))
            res.append(f"{c} -> {u2[:80]} mewtwo_hits={n} len={len(h2)}")
        except Exception as e:
            res.append(f"{c} ERR {e}")
    out.append(f"## {s} -> {url} len={len(h)} shoptet={'shoptet' in h.lower()}\n  " + "\n  ".join(res or ["no search form"]))
open("pricewatch/probe.txt", "w").write("\n".join(out) + "\n")
