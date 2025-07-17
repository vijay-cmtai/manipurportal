"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";

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
  const { theme, setTheme } = useTheme();

  const isActive = (href: string) => {
    if (href === "/admin/dashboard") return pathname === href;
    return pathname.startsWith(href);
  };

  const sidebarContent = (
    <div className="flex h-full flex-col bg-background">
      <div className="flex h-14 items-center border-b px-4 lg:px-6">
        <Link
          href="/admin/dashboard"
          className="flex items-center gap-2 font-semibold text-foreground" // Removed hard-coded color
        >
          <Bot className="h-6 w-6 text-primary" /> {/* Using primary color */}
          <span className="text-lg font-bold">Admin Panel</span>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <nav className="space-y-1 p-2 text-sm font-medium lg:p-4">
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
        </nav>
      </div>

      <div className="mt-auto border-t p-4">
        <Button
          variant="outline"
          className="w-full justify-start"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? (
            <Sun className="mr-2 h-4 w-4" />
          ) : (
            <Moon className="mr-2 h-4 w-4" />
          )}
          <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
        </Button>
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
        className={`fixed inset-y-0 left-0 z-40 w-64 border-r transition-transform duration-300 ease-in-out md:static md:translate-x-0 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
