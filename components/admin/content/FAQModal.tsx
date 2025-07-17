import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { type FaqItem } from "@/lib/types";

interface FAQModalProps {
  isOpen: boolean;
  onClose: () => void;
  faq: FaqItem | null;
}

export function FAQModal({ isOpen, onClose, faq }: FAQModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader><DialogTitle>{faq ? 'Edit' : 'Add New'} FAQ</DialogTitle></DialogHeader>
        <div className="grid gap-4 py-4">
          <div><Label htmlFor="question">Question</Label><Input id="question" defaultValue={faq?.question || ''} /></div>
          <div><Label htmlFor="answer">Answer</Label><Textarea id="answer" rows={5} defaultValue={faq?.answer || ''} /></div>
        </div>
        <DialogFooter><Button onClick={onClose}>Save FAQ</Button></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}