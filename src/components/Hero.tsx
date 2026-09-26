import React, { useState } from 'react';
import { Play, Send, Camera, Sparkles, Check, Facebook, Instagram, Youtube } from 'lucide-react';
import { motion } from 'motion/react';
import { PortfolioCustomization } from '../types';
import { compressImageFile } from '../utils/storage';
import { TypewriterRole } from './TypewriterRole';
import { SoftwareToolsMarquee } from './SoftwareToolsMarquee';

interface HeroProps {
  customization: PortfolioCustomization;
  onNavigate: (sectionId: string) => void;
  lang: 'bn' | 'en';
  onUpdateCustomization?: (updated: PortfolioCustomization) => void;
}

export const Hero: React.FC<HeroProps> = ({
  customization,
  onNavigate,
  lang,
  onUpdateCustomization,
}) => {
  const [uploadFeedback, setUploadFeedback] = useState<string | null>(null);
  const skillPills = ['Social Media', 'Graphic Design', 'Motion Design', 'Video Editing', 'Gen AI'];

  const handleDirectPhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const compressed = await compressImageFile(file, 1200, 0.88);
        const updatedCustomization: PortfolioCustomization = {
          ...customization,
          profileImage: compressed,
        };
        if (onUpdateCustomization) {
          onUpdateCustomization(updatedCustomization);
        }
        setUploadFeedback(lang === 'bn' ? 'ছবি সফলভাবে আপডেট হয়েছে!' : 'Photo updated successfully!');
        setTimeout(() => setUploadFeedback(null), 3000);
      } catch (err) {
        console.error('Image compression failed:', err);
      }
    }
  };

  return (
    <section id="hero" className="relative pt-20 pb-8 sm:pt-28 sm:pb-12 md:pt-36 md:pb-16 overflow-hidden bg-transparent">
      {/* Radial backlight glow behind the user portrait matching theme */}
      <div className="absolute top-1/3 right-1/4 w-[550px] h-[550px] bg-cyan-500/15 rounded-full blur-[150px] pointer-events-none -z-10 animate-pulse duration-1000" />
      <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] bg-teal-500/10 rounded-full blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* Left Hero Column: Typography exactly matching screenshot */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left z-10 w-full">
            
            {/* Mobile-Only Circular Profile Avatar AT THE VERY TOP matching Screenshot 3 */}
            <div className="lg:hidden mx-auto mb-3 sm:mb-4 relative flex flex-col items-center">
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1 bg-gradient-to-tr from-cyan-400 via-teal-300 to-cyan-500 shadow-[0_0_25px_rgba(6,182,212,0.55)]">
                <div className="w-full h-full rounded-full overflow-hidden bg-[#04121c] relative">
                  <img
                    src={customization.profileImage || 'https://i.postimg.cc/bYmS4LQT/0w-OVi.jpg'}
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.src.includes('0w-OVi.jpg')) {
                        target.src = 'https://i.postimg.cc/bYmS4LQT/0w-OVi.jpg';
                      }
                    }}
                    alt="Osman Goni"
                    className="w-full h-full object-cover object-top scale-105"
                  />
                </div>
                {/* Compact Camera Change Button */}
                <label
                  className="absolute bottom-0 right-0 p-1.5 rounded-full bg-[#03111b] text-cyan-300 border border-cyan-400 shadow-md cursor-pointer hover:bg-cyan-400 hover:text-black transition-colors"
                  title={lang === 'bn' ? 'ছবি পরিবর্তন' : 'Change photo'}
                >
                  <Camera className="w-3.5 h-3.5" />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleDirectPhotoUpload}
                  />
                </label>
              </div>
            </div>

            {/* Top Pill Badge matching screenshot: ✨ CREATIVE VISUALIZER | VIDEO EDITOR */}
            <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-[10px] sm:text-[11px] font-extrabold tracking-wider uppercase mb-2 sm:mb-4 border shadow-sm bg-[#061924] border-[#103b54] text-cyan-300">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>CREATIVE VISUALIZER &nbsp;|&nbsp; VIDEO EDITOR</span>
            </div>

            {/* Greeting directly below photo */}
            <p className="text-xs sm:text-base md:text-lg font-medium text-slate-300 tracking-wide mb-0.5 sm:mb-1">
              {lang === 'bn' ? 'আসসালামু আলাইকুম, I am' : 'Assalamu Alaikum, I am'}
            </p>

            {/* Main Name Heading: Osman (white) Goni (cyan gradient glow) */}
            <h1 className="text-3xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.05] sm:leading-[1] mb-2 sm:mb-3">
              <span className="text-white">Osman</span>{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-300 to-teal-300 drop-shadow-[0_0_25px_rgba(34,211,238,0.45)]">
                Goni
              </span>
            </h1>

            {/* Smooth Continuous Typewriter Text Animation: "I am " + video editing focus first, then graphics, then digital marketing */}
            <div className="mb-3 sm:mb-5">
              <TypewriterRole
                prefix="I am "
                strings={[
                  'a Video Editor & Visualizer',
                  'a Motion Graphics & UI Animator',
                  'a VFX & Cinematic Video Artist',
                  'an AI Video Creator & Editor',
                  'a Creative Graphic Designer',
                  'a Thumbnail & Brand Designer',
                  'a Meta Ads & Digital Marketer',
                ]}
                typingSpeed={65}
                deletingSpeed={32}
                pauseDuration={1800}
                pauseBeforeNext={450}
              />
            </div>

            {/* Skill tags row matching Screenshot 3 */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-1 sm:gap-2 mb-3 sm:mb-6">
              {skillPills.map((pill, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[9px] sm:text-xs font-semibold bg-[#051622] border border-[#113954] text-slate-300 hover:text-cyan-300 hover:border-cyan-400 transition-all cursor-default"
                >
                  {pill}
                </span>
              ))}
            </div>

            {/* Action Buttons (My Projects & Contact Me + Jumping Facebook & Instagram) */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3.5 mb-2.5 sm:mb-4 w-full sm:w-auto">
              <button
                id="hero-my-projects-btn"
                onClick={() => onNavigate('projects')}
                className="flex-1 sm:flex-initial group flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 py-2 sm:px-6 sm:py-3 rounded-full bg-cyan-400 hover:bg-cyan-300 text-black font-black text-xs sm:text-sm shadow-xl shadow-cyan-400/30 hover:shadow-cyan-400/60 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-black text-black" />
                <span>{lang === 'bn' ? 'মাই প্রজেক্টস' : 'My Projects'}</span>
              </button>

              <button
                id="hero-contact-me-btn"
                onClick={() => onNavigate('contact')}
                className="flex-1 sm:flex-initial group flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 py-2 sm:px-6 sm:py-3 rounded-full border font-bold text-xs sm:text-sm bg-[#04121c] hover:bg-[#072133] border-[#133d5c] hover:border-cyan-400 text-slate-200 hover:text-cyan-300 shadow-md hover:shadow-lg hover:shadow-cyan-500/25 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
              >
                <Send className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
                <span>{lang === 'bn' ? 'যোগাযোগ করুন' : 'Contact Me'}</span>
              </button>

              {/* Smooth Forward-Lifting Social Icons with Glowing Backlights: Facebook, Instagram, YouTube */}
              <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-blue-500 rounded-full blur-md opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300 pointer-events-none -z-10" />
                  <a
                    href={customization.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-[#164366] bg-[#04121c] flex items-center justify-center text-blue-400 hover:text-white hover:bg-blue-600 hover:border-blue-400 hover:scale-110 hover:-translate-y-1.5 hover:shadow-[0_0_24px_rgba(59,130,246,0.85)] transition-all duration-300 shadow-md"
                    title="Facebook Profile"
                  >
                    <Facebook className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
                  </a>
                </div>

                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-500 rounded-full blur-md opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300 pointer-events-none -z-10" />
                  <a
                    href={customization.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-[#164366] bg-[#04121c] flex items-center justify-center text-pink-400 hover:text-white hover:bg-gradient-to-tr hover:from-amber-500 hover:via-pink-500 hover:to-purple-500 hover:border-pink-400 hover:scale-110 hover:-translate-y-1.5 hover:shadow-[0_0_24px_rgba(236,72,153,0.85)] transition-all duration-300 shadow-md"
                    title="Instagram Profile"
                  >
                    <Instagram className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
                  </a>
                </div>

                <div className="relative group">
                  <div className="absolute -inset-1 bg-red-500 rounded-full blur-md opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300 pointer-events-none -z-10" />
                  <a
                    href={customization.youtubeUrl || 'https://www.youtube.com/@GoniEditor'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-[#164366] bg-[#04121c] flex items-center justify-center text-red-500 hover:text-white hover:bg-red-600 hover:border-red-400 hover:scale-110 hover:-translate-y-1.5 hover:shadow-[0_0_24px_rgba(239,68,68,0.85)] transition-all duration-300 shadow-md"
                    title={lang === 'bn' ? 'ইউটিউব চ্যানেল (@GoniEditor)' : 'YouTube Channel (@GoniEditor)'}
                  >
                    <Youtube className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
                  </a>
                </div>
              </div>
            </div>

            {/* High-Contrast, Glowing, Pulsing, Jumping Availability Badge Placed Directly Below Contact Me */}
            <div className="mb-4 sm:mb-8 w-full">
              <motion.div
                id="hero-availability-live-badge"
                animate={{
                  y: [0, -6, 0],
                  boxShadow: [
                    '0 0 20px rgba(34, 197, 94, 0.5), 0 0 35px rgba(6, 182, 212, 0.35)',
                    '0 0 45px rgba(34, 197, 94, 0.9), 0 0 65px rgba(6, 182, 212, 0.65)',
                    '0 0 20px rgba(34, 197, 94, 0.5), 0 0 35px rgba(6, 182, 212, 0.35)',
                  ],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.8,
                  ease: 'easeInOut',
                }}
                onClick={() => onNavigate('contact')}
                title={lang === 'bn' ? 'সরাসরি প্রজেক্টের জন্য যোগাযোগ করুন' : 'Direct booking open 24/7'}
                className="w-full sm:w-auto inline-flex items-center gap-2.5 px-3 py-2 sm:px-4 sm:py-3 rounded-xl sm:rounded-2xl border-2 border-emerald-400 bg-[#02130e]/95 shadow-2xl text-emerald-300 cursor-pointer hover:border-emerald-300 transition-all"
              >
                <span className="relative flex h-3.5 w-3.5 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-95" />
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400 shadow-[0_0_18px_#22c55e]" />
                </span>
                <div className="flex flex-col text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] sm:text-[12px] font-black uppercase tracking-wider text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
                      {lang === 'bn' ? 'সবসময় কাজ করার জন্য প্রস্তুত' : 'ALWAYS AVAILABLE FOR WORK'}
                    </span>
                    <Sparkles className="w-3 h-3 text-emerald-300 animate-spin shrink-0" style={{ animationDuration: '4s' }} />
                  </div>
                  <span className="text-[10px] sm:text-[11px] text-emerald-200 font-medium tracking-normal mt-0.5 line-clamp-1 sm:line-clamp-none">
                    {lang === 'bn'
                      ? 'সবসময় কাজের জন্য প্রস্তুত, যেকোনো কাজ করে দেওয়ার জন্য সদা সর্বদা প্রস্তুত।'
                      : 'Always ready to work, fully dedicated and always prepared to get any project done.'}
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Notification / Toast for Photo Upload */}
            {uploadFeedback && (
              <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-cyan-950/80 border border-cyan-400/60 text-cyan-300 text-xs font-semibold shadow-lg shadow-cyan-500/20">
                <Check className="w-3.5 h-3.5 text-cyan-400" />
                <span>{uploadFeedback}</span>
              </div>
            )}

            {/* Stats Bar matching Screenshot 3: 3 items in a neat grid on mobile */}
            <div className="w-full pt-4 sm:pt-6 border-t border-[#0d273a] grid grid-cols-3 gap-2 sm:gap-8 text-center sm:text-left">
              <div>
                <span className="text-lg sm:text-2xl font-black text-white block">
                  {customization.projectsCompleted || '150+'}
                </span>
                <span className="text-[9px] sm:text-[11px] text-slate-400 font-medium">
                  {lang === 'bn' ? 'সম্পন্ন প্রজেক্টস' : 'Creative Projects'}
                </span>
              </div>
              <div className="border-x border-[#0d273a] px-1 sm:border-x-0 sm:px-0">
                <span className="text-lg sm:text-2xl font-black text-cyan-400 block">
                  {lang === 'bn' ? '৩ মাস' : '3 Months'}
                </span>
                <span className="text-[9px] sm:text-[11px] text-slate-400 font-medium">
                  {lang === 'bn' ? 'অভিজ্ঞতা' : 'Experience'}
                </span>
              </div>
              <div>
                <span className="text-lg sm:text-2xl font-black text-teal-300 block">
                  {customization.viewsCount || '5M+'}
                </span>
                <span className="text-[9px] sm:text-[11px] text-slate-400 font-medium">
                  {lang === 'bn' ? 'টোটাল ভিউস' : 'Total Audience Views'}
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: User Portrait Photo for Desktop with previous glowing shape & hover light */}
          <div className="hidden lg:flex lg:col-span-5 justify-center lg:justify-end relative">
            <motion.div
              initial={{ x: 180, opacity: 0, scale: 0.96 }}
              whileInView={{ x: 0, opacity: 1, scale: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{
                type: 'spring',
                stiffness: 80,
                damping: 18,
                mass: 0.9,
              }}
              className="relative w-full max-w-sm sm:max-w-md"
            >
              
              {/* Backlight circular radiant cyan/teal glow behind photo */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-cyan-500/35 via-teal-400/25 to-sky-500/35 rounded-3xl blur-2xl opacity-75 group-hover:opacity-100 transition-opacity pointer-events-none" />
              
              {/* Modern Photo Frame Container - previous beautiful shape with hover light */}
              <div className="relative rounded-3xl p-3 border shadow-2xl bg-gradient-to-b from-[#0e2c40] via-[#051824] to-[#020a10] border-[#14486d] hover:border-cyan-400 hover:shadow-[0_0_35px_rgba(6,182,212,0.55)] transition-all duration-500 group">
                
                {/* Image Box with themed cyan backdrop */}
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-gradient-to-b from-[#083042] via-[#051824] to-[#02080d] border border-[#0f3b57]">
                  
                  {/* Subtle inner radial cyan glow - বাতি জ্বলা এফেক্ট (glows up on hover) */}
                  <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-48 h-48 bg-cyan-400/25 group-hover:bg-cyan-400/50 group-hover:scale-125 rounded-full blur-3xl transition-all duration-700 pointer-events-none z-0" />

                  <img
                    id="hero-osman-goni-portrait"
                    src={customization.profileImage || 'https://i.postimg.cc/bYmS4LQT/0w-OVi.jpg'}
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.src.includes('0w-OVi.jpg')) {
                        target.src = 'https://i.postimg.cc/bYmS4LQT/0w-OVi.jpg';
                      }
                    }}
                    alt="Osman Goni - Creative Visualizer & Video Editor"
                    referrerPolicy="no-referrer"
                    className="relative z-10 w-full h-full object-cover object-top hover:scale-[1.03] transition-transform duration-700 ease-out"
                  />

                  {/* Floating Upload / Change Photo direct trigger button */}
                  <div className="absolute top-3 right-3 z-30">
                    <label
                      title={lang === 'bn' ? 'ছবি পরিবর্তন / আসল ছবি আপলোড করুন' : 'Change or upload your original photo'}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#020b12]/85 hover:bg-cyan-400 hover:text-black text-cyan-300 text-[11px] font-bold border border-cyan-500/40 backdrop-blur-md shadow-lg cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95"
                    >
                      <Camera className="w-3.5 h-3.5" />
                      <span>{lang === 'bn' ? 'ছবি পরিবর্তন' : 'Change Photo'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleDirectPhotoUpload}
                      />
                    </label>
                  </div>

                  {/* Soft bottom gradient overlay for sleek finish */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020709]/85 via-transparent to-transparent pointer-events-none z-10" />

                  {/* Visualizer & Editor badge bar matching Screenshot 3 */}
                  <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-[#03111b]/95 backdrop-blur-md border border-[#13384f] z-20 shadow-lg flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-[#062133] border border-[#14496e] flex items-center justify-center text-cyan-400 text-xs">
                        ❖
                      </div>
                      <div>
                        <h3 className="text-xs font-extrabold text-white tracking-wide">
                          Visualizer & Editor
                        </h3>
                        <p className="text-[10px] text-slate-400 font-medium">
                          Dhaka, Bangladesh • Worldwide
                        </p>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                      PRO
                    </span>
                  </div>
                </div>

              </div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
