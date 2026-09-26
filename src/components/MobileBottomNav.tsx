import React, { useState, useEffect } from 'react';
import { Home, Briefcase, Award, GraduationCap, PhoneCall } from 'lucide-react';

interface MobileBottomNavProps {
  lang: 'bn' | 'en';
  onNavigate: (sectionId: string) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ lang, onNavigate }) => {
  const [activeSection, setActiveSection] = useState<string>('hero');

  const navItems = [
    {
      id: 'hero',
      labelBn: 'হোম',
      labelEn: 'Home',
      icon: Home,
    },
    {
      id: 'projects',
      labelBn: 'মাই প্রজেক্ট',
      labelEn: 'Projects',
      icon: Briefcase,
    },
    {
      id: 'skills',
      labelBn: 'কোর স্কিল',
      labelEn: 'Skills',
      icon: Award,
    },
    {
      id: 'education',
      labelBn: 'এডুকেশন',
      labelEn: 'Education',
      icon: GraduationCap,
    },
    {
      id: 'contact',
      labelBn: 'যোগাযোগ',
      labelEn: 'Contact',
      icon: PhoneCall,
    },
  ];

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      const sections = ['contact', 'education', 'skills', 'projects', 'hero'];

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          if (scrollPos >= top) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (id: string) => {
    setActiveSection(id);
    onNavigate(id);
  };

  return (
    <nav
      id="mobile-bottom-navigation-bar"
      aria-label="Mobile Navigation"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#02080d]/95 backdrop-blur-xl border-t border-[#113146] px-2 py-1.5 shadow-[0_-8px_30px_rgba(0,0,0,0.8)] pb-[calc(0.4rem+env(safe-area-inset-bottom,0px))]"
    >
      <div className="max-w-md mx-auto flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleClick(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all duration-300 relative group cursor-pointer ${
                isActive
                  ? 'text-cyan-400 font-bold scale-105'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {/* Active Glow Pill */}
              {isActive && (
                <span className="absolute -top-1.5 w-6 h-1 rounded-full bg-gradient-to-r from-cyan-400 to-teal-400 shadow-[0_0_8px_#22d3ee]" />
              )}

              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.35)]'
                    : 'group-hover:bg-[#071c2b]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
              </div>

              <span className="text-[10px] mt-0.5 tracking-tight font-sans">
                {lang === 'bn' ? item.labelBn : item.labelEn}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
