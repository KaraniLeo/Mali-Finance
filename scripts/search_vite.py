import os
import re

print("Searching node_modules/.vite and other build/temp dirs...")

search_dirs = [
    r'c:\Users\kiruj\UTAJIRI\Finance\node_modules\.vite',
    r'c:\Users\kiruj\UTAJIRI\Finance\dist'
]

matches = []

for sdir in search_dirs:
    if not os.path.exists(sdir):
        continue
    for root, dirs, files in os.walk(sdir):
        for file in files:
            filepath = os.path.join(root, file)
            try:
                # check file size, skip very large binary files
                stat = os.stat(filepath)
                if stat.st_size > 10 * 1024 * 1024:
                    continue
                with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
                    content = f.read()
                    if 'AccountabilityPartnerDashboard' in content:
                        matches.append((stat.st_size, filepath))
            except Exception as e:
                pass

matches.sort(key=lambda x: x[0], reverse=True)
for size, path in matches:
    print(f"Found cache file: Size: {size} bytes | Path: {path}")
