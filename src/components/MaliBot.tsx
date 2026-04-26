import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { ChatMessage, User } from '../types';

interface MaliBotProps {
  user: User;
  chatHistory: ChatMessage[];
  onSendMessage: (text: string) => void;
}

export function MaliBot({ user, chatHistory, onSendMessage }: MaliBotProps) {
  const [chatInput, setChatInput] = useState('');

  const handleSend = () => {
    if (!chatInput.trim()) return;
    onSendMessage(chatInput);
    setChatInput('');
  };

  return (
    <div className="flex-1 min-h-[400px] rounded-[32px] md:rounded-[40px] bg-[#A3B18A]/10 p-6 md:p-8 flex flex-col border border-[#A3B18A]/20 shadow-inner">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-xl flex items-center justify-center text-2xl shadow-md">🤖</div>
          <div>
            <h3 className="text-base font-extrabold text-[#2D3911] leading-tight">MaliBot AI</h3>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-[8px] font-bold text-emerald-600 uppercase tracking-widest">Smart Wealth Tutor</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 bg-white/30 rounded-2xl p-4 mb-4 overflow-y-auto custom-scrollbar text-sm space-y-4">
        {chatHistory.map((chat, i) => (
          <div key={i} className={`flex ${chat.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[90%] px-4 py-3 rounded-2xl ${
              chat.role === 'user' 
                ? 'bg-[#6B8E23] text-white rounded-tr-none' 
                : 'bg-white text-stone-600 rounded-tl-none border border-stone-100 shadow-sm italic'
            }`}>
              {chat.text}
            </div>
          </div>
        ))}
      </div>

      <div className="relative">
        <input 
          type="text" 
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask anything..." 
          className="w-full bg-white border-2 border-transparent rounded-2xl py-3 px-4 text-sm pr-12 focus:ring-4 focus:ring-[#6B8E23]/10 focus:outline-none shadow-lg"
        />
        <button 
          onClick={handleSend}
          className="absolute right-1.5 top-1.5 w-10 h-10 bg-[#6B8E23] text-white rounded-xl flex items-center justify-center shadow-lg hover:scale-105"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}
