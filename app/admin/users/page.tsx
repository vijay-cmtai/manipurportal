"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  MoreHorizontal,
  ShieldX,
  Edit,
  KeyRound,
  FileClock,
  Youtube,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { SuspendUserModal } from "@/components/admin/users/SuspendUserModal";
import { EditUserDetailsModal } from "@/components/admin/users/EditUserDetailsModal";
import { ResetPasswordModal } from "@/components/admin/users/ResetPasswordModal";
import { ViewComplianceModal } from "@/components/admin/users/ViewComplianceModal";
import { ApproveYoutubeModal } from "@/components/admin/users/ApproveYoutubeModal";

type User = {
  id: string;
  email: string;
  mobile: string;
  youtube: "Verified" | "Pending" | "Declined" | "Not Linked";
  status: "Approved" | "Suspended";
};
type ModalType =
  | "suspend"
  | "edit"
  | "resetPassword"
  | "compliance"
  | "youtube";

const users: User[] = [
  {
    id: "usr_1",
    email: "sara.khan@example.com",
    mobile: "9876543210",
    youtube: "Verified",
    status: "Approved",
  },
  {
    id: "usr_2",
    email: "rohan.mehta@example.com",
    mobile: "8765432109",
    youtube: "Pending",
    status: "Approved",
  },
  {
    id: "usr_3",
    email: "priya.sharma@example.com",
    mobile: "7654321098",
    youtube: "Not Linked",
    status: "Suspended",
  },
  {
    id: "usr_4",
    email: "amit.singh@example.com",
    mobile: "6543210987",
    youtube: "Declined",
    status: "Approved",
  },
];

export default function UsersPage() {
  const [modalOpen, setModalOpen] = useState<ModalType | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleOpenModal = (type: ModalType, user: User) => {
    setSelectedUser(user);
    setModalOpen(type);
  };
  const handleCloseModal = () => {
    setModalOpen(null);
    setSelectedUser(null);
  };

  const getYoutubeBadge = (status: User["youtube"]) => {
    switch (status) {
      case "Verified":
        return (
          <Badge>
            <CheckCircle className="mr-1 h-3 w-3" />
            {status}
          </Badge>
        );
      case "Pending":
        return <Badge variant="secondary">{status}</Badge>;
      case "Declined":
        return (
          <Badge variant="destructive">
            <XCircle className="mr-1 h-3 w-3" />
            {status}
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
          <CardDescription>
            Approve, suspend, and manage all users on the platform.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* --- BADLAV: Scrollable Table --- */}
          <div className="relative w-full overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User Email</TableHead>
                  <TableHead className="hidden md:table-cell">Mobile</TableHead>
                  <TableHead className="hidden sm:table-cell">
                    YouTube
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <Link
                        href={`/admin/users/${user.id}`}
                        className="font-medium text-primary hover:underline"
                      >
                        {user.email}
                      </Link>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {user.mobile}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {getYoutubeBadge(user.youtube)}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          user.status === "Approved" ? "default" : "destructive"
                        }
                      >
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem
                            onSelect={() => handleOpenModal("youtube", user)}
                          >
                            <Youtube className="mr-2 h-4 w-4 text-red-600" />{" "}
                            Social Media
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onSelect={() => handleOpenModal("suspend", user)}
                          >
                            <ShieldX className="mr-2 h-4 w-4 text-red-500" />{" "}
                            Suspend/Activate
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onSelect={() => handleOpenModal("compliance", user)}
                          >
                            <FileClock className="mr-2 h-4 w-4" /> View
                            Compliance
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onSelect={() => handleOpenModal("edit", user)}
                          >
                            <Edit className="mr-2 h-4 w-4" /> Edit Details
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onSelect={() =>
                              handleOpenModal("resetPassword", user)
                            }
                          >
                            <KeyRound className="mr-2 h-4 w-4" /> Reset Password
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {selectedUser && (
        <>
          <ApproveYoutubeModal
            user={selectedUser}
            isOpen={modalOpen === "youtube"}
            onClose={handleCloseModal}
          />
          <SuspendUserModal
            user={selectedUser}
            isOpen={modalOpen === "suspend"}
            onClose={handleCloseModal}
          />
          <ViewComplianceModal
            user={selectedUser}
            isOpen={modalOpen === "compliance"}
            onClose={handleCloseModal}
          />
          <EditUserDetailsModal
            user={selectedUser}
            isOpen={modalOpen === "edit"}
            onClose={handleCloseModal}
          />
          <ResetPasswordModal
            user={selectedUser}
            isOpen={modalOpen === "resetPassword"}
            onClose={handleCloseModal}
          />
        </>
      )}
    </>
  );
}
