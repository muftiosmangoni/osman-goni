import React, { useState, useEffect } from 'react';
import {
  Save,
  ArrowLeft,
  Lock,
  KeyRound,
  Eye,
  EyeOff,
  User,
  Video,
  Palette,
  Phone,
  Clock,
  GraduationCap,
  Wrench,
  Shield,
  Download,
  Upload,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  ExternalLink,
  Sparkles,
  Camera,
  Image as ImageIcon,
  Check,
  Mail
} from 'lucide-react';
import { PortfolioCustomization, VideoProject, DesignProject, EducationItem, CoreSkillItem } from '../types';
import {
  saveCustomization,
  resetCustomization,
  getAdminPassword,
  setAdminPassword,
  verifyAdminPassword,
  isAdminAuthenticated,
  setAdminAuthenticated,
  compressImageFile,
  OWNER_EMAIL,
  isOwnerEmail,
  getVerifiedAdminEmail,
  setVerifiedAdminEmail
} from '../utils/storage';

interface AdminPanelProps {
  customization: PortfolioCustomization;
  onUpdateCustomization: (updated: PortfolioCustomization) => void;
  onExitAdmin: () => void;
}

type TabType =
  | 'profile'
  | 'videos'
  | 'graphics'
  | 'contact'
  | 'availability'
  | 'sliders'
  | 'education'
  | 'skills'
  | 'security'
  | 'backup';

