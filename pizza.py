#!/usr/bin/env python3
"""Tiny poly.pizza helper: search -> slugs; model page -> metadata + GLB url."""
import re, sys, json, urllib.request

HDRS = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"}

def get(url):
    req = urllib.request.Request(url, headers=HDRS)
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.read().decode("utf-8", "replace")

def search(kw, n=12):
    html = get(f"https://poly.pizza/search/{urllib.request.quote(kw)}")
    slugs = sorted(set(re.findall(r'href="/m/([A-Za-z0-9_-]+)"', html)))
    return slugs[:n]

def model_info(slug):
    html = get(f"https://poly.pizza/m/{slug}")
    title = ""
    m = re.search(r'<h1[^>]*>(.*?)</h1>', html, re.S)
    if m:
        title = re.sub(r'<[^>]+>', '', m.group(1)).strip()
    if not title:
        m = re.search(r'<title[^>]*>([^<]*)', html)
        title = m.group(1).strip() if m else slug
    author = ""
    m = re.search(r'href="/u/([^"]+)"', html)
    if m:
        author = m.group(1)
    lic = "unknown"
    if "creativecommons.org/licenses/by/3.0" in html:
        lic = "CC-BY 3.0"
    elif "creativecommons.org/publicdomain/zero" in html:
        lic = "CC0"
    elif "creativecommons.org/licenses/by/4.0" in html:
        lic = "CC-BY 4.0"
    glb = ""
    m = re.search(r'https://static\.poly\.pizza/([0-9a-f-]{36})\.glb(?!\.br)', html)
    if m:
        glb = f"https://static.poly.pizza/{m.group(1)}.glb"
    return {"slug": slug, "title": title, "author": author, "license": lic, "glb": glb}

if __name__ == "__main__":
    cmd = sys.argv[1]
    if cmd == "search":
        print(json.dumps(search(sys.argv[2]), indent=1))
    elif cmd == "info":
        print(json.dumps(model_info(sys.argv[2]), indent=1))
    elif cmd == "batch":
        out = []
        for s in sys.argv[2:]:
            try:
                out.append(model_info(s))
            except Exception as e:
                out.append({"slug": s, "error": str(e)})
        print(json.dumps(out, indent=1))
