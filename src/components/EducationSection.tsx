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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b-2 border-[#111310] pb-8">
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-5xl font-bold text-[#111310] uppercase tracking-tighter">
              {lang === "id" ? "Pendidikan" : "Education"}
            </h2>
            <p className="text-[#111310] font-medium text-sm sm:text-base max-w-2xl">
              {lang === "id"
                ? "Saya menempuh Teknik Informatika di Universitas Nusa Putra dan mengembangkan kemampuan melalui kuliah, project, dan eksplorasi mandiri."
                : "I study Informatics Engineering at Universitas Nusa Putra and develop my skills through coursework, projects, and independent exploration."}
            </p>
          </div>

          {/* View Mode Toggle: Timeline vs Photo Gallery */}
          <div className="flex bg-[#F6F6F4] border-2 border-[#111310] p-1 shadow-[4px_4px_0px_#111310]">
            <button
              id="edu-tab-timeline-btn"
              onClick={() => setActiveTab("timeline")}
              className={`px-4 py-2 text-xs font-mono uppercase font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === "timeline"
                  ? "bg-[#111310] text-white"
                  : "text-[#111310] hover:bg-gray-200"
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>{lang === "id" ? "Linimasa" : "Timeline"}</span>
            </button>
            {EDUCATION_PHOTOS.length > 0 && (
              <button
                id="edu-tab-gallery-btn"
                onClick={() => setActiveTab("gallery")}
                className={`px-4 py-2 text-xs font-mono uppercase font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === "gallery"
                    ? "bg-[#111310] text-white"
                    : "text-[#111310] hover:bg-gray-200"
                }`}
              >
                <Camera className="w-4 h-4" />
                <span>{lang === "id" ? "Galeri" : "Gallery"}</span>
              </button>
            )}
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
                className="group p-6 sm:p-8 bg-white border-2 border-[#111310] shadow-[6px_6px_0px_#111310] transition-transform hover:-translate-y-1 hover:shadow-[8px_8px_0px_#111310]"
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                  {/* Left Column: Icon & Institution Details */}
                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 bg-[#111310] text-white flex items-center justify-center flex-shrink-0">
                      {item.iconType === "university" ? (
                        <GraduationCap className="w-6 h-6" />
                      ) : item.iconType === "cert" ? (
                        <Award className="w-6 h-6" />
                      ) : (
                        <BookOpen className="w-6 h-6" />
                      )}
                    </div>
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-xl font-bold text-[#111310] uppercase">
                          {item.degree[lang]}
                        </h3>
                      </div>
                      <div className="text-sm font-mono font-bold text-[#D63229] uppercase tracking-widest">
                        {item.institution}
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-xs font-mono font-bold text-[#111310] pt-1">
                        <span className="flex items-center gap-1.5 bg-gray-200 px-2 py-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {item.period}
                        </span>
                        <span className="flex items-center gap-1.5 bg-gray-200 px-2 py-1">
                          <MapPin className="w-3.5 h-3.5" />
                          {item.location}
                        </span>
                        {item.gpa && (
                          <span className="flex items-center gap-1.5 bg-[#111310] text-white px-2 py-1">
                            IPK {item.gpa}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description & Key Highlights */}
                <div className="mt-6 pt-6 border-t-2 border-dashed border-gray-300 space-y-4">
                  <p className="text-[#111310] text-sm md:text-base leading-relaxed font-medium">
                    {item.description[lang]}
                  </p>

                  {/* Highlights Bullet points */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                    {item.highlights[lang].map((hl, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 text-sm text-[#111310] font-medium"
                      >
                        <CheckCircle2 className="w-5 h-5 text-[#D63229] flex-shrink-0" />
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
            className="space-y-8"
          >
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-3">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  id={`edu-cat-${cat.id}-btn`}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 text-xs font-mono font-bold uppercase transition-all cursor-pointer border-2 border-[#111310] shadow-[2px_2px_0px_#111310] active:translate-y-0.5 active:translate-x-0.5 active:shadow-none ${
                    selectedCategory === cat.id
                      ? "bg-[#111310] text-white"
                      : "bg-white text-[#111310] hover:bg-gray-100"
                  }`}
                >
                  {cat.label[lang]}
                </button>
              ))}
            </div>

            {/* Photo Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredPhotos.map((photo) => (
                <div
                  key={photo.id}
                  id={`photo-card-${photo.id}`}
                  onClick={() => setSelectedPhoto(photo)}
                  className="group bg-white border-2 border-[#111310] cursor-pointer shadow-[6px_6px_0px_#111310] transition-transform hover:-translate-y-1 hover:shadow-[8px_8px_0px_#111310] flex flex-col p-3"
                >
                  {/* Photo Container (Polaroid style) */}
                  <div className="relative aspect-[4/3] w-full bg-gray-200 border-2 border-[#111310] overflow-hidden mb-4">
                    <img
                      src={photo.imageUrl}
                      alt={photo.title[lang]}
                      className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* View Button hint */}
                    <div className="absolute inset-0 bg-[#111310]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="px-4 py-2 bg-white text-[#111310] border-2 border-[#111310] text-xs font-bold font-mono uppercase flex items-center gap-2 shadow-[4px_4px_0px_#D63229]">
                        <Camera className="w-4 h-4" />
                        {lang === "id" ? "Lihat Foto" : "View Photo"}
                      </span>
                    </div>
                  </div>

                  {/* Caption & Location Info */}
                  <div className="flex-1 flex flex-col justify-between px-1">
                    <div>
                      <div className="flex items-center justify-between mb-2 pb-2 border-b-2 border-dashed border-gray-300">
                         <span className="px-2 py-1 bg-gray-200 text-[#111310] text-[10px] font-bold font-mono uppercase">
                          {photo.category[lang]}
                        </span>
                        <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-[#111310] uppercase">
                          <span>{photo.date}</span>
                          <span>•</span>
                          <span>{photo.location}</span>
                        </div>
                      </div>
                      <h3 className="text-lg font-bold text-[#111310] leading-tight mb-2">
                        {photo.title[lang]}
                      </h3>
                      <p className="text-[#111310] text-sm font-medium leading-relaxed">
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