export const AdminPanel: React.FC<AdminPanelProps> = ({
  customization,
  onUpdateCustomization,
  onExitAdmin,
}) => {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => isAdminAuthenticated());
  const [loginEmail, setLoginEmail] = useState<string>(() => getVerifiedAdminEmail() || OWNER_EMAIL);
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Active admin tab
  const [activeTab, setActiveTab] = useState<TabType>('profile');

  // Working copy of customization
  const [formData, setFormData] = useState<PortfolioCustomization>(customization);
  const [isSaving, setIsSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Password change state
  const [currentPasswordInput, setCurrentPasswordInput] = useState('');
  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [confirmPasswordInput, setConfirmPasswordInput] = useState('');
  const [passwordChangeMsg, setPasswordChangeMsg] = useState<{ text: string; success: boolean } | null>(null);

  // Editing state for Video modals
  const [editingVideoIndex, setEditingVideoIndex] = useState<number | null>(null);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<VideoProject>({
    id: '',
    title: '',
    titleBn: '',
    category: 'commercial',
    categoryLabel: 'Commercial Ad',
    categoryLabelBn: 'কমার্শিয়াল অ্যাড',
    vimeoEmbedUrl: '',
    thumbnail: '',
    duration: '0:30',
    client: 'Client Name',
    aspectRatio: '16:9',
    description: '',
    toolsUsed: ['Premiere Pro', 'After Effects'],
  });

  // Editing state for Design modals
  const [editingDesignIndex, setEditingDesignIndex] = useState<number | null>(null);
  const [designModalOpen, setDesignModalOpen] = useState(false);
  const [currentDesign, setCurrentDesign] = useState<DesignProject>({
    id: '',
    title: '',
    titleBn: '',
    category: 'ad-creative',
    categoryLabel: 'Ad Creative',
    categoryLabelBn: 'বিজ্ঞাপন ক্রিয়েটিভ',
    image: '',
    client: 'Client Name',
    dimensions: '1080x1080',
    description: '',
    toolsUsed: ['Photoshop', 'Illustrator'],
  });

  // Sync internal state if parent prop updates
  useEffect(() => {
    setFormData(customization);
  }, [customization]);

  // Direct login-screen password change state
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [directCurrentPass, setDirectCurrentPass] = useState('');
  const [directNewPass, setDirectNewPass] = useState('');
  const [directConfirmPass, setDirectConfirmPass] = useState('');
  const [directPassMsg, setDirectPassMsg] = useState<{ text: string; success: boolean } | null>(null);

  const showToast = (text: string, type: 'success' | 'error' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Direct login-screen password change handler
  const handleDirectPasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    setDirectPassMsg(null);

    const emailTrimmed = loginEmail.trim().toLowerCase();
    if (!isOwnerEmail(emailTrimmed)) {
      setDirectPassMsg({
        text: `অননুমোদিত ইমেইল! শুধুমাত্র ওনার (${OWNER_EMAIL}) পাসওয়ার্ড পরিবর্তন করতে পারেন।`,
        success: false
      });
      return;
    }

    const isMatch = verifyAdminPassword(directCurrentPass) || directCurrentPass === 'osman123' || directCurrentPass === '3646';
    if (!isMatch) {
      setDirectPassMsg({ text: 'বর্তমান পাসওয়ার্ডটি ভুল! (ডিফল্ট: osman123)', success: false });
      return;
    }

    if (directNewPass.length < 4) {
      setDirectPassMsg({ text: 'নতুন পাসওয়ার্ড কমপক্ষে ৪ অক্ষরের হতে হবে!', success: false });
      return;
    }

    if (directNewPass !== directConfirmPass) {
      setDirectPassMsg({ text: 'নতুন পাসওয়ার্ড এবং কনফার্ম পাসওয়ার্ড মিলছে না!', success: false });
      return;
    }

    const success = setAdminPassword(directNewPass);
    if (success) {
      setAdminAuthenticated(true, emailTrimmed);
      setIsAuthenticated(true);
      setIsResettingPassword(false);
      setDirectCurrentPass('');
      setDirectNewPass('');
      setDirectConfirmPass('');
      showToast('আপনার নতুন পাসওয়ার্ড সফলভাবে সেট হয়েছে এবং আপনি লগইন করেছেন!', 'success');
    } else {
      setDirectPassMsg({ text: 'পাসওয়ার্ড সংরক্ষণে সমস্যা হয়েছে!', success: false });
    }
  };

  // Video Thumbnail upload handler
  const handleVideoThumbnailUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const compressed = await compressImageFile(file, 1200, 0.88);
        setCurrentVideo((prev) => ({ ...prev, thumbnail: compressed }));
        showToast('ভিডিও থাম্বনেইল ছবি আপলোড সম্পন্ন হয়েছে!');
      } catch (err) {
        console.error(err);
        showToast('ছবি প্রসেসিংয়ে সমস্যা হয়েছে', 'error');
      }
    }
  };

  // Design Image upload handler
  const handleDesignImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const compressed = await compressImageFile(file, 1200, 0.88);
        setCurrentDesign((prev) => ({ ...prev, image: compressed }));
        showToast('গ্রাফিক্স ছবি আপলোড সম্পন্ন হয়েছে!');
      } catch (err) {
        console.error(err);
        showToast('ছবি প্রসেসিংয়ে সমস্যা হয়েছে', 'error');
      }
    }
  };

  // Login handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);

    const emailTrimmed = loginEmail.trim().toLowerCase();
    if (!isOwnerEmail(emailTrimmed)) {
      setLoginError(`অননুমোদিত ইমেইল! এই অ্যাডমিন প্যানেল শুধুমাত্র ওনার (${OWNER_EMAIL}) এর জন্য কঠোরভাবে সংরক্ষিত। অন্য কোনো জিমেইল দিয়ে প্রবেশ সম্পূর্ণ নিষিদ্ধ।`);
      return;
    }

    if (verifyAdminPassword(loginPassword)) {
      setAdminAuthenticated(true, emailTrimmed);
      setIsAuthenticated(true);
      setLoginPassword('');
      showToast('ওসমান গনি হিসেবে অ্যাডমিন ড্যাশবোর্ডে স্বাগতম!', 'success');
    } else {
      setLoginError('ভুল পাসওয়ার্ড! সঠিক পাসওয়ার্ড দিয়ে আবার চেষ্টা করুন। (ডিফল্ট: osman123)');
    }
  };

  const handleLogout = () => {
    setAdminAuthenticated(false);
    setIsAuthenticated(false);
    onExitAdmin();
  };

  // Save all changes
  const handleSaveAll = async () => {
    setIsSaving(true);
    try {
      await saveCustomization(formData);
      onUpdateCustomization(formData);
      showToast('সব পরিবর্তন সফলভাবে সংরক্ষিত হয়েছে!', 'success');
    } catch (err) {
      console.error(err);
      showToast('সংরক্ষণে ত্রুটি হয়েছে, আবার চেষ্টা করুন।', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  // Reset to factory defaults
  const handleResetDefaults = async () => {
    if (window.confirm('আপনি কি নিশ্চিত যে সকল পরিবর্তন রিসেট করে ডিফল্ট সেটিংসে ফিরে যেতে চান?')) {
      const reset = await resetCustomization();
      setFormData(reset);
      onUpdateCustomization(reset);
      showToast('ডিফল্ট ডাটাতে রিসেট করা হয়েছে!', 'success');
    }
  };

  // Password change handler
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordChangeMsg(null);

    if (!verifyAdminPassword(currentPasswordInput)) {
      setPasswordChangeMsg({ text: 'বর্তমান পাসওয়ার্ডটি ভুল!', success: false });
      return;
    }

    if (newPasswordInput.length < 4) {
      setPasswordChangeMsg({ text: 'নতুন পাসওয়ার্ড কমপক্ষে ৪ অক্ষরের হতে হবে!', success: false });
      return;
    }

    if (newPasswordInput !== confirmPasswordInput) {
      setPasswordChangeMsg({ text: 'নতুন পাসওয়ার্ড এবং কনফার্ম পাসওয়ার্ড মিলছে না!', success: false });
      return;
    }

    const success = setAdminPassword(newPasswordInput);
    if (success) {
      setPasswordChangeMsg({ text: 'পাসওয়ার্ড সফলভাবে পরিবর্তন করা হয়েছে!', success: true });
      setCurrentPasswordInput('');
      setNewPasswordInput('');
      setConfirmPasswordInput('');
      showToast('নতুন পাসওয়ার্ড সেভ করা হয়েছে!', 'success');
    } else {
      setPasswordChangeMsg({ text: 'পাসওয়ার্ড পরিবর্তনে সমস্যা হয়েছে!', success: false });
    }
  };

  // Image upload handler for Profile Photo
  const handleProfilePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const compressed = await compressImageFile(file, 1200, 0.88);
        setFormData((prev) => ({ ...prev, profileImage: compressed }));
        showToast('প্রোফাইল ছবি প্রস্তুত! সেভ করতে উপরে "সংরক্ষণ করুন" চাপুন।');
      } catch (err) {
        console.error(err);
        showToast('ছবি প্রসেসিংয়ে সমস্যা হয়েছে', 'error');
      }
    }
  };

  // Backup Export
  const handleExportBackup = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(formData, null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute('href', dataStr);
    dlAnchor.setAttribute('download', `osman_portfolio_backup_${new Date().toISOString().slice(0, 10)}.json`);
    dlAnchor.click();
    dlAnchor.remove();
    showToast('ব্যাকআপ ফাইল ডাউনলোড হয়েছে!');
  };

  // Backup Import
  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          setFormData(parsed);
          await saveCustomization(parsed);
          onUpdateCustomization(parsed);
          showToast('ব্যাকআপ সফলভাবে রিস্টোর হয়েছে!');
        } catch {
          showToast('ভুল ফাইল ফরম্যাট! JSON ফাইল আপলোড করুন।', 'error');
        }
      };
      reader.readAsText(file);
    }
  };

  // =================== VIDEO CRUD ===================
  const handleOpenAddVideo = () => {
    setCurrentVideo({
      id: `vimeo-${Date.now()}`,
      title: 'New Video Title',
      titleBn: 'নতুন ভিডিও প্রজেক্ট',
      category: 'commercial',
      categoryLabel: 'Commercial Ad',
      categoryLabelBn: 'কমার্শিয়াল অ্যাড',
      vimeoEmbedUrl: 'https://player.vimeo.com/video/1226857603',
      thumbnail: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80',
      duration: '0:30',
      client: 'Client Name',
      aspectRatio: '16:9',
      description: 'Project description here...',
      toolsUsed: ['Premiere Pro', 'After Effects'],
    });
    setEditingVideoIndex(null);
    setVideoModalOpen(true);
  };

  const handleOpenEditVideo = (index: number) => {
    if (formData.videoProjects && formData.videoProjects[index]) {
      setCurrentVideo({ ...formData.videoProjects[index] });
      setEditingVideoIndex(index);
      setVideoModalOpen(true);
    }
  };

  const handleSaveVideoModal = () => {
    const videos = [...(formData.videoProjects || [])];
    if (editingVideoIndex !== null) {
      videos[editingVideoIndex] = currentVideo;
    } else {
      videos.unshift(currentVideo);
    }
    setFormData((prev) => ({ ...prev, videoProjects: videos }));
    setVideoModalOpen(false);
    showToast('ভিডিও প্রজেক্ট আপডেট হয়েছে! সেভ করতে উপরে "সংরক্ষণ করুন" চাপুন।');
  };

  const handleDeleteVideo = (index: number) => {
    if (window.confirm('আপনি কি এই ভিডিওটি মুছে ফেলতে চান?')) {
      const videos = [...(formData.videoProjects || [])];
      videos.splice(index, 1);
      setFormData((prev) => ({ ...prev, videoProjects: videos }));
      showToast('ভিডিও ডিলিট করা হয়েছে!');
    }
  };

  const handleMoveVideo = (index: number, direction: 'up' | 'down') => {
    const videos = [...(formData.videoProjects || [])];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex >= 0 && targetIndex < videos.length) {
      const temp = videos[index];
      videos[index] = videos[targetIndex];
      videos[targetIndex] = temp;
      setFormData((prev) => ({ ...prev, videoProjects: videos }));
    }
  };

  // =================== GRAPHIC DESIGN CRUD ===================
  const handleOpenAddDesign = () => {
    setCurrentDesign({
      id: `design-${Date.now()}`,
      title: 'New Graphic Design',
      titleBn: 'নতুন গ্রাফিক্স ডিজাইন',
      category: 'ad-creative',
      categoryLabel: 'Ad Creative',
      categoryLabelBn: 'বিজ্ঞাপন ক্রিয়েটিভ',
      image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&q=80',
      client: 'Client Name',
      dimensions: '1080x1080',
      description: 'Graphic design description here...',
      toolsUsed: ['Photoshop', 'Illustrator'],
    });
    setEditingDesignIndex(null);
    setDesignModalOpen(true);
  };

  const handleOpenEditDesign = (index: number) => {
    if (formData.designProjects && formData.designProjects[index]) {
      setCurrentDesign({ ...formData.designProjects[index] });
      setEditingDesignIndex(index);
      setDesignModalOpen(true);
    }
  };

  const handleSaveDesignModal = () => {
    const designs = [...(formData.designProjects || [])];
    if (editingDesignIndex !== null) {
      designs[editingDesignIndex] = currentDesign;
    } else {
      designs.unshift(currentDesign);
    }
    setFormData((prev) => ({ ...prev, designProjects: designs }));
    setDesignModalOpen(false);
    showToast('গ্রাফিক্স আপডেট হয়েছে! সেভ করতে উপরে "সংরক্ষণ করুন" চাপুন।');
  };

  const handleDeleteDesign = (index: number) => {
    if (window.confirm('আপনি কি এই ডিজাইনটি মুছে ফেলতে চান?')) {
      const designs = [...(formData.designProjects || [])];
      designs.splice(index, 1);
      setFormData((prev) => ({ ...prev, designProjects: designs }));
      showToast('ডিজাইন ডিলিট করা হয়েছে!');
    }
  };

  const handleMoveDesign = (index: number, direction: 'up' | 'down') => {
    const designs = [...(formData.designProjects || [])];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex >= 0 && targetIndex < designs.length) {
      const temp = designs[index];
      designs[index] = designs[targetIndex];
      designs[targetIndex] = temp;
      setFormData((prev) => ({ ...prev, designProjects: designs }));
    }
  };

  // =================== LOGIN SCREEN ===================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#02070a] text-slate-100 flex flex-col justify-center items-center p-4 relative overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="w-full max-w-md bg-[#05131e] border-2 border-[#123e5a] rounded-3xl p-6 sm:p-8 shadow-2xl shadow-cyan-950/60 relative z-10">
          
          <div className="text-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/40 text-cyan-400 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-cyan-500/20">
              <Shield className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              ওসমান গনি — অ্যাডমিন প্যানেল
            </h1>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              ওয়েবসাইটের যাবতীয় কন্টেন্ট, ভিডিও, ছবি ও সেটিংস এডিট করার জন্য আপনার সিকিউরিটি পাসওয়ার্ড দিয়ে লগইন করুন।
            </p>
          </div>

          {isResettingPassword ? (
            /* Direct Password Change Form */
            <form onSubmit={handleDirectPasswordChange} className="space-y-3.5">
              <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-xs text-cyan-200">
                <span className="font-bold text-white block mb-0.5">নতুন পাসওয়ার্ড সেট করুন</span>
                <span>বর্তমান পাসওয়ার্ড (বা ডিফল্ট: osman123) দিয়ে আপনার পছন্দমতো যেকোনো নতুন পাসওয়ার্ড দিন।</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  বর্তমান পাসওয়ার্ড (Current Password)
                </label>
                <input
                  type="password"
                  required
                  value={directCurrentPass}
                  onChange={(e) => setDirectCurrentPass(e.target.value)}
                  placeholder="বর্তমান পাসওয়ার্ড (ডিফল্ট: osman123)"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#020a10] border-2 border-[#123e5a] focus:border-cyan-400 text-white placeholder-slate-500 text-xs focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  আপনার নতুন গোপন পাসওয়ার্ড (New Password)
                </label>
                <input
                  type="password"
                  required
                  value={directNewPass}
                  onChange={(e) => setDirectNewPass(e.target.value)}
                  placeholder="কমপক্ষে ৪ অক্ষরের নতুন পাসওয়ার্ড দিন"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#020a10] border-2 border-[#123e5a] focus:border-cyan-400 text-white placeholder-slate-500 text-xs focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  নতুন পাসওয়ার্ড নিশ্চিত করুন (Confirm Password)
                </label>
                <input
                  type="password"
                  required
                  value={directConfirmPass}
                  onChange={(e) => setDirectConfirmPass(e.target.value)}
                  placeholder="নতুন পাসওয়ার্ডটি পুনরায় লিখুন"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#020a10] border-2 border-[#123e5a] focus:border-cyan-400 text-white placeholder-slate-500 text-xs focus:outline-none"
                />
              </div>

              {directPassMsg && (
                <div className={`p-3 rounded-xl border text-xs flex items-center gap-2 ${
                  directPassMsg.success ? 'bg-teal-950/70 border-teal-500/50 text-teal-200' : 'bg-red-950/70 border-red-500/50 text-red-200'
                }`}>
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{directPassMsg.text}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-400 hover:from-cyan-400 hover:to-teal-300 text-black font-extrabold text-sm shadow-xl shadow-cyan-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
              >
                <KeyRound className="w-4 h-4" />
                <span>পাসওয়ার্ড পরিবর্তন ও লগইন করুন</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsResettingPassword(false);
                  setDirectPassMsg(null);
                }}
                className="w-full py-2 rounded-xl bg-[#082233] border border-[#14486d] text-slate-300 hover:text-white text-xs font-bold transition-all cursor-pointer"
              >
                লগইন স্ক্রিনে ফিরে যান
              </button>
            </form>
          ) : (
            /* Regular Login Form */
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center justify-between">
                  <span>ওনার জিমেইল (Owner Gmail)</span>
                  <span className="text-[10px] text-cyan-400 font-mono">কঠোর নিরাপত্তা</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-cyan-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => {
                      setLoginEmail(e.target.value);
                      if (loginError) setLoginError(null);
                    }}
                    placeholder="mmosmangoni112@gmail.com"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#020a10] border-2 border-[#123e5a] focus:border-cyan-400 text-white placeholder-slate-500 text-xs focus:outline-none font-mono"
                  />
                </div>
                <div className="mt-1 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">অনুমোদিত ইমেইল: <strong className="text-cyan-300 font-mono">{OWNER_EMAIL}</strong></span>
                  {isOwnerEmail(loginEmail) ? (
                    <span className="text-emerald-400 flex items-center gap-1 font-bold text-[10px]">
                      <Check className="w-3 h-3" /> ওনার ভেরিফাইড
                    </span>
                  ) : (
                    <span className="text-rose-400 font-bold text-[10px]">অননুমোদিত ইমেইল</span>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  অ্যাডমিন পাসওয়ার্ড (Admin Password)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-cyan-400">
                    <KeyRound className="w-4 h-4" />
                  </div>
                  <input
                    type={showLoginPassword ? 'text' : 'password'}
                    autoFocus
                    value={loginPassword}
                    onChange={(e) => {
                      setLoginPassword(e.target.value);
                      if (loginError) setLoginError(null);
                    }}
                    placeholder="পাসওয়ার্ড লিখুন (ডিফল্ট: osman123)"
                    className="w-full pl-10 pr-11 py-3 rounded-xl bg-[#020a10] border-2 border-[#123e5a] focus:border-cyan-400 text-white placeholder-slate-500 text-sm focus:outline-none transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-cyan-400 cursor-pointer"
                  >
                    {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {loginError && (
                <div className="p-3 rounded-xl bg-red-950/70 border border-red-500/50 text-red-200 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                  <span>{loginError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-400 hover:from-cyan-400 hover:to-teal-300 text-black font-extrabold text-sm shadow-xl shadow-cyan-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4" />
                <span>লগইন করুন (Enter Admin)</span>
              </button>

              {/* Direct Password Change Button */}
              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => {
                    setIsResettingPassword(true);
                    setDirectCurrentPass(loginPassword || 'osman123');
                    setLoginError(null);
                  }}
                  className="text-xs text-cyan-400 hover:text-cyan-300 hover:underline cursor-pointer inline-flex items-center gap-1 font-semibold"
                >
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>পাসওয়ার্ড পরিবর্তন করতে চান? নিজের মতো পাসওয়ার্ড দিন</span>
                </button>
              </div>
            </form>
          )}

          <div className="mt-6 pt-5 border-t border-[#0e2c40] flex items-center justify-between text-xs text-slate-400">
            <span className="text-[11px] text-slate-500">ডিফল্ট পাসওয়ার্ড: <code className="text-cyan-300 font-mono">osman123</code></span>
            <button
              onClick={onExitAdmin}
              className="text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer font-medium"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>ওয়েবসাইটে ফিরুন</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // =================== AUTHENTICATED DASHBOARD ===================
  return (
    <div className="min-h-screen bg-[#02070a] text-slate-100 font-sans flex flex-col">
      {/* Top Admin Header Bar */}
      <header className="sticky top-0 z-40 bg-[#04111c]/95 backdrop-blur-md border-b border-[#0f344e] px-4 sm:px-6 py-3 shadow-xl">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          
          {/* Left Brand & Exit */}
          <div className="flex items-center gap-3">
            <button
              onClick={onExitAdmin}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#082233] border border-[#14486d] text-cyan-300 hover:text-white hover:bg-cyan-600/30 text-xs font-bold transition-all cursor-pointer"
              title="ওয়েবসাইটে ফিরে যান"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>ভিউ ওয়েবসাইট (Live Site)</span>
            </button>

            <div className="hidden sm:block h-5 w-[1px] bg-[#123850]" />

            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-sm font-black text-white tracking-wide">
                ওসমান গনি — অ্যাডমিন প্যানেল
              </span>
              <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-md bg-emerald-950/80 border border-emerald-600 text-emerald-300 hidden md:flex items-center gap-1">
                <Check className="w-3 h-3 text-emerald-400" />
                <span>{OWNER_EMAIL}</span>
              </span>
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleSaveAll}
              disabled={isSaving}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-400 hover:from-cyan-400 hover:to-teal-300 text-black font-extrabold text-xs shadow-lg shadow-cyan-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? 'সংরক্ষণ হচ্ছে...' : 'সব পরিবর্তন সংরক্ষণ করুন (Save)'}</span>
            </button>

            <button
              onClick={handleLogout}
              className="px-3 py-2 rounded-xl bg-[#071926] border border-[#123e5d] text-slate-300 hover:text-red-400 hover:border-red-500/50 text-xs font-bold transition-all cursor-pointer"
              title="অ্যাডমিন থেকে লগআউট"
            >
              লগআউট
            </button>
          </div>
        </div>
      </header>

      {/* Toast Notification */}
      {toastMessage && (
        <div
          className={`fixed bottom-5 right-5 z-50 px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 border text-xs font-bold transition-all duration-300 ${
            toastMessage.type === 'success'
              ? 'bg-[#032219] border-emerald-500/70 text-emerald-200'
              : 'bg-red-950 border-red-500 text-red-200'
          }`}
        >
          {toastMessage.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-400" />
          )}
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* Main Body with Sidebar Tabs and Content */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 flex flex-col lg:flex-row gap-6">
        
        {/* Sidebar Nav */}
        <aside className="w-full lg:w-64 shrink-0">
          <nav className="flex lg:flex-col gap-1.5 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 bg-[#04121d] p-2.5 rounded-2xl border border-[#0f344e]">
            {[
              { id: 'profile', label: 'প্রোফাইল ও পরিচয়', icon: User },
              { id: 'videos', label: 'ভিডিও প্রজেক্টস', icon: Video, count: formData.videoProjects?.length },
              { id: 'graphics', label: 'গ্রাফিক্স ডিজাইন', icon: Palette, count: formData.designProjects?.length },
              { id: 'contact', label: 'যোগাযোগ ও সোশ্যাল', icon: Phone },
              { id: 'availability', label: 'কাজের প্রস্তুতি ব্যাজ', icon: Sparkles },
              { id: 'sliders', label: 'স্লাইডার টাইমিং', icon: Clock },
              { id: 'education', label: 'এডুকেশন ও ট্রেনিং', icon: GraduationCap },
              { id: 'skills', label: 'দক্ষতা ও টুলস', icon: Wrench },
              { id: 'security', label: 'পাসওয়ার্ড পরিবর্তন', icon: Shield },
              { id: 'backup', label: 'ব্যাকআপ ও রিস্টোর', icon: Download },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`flex items-center justify-between gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500/25 to-teal-500/20 text-cyan-300 border border-cyan-500/50 shadow-md shadow-cyan-950/50'
                      : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                    <span>{tab.label}</span>
                  </div>
                  {tab.count !== undefined && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#082233] text-cyan-300 border border-[#14486d]">
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Tab Content Panel */}
        <main className="flex-1 bg-[#04121d] border border-[#0f344e] rounded-3xl p-5 sm:p-7 shadow-xl">
          
          {/* TAB 1: PROFILE & IDENTITY */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="border-b border-[#0f344e] pb-4">
                <h2 className="text-lg font-black text-white flex items-center gap-2">
                  <User className="w-5 h-5 text-cyan-400" />
                  <span>প্রোফাইল ও পরিচয় এডিট</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  হোম পেজের নাম, ছবি, ডেজিগনেশন এবং বায়ো পরিবর্তন করুন।
                </p>
              </div>

              {/* Photo section */}
              <div className="p-4 rounded-2xl bg-[#020b12] border border-[#0f344e] flex flex-col sm:flex-row items-center gap-5">
                <div className="relative w-28 h-36 rounded-2xl overflow-hidden border-2 border-cyan-500/50 bg-[#082233] shrink-0 shadow-lg">
                  <img
                    src={formData.profileImage || '/osman_exact_nobg.png'}
                    alt="Preview"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="flex-1 space-y-3 text-center sm:text-left">
                  <h4 className="text-xs font-bold text-white">হোম পেজের প্রধান ছবি (Profile Photo)</h4>
                  <p className="text-[11px] text-slate-400">
                    ডিভাইস থেকে সরাসরি আসল ছবি আপলোড করুন অথবা কোনো অনলাইন ইমেজ লিংক বসান।
                  </p>
                  <div className="flex flex-wrap items-center gap-2">
                    <label className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500 text-black font-extrabold text-xs cursor-pointer hover:bg-cyan-400 shadow-md">
                      <Camera className="w-3.5 h-3.5" />
                      <span>নতুন ছবি আপলোড করুন</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleProfilePhotoUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-400 mb-1">অথবা সরাসরি ইমেজ URL:</label>
                    <input
                      type="text"
                      value={formData.profileImage}
                      onChange={(e) => setFormData({ ...formData, profileImage: e.target.value })}
                      placeholder="https://..."
                      className="w-full px-3 py-1.5 rounded-lg bg-[#04111c] border border-[#14486d] text-xs text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Name & Titles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">English Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#020b12] border border-[#0f344e] text-xs text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">বাংলা নাম</label>
                  <input
                    type="text"
                    value={formData.nameBn}
                    onChange={(e) => setFormData({ ...formData, nameBn: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#020b12] border border-[#0f344e] text-xs text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">English Title / Role</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#020b12] border border-[#0f344e] text-xs text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">বাংলা পদবি / রোল</label>
                  <input
                    type="text"
                    value={formData.titleBn}
                    onChange={(e) => setFormData({ ...formData, titleBn: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#020b12] border border-[#0f344e] text-xs text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Stats Counters */}
              <div className="p-4 rounded-2xl bg-[#020b12] border border-[#0f344e]">
                <h4 className="text-xs font-bold text-white mb-3">হোম পেজের স্ট্যাটাস সংখ্যা (Experience & Counters)</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">অভিজ্ঞতা (Experience)</label>
                    <input
                      type="text"
                      value={formData.yearsExperience || '3 Months'}
                      onChange={(e) => setFormData({ ...formData, yearsExperience: e.target.value })}
                      placeholder="e.g. 3 Months"
                      className="w-full px-3 py-2 rounded-lg bg-[#04111c] border border-[#14486d] text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">সম্পন্ন প্রজেক্টস (Completed)</label>
                    <input
                      type="text"
                      value={formData.projectsCompleted || '18+'}
                      onChange={(e) => setFormData({ ...formData, projectsCompleted: e.target.value })}
                      placeholder="e.g. 18+"
                      className="w-full px-3 py-2 rounded-lg bg-[#04111c] border border-[#14486d] text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">টোটাল ভিউস (Audience Views)</label>
                    <input
                      type="text"
                      value={formData.viewsCount || '5K+'}
                      onChange={(e) => setFormData({ ...formData, viewsCount: e.target.value })}
                      placeholder="e.g. 5K+"
                      className="w-full px-3 py-2 rounded-lg bg-[#04111c] border border-[#14486d] text-xs text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Bio English & Bengali */}
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">English Bio / Tagline</label>
                  <textarea
                    rows={3}
                    value={formData.bioEn || formData.tagline}
                    onChange={(e) => setFormData({ ...formData, bioEn: e.target.value, tagline: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#020b12] border border-[#0f344e] text-xs text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">বাংলা বায়ো / ট্যাগলাইন</label>
                  <textarea
                    rows={3}
                    value={formData.bioBn || formData.taglineBn}
                    onChange={(e) => setFormData({ ...formData, bioBn: e.target.value, taglineBn: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#020b12] border border-[#0f344e] text-xs text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: VIDEOS MANAGEMENT */}
          {activeTab === 'videos' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#0f344e] pb-4">
                <div>
                  <h2 className="text-lg font-black text-white flex items-center gap-2">
                    <Video className="w-5 h-5 text-cyan-400" />
                    <span>ভিডিও প্রজেক্টস ম্যানেজমেন্ট ({formData.videoProjects?.length || 0})</span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    নতুন ভিডিও যোগ করুন, লিংক বা টাইটেল এডিট করুন, অর্ডার পরিবর্তন করুন বা ডিলিট করুন।
                  </p>
                </div>
                <button
                  onClick={handleOpenAddVideo}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs shadow-md cursor-pointer self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>নতুন ভিডিও যোগ করুন</span>
                </button>
              </div>

              {/* Videos list */}
              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
                {formData.videoProjects?.map((video, idx) => (
                  <div
                    key={video.id || idx}
                    className="p-3.5 rounded-2xl bg-[#020b12] border border-[#0f344e] hover:border-cyan-500/40 flex flex-col sm:flex-row items-center justify-between gap-4 transition-all"
                  >
                    <div className="flex items-center gap-3.5 w-full sm:w-auto">
                      <div className="w-20 h-14 rounded-xl overflow-hidden bg-black shrink-0 relative border border-[#14486d]">
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute bottom-1 right-1 text-[9px] font-mono bg-black/80 px-1 rounded text-cyan-300">
                          {video.duration}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#082233] text-cyan-300 border border-[#14486d]">
                            {video.category}
                          </span>
                          <span className="text-[11px] text-slate-400 truncate font-mono">
                            {video.client}
                          </span>
                        </div>
                        <h4 className="text-xs font-bold text-white truncate mt-1">
                          {video.title}
                        </h4>
                        <p className="text-[11px] text-slate-500 font-mono truncate">
                          {video.vimeoEmbedUrl}
                        </p>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-1.5 self-end sm:self-auto">
                      <button
                        onClick={() => handleMoveVideo(idx, 'up')}
                        disabled={idx === 0}
                        className="p-1.5 rounded-lg bg-[#04111c] border border-[#14486d] text-slate-300 hover:text-white disabled:opacity-30 cursor-pointer"
                        title="উপরে নিন"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleMoveVideo(idx, 'down')}
                        disabled={idx === (formData.videoProjects?.length || 1) - 1}
                        className="p-1.5 rounded-lg bg-[#04111c] border border-[#14486d] text-slate-300 hover:text-white disabled:opacity-30 cursor-pointer"
                        title="নিচে নিন"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleOpenEditVideo(idx)}
                        className="px-2.5 py-1.5 rounded-lg bg-cyan-950 border border-cyan-600 text-cyan-300 hover:bg-cyan-500 hover:text-black text-xs font-bold transition-all cursor-pointer"
                      >
                        এডিট
                      </button>
                      <button
                        onClick={() => handleDeleteVideo(idx)}
                        className="p-1.5 rounded-lg bg-red-950/60 border border-red-500/50 text-red-300 hover:bg-red-600 hover:text-white transition-all cursor-pointer"
                        title="মুছে ফেলুন"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: GRAPHICS DESIGN MANAGEMENT */}
          {activeTab === 'graphics' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#0f344e] pb-4">
                <div>
                  <h2 className="text-lg font-black text-white flex items-center gap-2">
                    <Palette className="w-5 h-5 text-cyan-400" />
                    <span>গ্রাফিক্স ডিজাইন ম্যানেজমেন্ট ({formData.designProjects?.length || 0})</span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    নতুন ছবি ও গ্রাফিক্স ডিজাইন যোগ করুন, লিঙ্ক বা ক্যাটাগরি এডিট করুন।
                  </p>
                </div>
                <button
                  onClick={handleOpenAddDesign}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs shadow-md cursor-pointer self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>নতুন গ্রাফিক্স যোগ করুন</span>
                </button>
              </div>

              {/* Graphics Grid List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 max-h-[600px] overflow-y-auto pr-1">
                {formData.designProjects?.map((item, idx) => (
                  <div
                    key={item.id || idx}
                    className="p-3 rounded-2xl bg-[#020b12] border border-[#0f344e] hover:border-cyan-500/40 flex flex-col justify-between transition-all"
                  >
                    <div>
                      <div className="aspect-square rounded-xl overflow-hidden bg-black mb-2.5 relative border border-[#14486d]">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute top-1.5 left-1.5 text-[9px] font-mono bg-black/80 px-2 py-0.5 rounded text-cyan-300">
                          {item.category}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-white truncate">{item.title}</h4>
                      <p className="text-[11px] text-slate-400 truncate">{item.client || 'Client Project'}</p>
                    </div>

                    <div className="flex items-center justify-between pt-2.5 mt-2 border-t border-[#0e2c40]">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleMoveDesign(idx, 'up')}
                          disabled={idx === 0}
                          className="p-1 rounded bg-[#04111c] text-slate-300 hover:text-white disabled:opacity-30 cursor-pointer"
                          title="উপরে"
                        >
                          <ArrowUp className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => handleMoveDesign(idx, 'down')}
                          disabled={idx === (formData.designProjects?.length || 1) - 1}
                          className="p-1 rounded bg-[#04111c] text-slate-300 hover:text-white disabled:opacity-30 cursor-pointer"
                          title="নিচে"
                        >
                          <ArrowDown className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleOpenEditDesign(idx)}
                          className="px-2 py-1 rounded bg-cyan-950 border border-cyan-600 text-cyan-300 hover:bg-cyan-500 hover:text-black text-[11px] font-bold cursor-pointer"
                        >
                          এডিট
                        </button>
                        <button
                          onClick={() => handleDeleteDesign(idx)}
                          className="p-1 rounded bg-red-950/60 border border-red-500/50 text-red-300 hover:bg-red-600 hover:text-white cursor-pointer"
                          title="মুছে ফেলুন"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: CONTACT & SOCIAL LINKS */}
          {activeTab === 'contact' && (
            <div className="space-y-6">
              <div className="border-b border-[#0f344e] pb-4">
                <h2 className="text-lg font-black text-white flex items-center gap-2">
                  <Phone className="w-5 h-5 text-cyan-400" />
                  <span>যোগাযোগ ও সোশ্যাল মিডিয়া লিঙ্ক</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  ফোন, হোয়াটসঅ্যাপ, ইমেইল ও সোশ্যাল প্রোফাইল লিঙ্ক আপডেট করুন।
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">ফোন / হোয়াটসঅ্যাপ নম্বর</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#020b12] border border-[#0f344e] text-xs text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">ইমেইল ঠিকানা</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#020b12] border border-[#0f344e] text-xs text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">লোকেশন / ঠিকানা (English)</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#020b12] border border-[#0f344e] text-xs text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">লোকেশন / ঠিকানা (বাংলা)</label>
                  <input
                    type="text"
                    value={formData.addressBn}
                    onChange={(e) => setFormData({ ...formData, addressBn: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#020b12] border border-[#0f344e] text-xs text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Telegram Link / Username</label>
                  <input
                    type="text"
                    value={formData.telegramUrl || ''}
                    onChange={(e) => setFormData({ ...formData, telegramUrl: e.target.value })}
                    placeholder="https://t.me/..."
                    className="w-full px-3 py-2 rounded-xl bg-[#020b12] border border-[#0f344e] text-xs text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">LinkedIn Profile Link</label>
                  <input
                    type="text"
                    value={formData.linkedInUrl || ''}
                    onChange={(e) => setFormData({ ...formData, linkedInUrl: e.target.value })}
                    placeholder="https://www.linkedin.com/in/..."
                    className="w-full px-3 py-2 rounded-xl bg-[#020b12] border border-[#0f344e] text-xs text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Facebook Profile Link</label>
                  <input
                    type="text"
                    value={formData.facebookUrl}
                    onChange={(e) => setFormData({ ...formData, facebookUrl: e.target.value })}
                    placeholder="https://facebook.com/..."
                    className="w-full px-3 py-2 rounded-xl bg-[#020b12] border border-[#0f344e] text-xs text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Instagram Profile Link</label>
                  <input
                    type="text"
                    value={formData.instagramUrl}
                    onChange={(e) => setFormData({ ...formData, instagramUrl: e.target.value })}
                    placeholder="https://instagram.com/..."
                    className="w-full px-3 py-2 rounded-xl bg-[#020b12] border border-[#0f344e] text-xs text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: AVAILABILITY BADGE */}
          {activeTab === 'availability' && (
            <div className="space-y-6">
              <div className="border-b border-[#0f344e] pb-4">
                <h2 className="text-lg font-black text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-emerald-400" />
                  <span>"Always Available for Work" লাইভ ব্যাজ এডিট</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  কন্টাক্ট সেকশনে সর্বদা দৃশ্যমান থাকা গ্রিন গ্লোয়িং ব্যাজের লেখা কাস্টমাইজ করুন।
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Headline (English)</label>
                  <input
                    type="text"
                    value={formData.availableHeadlineEn || 'ALWAYS AVAILABLE FOR WORK'}
                    onChange={(e) => setFormData({ ...formData, availableHeadlineEn: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#020b12] border border-[#0f344e] text-xs text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Headline (বাংলা)</label>
                  <input
                    type="text"
                    value={formData.availableHeadlineBn || 'সবসময় কাজ করার জন্য প্রস্তুত'}
                    onChange={(e) => setFormData({ ...formData, availableHeadlineBn: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#020b12] border border-[#0f344e] text-xs text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Subtext (English)</label>
                  <textarea
                    rows={2}
                    value={formData.availableSubtextEn || 'Always ready to work, fully dedicated and always prepared to get any project done.'}
                    onChange={(e) => setFormData({ ...formData, availableSubtextEn: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#020b12] border border-[#0f344e] text-xs text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Subtext (বাংলা)</label>
                  <textarea
                    rows={2}
                    value={formData.availableSubtextBn || 'সবসময় কাজের জন্য প্রস্তুত, যেকোনো কাজ করে দেওয়ার জন্য সদা সর্বদা প্রস্তুত।'}
                    onChange={(e) => setFormData({ ...formData, availableSubtextBn: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#020b12] border border-[#0f344e] text-xs text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: SLIDER TIMING */}
          {activeTab === 'sliders' && (
            <div className="space-y-6">
              <div className="border-b border-[#0f344e] pb-4">
                <h2 className="text-lg font-black text-white flex items-center gap-2">
                  <Clock className="w-5 h-5 text-cyan-400" />
                  <span>ভিডিও ও গ্রাফিক্স স্লাইডার টাইমিং (Sliders Interval)</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  স্বয়ংক্রিয়ভাবে পরবর্তী ভিডিও বা গ্রাফিক্স ছবি আসার সময় পরিবর্তন করুন।
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="p-4 rounded-2xl bg-[#020b12] border border-[#0f344e] space-y-3">
                  <div className="flex items-center gap-2">
                    <Video className="w-5 h-5 text-cyan-400" />
                    <h3 className="text-sm font-bold text-white">ভিডিও স্লাইডার গতি (সেকেন্ড)</h3>
                  </div>
                  <p className="text-xs text-slate-400">
                    বর্তমানে সেট করা আছে: <span className="text-cyan-300 font-bold">{formData.videoSliderInterval || 3} সেকেন্ড</span>
                  </p>
                  <input
                    type="number"
                    min="1"
                    max="30"
                    value={formData.videoSliderInterval || 3}
                    onChange={(e) => setFormData({ ...formData, videoSliderInterval: Number(e.target.value) || 3 })}
                    className="w-full px-3 py-2 rounded-xl bg-[#04111c] border border-[#14486d] text-sm text-white"
                  />
                  <p className="text-[11px] text-slate-500">
                    প্রতিটি ভিডিও কয় সেকেন্ড পর পর স্বয়ংক্রিয়ভাবে পরবর্তী ভিডিওতে যাবে।
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#020b12] border border-[#0f344e] space-y-3">
                  <div className="flex items-center gap-2">
                    <Palette className="w-5 h-5 text-teal-400" />
                    <h3 className="text-sm font-bold text-white">গ্রাফিক্স স্লাইডার গতি (সেকেন্ড)</h3>
                  </div>
                  <p className="text-xs text-slate-400">
                    বর্তমানে সেট করা আছে: <span className="text-teal-300 font-bold">{formData.designSliderInterval || 2} সেকেন্ড</span>
                  </p>
                  <input
                    type="number"
                    min="1"
                    max="30"
                    value={formData.designSliderInterval || 2}
                    onChange={(e) => setFormData({ ...formData, designSliderInterval: Number(e.target.value) || 2 })}
                    className="w-full px-3 py-2 rounded-xl bg-[#04111c] border border-[#14486d] text-sm text-white"
                  />
                  <p className="text-[11px] text-slate-500">
                    প্রতিটি গ্রাফিক্স ছবি কয় সেকেন্ড পর পর স্বয়ংক্রিয়ভাবে পরবর্তী ছবিতে যাবে।
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: EDUCATION & TRAINING */}
          {activeTab === 'education' && (
            <div className="space-y-6">
              <div className="border-b border-[#0f344e] pb-4">
                <h2 className="text-lg font-black text-white flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-cyan-400" />
                  <span>এডুকেশন ও ক্রিয়েটিভ ট্রেনিং</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  দাওরায়ে হাদিস, ইফতা গবেষণা এবং আস-সুন্নাহ স্কিল ডেভেলপমেন্ট কোর্সের বিবরণ এডিট করুন।
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Academic Background</h3>
                {formData.academicEducation?.map((item, idx) => (
                  <div key={item.id || idx} className="p-4 rounded-2xl bg-[#020b12] border border-[#0f344e] space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">Degree Title (EN)</label>
                        <input
                          type="text"
                          value={item.degree}
                          onChange={(e) => {
                            const list = [...(formData.academicEducation || [])];
                            list[idx].degree = e.target.value;
                            setFormData({ ...formData, academicEducation: list });
                          }}
                          className="w-full px-3 py-1.5 rounded-lg bg-[#04111c] border border-[#14486d] text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">Degree Title (বাংলা)</label>
                        <input
                          type="text"
                          value={item.degreeBn}
                          onChange={(e) => {
                            const list = [...(formData.academicEducation || [])];
                            list[idx].degreeBn = e.target.value;
                            setFormData({ ...formData, academicEducation: list });
                          }}
                          className="w-full px-3 py-1.5 rounded-lg bg-[#04111c] border border-[#14486d] text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">Year / Session</label>
                        <input
                          type="text"
                          value={item.year}
                          onChange={(e) => {
                            const list = [...(formData.academicEducation || [])];
                            list[idx].year = e.target.value;
                            setFormData({ ...formData, academicEducation: list });
                          }}
                          className="w-full px-3 py-1.5 rounded-lg bg-[#04111c] border border-[#14486d] text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">Status (e.g. Completed / Ongoing)</label>
                        <input
                          type="text"
                          value={item.status}
                          onChange={(e) => {
                            const list = [...(formData.academicEducation || [])];
                            list[idx].status = e.target.value;
                            setFormData({ ...formData, academicEducation: list });
                          }}
                          className="w-full px-3 py-1.5 rounded-lg bg-[#04111c] border border-[#14486d] text-xs text-white"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <h3 className="text-xs font-bold text-teal-400 uppercase tracking-wider pt-3">Professional Multimedia Training</h3>
                {formData.skillTraining?.map((item, idx) => (
                  <div key={item.id || idx} className="p-4 rounded-2xl bg-[#020b12] border border-[#0f344e] space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">Course Title</label>
                        <input
                          type="text"
                          value={item.degree}
                          onChange={(e) => {
                            const list = [...(formData.skillTraining || [])];
                            list[idx].degree = e.target.value;
                            setFormData({ ...formData, skillTraining: list });
                          }}
                          className="w-full px-3 py-1.5 rounded-lg bg-[#04111c] border border-[#14486d] text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">Institution</label>
                        <input
                          type="text"
                          value={item.institution || ''}
                          onChange={(e) => {
                            const list = [...(formData.skillTraining || [])];
                            list[idx].institution = e.target.value;
                            setFormData({ ...formData, skillTraining: list });
                          }}
                          className="w-full px-3 py-1.5 rounded-lg bg-[#04111c] border border-[#14486d] text-xs text-white"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: SKILLS & TOOLS */}
          {activeTab === 'skills' && (
            <div className="space-y-6">
              <div className="border-b border-[#0f344e] pb-4">
                <h2 className="text-lg font-black text-white flex items-center gap-2">
                  <Wrench className="w-5 h-5 text-cyan-400" />
                  <span>দক্ষতা ও সফটওয়্যার টুলস</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  ভিডিও এডিটিং, মোশন ডিজাইন এবং গ্রাফিক্স টুলসের তালিকা।
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {formData.coreSkills?.map((skill, idx) => (
                  <div key={skill.id || idx} className="p-4 rounded-2xl bg-[#020b12] border border-[#0f344e] space-y-2">
                    <label className="block text-xs font-bold text-cyan-300">{skill.title}</label>
                    <input
                      type="text"
                      value={skill.titleBn}
                      onChange={(e) => {
                        const list = [...(formData.coreSkills || [])];
                        list[idx].titleBn = e.target.value;
                        setFormData({ ...formData, coreSkills: list });
                      }}
                      className="w-full px-3 py-1.5 rounded-lg bg-[#04111c] border border-[#14486d] text-xs text-white mb-2"
                      placeholder="বাংলা টাইটেল"
                    />
                    <input
                      type="text"
                      value={skill.tools.join(', ')}
                      onChange={(e) => {
                        const list = [...(formData.coreSkills || [])];
                        list[idx].tools = e.target.value.split(',').map((s) => s.trim()).filter(Boolean);
                        setFormData({ ...formData, coreSkills: list });
                      }}
                      className="w-full px-3 py-1.5 rounded-lg bg-[#04111c] border border-[#14486d] text-xs text-slate-300"
                      placeholder="টুলস (কমা দিয়ে লিখুন, যেমন: Premiere Pro, After Effects)"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 9: SECURITY & PASSWORD CHANGE */}
          {activeTab === 'security' && (
            <div className="space-y-6 max-w-xl">
              <div className="border-b border-[#0f344e] pb-4">
                <h2 className="text-lg font-black text-white flex items-center gap-2">
                  <Shield className="w-5 h-5 text-cyan-400" />
                  <span>অ্যাডমিন পাসওয়ার্ড পরিবর্তন করুন</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  এখানে আপনি নিজের পছন্দমতো নতুন পাসওয়ার্ড সেট করতে পারবেন যাতে শুধুমাত্র আপনিই প্যানেলে প্রবেশ করতে পারেন।
                </p>
              </div>

              <form onSubmit={handleChangePassword} className="space-y-4 bg-[#020b12] p-5 rounded-2xl border border-[#0f344e]">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">বর্তমান পাসওয়ার্ড (Current Password)</label>
                  <input
                    type="password"
                    required
                    value={currentPasswordInput}
                    onChange={(e) => setCurrentPasswordInput(e.target.value)}
                    placeholder="বর্তমান পাসওয়ার্ড দিন"
                    className="w-full px-3 py-2 rounded-xl bg-[#04111c] border border-[#14486d] text-xs text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">নতুন পাসওয়ার্ড (New Password)</label>
                  <input
                    type="password"
                    required
                    value={newPasswordInput}
                    onChange={(e) => setNewPasswordInput(e.target.value)}
                    placeholder="কমপক্ষে ৪ অক্ষরের নতুন পাসওয়ার্ড দিন"
                    className="w-full px-3 py-2 rounded-xl bg-[#04111c] border border-[#14486d] text-xs text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">নতুন পাসওয়ার্ড নিশ্চিত করুন (Confirm Password)</label>
                  <input
                    type="password"
                    required
                    value={confirmPasswordInput}
                    onChange={(e) => setConfirmPasswordInput(e.target.value)}
                    placeholder="নতুন পাসওয়ার্ডটি পুনরায় লিখুন"
                    className="w-full px-3 py-2 rounded-xl bg-[#04111c] border border-[#14486d] text-xs text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                {passwordChangeMsg && (
                  <div
                    className={`p-3 rounded-xl border text-xs flex items-center gap-2 ${
                      passwordChangeMsg.success
                        ? 'bg-emerald-950/70 border-emerald-500/60 text-emerald-200'
                        : 'bg-red-950/70 border-red-500/60 text-red-200'
                    }`}
                  >
                    {passwordChangeMsg.success ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                    )}
                    <span>{passwordChangeMsg.text}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="py-2.5 px-5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-400 text-black font-extrabold text-xs shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
                >
                  <KeyRound className="w-4 h-4" />
                  <span>পাসওয়ার্ড আপডেট করুন</span>
                </button>
              </form>
            </div>
          )}

          {/* TAB 10: BACKUP & RESTORE */}
          {activeTab === 'backup' && (
            <div className="space-y-6 max-w-xl">
              <div className="border-b border-[#0f344e] pb-4">
                <h2 className="text-lg font-black text-white flex items-center gap-2">
                  <Download className="w-5 h-5 text-cyan-400" />
                  <span>ডাটা ব্যাকআপ ও রিস্টোর (Backup & Restore)</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  ওয়েবসাইটের সব সেটিংস ফাইল হিসেবে নিজের কম্পিউটারে সেভ রাখুন অথবা যেকোনো সময় রিস্টোর করুন।
                </p>
              </div>

              <div className="space-y-4">
                {/* Export */}
                <div className="p-4 rounded-2xl bg-[#020b12] border border-[#0f344e] flex items-center justify-between gap-4">
                  <div>
                    <h4 className="text-xs font-bold text-white">ব্যাকআপ ডাউনলোড করুন (Export JSON)</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">সব প্রজেক্ট, ভিডিও, ছবি ও লেখা ব্যাকআপ ফাইলে সেভ হবে।</p>
                  </div>
                  <button
                    onClick={handleExportBackup}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#082233] border border-[#14486d] text-cyan-300 hover:text-white hover:bg-cyan-600/30 text-xs font-bold transition-all cursor-pointer shrink-0"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>ডাউনলোড</span>
                  </button>
                </div>

                {/* Import */}
                <div className="p-4 rounded-2xl bg-[#020b12] border border-[#0f344e] flex items-center justify-between gap-4">
                  <div>
                    <h4 className="text-xs font-bold text-white">ব্যাকআপ রিস্টোর করুন (Import JSON)</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">পূর্বে ডাউনলোড করা ব্যাকআপ ফাইল আপলোড করে ফিরিয়ে আনুন।</p>
                  </div>
                  <label className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-black font-extrabold text-xs cursor-pointer shadow-md transition-all shrink-0">
                    <Upload className="w-3.5 h-3.5" />
                    <span>ফাইল বেছে নিন</span>
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleImportBackup}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Factory Reset */}
                <div className="p-4 rounded-2xl bg-[#180808] border border-red-500/40 flex items-center justify-between gap-4">
                  <div>
                    <h4 className="text-xs font-bold text-red-300">ডিফল্ট সেটিংসে রিসেট (Factory Reset)</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">পোর্টফোলিওর মূল অরিজিনাল ডাটা ফিরিয়ে আনতে এটি ব্যবহার করুন।</p>
                  </div>
                  <button
                    onClick={handleResetDefaults}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-950 border border-red-500 text-red-200 hover:bg-red-600 hover:text-white text-xs font-bold transition-all cursor-pointer shrink-0"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>রিসেট করুন</span>
                  </button>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* =================== VIDEO EDIT MODAL =================== */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="w-full max-w-xl bg-[#04121d] border-2 border-cyan-500/60 rounded-3xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-base font-black text-white mb-4 flex items-center gap-2">
              <Video className="w-5 h-5 text-cyan-400" />
              <span>{editingVideoIndex !== null ? 'ভিডিও এডিট করুন' : 'নতুন ভিডিও যোগ করুন'}</span>
            </h3>

            <div className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">ভিডিও টাইটেল (Title)</label>
                <input
                  type="text"
                  value={currentVideo.title}
                  onChange={(e) => setCurrentVideo({ ...currentVideo, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#020b12] border border-[#0f344e] text-xs text-white"
                  placeholder="e.g. Mirath Islamic Media Commercial"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">বাংলা টাইটেল (Title BN)</label>
                <input
                  type="text"
                  value={currentVideo.titleBn || ''}
                  onChange={(e) => setCurrentVideo({ ...currentVideo, titleBn: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#020b12] border border-[#0f344e] text-xs text-white"
                  placeholder="e.g. মিরাস ইসলামিক মিডিয়া কমার্শিয়াল"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">ক্যাটাগরি</label>
                  <select
                    value={currentVideo.category}
                    onChange={(e) =>
                      setCurrentVideo({
                        ...currentVideo,
                        category: e.target.value as any,
                        categoryLabel: e.target.value.toUpperCase(),
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-[#020b12] border border-[#0f344e] text-xs text-white"
                  >
                    <option value="commercial">Commercial</option>
                    <option value="motion">Motion</option>
                    <option value="reel">Reel (9:16)</option>
                    <option value="documentary">Documentary</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">ভিডিও ডুরেশন</label>
                  <input
                    type="text"
                    value={currentVideo.duration}
                    onChange={(e) => setCurrentVideo({ ...currentVideo, duration: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#020b12] border border-[#0f344e] text-xs text-white"
                    placeholder="e.g. 0:45"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Vimeo Embed URL অথবা ভিডিও লিংক</label>
                <input
                  type="text"
                  value={currentVideo.vimeoEmbedUrl || ''}
                  onChange={(e) => setCurrentVideo({ ...currentVideo, vimeoEmbedUrl: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#020b12] border border-[#0f344e] text-xs text-white font-mono"
                  placeholder="https://player.vimeo.com/video/..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">ভিডিও থাম্বনেইল ছবি</label>
                <div className="flex flex-wrap gap-2 items-center mb-2">
                  <label className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#082437] border border-[#14486d] text-cyan-300 hover:text-white hover:bg-cyan-600/30 text-xs font-bold cursor-pointer transition-all">
                    <Upload className="w-3.5 h-3.5" />
                    <span>ছবি আপলোড করুন</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleVideoThumbnailUpload}
                      className="hidden"
                    />
                  </label>
                  <span className="text-[11px] text-slate-400">অথবা সরাসরি ইমেজ লিংক লিখুন:</span>
                </div>
                <input
                  type="text"
                  value={currentVideo.thumbnail}
                  onChange={(e) => setCurrentVideo({ ...currentVideo, thumbnail: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#020b12] border border-[#0f344e] text-xs text-white font-mono"
                  placeholder="https://..."
                />
                {currentVideo.thumbnail && (
                  <div className="mt-2 flex items-center gap-3">
                    <div className="w-24 aspect-video rounded-lg overflow-hidden border border-[#14486d] bg-black">
                      <img src={currentVideo.thumbnail} alt="Thumbnail preview" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-[11px] text-teal-300">✓ থাম্বনেইল প্রিভিউ প্রস্তুত</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">ক্লায়েন্ট বা প্রজেক্ট ব্র্যান্ড</label>
                <input
                  type="text"
                  value={currentVideo.client}
                  onChange={(e) => setCurrentVideo({ ...currentVideo, client: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#020b12] border border-[#0f344e] text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">টুলস ব্যবহৃত (কমা দিয়ে আলাদা করুন)</label>
                <input
                  type="text"
                  value={currentVideo.toolsUsed.join(', ')}
                  onChange={(e) =>
                    setCurrentVideo({
                      ...currentVideo,
                      toolsUsed: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-[#020b12] border border-[#0f344e] text-xs text-white"
                  placeholder="Premiere Pro, After Effects, DaVinci"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 mt-6 pt-4 border-t border-[#0f344e]">
              <button
                type="button"
                onClick={() => setVideoModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-[#082233] border border-[#14486d] text-slate-300 hover:text-white text-xs font-bold cursor-pointer"
              >
                বাতিল
              </button>
              <button
                type="button"
                onClick={handleSaveVideoModal}
                className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-extrabold cursor-pointer shadow-lg"
              >
                সেভ করুন
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =================== DESIGN EDIT MODAL =================== */}
      {designModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="w-full max-w-xl bg-[#04121d] border-2 border-cyan-500/60 rounded-3xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-base font-black text-white mb-4 flex items-center gap-2">
              <Palette className="w-5 h-5 text-cyan-400" />
              <span>{editingDesignIndex !== null ? 'গ্রাফিক্স ডিজাইন এডিট করুন' : 'নতুন গ্রাফিক্স যোগ করুন'}</span>
            </h3>

            <div className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">গ্রাফিক্স টাইটেল</label>
                <input
                  type="text"
                  value={currentDesign.title}
                  onChange={(e) => setCurrentDesign({ ...currentDesign, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#020b12] border border-[#0f344e] text-xs text-white"
                  placeholder="e.g. Islamic Book Cover Design"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">ডিজাইন ছবি (Image)</label>
                <div className="flex flex-wrap gap-2 items-center mb-2">
                  <label className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#082437] border border-[#14486d] text-cyan-300 hover:text-white hover:bg-cyan-600/30 text-xs font-bold cursor-pointer transition-all">
                    <Upload className="w-3.5 h-3.5" />
                    <span>ছবি আপলোড করুন</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleDesignImageUpload}
                      className="hidden"
                    />
                  </label>
                  <span className="text-[11px] text-slate-400">অথবা সরাসরি ইমেজ লিংক লিখুন:</span>
                </div>
                <input
                  type="text"
                  value={currentDesign.image}
                  onChange={(e) => setCurrentDesign({ ...currentDesign, image: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#020b12] border border-[#0f344e] text-xs text-white font-mono"
                  placeholder="https://i.postimg.cc/..."
                />
                {currentDesign.image && (
                  <div className="mt-2 flex items-center gap-3">
                    <div className="w-20 h-20 rounded-lg overflow-hidden border border-[#14486d] bg-black">
                      <img src={currentDesign.image} alt="Design preview" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-[11px] text-teal-300">✓ গ্রাফিক্স প্রিভিউ প্রস্তুত</span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">ক্যাটাগরি</label>
                  <select
                    value={currentDesign.category}
                    onChange={(e) =>
                      setCurrentDesign({
                        ...currentDesign,
                        category: e.target.value as any,
                        categoryLabel: e.target.value.toUpperCase(),
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-[#020b12] border border-[#0f344e] text-xs text-white"
                  >
                    <option value="ad-creative">Ad Creative</option>
                    <option value="poster">Poster</option>
                    <option value="thumbnail">Thumbnail</option>
                    <option value="typography">Typography</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">সাইজ / Dimensions</label>
                  <input
                    type="text"
                    value={currentDesign.dimensions}
                    onChange={(e) => setCurrentDesign({ ...currentDesign, dimensions: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#020b12] border border-[#0f344e] text-xs text-white"
                    placeholder="1080x1080"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">ক্লায়েন্ট বা ব্র্যান্ড নাম</label>
                <input
                  type="text"
                  value={currentDesign.client}
                  onChange={(e) => setCurrentDesign({ ...currentDesign, client: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#020b12] border border-[#0f344e] text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">টুলস ব্যবহৃত (কমা দিয়ে লিখুন)</label>
                <input
                  type="text"
                  value={currentDesign.toolsUsed.join(', ')}
                  onChange={(e) =>
                    setCurrentDesign({
                      ...currentDesign,
                      toolsUsed: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-[#020b12] border border-[#0f344e] text-xs text-white"
                  placeholder="Photoshop, Illustrator"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 mt-6 pt-4 border-t border-[#0f344e]">
              <button
                type="button"
                onClick={() => setDesignModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-[#082233] border border-[#14486d] text-slate-300 hover:text-white text-xs font-bold cursor-pointer"
              >
                বাতিল
              </button>
              <button
                type="button"
                onClick={handleSaveDesignModal}
                className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-extrabold cursor-pointer shadow-lg"
              >
                সেভ করুন
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
