import json
import re
import urllib.request

IDS = [
    "13197954781913636406757167592134392521238659276564621344828515747651955720193",
    "13197954781913636406757167592134392521238659276564621344828515749850978975745",
    "13197954781913636406757167592134392521238659276564621344828515750950490603521",
    "13197954781913636406757167592134392521238659276564621344828515746552444092417",
    "13197954781913636406757167592134392521238659276564621344828515752050002231297",
    "13197954781913636406757167592134392521238659276564621344828515745452932464641",
    "13197954781913636406757167592134392521238659276564621344828515748751467347969",
]
CONTRACT = "0x495f947276749ce646f68ac8c248420045cb7b5e"

results = []
for tid in IDS:
    url = f"https://opensea.io/assets/ethereum/{CONTRACT}/{tid}"
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    html = urllib.request.urlopen(req, timeout=30).read().decode("utf-8", "replace")
    title_m = re.search(r"<title>([^<]+)</title>", html)
    img_m = re.search(r"(https://i\.seadn\.io/[^\"\s]+)", html)
    desc_m = re.search(r'property="og:description" content="([^"]+)"', html)
    title = title_m.group(1).replace(" | OpenSea", "").strip() if title_m else tid
    results.append(
        {
            "title": title,
            "poem": desc_m.group(1) if desc_m else "",
            "imageUrl": img_m.group(1) if img_m else "",
            "openseaUrl": url,
        }
    )

print(json.dumps(results, indent=2))
