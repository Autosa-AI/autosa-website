"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ArrowRight, Box, Sparkles, Terminal, Shield, Users, DollarSign } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";

/* ── Geodesic Sphere (canvas) ──────────────────────────────────────── */
function GeodesicSphere({ size = 560 }: { size?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);
  const angleRef = useRef(0.3);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const cx = size / 2;
    const cy = size / 2;
    const R = size * 0.41;

    const g = (1 + Math.sqrt(5)) / 2;
    const verts: number[][] = [
      [-1, g, 0], [1, g, 0], [-1, -g, 0], [1, -g, 0],
      [0, -1, g], [0, 1, g], [0, -1, -g], [0, 1, -g],
      [g, 0, -1], [g, 0, 1], [-g, 0, -1], [-g, 0, 1],
    ].map(([x, y, z]) => {
      const l = Math.sqrt(x * x + y * y + z * z);
      return [x / l, y / l, z / l];
    });

    const faces = [
      [0,11,5],[0,5,1],[0,1,7],[0,7,10],[0,10,11],
      [1,5,9],[5,11,4],[11,10,2],[10,7,6],[7,1,8],
      [3,9,4],[3,4,2],[3,2,6],[3,6,8],[3,8,9],
      [4,9,5],[2,4,11],[6,2,10],[8,6,7],[9,8,1],
    ];

    const dots: [number, number, number][] = [];
    for (let lat = -80; lat <= 80; lat += 13) {
      const lr = (lat * Math.PI) / 180;
      const count = Math.max(1, Math.round(15 * Math.cos(lr)));
      for (let i = 0; i < count; i++) {
        const lon = (i / count) * 2 * Math.PI;
        dots.push([Math.cos(lr) * Math.cos(lon), Math.sin(lr), Math.cos(lr) * Math.sin(lon)]);
      }
    }

    function project(v: number[], angle: number) {
      const [x, y, z] = v;
      const rx = x * Math.cos(angle) - z * Math.sin(angle);
      const rz = x * Math.sin(angle) + z * Math.cos(angle);
      return { sx: cx + rx * R, sy: cy - y * R * 0.82, depth: rz };
    }

    function draw() {
      ctx.clearRect(0, 0, size, size);
      const a = angleRef.current;

      faces.forEach(([ai, bi, ci]) => {
        const pa = project(verts[ai], a);
        const pb = project(verts[bi], a);
        const pc = project(verts[ci], a);
        const avg = (pa.depth + pb.depth + pc.depth) / 3;
        const alpha = avg > 0.1 ? 0.07 : 0.025;
        ctx.beginPath();
        ctx.moveTo(pa.sx, pa.sy);
        ctx.lineTo(pb.sx, pb.sy);
        ctx.lineTo(pc.sx, pc.sy);
        ctx.closePath();
        ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
        ctx.lineWidth = 0.7;
        ctx.stroke();
      });

      dots.forEach(([dx, dy, dz]) => {
        const p = project([dx, dy, dz], a);
        const inFront = p.depth > -0.2;
        const r = inFront ? 1.8 + p.depth * 3.5 : 0.6;
        const alpha = inFront ? Math.min(0.55, 0.18 + p.depth * 0.4) : 0.04;
        if (r > 0.3) {
          ctx.beginPath();
          ctx.arc(p.sx, p.sy, r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${alpha})`;
          ctx.fill();
        }
      });

      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.01, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255,255,255,0.05)";
      ctx.lineWidth = 1;
      ctx.stroke();

      angleRef.current += 0.0025;
      frameRef.current = requestAnimationFrame(draw);
    }

    draw();
    return () => cancelAnimationFrame(frameRef.current);
  }, [size]);

  return <canvas ref={canvasRef} width={size} height={size} />;
}

/* ── Animated counter ─────────────────────────────────────────────── */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = to / (1800 / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= to) { setCount(to); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, to]);

  return <span ref={ref}>{count}{suffix}</span>;
}

/* ── Services data ────────────────────────────────────────────────── */
const SERVICES = [
  {
    slug: "nova",
    label: "Nova",
    icon: <Sparkles size={26} />,
    tagline: "AI Intelligence Layer",
    desc: "Next-generation AI models and pipelines powering predictive analytics, natural language understanding, and autonomous decision-making at scale.",
  },
  {
    slug: "solvo",
    label: "Solvo",
    icon: <Box size={26} />,
    tagline: "ERP Automation Components",
    desc: "We build the automation components your ERP is missing, modular workflows, smart integrations, and process engines wired into your operations.",
  },
  {
    slug: "yard",
    label: "Yard",
    icon: <Terminal size={26} />,
    tagline: "Developer Workspace",
    desc: "A powerful suite of developer tools, APIs, and environments that lets teams build, test, and deploy AI-powered applications with confidence.",
  },
];

/* ── Service card ─────────────────────────────────────────────────── */
function ServiceCard({ service, index }: { service: typeof SERVICES[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-2xl border p-8 cursor-default overflow-hidden card-hover bg-black/60"
      style={{ borderColor: hovered ? "rgba(200,149,90,0.35)" : "rgba(255,255,255,0.07)" }}
    >
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{ background: "radial-gradient(circle at 30% 30%, rgba(200,149,90,0.07), transparent 70%)" }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      <motion.div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, #c8955a, transparent)" }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      <div className="relative z-10">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 border"
          style={{
            background: hovered ? "rgba(200,149,90,0.15)" : "rgba(255,255,255,0.05)",
            borderColor: hovered ? "rgba(200,149,90,0.3)" : "rgba(255,255,255,0.08)",
            color: hovered ? "#c8955a" : "rgba(255,255,255,0.6)",
            transition: "all 0.35s ease",
          }}
        >
          {service.icon}
        </div>
        <div className="mb-3">
          <h3
            className="text-white text-2xl mb-1 autosa-wordmark"
          >
            {service.label}
          </h3>
          <p className="text-white/30 text-[10px] font-semibold uppercase tracking-[0.25em]" style={{ fontFamily: "'Open Sans', sans-serif" }}>{service.tagline}</p>
        </div>
        <p className="text-white/45 text-sm leading-relaxed mb-6" style={{ fontFamily: "'Open Sans', sans-serif" }}>{service.desc}</p>
        <motion.a
          href={`/${service.slug}`}
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em]"
          style={{
            color: hovered ? "#c8955a" : "rgba(255,255,255,0.3)",
            fontFamily: "'Open Sans', sans-serif",
            transition: "color 0.25s ease",
          }}
        >
          Explore {service.label}
          <motion.span animate={{ x: hovered ? 4 : 0 }} transition={{ duration: 0.2 }}>
            <ArrowRight size={14} />
          </motion.span>
        </motion.a>
      </div>
    </motion.div>
  );
}

/* ── Benefits data ────────────────────────────────────────────────── */
const BENEFITS = [
  {
    icon: <Shield size={26} />,
    title: "Efficient & Reliable",
    desc: "Autosa delivers fast and dependable service, ensuring your needs are met without the back-and-forth.",
  },
  {
    icon: <Users size={26} />,
    title: "Expertise at Every Level",
    desc: "A team of experienced engineers and AI specialists who understand your industry and know how to move fast.",
  },
  {
    icon: <DollarSign size={26} />,
    title: "Competitive Pricing",
    desc: "Reduce manual labor costs and free up resources for the work that actually moves your business forward.",
  },
];

/* ── Benefit card ─────────────────────────────────────────────────── */
function BenefitCard({ benefit, index }: { benefit: typeof BENEFITS[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-2xl border p-8 overflow-hidden card-hover bg-black/40"
      style={{ borderColor: hovered ? "rgba(200,149,90,0.25)" : "rgba(255,255,255,0.08)" }}
    >
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{ background: "radial-gradient(circle at 30% 30%, rgba(200,149,90,0.06), transparent 70%)" }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      <div className="relative z-10">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 border transition-all duration-300"
          style={{
            background: hovered ? "rgba(200,149,90,0.15)" : "rgba(255,255,255,0.05)",
            borderColor: hovered ? "rgba(200,149,90,0.3)" : "rgba(255,255,255,0.08)",
            color: hovered ? "#c8955a" : "rgba(255,255,255,0.5)",
          }}
        >
          {benefit.icon}
        </div>
        <h3 className="text-white text-xl font-bold mb-3">{benefit.title}</h3>
        <p className="text-white/40 text-sm leading-relaxed" style={{ fontFamily: "'Open Sans', sans-serif" }}>{benefit.desc}</p>
      </div>
    </motion.div>
  );
}

/* ── Main page ────────────────────────────────────────────────────── */
export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const aboutRef = useRef(null);
  const aboutInView = useInView(aboutRef, { once: true, margin: "-80px" });

  return (
    <div className="min-h-screen bg-black overflow-x-hidden">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center bg-hero-image">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="opacity-50"
          >
            <GeodesicSphere size={680} />
          </motion.div>
        </div>

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_65%_65%_at_50%_50%,transparent_25%,rgba(0,0,0,0.9)_80%)] pointer-events-none" />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="section-label justify-center mb-10"
          >
            Automate to Elevate
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="autosa-wordmark text-[clamp(64px,13vw,152px)] text-white mb-4 leading-none"
          >
            AUTOSA
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex items-center justify-center gap-4 mb-8"
          >
            <div className="h-px w-10 bg-white/20" />
            <p className="text-white/40 text-xs font-semibold tracking-[0.45em] uppercase" style={{ fontFamily: "'Open Sans', sans-serif" }}>Automate to Elevate</p>
            <div className="h-px w-10 bg-white/20" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="text-white/35 text-base sm:text-lg max-w-lg mx-auto leading-relaxed mb-12"
            style={{ fontFamily: "'Open Sans', sans-serif" }}
          >
            Nova. Solvo. Yard. Three AI services built to transform
            how teams think, build, and ship.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.6 }}
            className="flex justify-center mt-20"
          >
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-5 h-8 rounded-full border border-white/15 flex items-start justify-center pt-1.5"
            >
              <div className="w-0.5 h-2 rounded-full bg-white/30" />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── STATS ────────────────────────────────────────────────────── */}
      <section className="py-16 px-6 border-y border-white/[0.05] bg-black">
        <div className="max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { to: 3, label: "AI Services" },
            { to: 50, suffix: "+", label: "Projects Shipped" },
            { to: 99, suffix: "%", label: "Uptime SLA" },
            { to: 12, label: "Team Members" },
          ].map((s, i) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const ref = useRef(null);
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const inView = useInView(ref, { once: true });
            return (
              <motion.div
                key={s.label}
                ref={ref}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <p className="text-4xl font-black text-white mb-1">
                  <Counter to={s.to} suffix={s.suffix} />
                </p>
                <p className="text-white/30 text-[10px] font-semibold uppercase tracking-widest" style={{ fontFamily: "'Open Sans', sans-serif" }}>{s.label}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────────────────── */}
      <section id="services" className="py-28 px-6 bg-section-image">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="section-label justify-center mb-6"
            >
              Our Services
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl text-white mb-4 font-bold"
            >
              Three tools. One vision.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white/35 text-base max-w-xl mx-auto"
              style={{ fontFamily: "'Open Sans', sans-serif" }}
            >
              Each service stands on its own. Together, they form a complete AI ecosystem.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {SERVICES.map((svc, i) => (
              <ServiceCard key={svc.slug} service={svc} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── BENEFITS ─────────────────────────────────────────────────── */}
      <section className="py-28 px-6 border-t border-white/[0.05] bg-alt-image relative">
        <div className="absolute inset-0 dot-grid opacity-15 pointer-events-none" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="section-label justify-center mb-6"
            >
              Why Autosa
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl text-white font-bold mb-4"
            >
              Why teams choose Autosa
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {BENEFITS.map((b, i) => (
              <BenefitCard key={b.title} benefit={b} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ────────────────────────────────────────────────────── */}
      <section id="about" ref={aboutRef} className="py-28 px-6 border-t border-white/[0.05] bg-black">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -32 }}
              animate={aboutInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <div className="section-label mb-6">About Autosa</div>
              <h2 className="text-4xl sm:text-5xl text-white font-bold leading-tight mb-6">
                Automation that<br />
                <span className="text-gradient">makes sense</span>
              </h2>
              <p className="text-white/45 text-base leading-relaxed mb-4" style={{ fontFamily: "'Open Sans', sans-serif" }}>
                Autosa is an AI company built on one belief: advanced intelligence
                should be practical, not just impressive. We build tools that help
                teams move faster and make better decisions.
              </p>
              <p className="text-white/30 text-base leading-relaxed mb-8" style={{ fontFamily: "'Open Sans', sans-serif" }}>
                Nova handles AI consulting. Solvo builds your ERP automation components. Yard turns your ideas into custom AI solutions. The whole system grows with you.
              </p>
              <div className="flex flex-wrap gap-2">
                {["AI-First", "Open APIs", "Privacy-Safe", "Developer-Friendly"].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-md bg-white/[0.04] border border-white/[0.07] text-white/40 text-xs font-medium tracking-wide"
                    style={{ fontFamily: "'Open Sans', sans-serif" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 32 }}
              animate={aboutInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative flex items-center justify-center"
            >
              <div className="relative w-72 h-72">
                <div className="absolute inset-0 opacity-50">
                  <GeodesicSphere size={288} />
                </div>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <p className="autosa-wordmark text-white text-2xl">AUTOSA</p>
                  <div className="h-px w-8 bg-[#c8955a] my-2" />
                  <p className="text-[#c8955a] text-[9px] font-bold tracking-[0.3em] uppercase" style={{ fontFamily: "'Open Sans', sans-serif" }}>Automate to Elevate</p>
                </div>
                {[
                  { label: "NOVA", angle: -60, r: 46 },
                  { label: "SOLVO", angle: 60, r: 46 },
                  { label: "YARD", angle: 180, r: 46 },
                ].map((s) => {
                  const rad = (s.angle * Math.PI) / 180;
                  const x = 50 + s.r * Math.cos(rad);
                  const y = 50 + s.r * Math.sin(rad);
                  return (
                    <div
                      key={s.label}
                      className="absolute autosa-wordmark text-[9px] text-white/50"
                      style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%,-50%)" }}
                    >
                      {s.label}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────────────────────────────── */}
      <section id="contact" className="py-28 px-6 border-t border-white/[0.05] bg-section-image relative">
        <div className="absolute inset-0 dot-grid opacity-15 pointer-events-none" />
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
              style={{ fontFamily: "'Open Sans', sans-serif" }}
            >
              Got an idea or just curious about AI? We&apos;re here to listen and help you build something real.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="rounded-2xl border border-white/[0.08] bg-black/60 backdrop-blur-sm p-8"
          >
            <ContactForm />
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
