import os
from PIL import Image, ImageDraw, ImageFont

img_path = r'C:\Users\rohit\.gemini\antigravity\brain\fdb3f11b-0fd2-448a-a820-b03722f40a3b\geelong_refinery_fire_1776324478246.png'
out_path = r'c:\Users\rohit\.gemini\antigravity\playground\tensor-granule\TestURLPages\articles\image\viva_energy_geelong_fire.webp'

os.makedirs(os.path.dirname(out_path), exist_ok=True)

img = Image.open(img_path)
img = img.resize((800, 450), Image.Resampling.LANCZOS)
img = img.convert("RGBA")
overlay = Image.new("RGBA", img.size, (0, 0, 0, 0))
draw = ImageDraw.Draw(overlay)

# TinyBigTalks text at bottom right
brand_text = "TinyBigTalks.online"
try:
    brand_font = ImageFont.truetype("arial.ttf", 20)
except IOError:
    brand_font = ImageFont.load_default()

bbox = draw.textbbox((0, 0), brand_text, font=brand_font)
brand_w = bbox[2] - bbox[0]
brand_h = bbox[3] - bbox[1]
brand_x = img.width - brand_w - 15
brand_y = img.height - brand_h - 15

draw.rectangle((brand_x-5, brand_y-5, brand_x+brand_w+5, brand_y+brand_h+5), fill=(0, 0, 0, 180))
draw.text((brand_x, brand_y), brand_text, fill="white", font=brand_font)

# Main Title Text
headline_text = "Viva Energy Geelong Refinery Fire:\nImpact on Petrol Prices"
try:
    headline_font = ImageFont.truetype("arialbd.ttf", 36)
except IOError:
    try:
        headline_font = ImageFont.truetype("arial.ttf", 32)
    except IOError:
        headline_font = ImageFont.load_default()

headline_bbox = draw.textbbox((0, 0), headline_text, font=headline_font)
headline_w = headline_bbox[2] - headline_bbox[0]
headline_h = headline_bbox[3] - headline_bbox[1]

title_x = 20
title_y = 20
draw.rectangle((title_x-10, title_y-10, title_x+headline_w+10, title_y+headline_h+10), fill=(0, 0, 0, 200))
draw.text((title_x, title_y), headline_text, fill=(255, 255, 255), font=headline_font)

img = Image.alpha_composite(img, overlay).convert("RGB")

quality = 85
img.save(out_path, format="WEBP", quality=quality)
while os.path.getsize(out_path) > 200 * 1024 and quality > 30:
    quality -= 10
    img.save(out_path, format="WEBP", quality=quality)

print(f"Saved {out_path} at quality {quality}, size {os.path.getsize(out_path) / 1024:.2f} KB")
