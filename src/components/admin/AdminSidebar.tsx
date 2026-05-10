"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard,
  Layers,
  Users,
  ScrollText,
  LogOut,
  X,
  Crown,
  ChevronRight,
} from "lucide-react";
import { useAdmin } from "./AdminContext";

// Muted warm amber — easy on the eyes
const A = "#c8905a";      // primary accent
const AL = "rgba(200,144,90,";  // accent with opacity helper

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  ownerOnly?: boolean;
}

const navItems: NavItem[] = [
  { href: "/admin/dashboard", label: "Dashboard", icon: <LayoutDashboard size={17} /> },
  { href: "/admin/services",  label: "Services",  icon: <Layers size={17} /> },
  { href: "/admin/admins",    label: "Admins",    icon: <Users size={17} />,      ownerOnly: true },
  { href: "/admin/audit",     label: "Audit Log", icon: <ScrollText size={17} /> },
];

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const { admin, loading, logout } = useAdmin();

  const sidebarContent = (
    <aside className="h-full w-64 flex flex-col relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0d0d0d 0%, #080808 100%)", borderRight: "1px solid rgba(255,255,255,0.05)" }}>

      {/* Subtle ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${AL}0.06) 0%, transparent 70%)`, filter: "blur(24px)" }} />

      {/* ── Logo Section ── */}
      <div className="relative px-5 py-6 flex items-center justify-between"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="flex items-center gap-3">
          {/* Animated logo */}
          <div className="relative flex-shrink-0">
            <div className="absolute inset-0 rounded-xl pointer-events-none"
              style={{ background: `radial-gradient(circle, ${AL}0.25) 0%, transparent 70%)`, animation: "logoGlow 3s ease-in-out infinite" }} />
            <div className="relative w-9 h-9 rounded-xl overflow-hidden flex items-center justify-center"
              style={{ background: `${AL}0.08)`, border: `1px solid ${AL}0.18)` }}>
              <Image src="/logo.png" alt="Autosa" width={32} height={32} className="object-contain"
                style={{ filter: "brightness(1.05) saturate(0.9)" }} />
            </div>
          </div>
          {/* Brand text */}
          <div className="flex flex-col">
            <span className="autosa-wordmark text-white text-sm leading-none" style={{ letterSpacing: "0.12em" }}>AUTOSA</span>
            <div className="flex items-center gap-1.5 mt-1">
              <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${A}, transparent)` }} />
              <span style={{ fontSize: "8px", letterSpacing: "0.22em", color: A, fontWeight: 700, textTransform: "uppercase" }}>Admin Panel</span>
            </div>
          </div>
        </div>

        <button onClick={onClose} className="lg:hidden rounded-lg p-1.5 transition-all"
          style={{ color: "rgba(255,255,255,0.3)" }} aria-label="Close sidebar">
          <X size={17} />
        </button>
      </div>

      {/* ── Nav ── */}
      <nav className="flex-1 px-2.5 py-4 space-y-0.5 overflow-y-auto">
        <p style={{ fontSize: "9px", letterSpacing: "0.2em", color: "rgba(255,255,255,0.18)", fontWeight: 700, textTransform: "uppercase", padding: "0 10px", marginBottom: "8px" }}>
          Navigation
        </p>
        {navItems.map((item) => {
          if (item.ownerOnly && (loading || admin?.role !== "owner")) return null;
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          const label = item.href === "/admin/audit" && admin?.role !== "owner" ? "My Activity" : item.label;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative overflow-hidden"
              style={isActive ? {
                background: `linear-gradient(135deg, ${AL}0.12) 0%, ${AL}0.04) 100%)`,
                border: `1px solid ${AL}0.16)`,
                color: "#d4a47a",
              } : {
                color: "rgba(255,255,255,0.38)",
                border: "1px solid transparent",
              }}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-r-full"
                  style={{ background: A }} />
              )}
              <span
                style={{ color: isActive ? A : "rgba(255,255,255,0.22)", transition: "color 0.2s" }}
                className="group-hover:!opacity-70"
              >
                {item.icon}
              </span>
              <span className="flex-1 group-hover:text-white/80 transition-colors duration-200">{label}</span>
              {isActive && <ChevronRight size={13} style={{ color: `${AL}0.45)` }} />}
            </Link>
          );
        })}
      </nav>

      {/* ── Footer ── */}
      <div className="px-2.5 pb-4" style={{ borderTop: "1px solid rgba(255,255,255,0.04)", paddingTop: "16px" }}>
        {admin && (
          <div className="px-3 py-3 rounded-xl mb-2"
            style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
            <div className="flex items-center gap-2.5 mb-1.5">
              {/* Avatar initial */}
              <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold"
                style={{ background: `linear-gradient(135deg, ${AL}0.22), ${AL}0.08))`, border: `1px solid ${AL}0.18)`, color: A }}>
                {admin.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="text-white text-xs font-semibold truncate">{admin.name}</p>
                  {admin.role === "owner" && <Crown size={10} style={{ color: A, flexShrink: 0 }} />}
                </div>
                <p className="truncate" style={{ color: "rgba(255,255,255,0.25)", fontSize: "10px" }}>{admin.email}</p>
              </div>
            </div>
            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider"
              style={admin.role === "owner"
                ? { background: `${AL}0.12)`, color: A, border: `1px solid ${AL}0.18)` }
                : { background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.3)" }}>
              {admin.role}
            </span>
          </div>
        )}
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
          style={{ color: "rgba(255,255,255,0.28)" }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.color = "#f87171";
            (e.currentTarget as HTMLElement).style.background = "rgba(239,68,68,0.06)";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.28)";
            (e.currentTarget as HTMLElement).style.background = "transparent";
          }}
        >
          <LogOut size={15} />
          Sign Out
        </button>
      </div>
    </aside>
  );

  return (
    <>
      <div className="hidden lg:block fixed left-0 top-0 h-screen w-64 z-40">{sidebarContent}</div>
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
          <div className="relative w-64 h-full flex-shrink-0">{sidebarContent}</div>
        </div>
      )}
    </>
  );
}
