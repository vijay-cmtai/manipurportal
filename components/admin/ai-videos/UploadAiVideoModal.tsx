import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface UploadAiVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const topics = ["Motivation", "Technology", "Finance", "Health"];

export function UploadAiVideoModal({
  isOpen,
  onClose,
}: UploadAiVideoModalProps) {
  // Yahan aap video upload aur metadata save karne ki API call karenge
  const handleUpload = () => {
    console.log("Uploading AI video...");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload New AI Video</DialogTitle>
          <DialogDescription>
            Provide metadata for the video. The system will handle allocation.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div>
            <Label htmlFor="video-file">Video File</Label>
            <Input id="video-file" type="file" />
          </div>
          <div>
            <Label htmlFor="video-title">Video Title</Label>
            <Input
              id="video-title"
              placeholder="e.g., 5 Tips for Financial Freedom"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Topic</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a topic" />
                </SelectTrigger>
                <SelectContent>
                  {topics.map((topic) => (
                    <SelectItem key={topic} value={topic}>
                      {topic}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Video Type</Label>
              <RadioGroup
                defaultValue="Short"
                className="flex items-center space-x-2 pt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Short" id="r-short" />
                  <Label htmlFor="r-short">Short</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Long" id="r-long" />
                  <Label htmlFor="r-long">Long</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleUpload}>Upload Video</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
