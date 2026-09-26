import React, { useState } from 'react';
import { Download, Menu, X, Linkedin, LayoutDashboard, ShieldCheck } from 'lucide-react';
import { PortfolioCustomization } from '../types';
import { isAdminAuthenticated, getVerifiedAdminEmail, OWNER_EMAIL } from '../utils/storage';

interface NavbarProps {
  customization: PortfolioCustomization;
  onNavigate: (sectionId: string) => void;
  lang: 'bn' | 'en';
  onToggleLang: () => void;
  onDownloadCV: () => void;
  onOpenAdmin: () => void;
  onOpenEditModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  customization,
  onNavigate,
  lang,
  onToggleLang,
  onDownloadCV,
  onOpenAdmin,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isOwnerAuthed = isAdminAuthenticated() && getVerifiedAdminEmail() === OWNER_EMAIL;

  const navLinks = [
    { name: lang === 'bn' ? 'হোম' : 'Home', href: 'hero' },
    { name: lang === 'bn' ? 'মাই প্রজেক্টস' : 'My Projects', href: 'projects' },
    { name: lang === 'bn' ? 'দক্ষতা ও এক্সপার্টাইজ' : 'Core Expertise & Skills', href: 'skills' },
    { name: lang === 'bn' ? 'এডুকেশন' : 'Education', href: 'education' },
    { name: lang === 'bn' ? 'যোগাযোগ' : 'Contact', href: 'contact' },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    onNavigate(href);
  };

  return (
    <header
      id="main-navbar"
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-[#03070b]/90 backdrop-blur-md border-b border-[#0f2434] py-3.5 shadow-xl shadow-black/60"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo with User Profile Photo inside small circle */}
          <button
            id="brand-logo-btn"
            onClick={() => onNavigate('hero')}
            className="flex items-center gap-3 text-left group cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 via-teal-400 to-sky-400 p-[1.5px] flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-400/40 group-hover:scale-105 transition-all">
              <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center bg-[#040e16]">
                <img
                  src={customization.profileImage || 'https://i.postimg.cc/bYmS4LQT/0w-OVi.jpg'}
                  alt={customization.name}
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.src.includes('0w-OVi.jpg')) {
                      target.src = 'https://i.postimg.cc/bYmS4LQT/0w-OVi.jpg';
                    }
                  }}
                />
              </div>
            </div>
            <div>
              <span className="font-black text-sm sm:text-base tracking-wider block text-white group-hover:text-cyan-400 transition-colors">
                {lang === 'bn' ? customization.nameBn : customization.name}
              </span>
              <span className="text-[10px] sm:text-[11px] font-bold text-cyan-500 tracking-wider uppercase block -mt-0.5">
                VISUALIZER & VIDEO EDITOR
              </span>
            </div>
          </button>

