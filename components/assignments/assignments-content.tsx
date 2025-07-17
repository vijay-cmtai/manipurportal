"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Play, CheckCircle, Clock, ExternalLink, Info } from "lucide-react"
import { AssignmentCompletionModal } from "./assignment-completion-modal"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const assignments = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  title: `AI Tutorial Video ${i + 1}: ${["YouTube Growth Strategies", "Content Creation Tips", "Monetization Secrets", "SEO Optimization", "Thumbnail Design", "Video Editing Basics", "Audience Engagement", "Analytics Understanding"][i % 8]}`,
  thumbnail: `/placeholder.svg?height=120&width=200&text=Video+${i + 1}`,
  duration: Math.random() > 0.5 ? "55s" : "10m",
  channel: `Channel ${Math.floor(i / 5) + 1}`,
  status: i < 12 ? "completed" : i < 15 ? "in-progress" : "pending",
  youtubeUrl: `https://youtube.com/watch?v=example${i + 1}`,
  completedAt: i < 12 ? new Date(Date.now() - Math.random() * 86400000) : null,
}))

export function AssignmentsContent() {
  const [completedCount, setCompletedCount] = useState(12)
  const [showCompletionModal, setShowCompletionModal] = useState(false)
  const [watchingAssignment, setWatchingAssignment] = useState<number | null>(null)
  const [timeRemaining, setTimeRemaining] = useState<Record<number, number>>({})

  const progress = (completedCount / assignments.length) * 100

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        const updated = { ...prev }
        Object.keys(updated).forEach((key) => {
          const id = Number.parseInt(key)
          if (updated[id] > 0) {
            updated[id] -= 1
          } else if (updated[id] === 0) {
            const assignment = assignments.find((a) => a.id === id)
            if (assignment && assignment.status !== "completed") {
              assignment.status = "completed"
              setCompletedCount((prev) => prev + 1)
              setWatchingAssignment(null)
            }
            delete updated[id]
          }
        })
        return updated
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (completedCount === assignments.length) {
      setShowCompletionModal(true)
    }
  }, [completedCount])

  const handleWatchVideo = (assignment: any) => {
    const duration = assignment.duration === "55s" ? 55 : 600
    setTimeRemaining((prev) => ({ ...prev, [assignment.id]: duration }))
    setWatchingAssignment(assignment.id)
    assignment.status = "in-progress"
    window.open(assignment.youtubeUrl, "_blank")
  }

  const getStatusClasses = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/20"
      case "in-progress":
        return "bg-sky-100 text-sky-800 border-sky-200 dark:bg-sky-500/10 dark:text-sky-400 dark:border-sky-500/20"
      default:
        return "bg-gray-200 text-gray-700 border-gray-300 dark:bg-slate-700 dark:text-slate-300 dark:border-slate-600"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4" />
      case "in-progress":
        return <Clock className="h-4 w-4 animate-spin" />
      default:
        return <Play className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-slate-100">Daily Assignments</h1>
        <p className="text-gray-600 dark:text-slate-400 text-lg">Complete your daily video assignments to earn rewards and build your income.</p>
      </div>

      <Alert className="border-sky-200 dark:border-sky-500/30 bg-sky-50 dark:bg-sky-500/10 text-sky-800 dark:text-sky-200">
        <Info className="h-5 w-5 text-sky-600 dark:text-sky-400" />
        <AlertTitle className="font-bold text-gray-900 dark:text-white">Assignment Instructions</AlertTitle>
        <AlertDescription>Watch each video for the full duration, subscribe to the channel, and like the video. Wait for the timer to complete to get your reward.</AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800">
          <CardHeader><CardTitle className="text-base text-gray-600 dark:text-slate-300">Overall Progress</CardTitle></CardHeader>
          <CardContent><Progress value={progress} className="h-2" /><div className="flex justify-between text-sm mt-2"><span className="text-gray-500 dark:text-slate-400">Completed</span><span className="font-medium text-gray-800 dark:text-slate-200">{completedCount}/50</span></div></CardContent>
        </Card>
        <Card className="bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 bg-green-100 dark:bg-green-500/10 rounded-full"><CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" /></div>
            <div><div className="text-2xl font-bold text-gray-900 dark:text-slate-100">{completedCount}</div><div className="text-sm text-gray-600 dark:text-slate-400">Tasks Completed</div></div>
          </CardContent>
        </Card>
        <Card className="bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 bg-yellow-100 dark:bg-yellow-500/10 rounded-full"><Clock className="h-6 w-6 text-yellow-600 dark:text-yellow-400" /></div>
            <div><div className="text-2xl font-bold text-gray-900 dark:text-slate-100">{50 - completedCount}</div><div className="text-sm text-gray-600 dark:text-slate-400">Tasks Remaining</div></div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800">
        <CardHeader><CardTitle className="text-gray-900 dark:text-slate-100">Assignment List</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {assignments.map((assignment) => (
              <Card key={assignment.id} className="bg-gray-50 dark:bg-slate-800/50 border-gray-200 dark:border-slate-700 flex flex-col justify-between">
                <CardContent className="p-4">
                  <div className="relative mb-3">
                    <img src={assignment.thumbnail || "/placeholder.svg"} alt={assignment.title} className="w-full h-24 object-cover rounded-md"/>
                     <div className="absolute top-2 right-2"><Badge className={getStatusClasses(assignment.status)} variant="outline"><div className="flex items-center gap-1">{getStatusIcon(assignment.status)}<span className="capitalize text-xs">{assignment.status}</span></div></Badge></div>
                    <div className="absolute bottom-2 left-2"><Badge className="bg-black/70 text-white text-xs">{assignment.duration}</Badge></div>
                  </div>
                  <h4 className="font-medium text-sm text-gray-800 dark:text-slate-200 mb-1 line-clamp-2">{assignment.title}</h4>
                  <p className="text-xs text-gray-500 dark:text-slate-400">{assignment.channel}</p>
                   {timeRemaining[assignment.id] != null && (
                    <div className="mt-3 p-2 bg-sky-100 dark:bg-sky-500/10 rounded-lg text-center">
                        <span className="font-mono font-semibold text-sky-700 dark:text-sky-300">
                          {Math.floor(timeRemaining[assignment.id] / 60)}:{(timeRemaining[assignment.id] % 60).toString().padStart(2, "0")}
                        </span>
                    </div>
                  )}
                </CardContent>
                <div className="p-4 pt-0">
                  <Button onClick={() => handleWatchVideo(assignment)} disabled={assignment.status === "completed" || watchingAssignment === assignment.id} className="w-full" variant={assignment.status === "completed" ? "outline" : "default"}>
                    {assignment.status === "completed" ? (<><CheckCircle className="mr-2 h-4 w-4" />Completed</>) : watchingAssignment === assignment.id ? (<><Clock className="mr-2 h-4 w-4 animate-spin" />Watching...</>) : (<><ExternalLink className="mr-2 h-4 w-4" />Watch Video</>)}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
      <AssignmentCompletionModal open={showCompletionModal} onClose={() => setShowCompletionModal(false)} />
    </div>
  )
}