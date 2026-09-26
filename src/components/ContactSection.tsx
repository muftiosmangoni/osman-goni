import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MessageSquare, Instagram, Facebook, Linkedin, Copy, Check, Send, Sparkles, MapPin, Youtube } from 'lucide-react';
import { PortfolioCustomization } from '../types';

interface ContactSectionProps {
  customization: PortfolioCustomization;
  lang: 'bn' | 'en';
}

export const ContactSection: React.FC<ContactSectionProps> = ({ customization, lang }) => {
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const isDark = customization.themeMode === 'dark';

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => setFormSent(false), 5000);
  };

  return (
    <section id="contact" className={`py-10 sm:py-20 border-t relative ${
      isDark ? 'bg-[#020609]/55 backdrop-blur-[1px] border-[#0e2536]' : 'bg-white border-slate-200'
    }`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-20">
        
        {/* Pill & Title matching screenshot: 
            CONTACT ME
            Contact Me
        */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-14">
          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-xs font-extrabold uppercase tracking-wider mb-2 border ${
            isDark ? 'bg-[#071d2b] border-[#13425e] text-cyan-400' : 'bg-cyan-50 border-cyan-200 text-cyan-700'
          }`}>
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>CONTACT ME</span>
          </div>

          <h2 className={`text-2xl sm:text-4xl md:text-5xl font-black tracking-tight ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300">Me</span>
          </h2>
          <p className={`text-xs sm:text-sm mt-1 sm:mt-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            {lang === 'bn'
              ? 'ভিডিও এডিটিং, গ্রাফিক ডিজাইন বা ক্রিয়েটিভ কোলাবোরেশনের জন্য সরাসরি যোগাযোগ করুন।'
              : 'Feel free to connect directly for video editing, graphic design, or creative collaboration.'
            }
          </p>

          {/* User Requested: Dedicated Always Available For Work Badge under Connect Me with Floating Animation & Extra Bright Green Glow */}
          <div className="mt-6 flex justify-center">
            <motion.div
              id="contact-availability-live-badge"
              animate={{
                y: [0, -10, 0],
                boxShadow: [
                  '0 0 28px rgba(34, 197, 94, 0.7), 0 0 50px rgba(6, 182, 212, 0.45)',
                  '0 0 65px rgba(34, 197, 94, 1), 0 0 95px rgba(6, 182, 212, 0.8)',
                  '0 0 28px rgba(34, 197, 94, 0.7), 0 0 50px rgba(6, 182, 212, 0.45)',
                ],
              }}
              transition={{
                repeat: Infinity,
                duration: 1.8,
                ease: 'easeInOut',
              }}
              className="inline-flex items-center gap-3 px-5 py-3.5 rounded-2xl border-2 border-emerald-400 bg-[#021811]/95 text-left shadow-2xl hover:scale-105 transition-all cursor-pointer"
            >
              <span className="relative flex h-4 w-4 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-95" />
                <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-400 shadow-[0_0_24px_#22c55e]" />
              </span>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
                    {lang === 'bn' ? 'সবসময় কাজ করার জন্য প্রস্তুত' : 'ALWAYS AVAILABLE FOR WORK'}
                  </span>
                  <Sparkles className="w-3.5 h-3.5 text-emerald-300 animate-spin shrink-0" style={{ animationDuration: '4s' }} />
                </div>
                <p className="text-[11px] text-emerald-200 mt-0.5 leading-tight font-medium">
                  {lang === 'bn'
                    ? 'সবসময় কাজের জন্য প্রস্তুত, যেকোনো কাজ করে দেওয়ার জন্য সদা সর্বদা প্রস্তুত।'
                    : 'Always ready to work, fully dedicated and always prepared to get any project done.'}
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* 4 Cards Grid exactly matching screenshot layout: 
            1. Email Address (with Copy button & Send Email link)
            2. WhatsApp / Phone (with Chat on WhatsApp button)
            3. Facebook (with Visit Facebook link)
            4. Instagram (with Visit Instagram link)
        */}
        {/* Contact Channel Cards: Clean, compact 3-column grid (2 rows on desktop, 2-col on mobile) with perfect alignment */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-4 max-w-4xl mx-auto mb-6 sm:mb-8">
          
          {/* Card 1: Direct Email */}
          <div className="p-3 sm:p-4 rounded-xl border flex flex-col justify-between transition-all bg-[#05141e] border-[#113146] hover:border-cyan-400 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] duration-300 group cursor-pointer min-h-[130px] sm:min-h-[145px]">
            <div>
              <div className="flex items-start justify-between gap-1 mb-1.5 sm:mb-2">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#082233] border border-[#134466] flex items-center justify-center text-cyan-400 shrink-0 group-hover:scale-105 group-hover:bg-cyan-500 group-hover:text-black transition-all shadow-sm">
                  <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <button
                  onClick={() => handleCopy(customization.email, 'email')}
                  className="px-1.5 py-0.5 rounded border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 text-[9px] sm:text-[10px] flex items-center gap-1 font-mono transition-all"
                  title="Copy email"
                >
                  {copiedType === 'email' ? <Check className="w-2.5 h-2.5 text-emerald-400" /> : <Copy className="w-2.5 h-2.5" />}
                  <span>{copiedType === 'email' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <div>
                <h4 className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-white group-hover:text-cyan-400 transition-colors">
                  DIRECT EMAIL
                </h4>
                <a href={`mailto:${customization.email}`} className="text-[9.5px] sm:text-[11px] font-mono text-cyan-400 hover:underline truncate block">
                  {customization.email}
                </a>
              </div>
            </div>

            <div className="mt-2 pt-2 border-t border-[#0e2a3c] flex items-center justify-between">
              <span className="text-[8.5px] sm:text-[10px] text-slate-500">Official</span>
              <a
                href={`mailto:${customization.email}`}
                className="text-[9.5px] sm:text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-0.5 hover:translate-x-0.5 transition-transform"
              >
                Send Email →
              </a>
            </div>
          </div>

          {/* Card 2: Direct Phone */}
          <div className="p-3 sm:p-4 rounded-xl border flex flex-col justify-between transition-all bg-[#05141e] border-[#113146] hover:border-emerald-400 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] duration-300 group cursor-pointer min-h-[130px] sm:min-h-[145px]">
            <div>
              <div className="flex items-start justify-between gap-1 mb-1.5 sm:mb-2">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#082233] border border-[#134466] flex items-center justify-center text-emerald-400 shrink-0 group-hover:scale-105 group-hover:bg-emerald-500 group-hover:text-black transition-all shadow-sm">
                  <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <button
                  onClick={() => handleCopy(customization.phone, 'phone')}
                  className="px-1.5 py-0.5 rounded border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 text-[9px] sm:text-[10px] flex items-center gap-1 font-mono transition-all"
                  title="Copy phone"
                >
                  {copiedType === 'phone' ? <Check className="w-2.5 h-2.5 text-emerald-400" /> : <Copy className="w-2.5 h-2.5" />}
                  <span>{copiedType === 'phone' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <div>
                <h4 className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-white group-hover:text-emerald-400 transition-colors">
                  DIRECT PHONE
                </h4>
                <a href={`tel:${customization.phone}`} className="text-[9.5px] sm:text-[11px] font-mono text-emerald-400 hover:underline truncate block">
                  {customization.phone}
                </a>
              </div>
            </div>

            <div className="mt-2 pt-2 border-t border-[#0e2a3c] flex items-center justify-between">
              <span className="text-[8.5px] sm:text-[10px] text-slate-500">Direct Call</span>
              <a
                href={`tel:${customization.phone}`}
                className="text-[9.5px] sm:text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-0.5 hover:translate-x-0.5 transition-transform"
              >
                Call Now →
              </a>
            </div>
          </div>

          {/* Card 3: WhatsApp */}
          <div className="p-3 sm:p-4 rounded-xl border flex flex-col justify-between transition-all bg-[#05141e] border-[#113146] hover:border-emerald-400 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] duration-300 group cursor-pointer min-h-[130px] sm:min-h-[145px]">
            <div>
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#082233] border border-[#134466] flex items-center justify-center text-emerald-400 mb-1.5 sm:mb-2 group-hover:scale-105 group-hover:bg-emerald-500 group-hover:text-black transition-all shadow-sm">
                <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
              <h4 className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-white group-hover:text-emerald-400 transition-colors">
                WhatsApp
              </h4>
              <p className="text-[9.5px] sm:text-[11px] text-slate-400 truncate font-mono">
                {customization.phone}
              </p>
            </div>

            <div className="mt-2 pt-2 border-t border-[#0e2a3c] flex items-center justify-between">
              <span className="text-[8.5px] sm:text-[10px] text-slate-500">Chat</span>
              <a
                href={`https://wa.me/88${customization.phone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[9.5px] sm:text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-0.5 hover:translate-x-0.5 transition-transform"
              >
                WhatsApp →
              </a>
            </div>
          </div>

          {/* Card 4: Facebook */}
          <div className="p-3 sm:p-4 rounded-xl border flex flex-col justify-between transition-all bg-[#05141e] border-[#113146] hover:border-blue-400 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] duration-300 group cursor-pointer min-h-[130px] sm:min-h-[145px]">
            <div>
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#082233] border border-[#134466] flex items-center justify-center text-blue-400 mb-1.5 sm:mb-2 group-hover:scale-105 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                <Facebook className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
              <h4 className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-white group-hover:text-blue-400 transition-colors">
                Facebook
              </h4>
              <p className="text-[9.5px] sm:text-[11px] text-slate-400 truncate">
                Osman Goni
              </p>
            </div>

            <div className="mt-2 pt-2 border-t border-[#0e2a3c] flex items-center justify-between">
              <span className="text-[8.5px] sm:text-[10px] text-slate-500">Profile</span>
              <a
                href={customization.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[9.5px] sm:text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-0.5 hover:translate-x-0.5 transition-transform"
              >
                Facebook →
              </a>
            </div>
          </div>

          {/* Card 5: YouTube */}
          <div className="p-3 sm:p-4 rounded-xl border flex flex-col justify-between transition-all bg-[#05141e] border-[#113146] hover:border-red-500 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(239,68,68,0.4)] duration-300 group cursor-pointer min-h-[130px] sm:min-h-[145px]">
            <div>
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#082233] border border-[#134466] flex items-center justify-center text-red-500 mb-1.5 sm:mb-2 group-hover:scale-105 group-hover:bg-red-600 group-hover:text-white transition-all shadow-sm">
                <Youtube className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
              <h4 className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-white group-hover:text-red-400 transition-colors">
                YouTube
              </h4>
              <p className="text-[9.5px] sm:text-[11px] text-slate-400 truncate font-mono">
                @GoniEditor
              </p>
            </div>

            <div className="mt-2 pt-2 border-t border-[#0e2a3c] flex items-center justify-between">
              <span className="text-[8.5px] sm:text-[10px] text-slate-500">Channel</span>
              <a
                href={customization.youtubeUrl || 'https://www.youtube.com/@GoniEditor'}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[9.5px] sm:text-xs font-semibold text-red-400 hover:text-red-300 flex items-center gap-0.5 hover:translate-x-0.5 transition-transform"
              >
                YouTube →
              </a>
            </div>
          </div>

          {/* Card 6: Instagram */}
          <div className="p-3 sm:p-4 rounded-xl border flex flex-col justify-between transition-all bg-[#05141e] border-[#113146] hover:border-pink-400 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(236,72,153,0.4)] duration-300 group cursor-pointer min-h-[130px] sm:min-h-[145px]">
            <div>
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#082233] border border-[#134466] flex items-center justify-center text-pink-400 mb-1.5 sm:mb-2 group-hover:scale-105 group-hover:bg-gradient-to-tr group-hover:from-amber-500 group-hover:via-pink-500 group-hover:to-purple-500 group-hover:text-white transition-all shadow-sm">
                <Instagram className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
              <h4 className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-white group-hover:text-pink-400 transition-colors">
                Instagram
              </h4>
              <p className="text-[9.5px] sm:text-[11px] text-slate-400 truncate">
                @mm.osmangoni
              </p>
            </div>

            <div className="mt-2 pt-2 border-t border-[#0e2a3c] flex items-center justify-between">
              <span className="text-[8.5px] sm:text-[10px] text-slate-500">Reels</span>
              <a
                href={customization.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[9.5px] sm:text-xs font-semibold text-pink-400 hover:text-pink-300 flex items-center gap-0.5 hover:translate-x-0.5 transition-transform"
              >
                Instagram →
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Location Box */}
        <div className="p-6 rounded-2xl border max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 bg-gradient-to-r from-[#061924] to-[#020c13] border-[#113146]">
          <div>
            <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block mb-1">
              CURRENT LOCATION & AVAILABILITY
            </span>
            <h4 className="text-base font-bold text-white">
              {lang === 'bn' ? customization.addressBn : customization.address}
            </h4>
            <p className="text-xs mt-1 text-slate-400">
              Available worldwide for remote video editing and graphic design collaborations.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 flex-shrink-0">
            <a
              href={customization.telegramUrl || `https://t.me/+88${customization.phone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-black font-bold text-xs flex items-center gap-1.5 shadow-md shadow-sky-500/30 hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Telegram</span>
            </a>

            <a
              href={`https://wa.me/88${customization.phone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-500/30 hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>

            <a
              href={`mailto:${customization.email}`}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 via-cyan-400 to-teal-400 text-black font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-400/60 hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Direct Email</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
