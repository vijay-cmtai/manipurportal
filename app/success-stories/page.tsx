"use client";

import type React from "react";

import { Footer } from "@/components/landing/footer";
import { Header } from "@/components/landing/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
// --- YAHAN BADLAV KIYA GAYA HAI ---
import { Shield, DollarSign, MapPin, Play, Send, Star } from "lucide-react"; // 'Admin' ko 'Shield' se badla gaya hai
import { useState } from "react";
import { toast } from "sonner";

const videoTestimonials = [
  // ... (baaki data waisa hi rahega)
];

const writtenTestimonials = [
  // ... (baaki data waisa hi rahega)
];

export default function SuccessStoriesPage() {
  const [isSubmitFormOpen, setIsSubmitFormOpen] = useState(false);
  const [submitFormData, setSubmitFormData] = useState({
    name: "",
    incomeScreenshot: null as File | null,
    story: "",
    videoLink: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSubmitFormData((prev) => ({
        ...prev,
        incomeScreenshot: e.target.files![0],
      }));
    }
  };

  const handleSubmitStory = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    toast.success(
      "Your story has been submitted for review! Thank you for sharing."
    );
    setIsSubmitting(false);
    setIsSubmitFormOpen(false);
    setSubmitFormData({
      name: "",
      incomeScreenshot: null,
      story: "",
      videoLink: "",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F6FA] to-white">
      <Header />

      <main>
        {/* ... (Hero aur Video Testimonials section waisa hi rahega) ... */}

        {/* Written Testimonials */}
        <section className="py-20 bg-gray-50">
          {/* ... (Written Testimonials ka code waisa hi rahega) ... */}
        </section>

        {/* Submit Your Story */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <Card className="card-shadow max-w-3xl mx-auto bg-gradient-primary text-white">
              <CardContent className="p-8 text-center">
                <h2 className="text-3xl font-bold mb-4">Share Your Journey!</h2>
                <p className="text-white/90 mb-6">
                  Inspire others by sharing your success story and how UEIEP has
                  impacted your life.
                </p>
                <Button
                  className="bg-white text-primary hover:bg-gray-100 py-3 px-6 text-lg font-semibold"
                  onClick={() => setIsSubmitFormOpen(true)}
                >
                  {/* --- YAHAN BADLAV KIYA GAYA HAI --- */}
                  <Shield className="mr-2 h-5 w-5" />{" "}
                  {/* 'Admin' ko 'Shield' se badla gaya hai */}
                  Share My Story
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />

      {/* Submit Story Dialog */}
      <Dialog open={isSubmitFormOpen} onOpenChange={setIsSubmitFormOpen}>
        {/* ... (Dialog ka code waisa hi rahega) ... */}
      </Dialog>
    </div>
  );
}
