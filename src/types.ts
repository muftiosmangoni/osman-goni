export interface VideoProject {
  id: string;
  title: string;
  titleBn?: string;
  category: 'commercial' | 'reel' | 'documentary' | 'motion';
  categoryLabel: string;
  categoryLabelBn?: string;
  vimeoEmbedUrl?: string;
  thumbnail: string;
  duration: string;
  client: string;
  aspectRatio: '16:9' | '9:16';
  description: string;
  toolsUsed: string[];
}

export interface DesignProject {
  id: string;
  title: string;
  titleBn?: string;
  category: 'ad-creative' | 'poster' | 'thumbnail' | 'typography' | 'packaging';
  categoryLabel: string;
  categoryLabelBn?: string;
  image: string;
  client: string;
  dimensions: string;
  description: string;
  toolsUsed: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  degreeBn: string;
  year: string;
  status: string;
  statusBn: string;
  institution?: string;
  institutionBn?: string;
  description: string;
  descriptionBn: string;
}

export interface CoreSkillItem {
  id: string;
  title: string;
  titleBn: string;
  description: string;
  descriptionBn: string;
  icon: string;
  tools: string[];
}

export interface PortfolioCustomization {
  name: string;
  nameBn: string;
  greetingEn: string;
  title: string;
  titleBn: string;
  tagline: string;
  taglineHighlight: string;
  taglineBn: string;
  taglineBnHighlight: string;
  bioEn?: string;
  bioBn?: string;
  yearsExperience?: string;
  projectsCompleted?: string;
  viewsCount?: string;
  availableHeadlineEn?: string;
  availableHeadlineBn?: string;
  availableSubtextEn?: string;
  availableSubtextBn?: string;
  phone: string;
  email: string;
  address: string;
  addressBn: string;
  profileImage: string;
  accentColor: string; // 'orange' | 'cyan' | 'emerald' | 'purple' | 'blue'
  themeMode: 'dark' | 'light';
  facebookUrl: string;
  instagramUrl: string;
  telegramUrl?: string;
  linkedInUrl?: string;
  youtubeUrl?: string;
  footerBioEn?: string;
  footerBioBn?: string;
  copyrightNotice?: string;
  videoProjects?: VideoProject[];
  designProjects?: DesignProject[];
  academicEducation?: EducationItem[];
  skillTraining?: EducationItem[];
  coreSkills?: CoreSkillItem[];
  videoSliderInterval?: number;
  designSliderInterval?: number;
}
