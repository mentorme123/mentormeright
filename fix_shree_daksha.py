import json
from pathlib import Path

input_path = Path(r"C:\Users\RathodMaruthi\Downloads\mentorme\mentorme\src\app\(main)\page.tsx")
output_path = Path(r"C:\Users\RathodMaruthi\Downloads\mentorme\mentorme\src\app\(main)\page.tsx")
text = input_path.read_text(encoding="utf-8")

start = text.find("const institutions = [")
end = text.find("  ];", start) + 3
block = text[start:end]

block_new = block
block_new = block_new.replace("Shree Daksha Academy, Bengaluru", "Shree Daksha Academy, Bengaluru")

text = text[:start] + block_new + text[end:]
output_path.write_text(text, encoding="utf-8")
print("done")
