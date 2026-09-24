import React from 'react';
import { Video, Palette, Eye, FileText, Mic, Users, Sparkles } from 'lucide-react';
import { CORE_SKILLS } from '../data/portfolioData';
import { CoreSkillItem } from '../types';

interface CoreSkillsSectionProps {
  lang: 'bn' | 'en';
  themeMode?: 'dark' | 'light';
  skills?: CoreSkillItem[];
}

export const CoreSkillsSection: React.FC<CoreSkillsSectionProps> = ({ lang, skills }) => {
  const displaySkills = skills && skills.length > 0 ? skills : CORE_SKILLS;
  const getIcon = (icon: string) => {
    switch (icon) {
      case 'Video':
        return <Video className="w-5 h-5 text-cyan-400" />;
      case 'Palette':
        return <Palette className="w-5 h-5 text-cyan-400" />;
      case 'Eye':
        return <Eye className="w-5 h-5 text-cyan-400" />;
      case 'FileText':
        return <FileText className="w-5 h-5 text-cyan-400" />;
      case 'Mic':
        return <Mic className="w-5 h-5 text-cyan-400" />;
      case 'Users':
        return <Users className="w-5 h-5 text-cyan-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <section id="skills" className="py-8 sm:py-20 border-t relative bg-[#02070a]/55 backdrop-blur-[1px] border-[#0e2536]">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-20">
        
        {/* Pill & Title */}
        <div className="text-center max-w-2xl mx-auto mb-4 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[9px] sm:text-xs font-extrabold uppercase tracking-wider mb-1.5 border bg-[#071d2b] border-[#13425e] text-cyan-400">
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>CORE EXPERTISE & SKILLS</span>
          </div>

          <h2 className="text-xl sm:text-4xl md:text-5xl font-black tracking-tight text-white">
            Core Expertise & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300">Skills</span>
          </h2>
        </div>

        {/* 2-column Grid on Mobile and Desktop - compact & minimalist */}
        <div className="grid grid-cols-2 gap-2 sm:gap-5 max-w-5xl mx-auto">
          {displaySkills.map((skill) => (
            <div
              key={skill.id}
              id={`skill-card-${skill.id}`}
              className="p-2.5 sm:p-5 rounded-xl border transition-all duration-300 bg-[#04111a] border-[#0e2c40] hover:border-cyan-400/60 hover:shadow-lg group flex flex-col justify-between"
            >
              <div>
                {/* Header Icon in rounded cyan-accent box */}
                <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-lg bg-[#061e2e] border border-[#11405e] flex items-center justify-center mb-1.5 sm:mb-3 group-hover:scale-105 group-hover:border-cyan-400 transition-all duration-300">
                  {getIcon(skill.icon)}
                </div>

                <h3 className="text-[11px] sm:text-base font-extrabold uppercase tracking-wider text-white group-hover:text-cyan-400 transition-colors mb-0.5 sm:mb-1.5 line-clamp-1">
                  {lang === 'bn' ? skill.titleBn : skill.title}
                </h3>

                <p className="text-[9.5px] sm:text-xs md:text-sm leading-relaxed text-slate-400 line-clamp-2 sm:line-clamp-none">
                  {lang === 'bn' ? skill.descriptionBn : skill.description}
                </p>
              </div>

              {/* Minimal Tool Tags */}
              {skill.tools && skill.tools.length > 0 && (
                <div className="mt-2 sm:mt-4 pt-1.5 sm:pt-3 border-t border-[#0e2a3c] flex flex-wrap gap-1 sm:gap-1.5">
                  {skill.tools.map((tool, i) => (
                    <span
                      key={i}
                      className="px-1.5 py-0.2 sm:px-2.5 sm:py-0.5 rounded-full text-[8.5px] sm:text-[11px] font-medium bg-[#061824] text-cyan-300 border border-[#123e5a]"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
