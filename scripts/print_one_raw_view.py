import json

logs_path = r'C:\Users\kiruj\.gemini\antigravity-ide\brain\f776c8ae-2e5b-4039-9644-a3e3120cb2d6\.system_generated\logs\transcript.jsonl'

with open(logs_path, 'r', encoding='utf-8') as f:
    for idx, line in enumerate(f):
        if idx == 268: # Line 268
            step = json.loads(line)
            print(json.dumps(step, indent=2))
            break
