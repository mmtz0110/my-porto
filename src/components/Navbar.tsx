import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  Sun,
  Moon,
  Globe,
  Menu,
  X,
  GraduationCap,
  Briefcase,
  Code2,
  Mail,
  User,
  ShieldCheck,
} from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";

interface NavItem {
  id: string;
  label: { id: string; en: string };
  icon: React.ElementType;
}

const NAV_ITEMS: NavItem[] = [
  { id: "hero", label: { id: "Home", en: "Home" }, icon: User },
  { id: "education", label: { id: "Pendidikan", en: "Education" }, icon: GraduationCap },
  { id: "skills", label: { id: "Keahlian", en: "Skills" }, icon: Code2 },
  { id: "experience", label: { id: "Pengalaman & Proyek", en: "Experience & Projects" }, icon: Briefcase },
  { id: "contact", label: { id: "Kontak", en: "Contact" }, icon: Mail },
];

export const Navbar: React.FC = () => {
  const { lang, setLang, theme, toggleTheme, activeSection, setActiveSection } = usePortfolio();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      // Simple scroll spy
      const sections = NAV_ITEMS.map((item) => item.id);
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setActiveSection]);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
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
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "py-3 bg-[#09090b]/85 backdrop-blur-xl border-b border-zinc-800 shadow-2xl shadow-black/60"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Badge */}
          <button
            id="brand-logo-btn"
            onClick={() => scrollToSection("hero")}
            className="flex items-center gap-3 group text-left cursor-pointer"
          >
            <div className="relative w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 p-[2px] shadow-lg group-hover:border-zinc-700 transition-all">
              <div className="w-full h-full bg-[#09090b] rounded-[9px] flex items-center justify-center font-bold text-white text-xs tracking-wider">
                AM
              </div>
              <span className="absolute -bottom-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500 border border-[#09090b]"></span>
              </span>
            </div>
            <div>
              <div className=" text-zinc-500 text-base tracking-tight flex items-center gap-1.5">
                <span>AGNAYA  <span className="text-base tracking-tight font-bold text-white"> MUMTAZ <span className="text-zinc-500 font-light gap-1.5">UL</span></span></span>
              </div>
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-medium">Tech Enthusiast & Software Engineer</p>
            </div>
          </button>

          {/* Desktop Nav Items */}
          <nav id="desktop-navigation" className="hidden lg:flex items-center gap-1 bg-zinc-900/60 p-1.5 rounded-full border border-zinc-800/80 backdrop-blur-md">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-4 py-1.5 rounded-full text-xs uppercase tracking-wider font-medium transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? "text-white font-semibold"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavPill"
                      className="absolute inset-0 bg-zinc-800 border border-zinc-700 rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <Icon className={`w-3.5 h-3.5 relative z-10 ${isActive ? "text-blue-400" : "text-zinc-500"}`} />
                  <span className="relative z-10">{item.label[lang]}</span>
                </button>
              );
            })}
          </nav>

          {/* Action Buttons: Lang, Theme */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Toggle */}
            <button
              id="language-toggle-btn"
              onClick={() => setLang(lang === "id" ? "en" : "id")}
              className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
              title={lang === "id" ? "Switch to English" : "Ganti ke Bahasa Indonesia"}
            >
              <Globe className="w-4 h-4 text-zinc-400" />
              <span className="uppercase text-[11px] font-bold">{lang}</span>
            </button>

            {/* Theme Toggle */}
            <button
              id="theme-toggle-btn"
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-amber-300 transition-colors cursor-pointer"
              title={theme === "dark" ? "Mode Terang" : "Mode Gelap"}
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-zinc-400" />
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#09090b]/95 border-b border-zinc-800 backdrop-blur-2xl overflow-hidden mt-3"
          >
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-1.5">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    id={`mobile-nav-link-${item.id}`}
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors text-left cursor-pointer ${
                      isActive
                        ? "bg-zinc-800 text-white border border-zinc-700"
                        : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? "text-blue-400" : "text-zinc-500"}`} />
                    <span>{item.label[lang]}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
