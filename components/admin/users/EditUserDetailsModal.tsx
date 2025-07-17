import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type User } from "@/lib/types"; // Import karein

// Props ke liye interface
interface EditUserDetailsModalProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
}

export function EditUserDetailsModal({ user, isOpen, onClose }: EditUserDetailsModalProps) {
  const handleSaveChanges = () => { console.log(`Saving changes for ${user.email}`); onClose(); };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit User Details</DialogTitle>
          <DialogDescription>Changes made here will be logged in the audit trail.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4"><Label htmlFor="email" className="text-right">Email</Label><Input id="email" defaultValue={user.email} className="col-span-3" disabled /></div>
          <div className="grid grid-cols-4 items-center gap-4"><Label htmlFor="mobile" className="text-right">Mobile</Label><Input id="mobile" defaultValue={user.mobile} className="col-span-3" /></div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSaveChanges}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}