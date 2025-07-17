import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { type AiVideo } from "@/lib/types";
import { Trash2 } from "lucide-react";

interface VideoDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  video: AiVideo | null;
}

export function VideoDetailsModal({
  isOpen,
  onClose,
  video,
}: VideoDetailsModalProps) {
  if (!video) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{video.title}</DialogTitle>
          <DialogDescription>Uploaded on {video.uploadDate}</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
          {/* Video Player Placeholder */}
          <div className="bg-slate-900 rounded-lg aspect-video flex items-center justify-center">
            <p className="text-slate-500">Video Preview</p>
          </div>
          {/* Details Section */}
          <div className="space-y-4">
            <h3 className="font-semibold">Video Details</h3>
            <div className="text-sm space-y-2">
              <p>
                <strong>Topic:</strong>{" "}
                <Badge variant="secondary">{video.topic}</Badge>
              </p>
              <p>
                <strong>Type:</strong>{" "}
                <Badge variant="secondary">{video.type}</Badge>
              </p>
              <p>
                <strong>Status:</strong> <Badge>{video.status}</Badge>
              </p>
              <p>
                <strong>Assigned To:</strong>{" "}
                {video.assignedTo || "Not Assigned"}
              </p>
            </div>
            <div className="border-t pt-4">
              <Button variant="destructive" size="sm">
                <Trash2 className="mr-2 h-4 w-4" /> Delete Video
              </Button>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
