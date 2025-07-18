"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Upload, PlayCircle, Clock, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { type AssignmentBatch, type NonCompliantUser } from "@/lib/types";
import { UploadLinksModal } from "@/components/admin/assignments/UploadLinksModal";
import { ViewNonCompliantModal } from "@/components/admin/assignments/ViewNonCompliantModal";

const assignmentBatches: AssignmentBatch[] = [
  {
    id: "batch_1",
    date: "2023-10-27",
    totalLinks: 4100,
    status: "In Progress",
    completionRate: 65,
    nonCompliantUsers: 30,
  },
  {
    id: "batch_2",
    date: "2023-10-26",
    totalLinks: 4050,
    status: "Completed",
    completionRate: 92,
    nonCompliantUsers: 8,
  },
  {
    id: "batch_3",
    date: "2023-10-25",
    totalLinks: 4000,
    status: "Completed",
    completionRate: 88,
    nonCompliantUsers: 15,
  },
];

const nonCompliantUsersList: NonCompliantUser[] = [
  {
    id: "usr_3",
    email: "priya.sharma@example.com",
    tasksAssigned: 50,
    tasksCompleted: 20,
  },
  {
    id: "usr_5",
    email: "vikas.verma@example.com",
    tasksAssigned: 50,
    tasksCompleted: 35,
  },
];

export default function AssignmentsPage() {
  const [isUploadModalOpen, setUploadModalOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState<AssignmentBatch | null>(
    null
  );

  const handleOpenViewModal = (batch: AssignmentBatch) => {
    setSelectedBatch(batch);
    setViewModalOpen(true);
  };

  const todaysBatch = assignmentBatches.find(
    (b) => b.status === "In Progress"
  ) || { status: "Pending Distribution", completionRate: 0, totalLinks: 0 };

  return (
    <>
      <div className="space-y-6 md:space-y-8">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          Assignment Management
        </h1>

        {/* Today's Status & Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Today's Assignment Status</CardTitle>
            <CardDescription>
              Monitor and manage the assignment distribution for today.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* --- BADLAV: Responsive layout for stats --- */}
            <div className="flex flex-col gap-4 rounded-lg border p-4 md:flex-row md:items-center md:justify-between">
              <div className="flex justify-between items-center md:flex-col md:items-start">
                <p className="text-sm text-muted-foreground">Status</p>
                <Badge
                  variant={
                    todaysBatch.status === "In Progress"
                      ? "default"
                      : "secondary"
                  }
                >
                  {todaysBatch.status}
                </Badge>
              </div>
              <div className="flex justify-between items-center md:flex-col md:items-start">
                <p className="text-sm text-muted-foreground">Links Prepared</p>
                <p className="text-lg font-bold">{todaysBatch.totalLinks}</p>
              </div>
              <div className="flex-grow">
                <p className="text-sm text-muted-foreground">
                  Overall Completion
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <Progress
                    value={todaysBatch.completionRate}
                    className="w-full"
                  />
                  <p className="text-lg font-bold">
                    {todaysBatch.completionRate}%
                  </p>
                </div>
              </div>
            </div>
            {/* --- BADLAV: Buttons stack on mobile --- */}
            <div className="flex flex-col sm:flex-row gap-2">
              <Button onClick={() => setUploadModalOpen(true)}>
                <Upload className="mr-2 h-4 w-4" /> Upload Today's Links
              </Button>
              <Button
                variant="secondary"
                disabled={todaysBatch.status !== "Pending Distribution"}
              >
                <PlayCircle className="mr-2 h-4 w-4" /> Start Distribution
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Developer Note: The "Start Distribution" button triggers an
              automated backend process.
            </p>
          </CardContent>
        </Card>

        {/* Assignment History */}
        <Card>
          <CardHeader>
            <CardTitle>Assignment Monitoring</CardTitle>
            <CardDescription>
              View history of past assignment batches and their performance.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* --- BADLAV: Table is now scrollable on small screens --- */}
            <div className="relative w-full overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden sm:table-cell">
                      Total Links
                    </TableHead>
                    <TableHead className="hidden sm:table-cell">
                      Completion
                    </TableHead>
                    <TableHead className="text-center">Non-Compliant</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assignmentBatches.map((batch) => (
                    <TableRow key={batch.id}>
                      <TableCell className="font-semibold">
                        {batch.date}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            batch.status === "Completed"
                              ? "default"
                              : "secondary"
                          }
                        >
                          <Clock className="mr-1 h-3 w-3" /> {batch.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        {batch.totalLinks}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <span className="font-mono">
                          {batch.completionRate}%
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleOpenViewModal(batch)}
                        >
                          <AlertTriangle className="mr-2 h-4 w-4 text-red-500" />
                          {batch.nonCompliantUsers}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      <UploadLinksModal
        isOpen={isUploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
      />
      <ViewNonCompliantModal
        isOpen={isViewModalOpen}
        onClose={() => setViewModalOpen(false)}
        batch={selectedBatch}
        users={nonCompliantUsersList}
      />
    </>
  );
}
