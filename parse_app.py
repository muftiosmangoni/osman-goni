with open("farabi.js", "r") as f:
    text = f.read()

import re

# Find the main data object kt or similar containing bio, etc.
m = re.search(r'kt=\{([^}]+)\}', text)
if m:
    print("kt contents:", m.group(1))

# Find sections rendered in the App
# Look for App component JSX
app_sections = re.findall(r'<([A-Z][a-zA-Z0-9]+)[^>]*>', text)
print("Unique components:", sorted(list(set(app_sections))))

# Search for section id attributes
sec_ids = re.findall(r'id:"([^"]+)"', text)
print("IDs:", set(sec_ids))
