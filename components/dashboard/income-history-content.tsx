"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Users, ArrowDown, ArrowUp, CheckCircle, DollarSign, Filter, Search, TrendingUp, Video } from "lucide-react"
import { useState } from "react"

const incomeSummary = {
  totalBalance: 12450,
  totalWithdrawn: 45000,
  totalReferralEarnings: 15750,
  totalAssignmentEarnings: 30000,
  totalYoutubeEarnings: 11700,
}

const transactions = [
  { id: "TXN001", date: "2024-07-15", type: "Withdrawal", category: "Payout", amount: -5000, status: "Completed", description: "UPI Withdrawal to John Doe@paytm" },
  { id: "TXN002", date: "2024-07-14", type: "Credit", category: "Assignment", amount: 850, status: "Completed", description: "Daily Assignments Bonus" },
  { id: "TXN003", date: "2024-07-14", type: "Credit", category: "Referral", amount: 120, status: "Completed", description: "Level 1 Referral Commission (REF***789)" },
  { id: "TXN004", date: "2024-07-13", type: "Credit", category: "YouTube", amount: 1500, status: "Completed", description: "YouTube Revenue Share - July Week 2" },
  { id: "TXN005", date: "2024-07-13", type: "Credit", category: "Assignment", amount: 700, status: "Completed", description: "Daily Assignments" },
  { id: "TXN006", date: "2024-07-12", type: "Credit", category: "Referral", amount: 50, status: "Completed", description: "Level 2 Referral Commission (REF***012)" },
  { id: "TXN007", date: "2024-07-11", type: "Withdrawal", category: "Payout", amount: -10000, status: "Pending", description: "UPI Withdrawal to John Doe@paytm" },
  { id: "TXN008", date: "2024-07-10", type: "Credit", category: "Assignment", amount: 900, status: "Completed", description: "Daily Assignments" },
  { id: "TXN009", date: "2024-07-09", type: "Credit", category: "Referral", amount: 250, status: "Completed", description: "Level 1 Referral Commission (REF***345)" },
  { id: "TXN010", date: "2024-07-08", type: "Credit", category: "YouTube", amount: 1200, status: "Completed", description: "YouTube Revenue Share - July Week 1" },
]

