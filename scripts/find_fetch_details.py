import json

logs_path = r'C:\Users\kiruj\.gemini\antigravity-ide\brain\f776c8ae-2e5b-4039-9644-a3e3120cb2d6\.system_generated\logs\transcript.jsonl'

print("Searching for Supabase fetches:")

keywords = ["from('wallets')", "from('wealth_jars')", "from('transactions')", "from('user_tasks')", "from('debts')"]

with open(logs_path, 'r', encoding='utf-8') as f:
    for idx, line in enumerate(f):
        if any(kw in line for kw in keywords):
            try:
                step = json.loads(line)
                if step.get('type') == 'VIEW_FILE' and step.get('status') == 'DONE':
                    content = step.get('content', '')
                    if 'ParentDashboard.tsx' in content:
                        # find the queries
                        lines = content.split('\n')
                        for i, l in enumerate(lines):
                            if any(kw in l for kw in keywords):
                                start = max(0, i-5)
                                end = min(len(lines), i+15)
                                print(f"--- Log Line {idx} | File Line {i} ---")
                                print('\n'.join(lines[start:end]))
                                print("-----------------------------------")
            except Exception as e:
                pass
