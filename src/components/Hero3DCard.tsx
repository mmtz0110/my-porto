import React from "react";
import { motion } from "motion/react";
import {
  ArrowRight,
  GraduationCap,
  Terminal,
} from "lucide-react";
import { PERSONAL_INFO, DEFAULT_ID_CARD_CONFIG } from "../data/portfolioData";
import { usePortfolio } from "../context/PortfolioContext";
import { Interactive3DIDCard } from "./Interactive3DIDCard";

export const Hero3DCard: React.FC = () => {
  const { lang, setActiveSection } = usePortfolio();

  // Scroll to sections
  const scrollTo = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="hero" className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-blue-600/10 via-purple-600/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/2 right-10 w-[400px] h-[400px] bg-purple-600/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Hero Text & Information */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Status Pill */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 backdrop-blur-md shadow-sm"
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-semibold text-zinc-300">
                {lang === "id" ? PERSONAL_INFO.status : PERSONAL_INFO.statusEn}
              </span>
              <span className="text-zinc-600">•</span>
              <span className="text-xs text-zinc-400 font-medium">{PERSONAL_INFO.location}</span>
            </motion.div>

            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-3"
            >
              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
                {lang === "id" ? (
                  <>
                    Halo, Saya{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-400">
                      Agnaya Mumtazul
                    </span>
                  </>
                ) : (
                  <>
                    Hi, I am{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-400">
                      Agnaya Mumtazul
                    </span>
                  </>
                )}
              </h1>
              <p className="text-lg sm:text-xl font-medium text-zinc-300">
                {PERSONAL_INFO.title}
              </p>
              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-2xl">
                {PERSONAL_INFO.tagline[lang]}
              </p>
            </motion.div>

            {/* Quick Metrics Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-3 gap-3 sm:gap-4 py-3 max-w-lg"
            >
              <div className="p-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800 backdrop-blur-sm">
                <div className="text-xl sm:text-2xl font-bold text-white">{PERSONAL_INFO.yearsExperience}</div>
                <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">
                  {lang === "id" ? "Pengalaman" : "Experience"}
                </div>
              </div>
              <div className="p-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800 backdrop-blur-sm">
                <div className="text-xl sm:text-2xl font-bold text-white">{PERSONAL_INFO.projectsCompleted}</div>
                <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">
                  {lang === "id" ? "Proyek" : "Projects"}
                </div>
              </div>
              <div className="p-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800 backdrop-blur-sm">
                <div className="text-xl sm:text-2xl font-bold text-white">3.59</div>
                <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">
                  {lang === "id" ? "IPK" : "GPA Score"}
                </div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-3 pt-2"
            >
              <button
                id="hero-contact-btn"
                onClick={() => scrollTo("contact")}
                className="px-6 py-3 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 font-semibold text-sm flex items-center gap-2 shadow-xl transition-all active:scale-95 cursor-pointer"
              >
                <span>{lang === "id" ? "Hubungi Saya" : "Get in Touch"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-education-btn"
                onClick={() => scrollTo("education")}
                className="px-5 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 hover:text-white font-medium text-sm flex items-center gap-2 transition-all cursor-pointer"
              >
                <GraduationCap className="w-4 h-4 text-zinc-400" />
                <span>{lang === "id" ? "Riwayat Pendidikan" : "Education & Photos"}</span>
              </button>

              <button
                id="hero-skills-btn"
                onClick={() => scrollTo("skills")}
                className="px-5 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 hover:text-white font-medium text-sm flex items-center gap-2 transition-all cursor-pointer"
              >
                <Terminal className="w-4 h-4 text-zinc-400" />
                <span>{lang === "id" ? "Keahlian & Riset" : "Skills & Learning"}</span>
              </button>
            </motion.div>
          </div>

          {/* Right Column: Interactive 3D WebGL Physical ID Card */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center">
            <div className="w-full max-w-[560px]">
              <Interactive3DIDCard
                cardConfig={DEFAULT_ID_CARD_CONFIG}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
