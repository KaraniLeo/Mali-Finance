import os
import json

brain_dir = r'C:\Users\kiruj\.gemini\antigravity-ide\brain'
convs = ['784c32ab-51a6-4249-ae23-1c509c33a961', 'f776c8ae-2e5b-4039-9644-a3e3120cb2d6']

for conv_id in convs:
    log_path = os.path.join(brain_dir, conv_id, '.system_generated', 'logs', 'transcript.jsonl')
    if not os.path.exists(log_path):
        print(f"Log path does not exist: {log_path}")
        continue
    
    print(f"Scanning log for {conv_id}...")
    with open(log_path, 'r', encoding='utf-8') as f:
        for idx, line in enumerate(f):
            if 'ParentDashboard.tsx' in line:
                try:
                    step = json.loads(line)
                    # check if there's any write_to_file or replace_file_content tool call
                    tool_calls = step.get('tool_calls', [])
                    for tc in tool_calls:
                        name = tc.get('name')
                        if name in ['write_to_file', 'replace_file_content']:
                            args = tc.get('arguments', {})
                            target = args.get('TargetFile', '')
                            if 'ParentDashboard.tsx' in target:
                                content = args.get('CodeContent', '') or args.get('ReplacementContent', '')
                                lines_count = len(content.splitlines())
                                print(f"  Step {step.get('step_index')} (Line {idx}): Tool {name} | Target: {os.path.basename(target)} | Content size: {len(content)} bytes | Lines: {lines_count}")
                except Exception as e:
                    pass
