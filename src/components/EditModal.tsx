import React, { useState } from 'react';
import {
  X,
  Save,
  RefreshCw,
  Upload,
  Sparkles,
  Check,
  User,
  Film,
  GraduationCap,
  Mail,
  FileText,
  Plus,
  Trash2,
  Download,
  Share2,
} from 'lucide-react';
import { PortfolioCustomization, VideoProject, EducationItem } from '../types';
import { VIDEO_PROJECTS, ACADEMIC_EDUCATION, SKILL_TRAINING } from '../data/portfolioData';

interface EditModalProps {
  customization: PortfolioCustomization;
  onSave: (updated: PortfolioCustomization) => void;
  onClose: () => void;
  onReset: () => void;
}

type TabType = 'hero' | 'projects' | 'education' | 'contact' | 'footer' | 'backup';

export const EditModal: React.FC<EditModalProps> = ({
  customization,
  onSave,
  onClose,
  onReset,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('hero');
  const [formData, setFormData] = useState<PortfolioCustomization>(() => ({
    ...customization,
    videoProjects: customization.videoProjects || [...VIDEO_PROJECTS],
    academicEducation: customization.academicEducation || [...ACADEMIC_EDUCATION],
    skillTraining: customization.skillTraining || [...SKILL_TRAINING],
  }));
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [newProject, setNewProject] = useState<Partial<VideoProject>>({
    title: '',
    category: 'commercial',
    categoryLabel: 'Commercial Promo',
    vimeoEmbedUrl: '',
    thumbnail: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80',
    client: '',
    duration: 'Promo',
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      onClose();
    }, 800);
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setFormData((prev) => ({ ...prev, profileImage: reader.result as string }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProject = () => {
    if (!newProject.title) return;
    const projectToAdd: VideoProject = {
      id: `custom-proj-${Date.now()}`,
      title: newProject.title || 'Untitled Project',
      titleBn: newProject.title || 'Untitled Project',
      category: newProject.category || 'commercial',
      categoryLabel: newProject.categoryLabel || 'Commercial Promo',
      vimeoEmbedUrl: newProject.vimeoEmbedUrl || '',
      thumbnail: newProject.thumbnail || 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80',
      duration: newProject.duration || 'Promo',
      client: newProject.client || 'Creative Client',
      aspectRatio: newProject.category === 'reel' ? '9:16' : '16:9',
      description: newProject.description || 'Custom crafted video production.',
      toolsUsed: ['Premiere Pro', 'After Effects'],
    };

    setFormData((prev) => ({
      ...prev,
      videoProjects: [...(prev.videoProjects || []), projectToAdd],
    }));

    setNewProject({
      title: '',
      category: 'commercial',
      categoryLabel: 'Commercial Promo',
      vimeoEmbedUrl: '',
      thumbnail: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80',
      client: '',
      duration: 'Promo',
      description: '',
    });
  };

  const handleDeleteProject = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      videoProjects: (prev.videoProjects || []).filter((p) => p.id !== id),
    }));
  };

  const handleExportJSON = () => {
    const jsonStr = JSON.stringify(formData, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `osman_portfolio_backup_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const parsed = JSON.parse(reader.result as string);
          setFormData({ ...formData, ...parsed });
          alert('Configuration imported successfully! Click Save to apply.');
        } catch {
          alert('Invalid JSON file format.');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div
      id="edit-portfolio-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] bg-[#05141e] border border-[#143a52] rounded-3xl shadow-2xl flex flex-col overflow-hidden text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#0f2d40] bg-[#030d14]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                Portfolio Full Studio Editor
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-950 border border-cyan-400 text-cyan-300">
                  সম্পূর্ণ নিয়ন্ত্রণ
                </span>
              </h3>
              <p className="text-[11px] text-slate-400">
                হোম পেজ থেকে শুরু করে ফুটার পর্যন্ত সমস্ত লেখা, প্রজেক্ট ও তথ্য এডিট করুন
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-[#113146] text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 px-4 sm:px-6 pt-3 border-b border-[#0f2d40] bg-[#041019] overflow-x-auto no-scrollbar">
          <button
            type="button"
            onClick={() => setActiveTab('hero')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all whitespace-nowrap border-b-2 ${
              activeTab === 'hero'
                ? 'border-cyan-400 text-cyan-300 bg-[#071c2b]'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-[#061724]'
            }`}
          >
            <User className="w-4 h-4" />
            <span>হোম ও প্রোফাইল</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('projects')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all whitespace-nowrap border-b-2 ${
              activeTab === 'projects'
                ? 'border-cyan-400 text-cyan-300 bg-[#071c2b]'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-[#061724]'
            }`}
          >
            <Film className="w-4 h-4" />
            <span>মাই প্রজেক্টস ({formData.videoProjects?.length || 0})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('education')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all whitespace-nowrap border-b-2 ${
              activeTab === 'education'
                ? 'border-cyan-400 text-cyan-300 bg-[#071c2b]'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-[#061724]'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>এডুকেশন ও কোর্স</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('contact')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all whitespace-nowrap border-b-2 ${
              activeTab === 'contact'
                ? 'border-cyan-400 text-cyan-300 bg-[#071c2b]'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-[#061724]'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>যোগাযোগ ও সোশ্যাল</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('footer')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all whitespace-nowrap border-b-2 ${
              activeTab === 'footer'
                ? 'border-cyan-400 text-cyan-300 bg-[#071c2b]'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-[#061724]'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>ফুটার ও কপিরাইট</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('backup')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all whitespace-nowrap border-b-2 ${
              activeTab === 'backup'
                ? 'border-cyan-400 text-cyan-300 bg-[#071c2b]'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-[#061724]'
            }`}
          >
            <Download className="w-4 h-4" />
            <span>ব্যাকআপ ও JSON</span>
          </button>
        </div>

        {/* Tab Content Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* TAB 1: HERO & PROFILE */}
          {activeTab === 'hero' && (
            <div className="space-y-5">
              {/* Profile Image & Upload */}
              <div className="p-4 rounded-2xl bg-[#030d14] border border-[#113146] flex flex-col sm:flex-row items-center gap-5">
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-cyan-400/60 shadow-lg shadow-cyan-500/20 shrink-0">
                  <img
                    src={formData.profileImage}
                    alt="Current Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 text-center sm:text-left space-y-2">
                  <span className="text-xs font-bold text-white block">
                    প্রোফাইল ছবি পরিবর্তন (Profile Picture)
                  </span>
                  <div className="flex flex-wrap items-center gap-2.5">
                    <label className="cursor-pointer px-3.5 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold flex items-center gap-1.5 transition-all shadow-md">
                      <Upload className="w-3.5 h-3.5" />
                      <span>ডিভাইস থেকে আপলোড</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageFileChange}
                        className="hidden"
                      />
                    </label>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, profileImage: '/osman_center_transparent.png' })}
                      className="px-3 py-1.5 rounded-xl bg-[#071d2b] border border-[#14405d] text-cyan-300 text-xs font-semibold hover:bg-cyan-950 transition-all"
                    >
                      ডিফল্ট ছবি সেট করুন
                    </button>
                  </div>
                  <input
                    type="text"
                    value={formData.profileImage}
                    onChange={(e) => setFormData({ ...formData, profileImage: e.target.value })}
                    placeholder="অথবা সরাসরি ইমেজ লিংক (URL) দিন"
                    className="w-full px-3 py-1.5 rounded-lg bg-[#02070a] border border-[#113146] text-[11px] text-slate-300 font-mono focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              {/* Names & Titles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    First Name (English)
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#030c12] border border-[#113146] text-white text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    Last Name / Highlight (English)
                  </label>
                  <input
                    type="text"
                    value={formData.taglineHighlight}
                    onChange={(e) => setFormData({ ...formData, taglineHighlight: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#030c12] border border-[#113146] text-white text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    নামের প্রথম অংশ (বাংলায়)
                  </label>
                  <input
                    type="text"
                    value={formData.nameBn}
                    onChange={(e) => setFormData({ ...formData, nameBn: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#030c12] border border-[#113146] text-white text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    নামের শেষ অংশ / হাইলাইট (বাংলায়)
                  </label>
                  <input
                    type="text"
                    value={formData.taglineBnHighlight}
                    onChange={(e) => setFormData({ ...formData, taglineBnHighlight: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#030c12] border border-[#113146] text-white text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    Designation / Title (English)
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#030c12] border border-[#113146] text-white text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    পদবী / টাইটেল (বাংলায়)
                  </label>
                  <input
                    type="text"
                    value={formData.titleBn}
                    onChange={(e) => setFormData({ ...formData, titleBn: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#030c12] border border-[#113146] text-white text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              {/* Bio & Intro Paragraph */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    Hero Bio Description (English)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.bioEn || formData.tagline}
                    onChange={(e) => setFormData({ ...formData, bioEn: e.target.value, tagline: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#030c12] border border-[#113146] text-white text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    বায়ো বর্ণনা (বাংলায়)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.bioBn || formData.taglineBn}
                    onChange={(e) => setFormData({ ...formData, bioBn: e.target.value, taglineBn: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#030c12] border border-[#113146] text-white text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              {/* Stats Numbers */}
              <div className="p-4 rounded-2xl bg-[#030d14] border border-[#113146]">
                <h4 className="text-xs font-bold text-white mb-3">হোম পেজের স্ট্যাটাস সংখ্যা (Stats Counters)</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Experience</label>
                    <input
                      type="text"
                      value={formData.yearsExperience || '3 Months'}
                      onChange={(e) => setFormData({ ...formData, yearsExperience: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg bg-[#02070a] border border-[#113146] text-xs text-white"
                      placeholder="e.g. 3 Months"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Completed Projects</label>
                    <input
                      type="text"
                      value={formData.projectsCompleted || '150+'}
                      onChange={(e) => setFormData({ ...formData, projectsCompleted: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg bg-[#02070a] border border-[#113146] text-xs text-white"
                      placeholder="e.g. 150+ Projects"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Total Video Views</label>
                    <input
                      type="text"
                      value={formData.viewsCount || '5M+'}
                      onChange={(e) => setFormData({ ...formData, viewsCount: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg bg-[#02070a] border border-[#113146] text-xs text-white"
                      placeholder="e.g. 5M+ Views"
                    />
                  </div>
                </div>
              </div>

              {/* Always Available for Work Badge Text */}
              <div className="p-4 rounded-2xl bg-[#030d14] border border-[#113146]">
                <h4 className="text-xs font-bold text-white mb-2 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  "Always Available For Work" ব্যাজের লেখা
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">English Subtext (সদা সর্বদা প্রস্তুত বার্তা)</label>
                    <input
                      type="text"
                      value={formData.availableSubtextEn || ''}
                      onChange={(e) => setFormData({ ...formData, availableSubtextEn: e.target.value })}
                      placeholder="Always ready to work, fully dedicated..."
                      className="w-full px-3 py-1.5 rounded-lg bg-[#02070a] border border-[#113146] text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">বাংলা বার্তা</label>
                    <input
                      type="text"
                      value={formData.availableSubtextBn || ''}
                      onChange={(e) => setFormData({ ...formData, availableSubtextBn: e.target.value })}
                      placeholder="সবসময় কাজের জন্য প্রস্তুত, যেকোনো কাজ করে দেওয়ার জন্য সদা সর্বদা প্রস্তুত।"
                      className="w-full px-3 py-1.5 rounded-lg bg-[#02070a] border border-[#113146] text-xs text-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PROJECTS MANAGER */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              {/* Add New Project Box */}
              <div className="p-4 rounded-2xl bg-[#030d14] border border-cyan-500/30">
                <h4 className="text-xs font-bold text-cyan-300 mb-3 flex items-center gap-1.5">
                  <Plus className="w-4 h-4" />
                  নতুন প্রজেক্ট যুক্ত করুন (Add New Video Project)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">প্রজেক্টের নাম (Project Title)</label>
                    <input
                      type="text"
                      value={newProject.title || ''}
                      onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                      placeholder="e.g. Ramadan Special Promo"
                      className="w-full px-3 py-1.5 rounded-lg bg-[#02070a] border border-[#113146] text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">ক্যাটাগরি (Category)</label>
                    <select
                      value={newProject.category || 'commercial'}
                      onChange={(e) => {
                        const cat = e.target.value as any;
                        setNewProject({
                          ...newProject,
                          category: cat,
                          categoryLabel: cat === 'commercial' ? 'Commercial Promo' : cat === 'reel' ? 'Short-Form Reel' : cat === 'documentary' ? 'Documentary' : 'Motion Design',
                        });
                      }}
                      className="w-full px-3 py-1.5 rounded-lg bg-[#02070a] border border-[#113146] text-xs text-white"
                    >
                      <option value="commercial">Commercial Promo (16:9)</option>
                      <option value="reel">Short-Form Reel (9:16)</option>
                      <option value="documentary">Documentary</option>
                      <option value="motion">Motion Graphics</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">ভিডিও লিংক (Vimeo / Direct Video URL)</label>
                    <input
                      type="text"
                      value={newProject.vimeoEmbedUrl || ''}
                      onChange={(e) => setNewProject({ ...newProject, vimeoEmbedUrl: e.target.value })}
                      placeholder="https://player.vimeo.com/video/..."
                      className="w-full px-3 py-1.5 rounded-lg bg-[#02070a] border border-[#113146] text-xs text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">থাম্বনেইল ইমেজ URL (Thumbnail Image)</label>
                    <input
                      type="text"
                      value={newProject.thumbnail || ''}
                      onChange={(e) => setNewProject({ ...newProject, thumbnail: e.target.value })}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full px-3 py-1.5 rounded-lg bg-[#02070a] border border-[#113146] text-xs text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">ক্লায়েন্টের নাম (Client Name)</label>
                    <input
                      type="text"
                      value={newProject.client || ''}
                      onChange={(e) => setNewProject({ ...newProject, client: e.target.value })}
                      placeholder="e.g. As-Sunnah Foundation / Islamic Media"
                      className="w-full px-3 py-1.5 rounded-lg bg-[#02070a] border border-[#113146] text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">সংক্ষিপ্ত বিবরণ (Description)</label>
                    <input
                      type="text"
                      value={newProject.description || ''}
                      onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                      placeholder="Cinematic pacing, sound design, color grading..."
                      className="w-full px-3 py-1.5 rounded-lg bg-[#02070a] border border-[#113146] text-xs text-white"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleAddProject}
                  disabled={!newProject.title}
                  className="px-4 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-bold text-xs flex items-center gap-1.5 transition-all disabled:opacity-50"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>প্রজেক্টটি যুক্ত করুন</span>
                </button>
              </div>

              {/* Existing Projects List */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-white">
                  বর্তমান প্রজেক্ট তালিকা ({formData.videoProjects?.length || 0} টি)
                </h4>
                {formData.videoProjects?.map((proj, idx) => (
                  <div
                    key={proj.id || idx}
                    className="p-3.5 rounded-2xl bg-[#030d14] border border-[#113146] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={proj.thumbnail}
                        alt=""
                        className="w-14 h-10 rounded-lg object-cover border border-[#133952]"
                      />
                      <div>
                        <span className="text-xs font-bold text-white block">{proj.title}</span>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[10px] px-2 py-0.5 rounded-md bg-cyan-950 text-cyan-300 border border-cyan-800">
                            {proj.categoryLabel}
                          </span>
                          <span className="text-[10px] text-slate-400">Client: {proj.client}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                      <button
                        type="button"
                        onClick={() => handleDeleteProject(proj.id)}
                        className="px-2.5 py-1.5 rounded-lg bg-red-950/60 border border-red-800/80 text-red-400 hover:bg-red-900 text-xs font-semibold flex items-center gap-1 transition-all"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>ডিলিট</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: EDUCATION & TRAINING */}
          {activeTab === 'education' && (
            <div className="space-y-4">
              <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-xs text-cyan-300">
                এখানে আপনার ইসলামিক স্টাডিজ ও প্রফেশনাল মাল্টিমিডিয়া কোর্সের তথ্য এডিট করতে পারেন:
              </div>
              <div className="space-y-4">
                {formData.academicEducation?.map((item, idx) => (
                  <div key={item.id || idx} className="p-4 rounded-2xl bg-[#030d14] border border-[#113146] space-y-3">
                    <span className="text-xs font-bold text-cyan-300 block">একাডেমিক ডিগ্রি #{idx + 1}</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">Degree (English)</label>
                        <input
                          type="text"
                          value={item.degree}
                          onChange={(e) => {
                            const updated = [...(formData.academicEducation || [])];
                            updated[idx] = { ...updated[idx], degree: e.target.value };
                            setFormData({ ...formData, academicEducation: updated });
                          }}
                          className="w-full px-3 py-1.5 rounded-lg bg-[#02070a] border border-[#113146] text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">ডিগ্রি (বাংলা)</label>
                        <input
                          type="text"
                          value={item.degreeBn}
                          onChange={(e) => {
                            const updated = [...(formData.academicEducation || [])];
                            updated[idx] = { ...updated[idx], degreeBn: e.target.value };
                            setFormData({ ...formData, academicEducation: updated });
                          }}
                          className="w-full px-3 py-1.5 rounded-lg bg-[#02070a] border border-[#113146] text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">Year / Timeline</label>
                        <input
                          type="text"
                          value={item.year}
                          onChange={(e) => {
                            const updated = [...(formData.academicEducation || [])];
                            updated[idx] = { ...updated[idx], year: e.target.value };
                            setFormData({ ...formData, academicEducation: updated });
                          }}
                          className="w-full px-3 py-1.5 rounded-lg bg-[#02070a] border border-[#113146] text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">Status / ব্যাচ</label>
                        <input
                          type="text"
                          value={item.status}
                          onChange={(e) => {
                            const updated = [...(formData.academicEducation || [])];
                            updated[idx] = { ...updated[idx], status: e.target.value };
                            setFormData({ ...formData, academicEducation: updated });
                          }}
                          className="w-full px-3 py-1.5 rounded-lg bg-[#02070a] border border-[#113146] text-xs text-white"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: CONTACT & SOCIALS */}
          {activeTab === 'contact' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    Phone & WhatsApp Number
                  </label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="01410401898"
                    className="w-full px-3 py-2 rounded-xl bg-[#030c12] border border-[#113146] text-white text-xs focus:outline-none focus:border-cyan-400 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="osmangoni.editor@gmail.com"
                    className="w-full px-3 py-2 rounded-xl bg-[#030c12] border border-[#113146] text-white text-xs focus:outline-none focus:border-cyan-400 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    LinkedIn Profile URL
                  </label>
                  <input
                    type="text"
                    value={formData.linkedInUrl || ''}
                    onChange={(e) => setFormData({ ...formData, linkedInUrl: e.target.value })}
                    placeholder="https://www.linkedin.com/in/osman-goni100"
                    className="w-full px-3 py-2 rounded-xl bg-[#030c12] border border-[#113146] text-white text-xs focus:outline-none focus:border-cyan-400 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    Telegram Profile URL
                  </label>
                  <input
                    type="text"
                    value={formData.telegramUrl || ''}
                    onChange={(e) => setFormData({ ...formData, telegramUrl: e.target.value })}
                    placeholder="https://t.me/+8801410401898"
                    className="w-full px-3 py-2 rounded-xl bg-[#030c12] border border-[#113146] text-white text-xs focus:outline-none focus:border-cyan-400 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    Facebook Profile URL
                  </label>
                  <input
                    type="text"
                    value={formData.facebookUrl}
                    onChange={(e) => setFormData({ ...formData, facebookUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#030c12] border border-[#113146] text-white text-xs focus:outline-none focus:border-cyan-400 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    Instagram Profile URL
                  </label>
                  <input
                    type="text"
                    value={formData.instagramUrl}
                    onChange={(e) => setFormData({ ...formData, instagramUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#030c12] border border-[#113146] text-white text-xs focus:outline-none focus:border-cyan-400 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    Location Address (English)
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#030c12] border border-[#113146] text-white text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    ঠিকানা (বাংলায়)
                  </label>
                  <input
                    type="text"
                    value={formData.addressBn}
                    onChange={(e) => setFormData({ ...formData, addressBn: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#030c12] border border-[#113146] text-white text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: FOOTER & LEGAL */}
          {activeTab === 'footer' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  Footer Headline / Blurb (English)
                </label>
                <textarea
                  rows={2}
                  value={formData.footerBioEn || ''}
                  onChange={(e) => setFormData({ ...formData, footerBioEn: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#030c12] border border-[#113146] text-white text-xs focus:outline-none focus:border-cyan-400"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  ফুটার বিবরণী (বাংলায়)
                </label>
                <textarea
                  rows={2}
                  value={formData.footerBioBn || ''}
                  onChange={(e) => setFormData({ ...formData, footerBioBn: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#030c12] border border-[#113146] text-white text-xs focus:outline-none focus:border-cyan-400"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  Copyright Notice
                </label>
                <input
                  type="text"
                  value={formData.copyrightNotice || ''}
                  onChange={(e) => setFormData({ ...formData, copyrightNotice: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#030c12] border border-[#113146] text-white text-xs focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>
          )}

          {/* TAB 6: BACKUP & JSON */}
          {activeTab === 'backup' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#030d14] border border-[#113146] space-y-3">
                <h4 className="text-xs font-bold text-white flex items-center gap-2">
                  <Download className="w-4 h-4 text-cyan-400" />
                  কনফিগারেশন ব্যাকআপ ও রিস্টোর
                </h4>
                <p className="text-xs text-slate-400">
                  আপনার সম্পূর্ণ পোর্টফোলিও সেটিংস ও প্রজেক্ট ডেটা কম্পিউটারে ডাউনলোড করে ব্যাকআপ রাখতে পারেন, অথবা পূর্বের ব্যাকআপ ফাইল ইমপোর্ট করতে পারেন।
                </p>
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleExportJSON}
                    className="px-4 py-2 rounded-xl bg-[#082233] border border-cyan-500/50 hover:bg-cyan-950 text-cyan-300 text-xs font-bold flex items-center gap-2 transition-all"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download JSON Backup</span>
                  </button>
                  <label className="cursor-pointer px-4 py-2 rounded-xl bg-[#082233] border border-[#113146] hover:bg-[#0c2e44] text-slate-300 text-xs font-bold flex items-center gap-2 transition-all">
                    <Upload className="w-4 h-4" />
                    <span>Import JSON File</span>
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleImportJSON}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Modal Footer Controls */}
          <div className="pt-4 border-t border-[#0f2d40] flex flex-wrap items-center justify-between gap-3 bg-[#05141e] sticky bottom-0">
            <button
              type="button"
              onClick={onReset}
              className="px-3.5 py-2 rounded-xl bg-red-950/40 border border-red-800/60 hover:bg-red-900/60 text-red-300 text-xs font-semibold flex items-center gap-1.5 transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>রিসেট ডিফল্ট (Reset)</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-[#071d2b] border border-[#14405d] hover:bg-[#0c2c40] text-slate-300 text-xs font-semibold transition-all"
              >
                বাতিল (Cancel)
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-black text-xs flex items-center gap-1.5 shadow-lg shadow-cyan-500/30 transition-all cursor-pointer"
              >
                {saveSuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>সেভ সফল হয়েছে!</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>পরিবর্তন সেভ করুন</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
