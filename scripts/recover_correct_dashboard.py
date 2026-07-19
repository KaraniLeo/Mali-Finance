import os

lost_found_dir = r'c:\Users\kiruj\UTAJIRI\Finance\.git\lost-found\other'

print(f"Scanning {lost_found_dir} for AccountabilityPartnerDashboard...")

if not os.path.exists(lost_found_dir):
    print("lost-found directory does not exist.")
else:
    files = os.listdir(lost_found_dir)
    print(f"Found {len(files)} files in lost-found/other.")
    
    matches = []
    for file in files:
        filepath = os.path.join(lost_found_dir, file)
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
                if 'AccountabilityPartnerDashboard' in content:
                    matches.append((len(content), filepath, content))
        except Exception as e:
            pass
            
    matches.sort(key=lambda x: x[0], reverse=True)
    if matches:
        for size, path, content in matches:
            # count lines
            lines = len(content.split('\n'))
            print(f"Match found! Size: {size} bytes | Lines: {lines} | Path: {path}")
            
        # Reconstruct the file with the largest match
        best_size, best_path, best_content = matches[0]
        output_path = 'src/pages/ParentDashboard.tsx'
        with open(output_path, 'w', encoding='utf-8') as out:
            out.write(best_content)
        print(f"Successfully restored file to {output_path} from {best_path}!")
    else:
        print("No matches containing 'AccountabilityPartnerDashboard' found.")
