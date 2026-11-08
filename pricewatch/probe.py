import urllib.request, urllib.parse, re
H = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36",
     "Accept-Language": "cs,en;q=0.8", "Accept": "text/html"}
shops = ["https://www.cernyrytir.cz/", "https://www.pokeshop.cz/", "https://www.najada.games/", "https://www.masterball.cz/",
         "https://www.cardstore.cz/", "https://www.chytjevsechny.cz/", "https://www.shadowball.cz/", "https://www.vesely-drak.cz/"]
out = []
def get(u):
    r = urllib.request.urlopen(urllib.request.Request(u, headers=H), timeout=30)
    return r.status, r.geturl(), r.read().decode("utf-8", "replace")
for s in shops:
    try:
        st, url, h = get(s)
        forms = re.findall(r'<form[^>]*action="([^"]*)"[^>]*>(.*?)</form>', h, re.S)
        fs = []
        for a, body in forms[:6]:
            names = re.findall(r'<input[^>]*name="([^"]+)"', body)
            fs.append(f"{a} {names[:5]}")
        shoptet = "shoptet" in h.lower()
        out.append(f"## {s} -> {st} {url} len={len(h)} shoptet={shoptet}\n  forms: {fs}")
    except Exception as e:
        out.append(f"## {s} ERR {e}")
open("pricewatch/probe.txt", "w").write("\n".join(out) + "\n")
print("\n".join(out))
