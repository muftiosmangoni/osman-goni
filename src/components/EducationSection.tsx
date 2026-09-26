import React from 'react';
import { BookOpen, Award, CheckCircle, GraduationCap, Sparkles, Layers, ShieldCheck, Wrench } from 'lucide-react';

interface EducationSectionProps {
  lang: 'bn' | 'en';
  themeMode?: 'dark' | 'light';
}

export const EducationSection: React.FC<EducationSectionProps> = ({ lang }) => {
  return (
    <section id="education" className="py-10 sm:py-20 border-t relative bg-[#020709]/55 backdrop-blur-[1px] border-[#0e2536]">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-20">
        
        {/* Pill & Title matching screenshot: 
            🎓 EDUCATION & PROFESSIONAL TRAINING
            My Education & Creative Learning
        */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-xs font-extrabold uppercase tracking-wider mb-2 border bg-[#061e2e] border-[#13425e] text-cyan-400">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>EDUCATION & PROFESSIONAL TRAINING</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-white">
            My Education & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-200">Creative Learning</span>
          </h2>
        </div>

        {/* 3 Balanced Cards Grid in 1 Unified Row on Large Screen: Dawra, Ifta, As-Sunnah */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
          
          {/* Card 1: Dawra-e Hadith (Foundation Degree - 2025) */}
          <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl border transition-all duration-300 bg-[#04111a] border-[#0e2c40] hover:border-cyan-400 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(6,182,212,0.35)] flex flex-col justify-between group">
            <div>
              <div className="flex items-start justify-between gap-1.5 mb-2.5">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#061e2e] border border-[#11405e] flex items-center justify-center flex-shrink-0 text-cyan-400 group-hover:scale-105 group-hover:bg-cyan-500 group-hover:text-black transition-all">
                  <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <span className="text-[10px] sm:text-xs font-mono font-bold text-cyan-300 px-2 py-0.5 rounded-full bg-[#071f2d] border border-[#134460]">
                  2025
                </span>
              </div>

              <div className="inline-flex items-center gap-1 text-[9.5px] font-mono text-cyan-400 uppercase tracking-wider mb-1">
                <GraduationCap className="w-3 h-3" />
                <span>{lang === 'bn' ? 'একাডেমিক ভিত্তি' : 'Academic Degree'}</span>
              </div>

              <h4 className="text-sm sm:text-base font-extrabold text-white leading-tight mb-1 group-hover:text-cyan-400 transition-colors">
                {lang === 'bn' ? 'দাওরায়ে হাদিস' : 'Dawra-e Hadith'}
              </h4>
              <p className="text-[10px] sm:text-xs text-slate-300 font-medium mb-2">
                {lang === 'bn' ? 'মাস্টার্স সমমান ইসলামিক স্টাডিজ' : 'Masters Equivalent Degree'}
              </p>

              <p className="text-[9.5px] sm:text-xs leading-relaxed text-slate-400">
                {lang === 'bn'
                  ? 'ইসলামিক স্টাডিজ, সিহাহ সিত্তাহ হাদিস সাহিত্য এবং আরবি ক্লাসিক্যাল পাণ্ডিত্যপূর্ণ শাস্ত্রে সর্বোচ্চ একাডেমিক ডিগ্রি ও সনদ অর্জন।'
                  : 'Highest academic qualification in Islamic Studies, Sihah Sitta Hadith literature, and classical scholarly texts.'}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-[#0e2a3c] flex items-center justify-between text-[10px] sm:text-xs">
              <span className="text-slate-400 font-mono">Status</span>
              <span className="text-emerald-400 font-mono flex items-center gap-1 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {lang === 'bn' ? 'সমাপ্ত / ২০২৫' : 'Completed 2025'}
              </span>
            </div>
          </div>

          {/* Card 2: At-Takhassus Fil Ifta (Higher Research - 2026) */}
          <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl border transition-all duration-300 bg-[#04111a] border-[#0e2c40] hover:border-cyan-400 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(6,182,212,0.35)] flex flex-col justify-between group">
            <div>
              <div className="flex items-start justify-between gap-1.5 mb-2.5">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#061e2e] border border-[#11405e] flex items-center justify-center flex-shrink-0 text-cyan-400 group-hover:scale-105 group-hover:bg-cyan-500 group-hover:text-black transition-all">
                  <Award className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <span className="text-[10px] sm:text-xs font-mono font-bold text-cyan-300 px-2 py-0.5 rounded-full bg-[#071f2d] border border-[#134460]">
                  2026
                </span>
              </div>

              <div className="inline-flex items-center gap-1 text-[9.5px] font-mono text-cyan-400 uppercase tracking-wider mb-1">
                <Award className="w-3 h-3" />
                <span>{lang === 'bn' ? 'উচ্চতর গবেষণা' : 'Higher Specialization'}</span>
              </div>

              <h4 className="text-sm sm:text-base font-extrabold text-white leading-tight mb-1 group-hover:text-cyan-400 transition-colors">
                {lang === 'bn' ? 'আত-তাখাসসুস ফিল ইফতা' : 'At-Takhassus Fil Ifta'}
              </h4>
              <p className="text-[10px] sm:text-xs text-slate-300 font-medium mb-2">
                {lang === 'bn' ? 'উচ্চতর ফিকহ ও ফতোয়া গবেষণা' : 'Postgraduate Islamic Jurisprudence'}
              </p>

              <p className="text-[9.5px] sm:text-xs leading-relaxed text-slate-400">
                {lang === 'bn'
                  ? 'ইসলামী ফিকহ শাস্ত্রের বিশ্লেষণ, আধুনিক গবেষণা ভিত্তিক জুরিসপ্রুডেন্স ও শাস্ত্রীয় ফতোয়া প্রদানের বিশেষায়িত উচ্চতর ডিগ্রি।'
                  : 'Postgraduate research in Islamic Jurisprudence, complex Fiqh rulings, and research-oriented verdict issuance (Ifta).'}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-[#0e2a3c] flex items-center justify-between text-[10px] sm:text-xs">
              <span className="text-slate-400 font-mono">Status</span>
              <span className="text-cyan-400 font-mono flex items-center gap-1 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                {lang === 'bn' ? 'চলমান / ২০২৬' : 'Ongoing / 2026'}
              </span>
            </div>
          </div>

          {/* Card 3: As-Sunnah Skill Development Institute (Balanced compact card) */}
          <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl border transition-all duration-300 bg-[#04111a] border-[#0e2c40] hover:border-cyan-400 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(6,182,212,0.35)] flex flex-col justify-between group col-span-1 md:col-span-2 lg:col-span-1">
            <div>
              <div className="flex items-start justify-between gap-1.5 mb-2.5">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#061e2e] border border-[#11405e] flex items-center justify-center flex-shrink-0 text-cyan-400 group-hover:scale-105 group-hover:bg-cyan-500 group-hover:text-black transition-all">
                  <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-[10px] sm:text-xs font-mono font-bold text-cyan-300 px-2 py-0.5 rounded-full bg-[#071f2d] border border-[#134460]">
                    Batch 36
                  </span>
                </div>
              </div>

              <div className="inline-flex items-center gap-1 text-[9.5px] font-mono text-cyan-400 uppercase tracking-wider mb-1">
                <Sparkles className="w-3 h-3" />
                <span>{lang === 'bn' ? 'প্রফেশনাল স্কিল' : 'Professional Training'}</span>
              </div>

              <h4 className="text-sm sm:text-base font-extrabold text-white leading-tight mb-1 group-hover:text-cyan-400 transition-colors">
                As-Sunnah Skill Development
              </h4>
              <p className="text-[10px] sm:text-xs text-slate-300 font-medium mb-2.5">
                SBMC Course & Dawah Skills
              </p>

              {/* Compact Competencies Tags */}
              <div className="grid grid-cols-2 gap-1.5 mb-2">
                <div className="px-2 py-1 rounded-md bg-[#030d14] border border-[#0d273a] flex items-center gap-1 text-[9px] sm:text-[10px] text-slate-200">
                  <CheckCircle className="w-3 h-3 text-cyan-400 shrink-0" />
                  <span className="truncate">Video Editing</span>
                </div>
                <div className="px-2 py-1 rounded-md bg-[#030d14] border border-[#0d273a] flex items-center gap-1 text-[9px] sm:text-[10px] text-slate-200">
                  <CheckCircle className="w-3 h-3 text-cyan-400 shrink-0" />
                  <span className="truncate">Graphic Design</span>
                </div>
                <div className="px-2 py-1 rounded-md bg-[#030d14] border border-[#0d273a] flex items-center gap-1 text-[9px] sm:text-[10px] text-slate-200">
                  <CheckCircle className="w-3 h-3 text-cyan-400 shrink-0" />
                  <span className="truncate">Meta Ads / Mktg</span>
                </div>
                <div className="px-2 py-1 rounded-md bg-[#030d14] border border-[#0d273a] flex items-center gap-1 text-[9px] sm:text-[10px] text-slate-200">
                  <CheckCircle className="w-3 h-3 text-cyan-400 shrink-0" />
                  <span className="truncate">Generative AI</span>
                </div>
              </div>

              <div className="px-2 py-1 rounded-md bg-[#030d14] border border-[#0d273a] flex items-center justify-between text-[9px] sm:text-[10px] text-slate-200">
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-3 h-3 text-teal-400 shrink-0" />
                  <span>{lang === 'bn' ? 'ডিপ্লোমা ইন দাওয়াহ' : 'Diploma in Dawah'}</span>
                </span>
                <span className="text-[8.5px] font-mono text-cyan-400">Certified</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#0e2a3c] flex items-center justify-between text-[10px] sm:text-xs">
              <span className="text-slate-400 font-mono">Real Project</span>
              <span className="px-2 py-0.5 rounded-full text-[9.5px] sm:text-[10px] font-bold bg-cyan-400 text-black">
                Industry Ready
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
