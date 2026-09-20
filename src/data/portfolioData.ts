import {
  EducationItem,
  EducationPhoto,
  SkillCategory,
  LearningItem,
  ExperienceItem,
  ProjectItem,
  IDCardCustomConfig,
} from "../types";

// Import file desain ID card lokal
import idcardDepanImg from "./idcardDepan.png";
import idcardBelakangImg from "./idcardBelakang.png";

export const PERSONAL_INFO = {
  name: "Agnaya Mumtazul",
  title: "Tech Enthusiast - Software & Website Developer",
  tagline: {
    id: "Perkembangan teknologi memaksa manusia untuk terus beradaptasi, dan saya adalah yang beradaptasi itu.",
    en: "Technological developments force humans to continue to adapt, and I am the one who adapts.",
  },
  email: "mumtazulagnaya@gmail.com",
  phone: "+62 851-8338-0962",
  location: "Kab. Sukabumi, Jawa Barat, Indonesia",
  bio: {
    id: "Saya adalah seorang Software Engineer yang berfokus pada ekosistem JavaScript/TypeScript modern, arsitektur cloud, dan integrasi Artificial Intelligence.",
    en: "I am a Software Engineer focused on modern JavaScript/TypeScript ecosystems, cloud architectures, and Artificial Intelligence integrations.",
  },
  status: "Tersedia untuk Proyek & Peluang Kerja",
  statusEn: "Available for Projects & Opportunities",
  yearsExperience: "2+ Tahun",
  projectsCompleted: "-",
  satisfiedClients: "-",
  socials: {
    github: "https://github.com/mmtz0110",
    linkedin: "-",
    email: "mailto:mumtazulagnaya@gmail.com",
    instagram: "https://instagram.com/mmtz0110",
  },
};

/* =========================================================================================
   📍 BAGIAN UNTUK MENGUBAH FOTO / GAMBAR / DESAIN 3D ID CARD
   Ganti URL di bawah ini dengan link gambar Anda (Unsplash, Imgur, Cloudinary, atau /assets)
   ========================================================================================= */
export const DEFAULT_ID_CARD_CONFIG: IDCardCustomConfig = {
  name: "AGNAYA MUMTAZUL",
  role: "SOFTWARE ENGINEER",
  department: "INFORMATICS ENGINEER",
  companyName: "UNIVERSITAS NUSA PUTRA",
  idNumber: "20240040086",
  issuedDate: "09/2024",
  expiryDate: "08/2028",

  // 🎨 Pilihan Warna Tema Kartu
  accentColor: "#3b82f6", // Warna aksen biru modern (atau #FF4D00, #10b981, #8b5cf6, dll)
  secondaryColor: "#09090b", // Background gelap premium
  textColor: "#ffffff",

  // 📷 1. GANTI FOTO AVATAR / PAS FOTO KARTU DI SINI:
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop",

  // 🏢 2. GANTI LOGO KAMPUS / PERUSAHAAN DI SINI (Opsional, PNG transparan direkomendasikan):
  logoUrl: "https://id.wikipedia.org/wiki/Berkas:Logo_Universitas_Nusa_Putra.png",

  // 🖼️ 3. GANTI KESELURUHAN DESAIN MUKA DEPAN KARTU DENGAN GAMBAR SENDIRI (Opsional, rasio CR80 ~54x85.6mm):
  frontDesignUrl: idcardDepanImg,

  // 🖼️ 4. GANTI KESELURUHAN DESAIN MUKA BELAKANG KARTU DENGAN GAMBAR SENDIRI (Opsional):
  backDesignUrl: idcardBelakangImg,

  // 🎗️ 5. TEKS & WARNA PADA TALI LANYARD:
  lanyardText: "AGNAYA MUMTAZUL • UNIVERSITAS NUSA PUTRA • SOFTWARE ENGINEER • ",
  lanyardColor: "#09090b",
  lanyardSecondaryColor: "#3b82f6",

  // Fitur Keamanan Visual
  showHologram: false,
  showChip: false,
  showBarcode: false,
  showQrCode: false,
  emergencyContact: "TEL: +62 851-8338-0962 • mumtazulagnaya@gmail.com",
};

