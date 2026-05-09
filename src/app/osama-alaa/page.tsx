"use client";
import { motion } from "framer-motion";
import { ExternalLink, GitBranch } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const STATS = [
  { value: "+3", label: "Years as AI Software Engineer" },
  { value: "40+", label: "Courses" },
  { value: "25+", label: "Projects" },
  { value: "+10", label: "Apps" },
];

const CERTIFICATIONS = [
  { name: "Google Data Analytics", courses: "8 Courses" },
  { name: "IBM Data Science", courses: "10 Courses" },
  { name: "Math and Statistics for Data Science", courses: "3 Courses" },
];

const EXPERIENCE = [
  {
    role: "AI Software Engineer",
    company: "Ignitus",
    period: "Jan 2025 - Present",
    type: "Full Time - Remote",
    location: "London, UK",
    desc: "",
  },
  {
    role: "Machine Learning Engineer",
    company: "Autosa AI",
    period: "July 2023 - Present",
    type: "Freelance",
    location: "Cairo, Egypt",
    desc: "Developed +10 AI complete agents and solutions for Saudi companies. By leveraging LLMs, developed AI solutions resulting in average 30% reduction in time and 20% more accurate results.",
  },
  {
    role: "Internee's Team Lead and AI Engineer",
    company: "AILA",
    period: "June 2024 - Present",
    type: "Full Time",
    location: "Riyadh, SA",
    desc: "Led a dedicated team of five software engineers with FastAPI and React frameworks alongside PostgreSQL.",
  },
  {
    role: "Trainee",
    company: "National Research Centre - NRC",
    period: "Aug 2022 – Sep 2022",
    type: "4 weeks Full-Time Internship",
    location: "Cairo, Egypt",
    desc: "",
  },
];

const KNOWLEDGE = [
  "Structural Programming", "OOP", "Data Structures & Algorithms",
  "AI and Machine Learning", "Statistics and Mathematics",
  "SQL and Databases", "Computer Architecture", "Molecular Biology",
];

const SKILLS = [
  "Python", "NLP & ML", "Deployment", "Data Structures",
  "SQL and NoSQL", "Algorithms", "Docker", "Math & Statistics",
];

const PROJECTS = [
  {
    name: "AI-Powered Legal Solutions",
    demo: "https://youtu.be/dnQGXWhLQRc",
    github: "https://github.com/OsamaAlaa1/LegalTechPro_Assessment",
  },
  {
    name: "HealIt: Mental Health Care AI App",
    demo: "https://youtu.be/-lV-2j5lmQs",
    github: "https://github.com/OsamaAlaa1/Healit-Mental-Health-Care-App",
  },
  {
    name: "AUTOSA: Auto-ML App",
    demo: "https://youtu.be/ZbGAaIg9p0Q",
    github: "https://github.com/OsamaAlaa1/Autosa-AutoML-Application",
  },
];

