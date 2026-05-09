"use client";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SECTIONS = [
  {
    title: "Workplace Conduct",
    items: [
      "All team members are expected to act professionally, respectfully, and ethically in all interactions.",
      "We maintain a culture of open communication, mutual respect, and collaboration.",
      "Conflicts of interest must be disclosed to management promptly and transparently.",
      "All employees and contractors are required to comply with applicable laws and company policies.",
      "Misconduct, dishonesty, or violations of company policy may result in disciplinary action or termination.",
    ],
  },
  {
    title: "Data Handling",
    items: [
      "All employees must handle client and company data with the highest level of care and confidentiality.",
      "Personal data must only be accessed for legitimate business purposes and on a need-to-know basis.",
      "Data must be stored securely and not shared externally without proper authorization.",
      "Any data breach or suspected security incident must be reported immediately to the security team.",
      "Employees must comply with our Privacy Policy and applicable data protection regulations (e.g., GDPR).",
    ],
  },
  {
    title: "AI Ethics",
    items: [
      "We are committed to developing and deploying AI responsibly, fairly, and transparently.",
      "AI systems must not be used to discriminate, manipulate, or harm users or communities.",
      "We prioritize explainability: where possible, AI decisions should be understandable to affected parties.",
      "We apply data minimization: only collect and use data that is necessary for the stated purpose.",
      "All AI features must be reviewed for potential bias, safety risks, and societal impact before deployment.",
      "Employees involved in AI development are expected to raise ethical concerns through appropriate channels.",
    ],
  },
  {
    title: "Client Confidentiality",
    items: [
      "All client information, including business data, strategies, and communications, is strictly confidential.",
      "Client data must never be shared with unauthorized parties, including other clients or external vendors.",
      "Confidentiality obligations survive employment termination and must be maintained indefinitely.",
      "Non-disclosure agreements (NDAs) must be signed before accessing sensitive client information.",
    ],
  },
  {
    title: "Equal Opportunity",
    items: [
      "Autosa AI is committed to equal opportunity employment regardless of race, gender, nationality, religion, disability, or any other protected characteristic.",
      "All hiring, promotion, and compensation decisions are made on the basis of merit and qualifications.",
      "We actively work to create an inclusive environment where diverse perspectives are valued and heard.",
      "Discrimination in any form will not be tolerated and will result in disciplinary action.",
    ],
  },
  {
    title: "Anti-Harassment",
    items: [
      "Harassment of any kind (verbal, physical, or digital) is strictly prohibited.",
      "Sexual harassment, bullying, intimidation, or any behavior that creates a hostile work environment will not be tolerated.",
      "All complaints of harassment will be investigated promptly, fairly, and confidentially.",
      "Retaliation against individuals who report harassment in good faith is prohibited.",
      "Employees are encouraged to report concerns to HR without fear of reprisal.",
    ],
  },
];

export default function CompanyPolicyPage() {
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
            Company Policy
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
            These policies apply to all employees, contractors, partners, and representatives of Autosa AI. Our goal is to foster an environment built on trust, integrity, and innovation.
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
              Questions or concerns about company policy? Contact our HR team at{" "}
              <a href="mailto:hr@autosa.net" className="text-[#c8955a] hover:underline">
                hr@autosa.net
              </a>
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
