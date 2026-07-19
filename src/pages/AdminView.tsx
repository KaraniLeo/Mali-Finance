import React, { useState, useEffect } from 'react';
import { ShieldCheck, Code, Users, BookOpen, Target } from 'lucide-react';
import { useCurriculumStore } from '../state/curriculumStore';
import { AdminUsers } from '../components/admin/AdminUsers';
import { AdminCodeEditor } from '../components/admin/AdminCodeEditor';
import { AdminCurriculumBuilder } from '../components/admin/AdminCurriculumBuilder';
import { AdminUsage } from '../components/admin/AdminUsage';

type AdminTab = 'users' | 'curriculum' | 'achievements' | 'code' | 'usage';

export function AdminView() {
  const [activeTab, setActiveTab] = useState<AdminTab>('curriculum');
  const { achievements, fetchAllCurriculum } = useCurriculumStore();
  
  useEffect(() => {
    fetchAllCurriculum();
  }, []);

  return (
    <div className="flex flex-col gap-8 h-full overflow-hidden">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center text-white shadow-inner">
          <ShieldCheck size={28} />
        </div>
        <div>
          <h2 className="text-3xl font-black text-stone-900 dark:text-stone-100 brand">Admin Control Center</h2>
          <p className="text-stone-900 dark:text-stone-300 font-bold">Total Platform Authority: Manage Curriculum, Users, and System Data.</p>
        </div>
      </div>

      <div className="flex gap-2 border-b border-stone-300 pb-2 overflow-x-auto custom-scrollbar">
        {(['users', 'curriculum', 'achievements', 'code', 'usage'] as AdminTab[]).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 rounded-t-xl font-black text-sm uppercase tracking-widest transition-all whitespace-nowrap ${
              activeTab === tab 
                ? 'bg-black text-white shadow-lg' 
                : 'bg-stone-100 text-stone-900 dark:bg-stone-800 dark:text-stone-100 dark:hover:bg-stone-700 hover:bg-stone-200 border border-b-0 border-stone-200 dark:border-stone-700'
            }`}
          >
            {tab === 'users' && <Users size={16} className="inline mr-2" />}
            {tab === 'curriculum' && <BookOpen size={16} className="inline mr-2" />}
            {tab === 'code' && <Code size={16} className="inline mr-2" />}
            {tab === 'achievements' && <Target size={16} className="inline mr-2" />}
            {tab === 'usage' && <ShieldCheck size={16} className="inline mr-2" />}
            {tab}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto pb-24 custom-scrollbar">
        {activeTab === 'users' && <AdminUsers />}
        {activeTab === 'code' && <AdminCodeEditor />}
        {activeTab === 'curriculum' && <AdminCurriculumBuilder />}
        {activeTab === 'usage' && <AdminUsage />}

        {/* ACHIEVEMENTS TAB */}
        {activeTab === 'achievements' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
               <h3 className="text-2xl font-black text-stone-900 dark:text-stone-100">Global Achievements</h3>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {achievements.map(a => (
                  <div key={a.id} className="p-6 bg-white dark:bg-stone-950 rounded-[24px] border-2 border-stone-200 dark:border-stone-800 shadow-sm flex flex-col h-full">
                    <div className="flex items-center gap-3 mb-2">
                       <span className="text-3xl">{a.icon_svg}</span>
                       <h4 className="text-lg font-black text-stone-900 dark:text-stone-100">{a.title}</h4>
                    </div>
                    <p className="text-stone-900 dark:text-stone-100 font-bold mb-4 text-sm flex-1">{a.description}</p>
                    <div className="flex justify-between items-center mt-auto gap-2">
                      <span className="px-2 py-1 bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs font-black uppercase rounded-md border border-stone-200 dark:border-stone-700">ID: {a.id}</span>
                      <button className="px-4 py-2 text-stone-900 dark:text-stone-100 bg-stone-100 dark:bg-stone-800 rounded-xl cursor-not-allowed font-bold">
                        Edit
                      </button>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        )}
      </div>
    </div>
  );
}
