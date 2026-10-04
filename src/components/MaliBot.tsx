import React, { useState, useEffect, useRef } from 'react';
import { Send } from 'lucide-react';
import { ChatMessage, User } from '../types';

interface MaliBotProps {
  user: User;
  chatHistory: ChatMessage[];
  onSendMessage: (text: string) => void;
  onUpgradeClick?: () => void;
  isThinking?: boolean;
}

export function MaliBot({ user, chatHistory, onSendMessage, isThinking }: MaliBotProps) {
  const [chatInput, setChatInput] = useState('');
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [chatHistory.length, isThinking]);

  const handleSend = () => {
    if (!chatInput.trim()) return;
    onSendMessage(chatInput);
    setChatInput('');
  };

  return (
    <div className="flex-1 min-h-[400px] rounded-[32px] md:rounded-[40px] bg-brand-accent/10 dark:bg-brand-accent/5 p-6 md:p-8 flex flex-col border border-[#A3B18A]/20 dark:border-stone-800 shadow-inner">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-white dark:bg-stone-800 border border-stone-100 dark:border-stone-700 rounded-xl flex items-center justify-center text-2xl shadow-md">🤖</div>
          <div>
            <h3 className="text-base font-extrabold text-brand-secondary leading-tight">MaliBot AI</h3>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-[8px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Smart Wealth Tutor</span>
            </div>
          </div>
        </div>
      </div>

      <div ref={messagesContainerRef} className="flex-1 bg-white/30 dark:bg-stone-900/30 rounded-2xl p-4 mb-4 overflow-y-auto custom-scrollbar text-sm space-y-4">
        {(() => {
          const fallbackWelcome = {
            role: 'bot' as const,
            text: `Jambo ${user.name}! I'm MaliBot. Let's start your journey to wealth.`
          };
          const displayedMessages = chatHistory.length > 0 ? chatHistory : [fallbackWelcome];
          return displayedMessages.map((chat, i) => (
            <div key={i} className={`flex ${chat.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[90%] px-4 py-3 rounded-2xl ${
                chat.role === 'user' 
                  ? 'bg-brand-accent text-brand-accent-text font-bold rounded-tr-none shadow-sm' 
                  : 'bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 rounded-tl-none border border-stone-100 dark:border-stone-700 shadow-sm italic'
              }`}>
                {chat.text}
              </div>
            </div>
          ));
        })()}
        {isThinking && (
          <div className="flex justify-start">
            <div className="bg-white dark:bg-stone-800 px-5 py-3.5 rounded-2xl rounded-tl-none border border-stone-100 dark:border-stone-700 shadow-sm flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-brand-accent animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2.5 h-2.5 rounded-full bg-brand-accent animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2.5 h-2.5 rounded-full bg-brand-accent animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        )}
      </div>

      <div className="relative">
        <input 
          type="text" 
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask MaliBot anything about saving, investing, or budgeting..." 
          className="w-full bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 border border-transparent dark:border-stone-700 rounded-2xl py-3 px-4 text-sm pr-12 focus:ring-4 focus:ring-brand-accent/10 focus:outline-none shadow-lg"
        />
        <button 
          onClick={handleSend}
          className="absolute right-1.5 top-1.5 w-10 h-10 bg-brand-accent text-brand-accent-text rounded-xl flex items-center justify-center shadow-lg hover:scale-105 transition-transform cursor-pointer"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}
