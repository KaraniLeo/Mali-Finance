import React, { useState } from 'react';
import { useCurriculumStore } from '../../state/curriculumStore';
import { Save, Code } from 'lucide-react';
import { toast } from '../../state/toastStore';
import { supabase } from '../../lib/supabase';

export function AdminCodeEditor() {
  const { phases, modules, lessons, cards } = useCurriculumStore();
  const [selectedTable, setSelectedTable] = useState('phases');
  const [jsonContent, setJsonContent] = useState('[]');

  const loadData = () => {
    if (selectedTable === 'phases') setJsonContent(JSON.stringify(phases, null, 2));
    else if (selectedTable === 'modules') setJsonContent(JSON.stringify(modules, null, 2));
    else if (selectedTable === 'lessons') setJsonContent(JSON.stringify(lessons, null, 2));
    else if (selectedTable === 'cards') setJsonContent(JSON.stringify(cards, null, 2));
  };

  const handleSave = async () => {
    try {
      const parsed = JSON.parse(jsonContent);
      // In a real scenario we'd diff and update via RPC or massive bulk upsert
      // For this implementation, we will push the entire array if valid
      toast.success(`Validated ${parsed.length} items in ${selectedTable}`);
      
      // Update logic for raw json
      const { error } = await supabase.from(selectedTable).upsert(parsed);
      if (error) throw error;
      
      toast.success('Successfully committed code changes to database');
      useCurriculumStore.getState().fetchCurriculum();
    } catch (e: any) {
      toast.error('JSON Error: ' + e.message);
    }
  };

  return (
    <div className="bg-stone-900 rounded-[32px] p-6 shadow-2xl flex flex-col h-[700px]">
      <div className="flex items-center justify-between mb-4 border-b border-stone-800 pb-4">
        <h3 className="text-xl font-black text-emerald-400 flex items-center gap-2">
          <Code size={20} /> Developer Mode: Raw JSON Editor
        </h3>
        <div className="flex gap-4">
          <select 
            className="bg-stone-800 text-stone-200 border border-stone-700 rounded-lg p-2 font-bold"
            value={selectedTable}
            onChange={e => {
              setSelectedTable(e.target.value);
            }}
          >
            <option value="phases">Phases</option>
            <option value="modules">Modules</option>
            <option value="lessons">Lessons</option>
            <option value="learning_cards">Learning Cards</option>
          </select>
          <button onClick={loadData} className="px-4 py-2 bg-stone-800 text-stone-200 rounded-lg hover:bg-stone-700 font-bold">Load</button>
          <button onClick={handleSave} className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 font-bold flex items-center gap-2">
            <Save size={16} /> Commit
          </button>
        </div>
      </div>
      <textarea 
        value={jsonContent}
        onChange={e => setJsonContent(e.target.value)}
        className="flex-1 bg-[#1e1e1e] text-emerald-400 p-6 rounded-2xl font-mono text-sm border-2 border-stone-800 focus:border-emerald-500 focus:ring-0 resize-none whitespace-pre"
        spellCheck={false}
      />
    </div>
  );
}
