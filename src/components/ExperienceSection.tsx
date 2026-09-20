import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Briefcase,
  Layers,
  Calendar,
  MapPin,
  ExternalLink,
  Github,
  CheckCircle2,
  Sparkles,
  ArrowUpRight,
  TrendingUp,
} from "lucide-react";
import { EXPERIENCE_DATA, FEATURED_PROJECTS } from "../data/portfolioData";
import { ProjectItem } from "../types";
import { usePortfolio } from "../context/PortfolioContext";
import { ProjectModal } from "./ProjectModal";

export const ExperienceSection: React.FC = () => {
  const { lang } = usePortfolio();
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const projectCategories = ["All", "AI & ML", "Full-Stack", "Web & 3D", "Mobile & API"];

  const filteredProjects =
    activeCategory === "All"
      ? FEATURED_PROJECTS
      : FEATURED_PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <section id="experience" className="py-20 md:py-28 relative">
      {/* Background ambient */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* ================= SECTION 1: WORK EXPERIENCE ================= */}
        <div>
          {/* Section Header */}
          <div className="space-y-3 mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-semibold">
              <Briefcase className="w-3.5 h-3.5 text-zinc-400" />
              <span>{lang === "id" ? "Karier & Kontribusi Profesional" : "Professional Career Journey"}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {lang === "id" ? "Pengalaman Kerja & Kepemimpinan Teknis" : "Work Experience & Engineering"}
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base max-w-2xl">
              {lang === "id"
                ? "Rekam jejak membangun produk software skala enterprise, arsitektur AI, dan sistem berperforma tinggi dengan dampak bisnis nyata."
                : "A track record of engineering enterprise-scale software products, AI pipelines, and high-throughput systems delivering measurable business impact."}
            </p>
          </div>

          {/* Experience Timeline Cards */}
          <div className="space-y-6">
            {EXPERIENCE_DATA.map((exp, index) => (
              <motion.div
                key={exp.id}
                id={`exp-card-${exp.id}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group p-6 sm:p-8 rounded-3xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all duration-300 shadow-2xl"
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-zinc-200 transition-colors">
                        {exp.role[lang]}
                      </h3>
                      {exp.isCurrent && (
                        <span className="px-2.5 py-0.5 rounded-full bg-zinc-800 text-zinc-200 border border-zinc-700 text-xs font-mono font-bold flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                          {lang === "id" ? "Saat Ini" : "Current"}
                        </span>
                      )}
                    </div>
                    <div className="text-sm font-semibold text-zinc-300">
                      {exp.company}
                    </div>
                    <div className="flex items-center gap-4 text-xs text-zinc-400 pt-0.5">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                        {exp.period}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                        {exp.location}
                      </span>
                      <span>•</span>
                      <span className="text-zinc-400">{exp.type[lang]}</span>
                    </div>
                  </div>
                </div>

                {/* Summary */}
                <p className="text-zinc-300 text-sm sm:text-base leading-relaxed mt-4">
                  {exp.summary[lang]}
                </p>

                {/* Measurable Achievements */}
                <div className="mt-4 pt-4 border-t border-zinc-800 space-y-2">
                  <div className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest">
                    {lang === "id" ? "Dampak & Pencapaian Utama" : "Key Achievements & Impact"}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {exp.achievements[lang].map((ach, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2.5 p-3 rounded-xl bg-zinc-950/80 border border-zinc-800 text-xs sm:text-sm text-zinc-200"
                      >
                        <CheckCircle2 className="w-4 h-4 text-zinc-400 flex-shrink-0 mt-0.5" />
                        <span>{ach}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 pt-4">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-lg bg-zinc-950 border border-zinc-800 text-[11px] font-mono text-zinc-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ================= SECTION 2: FEATURED PROJECTS ================= */}
        <div className="pt-8 border-t border-zinc-800">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-semibold">
                <Layers className="w-3.5 h-3.5 text-zinc-400" />
                <span>{lang === "id" ? "Karya & Portofolio Pilihan" : "Curated Portfolio Showcase"}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                {lang === "id" ? "Proyek Unggulan & Studi Kasus" : "Featured Projects & Case Studies"}
              </h2>
              <p className="text-zinc-400 text-sm sm:text-base max-w-2xl">
                {lang === "id"
                  ? "Eksplorasi proyek nyata dengan arsitektur modern, implementasi AI, dan antarmuka 3D grafis interaktif."
                  : "A showcase of production-ready projects demonstrating modern architecture, AI integrations, and interactive 3D web interfaces."}
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-zinc-900 border border-zinc-800">
              {projectCategories.map((cat) => (
                <button
                  key={cat}
                  id={`proj-cat-${cat}-btn`}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    activeCategory === cat
                      ? "bg-zinc-800 text-white border border-zinc-700 shadow-md"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Project Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                id={`project-card-${project.id}`}
                className="group relative rounded-3xl bg-zinc-900 border border-zinc-800 overflow-hidden hover:border-zinc-700 transition-all duration-300 flex flex-col shadow-2xl"
              >
                {/* Project Image */}
                <div
                  className="relative aspect-video w-full bg-zinc-950 overflow-hidden cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80" />

                  {/* Category Pill */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-zinc-900/90 backdrop-blur-md text-zinc-200 border border-zinc-700 text-xs font-semibold">
                      {project.category}
                    </span>
                  </div>

                  {/* View Details Hint */}
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="px-3 py-1.5 rounded-full bg-white text-zinc-950 text-xs font-bold shadow-lg flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      {lang === "id" ? "Buka Studi Kasus" : "Case Study"}
                    </span>
                  </div>
                </div>

                {/* Project Body */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3
                      className="text-lg sm:text-xl font-bold text-white group-hover:text-zinc-200 transition-colors cursor-pointer"
                      onClick={() => setSelectedProject(project)}
                    >
                      {project.title}
                    </h3>
                    <p className="text-zinc-400 text-xs sm:text-sm line-clamp-2 leading-relaxed">
                      {project.tagline[lang]}
                    </p>
                  </div>

                  {/* Tech Stack Chips */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded-md bg-zinc-950 border border-zinc-800 text-[10px] font-mono text-zinc-300"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-1.5 py-0.5 rounded-md bg-zinc-950 text-[10px] font-mono text-zinc-500">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Card Actions */}
                  <div className="pt-3 border-t border-zinc-800 flex items-center justify-between">
                    <button
                      id={`view-study-${project.id}-btn`}
                      onClick={() => setSelectedProject(project)}
                      className="text-xs font-semibold text-zinc-300 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <span>{lang === "id" ? "Detail Lengkap" : "Case Study"}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center gap-2">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors"
                          title="Source Code"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 transition-colors"
                          title="Live Demo"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Case Study Modal */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
};
