import json

logs_path = r'C:\Users\kiruj\.gemini\antigravity-ide\brain\f776c8ae-2e5b-4039-9644-a3e3120cb2d6\.system_generated\logs\transcript.jsonl'

with open(logs_path, 'r', encoding='utf-8') as f:
    for idx, line in enumerate(f):
        if idx == 269: # Line 269 (VIEW_FILE response)
            step = json.loads(line)
            # print all keys except content (which might be long)
            print(f"Keys: {list(step.keys())}")
            print(f"Content prefix: {step.get('content')[:200]}")
            break
