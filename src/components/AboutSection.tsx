import React from "react";
import { ArrowDownRight, Compass, Lightbulb, Search } from "lucide-react";
import { PERSONAL_INFO, LEARNING_AREAS, WORKING_STYLE } from "../data/portfolioData";
import { usePortfolio } from "../context/PortfolioContext";

const ABOUT_POINTS = {
  id: [
    "Tertarik pada software development dan system integration.",
    "Mengeksplorasi Linux, networking, hardware, dan komunikasi antarperangkat.",
    "Belajar IoT melalui ESP32 dan berbagai sensor.",
    "Mempelajari GIS, data spasial, dan Manajemen Proyek Teknologi Informasi.",
    "Memiliki pengalaman di UI/UX, desain visual, editing, dan dokumentasi.",
  ],
  en: [
    "Interested in software development and system integration.",
    "Exploring Linux, networking, hardware, and device communication.",
    "Learning IoT with ESP32 and a range of sensors.",
    "Studying GIS, spatial data, and IT Project Management.",
    "Experienced with UI/UX, visual design, editing, and documentation.",
  ],
};

const INTERESTS = [
  "Software Development",
  "System Integration",
  "Hardware & IoT",
  "Networking",
  "GIS",
  "IT Project Management",
  "Product Development",
];

export const AboutSection: React.FC = () => {
  const { lang } = usePortfolio();

  return (
    <section id="about" className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-[#D63229]">
              {lang === "id" ? "Profil" : "Profile"}
            </p>
            <h2 className="max-w-xl text-4xl font-semibold leading-tight tracking-tight text-[#111310] sm:text-5xl">
              {lang === "id" ? "Saya belajar dengan cara membangun." : "I learn by building."}
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#111310]/75">
              {PERSONAL_INFO.bio[lang]} {PERSONAL_INFO.tagline[lang]}
            </p>
            <p className="mt-6 flex items-start gap-3 border-l-2 border-[#D63229] pl-4 text-sm leading-relaxed text-[#111310]/70">
              <Search className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              {lang === "id"
                ? "Saya lebih suka mencari akar masalah daripada berhenti di pesan error."
                : "I would rather find the root cause than stop at an error message."}
            </p>
          </div>

          <div className="space-y-10">
            <div>
              <h3 className="mb-4 text-lg font-semibold text-[#111310]">
                {lang === "id" ? "Tentang saya" : "A little about me"}
              </h3>
              <ul className="grid gap-3 sm:grid-cols-2">
                {ABOUT_POINTS[lang].map((point) => (
                  <li key={point} className="flex gap-3 border-t border-[#111310]/15 py-3 text-sm leading-relaxed text-[#111310]/75">
                    <ArrowDownRight className="mt-0.5 h-4 w-4 shrink-0 text-[#D63229]" aria-hidden="true" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-[#111310]">
                <Compass className="h-5 w-5 text-[#D63229]" aria-hidden="true" />
                {lang === "id" ? "Bidang yang menarik bagi saya" : "Areas I want to explore"}
              </h3>
              <div className="flex flex-wrap gap-2">
                {INTERESTS.map((interest) => (
                  <span key={interest} className="border border-[#111310]/20 px-3 py-2 text-sm text-[#111310]/80">
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 grid gap-12 border-t border-[#111310]/20 pt-10 lg:grid-cols-2">
          <div>
            <h3 className="mb-5 flex items-center gap-2 text-xl font-semibold text-[#111310]">
              <Lightbulb className="h-5 w-5 text-[#D63229]" aria-hidden="true" />
              {lang === "id" ? "Cara saya bekerja" : "How I work"}
            </h3>
            <p className="max-w-2xl text-sm leading-7 text-[#111310]/75">
              {lang === "id"
                ? "Saya mulai dengan memahami masalah dan memecahnya menjadi bagian kecil. Lalu saya membuat percobaan atau prototype, menguji hasilnya, menelusuri penyebab error, dan memperbaiki bagian yang bermasalah. Saat aplikasi gagal, saya memeriksa perubahan terakhir, konfigurasi, dependency, environment, port, proses, serta kemungkinan pengaruh hardware."
                : "I start by understanding the problem and breaking it into smaller parts. Then I experiment or build a prototype, test the result, trace errors to their cause, and fix the part that failed. When an app breaks, I check recent changes, configuration, dependencies, the environment, ports, processes, and possible hardware effects."}
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#111310]/75">
              {lang === "id"
                ? "Saya belajar mandiri dengan membaca dokumentasi, membandingkan pilihan, mencoba solusi, lalu mengevaluasi hasilnya. Saya cukup introvert di lingkungan baru, tetapi nyaman berkolaborasi setelah terlibat dalam pekerjaan atau project."
                : "I learn independently by reading documentation, comparing options, trying solutions, and evaluating the results. I can be introverted in a new setting, but become comfortable collaborating once I am involved in the work or project."}
            </p>
          </div>

          <div>
            <h3 className="mb-5 text-xl font-semibold text-[#111310]">
              {lang === "id" ? "Yang sedang saya pelajari" : "What I am learning"}
            </h3>
            <div className="flex flex-wrap gap-x-5 gap-y-3">
              {LEARNING_AREAS.map((area) => (
                <span key={area} className="border-b border-[#111310]/20 pb-1 text-sm text-[#111310]/75">
                  {area}
                </span>
              ))}
            </div>
            <h3 className="mb-4 mt-9 text-xl font-semibold text-[#111310]">
              {lang === "id" ? "Pola kerja" : "Working traits"}
            </h3>
            <ul className="grid gap-4 sm:grid-cols-2">
              {WORKING_STYLE.map((trait) => (
                <li key={trait.en} className="text-sm leading-relaxed">
                  <span className="font-semibold text-[#111310]">{trait[lang]}</span>
                  <span className="text-[#111310]/65">: {trait.description[lang]}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <blockquote className="mt-16 border-y border-[#111310]/20 py-7 text-center text-lg font-medium tracking-wide text-[#111310] sm:text-2xl">
          Understand it. Build it. Break it. Fix it. Improve it.
        </blockquote>
      </div>
    </section>
  );
};
