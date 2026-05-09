"use client";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SECTIONS = [
  {
    title: "Acceptance of Terms",
    items: [
      "By accessing or using Autosa AI's services, you agree to be bound by these Terms of Service.",
      "If you do not agree to these terms, you may not access or use our services.",
      "We reserve the right to update these terms at any time; continued use constitutes acceptance of changes.",
    ],
  },
  {
    title: "Description of Services",
    items: [
      "Autosa AI provides AI-powered services through three main offerings: Nova (AI consulting and implementation), Solvo (AI-enhanced ERP systems), and Yard (custom AI development).",
      "Services are provided on a subscription or project basis as agreed in individual service agreements.",
      "We reserve the right to modify, suspend, or discontinue any service at any time with reasonable notice.",
    ],
  },
  {
    title: "User Responsibilities",
    items: [
      "You are responsible for maintaining the confidentiality of your account credentials.",
      "You agree not to use our services for any unlawful, harmful, or fraudulent purpose.",
      "You must not attempt to reverse-engineer, decompile, or extract source code from our services.",
      "You are responsible for ensuring that data you submit complies with applicable laws and regulations.",
      "You agree to provide accurate, current, and complete information when registering or using our services.",
    ],
  },
  {
    title: "Intellectual Property",
    items: [
      "All intellectual property rights in our services, including software, designs, and content, are owned by Autosa AI.",
      "We grant you a limited, non-exclusive, non-transferable license to use our services for their intended purpose.",
      "Any custom deliverables created specifically for you under a service agreement are governed by that agreement.",
      "You retain ownership of your own data and content submitted to our services.",
    ],
  },
  {
    title: "Disclaimers",
    items: [
      "Our services are provided 'as is' and 'as available' without warranties of any kind, express or implied.",
      "We do not warrant that our services will be uninterrupted, error-free, or completely secure.",
      "AI-generated outputs are provided for informational purposes; you are responsible for validating results.",
      "We disclaim all warranties of merchantability, fitness for a particular purpose, and non-infringement.",
    ],
  },
  {
    title: "Limitation of Liability",
    items: [
      "To the maximum extent permitted by law, Autosa AI shall not be liable for any indirect, incidental, or consequential damages.",
      "Our total liability for any claim arising from use of our services shall not exceed the amount paid by you in the preceding 3 months.",
      "We shall not be liable for any loss of data, profits, or business opportunity resulting from use of our services.",
    ],
  },
  {
    title: "Governing Law",
    items: [
      "These terms are governed by and construed in accordance with the laws of Cairo, Egypt.",
      "Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts of Cairo, Egypt.",
      "If any provision of these terms is found to be unenforceable, the remaining provisions will remain in full force.",
    ],
  },
  {
    title: "Termination",
    items: [
      "Either party may terminate the service agreement with 30 days written notice.",
      "We may terminate your access immediately if you violate these terms or engage in fraudulent activity.",
      "Upon termination, your right to access our services ceases immediately.",
      "Provisions relating to intellectual property, disclaimers, and limitation of liability survive termination.",
    ],
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-black overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-16 px-6 bg-hero-image">
        <div className="absolute inset-0 dot-grid opacity-15 pointer-events-none" />
        <div className="max-w-3xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2.5 mb-6"
          >
            <div className="h-px w-8 bg-[#c8955a]" />
            <span className="text-[#c8955a] text-xs font-bold uppercase tracking-[0.3em]">Legal</span>
            <div className="h-px w-8 bg-[#c8955a]" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl text-white font-bold mb-4"
          >
            Terms of Service
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/35 text-sm"
          >
            Last updated: January 2025
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <section className="pb-24 px-6 bg-black">
        <div className="max-w-3xl mx-auto space-y-10">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-white/50 text-base leading-relaxed"
          >
            Please read these Terms of Service carefully before using Autosa AI&apos;s services. These terms constitute a legally binding agreement between you and Autosa AI.
          </motion.p>

          {SECTIONS.map((section, i) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
            >
              <h2 className="text-white text-xl font-bold mb-4 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#c8955a] shrink-0" />
                {section.title}
              </h2>
              <ul className="space-y-2 pl-5">
                {section.items.map((item) => (
                  <li key={item} className="text-white/40 text-sm leading-relaxed flex items-start gap-3">
                    <span className="text-[#c8955a]/50 mt-1.5 shrink-0">›</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6"
          >
            <p className="text-white/50 text-sm">
              Questions about these terms? Contact our legal team at{" "}
              <a href="mailto:legal@autosa.net" className="text-[#c8955a] hover:underline">
                legal@autosa.net
              </a>
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
