with open("farabi.js", "r") as f:
    text = f.read()

import re

matches = re.findall(r'["\']([^"\'\\]{6,200})["\']', text)
unique = list(set(matches))
print(f"Total extracted strings: {len(unique)}")

for m in sorted(unique):
    lower = m.lower()
    if any(k in lower for k in ["farabi", "alamin", "education", "experience", "skills", "video editing", "graphic design", "hadith", "about me", "contact me", "assalamu", "services"]):
        if not m.startswith("http") and not m.startswith("data:"):
            print("MATCH:", m)
