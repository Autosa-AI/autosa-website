"use client";
import { useState, useEffect, useCallback } from "react";
import { useAdmin } from "@/components/admin/AdminContext";
import { Layers, FolderGit2, Users, Activity, Clock, Plus } from "lucide-react";
import Link from "next/link";

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

const SERVICE_COLORS: Record<string, string> = {
  nova: "bg-orange-500/15 text-orange-400 border-orange-500/20",
  solvo: "bg-orange-500/10 text-orange-300 border-orange-500/15",
  yard: "bg-white/[0.06] text-white/60 border-white/10",
};

const ACTION_COLORS: Record<string, string> = {
  create: "text-emerald-400",
  update: "text-blue-400",
  delete: "text-red-400",
  login: "text-orange-400",
  logout: "text-white/40",
};

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

      const subData = await subRes.json();
      const projData = await projRes.json();
      const auditData = await auditRes.json();
      const adminsData = adminsRes ? await adminsRes.json() : null;

      setStats({
        subProjects: subData.data?.length ?? 0,
        projects: projData.data?.length ?? 0,
        admins: adminsData?.data?.length ?? 0,
      });
      setRecentLogs(auditData.data ?? []);
    } catch (err) {
      console.error("Dashboard fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, [fetchWithAuth, admin?.role]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const statCards = [
    { label: "Sub-Projects", value: stats.subProjects, icon: <Layers size={20} />, color: "text-orange-400", bg: "bg-orange-500/10 border-orange-500/20" },
    { label: "Total Projects", value: stats.projects, icon: <FolderGit2 size={20} />, color: "text-white/70", bg: "bg-white/[0.04] border-white/10" },
    ...(admin?.role === "owner" ? [{ label: "Admins", value: stats.admins, icon: <Users size={20} />, color: "text-white/50", bg: "bg-white/[0.03] border-white/[0.07]" }] : []),
  ];

  return (
    <div className="px-4 py-6 sm:p-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-white text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-white/40 text-sm mt-1">
          Welcome back, <span className="text-white/60">{admin?.name}</span>
        </p>
      </div>

      {/* Stats */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 rounded-2xl bg-white/[0.03] border border-white/[0.06] animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {statCards.map((card) => (
            <div key={card.label} className={`rounded-2xl border p-5 ${card.bg}`}>
              <div className="flex items-center justify-between mb-3">
                <span className={`${card.color}`}>{card.icon}</span>
              </div>
              <p className="text-white text-3xl font-bold">{card.value}</p>
              <p className="text-white/40 text-sm mt-0.5">{card.label}</p>
            </div>
          ))}
        </div>
      )}

      {/* Services Quick Nav */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white font-semibold text-base">Services</h2>
          <Link href="/admin/services" className="text-orange-400 text-sm hover:text-orange-300 transition-colors flex items-center gap-1">
            <Plus size={14} /> Manage
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {(["nova", "solvo", "yard"] as const).map((svc) => (
            <Link
              key={svc}
              href={`/admin/services?service=${svc}`}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 hover:bg-white/[0.04] transition-colors group"
            >
              <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider border ${SERVICE_COLORS[svc]}`}>
                {svc}
              </span>
              <p className="text-white/40 text-xs mt-2 group-hover:text-white/60 transition-colors">
                View sub-projects →
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Activity size={16} className="text-white/40" />
          <h2 className="text-white font-semibold text-base">Recent Activity</h2>
        </div>
        {loading ? (
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-12 rounded-xl bg-white/[0.03] border border-white/[0.06] animate-pulse" />
            ))}
          </div>
        ) : recentLogs.length === 0 ? (
          <p className="text-white/30 text-sm">No activity yet.</p>
        ) : (
          <div className="rounded-2xl border border-white/[0.06] bg-[#0a0a0a] overflow-hidden">
            {recentLogs.map((log, i) => (
              <div
                key={log._id}
                className={`flex items-start gap-3 px-5 py-3.5 ${i < recentLogs.length - 1 ? "border-b border-white/[0.04]" : ""}`}
              >
                <div className="mt-0.5">
                  <Clock size={13} className="text-white/20" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white/70 text-sm leading-snug">
                    <span className="text-white/90 font-medium">{log.adminName}</span>
                    {" "}
                    <span className={`font-medium ${ACTION_COLORS[log.action] ?? "text-white/50"}`}>{log.action}</span>
                    {" "}
                    <span className="text-white/40">{log.details}</span>
                  </p>
                </div>
                <p className="text-white/25 text-xs flex-shrink-0">
                  {new Date(log.timestamp).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                </p>
              </div>
            ))}
          </div>
        )}
        <div className="mt-3 text-right">
          <Link href="/admin/audit" className="text-orange-400 text-sm hover:text-orange-300 transition-colors">
            View all activity →
          </Link>
        </div>
      </div>
    </div>
  );
}
