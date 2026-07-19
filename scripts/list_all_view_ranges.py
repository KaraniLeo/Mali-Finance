import json
import re

logs_path = r'C:\Users\kiruj\.gemini\antigravity-ide\brain\f776c8ae-2e5b-4039-9644-a3e3120cb2d6\.system_generated\logs\transcript.jsonl'

print("Listing all view_file calls for ParentDashboard...")

with open(logs_path, 'r', encoding='utf-8') as f:
    for idx, line in enumerate(f):
        if 'parentdashboard' in line.lower() and 'view_file' in line.lower():
            try:
                step = json.loads(line)
                # check if this is the tool call or the response
                # Let's check tool_calls in planner response
                if step.get('type') == 'PLANNER_RESPONSE':
                    for tc in step.get('tool_calls', []):
                        if tc.get('name') == 'view_file':
                            args = tc.get('arguments', {})
                            if 'ParentDashboard' in args.get('AbsolutePath', ''):
                                start = args.get('StartLine')
                                end = args.get('EndLine')
                                print(f"Step {step.get('step_index')} (Line {idx}): View range {start} to {end}")
            except Exception as e:
                pass
