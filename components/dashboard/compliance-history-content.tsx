"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AlertTriangle, CheckCircle, XCircle, Info, FileText } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"

const complianceRecords = [
  { id: 1, date: "2024-07-14", type: "Assignment Completion", status: "Pass", details: "Daily assignments completed: 50/50. Perfect score.", actionTaken: "None", severity: "info" },
  { id: 2, date: "2024-07-12", type: "Social Media Content Upload", status: "Warning", details: "AI Video 'Top 5 Crypto Trends' uploaded late (24 hours delay).", actionTaken: "Email reminder sent.", severity: "warning" },
  { id: 3, date: "2024-07-10", type: "Referral Policy", status: "Pass", details: "No policy violations detected in referral activity.", actionTaken: "None", severity: "info" },
  { id: 4, date: "2024-07-08", type: "Assignment Completion", status: "Fail", details: "Daily assignments completed: 30/50. Below target.", actionTaken: "Reduced assignment allocation for 2 days.", severity: "error" },
  { id: 5, date: "2024-07-05", type: "Profile Verification", status: "Pass", details: "UPI details verified successfully.", actionTaken: "None", severity: "info" },
  { id: 6, date: "2024-07-01", type: "Terms & Conditions", status: "Pass", details: "Accepted latest Terms & Conditions.", actionTaken: "None", severity: "info" },
  { id: 7, date: "2024-06-28", type: "Social Media Content Policy", status: "Warning", details: "Minor copyright claim on 'Best Gaming Setups' video. Resolved.", actionTaken: "Guidance provided on content sourcing.", severity: "warning" },
  { id: 8, date: "2024-06-20", type: "Login Security", status: "Pass", details: "Successful login from new device after OTP verification.", actionTaken: "None", severity: "info" },
  { id: 9, date: "2024-06-15", type: "Assignment Completion", status: "Fail", details: "Daily assignments completed: 20/50. Significant underperformance.", actionTaken: "Account temporarily suspended for 24 hours.", severity: "error" },
];

export function ComplianceHistoryContent() {
  const [filterStatus, setFilterStatus] = useState("all")

  const filteredRecords = complianceRecords.filter((record) => {
    return filterStatus === "all" || record.status.toLowerCase() === filterStatus
  })

  const getStatusClasses = (status: string) => {
    switch (status) {
      case "Pass": return "bg-green-100 text-green-800 border-green-200 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/20";
      case "Warning": return "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-500/10 dark:text-yellow-400 dark:border-yellow-500/20";
      case "Fail": return "bg-red-100 text-red-800 border-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20";
      default: return "bg-gray-200 text-gray-700 dark:bg-slate-700 dark:text-slate-300";
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "info": return <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />;
      case "warning": return <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />;
      case "error": return <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />;
      default: return null;
    }
  }

  const summaryCards = [
    { icon: CheckCircle, title: "Total Passes", value: complianceRecords.filter(r => r.status === 'Pass').length, color: "text-green-600 dark:text-green-400" },
    { icon: AlertTriangle, title: "Total Warnings", value: complianceRecords.filter(r => r.status === 'Warning').length, color: "text-yellow-600 dark:text-yellow-400" },
    { icon: XCircle, title: "Total Failures", value: complianceRecords.filter(r => r.status === 'Fail').length, color: "text-red-600 dark:text-red-400" },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-slate-100">Compliance History</h1>
        <p className="text-gray-600 dark:text-slate-400 text-lg">Review your platform compliance, warnings, and penalties.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {summaryCards.map(item => (
            <Card key={item.title} className="bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800">
                <CardContent className="p-6 text-center">
                    <item.icon className={`h-8 w-8 ${item.color} mx-auto mb-3`} />
                    <p className="text-sm font-medium text-gray-600 dark:text-slate-400">{item.title}</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-slate-100">{item.value}</p>
                </CardContent>
            </Card>
        ))}
      </div>

      <Card className="bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
                <CardTitle className="text-gray-900 dark:text-slate-100">Compliance Records</CardTitle>
                <CardDescription className="text-gray-600 dark:text-slate-400 mt-1">A detailed log of all your compliance activities.</CardDescription>
            </div>
            <Tabs defaultValue="all" onValueChange={setFilterStatus} className="w-full md:w-auto">
              <TabsList className="grid w-full grid-cols-4 bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="pass">Pass</TabsTrigger>
                <TabsTrigger value="warning">Warning</TabsTrigger>
                <TabsTrigger value="fail">Fail</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader><TableRow className="border-gray-200 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-800/50">
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Details</TableHead>
                  <TableHead>Action Taken</TableHead>
              </TableRow></TableHeader>
              <TableBody>
                {filteredRecords.length === 0 ? (
                  <TableRow><TableCell colSpan={5} className="text-center py-12 text-gray-500 dark:text-slate-500">
                    <FileText className="h-12 w-12 mx-auto mb-4 text-gray-400 dark:text-slate-600" />
                    <p className="text-lg font-semibold text-gray-800 dark:text-slate-300">No records found for this filter.</p>
                  </TableCell></TableRow>
                ) : (
                  filteredRecords.map((record) => (
                    <TableRow key={record.id} className="border-gray-200 dark:border-slate-800">
                      <TableCell className="text-gray-800 dark:text-slate-300">{record.date}</TableCell>
                      <TableCell className="font-medium text-gray-900 dark:text-slate-200">{record.type}</TableCell>
                      <TableCell><Badge className={getStatusClasses(record.status)} variant="outline"><div className="flex items-center gap-1">{getSeverityIcon(record.severity)}<span>{record.status}</span></div></Badge></TableCell>
                      <TableCell className="text-sm text-gray-600 dark:text-slate-400 max-w-xs truncate">{record.details}</TableCell>
                      <TableCell className="text-sm text-gray-600 dark:text-slate-400">{record.actionTaken}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      <Alert className="border-sky-200 dark:border-sky-500/30 bg-sky-50 dark:bg-sky-500/10 text-sky-800 dark:text-sky-200">
        <Info className="h-5 w-5 text-sky-600 dark:text-sky-400" />
        <AlertTitle className="font-bold text-gray-900 dark:text-white">Understanding Compliance</AlertTitle>
        <AlertDescription className="mt-2 space-y-1 text-sm">
            <p>Maintaining good compliance ensures smooth operations and maximizes your earning potential.</p>
            <ul className="list-disc pl-5 text-sky-700/80 dark:text-sky-300/80">
                <li><strong>Assignments:</strong> Aim for 100% completion daily.</li>
                <li><strong>Content:</strong> Upload AI videos promptly and adhere to Social Media's guidelines.</li>
                <li><strong>Referrals:</strong> Avoid fraudulent referrals or spamming.</li>
            </ul>
            <p className="pt-1">For details, see our <a href="/terms" className="underline font-semibold">Terms & Conditions</a>.</p>
        </AlertDescription>
      </Alert>
    </div>
  )
}