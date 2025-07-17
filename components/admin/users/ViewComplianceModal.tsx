import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { type User } from "@/lib/types"; // Import karein

// Props ke liye interface
interface ViewComplianceModalProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
}

export function ViewComplianceModal({ user, isOpen, onClose }: ViewComplianceModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Compliance Status</DialogTitle>
          <DialogDescription>Compliance metrics for {user.email}.</DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-3">
          <Card><CardContent className="pt-6 flex justify-between items-center"><p className="font-medium">Daily Task Completion</p><p className="text-2xl font-bold">95%</p></CardContent></Card>
          <Card><CardContent className="pt-6 flex justify-between items-center"><p className="font-medium">Monthly Task Completion</p><p className="text-2xl font-bold">88%</p></CardContent></Card>
          <div className="text-center"><p className="text-sm text-muted-foreground mb-1">Overall Status</p><Badge className="text-base px-4 py-1">Good Standing</Badge></div>
        </div>
        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}