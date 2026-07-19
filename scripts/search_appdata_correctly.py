import os

search_dir = r'C:\Users\kiruj\.gemini\antigravity-ide'
print(f"Scanning {search_dir} for AccountabilityPartnerDashboard...")

matches = []
for root, dirs, files in os.walk(search_dir):
    # skip the system_generated/logs directory if we already scanned it
    # actually, let's scan everything except maybe very large binaries
    for file in files:
        filepath = os.path.join(root, file)
        try:
            stat = os.stat(filepath)
            if stat.st_size > 5 * 1024 * 1024:
                continue
            with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
                if 'AccountabilityPartnerDashboard' in content:
                    matches.append((stat.st_size, filepath))
        except Exception as e:
            pass

matches.sort(key=lambda x: x[0], reverse=True)
print(f"Found {len(matches)} matches:")
for size, path in matches[:15]:
    print(f"  Size: {size} bytes | Path: {path}")
