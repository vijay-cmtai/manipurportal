"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, Copy, Play, Calendar, Clock, Tag, ExternalLink, CheckCircle, Video } from "lucide-react"
import { toast } from "sonner"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const currentVideo = {
  id: 1,
  title: "10 Proven YouTube Growth Strategies That Actually Work in 2024",
  description: "Discover the latest YouTube growth strategies that top creators use to gain millions of subscribers. Learn about algorithm optimization, content planning, and audience engagement techniques that will skyrocket your channel growth.",
  thumbnail: "/placeholder.svg?height=300&width=500&text=AI+Video+Ready",
  topic: "YouTube Growth",
  channelName: "TechGrowth Pro",
  type: "Long Form",
  duration: "12:45",
  createdAt: new Date(),
  status: "ready",
  tags: ["YouTube", "Growth", "Strategy", "2024"],
}

const videoHistory = [
  { id: 2, title: "Content Creation Secrets for Beginners", thumbnail: "/placeholder.svg?height=200&width=300&text=Video+2", topic: "Content Creation", downloadedAt: new Date(Date.now() - 86400000), status: "downloaded", views: "1.2K", likes: "89" },
  { id: 3, title: "Monetization Strategies for Small Channels", thumbnail: "/placeholder.svg?height=200&width=300&text=Video+3", topic: "Monetization", downloadedAt: new Date(Date.now() - 172800000), status: "uploaded", views: "856", likes: "67" },
  { id: 4, title: "SEO Optimization for YouTube Videos", thumbnail: "/placeholder.svg?height=200&width=300&text=Video+4", topic: "SEO", downloadedAt: new Date(Date.now() - 259200000), status: "downloaded", views: "2.1K", likes: "134" },
]

