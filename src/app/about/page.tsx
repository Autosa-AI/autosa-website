"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Box, Sparkles, Terminal } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";

const JOURNEYS = [
  {
    slug: "nova",
    label: "Nova",
    icon: <Sparkles size={22} />,
    tagline: "AI Consulting & Implementation",
    desc: "Need to empower your business with AI but don't know where to start? Nova guides you from consultation to cutting-edge implementation.",
  },
  {
    slug: "solvo",
    label: "Solvo",
    icon: <Box size={22} />,
    tagline: "AI-Powered ERP Systems",
    desc: "Looking to streamline operations and accelerate growth with a smarter, AI-powered ERP? Solvo delivers as an official Odoo Partner.",
  },
  {
    slug: "yard",
    label: "Yard",
    icon: <Terminal size={22} />,
    tagline: "Custom AI Development",
    desc: "Have an AI idea or project you want to bring to life? Yard turns your ideas into effective solutions quickly and affordably.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center bg-service-hero">
        <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_50%,rgba(200,149,90,0.04),transparent)] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 pointer-events-none" />
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-20 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="section-label justify-center mb-8"
          >
            Who We Are
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl sm:text-7xl text-white mb-6 font-bold"
          >
            About <span className="autosa-wordmark">Autosa</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-white/40 text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Unleashing the power of AI to supercharge your business growth with our customized solutions and enhanced automation.
          </motion.p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 px-6 border-t border-white/[0.05] bg-section-image">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-label mb-8"
          >
            Our Mission
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl text-white font-bold mb-8"
          >
            Redefining how businesses operate
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/45 text-lg leading-relaxed"
          >
            Our mission is to unlock the potential of AI to revolutionize the way businesses operate, simplifying tasks, reducing errors, and driving greater efficiency. By providing cutting-edge solutions to both B2B and B2C clients, Autosa is leading the way in creating a smarter, more connected world.
          </motion.p>
        </div>
      </section>

      {/* Founder */}
      <section className="py-24 px-6 border-t border-white/[0.05] bg-section-image relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,rgba(200,149,90,0.03),transparent)] pointer-events-none" />
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="section-label justify-center mb-6"
            >
              Leadership
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl text-white font-bold"
            >
              Meet the founder
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8 md:p-12 max-w-2xl mx-auto"
          >
            {/* Avatar placeholder */}
            <div className="w-20 h-20 rounded-2xl bg-[#c8955a]/10 border border-[#c8955a]/20 flex items-center justify-center mb-6">
              <span className="text-[#c8955a] text-2xl font-black">OA</span>
            </div>

            <h3 className="text-white text-2xl font-bold mb-1">Osama Alaa Mohammed</h3>
            <p className="text-[#c8955a] text-sm font-bold uppercase tracking-[0.2em] mb-4">CEO & Founder</p>
            <p className="text-white/45 text-base leading-relaxed mb-6">
              Experienced Full-stack AI Engineer with a wide knowledge of AI, machine learning, and NLP. Graduate from the faculty of computer science at Cairo University.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-4 mb-8">
              <a href="https://www.facebook.com/osamaalaa20/" target="_blank" rel="noopener noreferrer"
                className="text-white/30 hover:text-[#c8955a] transition-colors" aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/osamaalaa1/" target="_blank" rel="noopener noreferrer"
                className="text-white/30 hover:text-[#c8955a] transition-colors" aria-label="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a href="https://www.youtube.com/@ElDeveloper/" target="_blank" rel="noopener noreferrer"
                className="text-white/30 hover:text-[#c8955a] transition-colors" aria-label="YouTube">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>

            <Link href="/osama-alaa" className="btn-primary text-sm">
              <span>Know More</span>
              <ArrowRight size={13} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Journeys */}
      <section className="py-24 px-6 border-t border-white/[0.05] bg-section-image">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="section-label justify-center mb-6"
            >
              What We Offer
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl text-white font-bold"
            >
              Our Journeys
            </motion.h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {JOURNEYS.map((j, i) => (
              <motion.div
                key={j.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8 card-hover group"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 border border-white/[0.08] bg-white/[0.05] text-white/50 group-hover:bg-[#c8955a]/15 group-hover:border-[#c8955a]/30 group-hover:text-[#c8955a] transition-all duration-300">
                  {j.icon}
                </div>
                <h3 className="text-white text-xl font-bold uppercase tracking-wide mb-1">{j.label}</h3>
                <p className="text-white/30 text-xs font-semibold uppercase tracking-[0.2em] mb-4">{j.tagline}</p>
                <p className="text-white/40 text-sm leading-relaxed mb-6">{j.desc}</p>
                <Link
                  href={`/${j.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-white/30 group-hover:text-[#c8955a] transition-colors"
                >
                  Explore {j.label} <ArrowRight size={14} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-28 px-6 border-t border-white/[0.05] bg-section-image relative">
        <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(200,149,90,0.03),transparent)] pointer-events-none" />
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="section-label justify-center mb-6"
            >
              Get in Touch
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl text-white font-bold mb-6"
            >
              Automate Your Way to Success
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-white/35 text-base leading-relaxed"
            >
              Got an idea or just curious about AI? At Autosa, we&apos;re here to listen, lend guidance, and join in your enthusiasm.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8"
          >
            <ContactForm />
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
