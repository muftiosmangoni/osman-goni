with open("farabi.js", "r") as f:
    text = f.read()

import re

# Find projects list (videos and graphic design)
# Search for array of video projects
v_match = re.search(r'(\[\{[^\]]*vimeo-sbmc-promo[^\]]*\}\])', text)
if v_match:
    print("Videos array snippet:", v_match.group(1)[:500])

# Search for graphic design items
d_match = re.search(r'(\[\{[^\]]*design-anua-skincare[^\]]*\}\])', text)
if d_match:
    print("Design array snippet:", d_match.group(1)[:500])

# Find the main App component render sequence
main_render = re.search(r'function [A-Za-z0-9_]+\(\)\{[^}]*return [^}]*main-content[^}]*\}', text)
if main_render:
    print("Main layout:", main_render.group(0)[:600])
