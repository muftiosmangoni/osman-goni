with open("farabi.js", "r") as f:
    text = f.read()

import re

for m in re.finditer(r'vimeo-sbmc-promo', text):
    start = max(0, m.start() - 100)
    end = min(len(text), m.end() + 1500)
    print("VIDEO ITEM:", text[start:end])
    break

for m in re.finditer(r'design-anua-skincare', text):
    start = max(0, m.start() - 100)
    end = min(len(text), m.end() + 1500)
    print("DESIGN ITEM:", text[start:end])
    break
