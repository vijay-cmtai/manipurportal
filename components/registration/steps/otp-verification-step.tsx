"use client"

import { Button } from "@/components/ui/button"
import { AnimatePresence, motion, Variants } from "framer-motion"
import { ArrowLeft, ArrowRight, CheckCircle, Eye, EyeOff } from "lucide-react"
import { useRef, ChangeEvent, KeyboardEvent, useState } from "react";
import { toast } from "sonner"

interface OTPVerificationStepProps {
  formData: any
  updateFormData: (data: any) => void
  onNext: () => void
  onBack: () => void
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
}

export function OTPVerificationStep({ formData, updateFormData, onNext, onBack }: OTPVerificationStepProps) {
  const [otp, setOtp] = useState(new Array(6).fill(""))
  const [otpSent, setOtpSent] = useState(false)
  const [isOtpVerified, setIsOtpVerified] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)

  const otpInputs = useRef<(HTMLInputElement | null)[]>([])

  const calculatePasswordStrength = (password: string) => {
    let strength = 0
    if (password.length >= 8) strength += 25
    if (/[A-Z]/.test(password)) strength += 25
    if (/[0-9]/.test(password)) strength += 25
    if (/[^A-Za-z0-9]/.test(password)) strength += 25
    return strength
  }

  const handlePasswordChange = (password: string) => {
    updateFormData({ password })
    setPasswordStrength(calculatePasswordStrength(password))
  }

  const sendOTP = async () => {
    setIsLoading(true)
    try {
      setOtpSent(true)
      toast.success("OTP sent! Enter any 6-digit code.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleOtpChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target
    if (/[^0-9]/.test(value)) return
    const newOtp = [...otp]
    newOtp[index] = value.slice(-1)
    setOtp(newOtp)
    updateFormData({ otp: newOtp.join("") })
    if (value && index < 5) otpInputs.current[index + 1]?.focus()
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpInputs.current[index - 1]?.focus()
    }
  }

  const verifyOTP = async () => {
    if (otp.join("").length !== 6) {
      toast.error("Please enter the complete 6-digit OTP.")
      return
    }
    setIsVerifying(true)
    setTimeout(() => {
      setIsOtpVerified(true)
      toast.success("OTP Verified Successfully!")
      setIsVerifying(false)
    }, 1000)
  }

  const handleSubmit = () => {
    if (formData.password && passwordStrength >= 75) {
      toast.success("Account created successfully!")
      setTimeout(onNext, 1000)
    } else {
      toast.error("Please create a strong password.")
    }
  }

  return (
    <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
      <motion.div variants={itemVariants} className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-slate-100">Verification Protocol</h2>
        <p className="mt-2 text-gray-600 dark:text-slate-400">Confirm your identity and secure your new account.</p>
      </motion.div>

      <AnimatePresence mode="wait">
        {!isOtpVerified ? (
          <motion.div key="otp-phase" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8">
            <motion.div variants={itemVariants} className="p-6 bg-gray-100 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700/80 rounded-xl">
              <h3 className="font-semibold text-gray-800 dark:text-slate-200 mb-4 text-center">Confirm Your Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700 dark:text-white">
                <div className="p-3 bg-gray-200/70 dark:bg-slate-700/50 rounded-md"><span className="font-semibold text-primary dark:text-teal-400">Name:</span> {formData.fullName}</div>
                <div className="p-3 bg-gray-200/70 dark:bg-slate-700/50 rounded-md"><span className="font-semibold text-primary dark:text-teal-400">Email:</span> {formData.email}</div>
                <div className="p-3 bg-gray-200/70 dark:bg-slate-700/50 rounded-md"><span className="font-semibold text-primary dark:text-teal-400">Mobile:</span> +91 {formData.mobile}</div>
                <div className="p-3 bg-gray-200/70 dark:bg-slate-700/50 rounded-md"><span className="font-semibold text-primary dark:text-teal-400">Referral:</span> {formData.referralId}</div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="p-6 bg-gray-100 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700/80 rounded-xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-gray-800 dark:text-slate-200">Verify Contact Details</h3>
                {!otpSent && (
                  <Button onClick={sendOTP} disabled={isLoading} className="bg-primary hover:bg-primary-hover text-primary-foreground dark:bg-teal-600 dark:hover:bg-teal-700 dark:text-white font-semibold">
                    {isLoading ? "Sending..." : "Send OTP"}
                  </Button>
                )}
              </div>

              {otpSent && (
                <div className="space-y-4">
                  <div className="flex justify-center gap-2 sm:gap-3">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        ref={(el) => { otpInputs.current[index] = el }}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        className="w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-bold bg-gray-100 dark:bg-slate-800 border-gray-300 dark:border-slate-700 text-gray-900 dark:text-slate-200 focus:ring-2 focus:ring-primary dark:focus:ring-teal-500 focus:border-primary dark:focus:border-teal-500 rounded-md"
                      />
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-slate-500 text-center">Enter any 6-digit OTP.</p>
                  <Button onClick={verifyOTP} disabled={isVerifying} className="w-full bg-sky-500 hover:bg-sky-600 dark:bg-sky-600 dark:hover:bg-sky-700 text-white font-semibold">
                    {isVerifying ? "Verifying..." : "Verify OTP"}
                  </Button>
                </div>
              )}
            </motion.div>
          </motion.div>
        ) : (
          <motion.div key="password-phase" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8">
            <motion.div variants={itemVariants} className="p-6 bg-gray-100 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700/80 rounded-xl">
              <h3 className="font-semibold text-gray-800 dark:text-slate-200 mb-4 text-center">Create a Secure Password</h3>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter a strong password"
                  value={formData.password}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                  className="w-full pr-10 bg-gray-100 dark:bg-slate-800/80 border border-gray-300 dark:border-slate-700 text-gray-900 dark:text-slate-300 focus:ring-1 focus:ring-primary dark:focus:ring-teal-500 focus:border-primary dark:focus:border-teal-500 p-3 rounded-md"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-slate-500 hover:text-gray-800 dark:hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {formData.password && (
                <div className="mt-4 space-y-2">
                  <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2">
                    <motion.div className="h-2 rounded-full bg-gradient-to-r from-teal-500 to-sky-500" style={{ width: `${passwordStrength}%` }} />
                  </div>
                  <ul className="text-xs grid grid-cols-2 gap-x-4 gap-y-1">
                    <li className={`flex items-center gap-2 ${formData.password.length >= 8 ? "text-green-600 dark:text-teal-400" : "text-gray-400 dark:text-slate-500"}`}><CheckCircle size={14} /> 8+ characters</li>
                    <li className={`flex items-center gap-2 ${/[A-Z]/.test(formData.password) ? "text-green-600 dark:text-teal-400" : "text-gray-400 dark:text-slate-500"}`}><CheckCircle size={14} /> 1 uppercase</li>
                    <li className={`flex items-center gap-2 ${/[0-9]/.test(formData.password) ? "text-green-600 dark:text-teal-400" : "text-gray-400 dark:text-slate-500"}`}><CheckCircle size={14} /> 1 number</li>
                    <li className={`flex items-center gap-2 ${/[^A-Za-z0-9]/.test(formData.password) ? "text-green-600 dark:text-teal-400" : "text-gray-400 dark:text-slate-500"}`}><CheckCircle size={14} /> 1 special char</li>
                  </ul>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div variants={itemVariants} className="flex space-x-4 mt-8">
        <Button variant="outline" onClick={onBack} className="w-full text-gray-700 dark:text-slate-300 border-gray-300 dark:border-slate-700 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-white">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button onClick={handleSubmit} disabled={!isOtpVerified} className="w-full font-semibold bg-primary hover:bg-primary-hover text-primary-foreground dark:bg-teal-600 dark:hover:bg-teal-700 dark:text-white shadow-lg shadow-primary/30 dark:shadow-[0_0_20px_theme(colors.teal.500/50%)] transition-all hover:scale-105 disabled:opacity-50 disabled:shadow-none disabled:hover:scale-100">
          Create Account <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </motion.div>
    </motion.div>
  )
}
