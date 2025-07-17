"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Upload, MoreHorizontal, Video, Check, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type AiVideo } from "@/lib/types";

// Import Modals
import { UploadAiVideoModal } from "@/components/admin/ai-videos/UploadAiVideoModal";
import { VideoDetailsModal } from "@/components/admin/ai-videos/VideoDetailsModal";

// --- DUMMY DATA ---
const aiVideosList: AiVideo[] = [
  {
    id: "vid_01",
    title: "Morning Motivation Boost",
    topic: "Motivation",
    type: "Short",
    uploadDate: "2023-10-28",
    status: "Assigned",
    assignedTo: "sara.khan@example.com",
    fileUrl: "",
  },
  {
    id: "vid_02",
    title: "Intro to Stock Market",
    topic: "Finance",
    type: "Long",
    uploadDate: "2023-10-28",
    status: "Available",
    assignedTo: null,
    fileUrl: "",
  },
  {
    id: "vid_03",
    title: "Latest AI Innovations",
    topic: "Technology",
    type: "Short",
    uploadDate: "2023-10-27",
    status: "Assigned",
    assignedTo: "rohan.mehta@example.com",
    fileUrl: "",
  },
  {
    id: "vid_04",
    title: "Healthy Eating Habits",
    topic: "Health",
    type: "Long",
    uploadDate: "2023-10-27",
    status: "Available",
    assignedTo: null,
    fileUrl: "",
  },
];

export default function AiVideosPage() {
  const [isUploadModalOpen, setUploadModalOpen] = useState(false);
  const [isDetailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<AiVideo | null>(null);

  const handleOpenDetailsModal = (video: AiVideo) => {
    setSelectedVideo(video);
    setDetailsModalOpen(true);
  };

  const availableVideos = aiVideosList.filter(
    (v) => v.status === "Available"
  ).length;
  const assignedVideos = aiVideosList.length - availableVideos;

  return (
    <>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">
            AI Video Management
          </h1>
          <Button onClick={() => setUploadModalOpen(true)}>
            <Upload className="mr-2 h-4 w-4" /> Upload New AI Video
          </Button>
        </div>

        {/* Allocation Overview */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Total Videos
              </CardTitle>
              <Video className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{aiVideosList.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Available for Allocation
              </CardTitle>
              <Check className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{availableVideos}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Already Assigned
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{assignedVideos}</div>
            </CardContent>
          </Card>
        </div>

        {/* AI Video Library */}
        <Card>
          <CardHeader>
            <CardTitle>AI Video Library</CardTitle>
            <CardDescription>
              This is the central repository of all AI-generated videos uploaded
              to the platform.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Video Title</TableHead>
                  <TableHead>Topic</TableHead>

                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {aiVideosList.map((video) => (
                  <TableRow key={video.id}>
                    <TableCell className="font-medium">{video.title}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{video.topic}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{video.type}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge>{video.status}</Badge>
                    </TableCell>
                    <TableCell>{video.assignedTo || "N/A"}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem
                            onSelect={() => handleOpenDetailsModal(video)}
                          >
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-500">
                            Delete Video
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Modals */}
      <UploadAiVideoModal
        isOpen={isUploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
      />
      <VideoDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setDetailsModalOpen(false)}
        video={selectedVideo}
      />
    </>
  );
}
