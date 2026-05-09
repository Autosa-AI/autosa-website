"use client";
import { motion } from "framer-motion";
import { Zap, Settings, TrendingUp } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";

const BENEFITS = [
  {
    icon: <Zap size={28} />,
    title: "Boost Productivity",
    desc: "Autosa Nova can help you achieve more in less time and with higher quality, utilising advanced consultations plus AI-driven solutions.",
    accent: "Productivity",
  },
  {
    icon: <Settings size={28} />,
    title: "Streamline Your Work",
    desc: "Autosa Nova solutions are designed to do the heavy lifting for you and automate any processes needed, freeing you up to focus on more important tasks.",
    accent: "Automation",
  },
  {
    icon: <TrendingUp size={28} />,
    title: "Save Time, Money & Effort",
    desc: "Are you struggling with the new era of AI and don't know where to start? We can help you with that and take your business to another level.",
    accent: "Growth",
  },
];

export default function NovaPage() {
  return (
    <div className="min-h-screen bg-black overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center bg-service-hero">
        <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_50%,rgba(200,149,90,0.05),transparent)] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 pointer-events-none" />
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto py-24">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="section-label justify-center mb-8"
          >
            AI Consulting & Implementation
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="autosa-wordmark text-[clamp(64px,12vw,140px)] text-white mb-6 leading-none"
          >
            Nova
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-white/40 text-lg max-w-2xl mx-auto leading-relaxed"
          >
            At Autosa Nova, we&apos;ll guide you through the entire journey, beginning with consultations from top experts in the field and culminating in the best implementations tailored to your needs.
          </motion.p>
        </div>
      </section>

      {/* Why Nova */}
      <section className="py-28 px-6 border-t border-white/[0.05] bg-section-image">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="section-label justify-center mb-6"
            >
              Why Autosa Nova
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl text-white font-bold"
            >
              Transform your business with AI
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BENEFITS.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="relative rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8 card-hover group overflow-hidden"
              >
                {/* Top accent */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c8955a]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {/* Side accent */}
                <div className="absolute top-8 left-0 w-px h-16 bg-gradient-to-b from-transparent via-[#c8955a]/40 to-transparent" />

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border border-white/[0.08] bg-white/[0.03] text-white/40 group-hover:bg-[#c8955a]/10 group-hover:border-[#c8955a]/25 group-hover:text-[#c8955a] transition-all duration-300">
                    {b.icon}
                  </div>

                  {/* Accent tag */}
                  <span className="inline-block text-[9px] font-bold uppercase tracking-[0.3em] text-[#c8955a]/60 mb-3">{b.accent}</span>

                  <h3 className="text-white text-xl font-bold mb-4">{b.title}</h3>
                  <p className="text-white/35 text-sm leading-relaxed">{b.desc}</p>
                </div>
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
              Get Started
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl text-white font-bold mb-6"
            >
              Ready to embrace AI?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-white/35 text-base leading-relaxed"
            >
              Let&apos;s discuss how Nova can help your business navigate and leverage the power of AI.
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
