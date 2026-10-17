import React, { useState } from 'react';
import {
  X,
  Mail,
  Lock,
  User as UserIcon,
  Eye,
  EyeOff,
  MapPin,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { AuthMode } from '../types/auth';
import { useAuth } from '../context/AuthContext';
import { LocationSelection } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: AuthMode;
  onSuccess?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'signup',
  onSuccess,
}) => {
  const { signInWithEmail, signUpWithEmail, signInWithGoogle } = useAuth();

  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [preferredNeighbourhood, setPreferredNeighbourhood] = useState('Ikeja');
  const [preferredState, setPreferredState] = useState('Lagos');
  
  // UI States
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showGooglePicker, setShowGooglePicker] = useState(false);
  const [customGoogleEmail, setCustomGoogleEmail] = useState('');
  const [customGoogleName, setCustomGoogleName] = useState('');

  if (!isOpen) return null;

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    try {
      if (mode === 'signup') {
        const preferredLocation: LocationSelection = {
          state: preferredState as any,
          neighbourhood: preferredNeighbourhood,
        };
        const res = await signUpWithEmail(name, email, password, preferredLocation);
        if (!res.success) {
          setErrorMsg(res.error || 'Failed to create account.');
          setLoading(false);
          return;
        }
      } else {
        const res = await signInWithEmail(email, password);
        if (!res.success) {
          setErrorMsg(res.error || 'Failed to sign in.');
          setLoading(false);
          return;
        }
      }

      setLoading(false);
      if (onSuccess) onSuccess();
      onClose();
    } catch (err: any) {
      setErrorMsg(err?.message || 'An unexpected error occurred.');
      setLoading(false);
    }
  };

  const handleGoogleSelect = async (accountEmail?: string, accountName?: string) => {
    setLoading(true);
    setErrorMsg(null);
    try {
      await signInWithGoogle(
        accountEmail
          ? { email: accountEmail, name: accountName || accountEmail.split('@')[0] }
          : undefined
      );
      setLoading(false);
      setShowGooglePicker(false);
      if (onSuccess) onSuccess();
      onClose();
    } catch {
      setErrorMsg('Failed to sign in with Google.');
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <div 
        className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
      >
        
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-slate-950 font-bold text-base shadow-sm">
              N
            </div>
            <div>
              <h2 id="auth-modal-title" className="text-base font-bold text-white leading-tight">
                {mode === 'signup' ? 'Create Nairabox Account' : 'Sign in to Nairabox'}
              </h2>
              <span className="text-[11px] text-slate-400">
                Nigerian Movie & Event Ticketing
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close authentication modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Google Account Picker View (if user triggers Google flow) */}
        {showGooglePicker ? (
          <div className="p-6 space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.14z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.94H1.27v3.14C3.26 21.31 7.34 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.26c-.25-.72-.38-1.49-.38-2.26s.13-1.54.38-2.26V6.6H1.27C.46 8.23 0 10.06 0 12s.46 3.77 1.27 5.4l4.01-3.14z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.69 1.27 6.6l4.01 3.14c.95-2.84 3.6-4.99 6.72-4.99z"
                />
              </svg>
              <div>
                <h3 className="text-sm font-bold text-white">Choose a Google Account</h3>
                <p className="text-xs text-slate-400">to continue to Nairabox Prototype</p>
              </div>
            </div>

            {/* Quick selector with User session account */}
            <div className="space-y-2">
              <button
                onClick={() => handleGoogleSelect('kunleisiaka9@gmail.com', 'Kunle Isiaka')}
                disabled={loading}
                className="w-full p-3 rounded-xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 hover:border-emerald-500/50 text-left transition-all cursor-pointer flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-slate-950 text-sm">
                    K
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors block">
                      Kunle Isiaka
                    </span>
                    <span className="text-xs text-slate-400">kunleisiaka9@gmail.com</span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
              </button>

              <button
                onClick={() => handleGoogleSelect('events.seeker@gmail.com', 'Naija Event Seeker')}
                disabled={loading}
                className="w-full p-3 rounded-xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 hover:border-emerald-500/50 text-left transition-all cursor-pointer flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white text-sm">
                    N
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors block">
                      Naija Event Seeker
                    </span>
                    <span className="text-xs text-slate-400">events.seeker@gmail.com</span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
              </button>
            </div>

            {/* Custom Google Account input */}
            <div className="pt-2 border-t border-slate-800/80">
              <span className="text-xs text-slate-400 block mb-2">Or enter another Google ID:</span>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={customGoogleEmail}
                  onChange={(e) => setCustomGoogleEmail(e.target.value)}
                  placeholder="yourname@gmail.com"
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
                <button
                  onClick={() => {
                    if (customGoogleEmail && customGoogleEmail.includes('@')) {
                      handleGoogleSelect(customGoogleEmail);
                    }
                  }}
                  disabled={!customGoogleEmail}
                  className="px-3 py-2 rounded-lg bg-emerald-500 disabled:opacity-40 text-slate-950 font-bold text-xs cursor-pointer"
                >
                  Proceed
                </button>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowGooglePicker(false)}
                className="text-xs text-slate-400 hover:text-white cursor-pointer"
              >
                Back to Sign in / Sign up
              </button>
            </div>
          </div>
        ) : (
          /* Main Auth Form */
          <div className="p-6 space-y-4">
            
            {/* Mode Switcher Tabs */}
            <div className="flex p-1 bg-slate-950 rounded-xl border border-slate-800">
              <button
                type="button"
                onClick={() => {
                  setMode('signup');
                  setErrorMsg(null);
                }}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  mode === 'signup'
                    ? 'bg-emerald-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Sign Up (New User)
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode('signin');
                  setErrorMsg(null);
                }}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  mode === 'signin'
                    ? 'bg-emerald-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Sign In
              </button>
            </div>

            {/* Error Notification if any */}
            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-950/50 border border-rose-500/40 text-xs text-rose-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* 1. Continue with Google ID Button */}
            <div>
              <button
                type="button"
                onClick={() => setShowGooglePicker(true)}
                className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2.5 transition-colors cursor-pointer shadow-sm"
              >
                {/* Official Google 'G' Mark */}
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.14z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.94H1.27v3.14C3.26 21.31 7.34 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.26c-.25-.72-.38-1.49-.38-2.26s.13-1.54.38-2.26V6.6H1.27C.46 8.23 0 10.06 0 12s.46 3.77 1.27 5.4l4.01-3.14z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.69 1.27 6.6l4.01 3.14c.95-2.84 3.6-4.99 6.72-4.99z"
                  />
                </svg>
                <span>
                  {mode === 'signup' ? 'Sign up with Google ID' : 'Sign in with Google ID'}
                </span>
              </button>
            </div>

            {/* Divider */}
            <div className="relative flex items-center justify-center my-3">
              <div className="border-t border-slate-800 w-full" />
              <span className="bg-slate-900 px-3 text-[11px] font-mono uppercase text-slate-500 shrink-0">
                or with email & password
              </span>
            </div>

            {/* Email / Password Form */}
            <form onSubmit={handleEmailSubmit} className="space-y-3">
              
              {/* Full Name (Sign Up only) */}
              {mode === 'signup' && (
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <UserIcon className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Babatunde Adeleke"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-9 pr-3 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
              )}

              {/* Email */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-9 pr-3 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-medium text-slate-300">
                    Password
                  </label>
                  {mode === 'signin' && (
                    <button
                      type="button"
                      onClick={() => alert('Password reset simulation: A reset link would be emailed to ' + (email || 'your email'))}
                      className="text-[11px] text-emerald-400 hover:underline cursor-pointer"
                    >
                      Forgot?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-9 pr-10 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-slate-500 hover:text-slate-300"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Preferred Neighbourhood (Sign Up only) */}
              {mode === 'signup' && (
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Preferred Event Location
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-emerald-400 absolute left-3 top-3" />
                    <select
                      value={`${preferredState}::${preferredNeighbourhood}`}
                      onChange={(e) => {
                        const [st, nb] = e.target.value.split('::');
                        setPreferredState(st);
                        setPreferredNeighbourhood(nb);
                      }}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-9 pr-8 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 cursor-pointer"
                    >
                      <option value="Lagos::Ikeja">Lagos · Ikeja (Mainland)</option>
                      <option value="Lagos::Lekki">Lagos · Lekki (Island)</option>
                      <option value="Lagos::Victoria Island">Lagos · Victoria Island (Island)</option>
                      <option value="Lagos::Yaba">Lagos · Yaba (Mainland Tech Hub)</option>
                      <option value="Lagos::Agege">Lagos · Agege (Pen Cinema Axis)</option>
                      <option value="Lagos::Ikorodu">Lagos · Ikorodu (Waterfront & Town Hall)</option>
                      <option value="Federal Capital Territory (Abuja)::Wuse">Abuja (FCT) · Wuse</option>
                      <option value="Rivers::Old GRA / New GRA">Port Harcourt · GRA</option>
                      <option value="Kano::Sabo Gerri">Kano State · Sabo Gerri</option>
                      <option value="Kano::Emir Mall (FilmOne Cinema)">Kano State · Emir Mall (FilmOne Cinema)</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm transition-colors cursor-pointer shadow-md shadow-emerald-500/20 flex items-center justify-center gap-2"
              >
                <span>
                  {loading
                    ? 'Processing...'
                    : mode === 'signup'
                    ? 'Create Free Account'
                    : 'Sign In to Nairabox'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </form>

            {/* Toggle bottom link */}
            <div className="pt-2 text-center text-xs text-slate-400">
              {mode === 'signup' ? (
                <>
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setMode('signin');
                      setErrorMsg(null);
                    }}
                    className="text-emerald-400 hover:underline font-semibold cursor-pointer"
                  >
                    Sign In instead
                  </button>
                </>
              ) : (
                <>
                  New to Nairabox?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setMode('signup');
                      setErrorMsg(null);
                    }}
                    className="text-emerald-400 hover:underline font-semibold cursor-pointer"
                  >
                    Sign Up here
                  </button>
                </>
              )}
            </div>

            {/* Quiet notice */}
            <div className="pt-2 border-t border-slate-800/60 text-[11px] text-slate-400 text-center flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Sign-up & Sign-in enabled for prototype evaluation</span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