export const EDUCATION_DATA: EducationItem[] = [
  {
    id: "edu-1",
    degree: {
      id: "S1 - Teknik Informatika",
      en: "S1 - Informatics Engineering",
    },
    institution: "Universitas Nusa Putra",
    location: "Indonesia",
    period: "2024 - 2028",
    gpa: "3.59 / 4.00",
    description: {
      id: "Fokus studi pada Rekayasa Perangkat Lunak, Arsitektur Sistem Terdistribusi, dan Penerapan Algoritma Kecerdasan Buatan.",
      en: "Specialized in Software Engineering, Distributed Systems Architecture, and Applied AI Algorithms.",
    },
    highlights: {
      id: [
        "-",
      ],
      en: [
        "-",
      ],
    },
    badgeText: "-",
    iconType: "university",
  },
  {
    id: "edu-2",
    degree: {
      id: "Sertifikasi Workshop Teknik Informatika 2025",
      en: "2025 Informatics Engineering Workshop Certification",
    },
    institution: "Nusa Putra University & NUTRAL",
    location: "Auditorium Nusa Putra University",
    period: "2025",
    description: {
      id: "Mempercepat Pengembangan AI dengan DevOps: Menjembatani Otomatisasi dan Kecerdasan",
      en: "Accelerating AI Development with DevOps: Bridging Automation and Intelligence",
    },
    highlights: {
      id: [
        "Software Engineer & AI Development Expert Speaker",
        "Workshop Otomatisasi dan Kecerdasan dalam DevOps",
        "AI & DevOps Integration for Rapid Prototyping and Deployment",
      ],
      en: [
        "Software Engineer & AI Development Expert Speaker",
        "Automation and Intelligence in DevOps Workshop",
        "AI & DevOps Integration for Rapid Prototyping and Deployment",
      ],
    },
    badgeText: "Certified Specialist",
    iconType: "cert",
  },
  {
    id: "edu-3",
    degree: {
      id: "Sekolah Menengah Atas (MIPA & Olimpiade Komputer)",
      en: "High School (Mathematics & Computer Science Olympiad Track)",
    },
    institution: "SMA Negeri Unggulan",
    location: "Indonesia",
    period: "2017 - 2020",
    description: {
      id: "Jurusan Matematika dan Ilmu Pengetahuan Alam dengan fokus kompetisi Olimpiade Sains Nasional (OSN) Bidang Informatika/Komputer.",
      en: "Mathematics and Natural Sciences major with competitive focus on National Science Olympiad in Informatics/Computer Science.",
    },
    highlights: {
      id: [
        "Medalis Olimpiade Sains Informatika Tingkat Provinsi",
        "Pendiri Komunitas Coding & Robotika Sekolah",
        "Lulusan Terbaik Bidang Akademik Sains & Matematika",
      ],
      en: [
        "Provincial Informatics Science Olympiad Medalist",
        "Founder of the School Coding & Robotics Club",
        "Top Graduate in Academic Science & Mathematics Division",
      ],
    },
    badgeText: "Olympiad Honor",
    iconType: "school",
  },
];

