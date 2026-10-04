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
  { id: "about", label: { id: "Tentang", en: "About" }, icon: User },
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
          ? "py-2 bg-[#F6F6F4] border-b-2 border-[#111310] shadow-[0_4px_0px_rgba(17,19,16,1)]"
          : "py-4 bg-transparent border-b-2 border-transparent"
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
            <div className="w-10 h-10 bg-[#111310] flex items-center justify-center font-medium text-white text-base tracking-wide">
              AM
            </div>
            <div>
              <div className="text-[#111310] font-semibold text-sm tracking-tight">
                Agnaya Mumtazul Wafir
              </div>
              <p className="text-[11px] text-[#111310]/60 tracking-wide">Informatics student · Developer</p>
            </div>
          </button>

          {/* Desktop Nav Items */}
          <nav id="desktop-navigation" className="hidden lg:flex items-center bg-white border-2 border-[#111310] p-1 shadow-[2px_2px_0px_#111310]">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-4 py-1.5 text-xs font-mono uppercase font-bold transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? "bg-[#111310] text-white"
                      : "text-[#111310] hover:bg-gray-100"
                  }`}
                >
                  <span className="relative z-10">{item.label[lang]}</span>
                </button>
              );
            })}
          </nav>

          {/* Action Buttons: Lang */}
          <div className="flex items-center gap-3">
            {/* Language Toggle */}
            <button
              id="language-toggle-btn"
              onClick={() => setLang(lang === "id" ? "en" : "id")}
              className="px-3 py-2 bg-white hover:bg-gray-100 border-2 border-[#111310] text-[#111310] font-bold text-xs uppercase font-mono transition-transform shadow-[2px_2px_0px_#111310] active:translate-y-1 active:translate-x-1 active:shadow-none cursor-pointer flex items-center gap-2"
              title={lang === "id" ? "Switch to English" : "Ganti ke Bahasa Indonesia"}
            >
              <Globe className="w-4 h-4" />
              <span>{lang}</span>
            </button>

            {/* Theme Toggle dihilangkan karena tema sekarang terkunci ke light-industrial (seperti kertas) */}
            
            {/* Mobile Menu Toggle */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 bg-white hover:bg-gray-100 border-2 border-[#111310] text-[#111310] transition-transform shadow-[2px_2px_0px_#111310] active:translate-y-1 active:translate-x-1 active:shadow-none cursor-pointer"
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
            className="lg:hidden bg-[#F6F6F4] border-b-2 border-[#111310] overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-2">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    id={`mobile-nav-link-${item.id}`}
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 font-mono text-sm font-bold uppercase transition-colors text-left cursor-pointer border-2 border-[#111310] ${
                      isActive
                        ? "bg-[#111310] text-white"
                        : "bg-white text-[#111310]"
                    }`}
                  >
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
