with open("farabi.js", "r") as f:
    text = f.read()

import re

# Let's inspect the sections rendered in the main layout:
# e.g., how the portfolio displays "VIDEO EDITING" and "GRAPHIC DESIGN", "EDUCATION", "EXPERTISE / SKILLS", "CONTACT"
print("--- Looking for Education component ---")
for m in re.finditer(r'Dawra-e Hadith', text):
    start = max(0, m.start() - 300)
    end = min(len(text), m.end() + 600)
    print(text[start:end])
    print("=" * 60)

# Let's inspect skills / expertise
for m in re.finditer(r'CORE EXPERTISE', text):
    start = max(0, m.start() - 100)
    end = min(len(text), m.end() + 600)
    print("EXPERTISE:", text[start:end])
    print("=" * 60)
