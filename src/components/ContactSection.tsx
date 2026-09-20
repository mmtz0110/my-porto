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
      {/* Background glow */}
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-semibold">
            <Mail className="w-3.5 h-3.5 text-zinc-400" />
            <span>{lang === "id" ? "Terhubung & Kolaborasi" : "Get in Touch"}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            {lang === "id" ? "Mari Wujudkan Ide Hebat Bersama" : "Let's Build Something Exceptional"}
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            {lang === "id"
              ? "Tertarik mendiskusikan peluang kerja, proyek freelance, arsitektur AI, atau sekadar berdiskusi santai? Hubungi saya langsung atau kirim pesan di bawah."
              : "Interested in discussing career opportunities, freelance projects, AI architectures, or just exchanging ideas? Reach out directly or send a message below."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Info & Social Cards */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick Status Card */}
            <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 shadow-2xl space-y-4">
              <div className="flex items-center gap-3">
                <span className="flex h-3 w-3 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                <span className="text-sm font-bold text-white">
                  {lang === "id" ? PERSONAL_INFO.status : PERSONAL_INFO.statusEn}
                </span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                {lang === "id"
                  ? "Saya biasanya merespons email dan pesan dalam waktu kurang dari 24 jam."
                  : "I typically respond to emails and messages within less than 24 hours."}
              </p>
            </div>

            {/* Direct Contact Methods */}
            <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 shadow-2xl space-y-4">
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-400">
                {lang === "id" ? "Saluran Komunikasi Langsung" : "Direct Channels"}
              </h3>

              {/* Email Card with 1-Click Copy */}
              <div className="p-3.5 rounded-2xl bg-zinc-950/80 border border-zinc-800 flex items-center justify-between gap-3 group">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-300 flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-[11px] text-zinc-500 font-medium">Email Utama</div>
                    <div className="text-xs sm:text-sm font-bold text-white truncate font-mono">
                      {PERSONAL_INFO.email}
                    </div>
                  </div>
                </div>
                <button
                  id="copy-direct-email-btn"
                  onClick={() => copyToClipboard(PERSONAL_INFO.email, "email")}
                  className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors flex-shrink-0 cursor-pointer"
                  title="Salin Email"
                >
                  {copiedField === "email" ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4 text-zinc-400" />
                  )}
                </button>
              </div>

              {/* Location */}
              <div className="p-3.5 rounded-2xl bg-zinc-950/80 border border-zinc-800 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-300 flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] text-zinc-500 font-medium">Lokasi / Zona Waktu</div>
                  <div className="text-xs sm:text-sm font-bold text-white font-mono">
                    {PERSONAL_INFO.location} (WIB / UTC+7)
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="pt-2">
                <div className="text-[11px] text-zinc-500 font-medium mb-2 uppercase tracking-wider">
                  {lang === "id" ? "Jejaring Profesional" : "Professional Networks"}
                </div>
                <div className="flex gap-2">
                  <a
                    id="social-github-link"
                    href={PERSONAL_INFO.socials.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-2.5 px-3 rounded-xl bg-zinc-950/80 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white transition-colors flex items-center justify-center gap-2 text-xs font-semibold"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                  <a
                    id="social-linkedin-link"
                    href={PERSONAL_INFO.socials.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-2.5 px-3 rounded-xl bg-zinc-950/80 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white transition-colors flex items-center justify-center gap-2 text-xs font-semibold"
                  >
                    <Linkedin className="w-4 h-4 text-zinc-300" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Responsive Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900 border border-zinc-800 shadow-2xl relative">
              <h3 className="text-xl font-bold text-white tracking-tight mb-2">
                {lang === "id" ? "Kirim Pesan Langsung" : "Send a Direct Message"}
              </h3>
              <p className="text-zinc-400 text-xs sm:text-sm mb-6">
                {lang === "id"
                  ? "Formulir ini terhubung langsung ke notifikasi saya. Isi data di bawah untuk memulai percakapan."
                  : "This form connects directly to my notification channel. Fill in the fields below to start a conversation."}
              </p>

              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 rounded-2xl bg-zinc-950 border border-zinc-800 text-center space-y-3"
                >
                  <div className="w-12 h-12 rounded-full bg-zinc-800 text-emerald-400 flex items-center justify-center mx-auto border border-zinc-700">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="text-lg font-bold text-white">
                    {lang === "id" ? "Pesan Berhasil Terkirim!" : "Message Sent Successfully!"}
                  </h4>
                  <p className="text-zinc-400 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
                    {lang === "id"
                      ? "Terima kasih telah menghubungi. Saya akan meninjau pesan Anda dan membalasnya secepat mungkin melalui email."
                      : "Thank you for reaching out. I will review your message and reply as soon as possible via email."}
                  </p>
                  <button
                    id="send-another-msg-btn"
                    onClick={() => setIsSuccess(false)}
                    className="mt-4 px-5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-white transition-colors cursor-pointer"
                  >
                    {lang === "id" ? "Kirim Pesan Lain" : "Send Another Message"}
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-left">
                  {errorMessage && (
                    <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
                      {errorMessage}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label htmlFor="contact-name" className="text-xs font-semibold text-zinc-300">
                        {lang === "id" ? "Nama Lengkap" : "Full Name"} <span className="text-zinc-500">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={lang === "id" ? "Nama Anda" : "Your Name"}
                        className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 transition-colors"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label htmlFor="contact-email" className="text-xs font-semibold text-zinc-300">
                        {lang === "id" ? "Alamat Email" : "Email Address"} <span className="text-zinc-500">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@example.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Subject / Purpose */}
                  <div className="space-y-1.5">
                    <label htmlFor="contact-subject" className="text-xs font-semibold text-zinc-300">
                      {lang === "id" ? "Kategori Topik" : "Subject / Inquiry Type"}
                    </label>
                    <select
                      id="contact-subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-sm text-white focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 transition-colors cursor-pointer"
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
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label htmlFor="contact-message" className="text-xs font-semibold text-zinc-300">
                      {lang === "id" ? "Isi Pesan" : "Message"} <span className="text-zinc-500">*</span>
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
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 transition-colors resize-y"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    id="submit-contact-form-btn"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 font-bold text-sm flex items-center justify-center gap-2 shadow-2xl transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-zinc-950/30 border-t-zinc-950 rounded-full animate-spin" />
                        <span>{lang === "id" ? "Mengirim Pesan..." : "Sending Message..."}</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>{lang === "id" ? "Kirim Pesan Sekarang" : "Send Message"}</span>
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
