import { Footer } from "@/components/landing/footer";
import { Header } from "@/components/landing/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
// --- YAHAN BADLAV KIYA GAYA HAI ---
import {
  Users, // 'Admins' ko 'Users' se badla gaya hai
  AlertCircle,
  BookOpen,
  CheckCircle,
  Clock,
  FileText,
  LifeBuoy,
  Mail,
  MessageCircle,
  Phone,
  Search,
  Send,
  Video,
} from "lucide-react";

const supportOptions = [
  // ... (baaki data waisa hi rahega)
];

const helpResources = [
  {
    icon: BookOpen,
    title: "Admin Guide",
    description: "Complete guide to using UEIEP platform",
    items: ["Getting Started", "Daily Assignments", "AI Videos", "Payments"],
  },
  {
    icon: Video,
    title: "Video Tutorials",
    description: "Step-by-step video instructions",
    items: [
      "Platform Overview",
      "Social Media Setup",
      "Referral System",
      "Troubleshooting",
    ],
  },
  {
    icon: FileText,
    title: "Documentation",
    description: "Technical documentation and APIs",
    items: ["API Reference", "Integration Guide", "Best Practices", "Updates"],
  },
  {
    // --- YAHAN BADLAV KIYA GAYA HAI ---
    icon: Users, // 'Admins' ko 'Users' se badla gaya hai
    title: "Community Forum",
    description: "Connect with other UEIEP Admins",
    items: ["Success Stories", "Tips & Tricks", "Q&A", "Announcements"],
  },
];

const commonIssues = [
  // ... (baaki data waisa hi rahega)
];

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F6FA] to-white">
      <Header />

      <main>{/* ... (Baaki saara JSX code waisa hi rahega) ... */}</main>

      <Footer />
    </div>
  );
}
