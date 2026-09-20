import React, { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight, Calendar, MapPin, Tag } from "lucide-react";
import { EducationPhoto } from "../types";
import { usePortfolio } from "../context/PortfolioContext";

interface PhotoLightboxProps {
  photo: EducationPhoto | null;
  photos: EducationPhoto[];
  onClose: () => void;
  onSelectPhoto: (p: EducationPhoto) => void;
}

export const PhotoLightbox: React.FC<PhotoLightboxProps> = ({
  photo,
  photos,
  onClose,
  onSelectPhoto,
}) => {
  const { lang } = usePortfolio();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!photo) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [photo]);

  if (!photo) return null;

  const currentIndex = photos.findIndex((p) => p.id === photo.id);

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + photos.length) % photos.length;
    onSelectPhoto(photos[prevIndex]);
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % photos.length;
    onSelectPhoto(photos[nextIndex]);
  };

  return (
    <AnimatePresence>
      <div
        id="photo-lightbox-backdrop"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl"
        onClick={onClose}
      >
        <motion.div
          id="photo-lightbox-modal"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="relative max-w-4xl w-full bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            id="lightbox-close-btn"
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-zinc-950/80 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700 backdrop-blur-md transition-colors cursor-pointer"
            aria-label="Tutup preview foto"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Navigation Arrows */}
          <button
            id="lightbox-prev-btn"
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-zinc-950/80 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700 backdrop-blur-md transition-colors cursor-pointer"
            aria-label="Foto sebelumnya"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            id="lightbox-next-btn"
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-zinc-950/80 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700 backdrop-blur-md transition-colors cursor-pointer"
            aria-label="Foto selanjutnya"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Main Image View */}
          <div className="relative aspect-video max-h-[60vh] bg-zinc-950 overflow-hidden flex items-center justify-center">
            <img
              src={photo.imageUrl}
              alt={photo.title[lang]}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent opacity-60 pointer-events-none" />
          </div>

          {/* Photo Details / Captions */}
          <div className="p-6 space-y-3 bg-zinc-900 border-t border-zinc-800">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700 text-xs font-semibold flex items-center gap-1.5">
                  <Tag className="w-3 h-3 text-zinc-400" />
                  {photo.category[lang]}
                </span>
                <span className="text-zinc-400 text-xs flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                  {photo.date}
                </span>
                <span className="text-zinc-400 text-xs flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                  {photo.location}
                </span>
              </div>
              <span className="text-xs font-mono text-zinc-500">
                {currentIndex + 1} / {photos.length}
              </span>
            </div>

            <h3 className="text-xl font-bold text-white tracking-tight">
              {photo.title[lang]}
            </h3>
            <p className="text-zinc-300 text-sm leading-relaxed">
              {photo.description[lang]}
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
