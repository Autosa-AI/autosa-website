"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, AlertCircle } from "lucide-react";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactForm() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus("success");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
        setErrorMsg(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please check your connection.");
    }
  };

  const inputClass =
    "w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm focus:outline-none focus:border-[#c8955a]/50 focus:bg-white/[0.05] transition-all";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-white/40 text-xs font-medium uppercase tracking-[0.15em] mb-2">
            Name <span className="text-[#c8955a]">*</span>
          </label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your name"
            required
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-white/40 text-xs font-medium uppercase tracking-[0.15em] mb-2">
            Email <span className="text-[#c8955a]">*</span>
          </label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="your@email.com"
            required
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className="block text-white/40 text-xs font-medium uppercase tracking-[0.15em] mb-2">
          Subject
        </label>
        <input
          name="subject"
          value={form.subject}
          onChange={handleChange}
          placeholder="What's this about?"
          className={inputClass}
        />
      </div>

      <div>
        <label className="block text-white/40 text-xs font-medium uppercase tracking-[0.15em] mb-2">
          Message <span className="text-[#c8955a]">*</span>
        </label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Tell us about your project or idea..."
          required
          rows={5}
          className={`${inputClass} resize-none`}
        />
      </div>

      {status === "success" && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 p-4 rounded-xl bg-green-500/[0.08] border border-green-500/20 text-green-400 text-sm"
        >
          <CheckCircle size={16} />
          Message sent! We&apos;ll get back to you soon.
        </motion.div>
      )}

      {status === "error" && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 p-4 rounded-xl bg-red-500/[0.08] border border-red-500/20 text-red-400 text-sm"
        >
          <AlertCircle size={16} />
          {errorMsg}
        </motion.div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="flex items-center gap-2.5 px-8 py-3.5 text-black font-bold text-sm tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ background: "linear-gradient(45deg, #c8955a, #b85040 78%)", borderRadius: "40px" }}
      >
        {status === "loading" ? (
          <>
            <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
            Sending...
          </>
        ) : (
          <>
            Send Message <ArrowRight size={15} />
          </>
        )}
      </button>
    </form>
  );
}
