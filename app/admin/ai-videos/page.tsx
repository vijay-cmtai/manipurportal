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
import { UploadAiVideoModal } from "@/components/admin/ai-videos/UploadAiVideoModal";
import { VideoDetailsModal } from "@/components/admin/ai-videos/VideoDetailsModal";

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
      <div className="space-y-6 md:space-y-8">
        {/* --- BADLAV: Header stacks on mobile --- */}
        <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            AI Video Management
          </h1>
          <Button
            onClick={() => setUploadModalOpen(true)}
            className="w-full md:w-auto"
          >
            <Upload className="mr-2 h-4 w-4" /> Upload New AI Video
          </Button>
        </div>

        {/* Allocation Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
              <CardTitle className="text-sm font-medium">Available</CardTitle>
              <Check className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{availableVideos}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Assigned</CardTitle>
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
              Central repository of all AI-generated videos.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* --- BADLAV: Table is now scrollable on small screens --- */}
            <div className="relative w-full overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Video Title</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Topic
                    </TableHead>
                    <TableHead className="hidden md:table-cell">Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden lg:table-cell">
                      Assigned To
                    </TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {aiVideosList.map((video) => (
                    <TableRow key={video.id}>
                      <TableCell className="font-medium">
                        {video.title}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Badge variant="outline">{video.topic}</Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Badge variant="secondary">{video.type}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge>{video.status}</Badge>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        {video.assignedTo || "N/A"}
                      </TableCell>
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
            </div>
          </CardContent>
        </Card>
      </div>

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
