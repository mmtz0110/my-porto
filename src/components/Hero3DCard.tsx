import React, { useState, useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";
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
  const [typedName, setTypedName] = useState("");
  const [phase, setPhase] = useState<"typing" | "deleting">("typing");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  const phrases = ["Agnaya\nMumtazul Wafir"];

  // Typing effect hook (Looping with Backspace)
  useEffect(() => {
    if (shouldReduceMotion) {
      setTypedName(phrases[0]);
      return;
    }

    let timeout: ReturnType<typeof setTimeout>;
    const currentPhrase = phrases[phraseIndex];

    if (phase === "typing") {
      if (typedName.length < currentPhrase.length) {
        timeout = setTimeout(() => {
          setTypedName(currentPhrase.slice(0, typedName.length + 1));
        }, 120); // Typing speed
      } else {
        // Finished typing, wait before changing phase to deleting
        timeout = setTimeout(() => {
          setPhase("deleting");
        }, phraseIndex === 0 ? 2000 : 1000); // 2s for phrase 1, 1s for phrase 2
      }
    } else if (phase === "deleting") {
      if (typedName.length > 0) {
        timeout = setTimeout(() => {
          setTypedName(currentPhrase.slice(0, typedName.length - 1));
        }, 60); // Deleting speed (usually faster than typing)
      } else {
        // Finished deleting, wait a little bit then move to next phrase
        timeout = setTimeout(() => {
          setPhraseIndex((prev) => (prev + 1) % phrases.length);
          setPhase("typing");
        }, 300);
      }
    }

    return () => clearTimeout(timeout);
  }, [typedName, phase, phraseIndex, shouldReduceMotion]);

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Hero Text & Information */}
          <div className="lg:col-span-6 space-y-8 text-left">
            {/* Status Pill */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex flex-wrap items-center gap-2 border-b border-[#111310]/30 pb-3"
            >
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full bg-[#D63229] opacity-75"></span>
                <span className="relative inline-flex h-2.5 w-2.5 bg-[#D63229]"></span>
              </span>
              <span className="text-xs font-mono font-medium text-[#111310] tracking-wide">
                {lang === "id" ? PERSONAL_INFO.status : PERSONAL_INFO.statusEn}
              </span>
              <span className="text-[#111310] font-bold">•</span>
              <span className="text-xs font-mono text-[#111310]/70 tracking-wide">{PERSONAL_INFO.location}</span>
            </motion.div>

            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-4"
            >
              <h1 aria-label={lang === "id" ? PERSONAL_INFO.name : `Hi, I am ${PERSONAL_INFO.name}`} className="text-4xl sm:text-5xl xl:text-7xl font-semibold tracking-[-0.06em] text-[#111310] leading-[1.02]">
                {lang === "id" ? (
                  <>
                    Halo, Saya <br/>
                    <span aria-hidden="true" className="border-l-4 border-[#D63229] pl-4 inline-block mt-2 min-h-[1.1em] overflow-hidden whitespace-pre-wrap align-top">
                      {typedName}
                      <motion.span
                        animate={shouldReduceMotion ? { opacity: 1 } : { opacity: [1, 0, 1] }}
                        transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                        className="inline-block w-2 sm:w-3 h-[0.8em] bg-[#D63229] ml-1 sm:ml-2 align-baseline"
                      />
                    </span>
                  </>
                ) : (
                  <>
                    Hi, I am <br/>
                    <span aria-hidden="true" className="border-l-4 border-[#D63229] pl-4 inline-block mt-2 min-h-[1.1em] overflow-hidden whitespace-pre-wrap align-top">
                      {typedName}
                      <motion.span
                        animate={shouldReduceMotion ? { opacity: 1 } : { opacity: [1, 0, 1] }}
                        transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                        className="inline-block w-2 sm:w-3 h-[0.8em] bg-[#D63229] ml-1 sm:ml-2 align-baseline"
                      />
                    </span>
                  </>
                )}
              </h1>
              <p className="text-lg sm:text-xl font-mono font-medium text-[#D63229]">
                {PERSONAL_INFO.title}
              </p>
              <p className="text-[#111310] font-medium text-lg leading-relaxed max-w-2xl">
                {PERSONAL_INFO.tagline[lang]}
              </p>
            </motion.div>

            {/* Quick Metrics Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap gap-x-10 gap-y-4 py-5 max-w-lg border-y border-[#111310]/25"
            >
              <div>
                <div className="text-base font-semibold text-[#111310]">Universitas Nusa Putra</div>
                <div className="text-xs text-[#111310]/60 mt-1">
                  {lang === "id" ? "Teknik Informatika" : "Informatics Engineering"}
                </div>
              </div>
              <div>
                <div className="text-base font-semibold text-[#111310]">Indonesia</div>
                <div className="text-xs text-[#111310]/60 mt-1">
                  {lang === "id" ? "Lokasi" : "Location"}
                </div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <button
                id="hero-contact-btn"
                onClick={() => scrollTo("contact")}
                className="px-6 py-4 bg-[#D63229] hover:bg-[#b02921] text-white font-bold font-mono text-sm uppercase flex items-center gap-2 border-2 border-[#111310] shadow-[4px_4px_0px_#111310] transition-transform active:translate-x-1 active:translate-y-1 active:shadow-none cursor-pointer"
              >
                <span>{lang === "id" ? "Hubungi Agnaya" : "Contact Agnaya"}</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                id="hero-education-btn"
                onClick={() => scrollTo("education")}
                className="px-6 py-4 bg-white hover:bg-gray-100 text-[#111310] font-bold font-mono text-sm uppercase flex items-center gap-2 border-2 border-[#111310] shadow-[4px_4px_0px_#111310] transition-transform active:translate-x-1 active:translate-y-1 active:shadow-none cursor-pointer"
              >
                <GraduationCap className="w-5 h-5" />
                <span>{lang === "id" ? "Pendidikan" : "Education"}</span>
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
