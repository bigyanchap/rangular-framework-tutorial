"""Generate the Rangular Tutorial store artwork.

Design: the framework's logo, the Split Shield (assets/logo.svg,
the master artwork): one shield split in two, Angular red with a
white R on top, dark navy with the cyan React atom below. The
shield sits on the app's dark editor surface (#1e1e1e, the code
token, also the splash and adaptive background colour in
app.json), large enough to read at home screen size.

Outputs, all 1024 by 1024 PNG:
  icon.png           full bleed dark background, shield large
  adaptive-icon.png  transparent, shield inside the safe zone
  splash.png         transparent, shield plus the app name in
                     large type, shown over the splash
                     background colour from app.json

Needs cairosvg and Pillow: pip install cairosvg pillow
Run: python3 assets/generate_artwork.py
"""

import io
import os

import cairosvg
from PIL import Image, ImageDraw, ImageFont

HERE = os.path.dirname(os.path.abspath(__file__))
MASTER = os.path.join(HERE, 'logo.svg')
SURFACE = (30, 30, 30, 255)  # #1e1e1e
SANS_BOLD = '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
SIZE = 1024


def shield(size):
    data = cairosvg.svg2png(url=MASTER, output_width=size, output_height=size)
    return Image.open(io.BytesIO(data)).convert('RGBA')


def place(base, mark, cx, cy):
    base.alpha_composite(mark, (int(cx - mark.width / 2), int(cy - mark.height / 2)))


def main():
    # Icon: full bleed surface, shield at about 76 percent.
    img = Image.new('RGBA', (SIZE, SIZE), SURFACE)
    place(img, shield(778), SIZE / 2, SIZE / 2)
    img.save(os.path.join(HERE, 'icon.png'))

    # Adaptive foreground: transparent, shield inside the safe
    # zone (about 62 percent), the background colour comes from
    # app.json.
    img = Image.new('RGBA', (SIZE, SIZE), (0, 0, 0, 0))
    place(img, shield(635), SIZE / 2, SIZE / 2)
    img.save(os.path.join(HERE, 'adaptive-icon.png'))

    # Splash: transparent, shield above the app name.
    img = Image.new('RGBA', (SIZE, SIZE), (0, 0, 0, 0))
    place(img, shield(512), SIZE / 2, 400)
    d = ImageDraw.Draw(img)
    font = ImageFont.truetype(SANS_BOLD, 92)
    d.text((SIZE / 2, 742), 'Rangular Tutorial', font=font, fill=(255, 255, 255, 255), anchor='ma')
    img.save(os.path.join(HERE, 'splash.png'))


if __name__ == '__main__':
    main()
