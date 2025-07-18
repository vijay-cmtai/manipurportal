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
    // --- BADLAV 1: Layout ko poori screen ki height di aur overflow ko roka ---
    // 'min-h-screen' ko 'h-screen' kiya aur 'overflow-hidden' add kiya.
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <Sidebar
        isMobileOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      {/* --- BADLAV 2: Main content wrapper ko flex-col banaya --- */}
      <div className="flex flex-1 flex-col">
        {/* Header shrink nahi hoga */}
        <Header onMenuClick={() => setIsMobileMenuOpen(true)} />

        {/* --- BADLAV 3: Sirf <main> element ko scrollable banaya --- */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
