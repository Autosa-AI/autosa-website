"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";

const JOURNEYS = [
  { label: "Yard", href: "/yard" },
  { label: "Solvo", href: "/solvo" },
  { label: "Nova", href: "/nova" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [journeyOpen, setJourneyOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileJourneyOpen, setMobileJourneyOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setJourneyOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setJourneyOpen(false);
  }, [pathname]);

  const isActive = (href: string) => pathname === href;
  const isJourneyActive = JOURNEYS.some((j) => pathname === j.href) || pathname === "/journeys";

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || mobileOpen
            ? "bg-black/90 backdrop-blur-xl border-b border-white/[0.06]"
            : ""
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-[88px] flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Autosa"
              width={759}
              height={763}
              className="h-16 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className={`text-sm font-medium tracking-wide transition-colors ${
                isActive("/") ? "text-white" : "text-white/40 hover:text-white"
              }`}
            >
              Home
            </Link>

            {/* Journeys dropdown */}
            <div ref={dropdownRef} className="relative">
              <button
                onMouseEnter={() => setJourneyOpen(true)}
                onMouseLeave={() => setJourneyOpen(false)}
                onClick={() => setJourneyOpen((v) => !v)}
                className={`flex items-center gap-1.5 text-sm font-medium tracking-wide transition-colors ${
                  isJourneyActive ? "text-white" : "text-white/40 hover:text-white"
                }`}
              >
                Journeys
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${journeyOpen ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {journeyOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.18 }}
                    onMouseEnter={() => setJourneyOpen(true)}
                    onMouseLeave={() => setJourneyOpen(false)}
                    className="absolute top-full left-0 mt-2 w-40 rounded-xl border border-white/[0.08] bg-black/95 backdrop-blur-xl shadow-2xl overflow-hidden"
                  >
                    <Link
                      href="/journeys"
                      className="block px-4 py-2.5 text-xs font-bold uppercase tracking-[0.2em] text-white/30 hover:text-white/60 border-b border-white/[0.06] transition-colors"
                    >
                      All Journeys
                    </Link>
                    {JOURNEYS.map((j) => (
                      <Link
                        key={j.href}
                        href={j.href}
                        className={`block px-4 py-2.5 text-sm font-medium transition-colors hover:bg-white/[0.04] hover:text-white ${
                          isActive(j.href) ? "text-[#c8955a]" : "text-white/55"
                        }`}
                      >
                        {j.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/about"
              className={`text-sm font-medium tracking-wide transition-colors ${
                isActive("/about") ? "text-white" : "text-white/40 hover:text-white"
              }`}
            >
              About
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/contact"
              className="hidden md:flex items-center gap-2 px-5 py-2 rounded-lg text-white hover:text-[#c8955a] text-sm font-semibold transition-all duration-200 tracking-wide border border-[#c8955a]"
            >
              Contact us
            </Link>

            {/* Mobile hamburger */}
            <button
              className="md:hidden text-white/60 hover:text-white transition-colors"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden border-t border-white/[0.06] bg-black/95 backdrop-blur-xl overflow-hidden"
            >
              <div className="px-6 py-4 flex flex-col gap-1">
                <Link
                  href="/"
                  className={`py-2.5 text-sm font-medium tracking-wide transition-colors ${
                    isActive("/") ? "text-white" : "text-white/50 hover:text-white"
                  }`}
                >
                  Home
                </Link>

                <button
                  onClick={() => setMobileJourneyOpen((v) => !v)}
                  className={`flex items-center justify-between py-2.5 text-sm font-medium tracking-wide transition-colors ${
                    isJourneyActive ? "text-white" : "text-white/50 hover:text-white"
                  }`}
                >
                  Journeys
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${mobileJourneyOpen ? "rotate-180" : ""}`}
                  />
                </button>

                <AnimatePresence>
                  {mobileJourneyOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pl-4 flex flex-col gap-1 overflow-hidden"
                    >
                      <Link href="/journeys" className="py-2 text-xs font-bold uppercase tracking-[0.2em] text-white/30 hover:text-white/60 transition-colors">
                        All Journeys
                      </Link>
                      {JOURNEYS.map((j) => (
                        <Link
                          key={j.href}
                          href={j.href}
                          className={`py-2 text-sm font-medium transition-colors ${
                            isActive(j.href) ? "text-[#c8955a]" : "text-white/50 hover:text-white"
                          }`}
                        >
                          {j.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                <Link
                  href="/about"
                  className={`py-2.5 text-sm font-medium tracking-wide transition-colors ${
                    isActive("/about") ? "text-white" : "text-white/50 hover:text-white"
                  }`}
                >
                  About
                </Link>

                <Link
                  href="/contact"
                  className="mt-3 flex items-center justify-center px-4 py-2.5 rounded-lg text-white hover:text-[#c8955a] text-sm font-semibold transition-all duration-200 tracking-wide border border-[#c8955a]"
                >
                  Contact us
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
