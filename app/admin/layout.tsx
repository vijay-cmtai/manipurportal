"use client";

import { useState } from "react";
import { Sidebar } from "@/components/admin/Sidebar";
import { Header } from "@/components/admin/Header";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[256px_1fr]">
      <Sidebar
        isMobileOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
      <div className="flex flex-col">
        <Header onMenuClick={() => setIsMobileMenuOpen(true)} />
        {/* 'flex-1' isey bachi hui poori height lene ke liye force karega */}
        <main className="flex-1 overflow-y-auto bg-muted/40 p-4 dark:bg-slate-950 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
