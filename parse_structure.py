with open("farabi.js", "r") as f:
    text = f.read()

import re

# Find JSX components or sections
# Let's search for larger chunks or arrays of objects (like education, skills, projects, etc.)
# Look for sections like 'Assalamu', 'Hello', 'About', 'Education', 'Projects'

patterns = [
    r'\{[^{}]*title[^{}]*\}',
    r'\{[^{}]*school[^{}]*\}',
    r'\{[^{}]*degree[^{}]*\}',
    r'\{[^{}]*year[^{}]*\}',
    r'\{[^{}]*category[^{}]*\}'
]

for p in patterns:
    m = re.findall(p, text)
    print(f"Pattern {p}: {len(m)} matches")
    for item in m[:5]:
        print("  ->", item[:150])

# Search for any string mentioning Hadith
print("\n--- Hadith occurrences in context ---")
for match in re.finditer(r'Hadith', text):
    start = max(0, match.start() - 200)
    end = min(len(text), match.end() + 200)
    print("CONTEXT:", text[start:end])
    print("-" * 50)
