// Ye User type hum har jagah use karenge
export type User = {
  id: string;
  email: string;
  mobile: string;
  youtube: "Verified" | "Pending" | "Declined" | "Not Linked";
  status: "Approved" | "Suspended";
};
export type AssignmentBatch = {
  id: string;
  date: string;
  totalLinks: number;
  status: "Completed" | "In Progress" | "Pending Distribution";
  completionRate: number;
  nonCompliantUsers: number;
};

export type NonCompliantUser = {
  id: string;
  email: string;
  tasksAssigned: number;
  tasksCompleted: number;
};
export type AiVideo = {
  id: string;
  title: string;
  topic: "Motivation" | "Technology" | "Finance" | "Health";
  type: "Short" | "Long";
  uploadDate: string;
  status: "Available" | "Assigned" | "Processing";
  assignedTo: string | null; // e.g., 'sara.khan@example.com'
  fileUrl: string;
};
export type UserIncomeProfile = {
  id: string;
  email: string;
  totalEarnings: number;
  pendingPayout: number;
  contributionStatus: "Paid" | "Pending" | "Overdue";
  incomeStatus: "Active" | "Suspended";
};
export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export type TutorialItem = {
  id: string;
  title: string;
  url: string;
};
export type AuditLog = {
  id: string;
  timestamp: string;
  adminEmail: string;
  actionType: 'UserSuspended' | 'PayoutProcessed' | 'ContentUpdated' | 'PasswordReset';
  targetUser: string | null;
  details: string; // A short summary
  rawData: object; // The full JSON payload for detailed view
};

export type ErrorLog = {
  id: string;
  timestamp: string;
  errorCode: number; // e.g., 500, 404
  errorMessage: string;
  stackTrace: string; // For developers
};