export const EDUCATION_PHOTOS: EducationPhoto[] = [
  {
    id: "photo-1",
    title: {
      id: "Momen Wisuda Sarjana & Penghargaan Cum Laude",
      en: "Graduation Day & Cum Laude Honors Ceremony",
    },
    category: {
      id: "Wisuda & Kelulusan",
      en: "Graduation & Honors",
    },
    date: "2024",
    imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop",
    description: {
      id: "Perayaan kelulusan Sarjana Ilmu Komputer dengan penghargaan predikat kehormatan Cum Laude bersama dosen pembimbing dan rekan sejawat.",
      en: "Graduation celebration for Bachelor of Computer Science with Cum Laude distinction alongside professors and peers.",
    },
    location: "Auditorium Utama Kampus",
  },
  {
    id: "photo-2",
    title: {
      id: "Juara 1 Hackathon Inovasi Teknologi Nasional",
      en: "1st Place National Tech Innovation Hackathon",
    },
    category: {
      id: "Kompetisi & Hackathon",
      en: "Competition & Hackathon",
    },
    date: "2023",
    imageUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200&auto=format&fit=crop",
    description: {
      id: "Mempresentasikan prototipe platform cerdas berbasis AI dan arsitektur serverless di babak grand final 48 jam nonstop.",
      en: "Presenting an AI-powered smart platform and serverless prototype at the 48-hour nonstop grand finals.",
    },
    location: "Jakarta Tech Innovation Hub",
  },
  {
    id: "photo-3",
    title: {
      id: "Riset Laboratorium Komputasi & AI",
      en: "Computing & AI Research Laboratory",
    },
    category: {
      id: "Riset & Akademik",
      en: "Research & Academic",
    },
    date: "2023",
    imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop",
    description: {
      id: "Kolaborasi bersama tim laboratorium dalam pengembangan sistem pemrosesan bahasa alami dan visualisasi data performa tinggi.",
      en: "Collaborating with laboratory researchers on NLP pipelines and high-throughput real-time data visualization.",
    },
    location: "Advanced Computing Lab",
  },
  {
    id: "photo-4",
    title: {
      id: "Pembicara Workshop & Mentoring Mahasiswa Baru",
      en: "Workshop Speaker & Junior Developer Mentorship",
    },
    category: {
      id: "Berbagi & Komunitas",
      en: "Community & Speaking",
    },
    date: "2024",
    imageUrl: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=1200&auto=format&fit=crop",
    description: {
      id: "Mengisi sesi pengenalan Modern Web Architecture, React 19, dan Best Practice TypeScript untuk 150+ mahasiswa.",
      en: "Delivering a keynote session on Modern Web Architecture, React 19, and TypeScript Best Practices for 150+ students.",
    },
    location: "Faculty Hall & Tech Center",
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "frontend",
    name: { id: "Frontend & Creative UI", en: "Frontend & Creative UI" },
    iconName: "Layout",
    skills: [
      { name: "React 19 / Next.js", level: 5, category: "frontend", yearsOfExp: "> 6 Bln", isFavorite: false },
      { name: "TypeScript", level: 1, category: "frontend", yearsOfExp: "< 2 Bln", isFavorite: false },
      { name: "Tailwind CSS v4", level: 1, category: "frontend", yearsOfExp: "< 2 Bln", isFavorite: false },
      { name: "Three.js / WebGL / Canvas", level: 1, category: "frontend", yearsOfExp: "< 1 Bln", isFavorite: false },
      { name: "HTML5 / CSS3", level: 70, category: "frontend", yearsOfExp: "> 2 Thn", isFavorite: true },
    ],
  },
  {
    id: "backend",
    name: { id: "Backend & System Engineering", en: "Backend & System Engineering" },
    iconName: "Server",
    skills: [
      { name: "Node.js & Express / Fastify", level: 20, category: "backend", yearsOfExp: "> 6 Bln", isFavorite: true },
      { name: "MySQL", level: 89, category: "backend", yearsOfExp: "> 3 Thn", isFavorite: true },
      { name: "Python & FastAPI", level: 60, category: "backend", yearsOfExp: "> 2 Thn", isFavorite: false },
    ],
  },
  {
    id: "ai",
    name: { id: "AI Engineering & Modern LLM", en: "AI Engineering & Modern LLM" },
    iconName: "Sparkles",
    skills: [
      { name: "-", level: 0, category: "-", yearsOfExp: "-", isFavorite: true },
    ],
  },
  {
    id: "devops",
    name: { id: "Cloud, DevOps & Tools", en: "Cloud, DevOps & Tools" },
    iconName: "Cloud",
    skills: [
      { name: "Git / GitHub Actions CI/CD", level: 80, category: "devops", yearsOfExp: "> 2 Thn", isFavorite: true },
    ],
  },
];

export const CURRENT_LEARNING: LearningItem[] = [
  {
    id: "learn-1",
    title: "-",
    topic: {
      id: "-",
      en: "-",
    },
    progress: 0,
    status: "in-progress",
    description: {
      id: "-",
      en: "-",
    },
    resources: [
      "-",
    ],
    keyTakeaways: {
      id: [
        "-",
      ],
      en: [
        "-",
      ],
    },
    startedDate: "-",
    badgeColor: "emerald",
  },
];

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: "exp-1",
    role: {
      id: "-",
      en: "-",
    },
    company: "-",
    companyUrl: "https://example.com",
    location: "-",
    type: { id: "-", en: "-" },
    period: "-",
    isCurrent: true,
    summary: {
      id: "-",
      en: "-",
    },
    achievements: {
      id: [
        "-",
      ],
      en: [
        "-",
      ],
    },
    technologies: ["-"],
  },
];

export const FEATURED_PROJECTS: ProjectItem[] = [
  {
    id: "proj-1",
    title: "-",
    tagline: {
      id: "-",
      en: "-",
    },
    category: "Full-Stack",
    imageUrl: "-",
    demoUrl: "-",
    githubUrl: "-",
    technologies: ["-"],
    featured: true,
    date: "2025",
    overview: {
      id: "-",
      en: "-",
    },
    challenges: {
      id: "-",
      en: "-",
    },
    solutions: {
      id: "-",
      en: "-",
    },
    metrics: {
      id: [
        "-",
      ],
      en: [
        "-",
      ],
    },
  },
];
