with open("farabi.js", "r") as f:
    text = f.read()

import re

# Find sections by looking for headings / navigation items
nav_matches = re.findall(r'nav[^{]*\{[^{}]*\}', text)
print("Nav elements:", nav_matches[:5])

# Find all text rendered in the app:
# let's extract all strings in Bengali or English that are displayed
bengali_strings = re.findall(r'[\u0980-\u09FF][\u0980-\u09FF\s\d\(\)\-\,\.\:\'\"\/]+', text)
print("\nBengali strings found:", len(bengali_strings))
for bs in sorted(list(set(bengali_strings)))[:30]:
    if len(bs.strip()) > 3:
        print("BN:", bs.strip())

# Look for Hero text or intro
print("\n--- Hero & Intro Search ---")
for m in re.finditer(r'Assalamu|আলাইকুম|Hello|Creative Visualizer|Video Editor|সম্পর্কে|পরিচিতি', text):
    start = max(0, m.start() - 150)
    end = min(len(text), m.end() + 150)
    print("INTRO CONTEXT:", text[start:end])
    print("=" * 40)
