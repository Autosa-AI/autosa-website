"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";

const STATS = [
  {
    number: 25,
    suffix: "%",
    label: "Cost Reduction",
    detail: "Minimum guaranteed savings",
    desc: "Using Autosa Yard can reduce costs by at least 25% as we provide cutting-edge AI products that save time in daily workflows.",
  },
  {
    number: 15,
    suffix: "%",
    label: "Enhanced Accuracy",
    detail: "Workflow improvement baseline",
    desc: "With Autosa Yard, you can enhance workflow and processes by at least 15%. AI significantly improves feedback, review loops, and routine work efficiency.",
  },
  {
    number: 20,
    suffix: "%",
    label: "Improved Productivity",
    detail: "Resource reduction target",
    desc: "Autosa Yard's AI-driven systems enable you to work faster and improve quality by reducing resource needs by at least 20%.",
  },
];

function StatCard({ stat, index }: { stat: typeof STATS[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      className="relative rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8 card-hover group overflow-hidden"
    >
      {/* Gradient top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c8955a]/50 to-transparent" />

      <div className="relative z-10">
        {/* Number */}
        <div className="flex items-end gap-1 mb-1">
          <span
            className="text-[72px] font-black leading-none"
            style={{
              background: "linear-gradient(135deg, #c8955a, #b85040)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {stat.number}
          </span>
          <span
            className="text-4xl font-black mb-3"
            style={{
              background: "linear-gradient(135deg, #c8955a, #b85040)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {stat.suffix}
          </span>
        </div>

        {/* Progress bar */}
        <div className="h-1 rounded-full bg-white/[0.06] mb-6 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={inView ? { width: `${stat.number}%` } : { width: 0 }}
            transition={{ duration: 1.2, delay: index * 0.12 + 0.3, ease: "easeOut" }}
            className="h-full rounded-full"
            style={{ background: "linear-gradient(90deg, #c8955a, #b85040)" }}
          />
        </div>

        <h3 className="text-white text-xl font-bold mb-1">{stat.label}</h3>
        <p className="text-[#c8955a]/60 text-[10px] font-bold uppercase tracking-[0.2em] mb-4">{stat.detail}</p>
        <p className="text-white/35 text-sm leading-relaxed">{stat.desc}</p>
      </div>
    </motion.div>
  );
}

export default function YardPage() {
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
            Custom AI Development
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="autosa-wordmark text-[clamp(64px,12vw,140px)] text-white mb-6 leading-none"
          >
            Yard
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-white/40 text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Have an idea to bring to life? At Autosa Yard, we help you turn your ideas into effective solutions quickly and affordably, using the best AI approaches to achieve your goals.
          </motion.p>
        </div>
      </section>

      {/* Why Yard */}
      <section className="py-28 px-6 border-t border-white/[0.05] bg-section-image">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="section-label justify-center mb-6"
            >
              Why Autosa Yard
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl text-white font-bold"
            >
              Build smarter, ship faster
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STATS.map((s, i) => (
              <StatCard key={s.label} stat={s} index={i} />
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
              Ready to build your AI solution?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-white/35 text-base leading-relaxed"
            >
              Tell us about your idea and let&apos;s bring it to life with the power of AI.
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
