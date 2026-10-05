import React, { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  ExternalLink,
  Github,
  Calendar,
  Layers,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
} from "lucide-react";
import { ProjectItem } from "../types";
import { usePortfolio } from "../context/PortfolioContext";

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const { lang } = usePortfolio();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div
        id="project-case-study-backdrop"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xl overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          id="project-case-study-modal"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="relative max-w-3xl w-full bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl my-8 text-left"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            id="modal-close-btn"
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-zinc-950/80 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700 backdrop-blur-md transition-colors cursor-pointer"
            aria-label="Tutup case study"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Hero Image */}
          <div className="relative aspect-video max-h-72 w-full bg-[#111310] overflow-hidden">
            {project.imageUrl ? (
              <img
                src={project.imageUrl}
                alt=""
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="flex h-full items-center justify-center px-6 text-center text-3xl font-semibold tracking-tight text-white/35 sm:text-5xl" aria-hidden="true">
                {project.title}
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent" />
            
            <div className="absolute bottom-4 left-6 right-6">
              <span className="px-3 py-1 rounded-full bg-white text-zinc-950 text-xs font-bold">
                {project.category}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2 tracking-tight">
                {project.title}
              </h2>
            </div>
          </div>

          {/* Modal Content */}
          <div className="p-6 sm:p-8 space-y-6">
            {/* Tagline & Links */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-zinc-800">
              <p className="text-zinc-300 text-sm font-medium max-w-lg">
                {project.tagline[lang]}
              </p>
              <div className="flex items-center gap-2">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white border border-zinc-700 transition-colors flex items-center gap-1.5 text-xs font-semibold"
                  >
                    <Github className="w-4 h-4" />
                    <span>Source</span>
                  </a>
                )}
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2.5 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 font-bold text-xs flex items-center gap-1.5 shadow-md transition-all"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>
            </div>

            {/* Overview */}
            <div className="space-y-2">
              <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-bold">
                {lang === "id" ? "Ringkasan Proyek" : "Project Overview"}
              </h3>
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                {project.overview[lang]}
              </p>
            </div>

            {project.screenshots && project.screenshots.length > 0 && (
              <section aria-labelledby="project-documentation-heading" className="space-y-3">
                <h3 id="project-documentation-heading" className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-bold">
                  {lang === "id" ? "Dokumentasi" : "Project documentation"}
                </h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {project.screenshots.map((screenshot) => (
                    <figure key={screenshot.imageUrl} className="overflow-hidden border border-zinc-800 bg-zinc-950">
                      <img
                        src={screenshot.imageUrl}
                        alt={screenshot.caption[lang]}
                        loading="lazy"
                        className="max-h-[34rem] w-full object-contain"
                      />
                      <figcaption className="border-t border-zinc-800 px-3 py-2 text-xs text-zinc-400">
                        {screenshot.caption[lang]}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </section>
            )}

            {/* Challenge & Solution Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800 space-y-2">
                <div className="flex items-center gap-2 text-zinc-300 text-xs font-mono font-bold uppercase tracking-wider">
                  <AlertCircle className="w-4 h-4 text-[#f9e2af]" />
                  <span>{lang === "id" ? "Tantangan Utama" : "Core Challenge"}</span>
                </div>
                <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed">
                  {project.challenges[lang]}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800 space-y-2">
                <div className="flex items-center gap-2 text-zinc-300 text-xs font-mono font-bold uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>{lang === "id" ? "Solusi & Arsitektur" : "Solution & Approach"}</span>
                </div>
                <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed">
                  {project.solutions[lang]}
                </p>
              </div>
            </div>

            {/* Quantifiable Results & Metrics */}
            {project.metrics[lang].length > 0 && (
              <div className="space-y-2.5">
                <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-bold flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4" />
                  <span>{lang === "id" ? "Hasil & Dampak" : "Results & Impact"}</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {project.metrics[lang].map((metric) => (
                    <div key={metric} className="p-3 bg-zinc-950 border border-zinc-800 text-xs text-zinc-200">
                      {metric}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tech Stack Pills */}
            {project.technologies.length > 0 && (
              <div className="pt-2 border-t border-zinc-800 space-y-2">
                <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-bold">
                  {lang === "id" ? "Teknologi dan konsep" : "Tools and concepts"}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="px-3 py-1 bg-zinc-950 border border-zinc-800 text-zinc-300 text-xs font-mono">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
