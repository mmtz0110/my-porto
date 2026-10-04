import React, { useState } from "react";
import { Search } from "lucide-react";

const technologyIcons: Record<string, string> = {
  Python: "python", JavaScript: "js", TypeScript: "ts", "C++": "cpp", HTML: "html", CSS: "css",
  "Node.js": "nodejs", React: "react", Linux: "linux", Git: "git", GitHub: "github", Android: "android",
  "Expo Router": "react", Flutter: "flutter", Arduino: "arduino", ESP32: "arduino", Figma: "figma", SQL: "mysql",
};
const iconForTechnology = (name: string) => technologyIcons[name] ?? "code";
import { LEARNING_AREAS, SKILL_CATEGORIES } from "../data/portfolioData";
import { usePortfolio } from "../context/PortfolioContext";

export const SkillsSection: React.FC = () => {
  const { lang } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const categories = SKILL_CATEGORIES.filter((category) => category.skills.length > 0);
  const visibleSkills = categories
    .filter((category) => selectedCategory === "all" || category.id === selectedCategory)
    .flatMap((category) => category.skills)
    .filter((skill) => skill.name.toLowerCase().includes(searchQuery.trim().toLowerCase()));

  return (
    <section id="skills" className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto space-y-16 px-4 sm:px-6 lg:px-8">
        <div>
          <div className="mb-8 flex flex-col gap-6 border-b border-[#111310]/20 pb-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-[#D63229]">
                {lang === "id" ? "Teknologi" : "Technology"}
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-[#111310] sm:text-5xl">
                {lang === "id" ? "Yang saya gunakan dan eksplorasi" : "Tools I use and explore"}
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#111310]/70">
                {lang === "id"
                  ? "Daftar ini menunjukkan bidang yang sedang saya pelajari dan gunakan. Saya tidak memberi skor kemampuan karena tiap bidang terus berkembang."
                  : "This list covers areas I am learning and working with. I do not assign proficiency scores because each area is still developing."}
              </p>
            </div>
            <label className="relative block w-full md:max-w-xs">
              <span className="sr-only">{lang === "id" ? "Cari teknologi" : "Search technologies"}</span>
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#111310]/50" aria-hidden="true" />
              <input
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder={lang === "id" ? "Cari bidang..." : "Search areas..."}
                className="w-full border border-[#111310]/25 bg-white py-3 pl-10 pr-3 text-sm text-[#111310] outline-none transition focus:border-[#111310] focus:ring-2 focus:ring-[#111310]/15"
              />
            </label>
          </div>

          <div className="mb-8 flex flex-wrap gap-2" aria-label={lang === "id" ? "Filter kategori" : "Category filters"}>
            <button
              type="button"
              onClick={() => setSelectedCategory("all")}
              aria-pressed={selectedCategory === "all"}
              className={`border px-3 py-2 text-sm transition-colors ${selectedCategory === "all" ? "border-[#111310] bg-[#111310] text-white" : "border-[#111310]/20 text-[#111310] hover:border-[#111310]"}`}
            >
              {lang === "id" ? "Semua" : "All"}
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => setSelectedCategory(category.id)}
                aria-pressed={selectedCategory === category.id}
                className={`border px-3 py-2 text-sm transition-colors ${selectedCategory === category.id ? "border-[#111310] bg-[#111310] text-white" : "border-[#111310]/20 text-[#111310] hover:border-[#111310]"}`}
              >
                {category.name[lang]}
              </button>
            ))}
          </div>

          {visibleSkills.length > 0 ? (
            <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4" aria-live="polite">
              {visibleSkills.map((skill) => (
                <li key={skill.name} className="flex items-center gap-3 border-b border-[#111310]/15 px-1 py-3 text-sm text-[#111310]/80">
                  <img src={`https://skillicons.dev/icons?i=${iconForTechnology(skill.name)}`} alt="" aria-hidden="true" loading="lazy" className="h-6 w-6 rounded-sm" />
                  <span>{skill.name}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="py-8 text-sm text-[#111310]/60" role="status">
              {lang === "id" ? "Tidak ada bidang yang cocok dengan pencarian." : "No matching areas found."}
            </p>
          )}
        </div>

        <div className="grid gap-8 border-t border-[#111310]/20 pt-10 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-[#D63229]">
              {lang === "id" ? "Proses belajar" : "Learning"}
            </p>
            <h3 className="text-2xl font-semibold tracking-tight text-[#111310] sm:text-3xl">
              {lang === "id" ? "Sedang saya pelajari" : "Currently studying"}
            </h3>
          </div>
          <ul className="grid gap-x-6 sm:grid-cols-2">
            {LEARNING_AREAS.map((area) => (
              <li key={area} className="border-b border-[#111310]/15 py-3 text-sm text-[#111310]/75">
                {area}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
