"use client";
import { useState, useEffect, useCallback, Suspense } from "react";
import { useAdmin } from "@/components/admin/AdminContext";
import { useToast } from "@/components/admin/Toast";
import ConfirmModal from "@/components/admin/ConfirmModal";
import FormField from "@/components/admin/FormField";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Plus, Trash2, Edit2, ChevronDown, ChevronRight,
  GitBranch, Globe, User, FolderGit2, Zap, Layers, Server, Code2,
} from "lucide-react";

type ServiceSlug = "nova" | "solvo" | "yard";

type ErpProvider = "odoo" | "sap" | "oracle" | "microsoft-dynamics" | "salesforce" | "netsuite" | "infor" | "epicor" | "other";

const ERP_PROVIDERS: { value: ErpProvider; label: string }[] = [
  { value: "odoo", label: "Odoo" },
  { value: "sap", label: "SAP" },
  { value: "oracle", label: "Oracle" },
  { value: "microsoft-dynamics", label: "Microsoft Dynamics" },
  { value: "salesforce", label: "Salesforce" },
  { value: "netsuite", label: "NetSuite" },
  { value: "infor", label: "Infor" },
  { value: "epicor", label: "Epicor" },
  { value: "other", label: "Other" },
];

interface AdminOption {
  _id: string;
  name: string;
  email: string;
}

interface SubProject {
  _id: string;
  service: ServiceSlug;
  erpProviders?: ErpProvider[];
  name: string;
  description: string;
  responsibleAdminId?: string;
  responsibleAdminName?: string;
  githubUrl?: string;
  backendGithubUrl?: string;
  uiUrl?: string;
  backendServerUrl?: string;
  createdAt: string;
}

interface Project {
  _id: string;
  subProjectId: string;
  service: ServiceSlug;
  name: string;
  description: string;
  responsibleAdminId?: string;
  responsibleAdminName?: string;
  githubUrl?: string;
  backendGithubUrl?: string;
  uiUrl?: string;
  backendServerUrl?: string;
  createdAt: string;
}

const SERVICE_META: Record<ServiceSlug, { label: string; desc: string; color: string; accent: string; glow: string }> = {
  nova: {
    label: "Nova",
    desc: "Next-generation AI-powered solutions",
    color: "bg-[#c8905a]/12 text-[#d4a070] border-[#c8905a]/22",
    accent: "text-[#c8905a]",
    glow: "shadow-[#c8905a]/10",
  },
  solvo: {
    label: "Solvo",
    desc: "Intelligent problem-solving platform",
    color: "bg-[#c8905a]/8 text-[#c8a070] border-[#c8905a]/15",
    accent: "text-[#c8a070]",
    glow: "shadow-[#c8905a]/5",
  },
  yard: {
    label: "Yard",
    desc: "Developer workspace & tooling",
    color: "bg-white/[0.07] text-white/70 border-white/10",
    accent: "text-white/50",
    glow: "shadow-white/5",
  },
};

const EMPTY_FORM = { name: "", description: "", erpProviders: [] as ErpProvider[], responsibleAdminId: "", githubUrl: "", backendGithubUrl: "", uiUrl: "", backendServerUrl: "" };

