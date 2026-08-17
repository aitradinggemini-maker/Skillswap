"use client";

import * as React from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Navigation, NAV_ITEMS } from "@/components/ui/Navigation";
import { LoadingState } from "@/components/ui/LoadingState";
import { LogOut, Coins } from "lucide-react";

export interface UserSession {
  id: string;
  email: string;
  fullName: string;
  role: string;
  balance: number;
}

export const AppShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = React.useState<UserSession | null>(null);
  const [loading, setLoading] = React.useState(true);

  const fetchUser = React.useCallback(async () => {
    try {
      const res = await fetch("/api/auth/me");
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchUser();
  }, [fetchUser, pathname]);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setUser(null);
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  if (loading) {
    return <LoadingState fullPage message="Loading Skillswap..." />;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      {/* Top Header Navigation */}
      <Navigation
        user={
          user
            ? {
                name: user.fullName || user.email,
                email: user.email,
                balance: user.balance,
              }
            : null
        }
        onLogout={handleLogout}
      />

      {/* Main Layout Area with Desktop Sidebar & Content */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex gap-8">
        {/* Sidebar for Desktop */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs sticky top-24 space-y-6">
            <div>
              <p className="px-3 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Menu
              </p>
              <div className="space-y-1">
                {NAV_ITEMS.map((item) => {
                  const Icon = item.icon;
                  const isActive =
                    pathname === item.href || pathname.startsWith(item.href + "/");
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-indigo-50 text-indigo-600 font-semibold"
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

            {user && (
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <div className="bg-amber-50/80 border border-amber-200/80 rounded-lg p-3">
                  <div className="flex items-center justify-between text-xs font-semibold text-amber-900">
                    <span>Balance</span>
                    <Coins className="w-4 h-4 text-amber-500" />
                  </div>
                  <p className="text-xl font-bold text-amber-950 mt-1">
                    {user.balance} <span className="text-xs font-medium text-amber-800">Credits</span>
                  </p>
                </div>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 rounded-lg border border-transparent transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        </aside>

        {/* Main Content Body */}
        <main className="flex-1 min-w-0">{children}</main>
      </div>

      {/* Simple Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Skillswap Platform — Peer Knowledge Exchange for Students</p>
        </div>
      </footer>
    </div>
  );
};
