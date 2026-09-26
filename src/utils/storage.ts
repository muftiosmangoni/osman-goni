import { PortfolioCustomization } from '../types';
import { DEFAULT_CUSTOMIZATION, VIDEO_PROJECTS, DESIGN_PROJECTS, ACADEMIC_EDUCATION, SKILL_TRAINING, CORE_SKILLS } from '../data/portfolioData';

const DB_NAME = 'osman_portfolio_db';
const DB_VERSION = 1;
const STORE_NAME = 'portfolio_store';
const CUSTOMIZATION_KEY = 'portfolio_customization';
const PASSWORD_KEY = 'osman_admin_password';
const AUTH_KEY = 'osman_admin_authenticated';
const DEFAULT_PASS = 'osman123';

// Open IndexedDB
function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not supported'));
      return;
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (e) => {
      const db = (e.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}

// Get item from IndexedDB
export async function getFromIndexedDB<T>(key: string): Promise<T | null> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(key);

      req.onsuccess = () => {
        resolve(req.result !== undefined ? req.result : null);
      };

      req.onerror = () => {
        reject(req.error);
      };
    });
  } catch (err) {
    console.warn('IndexedDB read error, falling back:', err);
    return null;
  }
}

// Put item in IndexedDB
export async function setInIndexedDB(key: string, value: any): Promise<boolean> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(value, key);

      req.onsuccess = () => {
        resolve(true);
      };

      req.onerror = () => {
        reject(req.error);
      };
    });
  } catch (err) {
    console.warn('IndexedDB write error:', err);
    return false;
  }
}

// Load customization with fallback chain:
// 1. IndexedDB
// 2. localStorage
// 3. Defaults
export async function loadCustomization(): Promise<PortfolioCustomization> {
  let data: any = null;

  // 1. Try IndexedDB
  try {
    data = await getFromIndexedDB<PortfolioCustomization>(CUSTOMIZATION_KEY);
  } catch (e) {
    console.warn('Could not read from IndexedDB:', e);
  }

  // 2. If not found in IndexedDB, try localStorage
  if (!data && typeof window !== 'undefined') {
    try {
      const raw = localStorage.getItem('osman_portfolio_customization');
      if (raw) {
        data = JSON.parse(raw);
        // Migrate to IndexedDB immediately for future safety
        await setInIndexedDB(CUSTOMIZATION_KEY, data);
      }
    } catch (e) {
      console.warn('Could not read from localStorage:', e);
    }
  }

  const base: PortfolioCustomization = {
    ...DEFAULT_CUSTOMIZATION,
    videoProjects: VIDEO_PROJECTS,
    designProjects: DESIGN_PROJECTS,
    academicEducation: ACADEMIC_EDUCATION,
    skillTraining: SKILL_TRAINING,
    coreSkills: CORE_SKILLS,
    youtubeUrl: DEFAULT_CUSTOMIZATION.youtubeUrl || 'https://www.youtube.com/@GoniEditor',
    themeMode: 'dark',
    yearsExperience: '3 Months',
  };

  if (!data) {
    return base;
  }

  // Ensure valid profile image
  if (
    data.profileImage === '/profile.jpg' ||
    data.profileImage === '/prut.jpg' ||
    data.profileImage === '/osman-cyan-bg.png' ||
    data.profileImage === '/osman_goni_real.jpg' ||
    data.profileImage === '/osman_exact_nobg.png' ||
    !data.profileImage
  ) {
    data.profileImage = 'https://i.postimg.cc/kGvC3Vb9/zn-Qd-U.jpg';
  }

  return {
    ...base,
    ...data,
    videoProjects: data.videoProjects && data.videoProjects.length > 0 ? data.videoProjects : VIDEO_PROJECTS,
    designProjects: data.designProjects && data.designProjects.length > 0 ? data.designProjects : DESIGN_PROJECTS,
    academicEducation: data.academicEducation || ACADEMIC_EDUCATION,
    skillTraining: data.skillTraining || SKILL_TRAINING,
    coreSkills: data.coreSkills && data.coreSkills.length >= 8 && data.coreSkills.some((s: any) => s.id === 'script-writing') ? data.coreSkills : CORE_SKILLS,
    youtubeUrl: data.youtubeUrl || DEFAULT_CUSTOMIZATION.youtubeUrl || 'https://www.youtube.com/@GoniEditor',
    themeMode: 'dark',
  };
}

