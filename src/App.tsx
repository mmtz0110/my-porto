import React from "react";
import { PortfolioProvider } from "./context/PortfolioContext";
import { Navbar } from "./components/Navbar";
import { Hero3DCard } from "./components/Hero3DCard";
import { EducationSection } from "./components/EducationSection";
import { SkillsSection } from "./components/SkillsSection";
import { ExperienceSection } from "./components/ExperienceSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <PortfolioProvider>
      <div id="portfolio-app-root" className="min-h-screen bg-[#09090b] text-zinc-300 selection:bg-zinc-700 selection:text-white relative overflow-x-hidden font-sans">
        
        {/* Subtle Ambient Background Glows & Grid */}
        <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-transparent blur-3xl rounded-full pointer-events-none -z-20" />
        <div className="fixed bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-tl from-purple-500/5 to-transparent blur-3xl rounded-full pointer-events-none -z-20" />
        <div className="fixed inset-0 pointer-events-none -z-20 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:32px_32px] opacity-35" />
        
        {/* Top Floating Navbar */}
        <Navbar />

        {/* Main Content Sections */}
        <main id="portfolio-main-content">
          {/* Section 1: Hero & 3D Interactive ID Card */}
          <Hero3DCard />

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
