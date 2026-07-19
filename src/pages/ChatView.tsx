import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Plus,
  MessageSquare,
  Edit3,
  Trash2,
  Archive,
  Send,
  Copy,
  RefreshCcw,
  ThumbsUp,
  ThumbsDown,
  Bookmark,
  Sparkles,
} from 'lucide-react';
import { User, ChatMessage, ChatConversation } from '../types';
import { useChatStore } from '../state/chatStore';
import { streamMaliResponse, MaliResponse } from '../lib/openai';
import { supabase } from '../lib/supabase';
import { PaymentModal } from '../components/PaymentModal';

interface ChatViewProps {
  user: User;
  onPaymentSuccess?: () => void;
}

const groupConversationsByDate = (conversations: ChatConversation[]) => {
  const groups: Record<string, ChatConversation[]> = {
    Today: [],
    Yesterday: [],
    'Last 7 Days': [],
    'Last 30 Days': [],
    Older: [],
  };

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const last7 = new Date(today);
  last7.setDate(today.getDate() - 7);
  const last30 = new Date(today);
  last30.setDate(today.getDate() - 30);

  conversations.forEach((conversation) => {
    const updatedAt = new Date(conversation.updated_at);
    if (updatedAt >= today) {
      groups.Today.push(conversation);
    } else if (updatedAt >= yesterday) {
      groups.Yesterday.push(conversation);
    } else if (updatedAt >= last7) {
      groups['Last 7 Days'].push(conversation);
    } else if (updatedAt >= last30) {
      groups['Last 30 Days'].push(conversation);
    } else {
      groups.Older.push(conversation);
    }
  });

  return groups;
};

const buildTitleFromPrompt = (prompt: string) => {
  const clean = prompt.trim().replace(/\n+/g, ' ').replace(/[^\w\s]/g, '');
  if (!clean) return 'New conversation';
  const words = clean.split(' ').filter(Boolean);
  const title = words.slice(0, 5).join(' ');
  return title.length > 0 ? `${title.charAt(0).toUpperCase()}${title.slice(1)}${words.length > 5 ? '...' : ''}` : 'New conversation';
};

