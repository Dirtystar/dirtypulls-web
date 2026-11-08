import urllib.request, re, sys
H = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36",
     "Accept-Language": "en-US,en;q=0.9", "Accept": "text/html"}
urls = [
 "https://www.cardmarket.com/en/Pokemon/Products/Booster-Boxes/Destined-Rivals-Booster-Box?language=1",
 "https://www.cardmarket.com/en/Pokemon/Products/Box-Sets/30th-Celebration-Mewtwo-Figure-Collection?language=1",
 "https://www.cardmarket.com/en/Pokemon/Products/Blisters/30th-Celebration-Eevee-2-Pack-Blister?language=1",
]
out = []
for u in urls:
    try:
        r = urllib.request.urlopen(urllib.request.Request(u, headers=H), timeout=30)
        h = r.read().decode("utf-8", "replace")
        prices = re.findall(r"(\d+,\d\d) €", h)[:12]
        out.append(f"{r.status} {r.geturl()} len={len(h)} prices={prices} title={re.search(r'<title>(.*?)</title>', h, re.S).group(1)[:80] if '<title>' in h else ''}")
    except Exception as e:
        out.append(f"ERR {u} {e}")
open("pricewatch/probe.txt", "w").write("\n".join(out) + "\n")
print("\n".join(out))
