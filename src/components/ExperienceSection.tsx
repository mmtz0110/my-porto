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

  const projectCategories = ["All", "AI & ML", "Full-Stack", "Web & 3D", "Mobile & API", "IoT & Embedded"];

  const filteredProjects =
    activeCategory === "All"
      ? FEATURED_PROJECTS
      : FEATURED_PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <section id="experience" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        
        {/* ================= SECTION 1: WORK EXPERIENCE ================= */}
        <div>
          {/* Section Header */}
          <div className="space-y-4 mb-12 border-b-2 border-[#111310] pb-8">
            <h2 className="text-3xl sm:text-5xl font-bold text-[#111310] uppercase tracking-tighter">
              {lang === "id" ? "Pengalaman & Organisasi" : "Work & Organization"}
            </h2>
            <p className="text-[#111310] font-medium text-sm sm:text-base max-w-2xl">
              {lang === "id"
                ? "Pengalaman saya mencakup pengembangan usaha bersama Leafiq.id dan kegiatan organisasi mahasiswa."
                : "My experience includes working on a business with Leafiq.id and contributing to student organization activities."}
            </p>
          </div>

          {/* Experience Timeline Cards */}
          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-1 before:bg-[#111310]">
            {EXPERIENCE_DATA.map((exp, index) => (
              <div
                key={exp.id}
                id={`exp-card-${exp.id}`}
                className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
              >
                {/* Timeline Node */}
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#111310] bg-[#F6F6F4] text-[#111310] shadow-[2px_2px_0px_#111310] absolute left-0 md:left-1/2 -translate-x-1/2 z-10 group-hover:bg-[#111310] group-hover:text-white transition-colors">
                  <Briefcase className="w-4 h-4" />
                </div>
                
                {/* Content Box */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-6 sm:p-8 bg-white border-2 border-[#111310] shadow-[6px_6px_0px_#111310] hover:-translate-y-1 hover:shadow-[8px_8px_0px_#111310] transition-all duration-300 ml-auto md:ml-0"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-xl font-bold text-[#111310] uppercase tracking-tight">
                          {exp.role[lang]}
                        </h3>
                        {exp.isCurrent && (
                          <span className="px-2 py-1 bg-[#D63229] text-white border-2 border-[#111310] text-[10px] font-mono font-bold uppercase flex items-center gap-1.5 shadow-[2px_2px_0px_#111310]">
                            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                            {lang === "id" ? "Saat Ini" : "Current"}
                          </span>
                        )}
                      </div>
                      <div className="text-sm font-mono font-bold text-[#D63229] uppercase tracking-widest">
                        {exp.company}
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-[10px] font-mono font-bold text-[#111310] uppercase pt-1">
                        <span className="flex items-center gap-1.5 bg-gray-200 px-2 py-1 border-2 border-transparent">
                          <Calendar className="w-3.5 h-3.5" />
                          {exp.period}
                        </span>
                        <span className="flex items-center gap-1.5 bg-gray-200 px-2 py-1 border-2 border-transparent">
                          <MapPin className="w-3.5 h-3.5" />
                          {exp.location}
                        </span>
                        <span className="bg-[#111310] text-white px-2 py-1 border-2 border-[#111310]">
                          {exp.type[lang]}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Summary */}
                  <p className="text-[#111310] text-sm sm:text-base leading-relaxed font-medium mt-6">
                    {exp.summary[lang]}
                  </p>

                  {/* Measurable Achievements */}
                  <div className="mt-6 pt-6 border-t-2 border-dashed border-gray-300 space-y-3">
                    <div className="text-xs font-mono font-bold text-[#111310] uppercase flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-[#D63229]" />
                      {lang === "id" ? "Dampak & Pencapaian Utama" : "Key Achievements & Impact"}
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      {exp.achievements[lang].map((ach, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-3 p-3 bg-gray-50 border-2 border-[#111310] text-xs sm:text-sm text-[#111310] font-medium"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#D63229] flex-shrink-0 mt-0.5" />
                          <span>{ach}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech Pills */}
                  <div className="flex flex-wrap gap-2 pt-6">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-white border-2 border-[#111310] text-[10px] font-mono font-bold text-[#111310] uppercase shadow-[2px_2px_0px_#111310]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>
            ))}
            {EXPERIENCE_DATA.length === 0 && (
              <p className="ml-14 md:ml-0 md:text-center text-sm text-[#111310]/60">
                {lang === "id" ? "Belum ada pengalaman kerja yang ditampilkan." : "No work experience entries yet."}
              </p>
            )}
          </div>
        </div>

        {/* ================= SECTION 2: FEATURED PROJECTS ================= */}
        <div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b-2 border-[#111310] pb-8">
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-5xl font-bold text-[#111310] uppercase tracking-tighter">
                {lang === "id" ? "Proyek Pilihan" : "Selected Projects"}
              </h2>
              <p className="text-[#111310] font-medium text-sm sm:text-base max-w-2xl">
                {lang === "id"
                  ? "Project software dan hardware yang sedang saya bangun atau eksplorasi."
                  : "Software and hardware projects I am building or exploring."}
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-3">
              {projectCategories.map((cat) => (
                <button
                  key={cat}
                  id={`proj-cat-${cat}-btn`}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 text-xs font-mono font-bold uppercase transition-all cursor-pointer border-2 border-[#111310] shadow-[2px_2px_0px_#111310] active:translate-y-0.5 active:translate-x-0.5 active:shadow-none ${
                    activeCategory === cat
                      ? "bg-[#111310] text-white"
                      : "bg-white text-[#111310] hover:bg-gray-100"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Project Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                id={`project-card-${project.id}`}
                className="group bg-white border-2 border-[#111310] shadow-[6px_6px_0px_#111310] hover:-translate-y-1 hover:shadow-[8px_8px_0px_#111310] transition-all duration-300 flex flex-col"
              >
                {/* Project Image */}
                <button
                  type="button"
                  className="relative aspect-video w-full bg-[#E8E8E3] border-b border-[#111310]/20 overflow-hidden text-left cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                  aria-label={`${lang === "id" ? "Lihat detail proyek" : "View project details"}: ${project.title}`}
                >
                  {project.imageUrl ? (
                    <img
                      src={project.imageUrl}
                      alt=""
                      className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <span className="flex h-full items-center justify-center px-6 text-center text-3xl font-semibold tracking-tight text-[#111310]/70 sm:text-5xl">
                      {project.title}
                    </span>
                  )}
                  
                  {/* Category Pill */}
                  <span className="absolute top-4 left-4 px-3 py-1 bg-white text-[#111310] border border-[#111310]/30 text-[10px] font-mono font-medium uppercase">
                    {project.date ? `${project.category} · ${project.date}` : project.category}
                  </span>

                  {/* View Details Hint */}
                  <span className="absolute inset-0 bg-[#111310]/55 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-4 py-2 bg-white text-[#111310] text-xs font-medium flex items-center gap-2">
                      <Layers className="w-4 h-4" />
                      {lang === "id" ? "Lihat detail" : "View details"}
                    </span>
                  </span>
                </button>

                {/* Project Body */}
                <div className="p-6 space-y-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <button
                      type="button"
                      className="text-left text-xl sm:text-2xl font-semibold text-[#111310] leading-tight hover:underline underline-offset-4"
                      onClick={() => setSelectedProject(project)}
                    >
                      {project.title}
                    </button>
                    <p className="text-[#111310] font-medium text-sm line-clamp-3 leading-relaxed">
                      {project.tagline[lang]}
                    </p>
                  </div>

                  {/* Tech Stack Chips */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-gray-100 border-2 border-[#111310] text-[10px] font-mono font-bold text-[#111310] uppercase"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-2 py-1 bg-gray-200 border-2 border-dashed border-[#111310] text-[10px] font-mono font-bold text-[#111310]">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Card Actions */}
                  <div className="pt-4 border-t-2 border-dashed border-gray-300 flex items-center justify-between">
                    <button
                      id={`view-study-${project.id}-btn`}
                      onClick={() => setSelectedProject(project)}
                      className="text-[10px] font-mono font-bold text-[#D63229] uppercase flex items-center gap-1 cursor-pointer hover:underline underline-offset-4"
                    >
                      <span>{lang === "id" ? "Detail Lengkap" : "Read Study"}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center gap-3">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[#111310] hover:text-[#D63229] transition-colors"
                          title="Source Code"
                        >
                          <Github className="w-5 h-5" />
                        </a>
                      )}
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[#111310] hover:text-[#D63229] transition-colors"
                          title="Live Demo"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {filteredProjects.length === 0 && (
              <p className="md:col-span-2 py-10 border-t border-[#111310]/20 text-sm text-[#111310]/60">
                {lang === "id" ? "Belum ada proyek yang ditampilkan." : "No projects to show yet."}
              </p>
            )}
          </div>
        </div>

      </div>

      {/* Case Study Modal */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
};
