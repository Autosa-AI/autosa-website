"use client";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[40vh] flex items-center justify-center pt-16 bg-hero-image">
        <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_50%,rgba(247,172,84,0.04),transparent)] pointer-events-none" />
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto py-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="section-label justify-center mb-8"
          >
            Reach Out
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl sm:text-7xl text-white font-bold mb-6"
          >
            Get in Touch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-white/40 text-lg max-w-xl mx-auto"
          >
            Get in touch with us
          </motion.p>
        </div>
      </section>

      {/* Contact section */}
      <section className="py-24 px-6 border-t border-white/[0.05] bg-section-image relative">
        <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(247,172,84,0.03),transparent)] pointer-events-none" />

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left: info */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-3xl sm:text-4xl text-white font-bold mb-6">
                Automate Your Way<br />to Success
              </h2>
              <p className="text-white/40 text-base leading-relaxed mb-10">
                Got an idea or just curious about AI? At Autosa, we&apos;re here to listen, lend guidance, and join in your enthusiasm. Let&apos;s work together to create something extraordinary in the exciting world of AI!
              </p>

              {/* Email */}
              <div className="mb-8">
                <p className="text-white/30 text-xs font-bold uppercase tracking-[0.2em] mb-2">Email</p>
                <a href="mailto:contact@autosa.net" className="text-white/70 hover:text-[#c8955a] transition-colors text-base font-medium">
                  contact@autosa.net
                </a>
              </div>

              {/* Social */}
              <div>
                <p className="text-white/30 text-xs font-bold uppercase tracking-[0.2em] mb-4">Follow us</p>
                <div className="flex items-center gap-5">
                  <a href="https://www.facebook.com/autosa.ml/" target="_blank" rel="noopener noreferrer"
                    className="text-white/30 hover:text-[#c8955a] transition-colors" aria-label="Facebook">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                  <a href="https://www.linkedin.com/company/autosa/" target="_blank" rel="noopener noreferrer"
                    className="text-white/30 hover:text-[#c8955a] transition-colors" aria-label="LinkedIn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                  <a href="https://www.youtube.com/@Autosa_ai/" target="_blank" rel="noopener noreferrer"
                    className="text-white/30 hover:text-[#c8955a] transition-colors" aria-label="YouTube">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Right: form */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8"
            >
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
