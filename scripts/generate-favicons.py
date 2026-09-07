#!/usr/bin/env python3
"""Generate square PW favicons from the existing monogram PNG.

Uses system Pillow (already installed). No paid APIs, no new npm packages.
Source is the committed 299x318 Praise Worthy monogram; this script only
pads to a square, fills the existing SVG cream tile, and resamples.
It does not redraw the mark.
"""

from __future__ import annotations

import base64
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / "scripts" / "assets" / "pw-monogram.png"
ICON_PNG = ROOT / "app" / "icon.png"
APPLE_PNG = ROOT / "app" / "apple-icon.png"
FAVICON_ICO = ROOT / "app" / "favicon.ico"
CONTACT_SHEET = ROOT / "seo-verification-logs" / "favicon-contact-sheet.png"

# Same fill as public/favicon.svg / app/icon.svg `<rect fill="#F9F8F4">`.
TILE_BG = (249, 248, 244, 255)
# Keep a modest even margin so 16px tiles are not clipped by browser chrome.
PADDING_RATIO = 0.12
PNG_SIZE = 512
APPLE_SIZE = 180
ICO_SIZES = (16, 32, 48)


def square_pad(image: Image.Image, padding_ratio: float = PADDING_RATIO) -> Image.Image:
    rgba = image.convert("RGBA")
    bbox = rgba.getbbox()
    if bbox is None:
        raise SystemExit("favicon source is fully transparent")
    glyph = rgba.crop(bbox)
    width, height = glyph.size
    content = max(width, height)
    side = max(content, round(content / (1 - (2 * padding_ratio))))
    canvas = Image.new("RGBA", (side, side), TILE_BG)
    canvas.paste(glyph, ((side - width) // 2, (side - height) // 2), glyph)
    return canvas


def resample(image: Image.Image, size: int) -> Image.Image:
    return image.resize((size, size), Image.Resampling.LANCZOS)


def save_png(image: Image.Image, path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    image.convert("RGB").save(path, format="PNG", optimize=True)


def save_ico(master: Image.Image, path: Path) -> None:
    # Pillow ignores requested ICO sizes larger than the source image, so
    # write from the 512 master rather than from a 16px frame.
    resample(master, PNG_SIZE).convert("RGBA").save(
        path,
        format="ICO",
        sizes=[(size, size) for size in ICO_SIZES],
    )


def save_contact_sheet(master: Image.Image, path: Path) -> None:
    frames = [resample(master, size).convert("RGB") for size in (*ICO_SIZES, APPLE_SIZE)]
    gap = 16
    width = gap + sum(frame.size[0] + gap for frame in frames)
    height = max(frame.size[1] for frame in frames) + gap * 2
    sheet = Image.new("RGB", (width, height), (200, 200, 200))
    x = gap
    for frame in frames:
        y = (height - frame.size[1]) // 2
        sheet.paste(frame, (x, y))
        x += frame.size[0] + gap
    path.parent.mkdir(parents=True, exist_ok=True)
    sheet.save(path, format="PNG", optimize=True)


def main() -> None:
    if not SOURCE.exists():
        raise SystemExit(f"missing favicon source: {SOURCE}")
    source = Image.open(SOURCE)
    if source.size != (299, 318):
        raise SystemExit(f"unexpected source size {source.size}; expected 299x318")
    master = square_pad(source)
    save_png(resample(master, PNG_SIZE), ICON_PNG)
    save_png(resample(master, APPLE_SIZE), APPLE_PNG)
    save_ico(master, FAVICON_ICO)
    save_contact_sheet(master, CONTACT_SHEET)
    # Embed the exact branded PNG: no font-dependent approximation of the logo.
    encoded = base64.b64encode(ICON_PNG.read_bytes()).decode("ascii")
    svg = (
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" role="img" aria-labelledby="title">\n'
        '  <title id="title">Praise Worthy monogram</title>\n'
        '  <rect width="512" height="512" fill="#F9F8F4"/>\n'
        f'  <image width="512" height="512" href="data:image/png;base64,{encoded}"/>\n'
        '</svg>\n'
    )
    for target in (ROOT / "public/pw-monogram.svg", ROOT / "public/favicon.svg"):
        target.write_text(svg)
    print(
        "generated",
        ICON_PNG.relative_to(ROOT),
        f"{PNG_SIZE}x{PNG_SIZE},",
        APPLE_PNG.relative_to(ROOT),
        f"{APPLE_SIZE}x{APPLE_SIZE},",
        FAVICON_ICO.relative_to(ROOT),
        "sizes",
        "x".join(str(size) for size in ICO_SIZES),
        "and",
        CONTACT_SHEET.relative_to(ROOT),
    )


if __name__ == "__main__":
    main()
