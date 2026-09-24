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

        {/* 2 Big Column Layout matching screenshot 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 max-w-6xl mx-auto">
          
          {/* Column 1: Academic Background - 2 side-by-side compact cards on mobile */}
          <div className="lg:col-span-6 flex flex-col gap-3 sm:gap-5">
            <div className="flex items-center gap-2 mb-0.5 sm:mb-1">
              <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
              <h3 className="text-sm sm:text-lg font-bold text-white">
                {lang === 'bn' ? 'একাডেমিক ব্যাকগ্রাউন্ড' : 'Academic Background'}
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
              {/* Academic Card 1: At-Takhassus Fil Ifta */}
              <div className="p-3 sm:p-5 rounded-xl sm:rounded-2xl border transition-all duration-300 bg-[#04111a] border-[#0e2c40] hover:border-cyan-400/50 hover:shadow-lg flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-1.5 mb-2">
                    <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#061e2e] border border-[#11405e] flex items-center justify-center flex-shrink-0 text-cyan-400">
                      <Award className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
                    </div>
                    <span className="text-[9px] sm:text-xs font-mono font-bold text-cyan-300 px-1.5 py-0.5 sm:px-2.5 sm:py-0.5 rounded-full bg-[#071f2d] border border-[#134460]">
                      2026
                    </span>
                  </div>

                  <h4 className="text-xs sm:text-base font-extrabold text-white leading-tight mb-1">
                    {lang === 'bn' ? 'আত-তাখাসসুস ফিল ইফতা' : 'At-Takhassus Fil Ifta'}
                  </h4>
                  <p className="text-[9.5px] sm:text-xs text-slate-400 font-medium mb-1.5 sm:mb-2 line-clamp-1">
                    {lang === 'bn' ? 'উচ্চতর ফিকহ গবেষণা' : 'Higher Islamic Law'}
                  </p>

                  <p className="text-[9px] sm:text-xs leading-relaxed text-slate-400 line-clamp-3 sm:line-clamp-none">
                    {lang === 'bn'
                      ? 'ইসলামী ফিকহ শাস্ত্রের বিশ্লেষণ ও গবেষণা ভিত্তিক উচ্চতর ইসলামিক জুরিসপ্রুডেন্স ও ফতোয়া প্রদানের বিশেষায়িত ডিগ্রি।'
                      : 'Advanced post-graduate specialization in Islamic Jurisprudence, Fiqh analysis, and issuing legal verdicts (Ifta).'}
                  </p>
                </div>

                <div className="mt-2.5 sm:mt-4 pt-2 sm:pt-3 border-t border-[#0e2a3c] flex items-center justify-between text-[9px] sm:text-xs">
                  <span className="text-slate-400 font-mono">Status</span>
                  <span className="text-cyan-400 font-mono flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    {lang === 'bn' ? '২০২৬' : '2026'}
                  </span>
                </div>
              </div>

              {/* Academic Card 2: Dawra-e Hadith (Masters Equivalent) */}
              <div className="p-3 sm:p-5 rounded-xl sm:rounded-2xl border transition-all duration-300 bg-[#04111a] border-[#0e2c40] hover:border-cyan-400/50 hover:shadow-lg flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-1.5 mb-2">
                    <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#061e2e] border border-[#11405e] flex items-center justify-center flex-shrink-0 text-cyan-400">
                      <BookOpen className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
                    </div>
                    <span className="text-[9px] sm:text-xs font-mono font-bold text-cyan-300 px-1.5 py-0.5 sm:px-2.5 sm:py-0.5 rounded-full bg-[#071f2d] border border-[#134460]">
                      2025
                    </span>
                  </div>

                  <h4 className="text-xs sm:text-base font-extrabold text-white leading-tight mb-1">
                    {lang === 'bn' ? 'দাওরায়ে হাদিস' : 'Dawra-e Hadith'}
                  </h4>
                  <p className="text-[9.5px] sm:text-xs text-slate-400 font-medium mb-1.5 sm:mb-2 line-clamp-1">
                    {lang === 'bn' ? 'মাস্টার্স সমমান ডিগ্রি' : 'Masters Equivalent'}
                  </p>

                  <p className="text-[9px] sm:text-xs leading-relaxed text-slate-400 line-clamp-3 sm:line-clamp-none">
                    {lang === 'bn'
                      ? 'ইসলামিক স্টাডিজ, সিহাহ সিত্তাহ হাদিস সাহিত্য এবং আরবি ক্লাসিক্যাল পাণ্ডিত্যপূর্ণ শাস্ত্রে সর্বোচ্চ একাডেমিক ডিগ্রি।'
                      : 'Highest academic degree in Islamic Studies, Sihah Sitta Hadith literature, and comprehensive Arabic scholarly texts.'}
                  </p>
                </div>

                <div className="mt-2.5 sm:mt-4 pt-2 sm:pt-3 border-t border-[#0e2a3c] flex items-center justify-between text-[9px] sm:text-xs">
                  <span className="text-slate-400 font-mono">Status</span>
                  <span className="text-cyan-400 font-mono flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    {lang === 'bn' ? '২০২৫' : '2025'}
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Column 2: Professional Skill Development matching screenshot 1 */}
          <div className="lg:col-span-6 flex flex-col gap-3 sm:gap-4">
            <div className="flex items-center gap-2 mb-0.5 sm:mb-1">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
              <h3 className="text-sm sm:text-lg font-bold text-white">
                {lang === 'bn' ? 'প্রফেশনাল স্কিল ট্রেনিং' : 'Professional Skill Development'}
              </h3>
            </div>

            <div className="p-3.5 sm:p-6 rounded-xl sm:rounded-2xl border bg-[#04111a] border-[#0e2c40] flex-1 flex flex-col justify-between hover:border-cyan-400/50 hover:shadow-lg transition-all duration-300">
              <div>
                {/* Institution Badge matching screenshot */}
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-mono font-extrabold uppercase tracking-wider mb-2 sm:mb-3 border bg-[#061e2e] border-[#134466] text-cyan-400">
                  <Sparkles className="w-3 h-3" />
                  <span>SKILL TRAINING INSTITUTION</span>
                </div>

                {/* Institute Name */}
                <h4 className="text-sm sm:text-xl font-black text-white tracking-tight mb-2">
                  As-Sunnah Skill Development Institute
                </h4>

                {/* Sub Badges: SBMC Course & Batch 36 */}
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-3 sm:mb-5">
                  <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold bg-[#071f2d] border border-[#124260] text-cyan-300">
                    SBMC Course
                  </span>
                  <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold bg-[#071f2d] border border-[#124260] text-cyan-300 font-mono">
                    Batch 36
                  </span>
                </div>

                {/* Subhead: CORE COMPETENCIES ACQUIRED: */}
                <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider mb-2 sm:mb-3">
                  <Layers className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span>CORE COMPETENCIES ACQUIRED:</span>
                </div>

                {/* Competency Boxes Grid matching Screenshot 1 + User's Diploma in Dawah Addition */}
                <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-2 sm:mb-3">
                  
                  {/* Box 1: Video Editing */}
                  <div className="p-2 sm:p-3.5 rounded-lg sm:rounded-xl border bg-[#030d14] border-[#0d273a] hover:border-cyan-500/40 transition-colors">
                    <div className="flex items-center gap-1 sm:gap-2 text-white font-extrabold text-[11px] sm:text-xs mb-0.5 sm:mb-1">
                      <CheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-cyan-400 flex-shrink-0" />
                      <span>Video Editing</span>
                    </div>
                    <p className="text-[9.5px] sm:text-[11px] text-slate-400 ml-4 sm:ml-5.5">
                      Premiere Pro & After Effects
                    </p>
                  </div>

                  {/* Box 2: Graphic Design */}
                  <div className="p-2 sm:p-3.5 rounded-lg sm:rounded-xl border bg-[#030d14] border-[#0d273a] hover:border-cyan-500/40 transition-colors">
                    <div className="flex items-center gap-1 sm:gap-2 text-white font-extrabold text-[11px] sm:text-xs mb-0.5 sm:mb-1">
                      <CheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-cyan-400 flex-shrink-0" />
                      <span>Graphic Design</span>
                    </div>
                    <p className="text-[9.5px] sm:text-[11px] text-slate-400 ml-4 sm:ml-5.5">
                      Photoshop & Illustrator
                    </p>
                  </div>

                  {/* Box 3: Meta Marketing */}
                  <div className="p-2 sm:p-3.5 rounded-lg sm:rounded-xl border bg-[#030d14] border-[#0d273a] hover:border-cyan-500/40 transition-colors">
                    <div className="flex items-center gap-1 sm:gap-2 text-white font-extrabold text-[11px] sm:text-xs mb-0.5 sm:mb-1">
                      <CheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-cyan-400 flex-shrink-0" />
                      <span>Meta Marketing</span>
                    </div>
                    <p className="text-[9.5px] sm:text-[11px] text-slate-400 ml-4 sm:ml-5.5">
                      FB & IG Ads Strategy
                    </p>
                  </div>

                  {/* Box 4: Generative AI Tools */}
                  <div className="p-2 sm:p-3.5 rounded-lg sm:rounded-xl border bg-[#030d14] border-[#0d273a] hover:border-cyan-500/40 transition-colors">
                    <div className="flex items-center gap-1 sm:gap-2 text-white font-extrabold text-[11px] sm:text-xs mb-0.5 sm:mb-1">
                      <CheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-cyan-400 flex-shrink-0" />
                      <span>Generative AI</span>
                    </div>
                    <p className="text-[9.5px] sm:text-[11px] text-slate-400 ml-4 sm:ml-5.5">
                      Prompt Engineering & Visuals
                    </p>
                  </div>

                  {/* Box 5: User Explicit Addition - Diploma in Dawah */}
                  <div className="col-span-2 p-2 sm:p-3.5 rounded-lg sm:rounded-xl border bg-[#030d14] border-[#0d273a] hover:border-cyan-500/40 transition-colors">
                    <div className="flex items-center gap-1 sm:gap-2 text-white font-extrabold text-[11px] sm:text-xs mb-0.5 sm:mb-1">
                      <CheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-cyan-400 flex-shrink-0" />
                      <span>{lang === 'bn' ? 'ডিপ্লোমা ইন দাওয়াহ' : 'Diploma in Dawah'}</span>
                      <span className="ml-auto text-[9px] sm:text-[10px] font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-800/60 px-1.5 py-0.2 sm:px-2 sm:py-0.5 rounded-full">
                        As-Sunnah Certified
                      </span>
                    </div>
                    <p className="text-[9.5px] sm:text-[11px] text-slate-400 ml-4 sm:ml-5.5">
                      {lang === 'bn' 
                        ? 'দাওয়া মেথডলজি, পাবলিক কমিউনিকেশন ও এথিক্যাল মিডিয়া আউটরিচ।' 
                        : 'Dawah Methodology, Public Communication & Ethical Media Outreach.'
                      }
                    </p>
                  </div>

                </div>
              </div>

              {/* Bottom footer bar matching screenshot 1 */}
              <div className="mt-3 sm:mt-5 pt-2 sm:pt-3.5 border-t border-[#0e2a3c] flex items-center justify-between text-[10px] sm:text-xs">
                <span className="text-slate-300 flex items-center gap-1 font-medium text-[10px] sm:text-[11px]">
                  <Wrench className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-cyan-400" />
                  <span>Real Project Execution</span>
                </span>
                
                <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-bold bg-cyan-400 text-black shadow-md">
                  Industry Ready
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
