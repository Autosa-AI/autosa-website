"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GitBranch, BarChart3, Package, Users, DollarSign, Plug } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";

const COMPONENTS = [
  {
    icon: <GitBranch size={24} />,
    title: "Workflow Automation",
    desc: "Design and deploy multi-step business workflows that run without manual intervention — approvals, notifications, escalations, and routing built right into your ERP.",
    tags: ["Process Design", "Auto-routing", "Triggers"],
  },
  {
    icon: <Package size={24} />,
    title: "Inventory & Supply Chain",
    desc: "Real-time stock tracking, automated reorder points, supplier management, and demand forecasting components that keep your supply chain moving.",
    tags: ["Stock Control", "Auto-replenishment", "Forecasting"],
  },
  {
    icon: <BarChart3 size={24} />,
    title: "Financial Reporting",
    desc: "Automated P&L statements, balance sheets, cash flow reports, and budget tracking components that surface insights without manual data wrangling.",
    tags: ["P&L Automation", "Budget Tracking", "Forecasting"],
  },
  {
    icon: <Users size={24} />,
    title: "HR & Payroll",
    desc: "Employee lifecycle management, automated payroll processing, leave tracking, and compliance components built to scale with your team.",
    tags: ["Payroll Engine", "Leave Management", "Compliance"],
  },
  {
    icon: <DollarSign size={24} />,
    title: "Sales & CRM Pipeline",
    desc: "Automated lead scoring, follow-up sequences, quote generation, and deal-stage tracking components that keep your sales motion tight.",
    tags: ["Lead Scoring", "Auto Follow-up", "Quote Builder"],
  },
  {
    icon: <Plug size={24} />,
    title: "System Integrations",
    desc: "Connect your ERP to third-party tools — payment gateways, e-commerce platforms, logistics APIs, and data warehouses — with reliable, maintainable connectors.",
    tags: ["API Connectors", "Webhooks", "Data Sync"],
  },
];

const PROCESS = [
  { step: "01", title: "Assess", desc: "We map your current operations and identify which ERP components will deliver the highest automation ROI." },
  { step: "02", title: "Design", desc: "Our engineers design modular automation components tailored to your workflows — no bloated templates." },
  { step: "03", title: "Build", desc: "We develop, test, and integrate each component directly into your ERP environment with clean handoffs." },
  { step: "04", title: "Scale", desc: "Once live, we monitor performance and extend components as your business grows and processes evolve." },
];

function ComponentCard({ comp, index }: { comp: typeof COMPONENTS[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="relative rounded-2xl border border-white/[0.08] bg-white/[0.02] p-7 card-hover group overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c8955a]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative z-10">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 border border-white/[0.08] bg-white/[0.03] text-white/40 group-hover:bg-[#c8955a]/10 group-hover:border-[#c8955a]/25 group-hover:text-[#c8955a] transition-all duration-300">
          {comp.icon}
        </div>

        <h3 className="text-white text-lg font-bold mb-3">{comp.title}</h3>
        <p className="text-white/35 text-sm leading-relaxed mb-5">{comp.desc}</p>

        <div className="flex flex-wrap gap-2">
          {comp.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-[0.15em] border border-white/[0.06] text-white/30 group-hover:border-[#c8955a]/20 group-hover:text-[#c8955a]/60 transition-all duration-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function SolvoPage() {
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
            ERP Automation Components
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="autosa-wordmark text-[clamp(64px,12vw,140px)] text-white mb-6 leading-none"
          >
            Solvo
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-white/40 text-lg max-w-2xl mx-auto leading-relaxed"
          >
            We build the automation components your ERP is missing — modular, maintainable, and wired directly into the workflows your team runs every day.
          </motion.p>
        </div>
      </section>

      {/* Components */}
      <section className="py-28 px-6 border-t border-white/[0.05] bg-section-image">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="section-label justify-center mb-6"
            >
              What We Build
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl text-white font-bold mb-4"
            >
              Automation components for every layer
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-white/35 text-base max-w-xl mx-auto leading-relaxed"
            >
              Each component is built modularly — deploy what you need now, extend as you grow.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {COMPONENTS.map((c, i) => (
              <ComponentCard key={c.title} comp={c} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-28 px-6 border-t border-white/[0.05] bg-alt-image relative">
        <div className="absolute inset-0 dot-grid opacity-10 pointer-events-none" />
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="section-label justify-center mb-6"
            >
              How It Works
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl text-white font-bold"
            >
              From assessment to automation
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS.map((p, i) => (
              <motion.div
                key={p.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                {/* Connector line */}
                {i < PROCESS.length - 1 && (
                  <div className="hidden lg:block absolute top-6 left-[calc(100%+12px)] w-[calc(100%-24px)] h-px bg-gradient-to-r from-[#c8955a]/30 to-transparent" />
                )}
                <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6">
                  <div
                    className="text-[42px] font-black leading-none mb-4"
                    style={{
                      background: "linear-gradient(135deg, #c8955a, #b85040)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {p.step}
                  </div>
                  <h3 className="text-white text-lg font-bold mb-2">{p.title}</h3>
                  <p className="text-white/35 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Solvo stats */}
      <section className="py-20 px-6 border-t border-white/[0.05] bg-black">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {[
              { number: "30%", label: "Avg. cost reduction", detail: "from automated ERP workflows" },
              { number: "25%", label: "Accuracy improvement", detail: "fewer manual entry errors" },
              { number: "20%", label: "Productivity gain", detail: "hours saved on routine ops" },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div
                  className="text-5xl font-black mb-1"
                  style={{
                    background: "linear-gradient(135deg, #c8955a, #b85040)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {s.number}
                </div>
                <p className="text-white text-base font-bold mb-1">{s.label}</p>
                <p className="text-white/30 text-xs">{s.detail}</p>
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
              Ready to automate your ERP?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-white/35 text-base leading-relaxed"
            >
              Tell us which parts of your ERP slow you down — we&apos;ll build the automation components to fix that.
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
