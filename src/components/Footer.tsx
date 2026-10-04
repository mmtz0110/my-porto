import React from "react";
import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";
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
    <footer id="main-footer" className="bg-[#111310] text-[#F6F6F4] border-t-4 border-[#D63229] py-12 text-sm font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b-2 border-dashed border-gray-700">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white text-[#111310] flex items-center justify-center font-bold text-lg border-2 border-transparent">
              AM
            </div>
            <div>
              <div className="font-semibold text-white text-base">{PERSONAL_INFO.name}</div>
              <p className="text-xs text-gray-400 mt-1">Software & web development</p>
            </div>
          </div>

          {/* Socials */}
          <div className="flex items-center gap-4">
            <a
              id="footer-github-link"
              href={PERSONAL_INFO.socials.github}
              target="_blank"
              rel="noreferrer"
              className="p-3 bg-[#F6F6F4] text-[#111310] hover:bg-[#D63229] hover:text-white transition-colors"
              aria-label="GitHub Agnaya"
            >
              <Github className="w-5 h-5" />
            </a>
            {PERSONAL_INFO.socials.linkedin !== "-" && (
              <a
                id="footer-linkedin-link"
                href={PERSONAL_INFO.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-3 bg-[#F6F6F4] text-[#111310] hover:bg-[#D63229] hover:text-white transition-colors"
                aria-label="LinkedIn Agnaya"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            )}
            <a
              id="footer-email-link"
              href={`mailto:${PERSONAL_INFO.email}`}
              className="p-3 bg-[#F6F6F4] text-[#111310] hover:bg-[#D63229] hover:text-white transition-colors"
              aria-label="Email Agnaya"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>

          {/* Back to top button */}
          <button
            id="back-to-top-btn"
            onClick={scrollToTop}
            className="px-5 py-3 bg-[#F6F6F4] text-[#111310] hover:bg-gray-200 transition-colors flex items-center gap-2 font-bold uppercase text-xs cursor-pointer shadow-[2px_2px_0px_#D63229] active:translate-y-px active:translate-x-px active:shadow-none"
          >
            <span>{lang === "id" ? "Kembali ke Atas" : "Back to Top"}</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-gray-400 text-xs font-bold uppercase tracking-wider">
          <p>
            © {new Date().getFullYear()} {PERSONAL_INFO.name}
          </p>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-2 text-white bg-gray-800 px-3 py-1.5 border border-gray-700">
              {lang === "id" ? "Mahasiswa Teknik Informatika · Indonesia" : "Informatics student · Indonesia"}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

