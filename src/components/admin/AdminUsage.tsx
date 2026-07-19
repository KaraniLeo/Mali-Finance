import { useEffect, useMemo, useState } from 'react';
import { BarChart3, Clock, Sparkles } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface ChatMetric {
  id: string;
  created_at: string;
  model: string;
  tokens_used: number;
  user_id: string;
  conversation_id: string;
  response_json: Record<string, any>;
}

export function AdminUsage() {
  const [metrics, setMetrics] = useState<ChatMetric[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      const { data, error } = await supabase
        .from('chat_metrics')
        .select('id, created_at, model, tokens_used, user_id, conversation_id, response_json')
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) {
        console.error('Failed to load chat metrics', error);
        setMetrics([]);
      } else {
        setMetrics(data ?? []);
      }
      setLoading(false);
    };

    fetchMetrics();

    const channel = supabase.channel('chat-metrics');

    channel
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'chat_metrics' }, (payload) => {
        setMetrics((current) => [payload.new as ChatMetric, ...current].slice(0, 20));
      })
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);

  const totals = useMemo(() => {
    const totalTokens = metrics.reduce((sum, row) => sum + (row.tokens_used ?? 0), 0);
    const totalChats = metrics.length;
    const avgTokens = totalChats ? Math.round(totalTokens / totalChats) : 0;
    return { totalTokens, totalChats, avgTokens };
  }, [metrics]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-black text-stone-900 dark:text-stone-100">Live OpenAI Token Usage</h3>
          <p className="text-stone-500 dark:text-stone-400">Streamed token updates, recent chat consumption, and usage insights across the platform.</p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-3xl bg-brand-accent/10 px-4 py-3 text-brand-secondary text-sm font-semibold">
          <Sparkles size={18} /> Real-time stream updates
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-[32px] border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 p-6 shadow-sm">
          <div className="flex items-center gap-3 text-stone-500 dark:text-stone-400 mb-4">
            <BarChart3 size={18} /> Total tokens
          </div>
          <p className="text-4xl font-black text-stone-900 dark:text-stone-100">{totals.totalTokens}</p>
          <p className="text-sm text-stone-500 dark:text-stone-400 mt-2">Last {metrics.length} streamed responses</p>
        </div>

        <div className="rounded-[32px] border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 p-6 shadow-sm">
          <div className="flex items-center gap-3 text-stone-500 dark:text-stone-400 mb-4">
            <Clock size={18} /> Latest request
          </div>
          <p className="text-4xl font-black text-stone-900 dark:text-stone-100">{metrics[0]?.tokens_used ?? 0}</p>
          <p className="text-sm text-stone-500 dark:text-stone-400 mt-2">Most recent streamed token count</p>
        </div>

        <div className="rounded-[32px] border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 p-6 shadow-sm">
          <div className="flex items-center gap-3 text-stone-500 dark:text-stone-400 mb-4">
            <Sparkles size={18} /> Average use
          </div>
          <p className="text-4xl font-black text-stone-900 dark:text-stone-100">{totals.avgTokens}</p>
          <p className="text-sm text-stone-500 dark:text-stone-400 mt-2">Average tokens per stream event</p>
        </div>
      </div>

      <div className="rounded-[32px] border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-4">
          <div>
            <h4 className="text-lg font-bold text-stone-900 dark:text-stone-100">Recent token usage trend</h4>
            <p className="text-sm text-stone-500 dark:text-stone-400">Live stream events plotted by recent token consumption.</p>
          </div>
          <span className="text-xs uppercase tracking-[0.3em] text-stone-400 dark:text-stone-500">Live-updating</span>
        </div>

        <div className="grid gap-3">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-8 items-end">
            {metrics.slice(0, 8).map((metric, index) => {
              const value = metric.tokens_used || 0;
              const maxValue = Math.max(...metrics.slice(0, 8).map((item) => item.tokens_used || 0), 1);
              const height = Math.max(32, Math.round((value / maxValue) * 160));
              return (
                <div key={metric.id} className="flex flex-col items-center gap-2">
                  <div className="w-full overflow-hidden rounded-t-3xl bg-brand-accent/10">
                    <div className="rounded-t-3xl bg-brand-accent transition-all" style={{ height: `${height}px` }} />
                  </div>
                  <span className="text-[10px] text-stone-500 dark:text-stone-400">{value}</span>
                </div>
              );
            })}
          </div>
          <div className="flex items-center justify-between text-[11px] text-stone-500 dark:text-stone-400">
            <span>Most recent 8 streamed responses</span>
            <span>{metrics.length} entries</span>
          </div>
        </div>
      </div>

      <div className="rounded-[32px] border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 p-6 shadow-sm">
        <div className="flex items-center justify-between gap-4 mb-4">
          <div>
            <h4 className="text-lg font-bold text-stone-900 dark:text-stone-100">Recent token log</h4>
            <p className="text-sm text-stone-500 dark:text-stone-400">New chat metrics appear automatically as they arrive.</p>
          </div>
        </div>

        {loading ? (
          <div className="text-stone-500">Loading metrics…</div>
        ) : metrics.length === 0 ? (
          <div className="text-stone-500">No chat metrics yet. Start a conversation to see live data.</div>
        ) : (
          <div className="grid gap-3">
            {metrics.map((metric) => (
              <div key={metric.id} className="rounded-3xl border border-stone-100 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-stone-600 dark:text-stone-300">
                  <span className="font-semibold text-stone-900">{metric.model}</span>
                  <span>{new Date(metric.created_at).toLocaleString()}</span>
                </div>
                <div className="mt-3 flex items-center gap-3">
                  <span className="rounded-2xl bg-brand-accent/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-brand-secondary">{metric.tokens_used} tokens</span>
                  <span className="text-sm text-stone-500">user: {metric.user_id}</span>
                </div>
                <p className="mt-3 text-sm text-stone-700 line-clamp-3">{metric.response_json?.prompt ?? 'No prompt available'}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
