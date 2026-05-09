"use client";
import { useState, useEffect, useCallback } from "react";
import { useAdmin } from "@/components/admin/AdminContext";
import { ScrollText, ChevronLeft, ChevronRight } from "lucide-react";

interface AuditLog {
  _id: string;
  adminName: string;
  action: "create" | "update" | "delete" | "login" | "logout";
  collection: string;
  details: string;
  timestamp: string;
}

const ACTION_STYLES: Record<string, string> = {
  create: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  update: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  delete: "bg-red-500/10 text-red-400 border-red-500/20",
  login: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  logout: "bg-white/5 text-white/30 border-white/10",
};

export default function AuditPage() {
  const { admin, fetchWithAuth } = useAdmin();
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filter, setFilter] = useState("");
  const LIMIT = 20;

  const fetchLogs = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page), limit: String(LIMIT) });
      if (filter) params.set("action", filter);
      const res = await fetchWithAuth(`/api/audit?${params}`);
      const data = await res.json();
      setLogs(data.data ?? []);
      setTotalPages(data.meta?.pages ?? 1);
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }, [fetchWithAuth, page, filter]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  return (
    <div className="px-4 py-6 sm:p-8 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-white text-2xl font-bold tracking-tight flex items-center gap-2">
            <ScrollText size={22} className="text-orange-400" />
            {admin?.role === "owner" ? "Audit Log" : "My Activity"}
          </h1>
          <p className="text-white/40 text-sm mt-1">
            {admin?.role === "owner" ? "All admin activity" : "Your recent actions"}
          </p>
        </div>
        <select
          value={filter}
          onChange={(e) => { setFilter(e.target.value); setPage(1); }}
          className="bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-orange-500/60 transition-colors"
        >
          <option value="">All actions</option>
          <option value="create">Create</option>
          <option value="update">Update</option>
          <option value="delete">Delete</option>
          <option value="login">Login</option>
          <option value="logout">Logout</option>
        </select>
      </div>

      {loading ? (
        <div className="space-y-2">
          {[1, 2, 3, 4, 5].map((i) => <div key={i} className="h-14 rounded-xl bg-white/[0.03] border border-white/[0.06] animate-pulse" />)}
        </div>
      ) : logs.length === 0 ? (
        <div className="text-center py-16 rounded-2xl border border-dashed border-white/[0.08]">
          <ScrollText size={36} className="text-white/10 mx-auto mb-3" />
          <p className="text-white/30 text-sm">No activity found.</p>
        </div>
      ) : (
        <div className="rounded-2xl border border-white/[0.06] bg-[#0a0a0a] overflow-hidden">
          {logs.map((log, i) => (
            <div
              key={log._id}
              className={`flex items-start gap-4 px-5 py-4 ${i < logs.length - 1 ? "border-b border-white/[0.04]" : ""}`}
            >
              <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold border flex-shrink-0 mt-0.5 ${ACTION_STYLES[log.action] ?? "bg-white/5 text-white/30 border-white/10"}`}>
                {log.action}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-white/80 text-sm">
                  <span className="text-white font-medium">{log.adminName}</span>
                  {" · "}
                  <span className="text-white/40">{log.details}</span>
                </p>
                <p className="text-white/25 text-xs mt-0.5 capitalize">{log.collection.replace("_", " ")}</p>
              </div>
              <p className="text-white/25 text-xs flex-shrink-0">
                {new Date(log.timestamp).toLocaleString("en-GB", {
                  day: "numeric", month: "short", hour: "2-digit", minute: "2-digit"
                })}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm text-white/50 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft size={15} /> Previous
          </button>
          <p className="text-white/30 text-sm">Page {page} of {totalPages}</p>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm text-white/50 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            Next <ChevronRight size={15} />
          </button>
        </div>
      )}
    </div>
  );
}
