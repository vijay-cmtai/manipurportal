import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type TutorialItem } from "@/lib/types";

interface TutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
  tutorial: TutorialItem | null;
}

export function TutorialModal({ isOpen, onClose, tutorial }: TutorialModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader><DialogTitle>{tutorial ? 'Edit' : 'Add New'} Tutorial</DialogTitle></DialogHeader>
        <div className="grid gap-4 py-4">
          <div><Label htmlFor="title">Video Title</Label><Input id="title" defaultValue={tutorial?.title || ''} /></div>
          <div><Label htmlFor="url">Video URL</Label><Input id="url" defaultValue={tutorial?.url || ''} placeholder="https://youtube.com/watch?v=..." /></div>
        </div>
        <DialogFooter><Button onClick={onClose}>Save Tutorial</Button></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}