const formatTimestamp = (value: string) => {
  const date = new Date(value);
  return date.toLocaleString([], { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
};

export function ChatView({ user, onPaymentSuccess }: ChatViewProps) {
  const {
    conversations,
    activeConversationId,
    activeMessages,
    isLoading,
    isSaving,
    searchQuery,
    setSearchQuery,
    setActiveConversation,
    loadConversations,
    createConversation,
    renameConversation,
    archiveConversation,
    deleteConversation,
    addMessage,
  } = useChatStore();

  const [draft, setDraft] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [displayedResponse, setDisplayedResponse] = useState('');
  const [estimatedTokens, setEstimatedTokens] = useState<number | null>(null);
  const [lastUsage, setLastUsage] = useState<MaliResponse['usage']>(undefined);
  const [editingTitle, setEditingTitle] = useState(false);
  const [titleDraft, setTitleDraft] = useState('');
  const [clearModalOpen, setClearModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  useEffect(() => {
    loadConversations(user.id);
  }, [loadConversations, user.id]);

  useEffect(() => {
    if (!activeConversationId && conversations.length > 0) {
      setActiveConversation(conversations[0].id);
    }
  }, [activeConversationId, conversations, setActiveConversation]);

  useEffect(() => {
    if (activeConversationId && conversations.length > 0) {
      const current = conversations.find((conversation) => conversation.id === activeConversationId);
      if (current) {
        setTitleDraft(current.title);
      }
    }
  }, [activeConversationId, conversations]);

  const activeConversation = conversations.find((conversation) => conversation.id === activeConversationId) ?? null;
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [feedbackStatus, setFeedbackStatus] = useState<'liked' | 'disliked' | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (activeConversationId) {
      setDisplayedResponse('');
      setEstimatedTokens(null);
      setStatusMessage(null);
      setErrorMessage(null);
      setIsThinking(false);
    }
  }, [activeConversationId]);

  useEffect(() => {
    if (!messagesEndRef.current) return;
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [activeMessages.length, displayedResponse, isThinking, activeConversationId]);

  const getLatestAssistantResponse = () => {
    if (displayedResponse) return displayedResponse;
    const lastBotMessage = [...activeMessages].reverse().find((message) => message.role === 'bot');
    return lastBotMessage?.text ?? '';
  };

  const showTemporaryStatus = (message: string) => {
    setStatusMessage(message);
    setErrorMessage(null);
    window.setTimeout(() => setStatusMessage(null), 3200);
  };

  const copyLatestResponse = async () => {
    const text = getLatestAssistantResponse().trim();
    if (!text) {
      setErrorMessage('No response available to copy yet.');
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      showTemporaryStatus('Latest response copied to clipboard.');
    } catch (err) {
      console.error('Copy failed', err);
      setErrorMessage('Unable to copy reply.');
    }
  };

  const saveLatestResponse = () => {
    const text = getLatestAssistantResponse().trim();
    if (!text) {
      setErrorMessage('No response available to save yet.');
      return;
    }

    setIsSaved(true);
    showTemporaryStatus('Latest response saved for this session.');
    window.setTimeout(() => setIsSaved(false), 3200);
  };

  const handleFeedback = (value: 'liked' | 'disliked') => {
    setFeedbackStatus((current) => (current === value ? null : value));
    showTemporaryStatus(value === feedbackStatus ? 'Reaction removed.' : `Marked response as ${value}.`);
  };

  const handleRegenerateResponse = async () => {
    if (!activeConversationId) return;
    if (isThinking) {
      setErrorMessage('Wait until the current response finishes before regenerating.');
      return;
    }

    const lastUserMessage = [...activeMessages].reverse().find((message) => message.role === 'user');
    if (!lastUserMessage) {
      setErrorMessage('No previous user prompt found to regenerate.');
      return;
    }

    if (!user.chatbotPaid && user.chatCount !== undefined && user.chatCount >= 5) {
      setIsPaymentModalOpen(true);
      setErrorMessage('You have exhausted your 5 free chatbot requests. Please pay KES 300 to continue chatting.');
      return;
    }

    setErrorMessage(null);
    setStatusMessage('Regenerating response...');
    setIsThinking(true);
    setDisplayedResponse('');
    setEstimatedTokens(null);

    try {
      const history = [...activeMessages];
      const response = await streamMaliResponse(
        lastUserMessage.text,
        { name: user.name, tier: user.tier },
        history,
        (partial, estimate) => {
          setDisplayedResponse(partial);
          setEstimatedTokens(estimate);
        },
      );

      setLastUsage(response.usage);
      setIsThinking(false);
      const saved = await addMessage(activeConversationId, { role: 'bot', text: response.text });
      setDisplayedResponse('');
      if (!saved) {
        setErrorMessage('Regenerated response received but could not be saved.');
      } else {
        showTemporaryStatus('Response regenerated successfully.');
        if (onPaymentSuccess) onPaymentSuccess();
      }
    } catch (error: any) {
      setIsThinking(false);
      if (error?.message?.includes('402') || error?.message?.includes('payment_required')) {
        setIsPaymentModalOpen(true);
        setErrorMessage('You have exhausted your 5 free chatbot requests. Please pay KES 300 to continue chatting.');
      } else {
        setErrorMessage(error?.message || 'Failed to regenerate response.');
      }
    }
  };

  const visibleConversations = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return query
      ? conversations.filter((conversation) => conversation.title.toLowerCase().includes(query))
      : conversations;
  }, [conversations, searchQuery]);

  const grouped = useMemo(() => groupConversationsByDate(visibleConversations), [visibleConversations]);

  const handleStartNewConversation = async () => {
    setErrorMessage(null);
    const conversation = await createConversation(user.id, 'New conversation');
    if (conversation) {
      setTitleDraft(conversation.title);
      setActiveConversation(conversation.id);
    } else {
      setErrorMessage('Unable to start a new chat.');
    }
  };

  const handleSendMessage = async () => {
    if (!draft.trim()) return;

    if (!user.chatbotPaid && user.chatCount !== undefined && user.chatCount >= 5) {
      setIsPaymentModalOpen(true);
      setErrorMessage('You have exhausted your 5 free chatbot requests. Please pay KES 300 to continue chatting.');
      return;
    }

    setErrorMessage(null);
    const userPrompt = draft.trim();
    setDraft('');

    let conversationId = activeConversationId;
    let currentTitle = activeConversation?.title || '';

    if (!conversationId) {
      const autoTitle = buildTitleFromPrompt(userPrompt);
      const conversation = await createConversation(user.id, autoTitle);
      if (!conversation) {
        setErrorMessage('Unable to start a new conversation.');
        return;
      }
      conversationId = conversation.id;
      currentTitle = conversation.title;
      setTitleDraft(conversation.title);
      setActiveConversation(conversationId);
    }

    if (currentTitle === 'New conversation') {
      const autoTitle = buildTitleFromPrompt(userPrompt);
      await renameConversation(conversationId, autoTitle);
      setTitleDraft(autoTitle);
    }

    await addMessage(conversationId, { role: 'user', text: userPrompt });
    setIsThinking(true);
    setDisplayedResponse('');
    setEstimatedTokens(null);

    try {
      const history = conversationId === activeConversationId
        ? [...activeMessages, { role: 'user' as const, text: userPrompt }]
        : [{ role: 'user' as const, text: userPrompt }];

      const response = await streamMaliResponse(
        userPrompt,
        { name: user.name, tier: user.tier },
        history,
        (partial, estimate) => {
          setDisplayedResponse(partial);
          setEstimatedTokens(estimate);
        },
      );

      setLastUsage(response.usage);
      setIsThinking(false);
      const saved = await addMessage(conversationId, { role: 'bot', text: response.text });
      setDisplayedResponse('');
      if (!saved) {
        setErrorMessage('Response received but could not be saved.');
      }
      if (onPaymentSuccess) onPaymentSuccess();

      await supabase.from('chat_metrics').insert([
        {
          user_id: user.id,
          conversation_id: conversationId,
          model: response.model ?? 'gpt-4o-mini',
          tokens_used: response.usage?.total_tokens ?? estimatedTokens ?? 0,
          response_json: {
            prompt: userPrompt,
            text: response.text,
            usage: response.usage,
          },
        },
      ]);
    } catch (error: any) {
      setIsThinking(false);
      if (error?.message?.includes('402') || error?.message?.includes('payment_required')) {
        setIsPaymentModalOpen(true);
        setErrorMessage('You have exhausted your 5 free chatbot requests. Please pay KES 300 to continue chatting.');
      } else {
        setErrorMessage(error?.message || 'Failed to generate a response.');
      }
    }
  };

  const handleTitleSave = async () => {
    if (!activeConversationId || !titleDraft.trim()) return;
    await renameConversation(activeConversationId, titleDraft.trim());
    setEditingTitle(false);
  };

  const handleClearConversation = async (scope: 'current' | 'all') => {
    if (!activeConversationId) {
      setClearModalOpen(false);
      return;
    }

    try {
      if (scope === 'current') {
        await supabase.from('messages').delete().eq('conversation_id', activeConversationId);
        await setActiveConversation(activeConversationId);
      } else if (scope === 'all') {
        await supabase.from('messages').delete().in('conversation_id', conversations.map((c) => c.id));
        if (activeConversationId) {
          await setActiveConversation(activeConversationId);
        }
      }
    } catch (error) {
      console.error('Failed to clear messages', error);
      setErrorMessage('Could not clear the selected chat history.');
    } finally {
      setClearModalOpen(false);
    }
  };

  return (
    <div className="chat-root grid grid-cols-1 xl:grid-cols-[320px_minmax(0,1fr)] gap-6 h-full min-h-0 overflow-hidden">
      <aside className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-5 flex flex-col gap-4 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-stone-500 dark:text-stone-400">Assistant</p>
            <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">Mali Conversations</h2>
          </div>
          <button onClick={handleStartNewConversation} disabled={isSaving} className="inline-flex items-center gap-2 px-3 py-2 rounded-2xl bg-brand-accent text-white text-sm font-bold hover:bg-brand-accent/90 transition-all">
            <Plus size={16} /> New
          </button>
        </div>

        <div className="flex items-center gap-3 bg-stone-100 dark:bg-stone-950 rounded-2xl px-3 py-2">
          <Search size={18} className="text-stone-400 dark:text-stone-500" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search chats"
            className="w-full bg-transparent text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-500 dark:placeholder:text-stone-400 focus:outline-none"
          />
        </div>

        <div className="overflow-y-auto custom-scrollbar space-y-4 flex-1 min-h-0">
          {isLoading && <div className="text-sm text-stone-600 dark:text-stone-400">Loading conversations...</div>}
          {!isLoading && visibleConversations.length === 0 && (
            <div className="text-sm text-stone-600 dark:text-stone-400">Start a new chat to keep your learning conversations here.</div>
          )}

          {Object.entries(grouped).map(([group, items]) =>
            items.length > 0 ? (
              <div key={group}>
                <div className="text-[10px] uppercase tracking-[0.3em] text-stone-500 dark:text-stone-400 mb-2">{group}</div>
                <div className="space-y-2">
                  {items.map((conversation) => (
                    <button
                      key={conversation.id}
                      onClick={() => setActiveConversation(conversation.id)}
                      className={`w-full text-left p-3 rounded-3xl transition-all ${conversation.id === activeConversationId ? 'bg-brand-accent text-white shadow-lg' : 'bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-900'}`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-semibold text-sm truncate">{conversation.title}</span>
                        <span className="text-[11px] text-stone-600 dark:text-stone-400">{formatTimestamp(conversation.updated_at)}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ) : null
          )}
        </div>
      </aside>

      <section className="flex flex-col rounded-3xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 shadow-sm overflow-hidden">
        <header className="flex flex-col gap-4 p-6 border-b border-stone-200 dark:border-stone-800">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="text-xs uppercase tracking-[0.3em] text-stone-500 dark:text-stone-400 flex items-center gap-2">
                <MessageSquare size={14} /> Conversation
              </div>
              {activeConversation ? (
                editingTitle ? (
                  <div className="flex items-center gap-3 mt-3">
                    <input
                      value={titleDraft}
                      onChange={(e) => setTitleDraft(e.target.value)}
                      className="w-full rounded-2xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 px-4 py-3 text-lg font-bold text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-brand-accent/50"
                    />
                    <button onClick={handleTitleSave} className="px-4 py-2 rounded-2xl bg-brand-accent text-white font-bold hover:bg-brand-accent/90 transition-colors">Save</button>
                  </div>
                ) : (
                  <div className="mt-3 flex items-center gap-3">
                    <h1 className="text-2xl md:text-3xl font-extrabold text-stone-900 dark:text-stone-100 truncate">{activeConversation.title}</h1>
                    <button onClick={() => setEditingTitle(true)} className="inline-flex items-center gap-2 rounded-2xl bg-stone-100 dark:bg-stone-900 px-3 py-2 text-sm font-semibold text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-800 transition-all">
                      <Edit3 size={16} /> Rename
                    </button>
                  </div>
                )
              ) : (
                <div className="mt-3 text-stone-600 dark:text-stone-400">Select a conversation or start a new one to begin.</div>
              )}
            </div>

            <div className="flex flex-col items-end gap-2">
              {(estimatedTokens !== null || lastUsage) && (
                <div className="rounded-2xl bg-stone-100 dark:bg-stone-900 px-3 py-2 text-[11px] uppercase tracking-[0.3em] text-stone-700 dark:text-stone-300">
                  {estimatedTokens !== null
                    ? `Estimating tokens while streaming: ${estimatedTokens}`
                    : `Tokens used: ${lastUsage?.total_tokens ?? 0}`}
                </div>
              )}
              <div className="inline-flex items-center gap-2 rounded-2xl bg-brand-accent/10 text-brand-secondary dark:text-brand-accent px-3 py-2 text-sm font-semibold">
                <Sparkles size={16} /> Fast, intelligent assistant
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button onClick={() => setClearModalOpen(true)} disabled={!activeConversationId} className="rounded-2xl bg-stone-100 dark:bg-stone-900 px-4 py-2 text-sm font-semibold text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
              Clear chat
            </button>
            <button onClick={() => activeConversationId && archiveConversation(activeConversationId)} disabled={!activeConversationId} className="inline-flex items-center gap-2 rounded-2xl bg-stone-100 dark:bg-stone-900 px-4 py-2 text-sm font-semibold text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
              <Archive size={16} /> Archive
            </button>
            <button onClick={() => activeConversationId && deleteConversation(activeConversationId)} disabled={!activeConversationId} className="inline-flex items-center gap-2 rounded-2xl bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400 px-4 py-2 text-sm font-semibold hover:bg-rose-200 dark:hover:bg-rose-900/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
              <Trash2 size={16} /> Delete
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-hidden flex flex-col">
          <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-4">
            {!activeConversation && (
              <div className="p-6 rounded-3xl border border-dashed border-stone-200 dark:border-stone-800 text-center text-stone-600 dark:text-stone-400">
                No conversation is selected. Start a new chat to keep your learning history safe across devices.
              </div>
            )}

            {activeConversation && (
              <div className="space-y-4">
                {activeMessages.map((message) => (
                  <motion.div key={message.id ?? `${message.role}-${message.text.slice(0, 20)}`}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`max-w-[90%] ${
                      message.role === 'user'
                        ? 'ml-auto bg-brand-accent text-brand-accent-text font-bold rounded-[32px] rounded-br-none'
                        : `mr-auto bg-stone-100 dark:bg-stone-900 text-stone-900 dark:text-stone-100 rounded-[32px] rounded-bl-none border border-stone-200 dark:border-stone-800 ${
                            user.tier === 'junior' ? 'bot-message-junior' : user.tier === 'teen' ? 'bot-message-teen' : 'bot-message-pro'
                          }`
                    }`}
                  >
                    <div className="p-5 text-sm leading-7 whitespace-pre-wrap">{message.text}</div>
                  </motion.div>
                ))}

                {isThinking && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`max-w-[80%] mr-auto bg-stone-100 dark:bg-stone-900 text-stone-900 dark:text-stone-100 rounded-[32px] rounded-bl-none border border-stone-200 dark:border-stone-800 p-5 ${
                    user.tier === 'junior' ? 'bot-message-junior' : user.tier === 'teen' ? 'bot-message-teen' : 'bot-message-pro'
                  }`}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 rounded-2xl bg-brand-accent/10 text-brand-accent flex items-center justify-center">🤖</div>
                      <div>
                        <p className="text-sm font-semibold text-stone-800 dark:text-stone-200">Mali is thinking...</p>
                        <p className="text-[11px] text-stone-600 dark:text-stone-400">Generating a helpful response for you.</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse"></span>
                      <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse animation-delay-100"></span>
                      <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse animation-delay-200"></span>
                    </div>
                  </motion.div>
                )}

                {displayedResponse && !(
                  activeMessages.length > 0 &&
                  activeMessages[activeMessages.length - 1].role === 'bot' &&
                  activeMessages[activeMessages.length - 1].text === displayedResponse
                ) && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`max-w-[80%] mr-auto bg-stone-100 dark:bg-stone-900 text-stone-900 dark:text-stone-100 rounded-[32px] rounded-bl-none border border-stone-200 dark:border-stone-800 p-5 ${
                    user.tier === 'junior' ? 'bot-message-junior' : user.tier === 'teen' ? 'bot-message-teen' : 'bot-message-pro'
                  }`}>
                    <div className="text-sm leading-7 whitespace-pre-wrap">{displayedResponse}</div>
                    {isThinking && <div className="mt-3 text-xs text-stone-600 dark:text-stone-400">Streaming response…</div>}
                  </motion.div>
                )}
                <div ref={messagesEndRef} className="h-0 w-full" />
              </div>
            )}
          </div>

          <div className="border-t border-stone-200 dark:border-stone-800 p-5 bg-stone-50 dark:bg-stone-950">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between gap-3 text-xs uppercase tracking-[0.3em] text-stone-600 dark:text-stone-400">
                <span>Ask Mali anything about money, savings, or life goals.</span>
                <span>{activeMessages.length} messages</span>
              </div>
              {(() => {
                const isLocked = !user.chatbotPaid && user.chatCount !== undefined && user.chatCount >= 5;
                return (
                  <div className="space-y-3 w-full">
                    {isLocked && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 rounded-3xl bg-gradient-to-r from-amber-500/10 via-brand-accent/10 to-amber-500/10 border border-amber-500/25 flex flex-col sm:flex-row items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xl">🔒</span>
                          <div className="text-left">
                            <p className="text-sm font-bold text-stone-900 dark:text-stone-100">MaliBot Locked (5/5 Free Chats Used)</p>
                            <p className="text-xs text-stone-500 dark:text-stone-400">Unlock unlimited lifetime financial mentoring for just KES 300.</p>
                          </div>
                        </div>
                        <button 
                          onClick={() => setIsPaymentModalOpen(true)}
                          className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white rounded-xl text-xs font-black shadow-md hover:scale-105 transition-all cursor-pointer whitespace-nowrap"
                        >
                          Unlock Unlimited Access ✨
                        </button>
                      </motion.div>
                    )}
                    <div className="relative">
                      <textarea
                        value={draft}
                        onChange={(e) => setDraft(e.target.value)}
                        rows={2}
                        disabled={isLocked}
                        placeholder={isLocked ? "🔒 Chat limit reached. Please pay KES 300 to unlock unlimited access." : "Type your question here..."}
                        className={`min-h-[72px] w-full resize-none rounded-3xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 px-4 py-4 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-4 focus:ring-brand-accent/15 ${isLocked ? 'opacity-60 cursor-not-allowed bg-stone-50 dark:bg-stone-950/40' : ''}`}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            if (!isLocked) handleSendMessage();
                          }
                        }}
                      />
                      <button
                        onClick={handleSendMessage}
                        disabled={isThinking || !draft.trim() || isLocked}
                        className="absolute right-4 bottom-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand-accent text-white shadow-lg hover:bg-brand-accent/90 transition-all disabled:opacity-50"
                      >
                        <Send size={18} />
                      </button>
                    </div>
                  </div>
                );
              })()}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={copyLatestResponse}
                    disabled={!getLatestAssistantResponse()}
                    className="inline-flex items-center gap-2 rounded-2xl bg-stone-100 dark:bg-stone-900 px-3 py-2 text-xs font-semibold text-stone-700 dark:text-stone-200 hover:bg-stone-200 dark:hover:bg-stone-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Copy size={14} /> Copy
                  </button>
                  <button
                    type="button"
                    onClick={handleRegenerateResponse}
                    disabled={!activeConversationId}
                    className="inline-flex items-center gap-2 rounded-2xl bg-stone-100 dark:bg-stone-900 px-3 py-2 text-xs font-semibold text-stone-700 dark:text-stone-200 hover:bg-stone-200 dark:hover:bg-stone-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <RefreshCcw size={14} /> Regenerate
                  </button>
                  <button
                    type="button"
                    onClick={() => handleFeedback('liked')}
                    className={`inline-flex items-center gap-2 rounded-2xl px-3 py-2 text-xs font-semibold transition-all ${feedbackStatus === 'liked' ? 'bg-brand-accent text-white' : 'bg-stone-100 dark:bg-stone-900 text-stone-700 dark:text-stone-200 hover:bg-stone-200 dark:hover:bg-stone-800'}`}
                  >
                    <ThumbsUp size={14} /> Like
                  </button>
                  <button
                    type="button"
                    onClick={() => handleFeedback('disliked')}
                    className={`inline-flex items-center gap-2 rounded-2xl px-3 py-2 text-xs font-semibold transition-all ${feedbackStatus === 'disliked' ? 'bg-rose-500 text-white' : 'bg-stone-100 dark:bg-stone-900 text-stone-700 dark:text-stone-200 hover:bg-stone-200 dark:hover:bg-stone-800'}`}
                  >
                    <ThumbsDown size={14} /> Dislike
                  </button>
                  <button
                    type="button"
                    onClick={saveLatestResponse}
                    disabled={!getLatestAssistantResponse()}
                    className={`inline-flex items-center gap-2 rounded-2xl px-3 py-2 text-xs font-semibold transition-all ${isSaved ? 'bg-emerald-500 text-white' : 'bg-stone-100 dark:bg-stone-900 text-stone-700 dark:text-stone-200 hover:bg-stone-200 dark:hover:bg-stone-800'} disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    <Bookmark size={14} /> {isSaved ? 'Saved' : 'Save'}
                  </button>
                </div>
                <span className="text-xs text-stone-600 dark:text-stone-400">
                  {statusMessage || errorMessage || 'Mali remembers this conversation while you browse.'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {clearModalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 30, opacity: 0 }} className="w-full max-w-md rounded-3xl bg-white dark:bg-stone-950 p-6 shadow-2xl border border-stone-200 dark:border-stone-800">
              <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">Clear conversation</h3>
              <p className="mt-3 text-sm text-stone-700 dark:text-stone-300">Choose how to clear your history. This action is not instantly destructive until you confirm.</p>
              <div className="mt-5 grid gap-3">
                <button onClick={() => handleClearConversation('current')} className="w-full rounded-2xl bg-brand-accent text-white px-4 py-3 font-semibold hover:bg-brand-accent/90 transition-colors">Clear current chat</button>
                <button onClick={() => handleClearConversation('all')} className="w-full rounded-2xl bg-stone-100 dark:bg-stone-900 text-stone-900 dark:text-stone-100 px-4 py-3 font-semibold hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors">Clear all chats</button>
                <button onClick={() => setClearModalOpen(false)} className="w-full rounded-2xl border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 px-4 py-3 font-semibold hover:bg-stone-50 dark:hover:bg-stone-900 transition-colors">Cancel</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        userId={user.id}
        onPaymentSuccess={() => {
          if (onPaymentSuccess) {
            onPaymentSuccess();
          }
        }}
      />
    </div>
  );
}
