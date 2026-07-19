import json

logs_path = r'C:\Users\kiruj\.gemini\antigravity-ide\brain\f776c8ae-2e5b-4039-9644-a3e3120cb2d6\.system_generated\logs\transcript.jsonl'

with open(logs_path, 'r', encoding='utf-8') as f:
    for idx, line in enumerate(f):
        if 'VIEW_FILE' in line:
            try:
                step = json.loads(line)
                if step.get('step_index') == 279: # Response of 278
                    content = step.get('content', '')
                    lines = content.split('\n')
                    # find lines corresponding to 380-410
                    for l in lines:
                        if any(l.startswith(f"{i}:") for i in range(380, 411)):
                            print(l)
            except Exception as e:
                pass
