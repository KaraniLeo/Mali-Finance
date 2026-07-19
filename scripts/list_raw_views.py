import json

logs_path = r'C:\Users\kiruj\.gemini\antigravity-ide\brain\f776c8ae-2e5b-4039-9644-a3e3120cb2d6\.system_generated\logs\transcript.jsonl'

print("Raw views scan:")

with open(logs_path, 'r', encoding='utf-8') as f:
    for idx, line in enumerate(f):
        if 'view_file' in line.lower() and 'parentdashboard' in line.lower():
            try:
                step = json.loads(line)
                if step.get('type') == 'PLANNER_RESPONSE':
                    for tc in step.get('tool_calls', []):
                        if tc.get('name') == 'view_file':
                            print(f"Step {step.get('step_index')} (Line {idx}): Args: {tc.get('arguments')}")
            except Exception as e:
                print(f"Error: {e}")
