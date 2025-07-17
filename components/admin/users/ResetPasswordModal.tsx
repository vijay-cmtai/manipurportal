import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { type User } from "@/lib/types"; // Import karein

// Props ke liye interface
interface ResetPasswordModalProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
}

export function ResetPasswordModal({ user, isOpen, onClose }: ResetPasswordModalProps) {
  const handleConfirmReset = () => { console.log(`Resetting password for ${user.email}`); onClose(); };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action will reset the password for <span className="font-semibold">{user.email}</span>. The user will receive an email with a new temporary password.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button variant="destructive" onClick={handleConfirmReset}>Confirm & Reset</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}