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
import {
  Download,
  Users,
  BarChart3,
  Banknote,
  ShieldCheck,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { ExportReportModal } from "@/components/admin/reports/ExportReportModal";

// --- DUMMY DATA ---
const revenueData = [
  { name: "Jan", revenue: 40000 },
  { name: "Feb", revenue: 30000 },
  { name: "Mar", revenue: 55000 },
  { name: "Apr", revenue: 48000 },
  { name: "May", revenue: 62000 },
  { name: "Jun", revenue: 58000 },
];
const engagementData = [
  { name: "Mon", active: 400 },
  { name: "Tue", active: 450 },
  { name: "Wed", active: 500 },
  { name: "Thu", active: 480 },
  { name: "Fri", active: 600 },
  { name: "Sat", active: 700 },
  { name: "Sun", active: 750 },
];
const incomeDistributionData = [
  { name: "Direct Task", value: 70 },
  { name: "Downline", value: 30 },
];
const complianceData = [
  { user: "priya.sharma@example.com", issue: "Low Task Completion (65%)" },
  { user: "vikas.verma@example.com", issue: "Contribution Overdue" },
];
const COLORS = ["#14b8a6", "#0ea5e9"]; // Teal, Sky

export default function ReportsPage() {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    reportName: string;
  }>({ isOpen: false, reportName: "" });

  const handleOpenModal = (reportName: string) => {
    setModalState({ isOpen: true, reportName });
  };

  return (
    <>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold tracking-tight">
          Reporting & Analytics
        </h1>

        <Tabs defaultValue="performance">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="performance">Platform Performance</TabsTrigger>
            <TabsTrigger value="engagement">User Engagement</TabsTrigger>
            <TabsTrigger value="income">Income & Distribution</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
          </TabsList>

          <TabsContent value="performance">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Platform Revenue</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleOpenModal("Platform Revenue")}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={(val) => `₹${val / 1000}k`} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="engagement">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Daily Active Users (DAU)</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleOpenModal("User Engagement")}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={engagementData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar
                      dataKey="active"
                      fill="hsl(var(--primary))"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="income" className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Income Source Distribution</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleOpenModal("Income Distribution")}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={incomeDistributionData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label={(entry) => `${entry.name} ${entry.value}%`}
                    >
                      {incomeDistributionData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Top Earners</CardTitle>
                <CardDescription>
                  Users with the highest monthly earnings.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Yahan par top earners ki list aa sakti hai, abhi ke liye placeholder */}
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  Top Earners Table...
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="compliance">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Compliance Issues</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleOpenModal("Compliance Report")}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Compliance Issue</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {complianceData.map((item, i) => (
                      <TableRow key={i}>
                        <TableCell>{item.user}</TableCell>
                        <TableCell className="text-red-500 font-medium">
                          {item.issue}
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

      <ExportReportModal
        isOpen={modalState.isOpen}
        onClose={() => setModalState({ isOpen: false, reportName: "" })}
        reportName={modalState.reportName}
      />
    </>
  );
}
