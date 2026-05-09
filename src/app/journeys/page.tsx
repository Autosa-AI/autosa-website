"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Box, Sparkles, Terminal } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";

const JOURNEYS = [
  {
    slug: "yard",
    label: "Yard",
    icon: <Terminal size={26} />,
    tagline: "Custom AI Development",
    desc: "Have an AI idea or project you want to bring to life?",
    detail: "At Autosa Yard, we help you turn your ideas into effective solutions quickly and affordably, using the best AI approaches to achieve your goals.",
  },
  {
    slug: "solvo",
    label: "Solvo",
    icon: <Box size={26} />,
    tagline: "AI-Powered ERP Systems",
    desc: "Looking to streamline operations and accelerate growth with a smarter, AI-powered ERP?",
    detail: "Autosa Solvo delivers AI-enhanced ERP systems as an official Odoo Partner, ensuring a smooth, high-impact implementation.",
  },
  {
    slug: "nova",
    label: "Nova",
    icon: <Sparkles size={26} />,
    tagline: "AI Consulting & Implementation",
    desc: "Need to empower your business with AI but don't know where to start?",
    detail: "Autosa Nova guides you through consultations from top experts and culminates in the best implementations tailored to your needs.",
  },
];

export default function JourneysPage() {
  return (
    <div className="min-h-screen bg-black overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center pt-16 bg-hero-image">
        <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_50%,rgba(247,172,84,0.04),transparent)] pointer-events-none" />
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto py-24">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="section-label justify-center mb-8"
          >
            Choose Your Path
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl sm:text-7xl text-white font-bold mb-6"
          >
            Our Journeys
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-white/40 text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Elevate your business with our Yard, Nova, and Solvo Journeys for building AI-driven Systems, ERP solutions and expert AI consulting and execution.
          </motion.p>
        </div>
      </section>

      {/* Journey Cards */}
      <section className="py-24 px-6 border-t border-white/[0.05] bg-section-image">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {JOURNEYS.map((j, i) => (
              <motion.div
                key={j.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="relative rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8 card-hover group overflow-hidden flex flex-col"
              >
                <div className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "radial-gradient(circle at 30% 30%, rgba(247,172,84,0.05), transparent 70%)" }} />
                <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "linear-gradient(90deg, transparent, #c8955a, transparent)" }} />

                <div className="relative z-10 flex-1">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 border border-white/[0.08] bg-white/[0.05] text-white/50 group-hover:bg-[#c8955a]/15 group-hover:border-[#c8955a]/30 group-hover:text-[#c8955a] transition-all duration-300">
                    {j.icon}
                  </div>
                  <h3 className="autosa-wordmark text-white text-2xl mb-1">{j.label}</h3>
                  <p className="text-white/30 text-xs font-semibold uppercase tracking-[0.2em] mb-4">{j.tagline}</p>
                  <p className="text-[#c8955a]/80 text-base font-medium mb-3">{j.desc}</p>
                  <p className="text-white/40 text-sm leading-relaxed mb-8">{j.detail}</p>
                </div>

                <Link
                  href={`/${j.slug}`}
                  className="relative z-10 inline-flex items-center gap-2.5 px-6 py-2.5 rounded-xl border border-white/[0.1] text-white/50 font-semibold text-sm hover:text-black hover:border-[#c8955a] transition-all duration-200 tracking-wide w-fit"
                  style={{ }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "linear-gradient(45deg, #c8955a, #b85040 78%)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = ""; }}
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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(247,172,84,0.03),transparent)] pointer-events-none" />
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
              Start your journey today
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-white/35 text-base leading-relaxed"
            >
              Not sure which journey is right for you? Tell us about your goals and we&apos;ll guide you to the best path.
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
