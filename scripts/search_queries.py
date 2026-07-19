import json

logs_path = r'C:\Users\kiruj\.gemini\antigravity-ide\brain\f776c8ae-2e5b-4039-9644-a3e3120cb2d6\.system_generated\logs\transcript.jsonl'

print("Scanning for query code:")

with open(logs_path, 'r', encoding='utf-8') as f:
    for idx, line in enumerate(f):
        if 'supabase.from' in line or 'childJars' in line:
            try:
                step = json.loads(line)
                if step.get('type') == 'VIEW_FILE' and step.get('status') == 'DONE':
                    content = step.get('content', '')
                    if 'ParentDashboard.tsx' in content:
                        # find where supabase queries are made
                        lines = content.split('\n')
                        for i, l in enumerate(lines):
                            if 'supabase' in l or 'useEffect' in l:
                                # print a window around this line
                                start = max(0, i-5)
                                end = min(len(lines), i+15)
                                print(f"--- Log Line {idx} | File Line {i} ---")
                                print('\n'.join(lines[start:end]))
                                print("-----------------------------------")
            except Exception as e:
                pass
