"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { BookOpen, CheckCircle, Clock, FileText, LifeBuoy, Mail, MessageCircle, Phone, Send, Video } from "lucide-react"
import type React from "react"
import { useState } from "react"
import { toast } from "sonner"

const supportOptions = [
  { icon: MessageCircle, title: "Live Chat", description: "Get instant help from our support team.", availability: "24/7 Available", responseTime: "< 2 minutes", action: "Start Chat", color: "green" },
  { icon: Mail, title: "Email Support", description: "Send us detailed questions or issues.", availability: "24/7 Available", responseTime: "< 4 hours", action: "Send Email", color: "sky" },
  { icon: Phone, title: "Phone Support", description: "Speak directly with our experts.", availability: "9 AM - 6 PM IST", responseTime: "Immediate", action: "Call Now", color: "purple" },
];

const helpResources = [
  { icon: BookOpen, title: "Admin Guide", description: "Complete guide to using the UEIEP platform.", link: "/help" },
  { icon: Video, title: "Video Tutorials", description: "Step-by-step video instructions.", link: "/help" },
  { icon: FileText, title: "FAQs", description: "Answers to frequently asked questions.", link: "/faq" },
];

export function SupportContent() {
  const [formData, setFormData] = useState({ subject: "", category: "", message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmitTicket = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    toast.success("Your support ticket has been submitted!", {
        description: "Our team will get back to you shortly."
    })
    setIsSubmitting(false)
    setFormData({ subject: "", category: "", message: "" })
  }

  const getSupportOptionClasses = (color: string) => {
    switch (color) {
      case "green": return "bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400 border-green-200 dark:border-green-500/20";
      case "sky": return "bg-sky-100 dark:bg-sky-500/10 text-sky-700 dark:text-sky-400 border-sky-200 dark:border-sky-500/20";
      case "purple": return "bg-purple-100 dark:bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-500/20";
      default: return "";
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-slate-100">Support & Help Center</h1>
        <p className="text-gray-600 dark:text-slate-400 text-lg">Get assistance, find answers, and resolve your queries quickly.</p>
      </div>

      <Card className="bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800">
        <CardHeader><CardTitle className="flex items-center gap-2 text-gray-900 dark:text-slate-100"><LifeBuoy /> Get Direct Support</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {supportOptions.map((option, index) => {
              const colorClasses = getSupportOptionClasses(option.color);
              return (
              <Card key={index} className="bg-gray-50 dark:bg-slate-800/50 border-gray-200 dark:border-slate-700 text-center flex flex-col">
                <CardContent className="p-6 flex-1 flex flex-col">
                  <div className={`w-16 h-16 ${colorClasses} rounded-full flex items-center justify-center mx-auto mb-4`}><option.icon className="h-8 w-8" /></div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-slate-200 mb-2">{option.title}</h3>
                  <p className="text-gray-600 dark:text-slate-400 text-sm mb-4 flex-1">{option.description}</p>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-center gap-2 text-xs text-green-600 dark:text-green-400"><Clock className="h-3 w-3" /><span>{option.availability}</span></div>
                    <div className="flex items-center justify-center gap-2 text-xs text-sky-600 dark:text-sky-400"><CheckCircle className="h-3 w-3" /><span>Response: {option.responseTime}</span></div>
                  </div>
                  <Button className="w-full">{option.action}</Button>
                </CardContent>
              </Card>
            )})}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <Card className="lg:col-span-3 bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800">
            <CardHeader><CardTitle className="flex items-center gap-2 text-gray-900 dark:text-slate-100"><Send /> Submit a Support Ticket</CardTitle><CardDescription className="text-gray-600 dark:text-slate-400">Describe your issue and our team will get back to you.</CardDescription></CardHeader>
            <CardContent>
            <form onSubmit={handleSubmitTicket} className="space-y-4">
                <div className="space-y-2"><Label htmlFor="ticketSubject">Subject *</Label><Input id="ticketSubject" placeholder="e.g., Payment not received" value={formData.subject} onChange={(e) => setFormData(p => ({ ...p, subject: e.target.value }))} required /></div>
                <div className="space-y-2"><Label htmlFor="ticketCategory">Category *</Label><Select value={formData.category} onValueChange={(value) => setFormData(p => ({ ...p, category: value }))} required><SelectTrigger id="ticketCategory"><SelectValue placeholder="Select a category" /></SelectTrigger><SelectContent><SelectItem value="payment">Payment</SelectItem><SelectItem value="assignment">Assignment</SelectItem><SelectItem value="ai-video">AI Video</SelectItem><SelectItem value="referral">Referral</SelectItem><SelectItem value="account">Account</SelectItem><SelectItem value="technical">Technical</SelectItem><SelectItem value="other">Other</SelectItem></SelectContent></Select></div>
                <div className="space-y-2"><Label htmlFor="ticketMessage">Message *</Label><Textarea id="ticketMessage" placeholder="Provide a detailed description of your issue..." value={formData.message} onChange={(e) => setFormData(p => ({ ...p, message: e.target.value }))} className="min-h-[120px]" required/></div>
                <Button type="submit" className="w-full" disabled={isSubmitting}>{isSubmitting ? <><div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>Submitting...</> : <><Send className="mr-2 h-4 w-4" />Submit Ticket</>}</Button>
            </form>
            </CardContent>
        </Card>

        <Card className="lg:col-span-2 bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800">
            <CardHeader><CardTitle className="flex items-center gap-2 text-gray-900 dark:text-slate-100"><BookOpen/> Self-Help Resources</CardTitle><CardDescription className="text-gray-600 dark:text-slate-400">Find quick answers and guides to common questions.</CardDescription></CardHeader>
            <CardContent className="space-y-3">
            {helpResources.map((resource, index) => (
                <a key={index} href={resource.link} className="block p-4 rounded-lg bg-gray-50 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700 hover:border-gray-300 dark:hover:border-slate-600 transition-colors">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-gray-100 dark:bg-slate-700/50 rounded-md"><resource.icon className="h-6 w-6 text-primary dark:text-teal-400" /></div>
                        <div><h3 className="font-semibold text-gray-800 dark:text-slate-200">{resource.title}</h3><p className="text-sm text-gray-600 dark:text-slate-400">{resource.description}</p></div>
                    </div>
                </a>
            ))}
            </CardContent>
        </Card>
      </div>
    </div>
  )
} 