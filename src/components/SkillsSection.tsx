import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Code2,
  Sparkles,
  Flame,
  Search,
  BookOpen,
  CheckCircle2,
  TrendingUp,
  Cpu,
  Layers,
  ArrowUpRight,
  Terminal,
  Zap,
} from "lucide-react";
import { SKILL_CATEGORIES, CURRENT_LEARNING } from "../data/portfolioData";
import { usePortfolio } from "../context/PortfolioContext";

export const SkillsSection: React.FC = () => {
  const { lang } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedLearningItem, setSelectedLearningItem] = useState<string>(CURRENT_LEARNING[0].id);

  // Flatten all skills for filtering
  const allSkills = SKILL_CATEGORIES.flatMap((c) => c.skills);

  const filteredSkills = allSkills.filter((s) => {
    const matchesCategory = selectedCategory === "all" || s.category === selectedCategory;
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const activeLearning = CURRENT_LEARNING.find((item) => item.id === selectedLearningItem) || CURRENT_LEARNING[0];

  return (
    <section id="skills" className="py-20 md:py-28 relative">
      {/* Ambient background lighting */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* ================= SECTION 1: CORE SKILLS ================= */}
        <div>
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-semibold">
                <Code2 className="w-3.5 h-3.5 text-zinc-400" />
                <span>{lang === "id" ? "Peta Kemampuan Teknis" : "Technical Skill Matrix"}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                {lang === "id" ? "Keahlian & Ekosistem Teknologi" : "Skills & Technology Stack"}
              </h2>
              <p className="text-zinc-400 text-sm sm:text-base max-w-2xl">
                {lang === "id"
                  ? "Keahlian mendalam dalam pengembangan web modern, arsitektur backend andal, integrasi AI generasi terbaru, serta otomatisasi deployment cloud."
                  : "Deep expertise across modern web frontend, resilient backend systems, next-gen AI integrations, and automated cloud workflows."}
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                id="skill-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={lang === "id" ? "Cari teknologi (cth: React, AI)..." : "Search tech (e.g. React, AI)..."}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 transition-colors"
              />
            </div>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 mb-8">
            <button
              id="skill-filter-all-btn"
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === "all"
                  ? "bg-zinc-800 text-white border border-zinc-700 shadow-md"
                  : "bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800"
              }`}
            >
              {lang === "id" ? "Semua Keahlian" : "All Skills"}
            </button>
            {SKILL_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                id={`skill-filter-${cat.id}-btn`}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? "bg-zinc-800 text-white border border-zinc-700 shadow-md"
                    : "bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800"
                }`}
              >
                {cat.name[lang]}
              </button>
            ))}
          </div>

          {/* Skill Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSkills.map((skill, idx) => (
              <motion.div
                key={skill.name}
                id={`skill-card-${idx}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.03 }}
                className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all duration-300 group shadow-2xl"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-white group-hover:text-zinc-200 transition-colors">
                      {skill.name}
                    </span>
                    {skill.isFavorite && (
                      <span className="px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-300 text-[10px] font-mono border border-zinc-700 flex items-center gap-0.5">
                        <Flame className="w-2.5 h-2.5 text-zinc-400" />
                        PRO
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-mono font-bold text-zinc-300">
                    {skill.level}%
                  </span>
                </div>

                {/* Mastery Progress Bar */}
                <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden mb-2">
                  <div
                    className="h-full rounded-full bg-zinc-400 transition-all duration-700 group-hover:bg-white"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-zinc-500 font-mono">
                  <span>{lang === "id" ? "Pengalaman" : "Experience"}: {skill.yearsOfExp}</span>
                  <span className="capitalize text-zinc-400">{skill.category}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ================= SECTION 2: WHAT I AM CURRENTLY LEARNING ================= */}
        <div className="pt-8 border-t border-zinc-800">
          <div className="space-y-3 mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-semibold">
              <TrendingUp className="w-3.5 h-3.5 text-zinc-400" />
              <span>{lang === "id" ? "Riset & Pembelajaran Terkini" : "Continuous Learning Horizon"}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {lang === "id" ? "Apa Saja Yang Baru Aku Pelajari?" : "What I'm Currently Learning"}
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base max-w-2xl">
              {lang === "id"
                ? "Dunia teknologi bergerak cepat. Berikut adalah topik, buku, dan teknologi mutakhir yang saat ini sedang saya eksplorasi dan kembangkan secara intensif."
                : "Technology evolves rapidly. Here are the cutting-edge topics, research areas, and frameworks I am actively exploring and mastering."}
            </p>
          </div>

          {/* Interactive Learning Horizon Split Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Selector List */}
            <div className="lg:col-span-5 space-y-3">
              {CURRENT_LEARNING.map((item) => {
                const isActive = item.id === selectedLearningItem;
                return (
                  <button
                    key={item.id}
                    id={`learning-tab-${item.id}`}
                    onClick={() => setSelectedLearningItem(item.id)}
                    className={`w-full text-left p-4.5 rounded-2xl border transition-all cursor-pointer flex flex-col gap-2 ${
                      isActive
                        ? "bg-zinc-800 border-zinc-700 shadow-2xl ring-1 ring-zinc-600"
                        : "bg-zinc-900 hover:bg-zinc-800/60 border-zinc-800 text-zinc-400"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-400">
                        {item.topic[lang]}
                      </span>
                      <span
                        className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full uppercase bg-zinc-950 text-zinc-300 border border-zinc-700"
                      >
                        {item.status}
                      </span>
                    </div>

                    <div className="text-base font-bold text-white">
                      {item.title}
                    </div>

                    <div className="space-y-1 pt-1">
                      <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500">
                        <span>{lang === "id" ? "Progres Eksplorasi" : "Progress"}</span>
                        <span className="text-zinc-300 font-bold">{item.progress}%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-zinc-950 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-zinc-400"
                          style={{ width: `${item.progress}%` }}
                        />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right Detailed Showcase Panel */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeLearning.id}
                  id={`learning-detail-${activeLearning.id}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="p-6 sm:p-8 rounded-3xl bg-zinc-900 border border-zinc-800 shadow-2xl space-y-6"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-zinc-800">
                    <div className="space-y-1">
                      <span className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider">
                        {activeLearning.topic[lang]}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                        {activeLearning.title}
                      </h3>
                    </div>
                    <div className="text-xs text-zinc-400 font-mono bg-zinc-950 px-3 py-1.5 rounded-xl border border-zinc-800">
                      {lang === "id" ? "Dimulai" : "Started"}: {activeLearning.startedDate}
                    </div>
                  </div>

                  {/* Summary */}
                  <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                    {activeLearning.description[lang]}
                  </p>

                  {/* Key Takeaways */}
                  <div className="space-y-2.5">
                    <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-500 font-bold flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-zinc-400" />
                      <span>{lang === "id" ? "Wawasan Kunci yang Diperoleh" : "Key Takeaways & Insights"}</span>
                    </h4>
                    <div className="space-y-2">
                      {activeLearning.keyTakeaways[lang].map((point, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 p-3 rounded-xl bg-zinc-950/80 border border-zinc-800 text-xs sm:text-sm text-zinc-200"
                        >
                          <CheckCircle2 className="w-4 h-4 text-zinc-400 flex-shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Resources / Books read */}
                  <div className="space-y-2 pt-2 border-t border-zinc-800">
                    <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-500 font-bold flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-zinc-400" />
                      <span>{lang === "id" ? "Buku, SDK & Sumber Referensi" : "Books, SDKs & Resources"}</span>
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {activeLearning.resources.map((res, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-full bg-zinc-950 border border-dashed border-zinc-700 text-zinc-400 text-xs font-mono"
                        >
                          {res}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
