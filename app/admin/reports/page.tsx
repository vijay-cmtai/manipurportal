"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download } from "lucide-react";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ExportReportModal } from "@/components/admin/reports/ExportReportModal";

const revenueData = [{ name: "Jan", revenue: 40000 }, { name: "Feb", revenue: 30000 }, { name: "Mar", revenue: 55000 }, { name: "Apr", revenue: 48000 }, { name: "May", revenue: 62000 }, { name: "Jun", revenue: 58000 }];
const engagementData = [{ name: "Mon", active: 400 }, { name: "Tue", active: 450 }, { name: "Wed", active: 500 }, { name: "Thu", active: 480 }, { name: "Fri", active: 600 }, { name: "Sat", active: 700 }, { name: "Sun", active: 750 }];
const incomeDistributionData = [{ name: "Direct Task", value: 70 }, { name: "Downline", value: 30 }];
const complianceData = [{ user: "priya.sharma@example.com", issue: "Low Task Completion (65%)" }, { user: "vikas.verma@example.com", issue: "Contribution Overdue" }];
const COLORS = ["#14b8a6", "#0ea5e9"];

export default function ReportsPage() {
  const [modalState, setModalState] = useState<{ isOpen: boolean; reportName: string }>({ isOpen: false, reportName: "" });
  const handleOpenModal = (reportName: string) => { setModalState({ isOpen: true, reportName }); };

  return (
    <>
      <div className="space-y-6 md:space-y-8">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Reporting & Analytics</h1>

        <Tabs defaultValue="performance">
          {/* --- BADLAV: Scrollable Tabs List --- */}
          <div className="relative w-full overflow-x-auto">
            <TabsList>
              <TabsTrigger value="performance">Platform Performance</TabsTrigger>
              <TabsTrigger value="engagement">User Engagement</TabsTrigger>
              <TabsTrigger value="income">Income</TabsTrigger>
              <TabsTrigger value="compliance">Compliance</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="performance" className="mt-4">
            <Card>
              <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div><CardTitle>Platform Revenue</CardTitle><CardDescription className="text-xs sm:text-sm">Monthly revenue trend.</CardDescription></div>
                <Button variant="outline" size="sm" onClick={() => handleOpenModal("Platform Revenue")}><Download className="mr-2 h-4 w-4" />Export</Button>
              </CardHeader>
              <CardContent><ResponsiveContainer width="100%" height={350}><LineChart data={revenueData}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" /><YAxis tickFormatter={(val) => `₹${val / 1000}k`} /><Tooltip /><Line type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={2} /></LineChart></ResponsiveContainer></CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="engagement" className="mt-4">
             <Card>
              <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div><CardTitle>Daily Active Users (DAU)</CardTitle><CardDescription className="text-xs sm:text-sm">Weekly active user trend.</CardDescription></div>
                <Button variant="outline" size="sm" onClick={() => handleOpenModal("User Engagement")}><Download className="mr-2 h-4 w-4" />Export</Button>
              </CardHeader>
              <CardContent><ResponsiveContainer width="100%" height={350}><BarChart data={engagementData}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" /><YAxis /><Tooltip /><Bar dataKey="active" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} /></BarChart></ResponsiveContainer></CardContent>
            </Card>
          </TabsContent>
          
          {/* --- BADLAV: Responsive Grid --- */}
          <TabsContent value="income" className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between"><CardTitle>Income Source Distribution</CardTitle><Button variant="outline" size="sm" onClick={() => handleOpenModal("Income Distribution")}><Download className="mr-2 h-4 w-4" />Export</Button></CardHeader>
              <CardContent><ResponsiveContainer width="100%" height={300}><PieChart><Pie data={incomeDistributionData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label={(entry) => `${entry.name} ${entry.value}%`}>{incomeDistributionData.map((entry, index) => (<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />))}</Pie><Tooltip /></PieChart></ResponsiveContainer></CardContent>
            </Card>
            <Card><CardHeader><CardTitle>Top Earners</CardTitle><CardDescription>Users with the highest monthly earnings.</CardDescription></CardHeader><CardContent><div className="flex items-center justify-center h-full text-muted-foreground">Top Earners Table...</div></CardContent></Card>
          </TabsContent>

          <TabsContent value="compliance" className="mt-4">
            <Card>
              <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div><CardTitle>Compliance Issues</CardTitle><CardDescription className="text-xs sm:text-sm">Users with compliance warnings.</CardDescription></div>
                <Button variant="outline" size="sm" onClick={() => handleOpenModal("Compliance Report")}><Download className="mr-2 h-4 w-4" />Export</Button>
              </CardHeader>
              <CardContent>
                <div className="relative w-full overflow-auto">
                  <Table><TableHeader><TableRow><TableHead>User</TableHead><TableHead>Compliance Issue</TableHead></TableRow></TableHeader><TableBody>{complianceData.map((item, i) => (<TableRow key={i}><TableCell>{item.user}</TableCell><TableCell className="text-red-500 font-medium">{item.issue}</TableCell></TableRow>))}</TableBody></Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <ExportReportModal isOpen={modalState.isOpen} onClose={() => setModalState({ isOpen: false, reportName: "" })} reportName={modalState.reportName} />
    </>
  );
}