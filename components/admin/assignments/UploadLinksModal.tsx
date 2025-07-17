import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface UploadLinksModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UploadLinksModal({ isOpen, onClose }: UploadLinksModalProps) {
  // Yahan aap links upload karne ki API call karenge
  const handleUpload = () => {
    console.log("Uploading links...");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload Daily Video Links</DialogTitle>
          <DialogDescription>
            Upload a list of video links to be distributed to users for today's
            assignment.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Tabs defaultValue="paste">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="paste">Paste Links</TabsTrigger>
              <TabsTrigger value="csv">Upload CSV</TabsTrigger>
            </TabsList>
            <TabsContent value="paste" className="mt-4">
              <Label htmlFor="links-textarea">Video Links (one per line)</Label>
              <Textarea
                id="links-textarea"
                rows={10}
                placeholder="https://youtube.com/watch?v=...\nhttps://youtube.com/watch?v=..."
              />
            </TabsContent>
            <TabsContent value="csv" className="mt-4">
              <Label htmlFor="csv-file">CSV File</Label>
              <Input id="csv-file" type="file" accept=".csv" />
              <p className="text-xs text-muted-foreground mt-2">
                CSV must have one column named 'url'.
              </p>
            </TabsContent>
          </Tabs>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleUpload}>Upload and Prepare</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
