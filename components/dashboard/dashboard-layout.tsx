"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  User,
  Users,
  Bell,
  CheckSquare,
  DollarSign,
  FileText,
  HelpCircle,
  Home,
  LogOut,
  Menu,
  Settings,
  Video,
  X,
  Sun,
  Moon,
} from "lucide-react";

// Navigation links for the sidebar
const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Daily Assignments", href: "/assignments", icon: CheckSquare },
  { name: "AI Videos", href: "/ai-videos", icon: Video },
  { name: "Downline", href: "/downline", icon: Users },
  {
    name: "Notification Center",
    href: "/dashboard/notification-center",
    icon: Bell,
  },
  {
    name: "Income History",
    href: "/dashboard/income-history",
    icon: DollarSign,
  },
  {
    name: "Compliance History",
    href: "/dashboard/compliance-history",
    icon: FileText,
  },
  { name: "Profile", href: "/profile", icon: User },
  { name: "Settings", href: "/settings", icon: Settings },
  { name: "Support", href: "/dashboard/support", icon: HelpCircle },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const pageTitle =
    navigation.find((item) => item.href === pathname)?.name || "Dashboard";

  // Reusable component for navigation links
  const NavLinks = ({ isMobile = false }) => (
    <>
      {navigation.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
              isActive
                ? "bg-primary/10 text-primary dark:bg-teal-500/10 dark:text-teal-300 font-semibold"
                : "text-gray-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800/50 hover:text-gray-900 dark:hover:text-slate-200"
            }`}
            onClick={() => isMobile && setSidebarOpen(false)}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.name}</span>
          </Link>
        );
      })}
    </>
  );

  // Reusable component for the logo
  const Logo = () => (
    <Link href="/dashboard" className="flex items-center gap-2">
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        className="text-primary dark:text-teal-400"
      >
        <path
          fill="currentColor"
          d="M12 2L2 7l10 5l10-5l-10-5zm0 11.5L2 8.5l10 5l10-5l-10 5zM2 17l10 5l10-5l-10-5l-10 5z"
        />
      </svg>
      <span className="font-bold text-xl text-gray-900 dark:text-slate-100">
        UEIEP
      </span>
    </Link>
  );

  // Reusable component for the logout button
  const LogoutButton = () => (
    <Button
      variant="ghost"
      className="w-full justify-start text-red-600 dark:text-red-400/80 hover:text-red-700 dark:hover:text-red-400 hover:bg-red-100 dark:hover:bg-red-500/10"
      asChild
    >
      <Link href="/">
        <LogOut className="h-5 w-5 mr-3" />
        Logout
      </Link>
    </Button>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-slate-200">
      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? "block" : "hidden"}`}
      >
        <div
          className="fixed inset-0 bg-black/60"
          onClick={() => setSidebarOpen(false)}
        />
        <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-white dark:bg-slate-900 shadow-lg">
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-slate-800">
            <Logo />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            <NavLinks isMobile={true} />
          </nav>
          <div className="p-4 border-t border-gray-200 dark:border-slate-800 space-y-1">
            <LogoutButton />
          </div>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-800">
          <div className="flex items-center h-20 px-6 border-b border-gray-200 dark:border-slate-800">
            <Logo />
          </div>
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            <NavLinks />
          </nav>
          <div className="p-4 border-t border-gray-200 dark:border-slate-800 space-y-1">
            <LogoutButton />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm border-b border-gray-200 dark:border-slate-800 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-5 w-5 text-gray-700 dark:text-slate-300" />
              </Button>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-slate-100">
                {pageTitle}
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="relative rounded-full text-gray-600 dark:text-slate-300"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-2 right-2 h-2 w-2 bg-sky-500 rounded-full animate-pulse"></span>
              </Button>

              {/* ***** THEME TOGGLE BUTTON ADDED HERE ***** */}
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-gray-600 dark:text-slate-300"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-500 to-sky-500 flex items-center justify-center">
                  <span className="text-white font-medium text-sm">JD</span>
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-slate-300 hidden sm:block">
                  John Doe
                </span>
              </div>
            </div>
          </div>
        </header>

        <main className="p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