export function IncomeHistoryContent() {
  const [filterType, setFilterType] = useState("all")
  const [filterCategory, setFilterCategory] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("date")
  const [sortOrder, setSortOrder] = useState("desc")

  const filteredTransactions = transactions
    .filter((txn) => {
      const matchesType = filterType === "all" || txn.type === filterType
      const matchesCategory = filterCategory === "all" || txn.category === filterCategory
      const matchesSearch = searchTerm === "" || txn.description.toLowerCase().includes(searchTerm.toLowerCase()) || txn.id.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesType && matchesCategory && matchesSearch
    })
    .sort((a, b) => {
      let compareA: any, compareB: any
      if (sortBy === "date") {
        compareA = new Date(a.date).getTime()
        compareB = new Date(b.date).getTime()
      } else if (sortBy === "amount") {
        compareA = a.amount
        compareB = b.amount
      } else return 0
      return sortOrder === "asc" ? compareA - compareB : compareB - compareA
    })

  const getStatusClasses = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-100 text-green-800 border-green-200 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/20";
      case "Pending": return "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-500/10 dark:text-yellow-400 dark:border-yellow-500/20";
      case "Failed": return "bg-red-100 text-red-800 border-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20";
      default: return "bg-gray-200 text-gray-700 dark:bg-slate-700 dark:text-slate-300";
    }
  }

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("desc");
    }
  };

  const summaryCards = [
    { icon: DollarSign, title: "Current Balance", value: incomeSummary.totalBalance, color: "text-teal-600 dark:text-teal-400" },
    { icon: TrendingUp, title: "Total Withdrawn", value: incomeSummary.totalWithdrawn, color: "text-green-600 dark:text-green-400" },
    { icon: Users, title: "Referral Earnings", value: incomeSummary.totalReferralEarnings, color: "text-sky-600 dark:text-sky-400" },
    { icon: CheckCircle, title: "Assignment Earnings", value: incomeSummary.totalAssignmentEarnings, color: "text-purple-600 dark:text-purple-400" },
    { icon: Video, title: "YouTube Earnings", value: incomeSummary.totalYoutubeEarnings, color: "text-orange-600 dark:text-orange-400" },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-slate-100">Income History</h1>
        <p className="text-gray-600 dark:text-slate-400 text-lg">Track all your earnings, withdrawals, and platform transactions.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {summaryCards.map(item => (
            <Card key={item.title} className="bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800">
                <CardContent className="p-4 text-center">
                    <item.icon className={`h-8 w-8 ${item.color} mx-auto mb-2`} />
                    <p className="text-sm font-medium text-gray-600 dark:text-slate-400">{item.title}</p>
                    <p className="text-xl font-bold text-gray-900 dark:text-slate-100">₹{item.value.toLocaleString()}</p>
                </CardContent>
            </Card>
        ))}
      </div>
      
      <Card className="bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800">
        <CardContent className="p-4 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2"><Label htmlFor="search" className="text-gray-700 dark:text-slate-300">Search Transaction</Label><div className="relative"><Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-slate-500 h-4 w-4" /><Input id="search" placeholder="ID or description..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" /></div></div>
            <div className="space-y-2"><Label htmlFor="filterType" className="text-gray-700 dark:text-slate-300">Transaction Type</Label><Select value={filterType} onValueChange={setFilterType}><SelectTrigger id="filterType"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">All</SelectItem><SelectItem value="Credit">Credit</SelectItem><SelectItem value="Withdrawal">Withdrawal</SelectItem></SelectContent></Select></div>
            <div className="space-y-2"><Label htmlFor="filterCategory" className="text-gray-700 dark:text-slate-300">Category</Label><Select value={filterCategory} onValueChange={setFilterCategory}><SelectTrigger id="filterCategory"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">All</SelectItem><SelectItem value="Assignment">Assignment</SelectItem><SelectItem value="Referral">Referral</SelectItem><SelectItem value="YouTube">YouTube</SelectItem><SelectItem value="Payout">Payout</SelectItem></SelectContent></Select></div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800">
        <CardHeader><CardTitle className="text-gray-900 dark:text-slate-100">All Transactions</CardTitle><CardDescription className="text-gray-600 dark:text-slate-400">A detailed log of all your financial activities.</CardDescription></CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader><TableRow className="border-gray-200 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-800/50">
                  <TableHead>Transaction ID</TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort('date')}><div className="flex items-center gap-1">Date {sortBy === 'date' && (sortOrder === 'asc' ? <ArrowUp size={14}/> : <ArrowDown size={14}/>)}</div></TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right cursor-pointer" onClick={() => handleSort('amount')}><div className="flex items-center justify-end gap-1">Amount (₹) {sortBy === 'amount' && (sortOrder === 'asc' ? <ArrowUp size={14}/> : <ArrowDown size={14}/>)}</div></TableHead>
                  <TableHead>Status</TableHead>
              </TableRow></TableHeader>
              <TableBody>
                {filteredTransactions.length === 0 ? (
                  <TableRow><TableCell colSpan={6} className="text-center py-12 text-gray-500 dark:text-slate-500"><Filter className="h-12 w-12 mx-auto mb-4 text-gray-400 dark:text-slate-600" /><p className="text-lg font-semibold text-gray-800 dark:text-slate-300">No transactions found.</p><p>Try adjusting your search or filters.</p></TableCell></TableRow>
                ) : (
                  filteredTransactions.map((txn) => (
                    <TableRow key={txn.id} className="border-gray-200 dark:border-slate-800">
                      <TableCell className="font-mono text-xs text-gray-500 dark:text-slate-400">{txn.id}</TableCell>
                      <TableCell className="text-gray-800 dark:text-slate-300">{txn.date}</TableCell>
                      <TableCell><Badge variant="outline" className={txn.type === "Credit" ? "text-green-600 border-green-200 dark:text-green-400 dark:border-green-400/50" : "text-red-600 border-red-200 dark:text-red-400 dark:border-red-400/50"}>{txn.type}</Badge></TableCell>
                      <TableCell className="text-gray-800 dark:text-slate-300">{txn.category}</TableCell>
                      <TableCell className={`text-right font-semibold ${txn.type === "Credit" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>{txn.type === "Credit" ? "+" : ""}₹{Math.abs(txn.amount).toLocaleString()}</TableCell>
                      <TableCell><Badge className={getStatusClasses(txn.status)} variant="outline">{txn.status}</Badge></TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}