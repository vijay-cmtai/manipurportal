"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Trophy, Star, Gift, ArrowRight } from "lucide-react"
import { useEffect, useState } from "react"

interface AssignmentCompletionModalProps {
  open: boolean
  onClose: () => void
}

export function AssignmentCompletionModal({ open, onClose }: AssignmentCompletionModalProps) {
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    if (open) {
      setShowConfetti(true)
      const timer = setTimeout(() => setShowConfetti(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [open])

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4 p-4 bg-gradient-primary rounded-full w-20 h-20 flex items-center justify-center">
            <Trophy className="h-10 w-10 text-white" />
          </div>
          <DialogTitle className="text-2xl font-bold text-primary-dark">🎉 Congratulations! 🎉</DialogTitle>
        </DialogHeader>

        <div className="text-center space-y-4">
          <p className="text-lg text-gray-700">You've completed all 50 assignments for today!</p>

          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Star className="h-5 w-5 text-yellow-500 fill-current" />
              <span className="font-semibold text-gray-800">Bonus Rewards Unlocked!</span>
              <Star className="h-5 w-5 text-yellow-500 fill-current" />
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Assignment Completion Bonus:</span>
                <span className="font-semibold text-green-600">₹500</span>
              </div>
              <div className="flex justify-between">
                <span>Perfect Attendance Bonus:</span>
                <span className="font-semibold text-green-600">₹200</span>
              </div>
              <div className="border-t pt-2">
                <div className="flex justify-between font-bold">
                  <span>Total Earned Today:</span>
                  <span className="text-green-600">₹700</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Gift className="h-5 w-5 text-blue-600" />
              <span className="font-semibold text-blue-800">What's Next?</span>
            </div>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Check for new AI videos to download</li>
              <li>• Share your referral link to earn more</li>
              <li>• Come back tomorrow for new assignments</li>
            </ul>
          </div>

          <div className="flex space-x-3">
            <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Close
            </Button>
            <Button
              className="flex-1 gradient-primary text-white"
              onClick={() => {
                onClose()
                window.location.href = "/ai-videos"
              }}
            >
              Download AI Videos <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