// Save customization safely to IndexedDB and lightweight version in localStorage
export async function saveCustomization(customization: PortfolioCustomization): Promise<boolean> {
  const safeCustomization: PortfolioCustomization = {
    ...customization,
    themeMode: 'dark',
  };

  // 1. Save full data to IndexedDB
  await setInIndexedDB(CUSTOMIZATION_KEY, safeCustomization);

  // 2. Save safe trimmed copy to localStorage (omit massive image strings if needed to avoid quota exceed)
  if (typeof window !== 'undefined') {
    try {
      // Create a light copy without oversized base64 to avoid quota warning
      const lightCopy = { ...safeCustomization };
      if (lightCopy.profileImage && lightCopy.profileImage.startsWith('data:') && lightCopy.profileImage.length > 100000) {
        lightCopy.profileImage = '/osman_exact_nobg.png';
      }
      localStorage.setItem('osman_portfolio_customization', JSON.stringify(lightCopy));
    } catch {
      // Safe catch: IndexedDB is our source of truth, so quota warning is avoided completely
    }
  }

  return true;
}

// Reset customization
export async function resetCustomization(): Promise<PortfolioCustomization> {
  const base: PortfolioCustomization = {
    ...DEFAULT_CUSTOMIZATION,
    videoProjects: VIDEO_PROJECTS,
    designProjects: DESIGN_PROJECTS,
    academicEducation: ACADEMIC_EDUCATION,
    skillTraining: SKILL_TRAINING,
    themeMode: 'dark',
    yearsExperience: '3 Months',
  };

  await setInIndexedDB(CUSTOMIZATION_KEY, base);
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem('osman_portfolio_customization');
    } catch {
      // Ignore
    }
  }

  return base;
}

// Admin Password & Owner Gmail Management
export const OWNER_EMAIL = 'mmosmangoni112@gmail.com';
const EMAIL_KEY = 'osman_admin_verified_email';

export function isOwnerEmail(email: string): boolean {
  if (!email) return false;
  return email.trim().toLowerCase() === OWNER_EMAIL.toLowerCase();
}

export function getVerifiedAdminEmail(): string | null {
  if (typeof window === 'undefined') return null;
  return sessionStorage.getItem(EMAIL_KEY) || localStorage.getItem(EMAIL_KEY) || null;
}

export function setVerifiedAdminEmail(email: string | null): void {
  if (typeof window === 'undefined') return;
  if (email && isOwnerEmail(email)) {
    sessionStorage.setItem(EMAIL_KEY, email.trim().toLowerCase());
    localStorage.setItem(EMAIL_KEY, email.trim().toLowerCase());
  } else {
    sessionStorage.removeItem(EMAIL_KEY);
    localStorage.removeItem(EMAIL_KEY);
  }
}

export function getAdminPassword(): string {
  if (typeof window === 'undefined') return DEFAULT_PASS;
  return localStorage.getItem(PASSWORD_KEY) || DEFAULT_PASS;
}

export function setAdminPassword(newPassword: string): boolean {
  if (typeof window === 'undefined' || !newPassword.trim()) return false;
  localStorage.setItem(PASSWORD_KEY, newPassword.trim());
  return true;
}

export function verifyAdminPassword(input: string): boolean {
  const current = getAdminPassword();
  const trimmed = input.trim();
  // Support custom password, default 'osman123', or previous pin '3646'
  return trimmed === current || trimmed === DEFAULT_PASS || trimmed === '3646';
}

export function isAdminAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  const isAuth = sessionStorage.getItem(AUTH_KEY) === 'true';
  const email = getVerifiedAdminEmail();
  return isAuth && email === OWNER_EMAIL;
}

export function setAdminAuthenticated(status: boolean, email?: string): void {
  if (typeof window === 'undefined') return;
  if (status && email && isOwnerEmail(email)) {
    sessionStorage.setItem(AUTH_KEY, 'true');
    setVerifiedAdminEmail(email);
  } else if (!status) {
    sessionStorage.removeItem(AUTH_KEY);
    setVerifiedAdminEmail(null);
  }
}

// Image compression helper to keep storage fast and light
export function compressImageFile(file: File, maxWidth = 1400, quality = 0.85): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        // Export as WebP if supported, fallback to JPEG
        const mime = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
        const dataUrl = canvas.toDataURL(mime, quality);
        resolve(dataUrl);
      };
      img.onerror = reject;
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
