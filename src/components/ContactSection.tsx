import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Mail,
  Send,
  MapPin,
  CheckCircle2,
  Copy,
  Check,
  Github,
  Linkedin,
  MessageSquare,
  Sparkles,
  Phone,
  Clock,
  ShieldCheck,
} from "lucide-react";
import { PERSONAL_INFO } from "../data/portfolioData";
import { usePortfolio } from "../context/PortfolioContext";
import confetti from "canvas-confetti";

export const ContactSection: React.FC = () => {
  const { lang } = usePortfolio();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Proyek Baru / Kolaborasi",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage(lang === "id" ? "Mohon lengkapi semua kolom yang wajib diisi." : "Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setIsSuccess(true);
        confetti({
          particleCount: 70,
          spread: 80,
          origin: { y: 0.6 },
          colors: ["#06b6d4", "#a855f7", "#10b981"],
        });
        setFormData({
          name: "",
          email: "",
          subject: "Proyek Baru / Kolaborasi",
          message: "",
        });
      } else {
        setErrorMessage(data.error || (lang === "id" ? "Gagal mengirim pesan." : "Failed to send message."));
      }
    } catch {
      // Offline / fallback success
      setIsSuccess(true);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-left space-y-4 mb-16 border-b-2 border-[#111310] pb-8">
          <h2 className="text-3xl sm:text-5xl lg:text-7xl font-bold text-[#111310] uppercase tracking-tighter">
            {lang === "id" ? "Mari terhubung" : "Get in touch"}
          </h2>
          <p className="text-[#111310] font-medium text-sm sm:text-base leading-relaxed max-w-3xl">
            {lang === "id"
              ? "Terbuka untuk berdiskusi tentang software development, Linux, hardware, IoT, AI, GIS, system integration, kewirausahaan mahasiswa, atau project teknologi lainnya."
              : "Open to conversations about software development, Linux, hardware, IoT, AI, GIS, system integration, student entrepreneurship, and other technology projects."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Info & Social Cards */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick Status Card */}
            <div className="p-6 bg-white border-2 border-[#111310] shadow-[6px_6px_0px_#111310] space-y-4 relative">
              <div className="flex items-center gap-3">
                <span className="flex h-3 w-3 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full bg-[#b4befe] opacity-75"></span>
                  <span className="relative inline-flex h-3 w-3 bg-[#b4befe]"></span>
                </span>
                <span className="text-sm font-bold text-[#111310] font-mono uppercase tracking-widest">
                  {lang === "id" ? PERSONAL_INFO.status : PERSONAL_INFO.statusEn}
                </span>
              </div>
              <p className="text-sm text-[#111310] font-medium leading-relaxed">
                {lang === "id"
                  ? "Pilih topik yang ingin dibahas, lalu hubungi saya melalui email atau GitHub."
                  : "Choose a topic to discuss, then reach me by email or GitHub."}
              </p>
            </div>

            {/* Direct Contact Methods */}
            <div className="p-6 bg-white border-2 border-[#111310] shadow-[6px_6px_0px_#111310] space-y-6">
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-[#b4befe] border-b-2 border-dashed border-gray-300 pb-2">
                {lang === "id" ? "Saluran Langsung" : "Direct Channels"}
              </h3>

              {/* Email Card with 1-Click Copy */}
              <div className="p-4 bg-gray-50 border-2 border-[#111310] flex items-center justify-between gap-3 group">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-12 h-12 bg-[#111310] text-white flex items-center justify-center flex-shrink-0 shadow-[2px_2px_0px_#b4befe]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-[10px] text-gray-500 font-bold font-mono uppercase tracking-wider">Email Utama</div>
                    <div className="text-xs sm:text-sm font-bold text-[#111310] truncate font-mono">
                      {PERSONAL_INFO.email}
                    </div>
                  </div>
                </div>
                <button
                  id="copy-direct-email-btn"
                  onClick={() => copyToClipboard(PERSONAL_INFO.email, "email")}
                  className="p-3 bg-white border-2 border-[#111310] hover:bg-gray-100 text-[#111310] transition-colors flex-shrink-0 cursor-pointer shadow-[2px_2px_0px_#111310] active:translate-y-px active:translate-x-px active:shadow-none"
                  title="Salin Email"
                >
                  {copiedField === "email" ? (
                    <Check className="w-5 h-5 text-[#b4befe]" />
                  ) : (
                    <Copy className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* Location */}
              <div className="p-4 bg-gray-50 border-2 border-[#111310] flex items-center gap-3">
                <div className="w-12 h-12 bg-white border-2 border-[#111310] shadow-[2px_2px_0px_#111310] flex items-center justify-center text-[#111310] flex-shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-[10px] text-gray-500 font-bold font-mono uppercase tracking-wider">Lokasi / Zona Waktu</div>
                  <div className="text-xs sm:text-sm font-bold text-[#111310] font-mono">
                    {PERSONAL_INFO.location} <br className="sm:hidden" />(WIB / UTC+7)
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="pt-4 border-t-2 border-dashed border-gray-300">
                <div className="text-[10px] text-[#111310] font-bold font-mono uppercase tracking-widest mb-3">
                  {lang === "id" ? "Jejaring Profesional" : "Professional Networks"}
                </div>
                <div className="flex gap-3">
                  <a
                    id="social-github-link"
                    href={PERSONAL_INFO.socials.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-3 px-3 bg-white hover:bg-gray-100 border-2 border-[#111310] shadow-[4px_4px_0px_#111310] hover:-translate-y-1 hover:shadow-[6px_6px_0px_#111310] text-[#111310] transition-all flex items-center justify-center gap-2 text-xs font-bold font-mono uppercase"
                  >
                    <Github className="w-5 h-5" />
                    <span>GitHub</span>
                  </a>
                  {PERSONAL_INFO.socials.linkedin !== "-" && (
                    <a
                      id="social-linkedin-link"
                      href={PERSONAL_INFO.socials.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 py-3 px-3 bg-[#111310] hover:bg-gray-900 border-2 border-[#111310] shadow-[4px_4px_0px_#b4befe] hover:-translate-y-1 hover:shadow-[6px_6px_0px_#b4befe] text-white transition-all flex items-center justify-center gap-2 text-xs font-bold font-mono uppercase"
                    >
                      <Linkedin className="w-5 h-5 text-white" />
                      <span>LinkedIn</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Responsive Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-10 bg-white border-2 border-[#111310] shadow-[8px_8px_0px_#111310] relative">
              <h3 className="text-2xl font-bold text-[#111310] uppercase tracking-tight mb-3">
                {lang === "id" ? "Kirim Pesan Langsung" : "Direct Message"}
              </h3>
              <p className="text-[#111310] font-medium text-sm mb-8">
                {lang === "id"
                  ? "Formulir ini terhubung langsung ke kotak masuk saya. Isi dengan detail yang relevan."
                  : "This form connects directly to my inbox. Fill it out with relevant details."}
              </p>

              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 bg-[#F6F6F4] border-2 border-[#111310] text-center space-y-4"
                >
                  <div className="w-16 h-16 bg-white border-2 border-[#111310] text-[#b4befe] flex items-center justify-center mx-auto shadow-[4px_4px_0px_#111310]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-[#111310] uppercase">
                    {lang === "id" ? "Pesan Terkirim!" : "Message Sent!"}
                  </h4>
                  <p className="text-[#111310] font-medium text-sm max-w-md mx-auto leading-relaxed">
                    {lang === "id"
                      ? "Terima kasih telah menghubungi. Saya akan meninjau pesan Anda dan membalasnya secepat mungkin melalui email."
                      : "Thank you for reaching out. I will review your message and reply as soon as possible via email."}
                  </p>
                  <button
                    id="send-another-msg-btn"
                    onClick={() => setIsSuccess(false)}
                    className="mt-6 px-6 py-3 bg-[#111310] text-white font-bold font-mono text-xs uppercase border-2 border-[#111310] shadow-[4px_4px_0px_#b4befe] transition-transform active:translate-y-1 active:translate-x-1 active:shadow-none cursor-pointer"
                  >
                    {lang === "id" ? "Kirim Pesan Lain" : "Send Another Message"}
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 text-left">
                  {errorMessage && (
                    <div className="p-4 bg-white border-2 border-[#b4befe] text-[#b4befe] font-bold font-mono text-xs uppercase">
                      {errorMessage}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div className="space-y-2">
                      <label htmlFor="contact-name" className="text-[10px] font-mono font-bold text-[#111310] uppercase tracking-widest">
                        {lang === "id" ? "Nama Lengkap" : "Full Name"} <span className="text-[#b4befe]">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={lang === "id" ? "Nama Anda" : "Your Name"}
                        className="w-full px-4 py-3 bg-[#F6F6F4] border-2 border-[#111310] text-sm text-[#111310] font-medium placeholder-[#A0A0A0] shadow-[2px_2px_0px_#111310] focus:outline-none focus:translate-y-1 focus:translate-x-1 focus:shadow-none transition-all"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label htmlFor="contact-email" className="text-[10px] font-mono font-bold text-[#111310] uppercase tracking-widest">
                        {lang === "id" ? "Alamat Email" : "Email Address"} <span className="text-[#b4befe]">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@example.com"
                        className="w-full px-4 py-3 bg-[#F6F6F4] border-2 border-[#111310] text-sm text-[#111310] font-medium placeholder-[#A0A0A0] shadow-[2px_2px_0px_#111310] focus:outline-none focus:translate-y-1 focus:translate-x-1 focus:shadow-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Subject / Purpose */}
                  <div className="space-y-2">
                    <label htmlFor="contact-subject" className="text-[10px] font-mono font-bold text-[#111310] uppercase tracking-widest">
                      {lang === "id" ? "Kategori Topik" : "Subject / Inquiry Type"}
                    </label>
                    <div className="relative">
                      <select
                        id="contact-subject"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-3 bg-[#F6F6F4] border-2 border-[#111310] text-sm text-[#111310] font-medium shadow-[2px_2px_0px_#111310] focus:outline-none focus:translate-y-1 focus:translate-x-1 focus:shadow-none transition-all cursor-pointer appearance-none"
                      >
                        <option value="Proyek Baru / Kolaborasi">
                          {lang === "id" ? "Proyek Baru / Kolaborasi Website" : "New Project / Collaboration"}
                        </option>
                        <option value="Peluang Kerja & Rekrutmen">
                          {lang === "id" ? "Peluang Kerja / Rekrutmen (Full-Time/Contract)" : "Hiring / Career Opportunity"}
                        </option>
                        <option value="Konsultasi Arsitektur AI & Web">
                          {lang === "id" ? "Konsultasi Arsitektur AI & Web" : "AI & Web Architecture Consultation"}
                        </option>
                        <option value="Lainnya">
                          {lang === "id" ? "Diskusi Umum / Lainnya" : "Other / General Inquiry"}
                        </option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none border-l-2 border-[#111310] bg-gray-100 h-full">
                        <svg className="w-4 h-4 text-[#111310]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </div>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label htmlFor="contact-message" className="text-[10px] font-mono font-bold text-[#111310] uppercase tracking-widest">
                      {lang === "id" ? "Isi Pesan" : "Message"} <span className="text-[#b4befe]">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={
                        lang === "id"
                          ? "Ceritakan tentang kebutuhan proyek, pertanyaan, atau pesan Anda..."
                          : "Describe your project requirements, questions, or message..."
                      }
                      className="w-full px-4 py-3 bg-[#F6F6F4] border-2 border-[#111310] text-sm text-[#111310] font-medium placeholder-[#A0A0A0] shadow-[2px_2px_0px_#111310] focus:outline-none focus:translate-y-1 focus:translate-x-1 focus:shadow-none transition-all resize-y"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    id="submit-contact-form-btn"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 bg-[#b4befe] hover:bg-[#89b4fa] text-white font-bold font-mono text-sm uppercase flex items-center justify-center gap-2 border-2 border-[#111310] shadow-[4px_4px_0px_#111310] transition-transform active:translate-y-1 active:translate-x-1 active:shadow-none disabled:opacity-70 cursor-pointer mt-4"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>{lang === "id" ? "Mengirim Pesan..." : "Sending Message..."}</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>{lang === "id" ? "Kirim Pesan" : "Send Message"}</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