          {/* Desktop Nav Items matching screenshot */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 rounded-full px-4 py-1.5 border backdrop-blur-md bg-[#06141f]/80 border-[#113146]">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleLinkClick(link.href)}
                className="text-xs font-semibold px-3 py-1.5 rounded-full transition-all duration-300 cursor-pointer text-slate-300 hover:text-cyan-300 hover:bg-cyan-500/15 hover:shadow-md hover:shadow-cyan-500/20 hover:scale-105 active:scale-95"
              >
                {link.name}
              </button>
            ))}

            {/* Download CV Nav item in the bar matching screenshot */}
            <button
              id="nav-download-cv-btn"
              onClick={onDownloadCV}
              className="text-xs font-semibold px-3 py-1.5 rounded-full transition-all duration-300 flex items-center gap-1.5 cursor-pointer text-cyan-400 hover:text-white hover:bg-cyan-500/20 hover:shadow-md hover:shadow-cyan-500/30 hover:scale-105 active:scale-95"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{lang === 'bn' ? 'সিভি ডাউনলোড' : 'Download CV'}</span>
            </button>

            {/* Admin Dashboard Nav item right next to Download CV */}
            <button
              id="nav-admin-dashboard-btn"
              onClick={onOpenAdmin}
              className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-all duration-300 flex items-center gap-1.5 cursor-pointer hover:scale-105 active:scale-95 ${
                isOwnerAuthed
                  ? 'bg-emerald-950/80 border border-emerald-500/60 text-emerald-300 shadow-md shadow-emerald-500/20'
                  : 'text-slate-300 hover:text-cyan-300 hover:bg-cyan-500/20 hover:shadow-md hover:shadow-cyan-500/25'
              }`}
              title={
                isOwnerAuthed
                  ? `ওনার ভেরিফাইড অ্যাডমিন (${OWNER_EMAIL})`
                  : (lang === 'bn' ? `অ্যাডমিন ড্যাশবোর্ড (শুধুমাত্র ${OWNER_EMAIL})` : `Admin Dashboard (${OWNER_EMAIL})`)
              }
            >
              {isOwnerAuthed ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{lang === 'bn' ? 'অ্যাডমিন ড্যাশবোর্ড' : 'Admin'}</span>
                </>
              ) : (
                <>
                  <LayoutDashboard className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{lang === 'bn' ? 'অ্যাডমিন ড্যাশবোর্ড' : 'Admin'}</span>
                </>
              )}
            </button>
          </nav>

          {/* Right Action Controls: LinkedIn, Lang, Edit Mode */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* LinkedIn Profile Quick Link */}
            <a
              id="nav-linkedin-link"
              href={customization.linkedInUrl || 'https://www.linkedin.com/in/osman-goni100'}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg border text-xs transition-all duration-300 bg-[#071d2b] border-[#14405d] text-[#0a66c2] hover:bg-[#0a66c2] hover:text-white hover:border-[#0a66c2] hover:scale-105 hover:shadow-md hover:shadow-[#0a66c2]/30 active:scale-95 cursor-pointer flex items-center justify-center"
              title="LinkedIn Profile (osman-goni100)"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            {/* Bengali/English Switcher */}
            <button
              id="lang-toggle-btn"
              onClick={onToggleLang}
              className="px-2.5 py-1 rounded-lg border text-xs font-mono font-bold transition-all duration-300 bg-[#071d2b] border-[#14405d] text-cyan-300 hover:bg-cyan-500/20 hover:border-cyan-400 hover:scale-105 hover:shadow-md hover:shadow-cyan-500/25 active:scale-95 cursor-pointer"
              title="Toggle Language"
            >
              {lang === 'bn' ? 'EN' : 'বাং'}
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex lg:hidden items-center gap-1.5">
            {/* LinkedIn Profile Quick Link on Mobile */}
            <a
              id="mobile-nav-linkedin-link"
              href={customization.linkedInUrl || 'https://www.linkedin.com/in/osman-goni100'}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg border text-xs bg-[#071d2b] border-[#14405d] text-[#0a66c2] hover:bg-[#0a66c2] hover:text-white transition-all flex items-center justify-center"
              title="LinkedIn Profile"
            >
              <Linkedin className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={onToggleLang}
              className="px-2 py-1 rounded-md border text-xs font-mono font-bold bg-[#071d2b] border-[#14405d] text-cyan-300 hover:scale-105 transition-transform"
            >
              {lang === 'bn' ? 'EN' : 'বাং'}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg border bg-[#06141e] border-[#143042] text-slate-200 hover:scale-105 transition-transform"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b px-4 pt-3 pb-6 mt-3 backdrop-blur-xl shadow-2xl bg-[#03090e]/95 border-[#122735]">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleLinkClick(link.href)}
                className="text-left px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 text-slate-200 hover:bg-cyan-500/15 hover:text-cyan-300 hover:translate-x-1"
              >
                {link.name}
              </button>
            ))}
            <div className="pt-3 border-t border-[#122735] flex flex-col gap-2">
              <a
                href={customization.linkedInUrl || 'https://www.linkedin.com/in/osman-goni100'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 bg-[#071d2b] border border-[#14405d] text-[#0a66c2] hover:bg-[#0a66c2] hover:text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all"
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn Profile</span>
              </a>
              <button
                onClick={onDownloadCV}
                className="w-full py-2.5 bg-gradient-to-r from-cyan-500 to-teal-400 text-[#020709] font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/30 hover:scale-[1.02] active:scale-95 transition-all"
              >
                <Download className="w-4 h-4" />
                <span>{lang === 'bn' ? 'সিভি ডাউনলোড করুন' : 'Download CV'}</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  isOwnerAuthed
                    ? 'bg-emerald-950/80 border border-emerald-500/60 text-emerald-300'
                    : 'bg-[#082233] border border-[#14486d] text-cyan-300 hover:text-white hover:bg-cyan-600/30'
                }`}
              >
                {isOwnerAuthed ? (
                  <>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>{lang === 'bn' ? 'অ্যাডমিন ড্যাশবোর্ড (ওনার এক্সেস)' : 'Admin Dashboard (Owner)'}</span>
                  </>
                ) : (
                  <>
                    <LayoutDashboard className="w-4 h-4 text-cyan-400" />
                    <span>{lang === 'bn' ? 'অ্যাডমিন ড্যাশবোর্ড' : 'Admin Dashboard'}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