export function AIVideosContent() {
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownload = () => {
    setIsDownloading(true)
    setTimeout(() => {
      setIsDownloading(false)
      toast.success("Video downloaded successfully!")
    }, 2000)
  }

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    toast.success(`${type} copied to clipboard!`)
  }

  const getStatusClasses = (status: string) => {
    switch (status) {
      case "ready":
        return "bg-green-100 text-green-800 border-green-200 dark:bg-teal-500/10 dark:text-teal-300 dark:border-teal-500/20"
      case "downloaded":
        return "bg-sky-100 text-sky-800 border-sky-200 dark:bg-sky-500/10 dark:text-sky-300 dark:border-sky-500/20"
      case "uploaded":
        return "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-500/10 dark:text-purple-300 dark:border-purple-500/20"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-slate-700 dark:text-slate-300"
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">AI Video Downloads</h1>
        <p className="text-gray-600 dark:text-slate-400 text-lg">
          Download your personalized AI-generated videos and grow your YouTube channel
        </p>
      </div>

      <Alert className="border-primary/30 dark:border-teal-500/30 bg-primary/10 dark:bg-teal-500/10 text-primary-dark dark:text-teal-200">
        <CheckCircle className="h-5 w-5 text-primary dark:text-teal-400" />
        <AlertTitle className="font-bold text-gray-900 dark:text-white">Your AI Video is Ready!</AlertTitle>
        <AlertDescription>
          A new personalized video has been generated based on your selected topic.
        </AlertDescription>
      </Alert>

      <Card className="bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="text-gray-900 dark:text-slate-100">Latest AI Video</span>
            <Badge className={`capitalize ${getStatusClasses(currentVideo.status)}`} variant="outline">
              <CheckCircle className="mr-1 h-4 w-4" />
              Ready for Download
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="relative">
                <img
                  src={currentVideo.thumbnail || "/placeholder.svg"}
                  alt={currentVideo.title}
                  className="w-full h-64 object-cover rounded-lg border border-gray-200 dark:border-slate-700"
                />
                <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center">
                  <Button size="lg" className="bg-white/10 text-white backdrop-blur-sm hover:bg-white/20">
                    <Play className="mr-2 h-5 w-5" />
                    Preview Video
                  </Button>
                </div>
                <div className="absolute bottom-3 right-3">
                  <Badge className="bg-black/70 text-white">{currentVideo.duration}</Badge>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {currentVideo.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-gray-600 border-gray-300 dark:text-slate-400 dark:border-slate-700">
                    <Tag className="mr-1 h-3 w-3" />
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-slate-100 mb-2">{currentVideo.title}</h3>
                <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-slate-400 mb-4">
                  <div className="flex items-center space-x-1.5"><Calendar className="h-4 w-4" /><span>{currentVideo.createdAt.toLocaleDateString()}</span></div>
                  <div className="flex items-center space-x-1.5"><Clock className="h-4 w-4" /><span>{currentVideo.duration}</span></div>
                  <Badge variant="outline" className="border-gray-300 dark:border-slate-700">{currentVideo.type}</Badge>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2"><Label className="text-sm font-medium text-gray-700 dark:text-slate-300">Suggested Title</Label><Button variant="ghost" size="sm" onClick={() => copyToClipboard(currentVideo.title, "Title")}><Copy className="h-4 w-4" /></Button></div>
                  <div className="p-3 bg-gray-100 dark:bg-slate-800 rounded-lg text-sm text-gray-800 dark:text-slate-300 border border-gray-200 dark:border-slate-700">{currentVideo.title}</div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2"><Label className="text-sm font-medium text-gray-700 dark:text-slate-300">Suggested Description</Label><Button variant="ghost" size="sm" onClick={() => copyToClipboard(currentVideo.description, "Description")}><Copy className="h-4 w-4" /></Button></div>
                  <div className="p-3 bg-gray-100 dark:bg-slate-800 rounded-lg text-sm text-gray-600 dark:text-slate-400 max-h-32 overflow-y-auto border border-gray-200 dark:border-slate-700">{currentVideo.description}</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><Label className="text-sm font-medium text-gray-700 dark:text-slate-300">Topic</Label><div className="mt-1 p-2 bg-gray-100 dark:bg-slate-800 rounded text-sm text-gray-800 dark:text-slate-300 border border-gray-200 dark:border-slate-700">{currentVideo.topic}</div></div>
                  <div><Label className="text-sm font-medium text-gray-700 dark:text-slate-300">Channel Name</Label><div className="mt-1 p-2 bg-gray-100 dark:bg-slate-800 rounded text-sm text-gray-800 dark:text-slate-300 border border-gray-200 dark:border-slate-700">{currentVideo.channelName}</div></div>
                </div>
              </div>
              <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-slate-800">
                <Button onClick={handleDownload} disabled={isDownloading} className="w-full bg-primary hover:bg-primary-hover text-primary-foreground dark:bg-teal-600 dark:hover:bg-teal-700 dark:text-white py-3 text-base font-semibold">
                  {isDownloading ? (<><div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current mr-2"></div>Downloading...</>) : (<><Download className="mr-2 h-5 w-5" />Download AI Video</>)}
                </Button>
                <Button variant="outline" className="w-full border-gray-300 hover:bg-gray-100 dark:border-slate-700 dark:hover:bg-slate-800" asChild>
                  <a href="/tutorials/upload-guide" target="_blank" rel="noreferrer"><ExternalLink className="mr-2 h-4 w-4" />Quick Upload Guide</a>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800">
        <CardHeader><CardTitle className="text-gray-900 dark:text-slate-100">Download History</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {videoHistory.map((video) => (
              <Card key={video.id} className="bg-gray-50 dark:bg-slate-800/50 border-gray-200 dark:border-slate-700 hover:border-gray-300 dark:hover:border-slate-600 transition-colors">
                 <div className="relative mb-3">
                    <img src={video.thumbnail || "/placeholder.svg"} alt={video.title} className="w-full h-32 object-cover rounded-t-lg"/>
                    <div className="absolute top-2 right-2"><Badge className={`capitalize ${getStatusClasses(video.status)}`} variant="outline">{video.status}</Badge></div>
                  </div>
                <div className="p-4 pt-0">
                  <h4 className="font-medium text-sm text-gray-800 dark:text-slate-200 mb-2 line-clamp-2">{video.title}</h4>
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-slate-400 mb-3"><span>{video.topic}</span><span>{video.downloadedAt.toLocaleDateString()}</span></div>
                  {video.status === "uploaded" && (<div className="flex items-center justify-between text-xs text-gray-500 dark:text-slate-400 mb-3"><span className="flex items-center space-x-1"><Video className="h-3 w-3" /><span>{video.views} views</span></span><span>{video.likes} likes</span></div>)}
                  <Button variant="outline" size="sm" className="w-full border-gray-300 hover:bg-gray-100 dark:border-slate-700 dark:hover:bg-slate-800"><Download className="mr-2 h-3 w-3" />Re-download</Button>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}