"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { useAdmin } from "@/components/admin/AdminContext";
import { Layers, FolderGit2, Users, Activity, Clock, ArrowUpRight, TrendingUp, Shield } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface Stats {
  subProjects: number;
  projects: number;
  admins: number;
}

interface AuditEntry {
  _id: string;
  adminName: string;
  action: string;
  collection: string;
  details: string;
  timestamp: string;
}

// Muted warm amber — easy on the eyes
const A = "#c8905a";
const AL = "rgba(200,144,90,";

const ACTION_COLORS: Record<string, { text: string; bg: string; dot: string }> = {
  create:  { text: "#5ebd8e", bg: "rgba(94,189,142,0.08)",  dot: "#5ebd8e" },
  update:  { text: "#7ba8d4", bg: "rgba(123,168,212,0.08)", dot: "#7ba8d4" },
  delete:  { text: "#d47b7b", bg: "rgba(212,123,123,0.08)", dot: "#d47b7b" },
  login:   { text: "#c8905a", bg: "rgba(200,144,90,0.08)",  dot: "#c8905a" },
  logout:  { text: "rgba(255,255,255,0.28)", bg: "rgba(255,255,255,0.03)", dot: "rgba(255,255,255,0.18)" },
};

function useCountUp(target: number, duration = 1100) {
  const [count, setCount] = useState(0);
  const prevTarget = useRef(0);
  useEffect(() => {
    if (target === 0 && prevTarget.current === 0) return;
    prevTarget.current = target;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(target * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration]);
  return count;
}

function StatCard({
  label,
  value,
  icon,
  accent,
  index,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
  accent: string;
  index: number;
}) {
  const animated = useCountUp(value);
  return (
    <div
      className="relative rounded-2xl p-5 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, rgba(255,255,255,0.025) 0%, rgba(255,255,255,0.01) 100%)",
        border: "1px solid rgba(255,255,255,0.055)",
        animationDelay: `${index * 100}ms`,
      }}
    >
      {/* Corner ambient glow */}
      <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${accent}18 0%, transparent 70%)` }} />
      {/* Icon row */}
      <div className="flex items-center justify-between mb-4">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background: `${accent}10`, border: `1px solid ${accent}22` }}>
          <span style={{ color: accent, opacity: 0.85 }}>{icon}</span>
        </div>
        <TrendingUp size={12} style={{ color: "rgba(255,255,255,0.12)" }} />
      </div>
      {/* Count */}
      <p className="text-white font-bold leading-none mb-1.5"
        style={{ fontSize: "30px", letterSpacing: "-0.02em" }}>
        {animated}
      </p>
      <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.32)", fontWeight: 500, letterSpacing: "0.01em" }}>
        {label}
      </p>
    </div>
  );
}

const SERVICE_META: Record<string, { gradient: string; accent: string; desc: string; icon: string }> = {
  nova:  { gradient: `linear-gradient(135deg, ${AL}0.10) 0%, ${AL}0.03) 100%)`, accent: A,      desc: "Core platform service", icon: "⚡" },
  solvo: { gradient: `linear-gradient(135deg, ${AL}0.06) 0%, ${AL}0.02) 100%)`, accent: "#ba8050", desc: "Solutions engine",     icon: "◈" },
  yard:  { gradient: "linear-gradient(135deg, rgba(255,255,255,0.035) 0%, rgba(255,255,255,0.01) 100%)", accent: "rgba(255,255,255,0.45)", desc: "Infrastructure layer", icon: "▲" },
};

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

export default function DashboardPage() {
  const { admin, fetchWithAuth } = useAdmin();
  const [stats, setStats] = useState<Stats>({ subProjects: 0, projects: 0, admins: 0 });
  const [recentLogs, setRecentLogs] = useState<AuditEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const [subRes, projRes, auditRes, adminsRes] = await Promise.all([
        fetchWithAuth("/api/sub-projects"),
        fetchWithAuth("/api/projects"),
        fetchWithAuth("/api/audit?limit=8"),
        admin?.role === "owner" ? fetchWithAuth("/api/admins") : Promise.resolve(null),
      ]);
      const subData    = await subRes.json();
      const projData   = await projRes.json();
      const auditData  = await auditRes.json();
      const adminsData = adminsRes ? await adminsRes.json() : null;
      setStats({
        subProjects: subData.data?.length   ?? 0,
        projects:    projData.data?.length   ?? 0,
        admins:      adminsData?.data?.length ?? 0,
      });
      setRecentLogs(auditData.data ?? []);
    } catch (err) {
      console.error("Dashboard fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, [fetchWithAuth, admin?.role]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const statCards = [
    { label: "Sub-Projects",   value: stats.subProjects, icon: <Layers size={17} />,     accent: A },
    { label: "Total Projects", value: stats.projects,    icon: <FolderGit2 size={17} />, accent: "#8b8bc0" },
    ...(admin?.role === "owner"
      ? [{ label: "Admins", value: stats.admins, icon: <Users size={17} />, accent: "#5ebd8e" }]
      : []),
  ];

  return (
    <div className="relative min-h-screen" style={{ background: "#070707" }}>

      {/* Ambient background orbs — very subtle */}
      <div className="fixed pointer-events-none"
        style={{ top: "5%", left: "55%", width: "700px", height: "700px", background: `radial-gradient(circle, ${AL}0.03) 0%, transparent 65%)`, filter: "blur(60px)", zIndex: 0 }} />
      <div className="fixed pointer-events-none"
        style={{ top: "55%", left: "15%", width: "500px", height: "500px", background: "radial-gradient(circle, rgba(139,139,192,0.025) 0%, transparent 65%)", filter: "blur(60px)", zIndex: 0 }} />

      <div className="relative z-10 px-4 py-8 sm:px-8 sm:py-10 max-w-5xl">

        {/* ── Welcome Header ── */}
        <div className="mb-10 flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <div className="w-1.5 h-1.5 rounded-full"
                style={{ background: A, boxShadow: `0 0 5px ${AL}0.6)`, animation: "pulse 2.5s ease-in-out infinite" }} />
              <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.28)", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 600 }}>
                Live Dashboard
              </span>
            </div>
            <h1 className="text-white font-bold tracking-tight" style={{ fontSize: "25px", letterSpacing: "-0.02em" }}>
              {getGreeting()},{" "}
              <span style={{ background: `linear-gradient(90deg, ${A}, #ba8050)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                {admin?.name ?? "—"}
              </span>
            </h1>
            <p style={{ color: "rgba(255,255,255,0.28)", fontSize: "13px", marginTop: "5px" }}>
              Here&apos;s what&apos;s happening across your services.
            </p>
          </div>

          {/* Logo badge */}
          <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl"
            style={{ background: `${AL}0.05)`, border: `1px solid ${AL}0.1)` }}>
            <div className="w-7 h-7 rounded-lg overflow-hidden flex items-center justify-center"
              style={{ background: `${AL}0.08)` }}>
              <Image src="/logo.png" alt="Autosa" width={24} height={24} className="object-contain"
                style={{ filter: "saturate(0.85)" }} />
            </div>
            <div>
              <p className="autosa-wordmark text-white" style={{ fontSize: "11px", letterSpacing: "0.12em" }}>AUTOSA</p>
              {admin?.role === "owner" && (
                <div className="flex items-center gap-1 mt-0.5">
                  <Shield size={8} style={{ color: A }} />
                  <span style={{ fontSize: "9px", color: A, fontWeight: 700, letterSpacing: "0.1em" }}>OWNER</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Stats Grid ── */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-28 rounded-2xl animate-pulse"
                style={{ background: "rgba(255,255,255,0.018)", border: "1px solid rgba(255,255,255,0.04)" }} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            {statCards.map((card, i) => (
              <StatCard key={card.label} index={i} {...card} />
            ))}
          </div>
        )}

        {/* ── Services Grid ── */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded-md flex items-center justify-center"
                style={{ background: `${AL}0.1)`, border: `1px solid ${AL}0.18)` }}>
                <Layers size={11} style={{ color: A }} />
              </div>
              <h2 className="text-white font-semibold" style={{ fontSize: "14px", letterSpacing: "-0.01em" }}>Services</h2>
            </div>
            <Link href="/admin/services"
              className="flex items-center gap-1.5 transition-all"
              style={{ color: A, fontSize: "12px", fontWeight: 500 }}>
              Manage all <ArrowUpRight size={12} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {(["nova", "solvo", "yard"] as const).map((svc) => {
              const meta = SERVICE_META[svc];
              return (
                <Link
                  key={svc}
                  href={`/admin/services?service=${svc}`}
                  className="group relative rounded-2xl p-4 overflow-hidden transition-all duration-300"
                  style={{ background: meta.gradient, border: "1px solid rgba(255,255,255,0.05)" }}
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.025) 0%, transparent 60%)" }} />
                  <div className="text-xl mb-3 leading-none"
                    style={{ filter: `drop-shadow(0 0 6px ${meta.accent}44)` }}>
                    {meta.icon}
                  </div>
                  <p className="font-bold uppercase text-white" style={{ fontSize: "12px", letterSpacing: "0.1em" }}>{svc}</p>
                  <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.28)", marginTop: "3px" }}>{meta.desc}</p>
                  <div className="absolute bottom-3.5 right-3.5 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-1 group-hover:translate-x-0">
                    <ArrowUpRight size={13} style={{ color: meta.accent }} />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* ── Recent Activity ── */}
        <div>
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded-md flex items-center justify-center"
                style={{ background: "rgba(255,255,255,0.035)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <Activity size={11} style={{ color: "rgba(255,255,255,0.35)" }} />
              </div>
              <h2 className="text-white font-semibold" style={{ fontSize: "14px", letterSpacing: "-0.01em" }}>Recent Activity</h2>
            </div>
            <Link href="/admin/audit"
              className="flex items-center gap-1"
              style={{ color: A, fontSize: "12px", fontWeight: 500 }}>
              View all <ArrowUpRight size={12} />
            </Link>
          </div>

          {loading ? (
            <div className="space-y-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-14 rounded-xl animate-pulse"
                  style={{ background: "rgba(255,255,255,0.018)", border: "1px solid rgba(255,255,255,0.04)" }} />
              ))}
            </div>
          ) : recentLogs.length === 0 ? (
            <div className="text-center py-10" style={{ color: "rgba(255,255,255,0.18)", fontSize: "13px" }}>
              No activity yet.
            </div>
          ) : (
            <div className="rounded-2xl overflow-hidden"
              style={{ border: "1px solid rgba(255,255,255,0.045)", background: "rgba(255,255,255,0.012)" }}>
              {recentLogs.map((log, i) => {
                const colors = ACTION_COLORS[log.action] ?? ACTION_COLORS.logout;
                return (
                  <div
                    key={log._id}
                    className="flex items-center gap-4 px-5 py-3.5"
                    style={{ borderBottom: i < recentLogs.length - 1 ? "1px solid rgba(255,255,255,0.03)" : "none" }}
                  >
                    {/* Action dot */}
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: colors.dot, boxShadow: `0 0 4px ${colors.dot}55` }} />

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)", lineHeight: "1.4" }}>
                        <span className="text-white font-semibold">{log.adminName}</span>
                        {" "}
                        <span className="font-medium px-1.5 py-0.5 rounded-md text-xs"
                          style={{ background: colors.bg, color: colors.text }}>
                          {log.action}
                        </span>
                        {" "}
                        <span style={{ color: "rgba(255,255,255,0.3)" }}>{log.details}</span>
                      </p>
                    </div>

                    {/* Timestamp */}
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <Clock size={10} style={{ color: "rgba(255,255,255,0.13)" }} />
                      <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.18)" }}>
                        {new Date(log.timestamp).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
