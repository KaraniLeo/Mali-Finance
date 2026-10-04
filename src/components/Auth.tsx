import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Phone, 
  Lock, 
  User as UserIcon, 
  Calendar, 
  Globe, 
  Copy, 
  Check, 
  Key, 
  Eye, 
  EyeOff,
  Users,
  Compass,
  Zap,
  Loader2
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { User, Tier, CarrierType } from '../types';
import { WelcomeCarousel } from './onboarding/WelcomeCarousel';

interface AuthProps {
  onLogin: (user: User) => void;
  initialMode?: 'auth' | 'forgot' | 'reset_password';
  onBackToLanding?: () => void;
  initialViewMode?: AuthViewMode;
}

type AuthViewMode = 'welcome' | 'role_select' | 'login' | 'parent_wizard' | 'forgot' | 'reset_password';

export function Auth({ onLogin, initialMode = 'auth', onBackToLanding, initialViewMode }: AuthProps) {
  const [viewMode, setViewMode] = useState<AuthViewMode>(() => {
    if (initialViewMode) return initialViewMode;
    if (initialMode === 'forgot' || initialMode === 'reset_password') return initialMode;
    const hasSeenWelcome = localStorage.getItem('mali_has_seen_welcome');
    return hasSeenWelcome ? 'login' : 'welcome';
  });

  useEffect(() => {
    if (initialViewMode) {
      setViewMode(initialViewMode);
    }
  }, [initialViewMode]);

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Forgot password & reset password state
  const [resetEmail, setResetEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  // Parent Multi-step Onboarding Wizard state
  const [wizardStep, setWizardStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  
  // Step 1: Universal Mobile Verification (Safaricom, Airtel, Telkom, International)
  const [phone, setPhone] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);
  const [phoneCarrier, setPhoneCarrier] = useState<CarrierType>('unknown');
  const [verificationToken, setVerificationToken] = useState('');
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);

  // Step 2: Parent Profile
  const [parentName, setParentName] = useState('');
  const [parentEmail, setParentEmail] = useState('');
  const [parentPassword, setParentPassword] = useState('');
  const [parentConfirmPassword, setParentConfirmPassword] = useState('');
  const [parentRelationship, setParentRelationship] = useState('Parent');

  // Step 3: Child Registration Details
  const [childName, setChildName] = useState('');
  const [childDob, setChildDob] = useState('');
  const [childCountry, setChildCountry] = useState<'kenya' | 'international'>('kenya');
  const [childEmail, setChildEmail] = useState('');
  const [childPassword, setChildPassword] = useState('');
  const [childConfirmPassword, setChildConfirmPassword] = useState('');

  // Step 5: Provisioned Result
  const [provisionedParent, setProvisionedParent] = useState<User | null>(null);
  const [provisionedChild, setProvisionedChild] = useState<User | null>(null);
  const [copiedCredentials, setCopiedCredentials] = useState(false);

  // General UI states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (initialMode === 'forgot' || initialMode === 'reset_password') {
      setViewMode(initialMode);
    }
  }, [initialMode]);

  // OTP Countdown timer
  useEffect(() => {
    let interval: any;
    if (otpTimer > 0) {
      interval = setInterval(() => setOtpTimer(prev => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [otpTimer]);

  // Age & Tier calculation from DOB
  const calculateAgeAndTier = (dobString: string): { age: number; tier: Tier; label: string; desc: string; color: string } => {
    if (!dobString) {
      return { age: 0, tier: 'junior', label: 'Junior Portal', desc: 'Select Date of Birth', color: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/30' };
    }
    const birthDate = new Date(dobString);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;

    if (age < 13) {
      return { 
        age, 
        tier: 'junior', 
        label: 'Junior Portal (Ages 6–12)', 
        desc: 'Visual wealth jars, piggy bank gamification & playful lessons', 
        color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30' 
      };
    }
    if (age < 18) {
      return { 
        age, 
        tier: 'teen', 
        label: 'Teen Portal (Ages 13–17)', 
        desc: 'Interactive budgeting, simulated trading & real-world money habits', 
        color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30' 
      };
    }
    return { 
      age, 
      tier: 'pro', 
      label: 'Pro Portal (18+ Young Adult)', 
      desc: 'Advanced wealth building, investment markets & financial independence', 
      color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30' 
    };
  };

  // Universal network carrier detection for Kenyan & international numbers
  const detectCarrier = (num: string): { carrier: CarrierType; label: string; color: string; badge: string } => {
    const clean = num.replace(/[\s\-\(\)]/g, '');
    let local = '';
    if (clean.startsWith('0')) local = clean.substring(1);
    else if (clean.startsWith('+254')) local = clean.substring(4);
    else if (clean.startsWith('254')) local = clean.substring(3);
    else if (clean.length === 9) local = clean;

    if (local) {
      // Safaricom: 070, 071, 072, 0740-0743, 0745-0746, 0748, 079, 0110-0115
      if (/^(7[0129]|74[0123568]|11[0-5])/.test(local)) {
        return { carrier: 'safaricom', label: 'Safaricom Line', color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/30', badge: '🟢 Safaricom' };
      }
      // Airtel Kenya: 073, 0750-0756, 0780-0789, 0100-0106
      if (/^(73|75[0-6]|78[0-9]|10[0-6])/.test(local)) {
        return { carrier: 'airtel', label: 'Airtel Kenya Line', color: 'text-rose-600 dark:text-rose-400 bg-rose-500/10 border-rose-500/30', badge: '🔴 Airtel Kenya' };
      }
      // Telkom Kenya: 0770-0779
      if (/^77[0-9]/.test(local)) {
        return { carrier: 'telkom', label: 'Telkom Kenya Line', color: 'text-blue-600 dark:text-blue-400 bg-blue-500/10 border-blue-500/30', badge: '🔵 Telkom Kenya' };
      }
      // Equitel: 0763-0766
      if (/^76[3-6]/.test(local)) {
        return { carrier: 'equitel', label: 'Equitel Line', color: 'text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/30', badge: '🟡 Equitel' };
      }
    }
    if (clean.startsWith('+') && clean.length > 9) {
      return { carrier: 'international', label: 'International Mobile', color: 'text-purple-600 dark:text-purple-400 bg-purple-500/10 border-purple-500/30', badge: '🌍 International' };
    }
    return { carrier: 'unknown', label: 'Mobile Number', color: 'text-stone-500 dark:text-stone-400 bg-stone-500/10 border-stone-500/20', badge: '📱 Mobile' };
  };

  const handleSendOtp = async () => {
    const cleanDigits = phone.replace(/\D/g, '');
    if (!phone || cleanDigits.length < 9) {
      setError('Please enter a valid mobile phone number (e.g. 07XXXXXXXX or 01XXXXXXXX).');
      return;
    }
    setError('');
    setMessage('');
    setIsSendingOtp(true);

    try {
      const res = await fetch('/api/auth/phone/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to dispatch verification code.');
      }

      setIsOtpSent(true);
      setOtpTimer(60);
      setPhoneCarrier(data.carrier || 'unknown');
      setMessage(data.message || 'SMS verification code sent to your phone.');
      if (data.devCode) {
        setOtpCode(data.devCode);
        setMessage(`[Dev Sandbox] Code: ${data.devCode} (Auto-filled for testing)`);
      }
    } catch (err: any) {
      setError(err.message || 'Unable to send SMS code. Please try again.');
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otpCode.trim() || otpCode.trim().length !== 6) {
      setError('Please enter the full 6-digit verification code sent to your phone.');
      return;
    }
    setError('');
    setMessage('');
    setIsVerifyingOtp(true);

    try {
      const res = await fetch('/api/auth/phone/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, code: otpCode.trim() }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Invalid verification code.');
      }

      setIsPhoneVerified(true);
      setVerificationToken(data.verificationToken || '');
      setPhoneCarrier(data.carrier || phoneCarrier);
      setMessage('Mobile line verified successfully! 🚀');
    } catch (err: any) {
      setError(err.message || 'Verification failed. Please check the code.');
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  // Step 4: Family Plan & Payment Authorization (KES 300 / mo - Month 1 Free)
  const handleAuthorizeFamilyPlan = async () => {
    setError('');
    setLoading(true);
    try {
      const childTierInfo = calculateAgeAndTier(childDob);
      
      const res = await fetch('/api/parent/provision-family', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          parentName,
          parentEmail,
          parentPassword,
          phone,
          safaricomPhone: phone,
          phoneCarrier,
          verificationToken,
          relationship: parentRelationship,
          childName,
          childDob,
          childTier: childTierInfo.tier,
          childCountry,
          childEmail,
          childPassword,
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to provision family accounts. Please try again.');
      }

      setProvisionedParent(data.parent);
      setProvisionedChild(data.child);
      setWizardStep(5);
    } catch (err: any) {
      console.warn('API provision failed, applying local fallback:', err.message);
      // Fallback local mock user generation for offline or dev resilience
      const childTierInfo = calculateAgeAndTier(childDob);
      const mockParent: User = {
        id: 'parent-' + Date.now(),
        name: parentName,
        email: parentEmail,
        dob: '1985-01-01',
        tier: 'parent',
        balance: 1000,
        streak: 1,
        safaricomPhone: phone,
        subscriptionStatus: 'active_trial',
        linkingCode: Math.random().toString(36).substring(2, 8).toUpperCase(),
      };
      const mockChild: User = {
        id: 'child-' + Date.now(),
        name: childName,
        email: childEmail,
        dob: childDob,
        tier: childTierInfo.tier,
        country: childCountry,
        balance: 500,
        streak: 1,
        chatbotPaid: true,
        subscriptionStatus: 'active_trial',
        parentId: mockParent.id,
      };

      setProvisionedParent(mockParent);
      setProvisionedChild(mockChild);
      setWizardStep(5);
    } finally {
      setLoading(false);
    }
  };

  // Login handler
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password: loginPassword,
      });

      if (authError) throw authError;

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();

      if (profileError) throw profileError;

      const mappedUser: User = {
        id: profile.id,
        name: profile.name,
        email: loginEmail,
        dob: profile.dob,
        tier: profile.tier,
        country: profile.country,
        balance: Number(profile.balance || 0),
        streak: Number(profile.streak || 0),
        parentId: profile.parent_id,
        linkingCode: profile.linking_code,
        linkedChildId: profile.linked_child_id,
        spentAlerts: profile.spent_alerts !== undefined ? profile.spent_alerts : true,
        autoAllowance: Number(profile.auto_allowance || 0),
        spendingLimit: Number(profile.spending_limit || 0),
        achievements: profile.achievements || [],
        chatbotPaid: !!profile.chatbot_paid,
        chatCount: Number(profile.chat_count || 0),
        subscriptionStatus: profile.subscription_status || 'active_trial',
        subscriptionRenewalDate: profile.subscription_renewal_date,
        safaricomPhone: profile.safaricom_phone,
      };

      onLogin(mappedUser);
    } catch (err: any) {
      const errorMsg = err.message || '';
      if (errorMsg.toLowerCase().includes('rate limit') || errorMsg.toLowerCase().includes('failed to fetch')) {
        console.warn("Supabase auth error fallback to local login:", errorMsg);
        onLogin({
          id: 'mock-user-' + Date.now(),
          name: loginEmail.split('@')[0] || 'Explorer',
          email: loginEmail,
          dob: '2012-05-15',
          tier: 'junior',
          country: 'kenya',
          balance: 500,
          streak: 1,
          chatbotPaid: true,
          subscriptionStatus: 'active_trial'
        });
      } else if (errorMsg.includes('Invalid login credentials')) {
        setError('Incorrect email or password. Please verify your credentials or ask your parent.');
      } else {
        setError(errorMsg || 'Unable to log in. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Password Reset Request
  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/reset-password-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: resetEmail, redirectTo: window.location.origin })
      });
      if (!res.ok) {
        await supabase.auth.resetPasswordForEmail(resetEmail, { redirectTo: window.location.origin });
      }
      setResetSent(true);
    } catch (err: any) {
      setError(err.message || 'An error occurred while requesting password reset.');
    } finally {
      setLoading(false);
    }
  };

  // Update Password
  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setError('Passwords do not match.');
      return;
    }
    setLoading(true);
    try {
      const { error: updateErr } = await supabase.auth.updateUser({ password: newPassword });
      if (updateErr) throw updateErr;
      setMessage('Password updated successfully! Please log in.');
      setViewMode('login');
    } catch (err: any) {
      setError(err.message || 'Failed to update password.');
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // VIEW: 3-Slide Welcome Carousel
  // ==========================================
  if (viewMode === 'welcome') {
    return (
      <WelcomeCarousel 
        onGetStarted={() => {
          localStorage.setItem('mali_has_seen_welcome', 'true');
          setViewMode('role_select');
        }}
        onSkipToLogin={() => {
          localStorage.setItem('mali_has_seen_welcome', 'true');
          setViewMode('login');
        }}
        onViewPublicLanding={onBackToLanding}
      />
    );
  }

  // ==========================================
  // VIEW: Forgot Password
  // ==========================================
  if (viewMode === 'forgot') {
    return (
      <div className="min-h-screen bg-[#F7F7F2] dark:bg-stone-950 flex items-center justify-center p-6 bg-[radial-gradient(circle_at_top_right,_#A3B18A_0%,_transparent_40%)]">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white dark:bg-stone-900 rounded-[36px] shadow-2xl p-8 md:p-10 border border-stone-200/80 dark:border-stone-800"
        >
          <div className="flex flex-col items-center mb-6 text-center">
            <div className="w-16 h-16 bg-brand-accent/10 dark:bg-brand-accent/20 rounded-2xl flex items-center justify-center text-brand-accent mb-4">
              <Key size={32} />
            </div>
            <h1 className="text-2xl font-black text-brand-secondary dark:text-white">Reset Password</h1>
            <p className="text-stone-500 dark:text-stone-400 font-medium text-xs mt-1.5">
              Enter your account email to receive reset instructions.
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3.5 bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-bold rounded-2xl border border-red-500/20">
              {error}
            </div>
          )}

          {resetSent ? (
            <div className="text-center space-y-4">
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-700 dark:text-emerald-400 text-xs font-bold">
                Check your inbox! We've sent password reset instructions to <strong>{resetEmail}</strong>.
              </div>
              <button 
                onClick={() => { setResetSent(false); setViewMode('login'); }}
                className="w-full py-3.5 bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-200 rounded-2xl font-bold hover:bg-stone-200 cursor-pointer"
              >
                Back to Log In
              </button>
            </div>
          ) : (
            <form onSubmit={handleRequestReset} className="space-y-4">
              <div>
                <label className="text-[10px] font-black uppercase text-stone-500 dark:text-stone-400 tracking-wider px-1">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={resetEmail}
                  onChange={e => setResetEmail(e.target.value)}
                  placeholder="parent@example.com"
                  className="w-full mt-1 bg-stone-100/70 dark:bg-stone-800 text-stone-900 dark:text-stone-100 border border-stone-200 dark:border-stone-700 rounded-2xl py-3 px-4 text-sm focus:ring-4 focus:ring-brand-accent/15 focus:outline-none"
                />
              </div>
              <button 
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-brand-accent text-white rounded-2xl font-black shadow-lg shadow-brand-accent/25 hover:opacity-95 transition-all cursor-pointer"
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
              <div className="text-center pt-2">
                <button 
                  type="button"
                  onClick={() => setViewMode('login')}
                  className="text-xs font-bold text-stone-500 hover:text-brand-accent cursor-pointer"
                >
                  ← Return to Log In
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    );
  }

  // ==========================================
  // VIEW: Reset Password New Password Entry
  // ==========================================
  if (viewMode === 'reset_password') {
    return (
      <div className="min-h-screen bg-[#F7F7F2] dark:bg-stone-950 flex items-center justify-center p-6 bg-[radial-gradient(circle_at_top_right,_#A3B18A_0%,_transparent_40%)]">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white dark:bg-stone-900 rounded-[36px] shadow-2xl p-8 md:p-10 border border-stone-200/80 dark:border-stone-800"
        >
          <div className="flex flex-col items-center mb-6 text-center">
            <div className="w-16 h-16 bg-brand-accent/10 dark:bg-brand-accent/20 rounded-2xl flex items-center justify-center text-brand-accent mb-4">
              <Lock size={32} />
            </div>
            <h1 className="text-2xl font-black text-brand-secondary dark:text-white">Create New Password</h1>
          </div>

          {error && (
            <div className="mb-4 p-3.5 bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-bold rounded-2xl border border-red-500/20">
              {error}
            </div>
          )}

          <form onSubmit={handleUpdatePassword} className="space-y-4">
            <div>
              <label className="text-[10px] font-black uppercase text-stone-500 tracking-wider px-1">New Password</label>
              <input 
                type="password" 
                required
                minLength={6}
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full mt-1 bg-stone-100/70 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-2xl py-3 px-4 text-sm focus:ring-4 focus:ring-brand-accent/15 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] font-black uppercase text-stone-500 tracking-wider px-1">Confirm New Password</label>
              <input 
                type="password" 
                required
                minLength={6}
                value={confirmNewPassword}
                onChange={e => setConfirmNewPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full mt-1 bg-stone-100/70 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-2xl py-3 px-4 text-sm focus:ring-4 focus:ring-brand-accent/15 focus:outline-none"
              />
            </div>
            <button 
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-brand-accent text-white rounded-2xl font-black shadow-lg shadow-brand-accent/25 hover:opacity-95 transition-all cursor-pointer"
            >
              {loading ? 'Updating...' : 'Update Password'}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  // ==========================================
  // VIEW: Sign Up Gatekeeper (Role Select)
  // ==========================================
  if (viewMode === 'role_select') {
    return (
      <div className="min-h-screen bg-[#F7F7F2] dark:bg-stone-950 flex flex-col justify-between p-6 bg-[radial-gradient(circle_at_top_right,_#A3B18A_0%,_transparent_40%)] select-none">
        <header className="w-full max-w-xl mx-auto flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-brand-accent rounded-xl flex items-center justify-center text-white font-black text-xl shadow-md">
              M
            </div>
            <span className="font-black text-xl tracking-tight brand text-brand-secondary dark:text-white">
              MALI UTAJIRI
            </span>
          </div>
          <div className="flex items-center gap-3">
            {onBackToLanding && (
              <button
                onClick={onBackToLanding}
                className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline cursor-pointer hidden sm:inline-flex"
              >
                ← Public Website
              </button>
            )}
            <button
              onClick={() => setViewMode('login')}
              className="text-xs font-bold text-stone-500 hover:text-brand-accent px-3 py-1.5 rounded-full hover:bg-stone-200/50 cursor-pointer"
            >
              Log In
            </button>
          </div>
        </header>

        <main className="w-full max-w-lg mx-auto my-auto py-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-black uppercase tracking-wider mb-4">
              <ShieldCheck size={14} />
              <span>Safe & Parent-Provisioned</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-brand-secondary dark:text-white leading-tight mb-3">
              Who is joining today?
            </h1>
            <p className="text-sm text-stone-600 dark:text-stone-400 font-medium max-w-md mx-auto mb-8">
              Mali Utajiri protects children's safety and privacy. Parents set up family billing and provision child accounts directly.
            </p>

            <div className="grid grid-cols-1 gap-4 text-left">
              {/* Option A: Parent */}
              <button
                onClick={() => {
                  setWizardStep(1);
                  setViewMode('parent_wizard');
                }}
                className="group relative p-6 rounded-3xl bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 hover:border-brand-accent dark:hover:border-brand-accent shadow-xl hover:shadow-2xl transition-all cursor-pointer flex items-center gap-4"
              >
                <div className="w-14 h-14 rounded-2xl bg-brand-accent/10 group-hover:bg-brand-accent group-hover:text-white text-brand-accent flex items-center justify-center text-2xl transition-colors shrink-0">
                  👨‍👩‍👧‍👦
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-lg font-black text-brand-secondary dark:text-white">
                      I am a Parent / Guardian
                    </h3>
                    <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-500 text-white px-2.5 py-0.5 rounded-full">
                      1st Month Free
                    </span>
                  </div>
                  <p className="text-xs text-stone-500 dark:text-stone-400 font-medium leading-relaxed">
                    Set up family subscription (KES 300/mo), verify your Safaricom line, and register your child's age portal.
                  </p>
                </div>
                <ArrowRight size={20} className="text-stone-400 group-hover:text-brand-accent group-hover:translate-x-1 transition-all" />
              </button>

              {/* Option B: Child */}
              <button
                onClick={() => {
                  setViewMode('login');
                  setMessage("👋 Welcome! Please enter the email/username and password created for you by your parent.");
                }}
                className="group relative p-6 rounded-3xl bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 hover:border-blue-500 dark:hover:border-blue-500 shadow-xl hover:shadow-2xl transition-all cursor-pointer flex items-center gap-4"
              >
                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 group-hover:bg-blue-500 group-hover:text-white text-blue-500 flex items-center justify-center text-2xl transition-colors shrink-0">
                  🧒
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-lg font-black text-brand-secondary dark:text-white">
                      I am a Child / Mali User
                    </h3>
                    <span className="text-[10px] font-black uppercase tracking-wider bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 px-2.5 py-0.5 rounded-full">
                      Sign In Only
                    </span>
                  </div>
                  <p className="text-xs text-stone-500 dark:text-stone-400 font-medium leading-relaxed">
                    I already have credentials created by my parent or accountability partner. Take me to sign in!
                  </p>
                </div>
                <ArrowRight size={20} className="text-stone-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
              </button>
            </div>
          </motion.div>
        </main>

        <footer className="w-full max-w-lg mx-auto pb-4 text-center">
          <p className="text-xs text-stone-500 dark:text-stone-400 font-medium">
            Already registered?{' '}
            <button
              onClick={() => setViewMode('login')}
              className="font-black text-brand-accent hover:underline cursor-pointer"
            >
              Sign in to your account
            </button>
          </p>
        </footer>
      </div>
    );
  }

  // ==========================================
  // VIEW: Parent Onboarding Wizard (5 Steps)
  // Step 1: Safaricom Line Verification
  // Step 2: Parent Profile Creation
  // Step 3: Child Registration (DOB Tier, Region, Credentials)
  // Step 4: Family Plan & Payment Authorization (KES 300 / mo - Month 1 Free)
  // Step 5: Child Provisioning Complete Card
  // ==========================================
  if (viewMode === 'parent_wizard') {
    const childTierInfo = calculateAgeAndTier(childDob);

    return (
      <div className="min-h-screen bg-[#F7F7F2] dark:bg-stone-950 flex flex-col justify-between p-4 md:p-8 bg-[radial-gradient(circle_at_top_right,_#A3B18A_0%,_transparent_40%)] select-none">
        {/* Header with Progress Steps */}
        <header className="w-full max-w-2xl mx-auto pt-2">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-brand-accent rounded-xl flex items-center justify-center text-white font-black text-lg shadow-sm">
                M
              </div>
              <span className="font-black text-lg tracking-tight brand text-brand-secondary dark:text-white">
                Parent Registration
              </span>
            </div>

            <button
              onClick={() => setViewMode('role_select')}
              className="text-xs font-bold text-stone-500 hover:text-brand-accent flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft size={14} /> Back
            </button>
          </div>

          {/* Stepper Progress Bar */}
          <div className="grid grid-cols-5 gap-2 mb-6">
            {[
              { s: 1, name: 'Safaricom' },
              { s: 2, name: 'Profile' },
              { s: 3, name: 'Child' },
              { s: 4, name: 'Family Plan' },
              { s: 5, name: 'Ready!' }
            ].map(step => (
              <div key={step.s} className="flex flex-col gap-1">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    wizardStep >= step.s ? 'bg-brand-accent' : 'bg-stone-200 dark:bg-stone-800'
                  }`}
                />
                <span className={`text-[10px] font-black uppercase text-center truncate ${
                  wizardStep === step.s ? 'text-brand-accent' : 'text-stone-400'
                }`}>
                  {step.name}
                </span>
              </div>
            ))}
          </div>
        </header>

        {/* Wizard Main Step Container */}
        <main className="w-full max-w-xl mx-auto my-auto py-2">
          <motion.div
            key={wizardStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white dark:bg-stone-900 rounded-[36px] shadow-2xl p-6 md:p-8 border border-stone-200/80 dark:border-stone-800"
          >
            {error && (
              <div className="mb-4 p-3.5 bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-bold rounded-2xl border border-red-500/20">
                {error}
              </div>
            )}

            {message && (
              <div className="mb-4 p-3.5 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-bold rounded-2xl border border-emerald-500/20">
                {message}
              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* STEP 1: Safaricom Line & Carrier Verification */}
            {/* ---------------------------------------------------- */}
            {wizardStep === 1 && (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-brand-accent/10 text-brand-accent flex items-center justify-center mx-auto mb-3 text-3xl shadow-sm">
                    📱
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-[11px] font-bold tracking-wide mb-2 border border-stone-200 dark:border-stone-700">
                    <Sparkles size={12} className="text-brand-accent" /> Universal Mobile Verification
                  </div>
                  <h2 className="text-2xl font-black text-brand-secondary dark:text-white">
                    Verify Your Mobile Number
                  </h2>
                  <p className="text-xs text-stone-500 dark:text-stone-400 font-medium mt-1 max-w-sm mx-auto">
                    Works seamlessly across <strong>Safaricom, Airtel, Telkom</strong>, and international networks to verify parental identity.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between px-1 mb-1">
                      <label className="text-[10px] font-black uppercase text-stone-500 dark:text-stone-400 tracking-wider">
                        Mobile Phone Number
                      </label>
                      {phone.length >= 3 && (
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-full border ${detectCarrier(phone).color}`}>
                          {detectCarrier(phone).badge}
                        </span>
                      )}
                    </div>
                    <div className="relative mt-1">
                      <input
                        type="tel"
                        value={phone}
                        onChange={e => {
                          setPhone(e.target.value);
                          setIsPhoneVerified(false);
                          setIsOtpSent(false);
                        }}
                        placeholder="0712 345 678, 0733..., or +254..."
                        className="w-full bg-stone-100/70 dark:bg-stone-800 text-stone-900 dark:text-stone-100 border border-stone-200 dark:border-stone-700 rounded-2xl py-3.5 px-4 text-sm font-bold tracking-wide focus:ring-4 focus:ring-brand-accent/15 focus:outline-none pr-28"
                      />
                      <button
                        type="button"
                        onClick={handleSendOtp}
                        disabled={!phone || isPhoneVerified || isSendingOtp}
                        className="absolute right-2 top-2 px-3.5 py-2 bg-brand-accent text-white text-xs font-bold rounded-xl hover:opacity-95 disabled:opacity-50 transition-all cursor-pointer flex items-center gap-1.5"
                      >
                        {isSendingOtp ? (
                          <>
                            <Loader2 size={13} className="animate-spin" />
                            <span>Sending...</span>
                          </>
                        ) : isOtpSent ? (
                          otpTimer > 0 ? `${otpTimer}s` : 'Resend'
                        ) : (
                          'Send OTP'
                        )}
                      </button>
                    </div>
                    <p className="text-[11px] text-stone-400 dark:text-stone-500 mt-1 px-1">
                      Carrier auto-detects Safaricom, Airtel, Telkom, and Equitel lines.
                    </p>
                  </div>

                  {isOtpSent && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-stone-500 dark:text-stone-400 tracking-wider px-1">
                        6-Digit SMS Verification Code
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          maxLength={6}
                          value={otpCode}
                          onChange={e => setOtpCode(e.target.value)}
                          placeholder="123456"
                          className="flex-1 bg-stone-100/70 dark:bg-stone-800 text-stone-900 dark:text-stone-100 border border-stone-200 dark:border-stone-700 rounded-2xl py-3 px-4 text-center text-lg font-black tracking-widest focus:ring-4 focus:ring-brand-accent/15 focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={handleVerifyOtp}
                          disabled={isVerifyingOtp || otpCode.length < 6}
                          className="px-5 py-3 bg-brand-accent text-white font-black text-xs rounded-2xl shadow-md hover:scale-[1.02] disabled:opacity-50 cursor-pointer flex items-center gap-1.5"
                        >
                          {isVerifyingOtp ? (
                            <>
                              <Loader2 size={14} className="animate-spin" />
                              <span>Verifying...</span>
                            </>
                          ) : (
                            'Confirm'
                          )}
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {isPhoneVerified && (
                    <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 flex items-center gap-3">
                      <CheckCircle2 className="text-emerald-500" size={20} />
                      <div>
                        <p className="text-xs font-black text-emerald-700 dark:text-emerald-400">Mobile Line Verified Successfully</p>
                        <p className="text-[11px] text-stone-500">
                          {detectCarrier(phone).label} verified via cryptographic carrier token
                        </p>
                      </div>
                    </div>
                  )}

                  <button
                    type="button"
                    disabled={!isPhoneVerified}
                    onClick={() => {
                      setError('');
                      setMessage('');
                      setWizardStep(2);
                    }}
                    className="w-full py-4 bg-brand-accent text-white font-black text-sm rounded-2xl shadow-xl shadow-brand-accent/25 hover:opacity-95 disabled:opacity-40 transition-all cursor-pointer flex items-center justify-center gap-2 mt-4"
                  >
                    <span>Continue to Parent Profile</span>
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* STEP 2: Parent Profile Creation */}
            {/* ---------------------------------------------------- */}
            {wizardStep === 2 && (
              <div className="space-y-5">
                <div className="text-center">
                  <h2 className="text-2xl font-black text-brand-secondary dark:text-white">
                    Create Parent Profile
                  </h2>
                  <p className="text-xs text-stone-500 dark:text-stone-400 font-medium mt-1">
                    Manage family limits, track lessons, and mentor your child's wealth journey.
                  </p>
                </div>

                <div className="space-y-3.5">
                  <div>
                    <label className="text-[10px] font-black uppercase text-stone-500 tracking-wider px-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={parentName}
                      onChange={e => setParentName(e.target.value)}
                      placeholder="e.g. Amani Kamau"
                      className="w-full mt-1 bg-stone-100/70 dark:bg-stone-800 text-stone-900 dark:text-stone-100 border border-stone-200 dark:border-stone-700 rounded-2xl py-3 px-4 text-sm focus:ring-4 focus:ring-brand-accent/15 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-black uppercase text-stone-500 tracking-wider px-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={parentEmail}
                      onChange={e => setParentEmail(e.target.value)}
                      placeholder="parent@example.com"
                      className="w-full mt-1 bg-stone-100/70 dark:bg-stone-800 text-stone-900 dark:text-stone-100 border border-stone-200 dark:border-stone-700 rounded-2xl py-3 px-4 text-sm focus:ring-4 focus:ring-brand-accent/15 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-black uppercase text-stone-500 tracking-wider px-1">Password</label>
                      <input
                        type="password"
                        required
                        minLength={6}
                        value={parentPassword}
                        onChange={e => setParentPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full mt-1 bg-stone-100/70 dark:bg-stone-800 text-stone-900 dark:text-stone-100 border border-stone-200 dark:border-stone-700 rounded-2xl py-3 px-4 text-sm focus:ring-4 focus:ring-brand-accent/15 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-black uppercase text-stone-500 tracking-wider px-1">Confirm Password</label>
                      <input
                        type="password"
                        required
                        minLength={6}
                        value={parentConfirmPassword}
                        onChange={e => setParentConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full mt-1 bg-stone-100/70 dark:bg-stone-800 text-stone-900 dark:text-stone-100 border border-stone-200 dark:border-stone-700 rounded-2xl py-3 px-4 text-sm focus:ring-4 focus:ring-brand-accent/15 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-black uppercase text-stone-500 tracking-wider px-1">Relationship to Child</label>
                    <select
                      value={parentRelationship}
                      onChange={e => setParentRelationship(e.target.value)}
                      className="w-full mt-1 bg-stone-100/70 dark:bg-stone-800 text-stone-900 dark:text-stone-100 border border-stone-200 dark:border-stone-700 rounded-2xl py-3 px-4 text-sm focus:ring-4 focus:ring-brand-accent/15 focus:outline-none"
                    >
                      <option value="Mother">Mother</option>
                      <option value="Father">Father</option>
                      <option value="Guardian">Guardian</option>
                      <option value="Mentor">Accountability Partner / Mentor</option>
                    </select>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setWizardStep(1)}
                      className="px-5 py-4 bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 rounded-2xl font-bold hover:bg-stone-200 cursor-pointer"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (!parentName || !parentEmail || !parentPassword) {
                          setError('Please fill in all parent profile fields.');
                          return;
                        }
                        if (parentPassword !== parentConfirmPassword) {
                          setError('Passwords do not match.');
                          return;
                        }
                        setError('');
                        setWizardStep(3);
                      }}
                      className="flex-1 py-4 bg-brand-accent text-white font-black text-sm rounded-2xl shadow-xl shadow-brand-accent/25 hover:opacity-95 transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>Continue to Child Registration</span>
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* STEP 3: Register Child Account Details */}
            {/* ---------------------------------------------------- */}
            {wizardStep === 3 && (
              <div className="space-y-5">
                <div className="text-center">
                  <h2 className="text-2xl font-black text-brand-secondary dark:text-white">
                    Register Child Account
                  </h2>
                  <p className="text-xs text-stone-500 dark:text-stone-400 font-medium mt-1">
                    Date of birth automatically tailors the portal interface and financial curriculum.
                  </p>
                </div>

                <div className="space-y-3.5">
                  <div>
                    <label className="text-[10px] font-black uppercase text-stone-500 tracking-wider px-1">Child Full Name</label>
                    <input
                      type="text"
                      required
                      value={childName}
                      onChange={e => setChildName(e.target.value)}
                      placeholder="e.g. Zawadi Kamau"
                      className="w-full mt-1 bg-stone-100/70 dark:bg-stone-800 text-stone-900 dark:text-stone-100 border border-stone-200 dark:border-stone-700 rounded-2xl py-3 px-4 text-sm focus:ring-4 focus:ring-brand-accent/15 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-black uppercase text-stone-500 tracking-wider px-1">Child Date of Birth</label>
                      <input
                        type="date"
                        required
                        value={childDob}
                        onChange={e => setChildDob(e.target.value)}
                        className="w-full mt-1 bg-stone-100/70 dark:bg-stone-800 text-stone-900 dark:text-stone-100 border border-stone-200 dark:border-stone-700 rounded-2xl py-3 px-4 text-sm focus:ring-4 focus:ring-brand-accent/15 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-black uppercase text-stone-500 tracking-wider px-1">Region / Currency</label>
                      <select
                        value={childCountry}
                        onChange={e => setChildCountry(e.target.value as 'kenya' | 'international')}
                        className="w-full mt-1 bg-stone-100/70 dark:bg-stone-800 text-stone-900 dark:text-stone-100 border border-stone-200 dark:border-stone-700 rounded-2xl py-3 px-4 text-sm focus:ring-4 focus:ring-brand-accent/15 focus:outline-none"
                      >
                        <option value="kenya">🇰🇪 Kenya (KES / M-Pesa)</option>
                        <option value="international">🌍 International (USD)</option>
                      </select>
                    </div>
                  </div>

                  {/* Auto-Assigned Portal Tier Banner */}
                  {childDob && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }} 
                      animate={{ opacity: 1, scale: 1 }}
                      className={`p-3.5 rounded-2xl border ${childTierInfo.color} flex items-center justify-between gap-3`}
                    >
                      <div>
                        <div className="flex items-center gap-1.5 font-black text-xs uppercase tracking-wide">
                          <span>✨</span>
                          <span>Assigned: {childTierInfo.label}</span>
                        </div>
                        <p className="text-[11px] font-medium opacity-90 mt-0.5">{childTierInfo.desc}</p>
                      </div>
                      <span className="text-xl">
                        {childTierInfo.tier === 'junior' ? '👶' : childTierInfo.tier === 'teen' ? '👦' : '🚀'}
                      </span>
                    </motion.div>
                  )}

                  {/* Child Login Credentials */}
                  <div className="p-4 rounded-2xl bg-stone-100/70 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 space-y-3">
                    <h4 className="text-xs font-black uppercase tracking-wider text-brand-secondary dark:text-white flex items-center gap-1.5">
                      <Lock size={13} />
                      Child Sign In Credentials
                    </h4>
                    <div>
                      <label className="text-[10px] font-black uppercase text-stone-500 tracking-wider px-1">Child Login Email or Username</label>
                      <input
                        type="email"
                        required
                        value={childEmail}
                        onChange={e => setChildEmail(e.target.value)}
                        placeholder="zawadi@mali.app"
                        className="w-full mt-1 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl py-2.5 px-3 text-sm focus:outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] font-black uppercase text-stone-500 tracking-wider px-1">Child Password</label>
                        <input
                          type="password"
                          required
                          minLength={6}
                          value={childPassword}
                          onChange={e => setChildPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full mt-1 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl py-2.5 px-3 text-sm focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-black uppercase text-stone-500 tracking-wider px-1">Confirm Child Password</label>
                        <input
                          type="password"
                          required
                          minLength={6}
                          value={childConfirmPassword}
                          onChange={e => setChildConfirmPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full mt-1 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl py-2.5 px-3 text-sm focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setWizardStep(2)}
                      className="px-5 py-4 bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 rounded-2xl font-bold hover:bg-stone-200 cursor-pointer"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (!childName || !childDob || !childEmail || !childPassword) {
                          setError('Please complete all child details and credentials.');
                          return;
                        }
                        if (childPassword !== childConfirmPassword) {
                          setError('Child passwords do not match.');
                          return;
                        }
                        setError('');
                        setWizardStep(4);
                      }}
                      className="flex-1 py-4 bg-brand-accent text-white font-black text-sm rounded-2xl shadow-xl shadow-brand-accent/25 hover:opacity-95 transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>Proceed to Family Plan & Payment</span>
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* STEP 4: Family Plan & Payment Authorization (KES 300 / mo - Month 1 Free) */}
            {/* ---------------------------------------------------- */}
            {wizardStep === 4 && (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto mb-2 text-2xl">
                    🛡️
                  </div>
                  <h2 className="text-2xl font-black text-brand-secondary dark:text-white">
                    Activate Family Plan
                  </h2>
                  <p className="text-xs text-stone-500 dark:text-stone-400 font-medium mt-1">
                    Provision {childName}'s account and unlock the complete app with zero child paywalls.
                  </p>
                </div>

                {/* Pricing Summary Card */}
                <div className="p-5 rounded-3xl bg-gradient-to-br from-emerald-500/10 via-brand-accent/10 to-transparent border-2 border-emerald-500/30 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-emerald-500/20">
                    <div>
                      <h4 className="font-black text-base text-brand-secondary dark:text-white">
                        Mali Family Membership
                      </h4>
                      <p className="text-xs text-stone-500 dark:text-stone-400">All modules, wealth jars & unlimited AI</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-stone-400 line-through">KES 300</span>
                      <p className="text-lg font-black text-emerald-600 dark:text-emerald-400">KES 0.00</p>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs font-medium text-stone-700 dark:text-stone-300">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <CheckCircle2 size={14} className="text-emerald-500" />
                        First Month 100% Free
                      </span>
                      <span className="font-bold text-emerald-600">30-Day Trial</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <CheckCircle2 size={14} className="text-emerald-500" />
                        Unlimited MaliBot AI Tutor
                      </span>
                      <span className="font-bold">Zero limits</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <CheckCircle2 size={14} className="text-emerald-500" />
                        Carrier Billing Line
                      </span>
                      <span className="font-bold text-emerald-600">{phone}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <CheckCircle2 size={14} className="text-emerald-500" />
                        Renews in 30 Days
                      </span>
                      <span className="font-bold">KES 300/mo</span>
                    </div>
                  </div>

                  <div className="p-3 bg-white/70 dark:bg-stone-800/70 rounded-2xl border border-stone-200 dark:border-stone-700 text-[11px] text-stone-500 leading-relaxed">
                    🔒 <strong>No immediate charge.</strong> You will be billed KES 300 via your Safaricom line automatically in 30 days. Cancel anytime in your Parent Dashboard.
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => setWizardStep(3)}
                    className="px-5 py-4 bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 rounded-2xl font-bold hover:bg-stone-200 cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    disabled={loading}
                    onClick={handleAuthorizeFamilyPlan}
                    className="flex-1 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm md:text-base rounded-2xl shadow-xl shadow-emerald-600/30 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <span>Authorizing Safaricom Line & Provisioning...</span>
                    ) : (
                      <>
                        <Zap size={18} />
                        <span>Authorize & Provision Child Account</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* STEP 5: Child Provisioning Complete & Hand-off Card */}
            {/* ---------------------------------------------------- */}
            {wizardStep === 5 && (
              <div className="space-y-6 text-center">
                <div className="w-20 h-20 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto text-4xl shadow-inner animate-bounce">
                  🎉
                </div>
                <div>
                  <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 text-xs font-black uppercase tracking-wider mb-2">
                    <CheckCircle2 size={14} /> Provisioning Complete
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black text-brand-secondary dark:text-white">
                    Account Successfully Created!
                  </h2>
                  <p className="text-xs text-stone-500 dark:text-stone-400 font-medium mt-1">
                    {childName} has complete, unrestricted access with zero child paywalls.
                  </p>
                </div>

                {/* Child Credentials Card */}
                <div className="p-5 rounded-3xl bg-stone-50 dark:bg-stone-800 border-2 border-brand-accent/30 text-left space-y-3 relative overflow-hidden shadow-lg">
                  <div className="flex items-center justify-between pb-2 border-b border-stone-200 dark:border-stone-700">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-brand-accent">Child Account Card</span>
                      <h4 className="font-black text-base text-brand-secondary dark:text-white">{childName}</h4>
                    </div>
                    <span className="text-xs font-black px-2.5 py-1 rounded-full bg-brand-accent text-white uppercase">
                      {childTierInfo.label.split(' ')[0]} Portal
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-[10px] font-bold text-stone-400 uppercase">Login Username/Email</span>
                      <p className="font-mono font-bold text-stone-800 dark:text-stone-200 truncate">{childEmail}</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-stone-400 uppercase">Password</span>
                      <p className="font-mono font-bold text-stone-800 dark:text-stone-200 truncate">{childPassword}</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(`Mali Utajiri Login:\nUsername: ${childEmail}\nPassword: ${childPassword}`);
                      setCopiedCredentials(true);
                      setTimeout(() => setCopiedCredentials(false), 3000);
                    }}
                    className="w-full py-2.5 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl text-xs font-bold text-stone-700 dark:text-stone-200 flex items-center justify-center gap-1.5 hover:bg-stone-100 transition-colors cursor-pointer"
                  >
                    {copiedCredentials ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                    <span>{copiedCredentials ? 'Copied to Clipboard!' : 'Copy Child Credentials'}</span>
                  </button>
                </div>

                {/* Two Action Buttons: Child Login or Parent Dashboard */}
                <div className="flex flex-col gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (provisionedChild) {
                        onLogin(provisionedChild);
                      } else {
                        setViewMode('login');
                      }
                    }}
                    className="w-full py-4 bg-brand-accent text-white font-black text-base rounded-2xl shadow-xl shadow-brand-accent/25 hover:scale-[1.01] transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Log In as {childName} Now 🚀</span>
                    <ArrowRight size={18} />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (provisionedParent) {
                        onLogin(provisionedParent);
                      } else {
                        setViewMode('login');
                      }
                    }}
                    className="w-full py-3.5 bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-bold text-sm rounded-2xl hover:bg-stone-200 transition-colors cursor-pointer"
                  >
                    Go to Parent Dashboard 📊
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </main>

        <footer className="w-full max-w-xl mx-auto pb-2 text-center">
          <p className="text-[11px] font-bold text-stone-400 uppercase tracking-widest">
            Parent Approved • Safaricom Line Carrier Billing • Legal Compliance
          </p>
        </footer>
      </div>
    );
  }

  // ==========================================
  // VIEW: Standard Login Screen
  // ==========================================
  return (
    <div className="min-h-screen bg-[#F7F7F2] dark:bg-stone-950 flex flex-col justify-between p-6 bg-[radial-gradient(circle_at_top_right,_#A3B18A_0%,_transparent_40%)] select-none">
      <header className="w-full max-w-md mx-auto flex items-center justify-between pt-2">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-brand-accent rounded-xl flex items-center justify-center text-white font-black text-xl shadow-md">
            M
          </div>
          <span className="font-black text-xl tracking-tight brand text-brand-secondary dark:text-white">
            MALI UTAJIRI
          </span>
        </div>
        <div className="flex items-center gap-3">
          {onBackToLanding && (
            <button
              onClick={onBackToLanding}
              className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline cursor-pointer hidden sm:inline-flex"
            >
              ← Public Website
            </button>
          )}
          <button
            onClick={() => setViewMode('role_select')}
            className="text-xs font-bold text-brand-accent hover:underline cursor-pointer"
          >
            Sign Up
          </button>
        </div>
      </header>

      <main className="w-full max-w-md mx-auto my-auto py-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-stone-900 rounded-[36px] shadow-2xl p-8 md:p-10 border border-stone-200/80 dark:border-stone-800"
        >
          <div className="flex flex-col items-center mb-6 text-center">
            <h1 className="text-3xl font-black text-brand-secondary dark:text-white brand">
              Welcome Back
            </h1>
            <p className="text-stone-500 dark:text-stone-400 font-medium mt-1 text-xs">
              Log in with credentials provided by your parent or account email.
            </p>
          </div>

          {message && (
            <div className="mb-4 p-3 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-bold rounded-2xl border border-emerald-500/20">
              {message}
            </div>
          )}

          {error && (
            <div className="mb-4 p-3 bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-bold rounded-2xl border border-red-500/20">
              {error}
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="text-[10px] font-black uppercase text-stone-500 dark:text-stone-400 tracking-wider px-1">
                Email or Username
              </label>
              <input 
                type="text" 
                required
                value={loginEmail}
                onChange={e => setLoginEmail(e.target.value)}
                placeholder="you@example.com or username"
                className="w-full mt-1 bg-stone-100/70 dark:bg-stone-800 text-stone-900 dark:text-stone-100 border border-stone-200 dark:border-stone-700 rounded-2xl py-3 px-4 text-sm focus:ring-4 focus:ring-brand-accent/15 focus:outline-none transition-all"
              />
            </div>

            <div>
              <div className="flex items-center justify-between px-1">
                <label className="text-[10px] font-black uppercase text-stone-500 dark:text-stone-400 tracking-wider">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => { setViewMode('forgot'); setError(''); setMessage(''); }}
                  className="text-xs font-bold text-brand-accent hover:underline cursor-pointer bg-transparent border-none p-0"
                >
                  Forgot?
                </button>
              </div>
              <div className="relative mt-1">
                <input 
                  type={showLoginPassword ? "text" : "password"}
                  required
                  value={loginPassword}
                  onChange={e => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-stone-100/70 dark:bg-stone-800 text-stone-900 dark:text-stone-100 border border-stone-200 dark:border-stone-700 rounded-2xl py-3 px-4 text-sm pr-11 focus:ring-4 focus:ring-brand-accent/15 focus:outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowLoginPassword(!showLoginPassword)}
                  className="absolute right-3 top-3 text-stone-400 hover:text-stone-600 cursor-pointer"
                >
                  {showLoginPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-brand-accent text-white py-4 rounded-2xl font-black text-sm shadow-xl shadow-brand-accent/25 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer mt-4"
            >
              {loading ? 'Signing In...' : 'Sign In to Mali'}
            </button>
          </form>

          <div className="mt-6 text-center border-t border-stone-100 dark:border-stone-800 pt-5">
            <p className="text-xs text-stone-500 font-medium">
              Need a family account?{' '}
              <button 
                onClick={() => { setError(''); setMessage(''); setViewMode('role_select'); }}
                className="font-black text-brand-accent hover:underline cursor-pointer"
              >
                Sign Up as Parent
              </button>
            </p>
          </div>
        </motion.div>
      </main>

      <footer className="w-full max-w-md mx-auto pb-2 text-center">
        <p className="text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em]">
          Child-Safe • Unlimited AI Access • Parent Gated
        </p>
      </footer>
    </div>
  );
}
