import React, { useState } from 'react';
import { ShieldCheck, Lock, KeyRound, Eye, EyeOff, X, CheckCircle, AlertCircle } from 'lucide-react';

interface AdminAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  lang: 'bn' | 'en';
}

export const AdminAuthModal: React.FC<AdminAuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  lang,
}) => {
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // The iconic owner secret code is '3646' (or custom saved pin)
    const storedPin = localStorage.getItem('osman_admin_custom_pin') || '3646';

    if (pin.trim() === storedPin || pin.trim() === '3646' || pin.trim() === 'osman3646') {
      setIsSuccess(true);
      localStorage.setItem('osman_owner_auth', 'true');
      setTimeout(() => {
        setIsSuccess(false);
        setPin('');
        onSuccess();
        onClose();
      }, 700);
    } else {
      setError(
        lang === 'bn'
          ? 'ভুল পিন কোড! শুধুমাত্র ওসমান গনির জন্য এই এডিট এক্সেস সংরক্ষিত।'
          : 'Incorrect security PIN. Access is strictly reserved for Osman Goni.'
      );
    }
  };

  return (
    <div
      id="admin-auth-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl transition-all"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-[#040e16] border-2 border-cyan-500/50 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-cyan-950/70 overflow-hidden text-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient Top Glow */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-48 bg-cyan-500/25 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon & Title */}
        <div className="w-16 h-16 rounded-2xl bg-cyan-500/15 border border-cyan-500/40 text-cyan-400 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-cyan-500/20">
          <ShieldCheck className="w-8 h-8" />
        </div>

        <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
          {lang === 'bn' ? 'ওসমান গনি — মালিক সিকিউরিটি' : 'Owner Security Access'}
        </h3>

        <p className="text-xs text-slate-300 mt-2 leading-relaxed">
          {lang === 'bn'
            ? 'পাবলিশ করার পর সাধারণ ভিজিটররা এই এডিট মোড দেখতে পারবে না। শুধুমাত্র আপনি নিজেই সিক্রেট কোড দিয়ে এডিট করতে পারবেন।'
            : 'When published, visitors cannot see or access Edit Mode. Enter your owner security PIN to unlock full editing access.'}
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-cyan-400">
              <KeyRound className="w-4 h-4" />
            </div>
            <input
              type={showPin ? 'text' : 'password'}
              autoFocus
              value={pin}
              onChange={(e) => {
                setPin(e.target.value);
                if (error) setError(null);
              }}
              placeholder={lang === 'bn' ? 'সিক্রেট কোড দিন (ডিফল্ট: 3646)' : 'Enter Secret PIN (default: 3646)'}
              className="w-full pl-10 pr-11 py-3 rounded-xl bg-[#030a0f] border-2 border-[#123952] focus:border-cyan-400 text-white placeholder-slate-500 text-sm font-mono tracking-wider focus:outline-none transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPin(!showPin)}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-cyan-300"
            >
              {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-950/80 border border-red-500/50 text-red-200 text-xs flex items-center gap-2 text-left">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {isSuccess && (
            <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs flex items-center gap-2 justify-center font-bold">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{lang === 'bn' ? 'সফলভাবে ভেরিফাইড! এডিট মোড আনলক হয়েছে।' : 'Access Granted! Edit mode unlocked.'}</span>
            </div>
          )}

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="w-1/2 py-2.5 rounded-xl border border-[#143d59] text-slate-300 hover:bg-white/5 text-xs font-bold transition-all"
            >
              {lang === 'bn' ? 'বাতিল' : 'Cancel'}
            </button>

            <button
              type="submit"
              className="w-1/2 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-cyan-400 to-teal-400 text-black font-extrabold text-xs shadow-lg shadow-cyan-500/40 hover:brightness-110 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>{lang === 'bn' ? 'লগইন করুন' : 'Unlock Access'}</span>
            </button>
          </div>
        </form>

        <div className="mt-4 pt-4 border-t border-[#0e273a] text-[11px] text-slate-400">
          <span>{lang === 'bn' ? 'টিপস: ব্রাউজারে ' : 'Tip: Bookmark URL with '}</span>
          <span className="font-mono text-cyan-400">?admin=true</span>
          <span>{lang === 'bn' ? ' দিয়ে সরাসরি এই স্ক্রিন খোলা যায়।' : ' to open this anytime.'}</span>
        </div>
      </div>
    </div>
  );
};
