import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface BulkPayoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  userCount: number;
  totalAmount: number;
}

export function BulkPayoutModal({
  isOpen,
  onClose,
  userCount,
  totalAmount,
}: BulkPayoutModalProps) {
  // Yahan aap payment gateway API ko call karenge
  const handleProcessPayouts = () => {
    console.log(
      `Processing payouts for ${userCount} users, totaling ₹${totalAmount.toLocaleString()}`
    );
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Bulk Payout</DialogTitle>
          <DialogDescription>
            You are about to process payouts for{" "}
            <span className="font-bold">{userCount} selected users</span>.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 text-center">
          <p className="text-sm text-muted-foreground">Total Payout Amount</p>
          <p className="text-3xl font-bold">₹{totalAmount.toLocaleString()}</p>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleProcessPayouts}>
            Confirm & Process Payouts
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
