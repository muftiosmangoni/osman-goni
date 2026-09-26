import React, { useState, useEffect, useRef } from 'react';
import { Play, Sparkles, ChevronLeft, ChevronRight, ChevronDown, ChevronUp, X, Grid, Layers, Film, Palette, Maximize2, Minimize2, ExternalLink } from 'lucide-react';
import { VIDEO_PROJECTS, DESIGN_PROJECTS } from '../data/portfolioData';
import { VideoProject, DesignProject } from '../types';
import { SoftwareToolsMarquee } from './SoftwareToolsMarquee';

interface MyProjectsSectionProps {
  lang: 'bn' | 'en';
  themeMode: 'dark' | 'light';
  videoProjects?: VideoProject[];
  designProjects?: DesignProject[];
  videoSliderInterval?: number;
  designSliderInterval?: number;
  profileImage?: string;
}

export const MyProjectsSection: React.FC<MyProjectsSectionProps> = ({
  lang,
  themeMode,
  videoProjects,
  designProjects,
  videoSliderInterval = 3,
  designSliderInterval = 2,
  profileImage,
}) => {
  const [activeTab, setActiveTab] = useState<'video' | 'design'>('video');
  const [selectedVideo, setSelectedVideo] = useState<VideoProject | null>(null);
  const [selectedDesign, setSelectedDesign] = useState<DesignProject | null>(null);
  const [isVideoFullscreen, setIsVideoFullscreen] = useState(false);
  const videoPlayerContainerRef = useRef<HTMLDivElement>(null);

  // Mobile show 3 initially, with See All toggle
  const [isMobileVideosExpanded, setIsMobileVideosExpanded] = useState(false);
  const [isMobileDesignsExpanded, setIsMobileDesignsExpanded] = useState(false);

  // Desktop responsive cards per view: 3 on desktop as requested ("একসাথে তিনটা দেখা যাবে")
  const [cardsPerView, setCardsPerView] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setCardsPerView(3);
      } else if (window.innerWidth >= 768) {
        setCardsPerView(2);
      } else {
        setCardsPerView(1);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Listen to fullscreen changes
  useEffect(() => {
    const onFullscreenChange = () => {
      setIsVideoFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  const handleToggleVideoFullscreen = () => {
    if (!document.fullscreenElement) {
      if (videoPlayerContainerRef.current?.requestFullscreen) {
        videoPlayerContainerRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  const activeVideos = videoProjects && videoProjects.length > 0 ? videoProjects : VIDEO_PROJECTS;
  const activeDesigns = designProjects && designProjects.length > 0 ? designProjects : DESIGN_PROJECTS;
  const isDark = themeMode === 'dark';

  // =================== VIDEO EDITING STATES ===================
  const [videoFilter, setVideoFilter] = useState<'all' | 'commercial' | 'motion' | 'reel' | 'documentary'>('all');
  const [videoLayout, setVideoLayout] = useState<'carousel' | 'grid'>('carousel');
  const [videoIndex, setVideoIndex] = useState(0);
  const [isVideoHovered, setIsVideoHovered] = useState(false);
  const [isVideoTransitioning, setIsVideoTransitioning] = useState(true);

  const filteredVideos = activeVideos.filter((video) => {
    if (videoFilter === 'all') return true;
    return video.category === videoFilter;
  });

  // Viewport tracking so anyone arriving sees the 1st video and 1st graphic first
  const [isVideosInView, setIsVideosInView] = useState(false);
  const [isDesignsInView, setIsDesignsInView] = useState(false);
  const wasVideoInView = useRef(false);
  const wasDesignInView = useRef(false);

  useEffect(() => {
    const handleScrollTracking = () => {
      const videoEl = document.getElementById('video-editing-portfolio');
      const designEl = document.getElementById('graphic-design-portfolio');
      
      if (videoEl) {
        const vRect = videoEl.getBoundingClientRect();
        // Considered in active view when within primary viewport zone
        const inView = vRect.top < window.innerHeight * 0.75 && vRect.bottom > 150;
        setIsVideosInView(inView);
      }
      if (designEl) {
        const dRect = designEl.getBoundingClientRect();
        const inView = dRect.top < window.innerHeight * 0.75 && dRect.bottom > 150;
        setIsDesignsInView(inView);
      }
    };

    window.addEventListener('scroll', handleScrollTracking, { passive: true });
    handleScrollTracking();
    return () => window.removeEventListener('scroll', handleScrollTracking);
  }, []);

  // Guarantee that whenever the user enters the video or design section, it always starts at the 1st item first
  useEffect(() => {
    if (isVideosInView && !wasVideoInView.current) {
      setVideoIndex(0);
    }
    wasVideoInView.current = isVideosInView;
  }, [isVideosInView]);

  useEffect(() => {
    if (isDesignsInView && !wasDesignInView.current) {
      setDesignIndex(0);
    }
    wasDesignInView.current = isDesignsInView;
  }, [isDesignsInView]);

  // Reset video carousel when filter changes
  useEffect(() => {
    setVideoIndex(0);
    setIsVideoTransitioning(false);
    const t = setTimeout(() => setIsVideoTransitioning(true), 50);
    return () => clearTimeout(t);
  }, [videoFilter]);

  // Video 3-Second Auto-Scroll (Only active when section is in view, so user always sees Video 1 first upon arrival):
  useEffect(() => {
    if (
      !isVideosInView ||
      isVideoHovered ||
      videoLayout !== 'carousel' ||
      filteredVideos.length <= cardsPerView
    ) {
      return;
    }

    const timer = setInterval(() => {
      setVideoIndex((prev) => prev + 1);
    }, (videoSliderInterval || 3) * 1000);

    return () => clearInterval(timer);
  }, [isVideosInView, isVideoHovered, videoLayout, filteredVideos.length, cardsPerView, videoSliderInterval]);

  // Seamless looping for video track
  useEffect(() => {
    if (videoIndex >= filteredVideos.length && filteredVideos.length > 0) {
      const resetTimer = setTimeout(() => {
        setIsVideoTransitioning(false);
        setVideoIndex(0);
        setTimeout(() => setIsVideoTransitioning(true), 50);
      }, 650);
      return () => clearTimeout(resetTimer);
    }
  }, [videoIndex, filteredVideos.length]);

  const handleVideoNext = () => {
    setIsVideoTransitioning(true);
    setVideoIndex((prev) => prev + 1);
  };

  const handleVideoPrev = () => {
    setIsVideoTransitioning(true);
    setVideoIndex((prev) => (prev > 0 ? prev - 1 : filteredVideos.length - 1));
  };

  const trackVideos = [
    ...filteredVideos,
    ...filteredVideos.slice(0, Math.max(cardsPerView + 1, 4)),
  ];

  // Clean Vimeo embed URL generator to remove extraneous branding and play in-page
  const getCleanVimeoUrl = (url?: string) => {
    if (!url) return '';
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}autoplay=1&title=0&byline=0&portrait=0&badge=0&autopause=0&dnt=1`;
  };

  // =================== GRAPHIC DESIGN STATES ===================
  const [designFilter, setDesignFilter] = useState<'all' | 'ad-creative' | 'poster' | 'typography' | 'thumbnail'>('all');
  const [designLayout, setDesignLayout] = useState<'carousel' | 'grid'>('carousel');
  const [designIndex, setDesignIndex] = useState(0);
  const [isDesignHovered, setIsDesignHovered] = useState(false);
  const [isDesignTransitioning, setIsDesignTransitioning] = useState(true);

  const filteredDesigns = activeDesigns.filter((item) => {
    if (designFilter === 'all') return true;
    return item.category === designFilter;
  });

  // Reset design carousel when filter changes
  useEffect(() => {
    setDesignIndex(0);
    setIsDesignTransitioning(false);
    const t = setTimeout(() => setIsDesignTransitioning(true), 50);
    return () => clearTimeout(t);
  }, [designFilter]);

  // Graphic Design 2-Second Auto-Scroll (Only active when in view, so user always sees Graphic 1 first upon arrival):
  useEffect(() => {
    if (
      !isDesignsInView ||
      isDesignHovered ||
      designLayout !== 'carousel' ||
      filteredDesigns.length <= cardsPerView
    ) {
      return;
    }

    const timer = setInterval(() => {
      setDesignIndex((prev) => prev + 1);
    }, (designSliderInterval || 2) * 1000);

    return () => clearInterval(timer);
  }, [isDesignsInView, isDesignHovered, designLayout, filteredDesigns.length, cardsPerView, designSliderInterval]);

  // Seamless looping for design track
  useEffect(() => {
    if (designIndex >= filteredDesigns.length && filteredDesigns.length > 0) {
      const resetTimer = setTimeout(() => {
        setIsDesignTransitioning(false);
        setDesignIndex(0);
        setTimeout(() => setIsDesignTransitioning(true), 50);
      }, 650);
      return () => clearTimeout(resetTimer);
    }
  }, [designIndex, filteredDesigns.length]);

  const handleDesignNext = () => {
    setIsDesignTransitioning(true);
    setDesignIndex((prev) => prev + 1);
  };

  const handleDesignPrev = () => {
    setIsDesignTransitioning(true);
    setDesignIndex((prev) => (prev > 0 ? prev - 1 : filteredDesigns.length - 1));
  };

  const trackDesigns = [
    ...filteredDesigns,
    ...filteredDesigns.slice(0, Math.max(cardsPerView + 1, 4)),
  ];

  return (
    <section id="projects" className={`py-10 sm:py-16 border-t relative ${
      isDark ? 'bg-transparent border-[#0e2536]' : 'bg-slate-50 border-slate-200'
    }`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-20">
        
        {/* Section Title (Clean, no small pill above) */}
        <div className="text-center max-w-2xl mx-auto mb-3 sm:mb-4">
          <h2 className={`text-3xl sm:text-5xl font-black tracking-tight ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300">Projects</span>
          </h2>
        </div>

        {/* Quick Clickable Switchers: Video Editing & Graphic Design with forward-leap and radiant glowing backlight */}
        <div className="flex items-center justify-center gap-3 sm:gap-5 mb-6 sm:mb-8">
          <div className="relative group">
            {/* Radiant Glowing Lamp behind Video Editing Shape */}
            <div className="absolute -inset-1.5 bg-gradient-to-r from-cyan-400 via-teal-300 to-sky-400 rounded-full blur-lg opacity-0 group-hover:opacity-100 group-hover:scale-120 transition-all duration-400 pointer-events-none -z-10" />
            <button
              onClick={() => {
                document.getElementById('video-editing-portfolio')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="relative flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold bg-[#061824] hover:bg-cyan-400 text-cyan-300 hover:text-black border border-cyan-500/50 hover:border-cyan-300 transition-all duration-300 cursor-pointer shadow-lg hover:scale-110 hover:-translate-y-1.5 active:scale-95 hover:shadow-[0_0_30px_rgba(6,182,212,0.9)]"
              title={lang === 'bn' ? 'ভিডিও এডিটিং সেকশনে যান' : 'Go to Video Editing'}
            >
              <Film className="w-4 h-4 text-cyan-400 group-hover:text-black group-hover:scale-110 transition-all" />
              <span>{lang === 'bn' ? 'ভিডিও এডিটিং' : 'Video Editing'}</span>
            </button>
          </div>

          <div className="relative group">
            {/* Radiant Glowing Lamp behind Graphic Design Shape */}
            <div className="absolute -inset-1.5 bg-gradient-to-r from-cyan-400 via-teal-300 to-sky-400 rounded-full blur-lg opacity-0 group-hover:opacity-100 group-hover:scale-120 transition-all duration-400 pointer-events-none -z-10" />
            <button
              onClick={() => {
                document.getElementById('graphic-design-portfolio')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="relative flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold bg-[#061824] hover:bg-cyan-400 text-cyan-300 hover:text-black border border-cyan-500/50 hover:border-cyan-300 transition-all duration-300 cursor-pointer shadow-lg hover:scale-110 hover:-translate-y-1.5 active:scale-95 hover:shadow-[0_0_30px_rgba(6,182,212,0.9)]"
              title={lang === 'bn' ? 'গ্রাফিক ডিজাইন সেকশনে যান' : 'Go to Graphic Design'}
            >
              <Palette className="w-4 h-4 text-cyan-400 group-hover:text-black group-hover:scale-110 transition-all" />
              <span>{lang === 'bn' ? 'গ্রাফিক ডিজাইন' : 'Graphic Design'}</span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* ============ SECTION 1: VIDEO EDITING (3 VISIBLE, 3s AUTO-SCROLL) ======== */}
        {/* ========================================================================= */}
        <div id="video-editing-portfolio" className="relative mt-2 sm:mt-4 scroll-mt-24">
          {/* Top Bar with Subtitle and user-requested "পূর্ববর্তী", "পরবর্তী" and "সি অল (YouTube)" Buttons */}
          <div className="flex items-center justify-between gap-2 mb-4 px-1">
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-base font-extrabold text-cyan-300 uppercase tracking-wider font-mono">
                {lang === 'bn' ? 'ভিডিও এডিটিং' : 'Video Editing'}
              </span>
              <span className="text-[10px] sm:text-[11px] px-2 py-0.5 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-300 font-mono font-bold">
                {filteredVideos.length} {lang === 'bn' ? 'টি প্রজেক্ট' : 'Projects'}
              </span>
            </div>

            {/* Action Controls: পূর্ববর্তী, পরবর্তী, and সি অল (YouTube) at the end */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Button 1: "পূর্ববর্তী" (Previous) */}
              <button
                id="video-prev-btn"
                onClick={handleVideoPrev}
                className="flex items-center gap-1 px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-[10px] sm:text-xs font-bold border border-[#103248] bg-[#051522] text-cyan-300 hover:bg-cyan-500/20 hover:text-white hover:border-cyan-400 transition-all cursor-pointer active:scale-95 shadow-md"
                title={lang === 'bn' ? 'পূর্ববর্তী' : 'Prev'}
              >
                <ChevronLeft className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>{lang === 'bn' ? 'পূর্ববর্তী' : 'Prev'}</span>
              </button>

              {/* Button 2: "পরবর্তী" (Next) */}
              <button
                id="video-next-btn"
                onClick={handleVideoNext}
                className="flex items-center gap-1 px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-[10px] sm:text-xs font-bold border border-[#103248] bg-[#051522] text-cyan-300 hover:bg-cyan-500/20 hover:text-white hover:border-cyan-400 transition-all cursor-pointer active:scale-95 shadow-md"
                title={lang === 'bn' ? 'পরবর্তী' : 'Next'}
              >
                <span>{lang === 'bn' ? 'পরবর্তী' : 'Next'}</span>
                <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>

              {/* Button 3: "সি অল" (See All - YouTube Channel) at the end */}
              <a
                id="video-see-all-youtube-btn"
                href="https://www.youtube.com/@GoniEditor"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-[10px] sm:text-xs font-bold border border-red-500/50 bg-[#280808]/90 text-red-300 hover:bg-red-600 hover:text-white hover:border-red-400 transition-all cursor-pointer shadow-lg shadow-red-950/40 active:scale-95 group"
                title="ইউটিউব চ্যানেলে সকল ভিডিও দেখুন (Goni Editor)"
              >
                <svg className="w-3.5 h-3.5 fill-red-500 group-hover:fill-white shrink-0 transition-colors" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                <span>{lang === 'bn' ? 'সি অল' : 'See All'}</span>
                <ExternalLink className="w-3 h-3 opacity-80" />
              </a>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* MOBILE VIEW: Videos stacked full-width one by one (3 initially, then See All) */}
          {/* ========================================================================= */}
          <div className="block md:hidden space-y-4">
            {(isMobileVideosExpanded ? filteredVideos : filteredVideos.slice(0, 3)).map((video, idx) => (
              <div
                key={`mobile-video-${video.id}-${idx}`}
                id={`mobile-video-card-${video.id}`}
                onClick={() => setSelectedVideo(video)}
                className={`w-full rounded-2xl border transition-all duration-300 overflow-hidden flex flex-col group cursor-pointer shadow-xl ${
                  isDark
                    ? 'bg-[#05141e] border-[#113146] active:border-cyan-400'
                    : 'bg-white border-slate-200 active:border-cyan-400'
                }`}
              >
                {/* Full-width aspect-video Video Preview */}
                <div className="relative aspect-video w-full overflow-hidden bg-black flex items-center justify-center">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    loading="lazy"
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20" />

                  {/* Centered Glowing Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-cyan-500 text-black flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.8)] active:scale-95 transition-all">
                      <Play className="w-6 h-6 fill-black ml-1 text-black" />
                    </div>
                  </div>

                  <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-md bg-black/85 backdrop-blur-md border border-white/10 text-[10px] font-mono font-bold text-cyan-300">
                    {lang === 'bn' && video.categoryLabelBn ? video.categoryLabelBn : video.categoryLabel}
                  </span>

                  <span className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded bg-black/90 text-[10px] font-mono text-slate-200 border border-white/10">
                    {video.duration}
                  </span>
                </div>

                {/* Video Info Details */}
                <div className={`p-3.5 flex flex-col justify-between border-t ${
                  isDark ? 'border-[#0e2738] bg-[#040e16]' : 'border-slate-100 bg-slate-50'
                }`}>
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                      <span className="font-mono text-cyan-400 font-bold">{video.client}</span>
                      <span className="text-[10px] uppercase font-mono">{video.aspectRatio}</span>
                    </div>
                    <h3 className={`text-sm font-bold line-clamp-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {lang === 'bn' && video.titleBn ? video.titleBn : video.title}
                    </h3>
                    {video.description && (
                      <p className={`text-xs mt-1 line-clamp-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        {video.description}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5 mt-3 pt-2.5 border-t border-[#0e2738]/70">
                    {video.toolsUsed?.map((tool) => (
                      <span
                        key={tool}
                        className="px-2 py-0.5 rounded bg-[#081d2c] border border-[#133c57] text-[9.5px] text-cyan-300 font-mono"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {/* Mobile "See All" / "See Less" Button */}
            {filteredVideos.length > 3 && (
              <div className="pt-2 flex justify-center">
                <button
                  onClick={() => setIsMobileVideosExpanded(!isMobileVideosExpanded)}
                  className="w-full py-3 px-4 rounded-xl border border-cyan-500/40 bg-gradient-to-r from-[#071c2b] to-[#04121d] hover:bg-cyan-500/20 text-cyan-300 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-950/50 active:scale-98 transition-all cursor-pointer"
                >
                  <span>
                    {isMobileVideosExpanded
                      ? (lang === 'bn' ? 'কম দেখুন (সংক্ষেপ করুন)' : 'See Less')
                      : (lang === 'bn' ? `সি অল (সবগুলো ${filteredVideos.length}টি ভিডিও দেখুন)` : `See All (${filteredVideos.length} Videos)`)}
                  </span>
                  {isMobileVideosExpanded ? (
                    <ChevronUp className="w-4 h-4 text-cyan-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-cyan-400" />
                  )}
                </button>
              </div>
            )}
          </div>

          {/* ========================================================================= */}
          {/* DESKTOP VIEW: Carousel Sliding Track & Grid (Hidden on Mobile) */}
          {/* ========================================================================= */}
          <div className="hidden md:block">
            {/* Video Carousel Sliding Track (3 items at once, auto-scrolls every 4 seconds 1 by 1) */}
            {videoLayout === 'carousel' && (
              <div
                className="relative"
                onMouseEnter={() => setIsVideoHovered(true)}
                onMouseLeave={() => setIsVideoHovered(false)}
              >
                <div className="overflow-hidden rounded-2xl border border-[#0e2739] bg-[#020b12]/80 p-2 sm:p-3 relative shadow-2xl">
                  <div
                    className="flex"
                    style={{
                      transform: `translateX(-${(videoIndex * (100 / cardsPerView))}%)`,
                      transition: isVideoTransitioning ? 'transform 650ms cubic-bezier(0.25, 1, 0.5, 1)' : 'none',
                    }}
                  >
                    {trackVideos.map((video, idx) => (
                      <div
                        key={`${video.id}-${idx}`}
                        className="shrink-0 p-1 sm:p-2 md:p-2.5 transition-all"
                        style={{ width: `${100 / cardsPerView}%` }}
                      >
                        <div
                          id={`video-carousel-card-${video.id}-${idx}`}
                          onClick={() => setSelectedVideo(video)}
                          className={`h-full rounded-xl sm:rounded-2xl border transition-all duration-300 overflow-hidden flex flex-col group cursor-pointer hover:shadow-2xl hover:scale-[1.035] hover:-translate-y-2.5 ${
                            isDark
                              ? 'bg-[#05141e] border-[#113146] hover:border-cyan-300 hover:shadow-[0_0_35px_rgba(6,182,212,0.55)]'
                              : 'bg-white border-slate-200 hover:border-cyan-400 hover:shadow-cyan-100'
                          }`}
                        >
                          {/* Standard YouTube / Facebook Landscape Video Shape (aspect-video) for ALL cards */}
                          <div className="relative aspect-video overflow-hidden bg-black flex items-center justify-center">
                            <img
                              src={video.thumbnail}
                              alt={video.title}
                              loading="lazy"
                              className="w-full h-full object-cover transform group-hover:scale-108 transition-transform duration-500 ease-out"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30 group-hover:from-black/60 transition-all" />

                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-8 h-8 sm:w-13 sm:h-13 rounded-full bg-cyan-500/90 text-black flex items-center justify-center shadow-lg shadow-cyan-500/50 transform group-hover:scale-110 group-hover:bg-cyan-400 transition-all duration-300">
                                <Play className="w-3.5 h-3.5 sm:w-6 sm:h-6 fill-black ml-0.5 sm:ml-1 text-black" />
                              </div>
                            </div>

                            <span className="absolute top-1.5 left-1.5 sm:top-2.5 sm:left-2.5 px-1.5 py-0.5 rounded-md bg-black/80 backdrop-blur-md border border-white/10 text-[9px] sm:text-[10px] font-mono text-cyan-300">
                              {lang === 'bn' && video.categoryLabelBn ? video.categoryLabelBn : video.categoryLabel}
                            </span>

                            <span className="absolute bottom-1.5 right-1.5 sm:bottom-2.5 sm:right-2.5 px-1.5 py-0.5 rounded bg-black/85 text-[9px] sm:text-[10px] font-mono text-slate-200 border border-white/10">
                              {video.duration}
                            </span>
                          </div>

                          {/* Card Footer Details */}
                          <div className={`p-2 sm:p-3.5 md:p-4 flex flex-col justify-between flex-grow border-t ${
                            isDark ? 'border-[#0e2738] bg-[#040e16]' : 'border-slate-100 bg-slate-50'
                          }`}>
                            <div>
                              <div className="flex items-center justify-between text-[10px] sm:text-xs text-slate-400 mb-0.5 sm:mb-1">
                                <span className="font-mono text-cyan-400 font-semibold truncate max-w-[80px] sm:max-w-none">{video.client}</span>
                                <span className="text-[9px] sm:text-[10px] uppercase font-mono">{video.aspectRatio}</span>
                              </div>
                              <h3 className={`text-[11px] sm:text-sm md:text-base font-bold line-clamp-1 group-hover:text-cyan-400 transition-colors ${
                                isDark ? 'text-white' : 'text-slate-900'
                              }`}>
                                {lang === 'bn' && video.titleBn ? video.titleBn : video.title}
                              </h3>
                              <p className={`hidden sm:block text-xs mt-1 line-clamp-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                                {video.description}
                              </p>
                            </div>

                            <div className="hidden md:flex flex-wrap items-center gap-1.5 mt-3 pt-3 border-t border-[#0d2231]">
                              {video.toolsUsed?.map((tool) => (
                                <span
                                  key={tool}
                                  className="px-2 py-0.5 rounded bg-[#081d2c] border border-[#133c57] text-[10px] text-cyan-300 font-mono"
                                >
                                  {tool}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Step Indicator */}
                <div className="flex items-center justify-between mt-4 px-2 text-xs font-mono text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="text-cyan-400 font-bold">
                      {((videoIndex % filteredVideos.length) + 1)}
                    </span>
                    <span>/</span>
                    <span>{filteredVideos.length}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleVideoPrev}
                      className="px-3 py-1.5 rounded-lg text-xs bg-[#081e2e] text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500 hover:text-black transition-all cursor-pointer"
                    >
                      {lang === 'bn' ? 'পূর্ববর্তী' : 'Prev'}
                    </button>
                    <button
                      onClick={handleVideoNext}
                      className="px-3 py-1.5 rounded-lg text-xs bg-[#081e2e] text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500 hover:text-black transition-all cursor-pointer font-bold"
                    >
                      {lang === 'bn' ? 'পরবর্তী' : 'Next'}
                    </button>
                  </div>
                </div>

                {/* User-Requested Go to YouTube Button directly under video carousel */}
                <div className="flex items-center justify-center mt-6 sm:mt-8">
                  <a
                    id="video-section-goto-youtube-btn"
                    href="https://www.youtube.com/@GoniEditor"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative group flex items-center gap-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-red-600 via-rose-600 to-red-500 hover:from-red-500 hover:to-rose-500 text-white font-black text-xs sm:text-sm tracking-wide shadow-xl shadow-red-600/30 hover:shadow-red-500/60 hover:scale-105 hover:-translate-y-1 active:scale-95 transition-all duration-300 border border-red-400/40 cursor-pointer"
                    title={lang === 'bn' ? 'সরাসরি ইউটিউবে যান (@GoniEditor)' : 'Go to YouTube Channel (@GoniEditor)'}
                  >
                    <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                      <Play className="w-3 h-3 fill-white text-white ml-0.5" />
                    </div>
                    <span>{lang === 'bn' ? 'গো টু ইউটিউব (Go to YouTube)' : 'Go to YouTube (@GoniEditor)'}</span>
                    <ExternalLink className="w-4 h-4 text-white/90 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            )}

            {/* Video Cards Grid Mode (When "সি অল" is clicked) */}
            {videoLayout === 'grid' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVideos.map((video) => (
                  <div
                    key={video.id}
                    id={`video-card-${video.id}`}
                    onClick={() => setSelectedVideo(video)}
                    className={`rounded-2xl border transition-all duration-300 overflow-hidden flex flex-col group cursor-pointer hover:shadow-2xl hover:scale-[1.035] hover:-translate-y-2.5 ${
                      isDark
                        ? 'bg-[#05141e] border-[#113146] hover:border-cyan-300 hover:shadow-[0_0_35px_rgba(6,182,212,0.55)]'
                        : 'bg-white border-slate-200 hover:border-cyan-400 hover:shadow-cyan-100'
                    }`}
                  >
                    {/* Standard YouTube Video Shape for All cards */}
                    <div className="relative aspect-video overflow-hidden bg-black flex items-center justify-center">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        loading="lazy"
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30 group-hover:from-black/70 transition-all" />

                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-14 h-14 rounded-full bg-cyan-500/90 text-black flex items-center justify-center shadow-lg shadow-cyan-500/50 transform group-hover:scale-110 group-hover:bg-cyan-400 transition-all duration-300">
                          <Play className="w-6 h-6 fill-black ml-1 text-black" />
                        </div>
                      </div>

                      <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-md bg-black/75 backdrop-blur-md border border-white/10 text-[10px] font-mono text-cyan-300">
                        {lang === 'bn' && video.categoryLabelBn ? video.categoryLabelBn : video.categoryLabel}
                      </span>

                      <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-black/85 text-[11px] font-mono text-slate-200 border border-white/10">
                        {video.duration}
                      </span>
                    </div>

                    <div className={`p-4 flex flex-col justify-between flex-grow border-t ${
                      isDark ? 'border-[#0e2738] bg-[#040e16]' : 'border-slate-100 bg-slate-50'
                    }`}>
                      <div>
                        <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                          <span className="font-mono text-cyan-400 font-semibold">{video.client}</span>
                          <span className="text-[10px] uppercase font-mono">{video.aspectRatio}</span>
                        </div>
                        <h3 className={`text-base font-bold line-clamp-1 group-hover:text-cyan-400 transition-colors ${
                          isDark ? 'text-white' : 'text-slate-900'
                        }`}>
                          {lang === 'bn' && video.titleBn ? video.titleBn : video.title}
                        </h3>
                        <p className={`text-xs mt-1 line-clamp-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                          {video.description}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-1.5 mt-3 pt-3 border-t border-[#0d2231]">
                        {video.toolsUsed?.map((tool) => (
                          <span
                            key={tool}
                            className="px-2 py-0.5 rounded bg-[#081d2c] border border-[#133c57] text-[10px] text-cyan-300 font-mono"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

          {/* Glowing separator between Video and Graphics */}
          <div className="my-16 relative flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#10354e]" />
            </div>
            <div className="relative px-5 py-2 rounded-full bg-[#03111b] border border-[#184869] text-xs font-mono font-bold text-cyan-300 flex items-center gap-2 shadow-lg shadow-cyan-950/60">
              <Layers className="w-4 h-4 text-teal-400" />
              <span>{lang === 'bn' ? 'গ্রাফিক ডিজাইন শোকেস' : 'Graphic Design Showcase'}</span>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* ============ SECTION 2: GRAPHIC DESIGN (3 VISIBLE, 2s AUTO-SCROLL) ======= */}
          {/* ========================================================================= */}
          <div id="graphic-design-portfolio" className="relative scroll-mt-24">
            {/* Top Bar with Subtitle and user-requested "পূর্ববর্তী", "পরবর্তী" and "সি অল" Buttons */}
            <div className="flex items-center justify-between gap-2 mb-4 px-1">
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-base font-extrabold text-cyan-300 uppercase tracking-wider font-mono">
                  {lang === 'bn' ? 'গ্রাফিক ডিজাইন' : 'Graphic Design'}
                </span>
                <span className="text-[10px] sm:text-[11px] px-2 py-0.5 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-300 font-mono font-bold">
                  {activeDesigns.length} {lang === 'bn' ? 'টি ডিজাইন' : 'Designs'}
                </span>
              </div>

              {/* Action Controls: পূর্ববর্তী, পরবর্তী, and সি অল at the end */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                {/* Button 1: "পূর্ববর্তী" (Previous) */}
                <button
                  id="design-prev-btn"
                  onClick={handleDesignPrev}
                  className="flex items-center gap-1 px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-[10px] sm:text-xs font-bold border border-[#103248] bg-[#051522] text-cyan-300 hover:bg-cyan-500/20 hover:text-white hover:border-cyan-400 transition-all cursor-pointer active:scale-95 shadow-md"
                  title={lang === 'bn' ? 'পূর্ববর্তী' : 'Prev'}
                >
                  <ChevronLeft className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>{lang === 'bn' ? 'পূর্ববর্তী' : 'Prev'}</span>
                </button>

                {/* Button 2: "পরবর্তী" (Next) */}
                <button
                  id="design-next-btn"
                  onClick={handleDesignNext}
                  className="flex items-center gap-1 px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-[10px] sm:text-xs font-bold border border-[#103248] bg-[#051522] text-cyan-300 hover:bg-cyan-500/20 hover:text-white hover:border-cyan-400 transition-all cursor-pointer active:scale-95 shadow-md"
                  title={lang === 'bn' ? 'পরবর্তী' : 'Next'}
                >
                  <span>{lang === 'bn' ? 'পরবর্তী' : 'Next'}</span>
                  <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>

                {/* Button 3: "সি অল" (See All) at the end */}
                <button
                  id="design-see-all-btn"
                  onClick={() => setDesignLayout(designLayout === 'carousel' ? 'grid' : 'carousel')}
                  className={`flex items-center gap-1 px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-[10px] sm:text-xs font-bold border transition-all cursor-pointer shadow-md ${
                    designLayout === 'grid'
                      ? 'bg-gradient-to-r from-cyan-500 to-teal-400 text-black border-cyan-400 shadow-cyan-500/30'
                      : 'bg-[#081e2e] border-cyan-500/40 text-cyan-300 hover:bg-cyan-500 hover:text-black hover:border-cyan-400'
                  }`}
                  title={designLayout === 'carousel' ? 'সবগুলো ডিজাইন দেখুন' : 'স্লাইডার ভিউতে ফিরুন'}
                >
                  <Grid className="w-3.5 h-3.5" />
                  <span>
                    {designLayout === 'carousel'
                      ? (lang === 'bn' ? 'সি অল' : 'See All')
                      : (lang === 'bn' ? 'স্লাইডার' : 'Slider')}
                  </span>
                </button>
              </div>
            </div>

            {/* ========================================================================= */}
            {/* MOBILE VIEW: Graphic Designs stacked full-width one by one (3 initially, then See All) */}
            {/* ========================================================================= */}
            <div className="block md:hidden space-y-4">
              {(isMobileDesignsExpanded ? filteredDesigns : filteredDesigns.slice(0, 3)).map((item, idx) => (
                <div
                  key={`mobile-design-${item.id}-${idx}`}
                  id={`mobile-design-card-${item.id}`}
                  onClick={() => setSelectedDesign(item)}
                  className={`w-full rounded-2xl border transition-all duration-300 overflow-hidden flex flex-col group cursor-pointer shadow-xl ${
                    isDark
                      ? 'bg-[#05141e] border-[#113146] active:border-cyan-400'
                      : 'bg-white border-slate-200 active:border-cyan-400'
                  }`}
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-black flex items-center justify-center">
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/20" />

                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="px-3 py-1.5 rounded-full bg-cyan-500/90 text-black text-xs font-bold font-mono flex items-center gap-1.5 shadow-xl shadow-cyan-500/50">
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span>{lang === 'bn' ? 'বড় করে দেখুন' : 'Full Preview'}</span>
                      </span>
                    </div>

                    <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-md bg-black/85 backdrop-blur-md border border-white/10 text-[10px] font-mono font-bold text-cyan-300">
                      {lang === 'bn' && item.categoryLabelBn ? item.categoryLabelBn : item.categoryLabel}
                    </span>

                    <span className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded bg-black/90 text-[10px] font-mono text-slate-300 border border-white/10">
                      #{idx + 1}
                    </span>
                  </div>

                  <div className={`p-3.5 flex flex-col justify-between border-t ${
                    isDark ? 'border-[#0e2738] bg-[#040e16]' : 'border-slate-100 bg-slate-50'
                  }`}>
                    <div>
                      <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                        <span className="font-mono text-cyan-400 font-bold">{item.client || 'Osman Goni'}</span>
                        <span className="text-[10px] font-mono uppercase">{item.dimensions}</span>
                      </div>
                      <h3 className={`text-sm font-bold line-clamp-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {lang === 'bn' && item.titleBn ? item.titleBn : item.title}
                      </h3>
                      {item.description && (
                        <p className={`text-xs mt-1 line-clamp-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                          {item.description}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5 mt-3 pt-2.5 border-t border-[#0e2738]/70">
                      {item.toolsUsed?.map((tool) => (
                        <span
                          key={tool}
                          className="px-2 py-0.5 rounded bg-[#081d2c] border border-[#133c57] text-[9.5px] text-cyan-300 font-mono"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}

              {filteredDesigns.length > 3 && (
                <div className="pt-2 flex justify-center">
                  <button
                    onClick={() => setIsMobileDesignsExpanded(!isMobileDesignsExpanded)}
                    className="w-full py-3 px-4 rounded-xl border border-cyan-500/40 bg-gradient-to-r from-[#071c2b] to-[#04121d] hover:bg-cyan-500/20 text-cyan-300 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-950/50 active:scale-98 transition-all cursor-pointer"
                  >
                    <span>
                      {isMobileDesignsExpanded
                        ? (lang === 'bn' ? 'কম দেখুন (সংক্ষেপ করুন)' : 'See Less')
                        : (lang === 'bn' ? `সি অল (সবগুলো ${filteredDesigns.length}টি ডিজাইন দেখুন)` : `See All (${filteredDesigns.length} Designs)`)}
                    </span>
                    {isMobileDesignsExpanded ? (
                      <ChevronUp className="w-4 h-4 text-cyan-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-cyan-400" />
                    )}
                  </button>
                </div>
              )}
            </div>

            {/* ========================================================================= */}
            {/* DESKTOP VIEW: Graphic Design Carousel Sliding Track & Grid (Hidden on Mobile) */}
            {/* ========================================================================= */}
            <div className="hidden md:block">
              {/* Design Carousel Sliding Track (3 items at once, auto-scrolls every 2 seconds 1 by 1) */}
              {designLayout === 'carousel' && (
              <div
                className="relative"
                onMouseEnter={() => setIsDesignHovered(true)}
                onMouseLeave={() => setIsDesignHovered(false)}
              >
                <div className="overflow-hidden rounded-2xl border border-[#0e2739] bg-[#020b12]/80 p-2 sm:p-3 relative shadow-2xl">
                  <div
                    className="flex"
                    style={{
                      transform: `translateX(-${(designIndex * (100 / cardsPerView))}%)`,
                      transition: isDesignTransitioning ? 'transform 650ms cubic-bezier(0.25, 1, 0.5, 1)' : 'none',
                    }}
                  >
                    {trackDesigns.map((item, idx) => (
                      <div
                        key={`${item.id}-${idx}`}
                        className="shrink-0 p-1 sm:p-2 md:p-2.5 transition-all"
                        style={{ width: `${100 / cardsPerView}%` }}
                      >
                        <div
                          id={`carousel-design-card-${item.id}-${idx}`}
                          onClick={() => setSelectedDesign(item)}
                          className={`h-full rounded-xl sm:rounded-2xl border transition-all duration-300 overflow-hidden flex flex-col group cursor-pointer hover:shadow-2xl hover:scale-[1.035] hover:-translate-y-2.5 ${
                            isDark
                              ? 'bg-[#05141e] border-[#113146] hover:border-cyan-300 hover:shadow-[0_0_35px_rgba(6,182,212,0.55)]'
                              : 'bg-white border-slate-200 hover:border-cyan-400 hover:shadow-cyan-100'
                          }`}
                        >
                          {/* Image Box - balanced 4:3 display for graphic design showcase */}
                          <div className="relative aspect-[4/3] overflow-hidden bg-black flex items-center justify-center">
                            <img
                              src={item.image}
                              alt={item.title}
                              loading="lazy"
                              className="w-full h-full object-cover transform group-hover:scale-108 transition-transform duration-500 ease-out"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/30 group-hover:from-black/60 transition-all" />

                            {/* Hover overlay hint */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                              <span className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-cyan-500/90 text-black text-[10px] sm:text-xs font-bold font-mono flex items-center gap-1.5 shadow-xl shadow-cyan-500/40">
                                <Maximize2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                                <span>{lang === 'bn' ? 'বড় করে দেখুন' : 'Full Preview'}</span>
                              </span>
                            </div>

                            {/* Category Badge */}
                            <span className="absolute top-1.5 left-1.5 sm:top-3 sm:left-3 px-1.5 py-0.5 sm:px-2.5 rounded-md bg-black/80 backdrop-blur-md border border-white/10 text-[9px] sm:text-[10px] font-mono text-cyan-300">
                              {lang === 'bn' && item.categoryLabelBn ? item.categoryLabelBn : item.categoryLabel}
                            </span>

                            {/* Position indicator */}
                            <span className="absolute bottom-1.5 right-1.5 sm:bottom-2.5 sm:right-2.5 px-1.5 py-0.5 rounded bg-black/85 text-[9px] sm:text-[10px] font-mono text-slate-300 border border-white/10">
                              {(idx % filteredDesigns.length) + 1} / {filteredDesigns.length}
                            </span>
                          </div>

                          {/* Card Footer Details */}
                          <div className={`p-2 sm:p-3.5 flex flex-col justify-between flex-grow border-t ${
                            isDark ? 'border-[#0e2738] bg-[#040e16]' : 'border-slate-100 bg-slate-50'
                          }`}>
                            <div>
                              <div className="flex items-center justify-between text-[10px] sm:text-xs text-slate-400 mb-0.5 sm:mb-1">
                                <span className="font-mono text-cyan-400 text-[10px] sm:text-[11px] font-semibold truncate max-w-[80px] sm:max-w-[140px]">
                                  {item.client || 'Osman Goni'}
                                </span>
                                <span className="text-[9px] sm:text-[10px] font-mono text-slate-400 uppercase">{item.dimensions}</span>
                              </div>
                              <h3 className={`text-[11px] sm:text-sm font-bold line-clamp-1 group-hover:text-cyan-400 transition-colors ${
                                isDark ? 'text-white' : 'text-slate-900'
                              }`}>
                                {lang === 'bn' && item.titleBn ? item.titleBn : item.title}
                              </h3>
                              <p className={`hidden sm:block text-[11px] mt-1 line-clamp-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                                {item.description}
                              </p>
                            </div>

                            <div className="flex items-center justify-between mt-2 sm:mt-3 pt-2 sm:pt-2.5 border-t border-[#0d2231]">
                              <div className="hidden md:flex flex-wrap items-center gap-1">
                                {item.toolsUsed?.map((tool) => (
                                  <span
                                    key={tool}
                                    className="px-1.5 py-0.5 rounded bg-[#081d2c] border border-[#133c57] text-[9px] text-cyan-300 font-mono"
                                  >
                                    {tool}
                                  </span>
                                ))}
                              </div>
                              <span className="text-[10px] text-cyan-400 font-mono flex items-center gap-1 group-hover:underline">
                                {lang === 'bn' ? 'প্রিভিউ' : 'View'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Step Indicator */}
                <div className="flex items-center justify-between mt-4 px-2 text-xs font-mono text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="text-cyan-400 font-bold">
                      {((designIndex % filteredDesigns.length) + 1)}
                    </span>
                    <span>/</span>
                    <span>{filteredDesigns.length}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleDesignPrev}
                      className="px-3 py-1.5 rounded-lg text-xs bg-[#081e2e] text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500 hover:text-black transition-all cursor-pointer"
                    >
                      {lang === 'bn' ? 'পূর্ববর্তী' : 'Prev'}
                    </button>
                    <button
                      onClick={handleDesignNext}
                      className="px-3 py-1.5 rounded-lg text-xs bg-[#081e2e] text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500 hover:text-black transition-all cursor-pointer font-bold"
                    >
                      {lang === 'bn' ? 'পরবর্তী' : 'Next'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Design Grid Mode (When "সি অল" is clicked) */}
            {designLayout === 'grid' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-6">
                {filteredDesigns.map((item, idx) => (
                  <div
                    key={item.id}
                    id={`grid-design-card-${item.id}`}
                    onClick={() => setSelectedDesign(item)}
                    className={`rounded-2xl border transition-all duration-300 overflow-hidden flex flex-col group cursor-pointer hover:shadow-2xl hover:scale-[1.035] hover:-translate-y-2.5 ${
                      isDark
                        ? 'bg-[#05141e] border-[#113146] hover:border-cyan-300 hover:shadow-[0_0_35px_rgba(6,182,212,0.55)]'
                        : 'bg-white border-slate-200 hover:border-cyan-400 hover:shadow-cyan-100'
                    }`}
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-black flex items-center justify-center">
                      <img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        className="w-full h-full object-cover transform group-hover:scale-108 transition-transform duration-500 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 opacity-70 group-hover:opacity-40 transition-opacity" />

                      <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md border border-white/10 text-[9px] font-mono text-cyan-300">
                        {lang === 'bn' && item.categoryLabelBn ? item.categoryLabelBn : item.categoryLabel}
                      </span>

                      <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/85 text-[9px] font-mono text-slate-300 border border-white/10">
                        #{idx + 1}
                      </span>
                    </div>

                    <div className={`p-3.5 flex flex-col justify-between flex-grow border-t ${
                      isDark ? 'border-[#0e2738] bg-[#040e16]' : 'border-slate-100 bg-slate-50'
                    }`}>
                      <div>
                        <h3 className={`text-xs font-bold line-clamp-1 group-hover:text-cyan-400 transition-colors ${
                          isDark ? 'text-white' : 'text-slate-900'
                        }`}>
                          {lang === 'bn' && item.titleBn ? item.titleBn : item.title}
                        </h3>
                        <p className={`text-[10px] mt-0.5 text-slate-400 font-mono`}>
                          {item.dimensions}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-[#0d2231]">
                        <span className="text-[10px] text-cyan-400 font-mono truncate max-w-[120px]">
                          {item.client || 'Osman Goni (3646)'}
                        </span>
                        <span className="text-[10px] text-cyan-400 font-mono">
                          {lang === 'bn' ? 'ওপেন' : 'Open'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Video In-Page Theater Player Modal (Plays directly right on screen - NO Vimeo links!) */}
      {selectedVideo && (
        <div
          id="video-player-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-5 bg-black/95 backdrop-blur-2xl transition-all"
          onClick={() => setSelectedVideo(null)}
        >
          <div
            ref={videoPlayerContainerRef}
            className={`relative w-full bg-[#040e15] border border-cyan-500/50 rounded-3xl shadow-2xl overflow-hidden flex flex-col ${
              selectedVideo.aspectRatio === '9:16'
                ? 'max-w-md max-h-[94vh]'
                : 'max-w-4xl max-h-[94vh]'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Player Header: Title, Fullscreen Button, and Close Button */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#0f293b] bg-[#030a0f]">
              <div className="flex items-center gap-2 overflow-hidden pr-3">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shrink-0" />
                <span className="text-xs sm:text-sm font-bold text-white font-mono truncate">
                  {lang === 'bn' && selectedVideo.titleBn ? selectedVideo.titleBn : selectedVideo.title}
                </span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {/* Dedicated Fullscreen Toggle Button - Watch 100% right here without leaving */}
                <button
                  id="video-fullscreen-toggle-btn"
                  onClick={handleToggleVideoFullscreen}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500 hover:text-black text-cyan-300 text-xs font-bold transition-all cursor-pointer border border-cyan-500/40"
                  title={isVideoFullscreen ? (lang === 'bn' ? 'ফুল স্ক্রিন বন্ধ করুন' : 'Exit Fullscreen') : (lang === 'bn' ? 'ফুল স্ক্রিন করুন' : 'Full Screen')}
                >
                  {isVideoFullscreen ? (
                    <>
                      <Minimize2 className="w-4 h-4" />
                      <span className="hidden sm:inline">{lang === 'bn' ? 'নরমাল স্ক্রিন' : 'Exit Fullscreen'}</span>
                    </>
                  ) : (
                    <>
                      <Maximize2 className="w-4 h-4" />
                      <span className="hidden sm:inline">{lang === 'bn' ? 'ফুল স্ক্রিন' : 'Full Screen'}</span>
                    </>
                  )}
                </button>

                {/* Close Button */}
                <button
                  onClick={() => setSelectedVideo(null)}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Close video player"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* In-Page Video Stream Frame (Native embed without Vimeo redirects) */}
            <div className={`relative bg-black w-full flex items-center justify-center ${
              selectedVideo.aspectRatio === '9:16'
                ? 'aspect-[9/16] max-h-[74vh]'
                : 'aspect-video'
            }`}>
              {selectedVideo.vimeoEmbedUrl ? (
                <iframe
                  src={getCleanVimeoUrl(selectedVideo.vimeoEmbedUrl)}
                  className="w-full h-full border-0"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                  allowFullScreen
                  title={selectedVideo.title}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400">
                  <span>Video Preview Not Available</span>
                </div>
              )}
            </div>

            {/* Video Details & Tools footer */}
            <div className="p-4 bg-[#030d14] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs border-t border-[#0d2332]">
              <div className="space-y-1">
                <p className="text-slate-200 text-xs sm:text-sm font-medium">{selectedVideo.description}</p>
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  {selectedVideo.toolsUsed?.map((tool) => (
                    <span
                      key={tool}
                      className="px-2 py-0.5 rounded-md bg-[#092233] border border-[#133c57] text-[10px] text-cyan-300 font-mono"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[11px] px-2.5 py-1 rounded-lg bg-cyan-950 border border-cyan-700 text-cyan-300 font-mono font-bold">
                  {selectedVideo.client || 'Osman Goni (3646)'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Design High-Definition Lightbox Modal */}
      {selectedDesign && (
        <div
          id="design-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-2xl transition-all"
          onClick={() => setSelectedDesign(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-[#040e15] border border-cyan-500/40 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[94vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#0f293b] bg-[#030a0f]">
              <div className="flex items-center gap-2 overflow-hidden pr-3">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shrink-0" />
                <span className="text-xs sm:text-sm font-bold text-white font-mono truncate">
                  {lang === 'bn' && selectedDesign.titleBn ? selectedDesign.titleBn : selectedDesign.title}
                </span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setSelectedDesign(null)}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* High Definition Image Display */}
            <div className="relative flex-1 min-h-[300px] max-h-[68vh] overflow-auto bg-black flex items-center justify-center p-3">
              <img
                src={selectedDesign.image}
                alt={selectedDesign.title}
                className="max-h-[64vh] max-w-full object-contain rounded-xl shadow-2xl"
              />
            </div>

            {/* Modal Footer with metadata */}
            <div className="p-4 bg-[#030d14] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs border-t border-[#0d2332]">
              <div className="space-y-1">
                <p className="text-slate-200 text-xs sm:text-sm font-medium">{selectedDesign.description}</p>
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="px-2 py-0.5 rounded-md bg-[#0e273a] border border-[#174669] text-[10px] text-cyan-300 font-mono font-bold">
                    {selectedDesign.categoryLabel}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-black/60 border border-white/10 text-[10px] text-slate-300 font-mono">
                    {selectedDesign.dimensions}
                  </span>
                  {selectedDesign.toolsUsed?.map((tool) => (
                    <span
                      key={tool}
                      className="px-2 py-0.5 rounded-md bg-[#092233] border border-[#133c57] text-[10px] text-teal-300 font-mono"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[11px] px-2.5 py-1 rounded-lg bg-cyan-950 border border-cyan-700 text-cyan-300 font-mono font-bold">
                  {selectedDesign.client || 'Osman Goni (3646)'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
