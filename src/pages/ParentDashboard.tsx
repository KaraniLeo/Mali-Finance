import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShieldCheck,
  Users,
  Settings,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Target,
  Activity,
  CheckCircle2,
  Circle,
  Calendar,
  Award,
  Sparkles,
  Plus,
  Search,
  Trash2,
  Send,
  FileText,
  PieChart,
  Clock,
  ArrowRight,
  Home,
  Palette,
  Menu,
  X,
  Sun,
  Moon,
  LogOut
} from 'lucide-react';
import { User, WealthJar, Transaction, Task } from '../types';
import { supabase } from '../lib/supabase';
import { formatCurrency } from '../lib/currency';
import { toast } from '../state/toastStore';
import { useParentCoachingStore } from '../state/parentCoachingStore';
import { useSidebarStore } from '../state/sidebarStore';
import { useTheme } from '../context/ThemeContext';

interface AccountabilityPartnerDashboardProps {
  user: User;
  onLogout: () => void;
}

export function AccountabilityPartnerDashboard({ user, onLogout }: AccountabilityPartnerDashboardProps) {
  const [childrenData, setChildrenData] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedChildId, setSelectedChildId] = useState<string | null>(null);

  // Tab State
  const [activeTab, setActiveTab] = useState<'dashboard' | 'analytics' | 'interventions' | 'challenges' | 'notes' | 'activity' | 'themes'>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Child Specific Data
  const [childWalletBalance, setChildWalletBalance] = useState<number | null>(null);
  const [childJars, setChildJars] = useState<WealthJar[]>([]);
  const [childTransactions, setChildTransactions] = useState<Transaction[]>([]);
  const [childDebts, setChildDebts] = useState<any[]>([]);
  const [childTasks, setChildTasks] = useState<Task[]>([]);
  const [childLessonsCompleted, setChildLessonsCompleted] = useState<number>(0);
  const [childTotalLessons, setChildTotalLessons] = useState<number>(0);
  const [childChallenges, setChildChallenges] = useState<any[]>([]);
  const [childBudgetRules, setChildBudgetRules] = useState<any[]>([]);

  // Challenge Assignment Forms State
  const [customChallengeTitle, setCustomChallengeTitle] = useState('');
  const [customChallengeDays, setCustomChallengeDays] = useState(7);
  const [customChallengeReward, setCustomChallengeReward] = useState(1000);
  const [showChallengeForm, setShowChallengeForm] = useState(false);

  // Note entry
  const [noteText, setNoteText] = useState('');

  // Challenge processing lock state
  const [processingChallengeId, setProcessingChallengeId] = useState<string | null>(null);
  const [isCreatingChallenge, setIsCreatingChallenge] = useState(false);

  // Spent categories date filters
  const [spentFilterStartDate, setSpentFilterStartDate] = useState('');
  const [spentFilterEndDate, setSpentFilterEndDate] = useState('');

  // Intervention success feedback modal
  const [showInterventionSuccess, setShowInterventionSuccess] = useState<{
    show: boolean;
    title: string;
    description: string;
  }>({ show: false, title: '', description: '' });

  // Scheduler / coaching triggers State
  const [showCheckInModal, setShowCheckInModal] = useState(false);
  const [checkInDate, setCheckInDate] = useState('');
  const [checkInTime, setCheckInTime] = useState('');
  const [showEncouragementPrompt, setShowEncouragementPrompt] = useState(false);
  const [encouragementText, setEncouragementText] = useState('');
  const [showCustomMessageModal, setShowCustomMessageModal] = useState(false);
  const [customMessageText, setCustomMessageText] = useState('');
  const [customMessageType, setCustomMessageType] = useState<'warning' | 'encouragement' | 'checkin'>('warning');

  // UI layout expansion
  const { isExpanded, toggleSidebar } = useSidebarStore();
  const { theme, toggleTheme } = useTheme();

  // Coaching Notes store (local storage based)
  const localNotes = useParentCoachingStore(state => state.notes);
  const localFeedItems = useParentCoachingStore(state => state.heatMap); // Map overrides
  const customScores = useParentCoachingStore(state => state.customScores);
  const { initializeChildIfNeeded } = useParentCoachingStore();

  const activeChild = childrenData.find(c => c.id === selectedChildId);

  // Load children list
  const fetchChildren = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*, wallets(balance)')
        .eq('parent_id', user.id);
      if (error) throw error;
      if (data) {
        const mappedData = data.map((profile: any) => {
          const wallet = Array.isArray(profile.wallets)
            ? profile.wallets[0]
            : profile.wallets;
          const balance = wallet ? Number(wallet.balance || 0) : 0;
          return {
            ...profile,
            balance
          };
        });
        setChildrenData(mappedData as User[]);
        if (mappedData.length > 0 && !selectedChildId) {
          setSelectedChildId(mappedData[0].id);
        }
      }
    } catch (e: any) {
      toast.error('Failed to load mentored accounts: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  // Load child details
  const fetchChildDetails = async (childId: string) => {
    try {
      // 1. Fetch child wallet
      const { data: walletData } = await supabase
        .from('wallets')
        .select('id, balance')
        .eq('user_id', childId)
        .single();

      if (walletData) {
        setChildWalletBalance(Number(walletData.balance || 0));

        // 2. Fetch jars
        const { data: jarData } = await supabase
          .from('wealth_jars')
          .select('*')
          .eq('wallet_id', walletData.id)
          .order('created_at', { ascending: true });
        if (jarData) setChildJars(jarData as WealthJar[]);

        // 3. Fetch transactions
        const { data: txData } = await supabase
          .from('transactions')
          .select('*')
          .eq('wallet_id', walletData.id)
          .order('created_at', { ascending: false })
          .limit(100);
        if (txData) setChildTransactions(txData as Transaction[]);

        // 4. Fetch debts
        const { data: debtData } = await supabase
          .from('debts')
          .select('*')
          .eq('wallet_id', walletData.id);
        if (debtData) setChildDebts(debtData);

        // 5. Fetch budget rules
        const { data: rulesData } = await supabase
          .from('budget_rules')
          .select('*')
          .eq('wallet_id', walletData.id);
        if (rulesData) setChildBudgetRules(rulesData);
      } else {
        setChildWalletBalance(null);
        setChildJars([]);
        setChildTransactions([]);
        setChildDebts([]);
        setChildBudgetRules([]);
      }

      // 6. Fetch tasks
      const { data: taskData } = await supabase
        .from('user_tasks')
        .select('*')
        .eq('user_id', childId)
        .order('created_at', { ascending: false });
      if (taskData) setChildTasks(taskData as Task[]);

      // 7. Fetch completed lesson progress
      const { data: progressData } = await supabase
        .from('lesson_progress')
        .select('completed')
        .eq('user_id', childId)
        .eq('completed', true);
      if (progressData) setChildLessonsCompleted(progressData.length);

      // 8. Fetch total lessons
      const { count } = await supabase
        .from('lessons')
        .select('id', { count: 'exact', head: true });
      if (count) setChildTotalLessons(count);

      // 9. Fetch challenges
      try {
        const { data: challengeData, error: challengeErr } = await supabase
          .from('challenges')
          .select('*')
          .eq('child_id', childId)
          .order('created_at', { ascending: false });
        if (challengeErr) throw challengeErr;
        if (challengeData) setChildChallenges(challengeData);
      } catch (err) {
        console.warn('Failed to fetch challenges from DB, using local storage fallback:', err);
        const localChs = JSON.parse(localStorage.getItem('mali_local_challenges') || '[]');
        const filtered = localChs.filter((c: any) => c.child_id === childId);
        setChildChallenges(filtered);
      }

    } catch (e: any) {
      console.error('Error loading child details:', e);
    }
  };

  useEffect(() => {
    fetchChildren();
  }, [user.id]);

  useEffect(() => {
    if (selectedChildId) {
      // Clear previous child specific states instantly to avoid showing stale data
      setChildWalletBalance(null);
      setChildJars([]);
      setChildTransactions([]);
      setChildDebts([]);
      setChildTasks([]);
      setChildChallenges([]);
      setChildBudgetRules([]);
      setChildLessonsCompleted(0);
      setChildTotalLessons(0);

      fetchChildDetails(selectedChildId);
      // Initialize local notes store if needed
      if (activeChild) {
        initializeChildIfNeeded(selectedChildId, activeChild.name);
      }
    }
  }, [selectedChildId]);

  // Helpers for score calculations
  const getDynamicScores = () => {
    if (!activeChild) return {
      healthScore: 0, healthMessage: 'No child account selected.',
      accountabilityScore: 0, accountabilityMessage: 'No child account selected.',
      trustScore: 0, trustMessage: 'No child account selected.'
    };

    // 1. Health Score (Jars progress target)
    const totalJarsSaved = childJars.reduce((sum, j) => sum + Number(j.balance || 0), 0);
    const totalJarsTarget = childJars.reduce((sum, j) => sum + Number(j.target || 0), 0);
    const healthScore = totalJarsTarget > 0
      ? Math.min(100, Math.round((totalJarsSaved / totalJarsTarget) * 100))
      : 0;
    const healthMessage = totalJarsTarget > 0
      ? `Savings goals are ${healthScore}% complete. Total jars balance is ${formatCurrency(totalJarsSaved)}.`
      : `No savings goals set. Encourage child to set targets.`;

    // 2. Discipline Index (Accountability Score) - chore tasks completed ratio & check 7d debits exceeding limit
    const completedTasks = childTasks.filter(t => t.completed).length;
    const totalTasks = childTasks.length;
    const taskRate = totalTasks > 0 ? (completedTasks / totalTasks) : 0;

    // Check transactions in past 7 days for debits exceeding spending limit
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const debitTxsLast7d = childTransactions.filter(t =>
      t.type === 'debit' &&
      new Date(t.created_at) >= sevenDaysAgo
    );
    const totalDebitLast7d = debitTxsLast7d.reduce((sum, t) => sum + Number(t.amount), 0);

    const limit = Number(activeChild.spendingLimit || 0);
    const hasExceededLimit = limit > 0 && totalDebitLast7d > limit;

    let penalty = 0;
    let limitMessage = '';
    if (hasExceededLimit) {
      penalty = 25; // Apply a 25% compliance penalty if spending exceeds limit
      limitMessage = ` Exceeded spending limit of ${formatCurrency(limit)} (Spent ${formatCurrency(totalDebitLast7d)} in last 7 days).`;
    } else if (limit > 0) {
      limitMessage = ` Within spending limit of ${formatCurrency(limit)} (Spent ${formatCurrency(totalDebitLast7d)} in last 7 days).`;
    }

    const chorePct = totalTasks > 0 ? Math.round(taskRate * 100) : 100;
    const baseAccountabilityScore = totalTasks > 0 ? Math.round(taskRate * 100) : 100;
    const accountabilityScore = Math.max(0, baseAccountabilityScore - penalty);
    const accountabilityMessage = totalTasks > 0
      ? `Completed ${chorePct}% of tasks (${completedTasks}/${totalTasks}).${limitMessage}`
      : `No chores assigned yet.${limitMessage}`;

    // 3. Financial Trust
    // Analyzes outstanding debts, active challenge completions, and streaks to output a dynamic rating.
    const activeDebtsCount = childDebts.filter(d => Number(d.remaining_amount || 0) > 0).length;
    const completedChallengesCount = childChallenges.filter(c => c.status === 'completed').length;
    const streakVal = activeChild.streak || 0;

    // Base trust is 80. Streak adds bonus (up to 20). Outstanding debt deducts (15 per debt).
    // Completed challenges add bonus (+5 per completion, up to 15).
    const debtPenaltyVal = activeDebtsCount * 15;
    const streakBonusVal = Math.min(20, streakVal * 2);
    const challengeBonusVal = Math.min(15, completedChallengesCount * 5);
    const trustScore = Math.max(10, Math.min(100, 80 + streakBonusVal + challengeBonusVal - debtPenaltyVal));

    const trustRating = trustScore >= 85 ? 'Excellent' : trustScore >= 70 ? 'Good' : trustScore >= 50 ? 'Fair' : 'Needs Improvement';
    const trustMessage = `Rating: ${trustRating}. Active streak: ${streakVal} days, ${activeDebtsCount} outstanding debts, ${completedChallengesCount} challenges completed.`;

    return { healthScore, healthMessage, accountabilityScore, accountabilityMessage, trustScore, trustMessage };
  };

  const scores = getDynamicScores();

  // Child Risk Status helper
  const getChildRiskLevel = (child: User, hs: number, acs: number) => {
    if (hs < 50 || acs < 55) return 'Needs Attention';
    if (hs < 75 || acs < 75) return 'Monitor';
    return 'Healthy';
  };

  const currentRisk = activeChild ? getChildRiskLevel(activeChild, scores.healthScore, scores.accountabilityScore) : 'Healthy';

  // Helper for rendering SVG circular progress colors
  const getCircleColor = (score: number) => {
    if (score >= 90) return '#10B981'; // Green
    if (score >= 75) return '#F59E0B'; // Amber
    if (score >= 50) return '#EF4444'; // Orange/Red
    return '#DC2626'; // Critical Red
  };

  // Coaching Summary Description Generator
  const getDynamicReportSummary = () => {
    if (!activeChild) return '';
    const name = activeChild.name;
    const bal = formatCurrency(childWalletBalance || 0);
    const saved = formatCurrency(childJars.reduce((sum, j) => sum + Number(j.balance || 0), 0));
    const incompleteTasksCount = childTasks.filter(t => !t.completed).length;

    let advice = '';
    if (currentRisk === 'Needs Attention') {
      advice = `Suggest reviewing their monthly spending limit and ensuring active tasks are completed to improve trust scores.`;
    } else if (currentRisk === 'Monitor') {
      advice = `Good savings buffer, but they have ${incompleteTasksCount} incomplete chore tasks. Encourage checking off tasks for additional rewards.`;
    } else {
      advice = `${name} is displaying exemplary compliance. Savings jars are growing and tasks are up to date!`;
    }

    return `${name} is currently in a ${currentRisk.toUpperCase()} state, holding a wallet balance of ${bal} and a total of ${saved} across savings jars. ${advice}`;
  };

  // Coaching notes actions
  const handleAddNote = () => {
    if (!selectedChildId || !noteText.trim()) return;
    useParentCoachingStore.getState().initializeChildIfNeeded(selectedChildId, activeChild?.name || 'Child');
    useParentCoachingStore.getState().addNote(selectedChildId, noteText.trim());
    setNoteText('');
    toast.success('Coaching note saved successfully.');
  };

  const handleDeleteNote = (noteId: string) => {
    if (!selectedChildId) return;
    useParentCoachingStore.getState().deleteNote(selectedChildId, noteId);
    toast.success('Coaching note deleted.');
  };

  // Challenge approval mechanics (database transactions sync)
  const handleApproveChallenge = async (challenge: any) => {
    if (!selectedChildId || processingChallengeId) return;
    setProcessingChallengeId(challenge.id);
    try {
      // 1. Fetch Child Wallet
      const { data: walletData, error: walletErr } = await supabase
        .from('wallets')
        .select('id, balance')
        .eq('user_id', selectedChildId)
        .single();

      if (walletErr || !walletData) {
        toast.error('Unable to fetch child wallet for crediting.');
        return;
      }

      // Check if challenge is already completed to prevent double approval
      const currentChStatus = childChallenges.find(c => c.id === challenge.id)?.status;
      if (currentChStatus === 'completed') {
        toast.error('This challenge has already been approved.');
        return;
      }

      const reward = Number(challenge.reward_amount || 0);
      const newWalletBalance = Number(walletData.balance || 0) + reward;

      // 2. Fetch Child Profile Balance
      const { data: profileData, error: profileErr } = await supabase
        .from('profiles')
        .select('balance')
        .eq('id', selectedChildId)
        .single();

      if (profileErr || !profileData) {
        toast.error('Unable to fetch child profile.');
        return;
      }

      const newProfileBalance = Number(profileData.balance || 0) + reward;

      // 3. Update Challenge Status in DB or Local
      try {
        const { error: chErr } = await supabase
          .from('challenges')
          .update({ status: 'completed' })
          .eq('id', challenge.id);
        if (chErr) throw chErr;
      } catch (err) {
        console.warn('Failed to update challenge status in DB, updating local storage:', err);
      }

      const localChs = JSON.parse(localStorage.getItem('mali_local_challenges') || '[]');
      const updatedChs = localChs.map((c: any) => c.id === challenge.id ? { ...c, status: 'completed' } : c);
      localStorage.setItem('mali_local_challenges', JSON.stringify(updatedChs));

      // 4. Update Wallet Balance
      const { error: wallUpdateErr } = await supabase
        .from('wallets')
        .update({ balance: newWalletBalance })
        .eq('id', walletData.id);
      if (wallUpdateErr) throw wallUpdateErr;

      // 5. Update Profile Balance
      const { error: profUpdateErr } = await supabase
        .from('profiles')
        .update({ balance: newProfileBalance })
        .eq('id', selectedChildId);
      if (profUpdateErr) throw profUpdateErr;

      // 6. Insert transaction
      const { error: txErr } = await supabase
        .from('transactions')
        .insert({
          wallet_id: walletData.id,
          amount: reward,
          type: 'credit',
          description: `Challenge Passed: ${challenge.title}`
        });
      if (txErr) throw txErr;

      toast.success(`Approved! KES ${reward} has been credited to ${activeChild?.name}'s account.`);
      fetchChildDetails(selectedChildId);

      // Log into feed / notes
      useParentCoachingStore.getState().initializeChildIfNeeded(selectedChildId, activeChild?.name || 'Child');
      useParentCoachingStore.getState().addNote(selectedChildId, `Approved Challenge: "${challenge.title}" (+KES ${reward})`);
    } catch (e: any) {
      console.error(e);
      toast.error('Failed to credit challenge reward: ' + e.message);
    } finally {
      setProcessingChallengeId(null);
    }
  };

  const handleRejectChallenge = async (challenge: any) => {
    if (!selectedChildId || processingChallengeId) return;
    setProcessingChallengeId(challenge.id);
    try {
      try {
        const { error } = await supabase
          .from('challenges')
          .update({ status: 'failed' })
          .eq('id', challenge.id);
        if (error) throw error;
      } catch (err) {
        console.warn('Failed to update challenge in DB, updating local storage:', err);
      }

      const localChs = JSON.parse(localStorage.getItem('mali_local_challenges') || '[]');
      const updatedChs = localChs.map((c: any) => c.id === challenge.id ? { ...c, status: 'failed' } : c);
      localStorage.setItem('mali_local_challenges', JSON.stringify(updatedChs));

      toast.success('Challenge marked as failed.');
      fetchChildDetails(selectedChildId!);
    } catch (e: any) {
      toast.error('Failed to reject challenge: ' + e.message);
    } finally {
      setProcessingChallengeId(null);
    }
  };

  const handleDeleteChallenge = async (challengeId: string) => {
    if (!selectedChildId || processingChallengeId) return;
    
    // Optimistic UI update: immediately remove from local state
    setChildChallenges(prev => prev.filter(c => c.id !== challengeId));
    
    setProcessingChallengeId(challengeId);
    try {
      try {
        const { error } = await supabase
          .from('challenges')
          .delete()
          .eq('id', challengeId);
        if (error) throw error;
      } catch (err) {
        console.warn('Failed to delete challenge in DB, updating local storage:', err);
      }

      const localChs = JSON.parse(localStorage.getItem('mali_local_challenges') || '[]');
      const filteredChs = localChs.filter((c: any) => c.id !== challengeId);
      localStorage.setItem('mali_local_challenges', JSON.stringify(filteredChs));

      toast.success('Challenge deleted successfully.');
      await fetchChildDetails(selectedChildId!);
    } catch (e: any) {
      toast.error('Failed to delete challenge: ' + e.message);
      // Re-fetch details to restore state in case of network failure
      await fetchChildDetails(selectedChildId!);
    } finally {
      setProcessingChallengeId(null);
    }
  };

  const handleCreateChallenge = async (presetTitle?: string, presetDays?: number, presetReward?: number) => {
    if (!selectedChildId || isCreatingChallenge) return;
    setIsCreatingChallenge(true);

    const title = presetTitle || customChallengeTitle.trim();
    const days = presetDays || customChallengeDays;
    const reward = presetReward || customChallengeReward;

    if (!title) {
      toast.error('Please specify a title for the challenge.');
      setIsCreatingChallenge(false);
      return;
    }

    const challengeObj = {
      parent_id: user.id,
      child_id: selectedChildId,
      title,
      duration_days: days,
      target: days,
      reward_amount: reward,
      status: 'active'
    };

    try {
      const { error } = await supabase
        .from('challenges')
        .insert(challengeObj);

      if (error) throw error;

      toast.success(`Challenge assigned to ${activeChild?.name}!`);
      await fetchChildDetails(selectedChildId);
    } catch (err: any) {
      console.warn('Failed to insert challenge into DB, using local storage fallback:', err.message);
      const localChs = JSON.parse(localStorage.getItem('mali_local_challenges') || '[]');
      const newCh = {
        id: 'ch-' + Date.now(),
        ...challengeObj,
        created_at: new Date().toISOString()
      };
      localStorage.setItem('mali_local_challenges', JSON.stringify([newCh, ...localChs]));
      toast.success(`Challenge assigned (local fallback) to ${activeChild?.name}!`);
      await fetchChildDetails(selectedChildId);
    } finally {
      // Clear forms
      setCustomChallengeTitle('');
      setCustomChallengeDays(7);
      setCustomChallengeReward(1000);
      setShowChallengeForm(false);
      setIsCreatingChallenge(false);
    }
  };

  // Coaching quick triggers
  const handleTriggerAction = async (type: 'reminder' | 'encouragement' | 'checkin' | 'custom') => {
    if (!selectedChildId || !activeChild) return;

    if (type === 'reminder') {
      const messageObj = {
        parent_id: user.id,
        child_id: selectedChildId,
        message: 'Please update your tasks and log your wallet expenses for today!',
        type: 'warning' as const
      };
      try {
        const { error } = await supabase
          .from('coaching_messages')
          .insert(messageObj);
        if (error) throw error;
        toast.success(`Expense logging reminder notification dispatched to ${activeChild.name}.`);
      } catch (err: any) {
        console.warn('Failed to send database reminder, using local storage fallback:', err.message);
        const localMsgs = JSON.parse(localStorage.getItem('mali_local_coaching_messages') || '[]');
        const newMsg = {
          id: 'msg-' + Date.now(),
          ...messageObj,
          created_at: new Date().toISOString()
        };
        localStorage.setItem('mali_local_coaching_messages', JSON.stringify([newMsg, ...localMsgs]));
        toast.success(`Expense logging reminder notification dispatched (local fallback) to ${activeChild.name}.`);
      }
      useParentCoachingStore.getState().initializeChildIfNeeded(selectedChildId, activeChild.name);
      useParentCoachingStore.getState().addNote(selectedChildId, `Sent logging chore reminders to child.`);

      // Show custom popup message in the interventions page
      setShowInterventionSuccess({
        show: true,
        title: 'Daily Logging Reminder Sent!',
        description: `Daily chore and expense logging reminder has been successfully dispatched. ${activeChild.name} has been notified.`
      });
    } else if (type === 'encouragement') {
      setShowEncouragementPrompt(true);
    } else if (type === 'checkin') {
      // Set default date and time to today and current hour/minute
      const today = new Date().toISOString().split('T')[0];
      const nowTime = new Date().toTimeString().slice(0, 5);
      setCheckInDate(today);
      setCheckInTime(nowTime);
      setShowCheckInModal(true);
    } else if (type === 'custom') {
      setShowCustomMessageModal(true);
    }
  };

  const handleSendEncouragement = async () => {
    if (!encouragementText.trim()) return;
    const messageObj = {
      parent_id: user.id,
      child_id: selectedChildId!,
      message: encouragementText.trim(),
      type: 'encouragement' as const
    };
    try {
      const { error } = await supabase
        .from('coaching_messages')
        .insert(messageObj);
      if (error) throw error;
      toast.success(`Message sent to ${activeChild?.name}: "${encouragementText}"`);
    } catch (e: any) {
      console.warn('Failed to send encouragement to DB, using local storage fallback:', e.message);
      const localMsgs = JSON.parse(localStorage.getItem('mali_local_coaching_messages') || '[]');
      const newMsg = {
        id: 'msg-' + Date.now(),
        ...messageObj,
        created_at: new Date().toISOString()
      };
      localStorage.setItem('mali_local_coaching_messages', JSON.stringify([newMsg, ...localMsgs]));
      toast.success(`Message sent (local fallback) to ${activeChild?.name}: "${encouragementText}"`);
    }
    useParentCoachingStore.getState().initializeChildIfNeeded(selectedChildId!, activeChild!.name);
    useParentCoachingStore.getState().addNote(selectedChildId!, `Sent Encouragement: "${encouragementText}"`);

    // Show custom popup message in the interventions page
    setShowInterventionSuccess({
      show: true,
      title: 'Encouragement Praise Sent!',
      description: `Your encouragement praise message has been successfully sent. ${activeChild?.name} has been notified.`
    });

    setEncouragementText('');
    setShowEncouragementPrompt(false);
  };

  const handleScheduleCheckIn = async () => {
    if (!checkInDate || !checkInTime) {
      toast.error('Please pick a date and time.');
      return;
    }
    const messageText = `Check-in scheduled for ${checkInDate} at ${checkInTime}.`;
    const messageObj = {
      parent_id: user.id,
      child_id: selectedChildId!,
      message: messageText,
      type: 'checkin' as const,
      meta_data: { date: checkInDate, time: checkInTime }
    };
    try {
      const { error } = await supabase
        .from('coaching_messages')
        .insert(messageObj);
      if (error) throw error;
      toast.success(`Performance review scheduled for ${checkInDate} at ${checkInTime}`);
    } catch (e: any) {
      console.warn('Failed to schedule check-in on DB, using local storage fallback:', e.message);
      const localMsgs = JSON.parse(localStorage.getItem('mali_local_coaching_messages') || '[]');
      const newMsg = {
        id: 'msg-' + Date.now(),
        ...messageObj,
        created_at: new Date().toISOString()
      };
      localStorage.setItem('mali_local_coaching_messages', JSON.stringify([newMsg, ...localMsgs]));
      toast.success(`Performance review scheduled (local fallback) for ${checkInDate} at ${checkInTime}`);
    }
    useParentCoachingStore.getState().initializeChildIfNeeded(selectedChildId!, activeChild!.name);
    useParentCoachingStore.getState().addNote(selectedChildId!, `Scheduled Review Check-In: ${checkInDate} ${checkInTime}`);

    // Show custom popup message in the interventions page
    setShowInterventionSuccess({
      show: true,
      title: 'Review Check-In Scheduled!',
      description: `Review check-in has been scheduled for ${checkInDate} at ${checkInTime}. ${activeChild?.name} has been notified.`
    });

    setShowCheckInModal(false);
  };

  const handleSendCustomMessage = async () => {
    if (!customMessageText.trim()) {
      toast.error('Please enter a message.');
      return;
    }
    const messageObj = {
      parent_id: user.id,
      child_id: selectedChildId!,
      message: customMessageText.trim(),
      type: customMessageType
    };
    try {
      const { error } = await supabase
        .from('coaching_messages')
        .insert(messageObj);
      if (error) throw error;
      toast.success(`Custom ${customMessageType} message sent to ${activeChild?.name}!`);
    } catch (e: any) {
      console.warn('Failed to send message on DB, using local storage fallback:', e.message);
      const localMsgs = JSON.parse(localStorage.getItem('mali_local_coaching_messages') || '[]');
      const newMsg = {
        id: 'msg-' + Date.now(),
        ...messageObj,
        created_at: new Date().toISOString()
      };
      localStorage.setItem('mali_local_coaching_messages', JSON.stringify([newMsg, ...localMsgs]));
      toast.success(`Custom ${customMessageType} message sent (local fallback) to ${activeChild?.name}!`);
    }
    useParentCoachingStore.getState().initializeChildIfNeeded(selectedChildId!, activeChild!.name);
    useParentCoachingStore.getState().addNote(selectedChildId!, `Sent Custom ${customMessageType}: "${customMessageText}"`);

    // Show custom popup message in the interventions page
    setShowInterventionSuccess({
      show: true,
      title: `Custom ${customMessageType === 'warning' ? 'Warning' : customMessageType === 'checkin' ? 'Check-In' : 'Encouragement'} Sent!`,
      description: `Your custom message has been successfully sent. ${activeChild?.name} has been notified.`
    });

    setCustomMessageText('');
    setShowCustomMessageModal(false);
  };

  // Theming handles
  const handleSwitchTheme = (themeName: 'junior' | 'teen' | 'pro') => {
    const root = document.documentElement;
    root.classList.remove('theme-junior', 'theme-teen', 'theme-pro');
    root.classList.add(`theme-${themeName}`);
    localStorage.setItem(`theme-tier-${user.id}`, `theme-${themeName}`);
    toast.success(`Switched theme style to: theme-${themeName}`);
  };

  // SVG dynamic indicator builders
  const getCircularScoreProgress = (score: number, strokeColor: string) => {
    const radius = 34;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;

    return (
      <div className="relative flex items-center justify-center shrink-0">
        <svg className="w-20 h-20 transform -rotate-90">
          <circle cx="40" cy="40" r={radius} stroke="rgba(0,0,0,0.06)" strokeWidth="7" fill="transparent" />
          <motion.circle
            cx="40" cy="40" r={radius}
            stroke={strokeColor} strokeWidth="7" fill="transparent"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />
        </svg>
        <span className="absolute text-sm font-black text-stone-900 dark:text-white leading-none">{score}%</span>
      </div>
    );
  };

  // Legible risk helper text colors
  const getRiskColor = (level: string) => {
    if (level === 'Healthy') return 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900/40';
    if (level === 'Monitor') return 'text-amber-800 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/30';
    return 'text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900/40';
  };

  // Compile visual activity items derived from Supabase
  const unifiedActivityItems = React.useMemo(() => {
    const items: any[] = [];

    childTransactions.forEach(tx => {
      items.push({
        id: tx.id,
        title: tx.type === 'credit' ? 'Wallet Credit Received' : 'Expense Logged',
        desc: `${tx.description || 'General transaction'} - ${formatCurrency(Number(tx.amount))}`,
        type: tx.type === 'credit' ? 'credit' : 'debit',
        time: tx.created_at,
        icon: tx.type === 'credit' ? '📈' : '📉'
      });
    });

    childTasks.filter(t => t.completed).forEach(t => {
      items.push({
        id: t.id,
        title: 'Chore Task Completed',
        desc: `${t.title} - Earned KES ${t.reward}`,
        type: 'task',
        time: t.created_at,
        icon: '🏆'
      });
    });

    childChallenges.forEach(ch => {
      items.push({
        id: ch.id,
        title: `Challenge: ${ch.title}`,
        desc: `Status: ${ch.status.toUpperCase()} - Reward: KES ${ch.reward_amount}`,
        type: 'challenge',
        time: ch.assigned_at || ch.created_at,
        icon: '🎯'
      });
    });

    return items.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()).slice(0, 30);
  }, [childTransactions, childTasks, childChallenges]);

  // Insights derived dynamically
  const dynamicRecommendations = React.useMemo(() => {
    const recommendations = [];
    if (!activeChild) return [];

    if (scores.healthScore < 70) {
      recommendations.push({
        id: 'h-1',
        title: 'Optimize Savings Goals targets',
        desc: `Savings target progress is at ${scores.healthScore}%. We recommend updating child's wallet rules to allocate more into active savings jars.`,
        type: 'warning'
      });
    }

    const activeDebtsCount = childDebts.filter(d => Number(d.remaining_amount || 0) > 0).length;
    if (activeDebtsCount > 0) {
      recommendations.push({
        id: 'd-1',
        title: 'Review Active Loan Repayments',
        desc: `Mentored child currently holds ${activeDebtsCount} unpaid micro-loan debts. Sitting down to review repayment rules can improve trust score.`,
        type: 'info'
      });
    }

    const incompleteChoreCount = childTasks.filter(t => !t.completed).length;
    if (incompleteChoreCount > 0) {
      recommendations.push({
        id: 't-1',
        title: 'Chore Completion Lagging',
        desc: `${activeChild.name} has ${incompleteChoreCount} pending tasks. Dispatching check-in reminders can help trigger completion.`,
        type: 'warning'
      });
    }

    if (recommendations.length === 0) {
      recommendations.push({
        id: 'o-1',
        title: 'All Systems Optimal',
        desc: `Savings, budget compliance, and tasks completion are well within healthy boundaries. Check back next week for fresh reports.`,
        type: 'success'
      });
    }

    return recommendations;
  }, [activeChild, childDebts, childTasks, childJars, scores]);

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-stone-950 font-sans text-stone-900 dark:text-white transition-colors duration-200">

      {/* Sidebar Navigation */}
      <motion.nav
        animate={{ width: isExpanded ? 260 : 96 }}
        className="flex-shrink-0 bg-stone-100 dark:bg-stone-900 border-r border-stone-200 dark:border-stone-800 flex flex-col p-6 fixed lg:relative inset-y-0 left-0 z-40 transition-transform lg:translate-x-0"
      >
        {/* Brand header */}
        <div className="flex items-center justify-between mb-8 overflow-hidden shrink-0">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={toggleSidebar}>
            <div className="w-12 h-12 flex-shrink-0 bg-brand-accent text-brand-accent-text rounded-2xl flex items-center justify-center font-black text-2xl shadow-lg">M</div>
            <AnimatePresence>
              {isExpanded && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  className="text-2xl font-black tracking-tight brand text-brand-secondary dark:text-brand-primary whitespace-nowrap"
                >
                  MALI
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation list */}
        <div className="flex flex-col gap-6 overflow-y-auto flex-1 custom-scrollbar pr-1">
          {isExpanded ? (
            <div className="text-[10px] font-black uppercase tracking-[0.22em] text-stone-900 dark:text-white whitespace-nowrap">COACH PORTAL</div>
          ) : (
            <div className="h-4"></div>
          )}

          <div className="flex flex-col gap-1.5">
            <NavItem
              icon={<Home size={22} />}
              label="Dashboard"
              active={activeTab === 'dashboard'}
              isExpanded={isExpanded}
              onClick={() => { setActiveTab('dashboard'); }}
            />
            <NavItem
              icon={<PieChart size={22} />}
              label="Analytics & Reports"
              active={activeTab === 'analytics'}
              isExpanded={isExpanded}
              onClick={() => { setActiveTab('analytics'); }}
            />
            <NavItem
              icon={<Sparkles size={22} />}
              label="Interventions"
              active={activeTab === 'interventions'}
              isExpanded={isExpanded}
              onClick={() => { setActiveTab('interventions'); }}
            />
            <NavItem
              icon={<Target size={22} />}
              label="Challenges"
              active={activeTab === 'challenges'}
              isExpanded={isExpanded}
              onClick={() => { setActiveTab('challenges'); }}
            />
            <NavItem
              icon={<FileText size={22} />}
              label="Coaching Notes"
              active={activeTab === 'notes'}
              isExpanded={isExpanded}
              onClick={() => { setActiveTab('notes'); }}
            />
            <NavItem
              icon={<Clock size={22} />}
              label="Activity Feed"
              active={activeTab === 'activity'}
              isExpanded={isExpanded}
              onClick={() => { setActiveTab('activity'); }}
            />
            <NavItem
              icon={<Palette size={22} />}
              label="Themes & Settings"
              active={activeTab === 'themes'}
              isExpanded={isExpanded}
              onClick={() => { setActiveTab('themes'); }}
            />
          </div>
        </div>

        {/* Profile Card and Logout */}
        <div className="mt-auto pt-6 flex flex-col gap-4 overflow-hidden shrink-0 border-t border-stone-200 dark:border-stone-800">
          <div className={`p-3 rounded-2xl bg-stone-200/50 dark:bg-stone-950 flex items-center ${isExpanded ? 'gap-3' : 'justify-center p-2'}`}>
            <div className="w-10 h-10 rounded-xl bg-indigo-300 border border-white dark:border-stone-800 shadow-sm overflow-hidden flex-shrink-0">
              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} alt="Avatar" />
            </div>
            <AnimatePresence>
              {isExpanded && (
                <motion.div initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: 'auto' }} exit={{ opacity: 0, width: 0 }} className="min-w-0 whitespace-nowrap">
                  <div className="text-xs font-black truncate text-stone-900 dark:text-white leading-tight">{user.name}</div>
                  <div className="text-[9px] text-stone-800 dark:text-stone-200 dark:text-stone-700 dark:text-stone-200 font-bold uppercase tracking-wider">Parent Coach</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <button
            onClick={onLogout}
            className={`w-full text-[10px] font-black uppercase text-stone-900 dark:text-white hover:text-red-500 tracking-widest transition-colors flex items-center gap-2 cursor-pointer ${isExpanded ? 'justify-start px-4' : 'justify-center'}`}
            title="Logout Account"
          >
            <LogOut size={14} />
            {isExpanded && <span>Sign Out</span>}
          </button>
        </div>
      </motion.nav>

      {/* Main Page Layout */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-slate-50 dark:bg-stone-950">

        {/* Global Page Header */}
        <header className="bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 px-8 py-5 flex flex-col md:flex-row md:justify-between md:items-center gap-4 shrink-0 shadow-sm z-10">
          <div>
            <h1 className="text-xl font-black text-stone-900 dark:text-white tracking-tight flex items-center gap-2 leading-none uppercase">
              {activeTab === 'dashboard' && 'Dashboard Overview'}
              {activeTab === 'analytics' && 'Analytics & Reports'}
              {activeTab === 'interventions' && 'Action Interventions'}
              {activeTab === 'challenges' && 'Sync Challenges Board'}
              {activeTab === 'notes' && 'Parent Coaching Notes'}
              {activeTab === 'activity' && 'Connected Activity Feed'}
              {activeTab === 'themes' && 'Themes & Color Switcher'}
            </h1>
            <p className="text-stone-600 dark:text-stone-300 font-semibold text-xs mt-1">
              {activeTab === 'dashboard' && 'Monitor health and wallet activities of your children.'}
              {activeTab === 'analytics' && 'Categorized cash flow summaries and category allocations.'}
              {activeTab === 'interventions' && 'Send praise/reviews and view automated suggestions.'}
              {activeTab === 'challenges' && 'Database-backed custom challenges assigner.'}
              {activeTab === 'notes' && 'Record observations on financial behaviors.'}
              {activeTab === 'activity' && 'Chronological log of child transactions and completes.'}
              {activeTab === 'themes' && 'Modify dashboard layout color models and themes.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {/* Global Selected Child Selector */}
            {childrenData.length > 0 ? (
              <div className="flex items-center gap-2 bg-stone-100 dark:bg-stone-950 p-1.5 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-inner">
                <span className="text-[10px] font-black uppercase text-stone-900 dark:text-white tracking-wider px-2">Coaching:</span>
                <div className="flex gap-1">
                  {childrenData.map(c => {
                    const isSelected = c.id === selectedChildId;
                    return (
                      <button
                        key={c.id}
                        onClick={() => setSelectedChildId(c.id)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${isSelected
                            ? 'bg-brand-accent text-brand-accent-text shadow-md scale-105'
                            : 'hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-900 dark:text-white'
                          }`}
                      >
                        <span>{c.tier === 'junior' ? '👶' : c.tier === 'pro' ? '👱' : '👦'}</span>
                        <span className="max-w-[70px] truncate">{c.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : null}

            {/* Linking code box */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-900/60 text-amber-800 dark:text-amber-300 rounded-xl font-bold text-xs shadow-sm">
              Linking Code: <span className="font-mono text-sm tracking-widest font-black text-amber-900 dark:text-amber-200 ml-1">{user.linkingCode || (user as any).linking_code || 'N/A'}</span>
            </div>
          </div>
        </header>

        {/* Scrollable sub-views container */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-slate-50 dark:bg-stone-950 custom-scrollbar">
          <div className="max-w-7xl mx-auto">

            {childrenData.length === 0 ? (
              <div className="bg-white dark:bg-stone-900 rounded-[32px] p-12 border border-stone-200 dark:border-stone-800 shadow-sm text-center max-w-2xl mx-auto my-12 text-stone-900 dark:text-white">
                <div className="w-24 h-24 bg-stone-100 dark:bg-stone-950 rounded-full flex items-center justify-center text-5xl mx-auto mb-6 border border-stone-200 dark:border-stone-800 shadow-inner">🔗</div>
                <h3 className="text-2xl font-black mb-2">Connect a Mentored Account</h3>
                <p className="font-medium mb-8 leading-relaxed text-stone-600 dark:text-stone-300">
                  To start coaching, ask your child/mentee to enter your linking code <strong className="px-2 py-1 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 rounded-lg font-mono tracking-wider text-amber-800 dark:text-amber-300">{user.linkingCode || (user as any).linking_code}</strong> on their Profile Settings page.
                </p>
                <div className="p-5 bg-stone-100 dark:bg-stone-950 rounded-2xl border border-stone-200 dark:border-stone-800 text-left space-y-2">
                  <h4 className="font-extrabold text-xs uppercase tracking-wider text-stone-900 dark:text-white">Features unlocked once connected:</h4>
                  <ul className="text-xs space-y-1.5 list-disc list-inside text-stone-700 dark:text-stone-300">
                    <li>Monitor live wallet balance and savings targets.</li>
                    <li>Review detailed discipline index and weekly performance reports.</li>
                    <li>Assign customized financial tasks, rewards, and micro-challenges.</li>
                    <li>Analyze spending category breakdowns.</li>
                  </ul>
                </div>
              </div>
            ) : activeChild ? (
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab + '-' + selectedChildId}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.22 }}
                  className="space-y-8"
                >

                  {/* TAB 1: DASHBOARD VIEW */}
                  {activeTab === 'dashboard' && (
                    <div className="space-y-8">
                      {/* Summary dynamic header */}
                      <section className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 rounded-[32px] shadow-sm flex items-start gap-4">
                        <div className="p-3 bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-900 text-amber-700 dark:text-amber-400 rounded-2xl shrink-0">
                          <AlertTriangle size={24} />
                        </div>
                        <div>
                          <h3 className="font-extrabold text-xs uppercase tracking-wider text-stone-900 dark:text-white">Live Behavior Report</h3>
                          <p className="text-sm font-semibold mt-1 leading-relaxed text-stone-800 dark:text-stone-100">
                            {getDynamicReportSummary()}
                          </p>
                        </div>
                      </section>

                      {/* Mentored Portfolio Grid Summary */}
                      <section className="space-y-3">
                        <h2 className="text-xs font-black text-stone-900 dark:text-white uppercase tracking-widest flex items-center gap-2">
                          <Users size={16} /> Mentored User Portfolio
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                          {childrenData.map(c => {
                            const isSelected = c.id === selectedChildId;
                            const childScores = c.id === selectedChildId ? scores : { healthScore: 70, accountabilityScore: 70, trustScore: 70 };
                            const risk = getChildRiskLevel(c, childScores.healthScore, childScores.accountabilityScore);

                            return (
                              <motion.div
                                key={c.id}
                                onClick={() => setSelectedChildId(c.id)}
                                whileHover={{ y: -3 }}
                                className={`cursor-pointer p-5 rounded-2xl border transition-all flex items-start gap-4 relative overflow-hidden bg-white dark:bg-stone-900 shadow-sm ${isSelected
                                    ? 'border-brand-accent ring-2 ring-brand-accent/20'
                                    : 'border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700'
                                  }`}
                              >
                                <div className="w-12 h-12 bg-stone-100 dark:bg-stone-950 rounded-full flex items-center justify-center text-2xl border border-stone-200 dark:border-stone-800 shrink-0">
                                  {c.tier === 'junior' ? '👶' : (c.tier === 'pro' ? '👱' : '👦')}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex justify-between items-start">
                                    <h3 className="font-extrabold text-stone-900 dark:text-white truncate text-sm leading-none">{c.name}</h3>
                                    <span className="text-[9px] bg-stone-100 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 text-stone-900 dark:text-white px-2 py-0.5 rounded font-black uppercase tracking-wider shrink-0 leading-none">{c.tier}</span>
                                  </div>
                                  <div className="mt-3 grid grid-cols-2 gap-2 text-stone-900 dark:text-white">
                                    <div>
                                      <p className="text-[9px] font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300">Balance</p>
                                      <p className="text-xs font-black tabular-nums">{formatCurrency(c.id === selectedChildId ? (childWalletBalance || 0) : c.balance)}</p>
                                    </div>
                                    <div>
                                      <p className="text-[9px] font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300">Streak</p>
                                      <p className="text-xs font-black">{c.streak} Days</p>
                                    </div>
                                  </div>
                                  <div className="mt-3 flex justify-between items-center">
                                    <span className={`px-2 py-0.5 border rounded-lg text-[9px] font-black uppercase tracking-wider ${getRiskColor(risk)}`}>
                                      {risk}
                                    </span>
                                    {isSelected && <span className="text-[10px] text-brand-accent font-black tracking-wider uppercase">Coaching active</span>}
                                  </div>
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>
                      </section>

                      {/* Circular Scores Row */}
                      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">

                        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 rounded-[32px] shadow-sm flex items-center justify-between gap-4">
                          <div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-stone-700 dark:text-stone-300 block mb-1">Financial Health</span>
                            <h3 className="text-lg font-black text-stone-900 dark:text-white leading-none">Savings ratio</h3>
                            <p className="text-xs text-stone-700 dark:text-stone-300 mt-2 font-semibold">
                              {scores.healthScore >= 85 ? 'Jars are well funded and target compliant.' : 'Advise child to allocate more to jars.'}
                            </p>
                          </div>
                          {getCircularScoreProgress(scores.healthScore, getCircleColor(scores.healthScore))}
                        </div>

                        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 rounded-[32px] shadow-sm flex items-center justify-between gap-4">
                          <div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-stone-700 dark:text-stone-300 block mb-1">Discipline Index</span>
                            <h3 className="text-lg font-black text-stone-900 dark:text-white leading-none">Tasks & Limits</h3>
                            <p className="text-xs text-stone-700 dark:text-stone-300 mt-2 font-semibold">
                              {scores.accountabilityScore >= 80 ? 'Tasks completed on schedule.' : 'Incomplete tasks lagging.'}
                            </p>
                          </div>
                          {getCircularScoreProgress(scores.accountabilityScore, getCircleColor(scores.accountabilityScore))}
                        </div>

                        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 rounded-[32px] shadow-sm flex items-center justify-between gap-4">
                          <div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-stone-700 dark:text-stone-300 block mb-1">Financial Trust</span>
                            <h3 className="text-lg font-black text-stone-900 dark:text-white leading-none">Compliance rating</h3>
                            <p className="text-xs text-stone-700 dark:text-stone-300 mt-2 font-semibold">
                              {scores.trustScore >= 80 ? 'Compliant. No active debt warnings.' : 'Debt alerts impacting trust score.'}
                            </p>
                          </div>
                          {getCircularScoreProgress(scores.trustScore, getCircleColor(scores.trustScore))}
                        </div>

                      </section>

                      {/* Jars and Wallet Split Grid */}
                      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        {/* Jars display */}
                        <div className="lg:col-span-2 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 rounded-[32px] shadow-sm space-y-4">
                          <h3 className="text-sm font-black text-stone-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                            <Target size={18} /> Dynamic Jars & Savings Jars
                          </h3>

                          {childJars.length === 0 ? (
                            <p className="text-stone-700 dark:text-stone-300 italic text-xs">No active wealth jars or goals found for this child account.</p>
                          ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              {childJars.map(jar => {
                                const pct = jar.target > 0 ? Math.min(100, Math.round((Number(jar.balance) / Number(jar.target)) * 100)) : 100;
                                return (
                                  <div key={jar.id} className="p-4 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-2xl space-y-2">
                                    <div className="flex justify-between items-center text-xs">
                                      <span className="font-black flex items-center gap-1.5 text-stone-900 dark:text-white">
                                        <span className="text-base shrink-0">{jar.icon || '🎯'}</span> {jar.name}
                                      </span>
                                      <span className="font-extrabold uppercase tracking-wide text-[9px] text-stone-900 dark:text-white px-2 py-0.5 bg-stone-200 dark:bg-stone-900 rounded-md">{jar.category}</span>
                                    </div>
                                    <div className="flex justify-between text-xs font-bold text-stone-900 dark:text-white pt-2">
                                      <span>Saved: {formatCurrency(Number(jar.balance))}</span>
                                      <span>Target: {formatCurrency(Number(jar.target))}</span>
                                    </div>
                                    <div className="w-full bg-stone-200 dark:bg-stone-800 h-2 rounded-full overflow-hidden">
                                      <div className="bg-brand-primary h-full rounded-full" style={{ width: `${pct}%` }}></div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>

                        {/* Budget Performance */}
                        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 rounded-[32px] shadow-sm space-y-4">
                          <h3 className="text-sm font-black text-stone-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                            <Activity size={18} /> Wallet Budget Compliance
                          </h3>

                          <div className="p-4 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-2xl space-y-3">
                            <div className="flex justify-between text-xs font-bold">
                              <span className="text-stone-700 dark:text-stone-300">Live Wallet Balance:</span>
                              <span className="text-stone-900 dark:text-white font-black">{formatCurrency(childWalletBalance || 0)}</span>
                            </div>
                            <div className="flex justify-between text-xs font-bold">
                              <span className="text-stone-700 dark:text-stone-300">Weekly Allowance:</span>
                              <span className="text-emerald-600 dark:text-emerald-400 font-black">{formatCurrency(activeChild?.autoAllowance || 0)}/wk</span>
                            </div>
                            <div className="flex justify-between text-xs font-bold">
                              <span className="text-stone-700 dark:text-stone-300">Weekly Spending Limit:</span>
                              <span className="text-stone-900 dark:text-white font-black">{formatCurrency(activeChild?.spendingLimit || 0)}</span>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <span className="text-[10px] font-black uppercase tracking-wider text-stone-900 dark:text-white block">Allocation Rules</span>
                            {childBudgetRules.length === 0 ? (
                              <p className="text-xs text-stone-700 dark:text-stone-300 italic">No budget rules/allocations configured for this account.</p>
                            ) : (
                              <div className="space-y-2">
                                {childBudgetRules.map(rule => {
                                  const jar = childJars.find(j => j.id === rule.jar_id);
                                  return (
                                    <div key={rule.id} className="p-2 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-xl flex items-center justify-between text-xs font-bold text-stone-900 dark:text-white">
                                      <span className="flex items-center gap-1.5 truncate">
                                        <span>{jar?.icon || '🎯'}</span> {jar?.name || 'Savings Goal'}
                                      </span>
                                      <span className="shrink-0 px-2 py-0.5 bg-brand-primary/10 text-brand-primary rounded-md">
                                        {rule.type === 'percentage' ? `${rule.value}%` : formatCurrency(rule.value)}
                                      </span>
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        </div>

                      </section>
                    </div>
                  )}

                  {/* TAB 2: ANALYTICS & REPORTS */}
                  {activeTab === 'analytics' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Spending categories allocation */}
                      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 rounded-[32px] shadow-sm space-y-6">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                          <h3 className="text-sm font-black text-stone-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                            <PieChart size={18} /> Spent Categories Breakdown
                          </h3>
                        </div>

                        {/* Date and Hour Filters */}
                        <div className="p-4 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-2xl space-y-4">
                          <span className="text-[10px] font-black uppercase text-stone-700 dark:text-stone-300 block tracking-wider">Custom Date & Time Range Filter</span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                            <div>
                              <label className="block text-stone-600 dark:text-stone-400 font-bold mb-1 uppercase tracking-wide text-[9px]">From (Date & Hour)</label>
                              <input
                                type="datetime-local"
                                value={spentFilterStartDate}
                                onClick={(e) => (e.target as HTMLInputElement).showPicker?.()}
                                onChange={(e) => setSpentFilterStartDate(e.target.value)}
                                className="w-full p-2 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl outline-none font-bold text-stone-900 dark:text-white cursor-pointer"
                              />
                            </div>
                            <div>
                              <label className="block text-stone-600 dark:text-stone-400 font-bold mb-1 uppercase tracking-wide text-[9px]">To (Date & Hour)</label>
                              <input
                                type="datetime-local"
                                value={spentFilterEndDate}
                                onClick={(e) => (e.target as HTMLInputElement).showPicker?.()}
                                onChange={(e) => setSpentFilterEndDate(e.target.value)}
                                className="w-full p-2 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl outline-none font-bold text-stone-900 dark:text-white cursor-pointer"
                              />
                            </div>
                          </div>
                          <div className="flex justify-end">
                            {(spentFilterStartDate || spentFilterEndDate) && (
                              <button
                                onClick={() => {
                                  setSpentFilterStartDate('');
                                  setSpentFilterEndDate('');
                                }}
                                className="px-3 py-1 bg-stone-200 hover:bg-stone-300 dark:bg-stone-800 dark:hover:bg-stone-700 rounded-lg text-[10px] font-bold text-stone-700 dark:text-stone-300 cursor-pointer"
                              >
                                Clear Date Filter
                              </button>
                            )}
                          </div>
                        </div>

                        <div className="space-y-4">
                          {(() => {
                            const categorySums: Record<string, number> = { spend: 0, save: 0, invest: 0, give: 0 };
                            childTransactions.forEach(tx => {
                              if (tx.type === 'debit') {
                                // Apply custom date/hour filters
                                const txDate = new Date(tx.created_at);
                                if (spentFilterStartDate) {
                                  const startDate = new Date(spentFilterStartDate);
                                  if (txDate < startDate) return;
                                }
                                if (spentFilterEndDate) {
                                  const endDate = new Date(spentFilterEndDate);
                                  if (txDate > endDate) return;
                                }

                                const jar = tx.jar_id ? childJars.find(j => j.id === tx.jar_id) : null;
                                const rawCat = jar?.category?.toLowerCase() || 'spend';

                                let catKey = 'spend';
                                if (rawCat === 'savings' || rawCat === 'save') {
                                  catKey = 'save';
                                } else if (rawCat === 'investments' || rawCat === 'invest') {
                                  catKey = 'invest';
                                } else if (rawCat === 'culture' || rawCat === 'give' || rawCat === 'culture & giving') {
                                  catKey = 'give';
                                } else if (rawCat === 'needs' || rawCat === 'wants') {
                                  catKey = 'spend';
                                }

                                categorySums[catKey] += Number(tx.amount);
                              }
                            });

                            const totalSpent = Object.values(categorySums).reduce((sum, val) => sum + val, 0);
                            const categories = [
                              { key: 'spend', label: 'Spends & Bills', color: 'bg-blue-500' },
                              { key: 'save', label: 'Savings Goals', color: 'bg-emerald-500' },
                              { key: 'invest', label: 'Investments', color: 'bg-purple-500' },
                              { key: 'give', label: 'Giving & Charity', color: 'bg-rose-500' }
                            ];

                            return categories.map(cat => {
                              const amount = categorySums[cat.key];
                              const pct = totalSpent > 0 ? Math.round((amount / totalSpent) * 100) : 0;
                              return (
                                <div key={cat.key} className="space-y-1.5 text-stone-900 dark:text-white">
                                  <div className="flex justify-between text-xs font-bold">
                                    <span className="flex items-center gap-2">
                                      <span className={`w-2.5 h-2.5 rounded-full ${cat.color}`}></span>
                                      {cat.label}
                                    </span>
                                    <span>{formatCurrency(amount)} ({pct}%)</span>
                                  </div>
                                  <div className="w-full bg-stone-100 dark:bg-stone-950 h-2 rounded-full overflow-hidden border border-stone-200 dark:border-stone-800">
                                    <div className={`h-full rounded-full ${cat.color}`} style={{ width: `${pct}%` }}></div>
                                  </div>
                                </div>
                              );
                            });
                          })()}
                        </div>
                      </div>

                      {/* Cash flow reports */}
                      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 rounded-[32px] shadow-sm space-y-6">
                        <h3 className="text-sm font-black text-stone-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                          <TrendingUp size={18} /> Cash-Flow Reports Summary
                        </h3>

                        {(() => {
                          const totalEarned = childTransactions
                            .filter(t => t.type === 'credit')
                            .reduce((sum, t) => sum + Number(t.amount), 0);
                          const totalSpent = childTransactions
                            .filter(t => t.type === 'debit')
                            .reduce((sum, t) => sum + Number(t.amount), 0);
                          const netFlow = totalEarned - totalSpent;

                          return (
                            <div className="space-y-6 text-stone-900 dark:text-white">
                              <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-900 text-emerald-800 dark:text-emerald-350 rounded-2xl">
                                  <p className="text-[10px] font-black uppercase tracking-wider">Total Received</p>
                                  <h4 className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1 tabular-nums">+{formatCurrency(totalEarned)}</h4>
                                </div>
                                <div className="p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/60 rounded-2xl">
                                  <p className="text-[10px] font-black uppercase tracking-wider">Total Spent</p>
                                  <h4 className="text-2xl font-black text-red-600 dark:text-red-400 mt-1 tabular-nums">-{formatCurrency(totalSpent)}</h4>
                                </div>
                              </div>

                              <div className="p-5 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-2xl flex items-center justify-between">
                                <div>
                                  <h4 className="font-extrabold text-xs uppercase tracking-wider text-stone-700 dark:text-stone-300">Net Flow Balance</h4>
                                  <p className="text-xs text-stone-600 dark:text-stone-700 dark:text-stone-200 font-semibold mt-1">Earnings and allowance minus expenditures.</p>
                                </div>
                                <div className={`text-xl font-black tabular-nums ${netFlow >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600'}`}>
                                  {netFlow >= 0 ? '+' : ''}{formatCurrency(netFlow)}
                                </div>
                              </div>

                              <div className="space-y-3 font-semibold text-xs text-stone-700 dark:text-stone-300">
                                <span className="font-extrabold uppercase text-[10px] text-stone-900 dark:text-white block tracking-wider">Historical Analytics Insights</span>
                                <p>• Chore task completions constitute {totalEarned > 0 ? Math.round((childTransactions.filter(t => t.type === 'credit' && t.description?.includes('Task')).reduce((sum, t) => sum + Number(t.amount), 0) / totalEarned) * 100) : 0}% of child's monthly cash influx.</p>
                                <p>• Average spent transaction size: {childTransactions.filter(t => t.type === 'debit').length > 0 ? formatCurrency(Math.round(totalSpent / childTransactions.filter(t => t.type === 'debit').length)) : 'KES 0'}.</p>
                              </div>
                            </div>
                          );
                        })()}
                      </div>
                    </div>
                  )}

                  {/* TAB 3: INTERVENTIONS */}
                  {activeTab === 'interventions' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                      {/* Automated Recommendations */}
                      <div className="lg:col-span-2 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 rounded-[32px] shadow-sm space-y-4">
                        <h3 className="text-sm font-black text-stone-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                          <Sparkles size={18} /> Automated Recommendations
                        </h3>

                        <div className="space-y-3.5">
                          {dynamicRecommendations.map(rec => (
                            <div key={rec.id} className="p-4 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-2xl flex items-start gap-3">
                              <span className="text-xl shrink-0">
                                {rec.type === 'warning' ? '⚠️' : rec.type === 'success' ? '✓' : 'ℹ️'}
                              </span>
                              <div>
                                <h4 className="font-extrabold text-xs text-stone-900 dark:text-white">{rec.title}</h4>
                                <p className="text-xs font-semibold text-stone-700 dark:text-stone-300 mt-1 leading-relaxed">{rec.desc}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Quick coaching actions */}
                      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 rounded-[32px] shadow-sm space-y-4">
                        <h3 className="text-sm font-black text-stone-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                          <ShieldCheck size={18} /> Quick Coaching Actions
                        </h3>

                        <div className="space-y-3 font-bold text-xs">
                          <button
                            onClick={() => handleTriggerAction('reminder')}
                            className="w-full p-4 bg-stone-50 dark:bg-stone-950 hover:bg-stone-100 dark:hover:bg-stone-800 border border-stone-200 dark:border-stone-800 rounded-2xl flex items-center justify-between text-stone-900 dark:text-white cursor-pointer transition-colors"
                          >
                            <span>Send Daily Logging Reminder</span>
                            <ArrowRight size={16} />
                          </button>

                          <button
                            onClick={() => handleTriggerAction('encouragement')}
                            className="w-full p-4 bg-stone-50 dark:bg-stone-950 hover:bg-stone-100 dark:hover:bg-stone-800 border border-stone-200 dark:border-stone-800 rounded-2xl flex items-center justify-between text-stone-900 dark:text-white cursor-pointer transition-colors"
                          >
                            <span>Send Encouragement Praise</span>
                            <ArrowRight size={16} />
                          </button>

                          <button
                            onClick={() => handleTriggerAction('checkin')}
                            className="w-full p-4 bg-stone-50 dark:bg-stone-950 hover:bg-stone-100 dark:hover:bg-stone-800 border border-stone-200 dark:border-stone-800 rounded-2xl flex items-center justify-between text-stone-900 dark:text-white cursor-pointer transition-colors"
                          >
                            <span>Schedule Review Check-In</span>
                            <ArrowRight size={16} />
                          </button>

                          <button
                            onClick={() => handleTriggerAction('custom')}
                            className="w-full p-4 bg-stone-50 dark:bg-stone-950 hover:bg-stone-100 dark:hover:bg-stone-800 border border-stone-200 dark:border-stone-800 rounded-2xl flex items-center justify-between text-stone-900 dark:text-white cursor-pointer transition-colors"
                          >
                            <span>Send Custom Warning / Message</span>
                            <ArrowRight size={16} />
                          </button>
                        </div>
                      </div>

                    </div>
                  )}

                  {/* TAB 4: CHALLENGES */}
                  {activeTab === 'challenges' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                      {/* Active challenges list */}
                      <div className="lg:col-span-2 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 rounded-[32px] shadow-sm space-y-4">
                        <h3 className="text-sm font-black text-stone-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                          <Target size={18} /> Active Assigned Challenges
                        </h3>

                        {childChallenges.length === 0 ? (
                          <p className="text-stone-700 dark:text-stone-300 italic text-xs">No active challenges currently assigned to this child.</p>
                        ) : (
                          <div className="space-y-4">
                            {childChallenges.map(c => {
                              const isPending = c.status === 'pending_approval';
                              return (
                                <div
                                  key={c.id}
                                  className={`p-5 border rounded-2xl space-y-3 flex flex-col justify-between transition-all ${isPending
                                      ? 'bg-amber-50/50 dark:bg-amber-950/15 border-amber-300 dark:border-amber-900/60'
                                      : 'bg-stone-50 dark:bg-stone-950 border-stone-200 dark:border-stone-800'
                                    }`}
                                >
                                  <div className="flex justify-between items-start gap-4">
                                    <div>
                                      <h4 className="font-extrabold text-sm text-stone-900 dark:text-white flex items-center gap-2">
                                        <span>🎯</span> {c.title}
                                      </h4>
                                      <p className="text-xs font-semibold text-stone-700 dark:text-stone-300 mt-1">Duration: {c.duration_days} days | Reward: KES {c.reward_amount}</p>
                                    </div>
                                    <span className={`px-2.5 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-wider ${c.status === 'active' ? 'bg-blue-100 text-blue-800' :
                                        c.status === 'pending_approval' ? 'bg-amber-100 text-amber-800 animate-pulse' :
                                          c.status === 'completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                                      }`}>
                                      {c.status.replace('_', ' ')}
                                    </span>
                                  </div>

                                  {/* Sync Approval / Actions block */}
                                  <div className="flex justify-between items-center pt-2 border-t border-stone-200/50 dark:border-stone-800/50">
                                    <div className="flex gap-2">
                                      {isPending ? (
                                        <>
                                          <button
                                            disabled={processingChallengeId !== null}
                                            onClick={() => handleApproveChallenge(c)}
                                            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-lg text-xs font-bold cursor-pointer transition-colors"
                                          >
                                            {processingChallengeId === c.id ? 'Approving...' : 'Mark Pass (Approve)'}
                                          </button>
                                          <button
                                            disabled={processingChallengeId !== null}
                                            onClick={() => handleRejectChallenge(c)}
                                            className="px-3 py-1.5 bg-red-100 hover:bg-red-200 disabled:opacity-50 text-red-700 rounded-lg text-xs font-bold cursor-pointer transition-colors"
                                          >
                                            Mark Fail
                                          </button>
                                        </>
                                      ) : c.status === 'active' ? (
                                        <button
                                          disabled={processingChallengeId !== null}
                                          onClick={() => handleRejectChallenge(c)}
                                          className="px-3 py-1.5 bg-stone-200 hover:bg-stone-300 dark:bg-stone-800 dark:hover:bg-stone-800 disabled:opacity-50 text-stone-700 dark:text-stone-300 rounded-lg text-xs font-bold cursor-pointer transition-colors"
                                        >
                                          Mark Fail
                                        </button>
                                      ) : null}
                                    </div>

                                    <button
                                      disabled={processingChallengeId !== null}
                                      onClick={() => handleDeleteChallenge(c.id)}
                                      className="p-2 bg-stone-100 dark:bg-stone-800 disabled:opacity-50 text-stone-600 dark:text-stone-300 hover:text-red-600 dark:hover:text-red-500 rounded-lg transition-colors cursor-pointer"
                                      title="Delete Challenge"
                                    >
                                      <Trash2 size={15} />
                                    </button>
                                  </div>

                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>

                      {/* Assigner form */}
                      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 rounded-[32px] shadow-sm space-y-6">
                        <div>
                          <h3 className="text-sm font-black text-stone-900 dark:text-white uppercase tracking-wider">Assign Challenge</h3>
                          <p className="text-xs text-stone-700 dark:text-stone-300 mt-1 font-semibold">Assign tasks and rewards linked to database profiles.</p>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <label className="block mb-1 text-[10px] uppercase font-black tracking-wider text-stone-900 dark:text-white">Challenge Title</label>
                            <input
                              type="text"
                              value={customChallengeTitle}
                              onChange={(e) => setCustomChallengeTitle(e.target.value)}
                              placeholder="e.g. Save KES 300 Daily for Coffee jar"
                              className="w-full p-3 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-xl outline-none font-bold shadow-inner text-stone-900 dark:text-white placeholder-stone-600"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block mb-1 text-[10px] uppercase font-black tracking-wider text-stone-900 dark:text-white">Duration (Days)</label>
                              <input
                                type="number"
                                value={customChallengeDays}
                                onChange={(e) => setCustomChallengeDays(Number(e.target.value))}
                                className="w-full p-3 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-xl outline-none font-bold shadow-inner text-stone-900 dark:text-white"
                              />
                            </div>
                            <div>
                              <label className="block mb-1 text-[10px] uppercase font-black tracking-wider text-stone-900 dark:text-white">Reward (KES)</label>
                              <input
                                type="number"
                                value={customChallengeReward}
                                onChange={(e) => setCustomChallengeReward(Number(e.target.value))}
                                className="w-full p-3 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-xl outline-none font-bold shadow-inner text-stone-900 dark:text-white"
                              />
                            </div>
                          </div>

                          <button
                            disabled={isCreatingChallenge}
                            onClick={() => handleCreateChallenge()}
                            className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 dark:bg-brand-accent text-white dark:text-brand-accent-text rounded-xl font-black transition-colors cursor-pointer text-center text-xs shadow-md disabled:opacity-50"
                          >
                            {isCreatingChallenge ? 'Assigning...' : 'Create & Assign Challenge'}
                          </button>
                        </div>

                        {/* Presets */}
                        <div className="space-y-3 pt-4 border-t border-stone-200 dark:border-stone-800">
                          <span className="text-[10px] font-black uppercase text-stone-700 dark:text-stone-300 block tracking-wider">Quick Preset Templates</span>
                          <div className="grid grid-cols-1 gap-2 font-bold text-xs">
                            <button
                              disabled={isCreatingChallenge}
                              onClick={() => handleCreateChallenge('No Snacks Challenge', 5, 500)}
                              className="p-3 bg-stone-50 hover:bg-stone-100 dark:bg-stone-950 dark:hover:bg-stone-800 border border-stone-200 dark:border-stone-800 text-stone-900 dark:text-white rounded-xl text-left cursor-pointer transition-colors disabled:opacity-50"
                            >
                              🍎 Limit Snacks - KES 500 (5 Days)
                            </button>
                            <button
                              disabled={isCreatingChallenge}
                              onClick={() => handleCreateChallenge('Save daily KES 100', 7, 1000)}
                              className="p-3 bg-stone-50 hover:bg-stone-100 dark:bg-stone-950 dark:hover:bg-stone-800 border border-stone-200 dark:border-stone-800 text-stone-900 dark:text-white rounded-xl text-left cursor-pointer transition-colors disabled:opacity-50"
                            >
                              💰 Save Daily KES 100 - KES 1,000 (7 Days)
                            </button>
                          </div>
                        </div>

                      </div>

                    </div>
                  )}

                  {/* TAB 5: COACHING NOTES */}
                  {activeTab === 'notes' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      {/* Note creator */}
                      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 rounded-[32px] shadow-sm space-y-4">
                        <div>
                          <h3 className="text-sm font-black text-stone-900 dark:text-white uppercase tracking-wider">Write Coaching Observation</h3>
                          <p className="text-xs text-stone-700 dark:text-stone-300 mt-1 font-semibold">Log notes about behaviors, checks, and milestones.</p>
                        </div>

                        <div className="space-y-4">
                          <textarea
                            value={noteText}
                            onChange={(e) => setNoteText(e.target.value)}
                            placeholder="Add behavior notes..."
                            className="w-full h-32 p-3 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-xl outline-none font-semibold resize-none text-stone-900 dark:text-white placeholder-stone-600 text-xs shadow-inner"
                          />
                          <button
                            onClick={handleAddNote}
                            className="w-full py-3 bg-slate-900 hover:bg-slate-800 dark:bg-brand-accent text-white dark:text-brand-accent-text rounded-xl font-black transition-colors cursor-pointer text-center text-xs"
                          >
                            Save Note Entry
                          </button>
                        </div>
                      </div>

                      {/* Notes list */}
                      <div className="lg:col-span-2 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 rounded-[32px] shadow-sm space-y-4">
                        <h3 className="text-sm font-black text-stone-900 dark:text-white uppercase tracking-wider">Logged Coaching History</h3>

                        {(!selectedChildId || !localNotes[selectedChildId] || localNotes[selectedChildId].length === 0) ? (
                          <p className="text-stone-700 dark:text-stone-300 italic text-xs">No coaching notes logged for this child yet.</p>
                        ) : (
                          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                            {localNotes[selectedChildId].map(note => (
                              <div key={note.id} className="p-4 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-2xl flex items-start justify-between gap-4">
                                <div className="space-y-1">
                                  <p className="text-xs font-semibold leading-relaxed text-stone-900 dark:text-white">{note.text}</p>
                                  <span className="text-[9px] font-black uppercase text-stone-700 dark:text-stone-300 block">
                                    {new Date(note.createdAt).toLocaleString()}
                                  </span>
                                </div>
                                <button
                                  onClick={() => handleDeleteNote(note.id)}
                                  className="p-1.5 bg-stone-200 hover:bg-stone-300 dark:bg-stone-900 dark:hover:bg-stone-800 rounded-lg text-stone-800 dark:text-white cursor-pointer transition-colors"
                                  title="Delete Note"
                                >
                                  <X size={13} />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* TAB 6: ACTIVITY FEED */}
                  {activeTab === 'activity' && (
                    <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 rounded-[32px] shadow-sm space-y-6">
                      <h3 className="text-sm font-black text-stone-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                        <Clock size={18} /> Chronological Activity Feed
                      </h3>

                      {unifiedActivityItems.length === 0 ? (
                        <p className="text-stone-700 dark:text-stone-300 italic text-xs">No recorded ledger actions, tasks, or challenges in database history.</p>
                      ) : (
                        <div className="relative border-l border-stone-200 dark:border-stone-800 ml-4 pl-6 space-y-6 py-2">
                          {unifiedActivityItems.map(item => (
                            <div key={item.id} className="relative">
                              <span className="absolute -left-[35px] top-1 w-6 h-6 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-full flex items-center justify-center text-xs shadow-sm">
                                {item.icon}
                              </span>
                              <div className="space-y-1">
                                <h4 className="font-extrabold text-xs text-stone-900 dark:text-white leading-none">{item.title}</h4>
                                <p className="text-xs font-semibold text-stone-700 dark:text-stone-300">{item.desc}</p>
                                <span className="text-[9px] font-black uppercase text-stone-700 dark:text-stone-600 dark:text-stone-300 block">
                                  {new Date(item.time).toLocaleString()}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* TAB 7: THEMES & SETTINGS */}
                  {activeTab === 'themes' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Theme colors option */}
                      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 rounded-[32px] shadow-sm space-y-6">
                        <div>
                          <h3 className="text-sm font-black text-stone-900 dark:text-white uppercase tracking-wider">Interface Theme Settings</h3>
                          <p className="text-xs text-stone-700 dark:text-stone-300 mt-1 font-semibold">Select age-tier layout colors matching children settings.</p>
                        </div>

                        <div className="space-y-4">
                          <span className="text-[10px] font-black uppercase text-stone-700 dark:text-stone-300 block tracking-wider">Select Tier Colors</span>
                          <div className="grid grid-cols-3 gap-4">

                            <button
                              onClick={() => handleSwitchTheme('junior')}
                              className="p-4 border border-stone-200 dark:border-stone-800 hover:border-brand-accent rounded-2xl bg-stone-50 dark:bg-stone-950 flex flex-col items-center gap-2 cursor-pointer transition-all"
                            >
                              <div className="w-8 h-8 rounded-full bg-[#4CC9F0] border-2 border-white shadow-inner shrink-0"></div>
                              <span className="text-[10px] font-black uppercase text-stone-900 dark:text-white tracking-wider">Junior Color</span>
                            </button>

                            <button
                              onClick={() => handleSwitchTheme('teen')}
                              className="p-4 border border-stone-200 dark:border-stone-800 hover:border-brand-accent rounded-2xl bg-stone-50 dark:bg-stone-950 flex flex-col items-center gap-2 cursor-pointer transition-all"
                            >
                              <div className="w-8 h-8 rounded-full bg-[#2563EB] border-2 border-white shadow-inner shrink-0"></div>
                              <span className="text-[10px] font-black uppercase text-stone-900 dark:text-white tracking-wider">Teen Color</span>
                            </button>

                            <button
                              onClick={() => handleSwitchTheme('pro')}
                              className="p-4 border border-stone-200 dark:border-stone-800 hover:border-brand-accent rounded-2xl bg-stone-50 dark:bg-stone-950 flex flex-col items-center gap-2 cursor-pointer transition-all"
                            >
                              <div className="w-8 h-8 rounded-full bg-[#047857] border-2 border-white shadow-inner shrink-0"></div>
                              <span className="text-[10px] font-black uppercase text-stone-900 dark:text-white tracking-wider">Pro Color</span>
                            </button>

                          </div>
                        </div>
                      </div>

                      {/* Theme toggle dark/light */}
                      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 rounded-[32px] shadow-sm space-y-6">
                        <div>
                          <h3 className="text-sm font-black text-stone-900 dark:text-white uppercase tracking-wider">Theme Mode Toggle</h3>
                          <p className="text-xs text-stone-700 dark:text-stone-300 mt-1 font-semibold">Enable or disable high-contrast dark mode aesthetics.</p>
                        </div>

                        <button
                          onClick={toggleTheme}
                          className="p-4 w-full bg-stone-50 hover:bg-stone-100 dark:bg-stone-950 dark:hover:bg-stone-800 border border-stone-200 dark:border-stone-800 text-stone-900 dark:text-white rounded-2xl flex items-center justify-between font-black text-xs cursor-pointer transition-colors"
                        >
                          <span>Toggle {theme === 'light' ? 'Dark Mode 🌙' : 'Light Mode ☀️'}</span>
                          <span className="px-3 py-1 bg-stone-200 dark:bg-stone-900 rounded-lg uppercase text-[9px] font-black tracking-wider leading-none">
                            {theme.toUpperCase()}
                          </span>
                        </button>
                      </div>
                    </div>
                  )}

                </motion.div>
              </AnimatePresence>
            ) : null}

          </div>
        </div>
      </main>

      {/* Scheduler Check-In Modal */}
      <AnimatePresence>
        {showCheckInModal && (
          <div className="fixed inset-0 bg-stone-900/60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-stone-900 rounded-[32px] p-6 max-w-sm w-full border border-stone-200 dark:border-stone-800 shadow-2xl space-y-4 text-xs font-semibold text-stone-900 dark:text-white"
            >
              <h3 className="text-lg font-black">Schedule Check-In</h3>
              <p className="leading-relaxed font-semibold text-stone-700 dark:text-stone-300">
                Pick a date and time to sit down with {activeChild?.name} to review their performance report together.
              </p>
              <div className="space-y-3 font-bold">
                <div>
                  <label className="block mb-1 text-[10px] uppercase font-black text-stone-900 dark:text-white">Select Date</label>
                  <input
                    type="date"
                    value={checkInDate}
                    onClick={(e) => (e.target as HTMLInputElement).showPicker?.()}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    className="w-full p-3 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-xl outline-none font-bold text-stone-900 dark:text-white cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-[10px] uppercase font-black text-stone-900 dark:text-white">Select Time</label>
                  <input
                    type="time"
                    value={checkInTime}
                    onClick={(e) => (e.target as HTMLInputElement).showPicker?.()}
                    onChange={(e) => setCheckInTime(e.target.value)}
                    className="w-full p-3 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-xl outline-none font-bold text-stone-900 dark:text-white cursor-pointer"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowCheckInModal(false)}
                  className="flex-1 py-3 bg-stone-100 dark:bg-stone-950 hover:bg-stone-200 dark:hover:bg-stone-800 border border-stone-200 dark:border-stone-800 rounded-xl font-black transition-colors cursor-pointer text-center text-stone-900 dark:text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={handleScheduleCheckIn}
                  className="flex-1 py-3 bg-slate-900 dark:bg-brand-accent hover:bg-slate-800 dark:hover:bg-[#5A7A1B] text-white dark:text-brand-accent-text rounded-xl font-black transition-colors cursor-pointer text-center shadow-md"
                >
                  Schedule Check-In
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Praise Encouragement Modal */}
      <AnimatePresence>
        {showEncouragementPrompt && (
          <div className="fixed inset-0 bg-stone-900/60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-stone-900 rounded-[32px] p-6 max-w-sm w-full border border-stone-200 dark:border-stone-800 shadow-2xl space-y-4 text-xs font-semibold text-stone-900 dark:text-white"
            >
              <h3 className="text-lg font-black">Send Encouragement Message</h3>
              <p className="leading-relaxed font-semibold text-stone-700 dark:text-stone-300">
                Type a custom coaching feedback message. This will be logged on their account reports.
              </p>

              <textarea
                value={encouragementText}
                onChange={(e) => setEncouragementText(e.target.value)}
                placeholder="e.g. You saved diligently this week, great job!"
                className="w-full h-24 p-3 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-xl outline-none font-bold resize-none shadow-inner text-stone-900 dark:text-white"
              />

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowEncouragementPrompt(false)}
                  className="flex-1 py-3 bg-stone-100 dark:bg-stone-950 hover:bg-stone-200 dark:hover:bg-stone-800 border border-stone-200 dark:border-stone-800 rounded-xl font-black transition-colors cursor-pointer text-center text-stone-900 dark:text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendEncouragement}
                  className="flex-1 py-3 bg-slate-900 dark:bg-brand-accent hover:bg-slate-800 dark:hover:bg-[#5A7A1B] text-white dark:text-brand-accent-text rounded-xl font-black transition-colors cursor-pointer text-center shadow-md"
                >
                  Send Message
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Custom Warnings / Messages Modal */}
      <AnimatePresence>
        {showCustomMessageModal && (
          <div className="fixed inset-0 bg-stone-900/60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-stone-900 rounded-[32px] p-6 max-w-sm w-full border border-stone-200 dark:border-stone-800 shadow-2xl space-y-4 text-xs font-semibold text-stone-900 dark:text-white"
            >
              <h3 className="text-lg font-black">Send Custom Notice / Warning</h3>
              <p className="leading-relaxed font-semibold text-stone-700 dark:text-stone-300">
                Send a custom warning, reminder, or general coaching message to {activeChild?.name}.
              </p>

              <div>
                <label className="block mb-1 text-[9px] uppercase font-black text-stone-900 dark:text-white">Message Type</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['warning', 'encouragement', 'checkin'] as const).map(t => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setCustomMessageType(t)}
                      className={`py-2 px-1 border-2 rounded-xl text-[9px] font-black uppercase text-center cursor-pointer transition-all ${customMessageType === t
                          ? 'border-brand-accent bg-brand-accent/10 text-stone-900 dark:text-white'
                          : 'border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-200 hover:border-stone-300'
                        }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <textarea
                value={customMessageText}
                onChange={(e) => setCustomMessageText(e.target.value)}
                placeholder="e.g. Warning: You spent over KES 2,000 outside your rule allocations today. Let's discuss."
                className="w-full h-24 p-3 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-xl outline-none font-bold resize-none shadow-inner text-stone-900 dark:text-white"
              />

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowCustomMessageModal(false)}
                  className="flex-1 py-3 bg-stone-100 dark:bg-stone-950 hover:bg-stone-200 dark:hover:bg-stone-800 border border-stone-200 dark:border-stone-800 rounded-xl font-black transition-colors cursor-pointer text-center text-stone-900 dark:text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendCustomMessage}
                  className="flex-1 py-3 bg-slate-900 dark:bg-brand-accent hover:bg-slate-800 dark:hover:bg-[#5A7A1B] text-white dark:text-brand-accent-text rounded-xl font-black transition-colors cursor-pointer text-center shadow-md"
                >
                  Send Notice
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Intervention Action Success Notification Popup Modal */}
      <AnimatePresence>
        {showInterventionSuccess.show && (
          <div className="fixed inset-0 bg-stone-900/60 flex items-center justify-center p-4 z-[60] backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-stone-900 rounded-[32px] p-6 max-w-sm w-full border-2 border-brand-accent/50 dark:border-brand-accent/30 shadow-2xl space-y-4 text-xs font-semibold text-stone-900 dark:text-white text-center"
            >
              <div className="mx-auto w-16 h-16 bg-emerald-100 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center text-3xl shadow-inner">
                ✨
              </div>
              <h3 className="text-lg font-black text-stone-900 dark:text-white">{showInterventionSuccess.title}</h3>
              <p className="leading-relaxed text-stone-600 dark:text-stone-300 font-medium">
                {showInterventionSuccess.description}
              </p>

              <div className="bg-stone-50 dark:bg-stone-950 p-3 rounded-2xl border border-stone-200 dark:border-stone-800 text-[10px] uppercase font-black tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center justify-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                Connected User Notified
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setShowInterventionSuccess({ show: false, title: '', description: '' })}
                  className="w-full py-3 bg-slate-900 dark:bg-brand-accent hover:bg-slate-800 dark:hover:bg-[#5A7A1B] text-white dark:text-brand-accent-text rounded-xl font-black transition-colors cursor-pointer text-center shadow-md uppercase tracking-wider"
                >
                  Awesome!
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; height: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.06); border-radius: 10px; }
      `}</style>
    </div>
  );
}

function NavItem({ icon, label, active = false, isExpanded = true, onClick }: { icon: React.ReactNode; label: string; active?: boolean; isExpanded?: boolean; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      title={label}
      className={`w-full flex items-center ${isExpanded ? 'gap-4 px-4' : 'justify-center px-0'} py-3 rounded-2xl text-xs font-black transition-all overflow-hidden cursor-pointer ${active
          ? 'bg-brand-accent text-brand-accent-text shadow-lg'
          : 'text-stone-900 dark:text-white hover:bg-stone-200/50 dark:hover:bg-stone-800 hover:text-stone-800 dark:hover:text-white'
        }`}
    >
      <span className={`flex-shrink-0 transition-colors ${active ? 'text-brand-accent-text' : 'text-stone-900 dark:text-white'}`}>{icon}</span>
      <AnimatePresence>
        {isExpanded && (
          <motion.span
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 'auto' }}
            exit={{ opacity: 0, width: 0 }}
            className="whitespace-nowrap font-black"
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
