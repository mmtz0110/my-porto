import React from "react";
import { ArrowUp, Github, Linkedin, Mail, Sparkles, ShieldCheck } from "lucide-react";
import { PERSONAL_INFO } from "../data/portfolioData";
import { usePortfolio } from "../context/PortfolioContext";

export const Footer: React.FC = () => {
  const { lang, setActiveSection } = usePortfolio();

  const scrollToTop = () => {
    setActiveSection("hero");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer id="main-footer" className="bg-zinc-950 border-t border-zinc-900 py-12 text-zinc-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-zinc-900">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center font-bold text-white text-xs">
              AM
            </div>
            <div>
              <div className="font-bold text-white text-sm flex items-center gap-1.5">
                <span>Agnaya Mumtazul</span>
                <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
              </div>
              <p className="text-[11px] text-zinc-500 font-mono">
                TECH ENTHUSIAST & SOFTWARE ENGINEER
              </p>
            </div>
          </div>

          {/* Socials */}
          <div className="flex items-center gap-3">
            <a
              id="footer-github-link"
              href={PERSONAL_INFO.socials.github}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white transition-colors"
              aria-label="GitHub Agnaya"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              id="footer-linkedin-link"
              href={PERSONAL_INFO.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white transition-colors"
              aria-label="LinkedIn Agnaya"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              id="footer-email-link"
              href={`mailto:${PERSONAL_INFO.email}`}
              className="p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white transition-colors"
              aria-label="Email Agnaya"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

          {/* Back to top button */}
          <button
            id="back-to-top-btn"
            onClick={scrollToTop}
            className="p-2.5 px-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white transition-colors flex items-center gap-2 font-medium cursor-pointer"
          >
            <span>{lang === "id" ? "Kembali ke Atas" : "Back to Top"}</span>
            <ArrowUp className="w-3.5 h-3.5 text-zinc-400" />
          </button>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-zinc-500">
          <p>
            © {new Date().getFullYear()} Agnaya Mumtazul. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 font-mono text-[11px] text-zinc-400">
              <Sparkles className="w-3 h-3 text-zinc-500" />
              Interactive 3D Experience • React 19 • Tailwind v4
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

