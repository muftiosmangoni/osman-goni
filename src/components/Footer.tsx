import React from 'react';
import { Mail, Phone, Instagram, Facebook, Linkedin, Download, Send, ArrowUp } from 'lucide-react';
import { PortfolioCustomization } from '../types';

interface FooterProps {
  customization: PortfolioCustomization;
  lang: 'bn' | 'en';
  onDownloadCV: () => void;
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  customization,
  lang,
  onDownloadCV,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="main-footer"
      className="border-t py-12 transition-colors bg-[#020508]/60 backdrop-blur-[1px] border-[#0e2536] text-slate-400 relative z-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top footer row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-[#0f2434]">
          
          {/* Brand & Designation */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2.5 mb-1">
              <span className="text-base font-black tracking-wider text-white">
                {lang === 'bn' ? customization.nameBn : customization.name}
              </span>
              <span className="text-[10px] font-mono font-bold text-cyan-400 bg-[#082233] px-2 py-0.5 rounded-full border border-[#144260]">
                EDITOR & VISUALIZER
              </span>
            </div>
            <p className="text-xs text-slate-500 max-w-md">
              {lang === 'bn'
                ? (customization.footerBioBn || 'ক্রিয়েটিভ ভিডিও এডিটিং ও ভিজ্যুয়াল স্টোরিটেলিং পোর্টফোলিও')
                : (customization.footerBioEn || 'Creative Video Editing & Visual Storytelling Portfolio')
              }
            </p>
          </div>

          {/* Contact Details in Footer: Phone, WhatsApp, Telegram, Email, CV */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs">
            <a
              href={`tel:${customization.phone}`}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#071926] border border-[#11354e] text-emerald-400 hover:text-white font-mono transition-all duration-300 hover:scale-105 hover:border-emerald-400 hover:shadow-md hover:shadow-emerald-500/20 active:scale-95"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>{customization.phone}</span>
            </a>

            {/* Telegram direct contact link */}
            <a
              href={customization.telegramUrl || `https://t.me/+88${customization.phone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#071d2b] border border-[#133e5c] text-sky-400 hover:text-white font-mono transition-all duration-300 hover:scale-105 hover:border-sky-400 hover:shadow-md hover:shadow-sky-500/20 active:scale-95"
            >
              <Send className="w-3.5 h-3.5 text-sky-400" />
              <span>Telegram</span>
            </a>

            <a
              href={`mailto:${customization.email}`}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#071926] border border-[#11354e] text-cyan-400 hover:text-white font-mono transition-all duration-300 hover:scale-105 hover:border-cyan-400 hover:shadow-md hover:shadow-cyan-500/20 active:scale-95"
            >
              <Mail className="w-3.5 h-3.5 text-cyan-400" />
              <span>{customization.email}</span>
            </a>

            <button
              onClick={onDownloadCV}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-teal-400 text-black font-bold hover:shadow-xl hover:shadow-cyan-400/40 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{lang === 'bn' ? 'সিভি ডাউনলোড' : 'Download CV'}</span>
            </button>
          </div>

          {/* Social Links including Telegram, LinkedIn, Facebook, Instagram */}
          <div className="flex items-center gap-2.5">
            <a
              href={customization.linkedInUrl || 'https://www.linkedin.com/in/osman-goni100'}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg bg-[#071d2b] border border-[#14405d] flex items-center justify-center text-[#0a66c2] hover:bg-[#0a66c2] hover:text-white hover:scale-110 hover:shadow-lg hover:shadow-[#0a66c2]/35 transition-all duration-300"
              title="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={customization.telegramUrl || `https://t.me/+88${customization.phone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg bg-[#071d2b] border border-[#14405d] flex items-center justify-center text-sky-400 hover:bg-sky-400 hover:text-black hover:scale-110 hover:shadow-lg hover:shadow-sky-400/30 transition-all duration-300"
              title="Telegram (01410401898)"
            >
              <Send className="w-4 h-4" />
            </a>
            <a
              href={customization.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg bg-[#071d2b] border border-[#14405d] flex items-center justify-center text-blue-400 hover:bg-cyan-500 hover:text-black hover:scale-110 hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300"
              title="Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href={customization.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg bg-[#071d2b] border border-[#14405d] flex items-center justify-center text-pink-400 hover:bg-cyan-500 hover:text-black hover:scale-110 hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300"
              title="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <button
              onClick={scrollToTop}
              className="w-8 h-8 rounded-lg bg-[#071d2b] border border-[#14405d] flex items-center justify-center text-cyan-400 hover:bg-cyan-500 hover:text-black hover:scale-110 hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 cursor-pointer"
              title="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Bottom copyright row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-3">
          <p>{customization.copyrightNotice || `© ${new Date().getFullYear()} ${customization.name}. All rights reserved.`}</p>
          <div className="flex items-center gap-2">
            <span>Built with precision for High-Impact Visuals</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
