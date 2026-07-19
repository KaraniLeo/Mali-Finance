import os
import json
import re

brain_dir = r'C:\Users\kiruj\.gemini\antigravity-ide\brain'
convs = ['784c32ab-51a6-4249-ae23-1c509c33a961', 'f776c8ae-2e5b-4039-9644-a3e3120cb2d6']

line_dict = {}

for conv_id in convs:
    log_path = os.path.join(brain_dir, conv_id, '.system_generated', 'logs', 'transcript.jsonl')
    if not os.path.exists(log_path):
        continue
    
    print(f"Scanning command outputs in log for {conv_id}...")
    with open(log_path, 'r', encoding='utf-8') as f:
        for idx, line in enumerate(f):
            if 'AccountabilityPartnerDashboard' in line and 'RUN_COMMAND' in line:
                try:
                    step = json.loads(line)
                    content = step.get('content', '')
                    # check if this is the output of git diff, cat, type, etc.
                    # let's look for line numbers or clean source code
                    lines = content.split('\n')
                    print(f"  Step {step.get('step_index')} (Line {idx}) has command output: size {len(content)} bytes, {len(lines)} lines")
                    
                    # let's try to extract lines if they match "<number>: <code_content>"
                    # or if they are just clean code lines, we can store them.
                    # but wait, let's see what the command was.
                except Exception as e:
                    pass
