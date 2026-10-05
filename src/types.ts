export type Language = "id" | "en";

export type ThemeMode = "dark" | "light";

export interface EducationItem {
  id: string;
  degree: { id: string; en: string };
  institution: string;
  location: string;
  period: string;
  gpa?: string;
  description: { id: string; en: string };
  highlights: { id: string[]; en: string[] };
  badgeText?: string;
  iconType: "university" | "school" | "bootcamp" | "cert";
}

export interface EducationPhoto {
  id: string;
  title: { id: string; en: string };
  category: { id: string; en: string };
  date: string;
  imageUrl: string;
  description: { id: string; en: string };
  location: string;
}

export interface SkillCategory {
  id: string;
  name: { id: string; en: string };
  iconName: string;
  skills: SkillItem[];
}

export interface SkillItem {
  name: string;
  level: number; // 0 - 100
  category: string;
  icon?: string;
  yearsOfExp: string;
  isFavorite?: boolean;
}

export interface LearningItem {
  id: string;
  title: string;
  topic: { id: string; en: string };
  progress: number; // 0 - 100
  status: "in-progress" | "experimenting" | "mastering" | "research";
  description: { id: string; en: string };
  resources: string[];
  keyTakeaways: { id: string[]; en: string[] };
  startedDate: string;
  badgeColor: string;
}

export interface ExperienceItem {
  id: string;
  role: { id: string; en: string };
  company: string;
  companyUrl?: string;
  location: string;
  type: { id: string; en: string };
  period: string;
  isCurrent?: boolean;
  summary: { id: string; en: string };
  achievements: { id: string[]; en: string[] };
  photos?: { imageUrl: string; alt: { id: string; en: string } }[];
  technologies: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  tagline: { id: string; en: string };
  category: "Full-Stack" | "AI & ML" | "Web & 3D" | "Mobile & API" | "IoT & Embedded";
  imageUrl: string;
  screenshots?: { imageUrl: string; caption: { id: string; en: string } }[];
  demoUrl?: string;
  githubUrl?: string;
  technologies: string[];
  featured: boolean;
  date?: string;
  overview: { id: string; en: string };
  challenges: { id: string; en: string };
  solutions: { id: string; en: string };
  metrics: { id: string[]; en: string[] };
}

export interface ContactFormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface IDCardCustomConfig {
  name: string;
  role: string;
  department: string;
  companyName: string;
  idNumber: string;
  issuedDate: string;
  expiryDate: string;
  accentColor: string;
  secondaryColor: string;
  textColor: string;
  avatarUrl?: string; // <<-- FOTO PROFIL / AVATAR KARTU
  logoUrl?: string; // <<-- LOGO PERUSAHAAN / KAMPUS
  frontDesignUrl?: string; // <<-- DESAIN KUSTOM MUKA DEPAN (FULL IMAGE)
  backDesignUrl?: string; // <<-- DESAIN KUSTOM MUKA BELAKANG (FULL IMAGE)
  showQrCode?: boolean;
  showBarcode?: boolean;
  showHologram?: boolean;
  showChip?: boolean;
  emergencyContact?: string;
  lanyardText?: string;
  lanyardColor?: string;
  lanyardSecondaryColor?: string;
}
