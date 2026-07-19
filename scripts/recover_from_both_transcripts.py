import json
import re
import os

brain_dir = r'C:\Users\kiruj\.gemini\antigravity-ide\brain'
convs = ['784c32ab-51a6-4249-ae23-1c509c33a961', 'f776c8ae-2e5b-4039-9644-a3e3120cb2d6']

line_dict = {}

# We'll read the older conversation first, so that the newer conversation's views override them if they differ.
for conv_id in convs:
    logs_path = os.path.join(brain_dir, conv_id, '.system_generated', 'logs', 'transcript.jsonl')
    if not os.path.exists(logs_path):
        print(f"Log path does not exist: {logs_path}")
        continue
    
    print(f"Scanning log for {conv_id}...")
    with open(logs_path, 'r', encoding='utf-8') as f:
        for idx, line in enumerate(f):
            try:
                step = json.loads(line)
                if step.get('type') == 'VIEW_FILE' and step.get('status') == 'DONE':
                    # check if the file path is ParentDashboard
                    content = step.get('content', '')
                    if 'parentdashboard.tsx' in content.lower():
                        # Parse lines
                        for l in content.split('\n'):
                            m = re.match(r'^(\d+):\s?(.*)$', l)
                            if m:
                                line_num = int(m.group(1))
                                line_content = m.group(2)
                                line_dict[line_num] = line_content
            except Exception as e:
                pass

print(f"Extracted {len(line_dict)} unique lines.")

if len(line_dict) > 0:
    max_line = max(line_dict.keys())
    print(f"Max line number found: {max_line}")
    
    # Check if there are any gaps
    gaps = []
    for i in range(1, max_line + 1):
        if i not in line_dict:
            gaps.append(i)
            
    if gaps:
        print(f"Gaps found in line numbers (total: {len(gaps)}): {gaps[:50]} ...")
    else:
        print("No gaps found! Complete file reconstructed.")
        
    # Stitch content
    stitched_code = []
    for i in range(1, max_line + 1):
        stitched_code.append(line_dict.get(i, ""))
        
    recovered_code = '\n'.join(stitched_code)
    
    output_path = 'src/pages/ParentDashboard.tsx'
    with open(output_path, 'w', encoding='utf-8') as out:
        out.write(recovered_code)
    print(f"Successfully stiched and saved {len(recovered_code)} characters to {output_path}!")
else:
    print("No lines could be extracted.")
