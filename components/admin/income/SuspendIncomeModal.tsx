import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { type UserIncomeProfile } from "@/lib/types";

interface SuspendIncomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserIncomeProfile | null;
}

export function SuspendIncomeModal({
  isOpen,
  onClose,
  user,
}: SuspendIncomeModalProps) {
  const [reason, setReason] = useState("");

  if (!user) return null;

  const isSuspended = user.incomeStatus === "Suspended";

  const handleUpdateStatus = () => {
    if (!isSuspended && !reason) {
      alert("Please provide a reason for suspension.");
      return;
    }
    console.log(`Updating income status for ${user.email}. Reason: ${reason}`);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isSuspended ? "Reactivate" : "Suspend"} User's Income
          </DialogTitle>
          <DialogDescription>
            This will affect income calculation and video access for{" "}
            {user.email}.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <p>
            Current Income Status:{" "}
            <span
              className={`font-bold ${isSuspended ? "text-red-500" : "text-green-500"}`}
            >
              {user.incomeStatus}
            </span>
          </p>
          {!isSuspended && (
            <div>
              <Label htmlFor="reason">
                Reason for Suspension (Required & Logged)
              </Label>
              <Textarea
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="e.g., Failure to meet monthly contribution requirement."
              />
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant={isSuspended ? "default" : "destructive"}
            onClick={handleUpdateStatus}
          >
            {isSuspended ? "Confirm Reactivation" : "Confirm Suspension"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
