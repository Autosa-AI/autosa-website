"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Layers,
  Users,
  ScrollText,
  LogOut,
  Zap,
  X,
  Crown,
} from "lucide-react";
import { useAdmin } from "./AdminContext";

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  ownerOnly?: boolean;
}

const navItems: NavItem[] = [
  { href: "/admin/dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
  { href: "/admin/services", label: "Services", icon: <Layers size={18} /> },
  { href: "/admin/admins", label: "Admins", icon: <Users size={18} />, ownerOnly: true },
  { href: "/admin/audit", label: "Audit Log", icon: <ScrollText size={18} /> },
];

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const { admin, loading, logout } = useAdmin();

  const sidebarContent = (
    <aside className="h-full w-64 bg-[#0a0a0a] border-r border-white/[0.06] flex flex-col">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-white/[0.06] flex items-center justify-between">
        <div className="flex flex-col">
          <p className="text-white font-black text-base tracking-[0.1em] uppercase leading-none">AUTOSA</p>
          <div className="flex items-center gap-2 mt-1">
            <div className="h-px w-4 bg-[#F97316]" />
            <p className="text-[#F97316] text-[9px] font-bold tracking-[0.25em] uppercase">Admin Panel</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="lg:hidden text-white/40 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/[0.06]"
          aria-label="Close sidebar"
        >
          <X size={18} />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          if (item.ownerOnly && (loading || admin?.role !== "owner")) return null;
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          const label =
            item.href === "/admin/audit" && admin?.role !== "owner" ? "My Activity" : item.label;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                isActive
                  ? "bg-orange-500/15 text-orange-300 border border-orange-500/20"
                  : "text-white/50 hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              <span className={isActive ? "text-orange-400" : "text-white/30"}>{item.icon}</span>
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 pb-4 border-t border-white/[0.06] pt-4">
        {admin && (
          <div className="px-3 py-3 rounded-xl bg-white/[0.02] border border-white/[0.06] mb-2">
            <div className="flex items-center gap-2 mb-1">
              <p className="text-white text-sm font-medium truncate flex-1">{admin.name}</p>
              {admin.role === "owner" && <Crown size={12} className="text-orange-400 flex-shrink-0" />}
            </div>
            <div className="flex items-center gap-1.5">
              <span
                className={`inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                  admin.role === "owner"
                    ? "bg-orange-500/20 text-orange-400"
                    : "bg-white/10 text-white/40"
                }`}
              >
                {admin.role}
              </span>
              <span className="text-white/25 text-xs truncate">{admin.email}</span>
            </div>
          </div>
        )}
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-all duration-150"
        >
          <LogOut size={16} />
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
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
          <div className="relative w-64 h-full flex-shrink-0">{sidebarContent}</div>
        </div>
      )}
    </>
  );
}
