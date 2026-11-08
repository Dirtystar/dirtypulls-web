import urllib.request, urllib.parse, re
H = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36",
     "Accept-Language": "cs,en;q=0.8", "Accept": "text/html"}
q = "destined rivals"
urls = [
 "https://www.pokeshop.cz/vyhledavani/?string=" + urllib.parse.quote(q),
 "https://www.vesely-drak.cz/hledat.php?hledat=" + urllib.parse.quote(q),
 "https://www.najada.games/cs/search?q=" + urllib.parse.quote(q),
 "https://www.masterball.cz/vyhledavani?q=" + urllib.parse.quote(q),
 "https://cernyrytir.cz/",
]
out = []
for u in urls:
    try:
        r = urllib.request.urlopen(urllib.request.Request(u, headers=H), timeout=30)
        h = r.read().decode("utf-8", "replace")
        out.append(f"## {u} -> {r.status} {r.geturl()} len={len(h)}")
        if "cernyrytir" in u:
            out.append(h[:3000])
            continue
        for m in list(re.finditer(r"(?i)destined rivals", h))[:3]:
            s = h[max(0, m.start()-600): m.end()+1500]
            s = re.sub(r"\s+", " ", s)
            out.append("  ...> " + s[:2100])
    except Exception as e:
        out.append(f"## {u} ERR {e}")
open("pricewatch/probe.txt", "w").write("\n".join(out) + "\n")
