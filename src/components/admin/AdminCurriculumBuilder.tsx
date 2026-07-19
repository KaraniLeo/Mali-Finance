import React, { useState, useEffect } from 'react';
import { ChevronRight, Plus, Edit2, Trash2, ArrowLeft, Layers, ArrowUp, ArrowDown, BookOpen, PenTool, Image as ImageIcon } from 'lucide-react';
import { useCurriculumStore } from '../../state/curriculumStore';
import { Tier, Module, Phase, Lesson, LearningCard } from '../../types';
import { toast } from '../../state/toastStore';
import { parseLocalizedContent } from '../../lib/contentParser';
import { uploadImage, getImageUrl } from '../../lib/storage';

export function AdminCurriculumBuilder() {
  const { 
    modules, 
    phases, 
    lessons, 
    cards, 
    fetchLessonCards, 
    createModule, 
    updateModule,
    updateModuleOrder, 
    deleteModule,
    createLesson,
    updateLesson,
    deleteLesson,
    createCard,
    updateCard,
    deleteCard,
    createPhase,
    updatePhase
  } = useCurriculumStore();

  const [selectedTier, setSelectedTier] = useState<Tier | null>(null);
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<'beginner' | 'intermediate' | 'pro' | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  // Forms
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const [formType, setFormType] = useState<'module' | 'lesson' | 'card' | null>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  useEffect(() => {
    if (selectedLesson) {
      fetchLessonCards(selectedLesson.id);
    }
  }, [selectedLesson]);

  const handleBack = () => {
    if (selectedLesson) {
      setSelectedLesson(null);
      return;
    }
    if (selectedLevel) {
      setSelectedLevel(null);
      return;
    }
    if (selectedModule) {
      setSelectedModule(null);
      return;
    }
    if (selectedTier) {
      setSelectedTier(null);
      return;
    }
  };

  const openForm = (type: 'module' | 'lesson' | 'card', data: any = {}) => {
    setFormType(type);
    setFormData(data);
    setIsEditing(!!data.id);
  };

  const closeForm = () => {
    setFormType(null);
    setFormData({});
    setIsEditing(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (formType === 'module') {
        // Module requires a phase in the backend. 
        // If creating a new module, we should ideally create a phase first or reuse one.
        // For simplicity, we just use a generic phase ID or let the user specify.
        if (isEditing) {
          await updateModule(formData.id, { title: formData.title, description: formData.description, phaseId: formData.phaseId, icon: formData.icon });
          toast.success('Module updated');
        } else {
          // If no phaseId, create a dummy phase for it
          let phaseId = formData.phaseId;
          if (!phaseId) {
             phaseId = `phase-${Date.now()}`;
             await createPhase({ id: phaseId, title: formData.title, description: formData.description });
          }
          await createModule({ title: formData.title, description: formData.description || '', phaseId: phaseId, icon: formData.icon || 'Book' });
          toast.success('Module created');
        }
      } else if (formType === 'lesson') {
        if (!selectedModule) return;
        if (isEditing) {
          await updateLesson(formData.id, formData.title, formData.level);
          toast.success('Lesson updated');
        } else {
          await createLesson(selectedModule.phaseId, formData.title, formData.level);
          toast.success('Lesson created');
        }
      } else if (formType === 'card') {
        if (!selectedLesson) return;
        if (isEditing) {
          await updateCard(formData.id, {
            type: formData.type,
            title: formData.title,
            content: formData.content,
            imageKey: formData.imageKey,
            options: formData.options ? formData.options.split(',').map((s: string) => s.trim()) : undefined,
            correctAnswer: formData.correctAnswer
          });
          toast.success('Card updated');
        } else {
          await createCard(selectedLesson.id, {
            type: formData.type || 'concept',
            title: formData.title,
            content: formData.content,
            imageKey: formData.imageKey,
            options: formData.options ? formData.options.split(',').map((s: string) => s.trim()) : undefined,
            correctAnswer: formData.correctAnswer
          });
          toast.success('Card created');
        }
      }
      closeForm();
    } catch (err: any) {
      toast.error('Error saving: ' + err.message);
    }
  };

  // 1. TIER SELECTION
  if (!selectedTier) {
    return (
      <div className="space-y-6">
        <h3 className="text-2xl font-black text-stone-900 dark:text-stone-100">Select Target Tier</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(['junior', 'teen', 'pro'] as Tier[]).map(tier => (
            <button
              key={tier}
              onClick={() => setSelectedTier(tier)}
              className="p-8 bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-[32px] shadow-sm hover:border-stone-900 dark:hover:border-stone-100 hover:shadow-lg transition-all flex flex-col items-center justify-center gap-4 group"
            >
              <Layers size={48} className="text-stone-400 group-hover:text-stone-900 dark:group-hover:text-stone-100 transition-colors" />
              <h4 className="text-2xl font-black text-stone-900 dark:text-stone-100 uppercase tracking-widest">{tier}</h4>
              <p className="text-stone-900 dark:text-stone-100 font-bold text-center">
                {modules[tier]?.length || 0} Modules
              </p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // 2. MODULE SELECTION
  if (!selectedModule) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <button onClick={handleBack} className="p-3 bg-stone-100 dark:bg-stone-900 hover:bg-stone-200 dark:hover:bg-stone-800 rounded-xl transition-colors">
            <ArrowLeft size={24} className="text-stone-900 dark:text-stone-100" />
          </button>
          <div>
            <h3 className="text-2xl font-black text-stone-900 dark:text-stone-100 uppercase">{selectedTier} Tier Modules</h3>
            <p className="text-stone-900 dark:text-stone-100 font-bold">Select a module to edit its curriculum.</p>
          </div>
          <div className="ml-auto">
             <button onClick={() => openForm('module')} className="px-6 py-3 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded-xl font-black flex items-center gap-2 hover:bg-stone-800 dark:hover:bg-stone-200 shadow-sm">
                <Plus size={20} /> New Module
             </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {modules[selectedTier]?.map((m, index) => (
            <div key={m.id} className="p-6 bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-[24px] flex flex-col h-full shadow-sm">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-stone-100 dark:bg-stone-800 rounded-xl flex items-center justify-center shrink-0">
                  <BookOpen size={24} className="text-stone-900 dark:text-stone-100" />
                </div>
                <div>
                  <h4 className="text-xl font-black text-stone-900 dark:text-stone-100">{m.title}</h4>
                  <p className="text-stone-900 dark:text-stone-100 font-bold text-sm mt-1">{m.description}</p>
                </div>
              </div>
              <div className="mt-auto pt-4 flex gap-2 border-t border-stone-100 dark:border-stone-800">
                <button onClick={() => setSelectedModule(m)} className="flex-1 py-3 bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-black rounded-xl hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors">
                  Edit Curriculum
                </button>
                <div className="flex flex-col gap-1">
                  <button 
                    onClick={() => {
                      if (index > 0) {
                        const prev = modules[selectedTier][index - 1];
                        updateModuleOrder(m.id, prev.orderIndex || 0, prev.id, m.orderIndex || 0);
                      }
                    }} 
                    disabled={index === 0}
                    className="p-1 bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100 hover:bg-stone-200 dark:hover:bg-stone-700 rounded-lg disabled:opacity-50">
                    <ArrowUp size={14} />
                  </button>
                  <button 
                    onClick={() => {
                      if (index < modules[selectedTier].length - 1) {
                        const next = modules[selectedTier][index + 1];
                        updateModuleOrder(m.id, next.orderIndex || 0, next.id, m.orderIndex || 0);
                      }
                    }}
                    disabled={index === modules[selectedTier].length - 1} 
                    className="p-1 bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100 hover:bg-stone-200 dark:hover:bg-stone-700 rounded-lg disabled:opacity-50">
                    <ArrowDown size={14} />
                  </button>
                </div>
                <button onClick={() => openForm('module', m)} className="p-3 bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100 hover:bg-stone-200 dark:hover:bg-stone-700 rounded-xl transition-colors">
                  <Edit2 size={20} />
                </button>
                <button onClick={() => { if(confirm('Delete module?')) deleteModule(m.id); }} className="p-3 bg-rose-100 text-rose-600 hover:bg-rose-200 rounded-xl transition-colors">
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
          {(!modules[selectedTier] || modules[selectedTier].length === 0) && (
            <div className="col-span-full p-12 text-center text-stone-900 dark:text-stone-100 font-bold bg-stone-50 dark:bg-stone-900 rounded-[32px] border-2 border-dashed border-stone-300 dark:border-stone-700">
              No modules in this tier yet. Create one above!
            </div>
          )}
        </div>
        
        {/* Module Form Modal */}
        {formType === 'module' && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-stone-950 rounded-[32px] w-full max-w-lg p-8 border border-stone-200 dark:border-stone-800">
              <h3 className="text-2xl font-black text-stone-900 dark:text-stone-100 mb-6">{isEditing ? 'Edit Module' : 'Create Module'}</h3>
              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block text-stone-900 dark:text-stone-100 font-black mb-2 uppercase text-sm tracking-wider">Title</label>
                  <input required value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full p-4 rounded-xl border-2 border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 font-bold focus:border-stone-900 dark:focus:border-stone-100 outline-none" />
                </div>
                <div>
                  <label className="block text-stone-900 dark:text-stone-100 font-black mb-2 uppercase text-sm tracking-wider">Description</label>
                  <textarea value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full p-4 rounded-xl border-2 border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 font-bold focus:border-stone-900 dark:focus:border-stone-100 outline-none h-32" />
                </div>
                <div className="flex gap-4 pt-4">
                  <button type="button" onClick={closeForm} className="flex-1 py-4 bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-black rounded-xl hover:bg-stone-200 dark:hover:bg-stone-700">Cancel</button>
                  <button type="submit" className="flex-1 py-4 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 font-black rounded-xl hover:bg-stone-800 dark:hover:bg-stone-200">Save Module</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }

  // 3. LEVEL SELECTION
  if (!selectedLevel) {
    const phaseLessons = lessons[selectedModule.phaseId] || [];
    
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <button onClick={handleBack} className="p-3 bg-stone-100 dark:bg-stone-900 hover:bg-stone-200 dark:hover:bg-stone-800 rounded-xl transition-colors">
            <ArrowLeft size={24} className="text-stone-900 dark:text-stone-100" />
          </button>
          <div>
            <h3 className="text-2xl font-black text-stone-900 dark:text-stone-100 uppercase">{selectedModule.title}</h3>
            <p className="text-stone-900 dark:text-stone-100 font-bold">Select a difficulty level to edit its lessons.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {(['beginner', 'intermediate', 'pro'] as const).map(level => {
            const hasLesson = phaseLessons.some(l => l.level === level);
            return (
              <button
                key={level}
                onClick={() => setSelectedLevel(level)}
                className="p-8 bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-[32px] shadow-sm hover:border-stone-900 dark:hover:border-stone-100 hover:shadow-lg transition-all flex flex-col items-center justify-center gap-4"
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${hasLesson ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900' : 'bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100'}`}>
                  <PenTool size={32} />
                </div>
                <h4 className="text-2xl font-black text-stone-900 dark:text-stone-100 uppercase tracking-widest">{level}</h4>
                <p className="text-stone-900 dark:text-stone-100 font-bold">
                  {hasLesson ? 'Edit Content' : 'Add Content'}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // 4. LESSON & CARDS VIEW
  const phaseLessons = lessons[selectedModule.phaseId] || [];
  const activeLesson = selectedLesson || phaseLessons.find(l => l.level === selectedLevel);
  const activeCards = activeLesson ? (cards[activeLesson.id] || []) : [];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={handleBack} className="p-3 bg-stone-100 dark:bg-stone-900 hover:bg-stone-200 dark:hover:bg-stone-800 rounded-xl transition-colors">
          <ArrowLeft size={24} className="text-stone-900 dark:text-stone-100" />
        </button>
        <div>
          <h3 className="text-2xl font-black text-stone-900 dark:text-stone-100 uppercase">{selectedModule.title} - {selectedLevel}</h3>
          <p className="text-stone-900 dark:text-stone-100 font-bold">Manage the lesson and its learning cards.</p>
        </div>
      </div>

      {!activeLesson ? (
        <div className="p-12 text-center bg-stone-50 dark:bg-stone-900 rounded-[32px] border-2 border-dashed border-stone-300 dark:border-stone-700">
          <h4 className="text-xl font-black text-stone-900 dark:text-stone-100 mb-4">No lesson created for {selectedLevel} yet.</h4>
          <button onClick={() => openForm('lesson', { level: selectedLevel })} className="px-8 py-4 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 font-black rounded-xl hover:bg-stone-800 dark:hover:bg-stone-200 inline-flex items-center gap-2">
            <Plus size={20} /> Create {selectedLevel} Lesson
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lesson Details */}
          <div className="lg:col-span-1 space-y-4">
            <div className="p-6 bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-[24px] shadow-sm">
              <h4 className="text-xs font-black text-stone-900 dark:text-stone-100 uppercase tracking-widest mb-1">Lesson Title</h4>
              <h3 className="text-xl font-black text-stone-900 dark:text-stone-100 mb-4">{activeLesson.title}</h3>
              <div className="flex gap-2">
                <button onClick={() => openForm('lesson', activeLesson)} className="flex-1 py-3 bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-black rounded-xl hover:bg-stone-200 dark:hover:bg-stone-700">
                  Edit Info
                </button>
                <button onClick={() => { if(confirm('Delete entire lesson and all cards?')) deleteLesson(activeLesson.id); }} className="p-3 bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-xl hover:bg-rose-200 dark:hover:bg-rose-900/50">
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
            
            <button onClick={() => openForm('card')} className="w-full py-6 bg-emerald-500 dark:bg-emerald-600 text-white border-2 border-emerald-600 dark:border-emerald-700 font-black rounded-[24px] hover:bg-emerald-600 dark:hover:bg-emerald-700 shadow-sm flex items-center justify-center gap-3 text-lg">
              <Plus size={24} /> Add Learning Card
            </button>
          </div>

          {/* Cards List */}
          <div className="lg:col-span-2 space-y-4">
            {activeCards.length === 0 ? (
              <div className="p-12 text-center bg-stone-50 dark:bg-stone-900 rounded-[24px] border-2 border-dashed border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100 font-bold">
                No cards added yet. Click 'Add Learning Card' to begin.
              </div>
            ) : (
              activeCards.map((card, idx) => (
                <div key={card.id} className="p-6 bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-[24px] shadow-sm flex gap-4">
                  <div className="w-12 h-12 shrink-0 bg-stone-100 dark:bg-stone-800 rounded-xl flex items-center justify-center font-black text-stone-900 dark:text-stone-100 text-xl">
                    {idx + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-black text-stone-900 dark:text-stone-100 uppercase tracking-widest bg-stone-100 dark:bg-stone-800 px-3 py-1 rounded-lg">
                        {card.type}
                      </span>
                      <div className="flex gap-2">
                        <button onClick={() => openForm('card', card)} className="p-2 text-stone-900 dark:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg">
                          <Edit2 size={16} />
                        </button>
                        <button onClick={() => { if(confirm('Delete card?')) deleteCard(card.id); }} className="p-2 text-rose-500 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/30 rounded-lg">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    <h4 className="text-lg font-black text-stone-900 dark:text-stone-100 mb-2">{parseLocalizedContent(card.title)}</h4>
                    <p className="text-stone-900 dark:text-stone-100 font-bold text-sm line-clamp-2 mb-3">{parseLocalizedContent(card.content)}</p>
                    
                    {card.type === 'exercise' && card.options && (
                      <div className="flex gap-2 flex-wrap">
                        {card.options.map((opt, i) => (
                          <span key={i} className={`text-xs font-bold px-2 py-1 rounded border ${opt === card.correctAnswer ? 'bg-emerald-100 border-emerald-300 text-emerald-900' : 'bg-stone-50 border-stone-200 text-black'}`}>
                            {parseLocalizedContent(opt)}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Forms Modal */}
      {(formType === 'lesson' || formType === 'card') && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-stone-950 rounded-[32px] w-full max-w-2xl p-8 my-8 shadow-2xl border border-stone-200 dark:border-stone-800">
            <h3 className="text-2xl font-black text-stone-900 dark:text-stone-100 mb-6">
              {isEditing ? `Edit ${formType}` : `Create ${formType}`}
            </h3>
            <form onSubmit={handleSave} className="space-y-4">
              
              {formType === 'lesson' && (
                <>
                  <div>
                    <label className="block text-stone-900 dark:text-stone-100 font-black mb-2 uppercase text-sm tracking-wider">Lesson Title</label>
                    <input required value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full p-4 rounded-xl border-2 border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 font-bold focus:border-stone-900 dark:focus:border-stone-100 outline-none" placeholder="e.g. Intro to Stocks" />
                  </div>
                </>
              )}

              {formType === 'card' && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-stone-900 dark:text-stone-100 font-black mb-2 uppercase text-sm tracking-wider">Card Type</label>
                      <select value={formData.type || 'concept'} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full p-4 rounded-xl border-2 border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 font-bold focus:border-stone-900 dark:focus:border-stone-100 outline-none appearance-none">
                        <option value="concept">Concept</option>
                        <option value="insight">Insight</option>
                        <option value="example">Example</option>
                        <option value="warning">Warning</option>
                        <option value="exercise">Exercise</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-stone-900 dark:text-stone-100 font-black mb-2 uppercase text-sm tracking-wider">Title</label>
                      <input required value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full p-4 rounded-xl border-2 border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 font-bold focus:border-stone-900 dark:focus:border-stone-100 outline-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-stone-900 dark:text-stone-100 font-black mb-2 uppercase text-sm tracking-wider">Content</label>
                    <textarea required value={formData.content || ''} onChange={e => setFormData({...formData, content: e.target.value})} className="w-full p-4 rounded-xl border-2 border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 font-bold focus:border-stone-900 dark:focus:border-stone-100 outline-none h-32" />
                  </div>
                  <div>
                    <label className="block text-stone-900 dark:text-stone-100 font-black mb-2 uppercase text-sm tracking-wider">Image Upload</label>
                    <div className="flex items-center gap-4">
                      {formData.imageKey && (
                         <img src={getImageUrl(formData.imageKey) || formData.imageKey} alt="Preview" className="w-16 h-16 object-cover rounded-xl border-2 border-stone-200" />
                      )}
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          setIsUploadingImage(true);
                          const path = await uploadImage(file, 'cards');
                          if (path) {
                             setFormData({...formData, imageKey: getImageUrl(path) || path});
                          } else {
                             toast.error('Image upload failed');
                          }
                          setIsUploadingImage(false);
                        }} 
                        className="flex-1 p-2 bg-stone-50 dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-xl"
                      />
                      {formData.imageKey && (
                        <button type="button" onClick={() => setFormData({...formData, imageKey: undefined})} className="p-3 bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-xl hover:bg-rose-200 dark:hover:bg-rose-900/50">
                           <Trash2 size={20} />
                        </button>
                      )}
                    </div>
                  </div>
                  
                  {formData.type === 'exercise' && (
                    <div className="p-4 bg-stone-50 dark:bg-stone-900 rounded-xl border-2 border-stone-200 dark:border-stone-800 space-y-4">
                      <div>
                        <label className="block text-stone-900 dark:text-stone-100 font-black mb-2 uppercase text-sm tracking-wider">Options (comma separated)</label>
                        <input 
                          value={Array.isArray(formData.options) ? formData.options.join(', ') : (formData.options || '')} 
                          onChange={e => setFormData({...formData, options: e.target.value})} 
                          className="w-full p-4 rounded-xl border-2 border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 font-bold focus:border-stone-900 dark:focus:border-stone-100 outline-none" 
                          placeholder="Option A, Option B, Option C"
                        />
                      </div>
                      <div>
                        <label className="block text-stone-900 dark:text-stone-100 font-black mb-2 uppercase text-sm tracking-wider">Correct Answer (must match an option exactly)</label>
                        <input 
                          value={formData.correctAnswer || ''} 
                          onChange={e => setFormData({...formData, correctAnswer: e.target.value})} 
                          className="w-full p-4 rounded-xl border-2 border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-100 font-bold focus:border-emerald-500 dark:focus:border-emerald-400 outline-none" 
                        />
                      </div>
                    </div>
                  )}
                </>
              )}

              <div className="flex gap-4 pt-6">
                <button type="button" onClick={closeForm} className="flex-1 py-4 bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-black rounded-xl hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors">Cancel</button>
                <button type="submit" disabled={isUploadingImage} className="flex-1 py-4 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 font-black rounded-xl hover:bg-stone-800 dark:hover:bg-stone-200 transition-colors disabled:opacity-50">Save {formType}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
