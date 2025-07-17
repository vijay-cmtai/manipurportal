import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { type User } from "@/lib/types"; // Import karein

// Props ke liye interface
interface SuspendUserModalProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
}

export function SuspendUserModal({ user, isOpen, onClose }: SuspendUserModalProps) {
  const [reason, setReason] = useState('');
  const isSuspended = user.status === "Suspended";

  const handleUpdateStatus = () => {
    if (!isSuspended && !reason) {
      alert("Please provide a reason for suspension.");
      return;
    }
    console.log(`Updating status for ${user.email} to ${isSuspended ? 'Approved' : 'Suspended'}. Reason: ${reason}`);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isSuspended ? 'Activate' : 'Suspend'} User Account</DialogTitle>
          <DialogDescription>You are about to change the account status for {user.email}.</DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <p>Current Status: <span className={`font-bold ${isSuspended ? 'text-red-500' : 'text-green-500'}`}>{user.status}</span></p>
          {!isSuspended && (
            <div>
              <Label htmlFor="reason">Reason for Suspension (Required)</Label>
              <Textarea id="reason" value={reason} onChange={(e) => setReason(e.target.value)} placeholder="e.g., Violation of terms of service..." />
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button variant={isSuspended ? "default" : "destructive"} onClick={handleUpdateStatus}>
            {isSuspended ? 'Confirm Activation' : 'Confirm Suspension'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}