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
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreHorizontal,
  Wallet,
  Banknote,
  AlertCircle,
  Ban,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { type UserIncomeProfile } from "@/lib/types";

// Import Modals
import { BulkPayoutModal } from "@/components/admin/income/BulkPayoutModal";
import { SuspendIncomeModal } from "@/components/admin/income/SuspendIncomeModal";

// --- DUMMY DATA ---
const userIncomes: UserIncomeProfile[] = [
  {
    id: "usr_1",
    email: "sara.khan@example.com",
    totalEarnings: 55000,
    pendingPayout: 12000,
    contributionStatus: "Paid",
    incomeStatus: "Active",
  },
  {
    id: "usr_2",
    email: "rohan.mehta@example.com",
    totalEarnings: 72000,
    pendingPayout: 8500,
    contributionStatus: "Paid",
    incomeStatus: "Active",
  },
  {
    id: "usr_3",
    email: "priya.sharma@example.com",
    totalEarnings: 28000,
    pendingPayout: 28000,
    contributionStatus: "Overdue",
    incomeStatus: "Suspended",
  },
  {
    id: "usr_4",
    email: "amit.singh@example.com",
    totalEarnings: 41000,
    pendingPayout: 0,
    contributionStatus: "Pending",
    incomeStatus: "Active",
  },
];

export default function IncomePage() {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [isPayoutModalOpen, setPayoutModalOpen] = useState(false);
  const [isSuspendModalOpen, setSuspendModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserIncomeProfile | null>(
    null
  );

  const handleSelectUser = (userId: string) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  // ***** CORRECTED THIS FUNCTION *****
  // It now directly accepts a boolean value, which is what onCheckedChange provides.
  const handleSelectAll = (checked: boolean | "indeterminate") => {
    if (checked === true) {
      setSelectedUsers(userIncomes.map((u) => u.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const selectedPayoutTotal = userIncomes
    .filter((u) => selectedUsers.includes(u.id))
    .reduce((sum, u) => sum + u.pendingPayout, 0);

  const handleOpenSuspendModal = (user: UserIncomeProfile) => {
    setCurrentUser(user);
    setSuspendModalOpen(true);
  };

  // Determine the checked state for the "select all" checkbox
  const isAllSelected =
    selectedUsers.length === userIncomes.length && userIncomes.length > 0;
  const isSomeSelected =
    selectedUsers.length > 0 && selectedUsers.length < userIncomes.length;

  return (
    <>
      <div className="space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-3xl font-bold tracking-tight">
            Income & Finance
          </h1>
          <Button
            onClick={() => setPayoutModalOpen(true)}
            disabled={selectedUsers.length === 0}
          >
            Process Bulk Payout ({selectedUsers.length})
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Total Pending Payouts
              </CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ₹
                {userIncomes
                  .reduce((s, u) => s + u.pendingPayout, 0)
                  .toLocaleString()}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Contributions Due
              </CardTitle>
              <Banknote className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {
                  userIncomes.filter((u) => u.contributionStatus !== "Paid")
                    .length
                }{" "}
                Users
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Income Suspended Accounts
              </CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {
                  userIncomes.filter((u) => u.incomeStatus === "Suspended")
                    .length
                }
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="payouts">
          <TabsList>
            <TabsTrigger value="payouts">Payout Management</TabsTrigger>
            <TabsTrigger value="contributions">
              Contribution Tracking
            </TabsTrigger>
          </TabsList>

          <TabsContent value="payouts">
            <Card>
              <CardHeader>
                <CardTitle>User Payouts</CardTitle>
                <CardDescription>
                  Select users to process bulk payouts via integrated payment
                  gateway.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">
                        {/* ***** CORRECTED THIS COMPONENT ***** */}
                        <Checkbox
                          checked={
                            isAllSelected
                              ? true
                              : isSomeSelected
                                ? "indeterminate"
                                : false
                          }
                          onCheckedChange={handleSelectAll}
                        />
                      </TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Total Earnings</TableHead>
                      <TableHead>Pending Payout</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {userIncomes.map((user) => (
                      <TableRow
                        key={user.id}
                        data-state={
                          selectedUsers.includes(user.id) && "selected"
                        }
                      >
                        <TableCell>
                          <Checkbox
                            checked={selectedUsers.includes(user.id)}
                            onCheckedChange={() => handleSelectUser(user.id)}
                          />
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          ₹{user.totalEarnings.toLocaleString()}
                        </TableCell>
                        <TableCell className="font-semibold">
                          ₹{user.pendingPayout.toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contributions">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Contribution Status</CardTitle>
                <CardDescription>
                  Monitor user contribution compliance and take necessary
                  actions.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Contribution Status</TableHead>
                      <TableHead>Income Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {userIncomes.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              user.contributionStatus === "Paid"
                                ? "default"
                                : user.contributionStatus === "Pending"
                                  ? "secondary"
                                  : "destructive"
                            }
                          >
                            {user.contributionStatus}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              user.incomeStatus === "Active"
                                ? "default"
                                : "destructive"
                            }
                          >
                            {user.incomeStatus}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem
                                onSelect={() => handleOpenSuspendModal(user)}
                              >
                                <Ban className="mr-2 h-4 w-4" />
                                Suspend/Reactivate Income
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
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

      {/* Modals */}
      <BulkPayoutModal
        isOpen={isPayoutModalOpen}
        onClose={() => setPayoutModalOpen(false)}
        userCount={selectedUsers.length}
        totalAmount={selectedPayoutTotal}
      />
      <SuspendIncomeModal
        isOpen={isSuspendModalOpen}
        onClose={() => setSuspendModalOpen(false)}
        user={currentUser}
      />
    </>
  );
}
