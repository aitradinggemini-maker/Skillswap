"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  HelpCircle,
  Sparkles,
  FolderOpen,
  MessageSquare,
  User,
  LogOut,
  Coins,
  Menu,
  X,
} from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Get Help", href: "/get-help", icon: HelpCircle },
  { label: "Offer Skills", href: "/offer-skills", icon: Sparkles },
  { label: "Resources", href: "/resources", icon: FolderOpen },
  { label: "Messages", href: "/messages", icon: MessageSquare },
  { label: "Profile", href: "/profile", icon: User },
];

export interface NavigationProps {
  user?: {
    name: string;
    email: string;
    balance?: number;
  } | null;
  onLogout?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ user, onLogout }) => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Brand Logo & Desktop Nav */}
          <div className="flex items-center gap-8">
            <Link href="/dashboard" className="flex items-center gap-2 font-bold text-indigo-600 text-xl tracking-tight">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-black text-lg">
                S
              </div>
              <span>Skillswap</span>
            </Link>

            <div className="hidden md:flex items-center space-x-1">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-indigo-50 text-indigo-600"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* User Credits & Logout */}
          <div className="hidden md:flex items-center gap-4">
            {user && (
              <>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold">
                  <Coins className="w-4 h-4 text-amber-500" />
                  <span>{user.balance ?? 100} SkillCredits</span>
                </div>

                <div className="text-right">
                  <p className="text-xs font-semibold text-slate-800 leading-tight">{user.name}</p>
                  <p className="text-[10px] text-slate-500 leading-tight">{user.email}</p>
                </div>

                {onLogout && (
                  <button
                    onClick={onLogout}
                    title="Logout"
                    className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                )}
              </>
            )}
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium ${
                  isActive
                    ? "bg-indigo-50 text-indigo-600 font-semibold"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}

          {user && (
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Coins className="w-4 h-4 text-amber-500" />
                <span className="text-xs font-semibold text-amber-800">
                  {user.balance ?? 100} SkillCredits
                </span>
              </div>
              {onLogout && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onLogout();
                  }}
                  className="flex items-center gap-1.5 text-xs text-rose-600 font-medium py-1 px-2 rounded-lg hover:bg-rose-50"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </nav>
  );
};
