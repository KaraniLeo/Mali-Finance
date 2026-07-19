import React, { useEffect, useState } from 'react';
import { ShieldCheck, Edit2, Key, Users, Trophy } from 'lucide-react';
import { useAdminStore } from '../../state/adminStore';
import { User, Tier } from '../../types';
import { formatCurrency } from '../../lib/currency';
import { useCurriculumStore } from '../../state/curriculumStore';

export function AdminUsers() {
  const { users, fetchUsers, updateUser, forcePasswordReset, assignAchievement, removeAchievement } = useAdminStore();
  const { achievements } = useCurriculumStore();
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [resettingUser, setResettingUser] = useState<User | null>(null);
  const [resetEmail, setResetEmail] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSave = () => {
    if (editingUser) {
      updateUser(editingUser.id, {
        tier: editingUser.tier,
        balance: editingUser.balance,
        streak: editingUser.streak,
      });
      setEditingUser(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-black text-stone-900 dark:text-stone-100">User Management</h3>
        <div className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200 px-4 py-2 rounded-xl font-bold flex items-center gap-2">
          <Users size={18} /> {users.length} Total Users
        </div>
      </div>

      <div className="bg-white dark:bg-stone-950 rounded-[32px] border border-stone-200 dark:border-stone-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-stone-50 dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-100 font-black text-sm uppercase tracking-wider">
                <th className="p-4">Name</th>
                <th className="p-4">Tier</th>
                <th className="p-4">Balance</th>
                <th className="p-4">Streak</th>
                <th className="p-4">Joined</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 dark:divide-stone-800 text-stone-800 dark:text-stone-100 font-bold">
              {users.map(user => (
                <tr key={user.id} className="hover:bg-stone-50 dark:hover:bg-stone-900 transition-colors">
                  <td className="p-4">{user.name}</td>
                  <td className="p-4">
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-lg text-xs font-black uppercase tracking-widest">{user.tier}</span>
                  </td>
                  <td className="p-4 text-emerald-600 dark:text-emerald-300">{formatCurrency(user.balance || 0)}</td>
                  <td className="p-4">{user.streak || 0} days</td>
                  <td className="p-4 text-sm text-stone-800 dark:text-stone-300">{new Date(user.created_at || new Date().toISOString()).toLocaleDateString()}</td>
                  <td className="p-4 flex gap-2">
                    <button onClick={() => setEditingUser(user)} className="p-2 text-stone-800 hover:bg-stone-200 rounded-lg transition-colors" title="Edit User">
                      <Edit2 size={18} />
                    </button>
                    <button onClick={() => {
                       setResettingUser(user);
                       setResetEmail('');
                    }} className="p-2 text-rose-600 hover:bg-rose-100 rounded-lg transition-colors" title="Force Password Reset">
                      <Key size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {editingUser && (
        <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-50 flex justify-center items-center p-4">
          <div className="bg-white dark:bg-stone-950 rounded-[32px] w-full max-w-lg p-8 border border-stone-200 dark:border-stone-800 shadow-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-black text-stone-800 dark:text-stone-100 mb-6 flex items-center gap-2">
              <Edit2 size={24} className="text-brand-accent" /> Edit User: {editingUser.name}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-stone-800 dark:text-stone-200 mb-2">Account Tier</label>
                <select 
                  className="w-full p-4 bg-stone-50 dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-2xl font-bold text-stone-800 dark:text-stone-100 focus:border-brand-accent focus:ring-0"
                  value={editingUser.tier}
                  onChange={e => setEditingUser({...editingUser, tier: e.target.value as Tier})}
                >
                  <option value="junior">Junior (Under 13)</option>
                  <option value="teen">Teen (13-17)</option>
                  <option value="pro">Pro (18+)</option>
                  <option value="parent">Parent</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-stone-800 dark:text-stone-200 mb-2">Wallet Balance</label>
                <input 
                  type="number" 
                  className="w-full p-4 bg-stone-50 dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-2xl font-bold text-stone-800 dark:text-stone-100 focus:border-brand-accent focus:ring-0"
                  value={editingUser.balance || 0}
                  onChange={e => setEditingUser({...editingUser, balance: Number(e.target.value)})}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-stone-800 dark:text-stone-200 mb-2">Learning Streak (Days)</label>
                <input 
                  type="number" 
                  className="w-full p-4 bg-stone-50 dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-2xl font-bold text-stone-800 dark:text-stone-100 focus:border-brand-accent focus:ring-0"
                  value={editingUser.streak || 0}
                  onChange={e => setEditingUser({...editingUser, streak: Number(e.target.value)})}
                />
              </div>

              <div className="pt-4 border-t border-stone-200 dark:border-stone-700">
                <label className="block text-sm font-black text-stone-800 dark:text-stone-200 mb-4 flex items-center gap-2"><Trophy size={18} /> Manage Achievements</label>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                   {achievements.map(ach => {
                     const hasAch = (editingUser.achievements || []).includes(ach.id);
                     return (
                       <div key={ach.id} className="flex items-center justify-between p-3 bg-stone-50 dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-700">
                         <div className="flex items-center gap-3">
                           <span className="text-2xl">{ach.icon_svg}</span>
                           <span className="font-bold text-stone-800 dark:text-stone-100 text-sm">{ach.title}</span>
                         </div>
                         <button 
                           onClick={() => {
                             if (hasAch) removeAchievement(editingUser.id, ach.id);
                             else assignAchievement(editingUser.id, ach.id);
                             
                             // Optimistic UI update
                             setEditingUser({
                               ...editingUser,
                               achievements: hasAch 
                                 ? (editingUser.achievements || []).filter(id => id !== ach.id)
                                 : [...(editingUser.achievements || []), ach.id]
                             })
                           }}
                           className={`px-3 py-1 rounded-lg text-xs font-black uppercase tracking-wider ${hasAch ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'}`}
                         >
                           {hasAch ? 'Revoke' : 'Grant'}
                         </button>
                       </div>
                     )
                   })}
                </div>
              </div>

            </div>

            <div className="flex gap-4 mt-8">
              <button onClick={() => setEditingUser(null)} className="flex-1 py-4 font-bold text-stone-800 dark:text-stone-100 bg-stone-100 dark:bg-stone-900 hover:bg-stone-200 dark:hover:bg-stone-800 rounded-2xl transition-colors">Cancel</button>
              <button onClick={handleSave} className="flex-1 py-4 font-bold text-white bg-brand-accent hover:bg-[#5a781d] rounded-2xl transition-colors">Save Changes</button>
            </div>
          </div>
        </div>
      )}

      {resettingUser && (
        <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-50 flex justify-center items-center p-4">
          <div className="bg-white dark:bg-stone-950 rounded-[32px] w-full max-w-md p-8 border border-stone-200 dark:border-stone-800 shadow-2xl">
            <h3 className="text-2xl font-black text-stone-800 dark:text-stone-100 mb-2 flex items-center gap-2">
              <Key size={24} className="text-rose-600" /> Force Password Reset
            </h3>
            <p className="text-stone-800 dark:text-stone-200 font-bold mb-6 text-sm">
              Enter the exact login email for <span className="text-rose-600 font-black">{resettingUser.name}</span> to send them a secure password reset link.
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-stone-800 dark:text-stone-200 mb-2">User Login Email</label>
                <input 
                  type="email" 
                  placeholder="e.g. user@utajiri.com"
                  className="w-full p-4 bg-stone-50 dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-2xl font-bold text-stone-800 dark:text-stone-100 focus:border-rose-500 focus:ring-0"
                  value={resetEmail}
                  onChange={e => setResetEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <button onClick={() => setResettingUser(null)} className="flex-1 py-4 font-bold text-stone-800 dark:text-stone-100 bg-stone-100 dark:bg-stone-900 hover:bg-stone-200 dark:hover:bg-stone-800 rounded-2xl transition-colors">Cancel</button>
              <button onClick={() => {
                if (resetEmail) {
                  forcePasswordReset(resetEmail);
                  setResettingUser(null);
                }
              }} className="flex-1 py-4 font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-2xl transition-colors">Send Link</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
