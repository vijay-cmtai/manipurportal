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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Filter, Eye } from "lucide-react";
import { type AuditLog, type ErrorLog } from "@/lib/types";
import { LogDetailsModal } from "@/components/admin/security/LogDetailsModal";

// --- DUMMY DATA ---
const dummyAuditLogs: AuditLog[] = [
  {
    id: "log_a1",
    timestamp: "2023-10-28 10:30 AM",
    adminEmail: "admin@example.com",
    actionType: "UserSuspended",
    targetUser: "priya.sharma@example.com",
    details: "Suspended due to non-compliance.",
    rawData: {
      userId: "usr_3",
      reason: "Non-compliance with contribution policy",
    },
  },
  {
    id: "log_a2",
    timestamp: "2023-10-28 09:15 AM",
    adminEmail: "finance@example.com",
    actionType: "PayoutProcessed",
    targetUser: "Bulk (15 users)",
    details: "Total payout of ₹85,000 processed.",
    rawData: { userCount: 15, totalAmount: 85000, transactionId: "txn_12345" },
  },
  {
    id: "log_a3",
    timestamp: "2023-10-27 05:00 PM",
    adminEmail: "admin@example.com",
    actionType: "ContentUpdated",
    targetUser: null,
    details: "Updated the Terms & Conditions page.",
    rawData: { page: "Terms", version: "2.1" },
  },
];

const dummyErrorLogs: ErrorLog[] = [
  {
    id: "log_e1",
    timestamp: "2023-10-28 11:00 AM",
    errorCode: 500,
    errorMessage: "Database connection failed: Timeout expired.",
    stackTrace: "at /app/lib/db.ts:25\nat /app/api/users/route.ts:10",
  },
  {
    id: "log_e2",
    timestamp: "2023-10-28 10:45 AM",
    errorCode: 404,
    errorMessage: "User profile not found for ID: usr_999",
    stackTrace: "at /app/api/users/[id]/route.ts:15",
  },
];

export default function SecurityPage() {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    title: string;
    data: object | string | null;
  }>({ isOpen: false, title: "", data: null });

  const openLogDetails = (title: string, data: object | string | null) => {
    setModalState({ isOpen: true, title, data });
  };

  return (
    <>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold tracking-tight">
          Security & Logging
        </h1>

        <Tabs defaultValue="audit">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="audit">Audit Trails</TabsTrigger>
            <TabsTrigger value="errors">Error Logs</TabsTrigger>
          </TabsList>

          <TabsContent value="audit" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Admin Action Logs</CardTitle>
                <CardDescription>
                  Detailed records of all administrative actions taken on the
                  platform.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Filter Bar */}
                <div className="flex items-center gap-2 mb-4">
                  <Input
                    placeholder="Filter by admin, user, or action..."
                    className="max-w-sm"
                  />
                  <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" /> Apply Filter
                  </Button>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>Admin</TableHead>
                      <TableHead>Action</TableHead>
                      <TableHead>Target</TableHead>
                      <TableHead>Details</TableHead>
                      <TableHead className="text-right">View Raw</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dummyAuditLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell>{log.timestamp}</TableCell>
                        <TableCell>{log.adminEmail}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{log.actionType}</Badge>
                        </TableCell>
                        <TableCell>{log.targetUser || "N/A"}</TableCell>
                        <TableCell>{log.details}</TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                              openLogDetails(
                                `Audit Log: ${log.id}`,
                                log.rawData
                              )
                            }
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="errors" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>System Error Logs</CardTitle>
                <CardDescription>
                  Comprehensive logs for developers to diagnose and fix platform
                  issues.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 mb-4">
                  <Input
                    placeholder="Filter by error code or message..."
                    className="max-w-sm"
                  />
                  <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" /> Apply Filter
                  </Button>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>Code</TableHead>
                      <TableHead>Error Message</TableHead>
                      <TableHead className="text-right">View Stack</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dummyErrorLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell>{log.timestamp}</TableCell>
                        <TableCell>
                          <Badge variant="destructive">{log.errorCode}</Badge>
                        </TableCell>
                        <TableCell className="font-mono">
                          {log.errorMessage}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                              openLogDetails(
                                `Error Log: ${log.id}`,
                                log.stackTrace
                              )
                            }
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <LogDetailsModal
        isOpen={modalState.isOpen}
        onClose={() => setModalState({ ...modalState, isOpen: false })}
        title={modalState.title}
        logData={modalState.data}
      />
    </>
  );
}
