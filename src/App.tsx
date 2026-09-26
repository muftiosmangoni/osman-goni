import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MyProjectsSection } from './components/MyProjectsSection';
import { CoreSkillsSection } from './components/CoreSkillsSection';
import { EducationSection } from './components/EducationSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AdminPanel } from './components/AdminPanel';
import { MobileBottomNav } from './components/MobileBottomNav';
import { SoftwareToolsMarquee } from './components/SoftwareToolsMarquee';
import { DEFAULT_CUSTOMIZATION, VIDEO_PROJECTS, DESIGN_PROJECTS, ACADEMIC_EDUCATION, SKILL_TRAINING, CORE_SKILLS } from './data/portfolioData';
import { PortfolioCustomization } from './types';
import { loadCustomization, saveCustomization } from './utils/storage';

export function App() {
  const [lang, setLang] = useState<'bn' | 'en'>('en');
  
  // Route state: true if URL is /admin, #admin, or ?admin
  const [isAdminRoute, setIsAdminRoute] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    const search = window.location.search.toLowerCase();
    return (
      path === '/admin' ||
      path.startsWith('/admin/') ||
      hash === '#admin' ||
      hash.startsWith('#admin/') ||
      search.includes('admin')
    );
  });

  // Listen to navigation events (e.g. typing /admin, clicking back/forward, hash changes)
  useEffect(() => {
    const handleRouteChange = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      const search = window.location.search.toLowerCase();
      const admin =
        path === '/admin' ||
        path.startsWith('/admin/') ||
        hash === '#admin' ||
        hash.startsWith('#admin/') ||
        search.includes('admin');
      setIsAdminRoute(admin);
    };

    window.addEventListener('popstate', handleRouteChange);
    window.addEventListener('hashchange', handleRouteChange);
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      window.removeEventListener('hashchange', handleRouteChange);
    };
  }, []);

  // Customization state with safe IndexedDB persistence
  const [customization, setCustomization] = useState<PortfolioCustomization>(() => ({
    ...DEFAULT_CUSTOMIZATION,
    videoProjects: VIDEO_PROJECTS,
    designProjects: DESIGN_PROJECTS,
    academicEducation: ACADEMIC_EDUCATION,
    skillTraining: SKILL_TRAINING,
    coreSkills: CORE_SKILLS,
    themeMode: 'dark',
    yearsExperience: '3 Months',
    videoSliderInterval: 3,
    designSliderInterval: 2,
  }));

  // Asynchronous load from IndexedDB on startup
  useEffect(() => {
    let isMounted = true;
    loadCustomization().then((loaded) => {
      if (isMounted && loaded) {
        setCustomization(loaded);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  // Rising portrait state: activates strictly when user arrives at My Projects,
  // stays visible throughout projects, video editing, graphics, and beyond,
  // and vanishes cleanly when returning up to Home.
  const [showProjectPortrait, setShowProjectPortrait] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const projectsEl = document.getElementById('projects');
      if (projectsEl) {
        const rect = projectsEl.getBoundingClientRect();
        // Activate strictly when user enters My Projects section,
        // and fade out cleanly before returning to Software Tools / Home
        if (rect.top <= 140 && window.scrollY > 280) {
          setShowProjectPortrait(true);
        } else {
          setShowProjectPortrait(false);
        }
      } else {
        setShowProjectPortrait(window.scrollY > 350);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSaveCustomization = async (updated: PortfolioCustomization) => {
    const forcedDark: PortfolioCustomization = { ...updated, themeMode: 'dark' as const };
    setCustomization(forcedDark);
    await saveCustomization(forcedDark);
  };

  const handleOpenAdmin = () => {
    window.history.pushState(null, '', '/admin');
    setIsAdminRoute(true);
  };

  const handleExitAdmin = () => {
    window.history.pushState(null, '', '/');
    setIsAdminRoute(false);
  };

  const handleToggleLang = () => {
    setLang((prev) => (prev === 'bn' ? 'en' : 'bn'));
  };

  const handleNavigate = (sectionId: string) => {
    if (sectionId === 'hero' || sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDownloadCV = () => {
    const cvContent = `
=====================================================
OSMAN GONI - CURRICULUM VITAE
Creative Visualizer & Professional Video Editor
=====================================================

Contact Information:
- Phone / WhatsApp: ${customization.phone}
- Email: ${customization.email}
- Location: ${customization.address}
- LinkedIn: ${customization.linkedInUrl || 'https://www.linkedin.com/in/osman-goni100'}
- Facebook: ${customization.facebookUrl}
- Instagram: ${customization.instagramUrl}

Professional Summary:
Dynamic Creative Visualizer and Video Editor with deep expertise in narrative pacing, commercial promos, social-media viral reels, and high-CTR graphic design.

Core Skills & Tools:
- Video Editing: Adobe Premiere Pro, After Effects, DaVinci Resolve
- Graphic Design: Adobe Photoshop, Adobe Illustrator, Canva Pro
- Specializations: High-retention Reels, Commercial Promos, CTR-Engineered Thumbnails, Cinematic Color Grading

Academic Background:
- Dawra-e Hadith (Masters Equivalent) | 2025
  Highest academic qualification in Islamic Studies & Hadith Literature.
- At-Takhassus Fil Ifta | 2026 (Ongoing)
  Postgraduate specialization in Islamic Jurisprudence & Research.

Professional Training:
- Skill Development Institute (Batch 36)
  Hands-on practical training in Video Post-Production & Digital Media Strategy.

Selected Projects:
- Nashrus Sirah Registration Commercial Promo
- Mirath Islamic Media Final Commercial
- 9:16 Short-form Video Transformation Reel
- Anua Skincare Product Ad Creative
- High CTR YouTube Thumbnails & Key Visuals
=====================================================
`.trim();

    const blob = new Blob([cvContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `CV_Osman_Goni_Video_Editor.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // If visitor navigated to /admin, show dedicated password-protected Admin Panel
  if (isAdminRoute) {
    return (
      <AdminPanel
        customization={customization}
        onUpdateCustomization={handleSaveCustomization}
        onExitAdmin={handleExitAdmin}
      />
    );
  }

  // Public visitor site (clean, no admin button on dashboard)
  return (
    <div className="min-h-screen font-sans bg-[#020709] text-slate-100 selection:bg-cyan-500 selection:text-black relative overflow-x-hidden pb-16 lg:pb-0">
      {/* Full-Screen Modern Tech Pixel Grid Background exactly matching farabial-amin.vercel.app with cyan theme */}
      <div
        className="fixed inset-0 pointer-events-none z-0 cyan-ambient-texture"
        aria-hidden="true"
      />
      {/* Ambient glowing radial spotlights behind grid (no dark vignette to prevent blacking out grid) */}
      <div className="fixed top-[-80px] left-1/2 -translate-x-1/2 w-[750px] h-[550px] bg-cyan-500/12 rounded-full blur-[170px] pointer-events-none -z-10" />
      <div className="fixed top-1/2 right-1/4 w-[550px] h-[550px] bg-teal-500/8 rounded-full blur-[180px] pointer-events-none -z-10" />
      <div className="fixed bottom-0 left-1/3 w-[550px] h-[550px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none -z-10" />

      {/* Navigation Bar */}
      <Navbar
        customization={customization}
        onNavigate={handleNavigate}
        lang={lang}
        onToggleLang={handleToggleLang}
        onDownloadCV={handleDownloadCV}
        onOpenAdmin={handleOpenAdmin}
      />

      {/* Background Rising Profile Portrait (With exact screenshot grid directly layered behind it) */}
      <div
        id="persistent-project-portrait"
        aria-hidden="true"
        className={`fixed inset-0 pointer-events-none z-10 flex items-end justify-center select-none transition-opacity duration-700 ease-in-out ${
          showProjectPortrait
            ? 'opacity-90 pointer-events-none'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Exact Grid matching user screenshot directly behind this photo */}
        <div className="absolute inset-0 pointer-events-none project-screenshot-grid" />

        {/* Ambient cyan backlight right behind the silhouette */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[700px] h-[550px] bg-cyan-500/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative flex items-end justify-center w-full max-w-6xl px-4 pointer-events-none z-10">
          <img
            src={customization.profileImage || 'https://i.postimg.cc/kGvC3Vb9/zn-Qd-U.jpg'}
            alt="Osman Goni Profile"
            onError={(e) => {
              const target = e.currentTarget;
              if (!target.src.includes('zn-Qd-U.jpg')) {
                target.src = 'https://i.postimg.cc/kGvC3Vb9/zn-Qd-U.jpg';
              }
            }}
            className="w-auto max-h-[85vh] sm:max-h-[90vh] md:max-h-[96vh] object-contain object-bottom brightness-[0.90] contrast-100"
            style={{
              maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 75%, rgba(0,0,0,0) 98%)',
              WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 75%, rgba(0,0,0,0) 98%)',
            }}
          />
        </div>
      </div>

      <main className="relative z-20">
        {/* Hero Section matching screenshot layout & typography */}
        <Hero
          customization={customization}
          onNavigate={handleNavigate}
          lang={lang}
          onUpdateCustomization={handleSaveCustomization}
        />

        {/* Software & Tools Marquee - positioned as a bridge visible from both Home and My Projects */}
        <div id="software-tools-bridge" className="-mt-4 sm:-mt-8 mb-6 sm:mb-10 relative z-30">
          <SoftwareToolsMarquee lang={lang} />
        </div>

        {/* My Projects Section with dynamic video & design timing and items */}
        <MyProjectsSection
          lang={lang}
          themeMode={customization.themeMode}
          videoProjects={customization.videoProjects}
          designProjects={customization.designProjects}
          videoSliderInterval={customization.videoSliderInterval || 3}
          designSliderInterval={customization.designSliderInterval || 2}
          profileImage={customization.profileImage}
        />

        {/* Core Expertise & Skills Section */}
        <CoreSkillsSection
          lang={lang}
          themeMode={customization.themeMode}
          skills={customization.coreSkills}
        />

        {/* Education & Creative Learning Section */}
        <EducationSection
          lang={lang}
          themeMode={customization.themeMode}
        />

        {/* Contact Me Section */}
        <ContactSection
          customization={customization}
          lang={lang}
        />
      </main>

      {/* Footer with phone number, email, CV download, and social links */}
      <Footer
        customization={customization}
        lang={lang}
        onDownloadCV={handleDownloadCV}
        onNavigate={handleNavigate}
      />

      {/* Mobile Sticky Bottom Navigation (Home, Projects, Skills, Education, Contact) */}
      <MobileBottomNav
        lang={lang}
        onNavigate={handleNavigate}
      />
    </div>
  );
}

export default App;
