import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { type AssignmentBatch, type NonCompliantUser } from "@/lib/types";

interface ViewNonCompliantModalProps {
  isOpen: boolean;
  onClose: () => void;
  batch: AssignmentBatch | null;
  users: NonCompliantUser[];
}

export function ViewNonCompliantModal({
  isOpen,
  onClose,
  batch,
  users,
}: ViewNonCompliantModalProps) {
  if (!batch) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Non-Compliant Users</DialogTitle>
          <DialogDescription>
            List of users who failed to meet task requirements for {batch.date}.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User Email</TableHead>
                <TableHead>Completed</TableHead>
                <TableHead>Failure Rate</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {user.tasksCompleted}/{user.tasksAssigned}
                  </TableCell>
                  <TableCell className="text-red-500 font-semibold">
                    {(
                      ((user.tasksAssigned - user.tasksCompleted) /
                        user.tasksAssigned) *
                      100
                    ).toFixed(1)}
                    %
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
