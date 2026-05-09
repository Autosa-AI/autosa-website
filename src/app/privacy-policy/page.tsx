"use client";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SECTIONS = [
  {
    title: "Information We Collect",
    items: [
      "Personal details: name, email address, phone number, company information, and account credentials.",
      "Auto-generated data: IP address, device type, browser information, usage logs, and cookies.",
      "For AI/ERP features: user inputs, uploaded documents, and operational data you provide.",
      "We do not use customer data to train general AI models without explicit permission.",
    ],
  },
  {
    title: "How We Use Your Information",
    items: [
      "To deliver, maintain, and improve our services.",
      "To personalize your experience and provide relevant recommendations.",
      "To offer customer support and respond to inquiries.",
      "To send service updates, security alerts, and administrative notices.",
      "For account management and payment processing.",
      "To maintain security, prevent fraud, and comply with legal obligations.",
      "Anonymized and aggregated data may be used to improve AI model performance.",
    ],
  },
  {
    title: "Legal Basis for Processing (GDPR)",
    items: [
      "Contractual necessity: processing required to deliver services you have requested.",
      "Legitimate interest: improving our products and preventing abuse.",
      "Consent: where you have explicitly agreed to specific uses of your data.",
      "Legal compliance: meeting regulatory and legal obligations.",
    ],
  },
  {
    title: "Data Sharing",
    items: [
      "We do not sell your personal data to third parties.",
      "We may share data with trusted service providers who assist in delivering our services.",
      "Payment processors handle financial transactions under their own privacy policies.",
      "We may disclose data to legal authorities when required by law.",
      "All partners and subprocessors must adhere to equivalent data protection standards.",
    ],
  },
  {
    title: "Data Security",
    items: [
      "We employ administrative, technical, and physical safeguards to protect your data.",
      "Data is encrypted in transit using TLS and at rest using industry-standard encryption.",
      "Access to personal data is restricted to authorized personnel on a need-to-know basis.",
      "We conduct regular security monitoring and vulnerability assessments.",
    ],
  },
  {
    title: "Data Storage and Retention",
    items: [
      "Your data is stored on secure servers with appropriate access controls.",
      "We retain personal data only for as long as necessary to fulfill the purposes described in this policy.",
      "You may request deletion of your data at any time (subject to legal retention requirements).",
    ],
  },
  {
    title: "International Data Transfer",
    items: [
      "If your data is transferred outside your home jurisdiction, we ensure equivalent protections.",
      "We use Standard Contractual Clauses (SCCs) or equivalent safeguards approved by relevant regulators.",
    ],
  },
  {
    title: "Your Rights",
    items: [
      "Right to access: request a copy of the personal data we hold about you.",
      "Right to rectification: request correction of inaccurate or incomplete data.",
      "Right to erasure: request deletion of your personal data (the 'right to be forgotten').",
      "Right to restriction: request that we limit processing of your data in certain circumstances.",
      "Right to data portability: receive your data in a structured, machine-readable format.",
      "To exercise any of these rights, contact us at: privacy@autosa.net",
    ],
  },
  {
    title: "Cookies and Tracking Technologies",
    items: [
      "We use cookies and similar technologies to improve user experience and analyze site usage.",
      "Analytics tools collect anonymized behavioral data to help us understand how our services are used.",
      "You may configure your browser to refuse cookies; however, some features may not function correctly.",
    ],
  },
  {
    title: "AI Transparency",
    items: [
      "Autosa is committed to responsible AI. Our systems are designed with fairness and transparency in mind.",
      "We apply data minimization principles: we only collect data necessary for the purpose stated.",
      "Our AI systems undergo regular evaluation to identify and mitigate bias.",
      "We do not make fully automated decisions that have significant legal or equivalent effects without human oversight.",
    ],
  },
];

export default function PrivacyPolicyPage() {
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
            Privacy Policy
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
            At Autosa AI, we respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, share, and protect information about you when you use our services.
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
              Questions about this policy? Contact our Privacy Officer at{" "}
              <a href="mailto:privacy@autosa.net" className="text-[#c8955a] hover:underline">
                privacy@autosa.net
              </a>
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