export default function OsamaAlaaPage() {
  return (
    <div className="min-h-screen bg-black overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center pt-16 bg-hero-image">
        <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_50%,rgba(200,149,90,0.04),transparent)] pointer-events-none" />
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto py-24">
          {/* Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="w-24 h-24 rounded-2xl bg-[#c8955a]/10 border border-[#c8955a]/20 flex items-center justify-center mx-auto mb-6"
          >
            <span className="text-[#c8955a] text-3xl font-black">OA</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2.5 mb-6"
          >
            <div className="h-px w-8 bg-[#c8955a]" />
            <span className="text-[#c8955a] text-xs font-bold uppercase tracking-[0.3em]">Full-stack AI Engineer</span>
            <div className="h-px w-8 bg-[#c8955a]" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-6xl text-white font-bold mb-6"
          >
            Osama Alaa
          </motion.h1>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center justify-center gap-5"
          >
            <a href="https://www.facebook.com/osamaalaa20/" target="_blank" rel="noopener noreferrer"
              className="text-white/30 hover:text-[#c8955a] transition-colors" aria-label="Facebook">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/osamaalaa1/" target="_blank" rel="noopener noreferrer"
              className="text-white/30 hover:text-[#c8955a] transition-colors" aria-label="LinkedIn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a href="https://www.youtube.com/@ElDeveloper/" target="_blank" rel="noopener noreferrer"
              className="text-white/30 hover:text-[#c8955a] transition-colors" aria-label="YouTube">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
            <a href="https://github.com/OsamaAlaa1" target="_blank" rel="noopener noreferrer"
              className="text-white/30 hover:text-[#c8955a] transition-colors" aria-label="GitHub">
              <GitBranch size={20} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* About */}
      <section className="py-20 px-6 border-t border-white/[0.05] bg-black">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 mb-8"
          >
            <div className="h-px w-8 bg-[#c8955a]" />
            <span className="text-[#c8955a] text-xs font-bold uppercase tracking-[0.3em]">About</span>
            <div className="h-px w-8 bg-[#c8955a]" />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/50 text-lg leading-relaxed"
          >
            With over three years of experience, I have developed a strong foundation in mathematics, statistics, and programming. My passion lies in creating innovative AI solutions that reveal the hidden potential of data to enhance decision making for businesses.
          </motion.p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6 border-t border-white/[0.05] bg-black">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 text-center"
            >
              <p className="text-4xl font-black mb-2" style={{ color: "#c8955a" }}>{s.value}</p>
              <p className="text-white/35 text-xs font-medium uppercase tracking-wide leading-tight">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 px-6 border-t border-white/[0.05] bg-black">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 mb-10"
          >
            <div className="h-px w-8 bg-[#c8955a]" />
            <span className="text-[#c8955a] text-xs font-bold uppercase tracking-[0.3em]">Certifications</span>
            <div className="h-px w-8 bg-[#c8955a]" />
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {CERTIFICATIONS.map((c, i) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6"
              >
                <p className="text-white font-bold mb-2">{c.name}</p>
                <p className="text-[#c8955a] text-sm font-medium">{c.courses}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="py-20 px-6 border-t border-white/[0.05] bg-black">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 mb-10"
          >
            <div className="h-px w-8 bg-[#c8955a]" />
            <span className="text-[#c8955a] text-xs font-bold uppercase tracking-[0.3em]">Experience</span>
            <div className="h-px w-8 bg-[#c8955a]" />
          </motion.div>
          <div className="flex flex-col gap-4">
            {EXPERIENCE.map((e, i) => (
              <motion.div
                key={`${e.role}-${e.company}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                  <div>
                    <h3 className="text-white font-bold text-lg">{e.role}</h3>
                    <p className="text-[#c8955a] font-semibold text-sm">{e.company}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-white/40 text-sm">{e.period}</p>
                    <p className="text-white/25 text-xs">{e.type} · {e.location}</p>
                  </div>
                </div>
                {e.desc && <p className="text-white/40 text-sm leading-relaxed mt-3">{e.desc}</p>}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="py-20 px-6 border-t border-white/[0.05] bg-black">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 mb-10"
          >
            <div className="h-px w-8 bg-[#c8955a]" />
            <span className="text-[#c8955a] text-xs font-bold uppercase tracking-[0.3em]">Education</span>
            <div className="h-px w-8 bg-[#c8955a]" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
              <div>
                <h3 className="text-white font-bold text-lg">BCS Cairo University</h3>
                <p className="text-[#c8955a] font-semibold text-sm">Faculty of Computer Science</p>
                <p className="text-white/40 text-sm mt-1">Very good with honors</p>
              </div>
              <p className="text-white/35 text-sm shrink-0">Sep 2019 – Jun 2023</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Knowledge & Skills */}
      <section className="py-20 px-6 border-t border-white/[0.05] bg-black">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-3 mb-8"
              >
                <div className="h-px w-8 bg-[#c8955a]" />
                <span className="text-[#c8955a] text-xs font-bold uppercase tracking-[0.3em]">Knowledge Areas</span>
              </motion.div>
              <div className="flex flex-wrap gap-2">
                {KNOWLEDGE.map((k, i) => (
                  <motion.span
                    key={k}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.07] text-white/50 text-xs font-medium"
                  >
                    {k}
                  </motion.span>
                ))}
              </div>
            </div>
            <div>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-3 mb-8"
              >
                <div className="h-px w-8 bg-[#c8955a]" />
                <span className="text-[#c8955a] text-xs font-bold uppercase tracking-[0.3em]">Skills</span>
              </motion.div>
              <div className="flex flex-wrap gap-2">
                {SKILLS.map((s, i) => (
                  <motion.span
                    key={s}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="px-3 py-1.5 rounded-lg bg-[#c8955a]/10 border border-[#c8955a]/20 text-[#c8955a]/70 text-xs font-medium"
                  >
                    {s}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="py-20 px-6 border-t border-white/[0.05] bg-black">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 mb-10"
          >
            <div className="h-px w-8 bg-[#c8955a]" />
            <span className="text-[#c8955a] text-xs font-bold uppercase tracking-[0.3em]">Projects</span>
            <div className="h-px w-8 bg-[#c8955a]" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {PROJECTS.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 card-hover"
              >
                <h3 className="text-white font-bold text-base mb-5 leading-tight">{p.name}</h3>
                <div className="flex items-center gap-3">
                  <a
                    href={p.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#c8955a]/10 border border-[#c8955a]/20 text-[#c8955a] text-xs font-semibold hover:bg-[#c8955a]/20 transition-colors"
                  >
                    <ExternalLink size={12} /> Demo
                  </a>
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.07] text-white/50 text-xs font-semibold hover:bg-white/[0.08] transition-colors"
                  >
                    <GitBranch size={12} /> Code
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <a
              href="https://github.com/OsamaAlaa1?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-white/[0.1] text-white/50 text-sm font-semibold hover:bg-white/[0.04] hover:text-white transition-colors"
            >
              <GitBranch size={15} /> More Applications
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
