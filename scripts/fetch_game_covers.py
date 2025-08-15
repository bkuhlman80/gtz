import os, re, sys, json, pathlib, urllib.parse
import requests
from bs4 import BeautifulSoup
from PIL import Image
from io import BytesIO
import yaml

OUT_DIR = pathlib.Path("public/games")   # Next.js public/ or your CDN sync dir
OUT_DIR.mkdir(parents=True, exist_ok=True)

UA = {"User-Agent":"Mozilla/5.0 (compatible; GamingTheZodiac/1.0)"}

def pick_tcrf_image(soup):
    # Prefer large title/box/manual/cover images under /images/
    cands = []
    for img in soup.select("img"):
        src = img.get("src") or ""
        if not src: continue
        if src.startswith("//"): src = "https:" + src
        if src.startswith("/"): src = "https://tcrf.net" + src
        if "tcrf.net/images" not in src: continue
        alt = (img.get("alt") or "").lower()
        src_l = src.lower()
        score = 0
        if any(k in src_l for k in ["title", "box", "cover", "manual"]): score += 4
        if any(k in alt for k in ["title","box","cover","manual"]): score += 3
        try:
            w = int(img.get("width") or 0); h = int(img.get("height") or 0)
        except: w=h=0
        score += min(w,h)/256
        cands.append((score, src))
    if not cands: return None
    cands.sort(reverse=True)
    return cands[0][1]

def pick_wikipedia_image(soup):
    # Grab infobox image if present
    infobox = soup.select_one(".infobox")
    if infobox:
        img = infobox.select_one("img")
        if img and img.get("src"):
            src = img["src"]
            if src.startswith("//"): src = "https:" + src
            return src
    # Fallback: first reasonably big image
    best = None; best_score = -1
    for img in soup.select("img"):
        src = img.get("src") or ""
        if not src: continue
        if src.startswith("//"): src = "https:" + src
        if "upload.wikimedia.org" not in src: continue
        try:
            w = int(img.get("width") or 0); h = int(img.get("height") or 0)
        except: w=h=0
        score = min(w,h)
        if score > best_score:
            best_score = score; best = src
    return best

def download_image(url):
    r = requests.get(url, headers=UA, timeout=30)
    r.raise_for_status()
    return r.content

def save_variants(img_bytes, out_base):
    # Save .webp and .png
    im = Image.open(BytesIO(img_bytes)).convert("RGBA")
    # Limit huge images
    MAX = 1600
    w,h = im.size
    if max(w,h) > MAX:
        if w>=h:
            nw = MAX; nh = int(h*(MAX/w))
        else:
            nh = MAX; nw = int(w*(MAX/h))
        im = im.resize((nw,nh), Image.LANCZOS)

    webp_path = f"{out_base}.webp"
    png_path  = f"{out_base}.png"
    im.save(webp_path, "WEBP", quality=86, method=6)
    im.save(png_path, "PNG", optimize=True)
    return webp_path, png_path

def main(yaml_path):
    manifest = yaml.safe_load(open(yaml_path, "r", encoding="utf-8"))
    credits = []
    for row in manifest:
        title = row["title"]; slug = row["slug"]; src_page = row["source_page"]
        src_type = row["source_type"]; override = row.get("image_url","").strip()

        print(f"[+] {title} ({row['year']})")
        img_url = override or None
        if not img_url:
            html = requests.get(src_page, headers=UA, timeout=30).text
            soup = BeautifulSoup(html, "html.parser")
            if src_type == "tcrf":
                img_url = pick_tcrf_image(soup)
            elif src_type == "wikipedia":
                img_url = pick_wikipedia_image(soup)

        if not img_url:
            print("    [-] No image found; skip")
            continue

        print(f"    [img] {img_url}")
        data = download_image(img_url)
        out_base = str(OUT_DIR / slug)
        webp_path, png_path = save_variants(data, out_base)

        credit_label = "Image via TCRF" if src_type=="tcrf" else "Image via Wikipedia"
        credits.append({
            "slug": slug,
            "title": title,
            "year": row["year"],
            "cdn_webp": f"/games/{pathlib.Path(webp_path).name}",
            "cdn_png": f"/games/{pathlib.Path(png_path).name}",
            "credit_text": credit_label,
            "credit_href": src_page
        })

    with open("public/games/_credits.json","w",encoding="utf-8") as f:
        json.dump(credits, f, indent=2, ensure_ascii=False)
    print("[done] wrote public/games/_credits.json")

if __name__ == "__main__":
    if len(sys.argv)<2:
        print("usage: python scripts/fetch_game_covers.py data/game-covers.yaml")
        sys.exit(1)
    main(sys.argv[1])
