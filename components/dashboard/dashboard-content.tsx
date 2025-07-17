import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Users, ArrowRight, CheckCircle, Copy, DollarSign, Download, Eye, Video } from "lucide-react"
import Link from "next/link"

const stats = [
  { title: "Total Balance", value: "₹12,450", change: "+12.5%", icon: DollarSign, color: "text-green-600 dark:text-green-400" },
  { title: "Direct Referrals", value: "23", change: "+3 this week", icon: Users, color: "text-sky-600 dark:text-sky-400" },
  { title: "Assignments Completed", value: "12/50", change: "24% completion", icon: CheckCircle, color: "text-teal-600 dark:text-teal-400" },
  { title: "AI Videos Downloaded", value: "8", change: "2 pending", icon: Video, color: "text-purple-600 dark:text-purple-400" },
];

const recentActivities = [
  { type: "assignment", title: "Daily Assignment Completed", description: "Watched and subscribed to 10 videos", time: "2 hours ago", icon: CheckCircle, color: "text-green-600 dark:text-green-400" },
  { type: "referral", title: "New Referral Joined", description: "Admin REF789012 completed registration", time: "4 hours ago", icon: Users, color: "text-sky-600 dark:text-sky-400" },
  { type: "video", title: "AI Video Ready", description: "New video available for download", time: "6 hours ago", icon: Video, color: "text-purple-600 dark:text-purple-400" },
  { type: "income", title: "Payment Received", description: "₹850 credited to your account", time: "1 day ago", icon: DollarSign, color: "text-green-600 dark:text-green-400" },
];

export function DashboardContent() {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-900 dark:to-slate-950 border border-gray-200 dark:border-slate-800 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Welcome back, John!</h2>
            <p className="text-gray-600 dark:text-slate-400">You're doing great! Keep up the momentum and continue earning.</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-gray-900 dark:text-white">₹12,450</div>
            <div className="text-gray-600 dark:text-slate-400">Total Earnings</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-slate-400">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-slate-100">{stat.value}</p>
                  <p className={`text-xs ${stat.color}`}>{stat.change}</p>
                </div>
                <div className="p-3 bg-gray-100 dark:bg-slate-800 rounded-lg">
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800">
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-gray-900 dark:text-slate-100">
              <span>Daily Assignment Progress</span>
              <Button variant="outline" size="sm" asChild>
                <Link href="/assignments">View All <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between text-sm text-gray-600 dark:text-slate-400">
              <span>Today's Progress</span>
              <span>12/50 completed</span>
            </div>
            <Progress value={24} className="h-2" />
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="text-center p-4 bg-gray-100 dark:bg-slate-800/50 rounded-lg">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">12</div>
                <div className="text-sm text-gray-600 dark:text-slate-400">Completed</div>
              </div>
              <div className="text-center p-4 bg-gray-100 dark:bg-slate-800/50 rounded-lg">
                <div className="text-2xl font-bold text-sky-600 dark:text-sky-400">38</div>
                <div className="text-sm text-gray-600 dark:text-slate-400">Remaining</div>
              </div>
            </div>
            <Button className="w-full" asChild>
              <Link href="/assignments">Continue Assignments</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800">
          <CardHeader><CardTitle className="text-gray-900 dark:text-slate-100">Quick Actions</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start" asChild><Link href="/ai-videos"><Download className="mr-2 h-4 w-4" />Download AI Video</Link></Button>
            <Button variant="outline" className="w-full justify-start" asChild><Link href="/downline"><Users className="mr-2 h-4 w-4" />View Downline</Link></Button>
            <Button variant="outline" className="w-full justify-start" asChild><Link href="/profile"><Eye className="mr-2 h-4 w-4" />Update Profile</Link></Button>
            <div className="pt-3 border-t border-gray-200 dark:border-slate-800">
              <Label className="text-sm font-medium text-gray-700 dark:text-slate-300 mb-2 block">Referral Link</Label>
              <div className="flex space-x-2">
                <Input type="text" value="https://ueiep.com/ref/REF123456" readOnly className="flex-1 px-3 py-2 text-xs rounded-md" />
                <Button size="sm" variant="outline"><Copy className="h-4 w-4"/></Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800">
          <CardHeader><CardTitle className="text-gray-900 dark:text-slate-100">Income Summary</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3 text-gray-800 dark:text-slate-300">
              <div className="flex justify-between items-center"><span className="text-sm text-gray-600 dark:text-slate-400">Assignment Earnings</span><span className="font-semibold">₹8,200</span></div>
              <div className="flex justify-between items-center"><span className="text-sm text-gray-600 dark:text-slate-400">YouTube Income</span><span className="font-semibold">₹2,850</span></div>
              <div className="flex justify-between items-center"><span className="text-sm text-gray-600 dark:text-slate-400">Referral Commissions</span><span className="font-semibold">₹1,400</span></div>
              <div className="border-t border-gray-200 dark:border-slate-800 pt-3"><div className="flex justify-between items-center"><span className="font-medium text-gray-900 dark:text-white">Total Balance</span><span className="text-xl font-bold text-primary dark:text-teal-400">₹12,450</span></div></div>
            </div>
            <Button className="w-full">Request Withdrawal</Button>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800">
          <CardHeader><CardTitle className="flex items-center text-gray-900 dark:text-slate-100">Recent Activity</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="p-2 rounded-full bg-gray-100 dark:bg-slate-800"><activity.icon className={`h-4 w-4 ${activity.color}`} /></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 dark:text-slate-200">{activity.title}</p>
                    <p className="text-sm text-gray-600 dark:text-slate-400">{activity.description}</p>
                    <p className="text-xs text-gray-500 dark:text-slate-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">View All Notifications</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}