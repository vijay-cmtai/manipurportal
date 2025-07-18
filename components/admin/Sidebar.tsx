"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  LayoutDashboard,
  Users,
  Video,
  Clapperboard,
  DollarSign,
  FileText,
  BarChart2,
  Shield,
  Bot,
  X,
  Sun,
  Moon,
  LogOut,
} from "lucide-react";
// Button import ki zaroorat nahi hai, isliye hata diya gaya hai.

const sidebarNavItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/assignments", label: "Daily Assignments", icon: Video },
  { href: "/admin/ai-videos", label: "AI Videos", icon: Clapperboard },
  { href: "/admin/income", label: "Income & Payouts", icon: DollarSign },
  { href: "/admin/content", label: "Content Mgmt", icon: FileText },
  { href: "/admin/reports", label: "Reports", icon: BarChart2 },
  { href: "/admin/security", label: "Security", icon: Shield },
];

interface SidebarProps {
  isMobileOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isMobileOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const isActive = (href: string) => {
    if (href === "/admin/dashboard") return pathname === href;
    return pathname.startsWith(href);
  };

  const handleLogout = () => {
    console.log("Logging out...");
    router.push("/");
  };

  const sidebarContent = (
    <div className="flex h-full flex-col bg-background">
      <div className="flex h-14 shrink-0 items-center justify-between border-b px-4 lg:px-6">
        <Link
          href="/admin/dashboard"
          className="flex items-center gap-2 font-semibold text-foreground"
        >
          <Bot className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold">Admin Panel</span>
        </Link>
        {/* --- YAHAN BADLAV KIYA GAYA HAI --- */}
        {/* Custom Button component ko ek standard HTML button se badal diya gaya hai */}
        <button
          onClick={onClose}
          className="rounded-lg p-2 hover:bg-muted md:hidden"
        >
          <X className="h-5 w-5" />
          <span className="sr-only">Close sidebar</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <nav className="flex h-full flex-col p-2 text-sm font-medium lg:p-4">
          <div className="space-y-1">
            {sidebarNavItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all ${
                    active
                      ? "font-semibold text-primary bg-primary/10"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="mt-auto space-y-2 pt-4 pb-2">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-muted-foreground transition-all hover:bg-muted hover:text-foreground"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
              <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-destructive transition-all hover:bg-destructive/10 hover:text-destructive"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </nav>
      </div>
    </div>
  );

  return (
    <>
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 md:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 border-r bg-background transition-transform duration-300 ease-in-out md:static md:translate-x-0 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
