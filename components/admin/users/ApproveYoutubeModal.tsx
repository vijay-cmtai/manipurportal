import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { type User } from "@/lib/types"; // User type ko import karein

// Props ke liye interface define karein
interface ApproveYoutubeModalProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
}

export function ApproveYoutubeModal({
  user,
  isOpen,
  onClose,
}: ApproveYoutubeModalProps) {
  const handleApprove = () => {
    console.log(`Approving YouTube for ${user.email}`);
    onClose();
  };
  const handleDecline = () => {
    console.log(`Declining YouTube for ${user.email}`);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Manage Social Media</DialogTitle>
          <DialogDescription>
            Review and update the Social Media status for {user.email}.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p>
            <span className="font-semibold">Current Status:</span>{" "}
            {user.youtube}
          </p>
          <p className="mt-2">
            <span className="font-semibold">Channel Link:</span>{" "}
            <a href="#" className="text-blue-500 hover:underline">
              View Channel
            </a>
          </p>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDecline}>
            Decline
          </Button>
          <Button onClick={handleApprove}>Approve</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
