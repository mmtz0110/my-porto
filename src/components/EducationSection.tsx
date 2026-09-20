import React, { useState } from "react";
import { motion } from "motion/react";
import {
  GraduationCap,
  Award,
  BookOpen,
  Calendar,
  MapPin,
  Camera,
  Sparkles,
  ChevronRight,
  ExternalLink,
  CheckCircle2,
} from "lucide-react";
import { EDUCATION_DATA, EDUCATION_PHOTOS } from "../data/portfolioData";
import { EducationPhoto } from "../types";
import { usePortfolio } from "../context/PortfolioContext";
import { PhotoLightbox } from "./PhotoLightbox";

export const EducationSection: React.FC = () => {
  const { lang } = usePortfolio();
  const [selectedPhoto, setSelectedPhoto] = useState<EducationPhoto | null>(null);
  const [activeTab, setActiveTab] = useState<"timeline" | "gallery">("timeline");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: { id: "Semua Foto", en: "All Photos" } },
    { id: "Wisuda & Kelulusan", label: { id: "Wisuda", en: "Graduation" } },
    { id: "Kompetisi & Hackathon", label: { id: "Hackathon", en: "Hackathon" } },
    { id: "Riset & Akademik", label: { id: "Riset AI", en: "Research" } },
    { id: "Berbagi & Komunitas", label: { id: "Komunitas", en: "Community" } },
  ];

  const filteredPhotos =
    selectedCategory === "all"
      ? EDUCATION_PHOTOS
      : EDUCATION_PHOTOS.filter((p) => p.category.id === selectedCategory);

  return (
    <section id="education" className="py-20 md:py-28 relative">
      {/* Background glow */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-semibold">
              <GraduationCap className="w-3.5 h-3.5 text-zinc-400" />
              <span>{lang === "id" ? "Rekam Jejak Akademik" : "Academic Background"}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {lang === "id" ? "Sejarah Pendidikan & Dokumentasi" : "Education History & Milestones"}
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base max-w-2xl">
              {lang === "id"
                ? "Fondasi keilmuan kuat dalam Ilmu Komputer dan Rekayasa Perangkat Lunak, disertai dokumentasi momen wisuda, riset laboratorium, dan prestasi kompetisi."
                : "A rigorous foundation in Computer Science and Software Engineering, paired with documented graduation milestones, AI lab research, and competition wins."}
            </p>
          </div>

          {/* View Mode Toggle: Timeline vs Photo Gallery */}
          <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-zinc-900 border border-zinc-800 self-start md:self-auto">
            <button
              id="edu-tab-timeline-btn"
              onClick={() => setActiveTab("timeline")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === "timeline"
                  ? "bg-zinc-800 text-white border border-zinc-700 shadow-md"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{lang === "id" ? "Linimasa Pendidikan" : "Education Timeline"}</span>
            </button>
            <button
              id="edu-tab-gallery-btn"
              onClick={() => setActiveTab("gallery")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === "gallery"
                  ? "bg-zinc-800 text-white border border-zinc-700 shadow-md"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <Camera className="w-3.5 h-3.5" />
              <span>{lang === "id" ? "Galeri Foto Moment" : "Photo Gallery"}</span>
              <span className="px-1.5 py-0.2 bg-zinc-700 text-[10px] rounded-full text-zinc-200">
                {EDUCATION_PHOTOS.length}
              </span>
            </button>
          </div>
        </div>

        {/* Tab 1: Education Timeline */}
        {activeTab === "timeline" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            {EDUCATION_DATA.map((item, index) => (
              <div
                key={item.id}
                id={`edu-item-${item.id}`}
                className="group relative p-6 sm:p-8 rounded-3xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all duration-300 shadow-2xl"
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  {/* Left Column: Icon & Institution Details */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-white flex-shrink-0 group-hover:scale-105 transition-transform">
                      {item.iconType === "university" ? (
                        <GraduationCap className="w-6 h-6" />
                      ) : item.iconType === "cert" ? (
                        <Award className="w-6 h-6" />
                      ) : (
                        <BookOpen className="w-6 h-6" />
                      )}
                    </div>
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                          {item.degree[lang]}
                        </h3>
                        {item.badgeText && (
                          <span className="px-2.5 py-0.5 rounded-full bg-zinc-800 text-zinc-200 border border-zinc-700 text-xs font-mono font-bold">
                            {item.badgeText}
                          </span>
                        )}
                        {item.gpa && (
                          <span className="px-2.5 py-0.5 rounded-full bg-zinc-800 text-zinc-200 border border-zinc-700 text-xs font-mono font-bold">
                            IPK {item.gpa}
                          </span>
                        )}
                      </div>
                      <div className="text-sm font-semibold text-zinc-300">
                        {item.institution}
                      </div>
                      <div className="flex items-center gap-4 text-xs text-zinc-400 pt-0.5">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                          {item.period}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                          {item.location}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description & Key Highlights */}
                <div className="mt-4 pt-4 border-t border-zinc-800 space-y-3">
                  <p className="text-zinc-300 text-sm leading-relaxed">
                    {item.description[lang]}
                  </p>

                  {/* Highlights Bullet points */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-2">
                    {item.highlights[lang].map((hl, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2 text-xs text-zinc-300 bg-zinc-950/80 p-2.5 rounded-xl border border-zinc-800"
                      >
                        <CheckCircle2 className="w-4 h-4 text-zinc-400 flex-shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Tab 2: Education Moments Photo Gallery */}
        {activeTab === "gallery" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  id={`edu-cat-${cat.id}-btn`}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? "bg-zinc-800 text-white border border-zinc-700"
                      : "bg-zinc-900 hover:bg-zinc-800 text-zinc-400 border border-zinc-800"
                  }`}
                >
                  {cat.label[lang]}
                </button>
              ))}
            </div>

            {/* Photo Grid with Interactive 3D Card Hover */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredPhotos.map((photo) => (
                <div
                  key={photo.id}
                  id={`photo-card-${photo.id}`}
                  onClick={() => setSelectedPhoto(photo)}
                  className="group relative rounded-3xl bg-zinc-900 border border-zinc-800 overflow-hidden cursor-pointer hover:border-zinc-700 transition-all duration-300 shadow-2xl flex flex-col"
                >
                  {/* Photo Container */}
                  <div className="relative aspect-video w-full bg-zinc-950 overflow-hidden">
                    <img
                      src={photo.imageUrl}
                      alt={photo.title[lang]}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80" />

                    {/* Category pill */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-zinc-900/90 backdrop-blur-md text-zinc-200 border border-zinc-700 text-xs font-semibold">
                        {photo.category[lang]}
                      </span>
                    </div>

                    {/* View Button hint */}
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="px-3 py-1.5 rounded-full bg-white text-zinc-950 text-xs font-bold shadow-lg flex items-center gap-1">
                        <Camera className="w-3.5 h-3.5" />
                        {lang === "id" ? "Buka Preview" : "View Photo"}
                      </span>
                    </div>
                  </div>

                  {/* Caption & Location Info */}
                  <div className="p-6 space-y-2 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 text-xs text-zinc-400 pb-1">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-zinc-500" />
                          {photo.date}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-zinc-500" />
                          {photo.location}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-white group-hover:text-zinc-200 transition-colors">
                        {photo.title[lang]}
                      </h3>
                      <p className="text-zinc-400 text-xs mt-1 line-clamp-2 leading-relaxed">
                        {photo.description[lang]}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Lightbox Modal */}
      <PhotoLightbox
        photo={selectedPhoto}
        photos={EDUCATION_PHOTOS}
        onClose={() => setSelectedPhoto(null)}
        onSelectPhoto={setSelectedPhoto}
      />
    </section>
  );
};