function ServicesContent() {
  const { fetchWithAuth, admin } = useAdmin();
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialService = (searchParams.get("service") as ServiceSlug) || "nova";
  const [activeService, setActiveService] = useState<ServiceSlug>(initialService);
  const [subProjects, setSubProjects] = useState<SubProject[]>([]);
  const [projects, setProjects] = useState<Record<string, Project[]>>({});
  const [expandedSubs, setExpandedSubs] = useState<Set<string>>(new Set());
  const [adminOptions, setAdminOptions] = useState<AdminOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [erpFilter, setErpFilter] = useState<ErpProvider | "all">("all");

  // Sub-project form
  const [showSubForm, setShowSubForm] = useState(false);
  const [editSub, setEditSub] = useState<SubProject | null>(null);
  const [subForm, setSubForm] = useState(EMPTY_FORM);
  const [subErrors, setSubErrors] = useState<Partial<typeof EMPTY_FORM>>({});
  const [savingSub, setSavingSub] = useState(false);
  const [confirmDeleteSub, setConfirmDeleteSub] = useState<SubProject | null>(null);

  // Project form
  const [showProjForm, setShowProjForm] = useState<string | null>(null); // subProjectId
  const [editProj, setEditProj] = useState<Project | null>(null);
  const [projForm, setProjForm] = useState(EMPTY_FORM);
  const [projErrors, setProjErrors] = useState<Partial<typeof EMPTY_FORM>>({});
  const [savingProj, setSavingProj] = useState(false);
  const [confirmDeleteProj, setConfirmDeleteProj] = useState<Project | null>(null);

  const fetchSubProjects = useCallback(async (service: ServiceSlug) => {
    setLoading(true);
    try {
      const res = await fetchWithAuth(`/api/sub-projects?service=${service}`);
      const data = await res.json();
      setSubProjects(data.data ?? []);
      setProjects({});
      setExpandedSubs(new Set());
    } catch {
      toast("Failed to load sub-projects", "error");
    } finally {
      setLoading(false);
    }
  }, [fetchWithAuth, toast]);

  const fetchProjects = useCallback(async (subProjectId: string) => {
    try {
      const res = await fetchWithAuth(`/api/projects?subProjectId=${subProjectId}`);
      const data = await res.json();
      setProjects((prev) => ({ ...prev, [subProjectId]: data.data ?? [] }));
    } catch {
      toast("Failed to load projects", "error");
    }
  }, [fetchWithAuth, toast]);

  const fetchAdmins = useCallback(async () => {
    if (admin?.role !== "owner") return;
    try {
      const res = await fetchWithAuth("/api/admins");
      const data = await res.json();
      setAdminOptions(data.data ?? []);
    } catch { /* non-critical */ }
  }, [fetchWithAuth, admin?.role]);

  useEffect(() => {
    fetchSubProjects(activeService);
    fetchAdmins();
  }, [activeService, fetchSubProjects, fetchAdmins]);

  function switchService(svc: ServiceSlug) {
    setActiveService(svc);
    setErpFilter("all");
    router.replace(`/admin/services?service=${svc}`, { scroll: false });
  }

  function toggleExpand(id: string) {
    setExpandedSubs((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
        if (!projects[id]) fetchProjects(id);
      }
      return next;
    });
  }

  // ── Sub-project CRUD ────────────────────────────────────────────────────
  function validateSubForm() {
    const e: Partial<typeof EMPTY_FORM> = {};
    if (!subForm.name.trim()) e.name = "Required";
    if (!subForm.description.trim()) e.description = "Required";
    if (activeService === "solvo" && subForm.erpProviders.length === 0) (e as Record<string, unknown>).erpProviders = "Required";
    setSubErrors(e);
    return !Object.keys(e).length;
  }

  async function handleSaveSub() {
    if (!validateSubForm()) return;
    setSavingSub(true);
    try {
      const body = { service: activeService, ...subForm };
      let res: Response;
      if (editSub) {
        res = await fetchWithAuth(`/api/sub-projects/${editSub._id}`, { method: "PATCH", body: JSON.stringify(body) });
      } else {
        res = await fetchWithAuth("/api/sub-projects", { method: "POST", body: JSON.stringify(body) });
      }
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      toast(editSub ? "Sub-project updated" : "Sub-project created", "success");
      setShowSubForm(false);
      setEditSub(null);
      setSubForm(EMPTY_FORM);
      fetchSubProjects(activeService);
    } catch (err) {
      toast(err instanceof Error ? err.message : "Failed to save", "error");
    } finally {
      setSavingSub(false);
    }
  }

  async function handleDeleteSub(sub: SubProject) {
    try {
      const res = await fetchWithAuth(`/api/sub-projects/${sub._id}`, { method: "DELETE" });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      toast("Sub-project deleted", "success");
      fetchSubProjects(activeService);
    } catch (err) {
      toast(err instanceof Error ? err.message : "Failed to delete", "error");
    } finally {
      setConfirmDeleteSub(null);
    }
  }

  // ── Project CRUD ─────────────────────────────────────────────────────────
  function validateProjForm() {
    const e: Partial<typeof EMPTY_FORM> = {};
    if (!projForm.name.trim()) e.name = "Required";
    if (!projForm.description.trim()) e.description = "Required";
    setProjErrors(e);
    return !Object.keys(e).length;
  }

  async function handleSaveProj(subProjectId: string) {
    if (!validateProjForm()) return;
    setSavingProj(true);
    try {
      const body = { subProjectId, ...projForm };
      let res: Response;
      if (editProj) {
        res = await fetchWithAuth(`/api/projects/${editProj._id}`, { method: "PATCH", body: JSON.stringify(body) });
      } else {
        res = await fetchWithAuth("/api/projects", { method: "POST", body: JSON.stringify(body) });
      }
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      toast(editProj ? "Project updated" : "Project created", "success");
      setShowProjForm(null);
      setEditProj(null);
      setProjForm(EMPTY_FORM);
      fetchProjects(subProjectId);
    } catch (err) {
      toast(err instanceof Error ? err.message : "Failed to save", "error");
    } finally {
      setSavingProj(false);
    }
  }

  async function handleDeleteProj(proj: Project) {
    try {
      const res = await fetchWithAuth(`/api/projects/${proj._id}`, { method: "DELETE" });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      toast("Project deleted", "success");
      fetchProjects(proj.subProjectId);
    } catch (err) {
      toast(err instanceof Error ? err.message : "Failed to delete", "error");
    } finally {
      setConfirmDeleteProj(null);
    }
  }

  const meta = SERVICE_META[activeService];
  const visibleSubProjects = activeService === "solvo" && erpFilter !== "all"
    ? subProjects.filter((s) => s.erpProviders?.includes(erpFilter as ErpProvider))
    : subProjects;

  return (
    <div className="px-4 py-6 sm:p-8 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-white text-2xl font-bold tracking-tight flex items-center gap-2">
            <Layers size={22} className="text-[#c8905a]" /> Services
          </h1>
          <p className="text-white/40 text-sm mt-1">Manage sub-projects and nested projects</p>
        </div>
      </div>

      {/* Service Tabs */}
      <div className="flex gap-2 mb-6 p-1 rounded-xl bg-white/[0.03] border border-white/[0.06] w-fit">
        {(["nova", "solvo", "yard"] as ServiceSlug[]).map((svc) => (
          <button
            key={svc}
            onClick={() => switchService(svc)}
            className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-150 capitalize ${
              activeService === svc
                ? `border ${SERVICE_META[svc].color}`
                : "text-white/40 hover:text-white"
            }`}
          >
            {svc}
          </button>
        ))}
      </div>

      {/* ERP Provider Filter (Solvo only) */}
      {activeService === "solvo" && (
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            onClick={() => setErpFilter("all")}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${erpFilter === "all" ? "bg-[#c8905a]/20 text-[#c8a070] border border-[#c8905a]/30" : "text-white/40 hover:text-white/70 border border-transparent"}`}
          >
            All
          </button>
          {ERP_PROVIDERS.map((p) => (
            <button
              key={p.value}
              onClick={() => setErpFilter(p.value)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${erpFilter === p.value ? "bg-[#c8905a]/20 text-[#c8a070] border border-[#c8905a]/30" : "text-white/40 hover:text-white/70 border border-transparent"}`}
            >
              {p.label}
            </button>
          ))}
        </div>
      )}

      {/* Service description + Add button */}
      <div className="flex items-center justify-between mb-5">
        <p className={`text-sm ${meta.accent}`}>{meta.desc}</p>
        <button
          onClick={() => { setSubForm(EMPTY_FORM); setSubErrors({}); setEditSub(null); setShowSubForm(true); }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#c8905a] text-white text-sm font-semibold hover:bg-[#b87d4a] transition-colors"
        >
          <Plus size={15} /> Add Sub-Project
        </button>
      </div>

      {/* Sub-projects list */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2].map((i) => <div key={i} className="h-20 rounded-2xl bg-white/[0.03] border border-white/[0.06] animate-pulse" />)}
        </div>
      ) : visibleSubProjects.length === 0 ? (
        <div className="text-center py-16 rounded-2xl border border-dashed border-white/[0.08]">
          <FolderGit2 size={40} className="text-white/10 mx-auto mb-3" />
          <p className="text-white/30 text-sm">
            {erpFilter !== "all" ? `No sub-projects for ${ERP_PROVIDERS.find((p) => p.value === erpFilter)?.label ?? erpFilter}.` : `No sub-projects yet for ${activeService}.`}
          </p>
          {erpFilter === "all" && (
            <button
              onClick={() => { setSubForm(EMPTY_FORM); setSubErrors({}); setEditSub(null); setShowSubForm(true); }}
              className="mt-4 text-[#c8905a] text-sm hover:text-[#d4a070] transition-colors"
            >
              + Create one
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {visibleSubProjects.map((sub) => {
            const isExpanded = expandedSubs.has(sub._id);
            const subProjects_ = projects[sub._id];

            return (
              <div key={sub._id} className="rounded-2xl border border-white/[0.06] bg-[#0a0a0a] overflow-hidden">
                {/* Sub-project header */}
                <div className="flex items-center gap-3 px-5 py-4">
                  <button
                    onClick={() => toggleExpand(sub._id)}
                    className="text-white/30 hover:text-white/60 transition-colors flex-shrink-0"
                  >
                    {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </button>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-white font-semibold text-sm">{sub.name}</p>
                      {sub.erpProviders?.map((ep) => (
                        <span key={ep} className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-[#c8905a]/10 text-[#c8a070] border border-[#c8905a]/20">
                          {ERP_PROVIDERS.find((p) => p.value === ep)?.label ?? ep}
                        </span>
                      ))}
                      {sub.responsibleAdminName && (
                        <span className="flex items-center gap-1 text-white/30 text-xs">
                          <User size={10} /> {sub.responsibleAdminName}
                        </span>
                      )}
                    </div>
                    <p className="text-white/40 text-xs mt-0.5 truncate">{sub.description}</p>
                  </div>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    {sub.githubUrl && (
                      <a href={sub.githubUrl} target="_blank" rel="noopener noreferrer"
                        className="p-1.5 rounded-lg text-white/25 hover:text-white/70 hover:bg-white/5 transition-all" title="Frontend Repo">
                        <GitBranch size={14} />
                      </a>
                    )}
                    {sub.backendGithubUrl && (
                      <a href={sub.backendGithubUrl} target="_blank" rel="noopener noreferrer"
                        className="p-1.5 rounded-lg text-white/25 hover:text-white/70 hover:bg-white/5 transition-all" title="Backend Repo">
                        <Code2 size={14} />
                      </a>
                    )}
                    {sub.uiUrl && (
                      <a href={sub.uiUrl} target="_blank" rel="noopener noreferrer"
                        className="p-1.5 rounded-lg text-white/25 hover:text-white/70 hover:bg-white/5 transition-all" title="UI">
                        <Globe size={14} />
                      </a>
                    )}
                    {sub.backendServerUrl && (
                      <a href={sub.backendServerUrl} target="_blank" rel="noopener noreferrer"
                        className="p-1.5 rounded-lg text-white/25 hover:text-white/70 hover:bg-white/5 transition-all" title="Backend Server">
                        <Server size={14} />
                      </a>
                    )}
                    <button onClick={() => { setEditSub(sub); setSubForm({ name: sub.name, description: sub.description, erpProviders: sub.erpProviders ?? [], responsibleAdminId: sub.responsibleAdminId ?? "", githubUrl: sub.githubUrl ?? "", backendGithubUrl: sub.backendGithubUrl ?? "", uiUrl: sub.uiUrl ?? "", backendServerUrl: sub.backendServerUrl ?? "" }); setSubErrors({}); setShowSubForm(true); }}
                      className="p-1.5 rounded-lg text-white/25 hover:text-white hover:bg-white/5 transition-all">
                      <Edit2 size={14} />
                    </button>
                    <button onClick={() => setConfirmDeleteSub(sub)}
                      className="p-1.5 rounded-lg text-white/25 hover:text-red-400 hover:bg-red-500/10 transition-all">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                {/* Nested projects */}
                {isExpanded && (
                  <div className="border-t border-white/[0.04] bg-[#050505]">
                    <div className="px-5 py-3 flex items-center justify-between">
                      <p className="text-white/30 text-xs font-medium uppercase tracking-wider">Projects</p>
                      <button
                        onClick={() => { setProjForm(EMPTY_FORM); setProjErrors({}); setEditProj(null); setShowProjForm(sub._id); }}
                        className="flex items-center gap-1.5 text-xs text-[#c8905a] hover:text-[#d4a070] transition-colors"
                      >
                        <Plus size={12} /> Add Project
                      </button>
                    </div>

                    {!subProjects_ ? (
                      <div className="px-5 pb-4">
                        <div className="h-8 rounded-lg bg-white/[0.03] animate-pulse" />
                      </div>
                    ) : subProjects_.length === 0 ? (
                      <div className="px-5 pb-4 text-center">
                        <p className="text-white/20 text-xs">No projects yet.</p>
                      </div>
                    ) : (
                      <div className="px-5 pb-4 space-y-2">
                        {subProjects_.map((proj) => (
                          <div key={proj._id} className="rounded-xl border border-white/[0.05] bg-white/[0.02] p-3.5">
                            <div className="flex items-start gap-3">
                              <Zap size={13} className={`mt-0.5 flex-shrink-0 ${meta.accent}`} />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <p className="text-white/90 text-sm font-medium">{proj.name}</p>
                                  {proj.responsibleAdminName && (
                                    <span className="flex items-center gap-1 text-white/25 text-xs">
                                      <User size={9} /> {proj.responsibleAdminName}
                                    </span>
                                  )}
                                </div>
                                <p className="text-white/35 text-xs mt-0.5 leading-relaxed">{proj.description}</p>
                                <div className="flex items-center gap-3 mt-2">
                                  {proj.githubUrl && (
                                    <a href={proj.githubUrl} target="_blank" rel="noopener noreferrer"
                                      className="flex items-center gap-1 text-white/30 hover:text-white/60 text-xs transition-colors">
                                      <GitBranch size={11} /> Frontend
                                    </a>
                                  )}
                                  {proj.backendGithubUrl && (
                                    <a href={proj.backendGithubUrl} target="_blank" rel="noopener noreferrer"
                                      className="flex items-center gap-1 text-white/30 hover:text-white/60 text-xs transition-colors">
                                      <Code2 size={11} /> Backend
                                    </a>
                                  )}
                                  {proj.uiUrl && (
                                    <a href={proj.uiUrl} target="_blank" rel="noopener noreferrer"
                                      className="flex items-center gap-1 text-white/30 hover:text-white/60 text-xs transition-colors">
                                      <Globe size={11} /> UI
                                    </a>
                                  )}
                                  {proj.backendServerUrl && (
                                    <a href={proj.backendServerUrl} target="_blank" rel="noopener noreferrer"
                                      className="flex items-center gap-1 text-white/30 hover:text-white/60 text-xs transition-colors">
                                      <Server size={11} /> Server
                                    </a>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center gap-1 flex-shrink-0">
                                <button onClick={() => { setEditProj(proj); setProjForm({ name: proj.name, description: proj.description, erpProviders: [], responsibleAdminId: proj.responsibleAdminId ?? "", githubUrl: proj.githubUrl ?? "", backendGithubUrl: proj.backendGithubUrl ?? "", uiUrl: proj.uiUrl ?? "", backendServerUrl: proj.backendServerUrl ?? "" }); setProjErrors({}); setShowProjForm(sub._id); }}
                                  className="p-1 rounded-lg text-white/20 hover:text-white hover:bg-white/5 transition-all">
                                  <Edit2 size={12} />
                                </button>
                                <button onClick={() => setConfirmDeleteProj(proj)}
                                  className="p-1 rounded-lg text-white/20 hover:text-red-400 hover:bg-red-500/10 transition-all">
                                  <Trash2 size={12} />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ── Sub-project Modal ─────────────────────────────────────────────────── */}
      {showSubForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => { setShowSubForm(false); setEditSub(null); }} />
          <div className="relative z-10 w-full max-w-md rounded-2xl border border-white/10 bg-[#111111] p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-white font-bold text-lg mb-5">
              {editSub ? "Edit Sub-Project" : `New Sub-Project · ${activeService}`}
            </h2>
            <div className="space-y-4">
              <FormField label="Name" required value={subForm.name}
                onChange={(e) => setSubForm((f) => ({ ...f, name: (e.target as HTMLInputElement).value }))}
                placeholder="My Sub-Project" error={subErrors.name} />
              <FormField label="Description" required textarea rows={3} value={subForm.description}
                onChange={(e) => setSubForm((f) => ({ ...f, description: (e.target as HTMLTextAreaElement).value }))}
                placeholder="What does this sub-project do?" error={subErrors.description} />
              {activeService === "solvo" && (
                <div className="flex flex-col gap-1.5">
                  <label className="text-white/60 text-xs font-medium">ERP Providers <span className="text-red-400">*</span></label>
                  <div className="flex flex-wrap gap-2">
                    {ERP_PROVIDERS.map((p) => {
                      const selected = subForm.erpProviders.includes(p.value);
                      return (
                        <button
                          key={p.value}
                          type="button"
                          onClick={() => setSubForm((f) => ({
                            ...f,
                            erpProviders: selected
                              ? f.erpProviders.filter((v) => v !== p.value)
                              : [...f.erpProviders, p.value],
                          }))}
                          className={`px-3 py-1 rounded-lg text-xs font-medium border transition-all ${selected ? "bg-[#c8905a]/20 text-[#c8a070] border-[#c8905a]/40" : "text-white/40 border-white/10 hover:text-white/70 hover:border-white/20"}`}
                        >
                          {p.label}
                        </button>
                      );
                    })}
                  </div>
                  {!!(subErrors as Record<string, unknown>).erpProviders && (
                    <p className="text-red-400 text-xs">Select at least one ERP provider</p>
                  )}
                </div>
              )}
              {admin?.role === "owner" && adminOptions.length > 0 && (
                <div className="flex flex-col gap-1.5">
                  <label className="text-white/60 text-xs font-medium">Responsible Admin</label>
                  <select
                    value={subForm.responsibleAdminId}
                    onChange={(e) => setSubForm((f) => ({ ...f, responsibleAdminId: e.target.value }))}
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#c8905a]/50 transition-colors"
                  >
                    <option value="">— None —</option>
                    {adminOptions.map((a) => (
                      <option key={a._id} value={a._id}>{a.name}</option>
                    ))}
                  </select>
                </div>
              )}
              <FormField label="Frontend Repo Link" value={subForm.githubUrl}
                onChange={(e) => setSubForm((f) => ({ ...f, githubUrl: (e.target as HTMLInputElement).value }))}
                placeholder="https://github.com/org/frontend-repo" />
              <FormField label="Backend Repo Link" value={subForm.backendGithubUrl}
                onChange={(e) => setSubForm((f) => ({ ...f, backendGithubUrl: (e.target as HTMLInputElement).value }))}
                placeholder="https://github.com/org/backend-repo" />
              <FormField label="UI Link" value={subForm.uiUrl}
                onChange={(e) => setSubForm((f) => ({ ...f, uiUrl: (e.target as HTMLInputElement).value }))}
                placeholder="https://app.autosa.net" />
              <FormField label="Backend Server Link" value={subForm.backendServerUrl}
                onChange={(e) => setSubForm((f) => ({ ...f, backendServerUrl: (e.target as HTMLInputElement).value }))}
                placeholder="https://api.autosa.net" />
            </div>
            <div className="flex gap-3 justify-end mt-6">
              <button onClick={() => { setShowSubForm(false); setEditSub(null); }}
                className="px-4 py-2 rounded-xl text-sm font-medium text-white/60 bg-white/5 hover:bg-white/10 transition-colors">
                Cancel
              </button>
              <button onClick={handleSaveSub} disabled={savingSub}
                className="px-4 py-2 rounded-xl text-sm font-semibold bg-[#c8905a] text-white hover:bg-[#b87d4a] disabled:opacity-50 transition-colors">
                {savingSub ? "Saving…" : editSub ? "Save Changes" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Project Modal ──────────────────────────────────────────────────────── */}
      {showProjForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => { setShowProjForm(null); setEditProj(null); }} />
          <div className="relative z-10 w-full max-w-md rounded-2xl border border-white/10 bg-[#111111] p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-white font-bold text-lg mb-5">
              {editProj ? "Edit Project" : "New Project"}
            </h2>
            <div className="space-y-4">
              <FormField label="Project Name" required value={projForm.name}
                onChange={(e) => setProjForm((f) => ({ ...f, name: (e.target as HTMLInputElement).value }))}
                placeholder="Project Name" error={projErrors.name} />
              <FormField label="Description" required textarea rows={3} value={projForm.description}
                onChange={(e) => setProjForm((f) => ({ ...f, description: (e.target as HTMLTextAreaElement).value }))}
                placeholder="Describe the project" error={projErrors.description} />
              {admin?.role === "owner" && adminOptions.length > 0 && (
                <div className="flex flex-col gap-1.5">
                  <label className="text-white/60 text-xs font-medium">Admin Responsible</label>
                  <select
                    value={projForm.responsibleAdminId}
                    onChange={(e) => setProjForm((f) => ({ ...f, responsibleAdminId: e.target.value }))}
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#c8905a]/50 transition-colors"
                  >
                    <option value="">— None —</option>
                    {adminOptions.map((a) => (
                      <option key={a._id} value={a._id}>{a.name}</option>
                    ))}
                  </select>
                </div>
              )}
              <FormField label="Frontend Repo Link" value={projForm.githubUrl}
                onChange={(e) => setProjForm((f) => ({ ...f, githubUrl: (e.target as HTMLInputElement).value }))}
                placeholder="https://github.com/org/frontend-repo" />
              <FormField label="Backend Repo Link" value={projForm.backendGithubUrl}
                onChange={(e) => setProjForm((f) => ({ ...f, backendGithubUrl: (e.target as HTMLInputElement).value }))}
                placeholder="https://github.com/org/backend-repo" />
              <FormField label="UI Link" value={projForm.uiUrl}
                onChange={(e) => setProjForm((f) => ({ ...f, uiUrl: (e.target as HTMLInputElement).value }))}
                placeholder="https://app.autosa.net" />
              <FormField label="Backend Server Link" value={projForm.backendServerUrl}
                onChange={(e) => setProjForm((f) => ({ ...f, backendServerUrl: (e.target as HTMLInputElement).value }))}
                placeholder="https://api.autosa.net" />
            </div>
            <div className="flex gap-3 justify-end mt-6">
              <button onClick={() => { setShowProjForm(null); setEditProj(null); }}
                className="px-4 py-2 rounded-xl text-sm font-medium text-white/60 bg-white/5 hover:bg-white/10 transition-colors">
                Cancel
              </button>
              <button onClick={() => handleSaveProj(showProjForm)} disabled={savingProj}
                className="px-4 py-2 rounded-xl text-sm font-semibold bg-[#c8905a] text-white hover:bg-[#b87d4a] disabled:opacity-50 transition-colors">
                {savingProj ? "Saving…" : editProj ? "Save Changes" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Delete Sub */}
      {confirmDeleteSub && (
        <ConfirmModal
          title="Delete Sub-Project"
          message={`This will permanently delete "${confirmDeleteSub.name}" and all its nested projects. This cannot be undone.`}
          danger
          confirmLabel="Delete Permanently"
          onConfirm={() => handleDeleteSub(confirmDeleteSub)}
          onCancel={() => setConfirmDeleteSub(null)}
        />
      )}

      {/* Confirm Delete Project */}
      {confirmDeleteProj && (
        <ConfirmModal
          title="Delete Project"
          message={`This will permanently delete "${confirmDeleteProj.name}". This cannot be undone.`}
          danger
          confirmLabel="Delete Permanently"
          onConfirm={() => handleDeleteProj(confirmDeleteProj)}
          onCancel={() => setConfirmDeleteProj(null)}
        />
      )}
    </div>
  );
}

export default function ServicesPage() {
  return (
    <Suspense fallback={<div className="p-8 text-white/30 text-sm">Loading…</div>}>
      <ServicesContent />
    </Suspense>
  );
}
