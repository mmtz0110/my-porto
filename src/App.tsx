import React from "react";
import { PortfolioProvider } from "./context/PortfolioContext";
import { Navbar } from "./components/Navbar";
import { Hero3DCard } from "./components/Hero3DCard";
import { AboutSection } from "./components/AboutSection";
import { EducationSection } from "./components/EducationSection";
import { SkillsSection } from "./components/SkillsSection";
import { ExperienceSection } from "./components/ExperienceSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <PortfolioProvider>
      <div id="portfolio-app-root" className="min-h-screen bg-[#1e1e2e] text-[#cdd6f4] selection:bg-[#b4befe] selection:text-white relative overflow-x-hidden font-sans">
        
        <div aria-hidden="true" className="fixed inset-0 pointer-events-none -z-20 bg-[radial-gradient(#ffffff_0.5px,transparent_0.5px)] [background-size:32px_32px] opacity-[0.08]" />
        
        {/* Top Navbar */}
        <Navbar />

        {/* Main Content Sections */}
        <main id="portfolio-main-content" className="pt-24 pb-16">
          {/* Section 1: Hero & 3D Interactive ID Card */}
          <Hero3DCard />

          <AboutSection />

          {/* Section 2: Sejarah Pendidikan & Foto Dokumentasi */}
          <EducationSection />

          {/* Section 3: Keahlian & Apa Saja yang Baru Dipelajari */}
          <SkillsSection />

          {/* Section 4: Pengalaman Kerja & Proyek Pilihan */}
          <ExperienceSection />

          {/* Section 5: Integrasi Kontak Responsif */}
          <ContactSection />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </PortfolioProvider>
  );
}
