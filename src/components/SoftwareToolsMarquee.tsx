import React from 'react';
import { Cpu, Sparkles } from 'lucide-react';

interface SoftwareToolsMarqueeProps {
  lang?: 'bn' | 'en';
  className?: string;
  showHeading?: boolean;
}

export const SoftwareToolsMarquee: React.FC<SoftwareToolsMarqueeProps> = ({
  lang = 'bn',
  className = '',
  showHeading = true,
}) => {
  // Exactly 6 items in requested order (NO "Adobe" in displayed names):
  const tools = [
    {
      id: 'after-effects',
      name: 'After Effects',
      role: 'VFX & Motion Graphics',
      roleBn: 'ভিএফএক্স ও মোশন',
      badgeColor: 'border-[#9999ff]/50 bg-[#00005b]/40 text-[#b3b3ff]',
      glowColor: 'shadow-[0_0_20px_rgba(153,153,255,0.25)]',
      renderLogo: () => (
        <svg viewBox="0 0 48 48" className="w-7 h-7 sm:w-8 sm:h-8 shrink-0" fill="none">
          <rect width="48" height="48" rx="10" fill="#00005b" />
          <rect x="1.5" y="1.5" width="45" height="45" rx="8.5" stroke="#9999ff" strokeWidth="2.5" />
          <text
            x="50%"
            y="55%"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#9999ff"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontWeight="900"
            fontSize="21"
            letterSpacing="-0.5"
          >
            Ae
          </text>
        </svg>
      ),
    },
    {
      id: 'premiere-pro',
      name: 'Premiere Pro',
      role: 'Video Editing & Timeline',
      roleBn: 'ভিডিও এডিটিং প্রো',
      badgeColor: 'border-[#ea77ff]/50 bg-[#2b083a]/40 text-[#f5b3ff]',
      glowColor: 'shadow-[0_0_20px_rgba(234,119,255,0.25)]',
      renderLogo: () => (
        <svg viewBox="0 0 48 48" className="w-7 h-7 sm:w-8 sm:h-8 shrink-0" fill="none">
          <rect width="48" height="48" rx="10" fill="#00005b" />
          <rect x="1.5" y="1.5" width="45" height="45" rx="8.5" stroke="#ea77ff" strokeWidth="2.5" />
          <text
            x="50%"
            y="55%"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#ea77ff"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontWeight="900"
            fontSize="21"
            letterSpacing="-0.5"
          >
            Pr
          </text>
        </svg>
      ),
    },
    {
      id: 'photoshop',
      name: 'Photoshop',
      role: 'Thumbnail & Retouching',
      roleBn: 'থাম্বনেইল ও রিটাচ',
      badgeColor: 'border-[#31a8ff]/50 bg-[#001e36]/40 text-[#85cbff]',
      glowColor: 'shadow-[0_0_20px_rgba(49,168,255,0.25)]',
      renderLogo: () => (
        <svg viewBox="0 0 48 48" className="w-7 h-7 sm:w-8 sm:h-8 shrink-0" fill="none">
          <rect width="48" height="48" rx="10" fill="#001e36" />
          <rect x="1.5" y="1.5" width="45" height="45" rx="8.5" stroke="#31a8ff" strokeWidth="2.5" />
          <text
            x="50%"
            y="55%"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#31a8ff"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontWeight="900"
            fontSize="21"
            letterSpacing="-0.5"
          >
            Ps
          </text>
        </svg>
      ),
    },
    {
      id: 'illustrator',
      name: 'Illustrator',
      role: 'Vector & Brand Graphics',
      roleBn: 'ভেক্টর ও ব্র্যান্ড আর্ট',
      badgeColor: 'border-[#ff9a00]/50 bg-[#331100]/40 text-[#ffc570]',
      glowColor: 'shadow-[0_0_20px_rgba(255,154,0,0.25)]',
      renderLogo: () => (
        <svg viewBox="0 0 48 48" className="w-7 h-7 sm:w-8 sm:h-8 shrink-0" fill="none">
          <rect width="48" height="48" rx="10" fill="#330000" />
          <rect x="1.5" y="1.5" width="45" height="45" rx="8.5" stroke="#ff9a00" strokeWidth="2.5" />
          <text
            x="50%"
            y="55%"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#ff9a00"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontWeight="900"
            fontSize="21"
            letterSpacing="-0.5"
          >
            Ai
          </text>
        </svg>
      ),
    },
    {
      id: 'capcut',
      name: 'CapCut',
      role: 'Shorts, Reels & Fast Edits',
      roleBn: 'শর্টস ও রিলস এডিটিং',
      badgeColor: 'border-cyan-400/50 bg-[#02131c]/50 text-cyan-200',
      glowColor: 'shadow-[0_0_20px_rgba(6,182,212,0.25)]',
      renderLogo: () => (
        <svg viewBox="0 0 48 48" className="w-7 h-7 sm:w-8 sm:h-8 shrink-0" fill="none">
          <rect width="48" height="48" rx="10" fill="#03080d" />
          <rect x="1.5" y="1.5" width="45" height="45" rx="8.5" stroke="#22d3ee" strokeWidth="2" strokeOpacity="0.8" />
          {/* Official CapCut inward intersecting cutters */}
          <path d="M12 16L24 24L12 32H18L26.5 25.5V22.5L18 16H12Z" fill="#ffffff" />
          <path d="M36 16L24 24L36 32H30L21.5 25.5V22.5L30 16H36Z" fill="#22d3ee" />
        </svg>
      ),
    },
    {
      id: 'canva',
      name: 'Canva',
      role: 'Creative Layouts & Social',
      roleBn: 'সোশ্যাল ডিজাইন ও লেআউট',
      badgeColor: 'border-[#7d2ae8]/50 bg-[#16042b]/40 text-[#c79bf7]',
      glowColor: 'shadow-[0_0_20px_rgba(125,42,232,0.25)]',
      renderLogo: () => (
        <svg viewBox="0 0 48 48" className="w-7 h-7 sm:w-8 sm:h-8 shrink-0" fill="none">
          <defs>
            <linearGradient id="canva-card-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00c4cc" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#7d2ae8" />
            </linearGradient>
          </defs>
          <rect width="48" height="48" rx="10" fill="url(#canva-card-grad)" />
          {/* Canva clean C Emblem with spark */}
          <path
            d="M27.5 15.5c-4.2 0-7.2 2.9-7.2 7.5 0 5.2 3.8 9 9 9 3 0 5.4-1.3 6.5-2.4l-1.5-1.8c-.9.9-2.6 1.9-4.9 1.9-3.5 0-6.2-2.6-6.2-6.4 0-3.6 2.2-5.4 4.8-5.4 2.3 0 3.7 1.2 4.4 2.1l1.5-1.6c-1.1-1.4-3.2-3.1-6.4-3.1z"
            fill="#ffffff"
          />
          <circle cx="34" cy="18" r="2.2" fill="#ffffff" />
        </svg>
      ),
    },
  ];

  // We duplicate the list 4 times to ensure seamless infinite flow across wide screens
  const marqueeItems = [...tools, ...tools, ...tools, ...tools];

  return (
    <div
      id="software-tools-marquee-section"
      className={`w-full py-4 sm:py-6 overflow-hidden relative ${className}`}
    >
      {/* Section Header: A small, concise, and elegant heading labeled "Software & Tools" */}
      {showHeading && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-3 sm:mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-extrabold uppercase tracking-wider bg-[#061824] border border-[#103a54] text-cyan-300 shadow-sm">
              <Sparkles className="w-3 h-3 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
              <span>Software & Tools</span>
            </div>
            <span className="text-[11px] sm:text-xs text-slate-400 font-mono hidden sm:inline">
              {lang === 'bn' ? '• প্রফেশনাল ক্রিয়েটিভ স্যুট' : '• Professional Creative Suite'}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[10px] font-mono text-cyan-400/80 bg-cyan-950/40 px-2.5 py-0.5 rounded-full border border-cyan-800/40">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>{lang === 'bn' ? '৬টি মূল টুলস' : '6 Core Tools'}</span>
          </div>
        </div>
      )}

      {/* Marquee Track Container with Left and Right gradient fades */}
      <div className="relative w-full overflow-hidden">
        {/* Left Fade Overlay */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-r from-[#020709] via-[#020709]/80 to-transparent z-20" />

        {/* Right Fade Overlay */}
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-l from-[#020709] via-[#020709]/80 to-transparent z-20" />

        {/* Infinite Scrolling Track */}
        <div className="animate-marquee flex items-center gap-3 sm:gap-4 py-2">
          {marqueeItems.map((tool, idx) => (
            <div
              key={`${tool.id}-${idx}`}
              className={`flex items-center gap-3 px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-2xl border transition-all duration-300 bg-[#040e16]/90 border-[#0f2d42] hover:border-cyan-400 hover:scale-[1.03] active:scale-95 group cursor-pointer shrink-0 shadow-lg ${tool.glowColor}`}
            >
              {/* Official Brand Logo */}
              <div className="relative flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                {tool.renderLogo()}
              </div>

              {/* Exact Brand Name (No "Adobe") + Role */}
              <div className="flex flex-col text-left pr-1">
                <span className="text-xs sm:text-sm font-bold text-white group-hover:text-cyan-300 transition-colors whitespace-nowrap">
                  {tool.name}
                </span>
                <span className="text-[10px] text-slate-400 font-mono tracking-tight whitespace-nowrap group-hover:text-slate-300">
                  {lang === 'bn' ? tool.roleBn : tool.role}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
