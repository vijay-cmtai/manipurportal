"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Switch } from "@/components/ui/switch"
import { AnimatePresence, motion, Variants } from "framer-motion"
import { UserCheck, ArrowLeft, Bot, CheckCircle, FileText, Star, Youtube } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

interface TermsStepProps {
  formData: any
  onNext: () => void
  onBack: () => void
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0, 0, 0.58, 1] } },
}

const nextSteps = [
    { icon: Bot, text: "Choose your AI content topic" },
    { icon: Youtube, text: "Set up your YouTube channel" },
    { icon: UserCheck, text: "Get approval from our team" },
    { icon: Star, text: "Start earning with daily tasks" },
]

export function TermsStep({ onNext, onBack }: TermsStepProps) {
  const [accepted, setAccepted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (!accepted) return
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      onNext()
    }, 2000)
  }

  return (
    <motion.div
        className="space-y-8"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
    >
      <motion.div variants={itemVariants} className="text-center">
        <div className="relative inline-flex h-20 w-20 items-center justify-center rounded-full mx-auto mb-4">
            <div className="absolute inset-0 rounded-full bg-primary/10 dark:bg-teal-500/20 blur-xl"></div>
            <FileText className="relative h-10 w-10 text-primary dark:text-teal-300" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-slate-100">Terms of Service</h2>
        <p className="mt-2 text-gray-600 dark:text-slate-400">Please review and accept our terms to complete your registration.</p>
      </motion.div>

      <motion.div variants={itemVariants} className="relative p-1 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-slate-800 dark:to-slate-900 rounded-xl">
        <div className="bg-white dark:bg-slate-900 rounded-[11px] p-6">
            <ScrollArea className="h-64">
                <div className="prose prose-sm max-w-none dark:prose-invert prose-headings:text-gray-900 prose-p:text-gray-600 dark:prose-headings:text-slate-200 dark:prose-p:text-slate-400">
                    <h4>1. Platform Overview</h4>
                    <p>The Universal Employment & Income Empowerment Platform (UEIEP) provides tools and opportunities to earn income through AI-generated content creation, daily assignments, and referral programs.</p>
                    <h4>2. Admin Responsibilities</h4>
                    <ul>
                        <li>Complete daily assignments as instructed and maintain an active YouTube channel with provided content.</li>
                        <li>Provide accurate personal and payment information and adhere to all platform guidelines.</li>
                    </ul>
                    <h4>3. Income & Payments</h4>
                    <p>Earnings are based on task completion, YouTube revenue sharing, and referral commissions. Payments are processed via UPI. UEIEP does not guarantee any specific income levels.</p>
                    <h4>4. Content & Referrals</h4>
                    <p>AI-generated content is licensed for use on your designated channel only. The referral system must be used ethically; self-referrals and fake accounts are prohibited.</p>
                    <h4>5. Account Termination</h4>
                    <p>Violation of terms, fraudulent activity, or prolonged inactivity may lead to account suspension or termination.</p>
                    <h4>6. Privacy & Data</h4>
                    <p>We collect and process your data as described in our Privacy Policy. We are committed to protecting your data and do not sell it to third parties.</p>
                </div>
            </ScrollArea>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="flex items-center space-x-4 p-4 bg-gray-100 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700/80 rounded-xl">
        <Switch id="terms-acceptance" checked={accepted} onCheckedChange={setAccepted} />
        <label htmlFor="terms-acceptance" className="text-sm text-gray-700 dark:text-slate-300">
          I have read, understood, and agree to the{" "}
          <Link href="/terms" target="_blank" className="font-semibold text-primary dark:text-teal-400 hover:underline">Terms</Link> &{" "}
          <Link href="/privacy" target="_blank" className="font-semibold text-primary dark:text-teal-400 hover:underline">Privacy Policy</Link>.
        </label>
      </motion.div>

       <motion.div variants={itemVariants} className="p-6 bg-gray-100 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700/80 rounded-xl">
            <h3 className="font-semibold text-gray-800 dark:text-slate-200 mb-4 text-center">What Happens Next?</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                {nextSteps.map((step, index) => (
                    <div key={index} className="flex flex-col items-center p-3 bg-gray-200/70 dark:bg-slate-700/50 rounded-md">
                        <step.icon className="h-6 w-6 text-primary dark:text-teal-400 mb-2" />
                        <span className="text-xs text-gray-700 dark:text-slate-300">{step.text}</span>
                    </div>
                ))}
            </div>
        </motion.div>

      <motion.div variants={itemVariants} className="flex space-x-4 mt-8">
        <Button variant="outline" onClick={onBack} className="w-full text-gray-700 dark:text-slate-300 border-gray-300 dark:border-slate-700 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-white" disabled={isSubmitting}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={!accepted || isSubmitting}
          className="w-full font-semibold bg-primary hover:bg-primary-hover text-primary-foreground dark:bg-teal-600 dark:hover:bg-teal-700 dark:text-white shadow-lg shadow-primary/30 dark:shadow-[0_0_20px_theme(colors.teal.500/50%)] transition-all hover:scale-105 disabled:opacity-50 disabled:shadow-none disabled:hover:scale-100"
        >
          <AnimatePresence mode="wait">
            {isSubmitting ? (
              <motion.span key="submitting" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                Creating Account...
              </motion.span>
            ) : (
              <motion.span key="accept" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex items-center">
                <CheckCircle className="mr-2 h-4 w-4" />
                Accept & Create Account
              </motion.span>
            )}
          </AnimatePresence>
        </Button>
      </motion.div>
    </motion.div>
  )
}