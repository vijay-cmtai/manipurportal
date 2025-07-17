"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, AlertTriangle, Bell, CheckCircle, DollarSign, Info, Video } from "lucide-react"
import { useState } from "react"

const notifications = [
  { id: 1, type: "income", title: "Payment Received: ₹1,200", description: "Your withdrawal request has been processed and ₹1,200 credited to your UPI.", time: "2 hours ago", read: false },
  { id: 2, type: "assignment", title: "Daily Assignments Completed!", description: "Congratulations! You've completed all 50 daily assignments for today. Bonus unlocked!", time: "4 hours ago", read: false },
  { id: 3, type: "referral", title: "New Referral Joined: REF***789", description: "A new member has joined your Level 1 downline. Start earning commissions!", time: "1 day ago", read: true },
  { id: 4, type: "video", title: "New AI Video Ready for Download", description: "Your personalized AI video 'Top 5 Crypto Trends' is now available.", time: "2 days ago", read: false },
  { id: 5, type: "alert", title: "Action Required: UPI Details Update", description: "Your UPI details might be outdated. Please update them in your profile to avoid payment delays.", time: "3 days ago", read: true },
  { id: 6, type: "system", title: "Platform Maintenance Scheduled", description: "Upcoming system maintenance on July 20th, 2 AM - 4 AM IST. Services may be temporarily affected.", time: "4 days ago", read: false },
  { id: 7, type: "income", title: "Referral Commission: ₹500", description: "You earned ₹500 from your Level 2 downline activity.", time: "5 days ago", read: true },
  { id: 8, type: "assignment", title: "Reminder: Complete Daily Assignments", description: "You have 25 assignments remaining for today. Keep earning!", time: "6 days ago", read: true },
  { id: 9, type: "alert", title: "Login from New Device Detected", description: "A login was detected from a new device (Chrome on Windows, Mumbai). If this wasn't you, secure your account.", time: "1 week ago", read: false },
  { id: 10, type: "system", title: "Terms & Conditions Updated", description: "Our Terms & Conditions have been updated. Please review the latest version.", time: "1 week ago", read: true },
];

export function NotificationCenterContent() {
  const [allNotifications, setAllNotifications] = useState(notifications)

  const markAsRead = (id: number) => {
    setAllNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  const markAllAsRead = () => {
    setAllNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })))
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "income": return <DollarSign className="h-5 w-5 text-green-600 dark:text-green-400" />;
      case "assignment": return <CheckCircle className="h-5 w-5 text-teal-600 dark:text-teal-400" />;
      case "referral": return <Users className="h-5 w-5 text-sky-600 dark:text-sky-400" />;
      case "video": return <Video className="h-5 w-5 text-purple-600 dark:text-purple-400" />;
      case "alert": return <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />;
      case "system": return <Info className="h-5 w-5 text-gray-500 dark:text-slate-400" />;
      default: return <Bell className="h-5 w-5 text-gray-500 dark:text-slate-400" />;
    }
  }
  
  const unreadNotifications = allNotifications.filter((notif) => !notif.read)

  const NotificationCard = ({ notif }: { notif: typeof notifications[0] }) => (
    <div className={`p-4 flex items-start gap-4 transition-colors ${!notif.read ? 'bg-sky-50 dark:bg-slate-800/50' : 'bg-transparent opacity-80 dark:opacity-60 hover:opacity-100'}`}>
      <div className={`mt-1 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 dark:bg-slate-700/50`}>
          {getIcon(notif.type)}
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-gray-800 dark:text-slate-200">{notif.title}</h3>
        <p className="text-sm text-gray-600 dark:text-slate-400 mt-1">{notif.description}</p>
        <div className="flex justify-between items-center mt-2">
            <p className="text-xs text-gray-500 dark:text-slate-500">{notif.time}</p>
            {!notif.read && (
                <Button variant="link" size="sm" onClick={() => markAsRead(notif.id)} className="text-primary dark:text-teal-400 h-auto p-0">
                    Mark as Read
                </Button>
            )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
       <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-slate-100">Notification Center</h1>
        <p className="text-gray-600 dark:text-slate-400 text-lg">Stay updated with all your activities, alerts, and platform news.</p>
      </div>

      <Tabs defaultValue="unread" className="w-full">
        <div className="flex justify-between items-center mb-4 px-1">
          <TabsList className="bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700">
            <TabsTrigger value="unread">Unread ({unreadNotifications.length})</TabsTrigger>
            <TabsTrigger value="all">All Notifications</TabsTrigger>
          </TabsList>
          {unreadNotifications.length > 0 && (
            <Button variant="outline" onClick={markAllAsRead}>
              Mark All as Read
            </Button>
          )}
        </div>

        <TabsContent value="unread">
            {unreadNotifications.length === 0 ? (
                 <Card className="bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800">
                    <CardContent className="text-center py-20 text-gray-500 dark:text-slate-500">
                        <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-500" />
                        <p className="text-lg font-semibold text-gray-800 dark:text-slate-300">You're all caught up!</p>
                        <p className="text-sm">No new notifications at the moment.</p>
                    </CardContent>
                </Card>
            ) : (
                <div className="space-y-0 rounded-lg border border-gray-200 dark:border-slate-800 overflow-hidden">
                    {unreadNotifications.map((notif, index) => (
                       <div key={notif.id} className={index < unreadNotifications.length - 1 ? 'border-b border-gray-200 dark:border-slate-800' : ''}>
                         <NotificationCard notif={notif} />
                       </div>
                    ))}
                </div>
            )}
        </TabsContent>

        <TabsContent value="all">
             {allNotifications.length === 0 ? (
                <Card className="bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800">
                    <CardContent className="text-center py-20 text-gray-500 dark:text-slate-500">
                        <Bell className="h-12 w-12 mx-auto mb-4 text-gray-400 dark:text-slate-600" />
                        <p className="text-lg font-semibold text-gray-800 dark:text-slate-300">No notifications yet.</p>
                        <p className="text-sm">Your activity will appear here.</p>
                    </CardContent>
                </Card>
            ) : (
                 <div className="space-y-0 rounded-lg border border-gray-200 dark:border-slate-800 overflow-hidden">
                    {allNotifications.map((notif, index) => (
                        <div key={notif.id} className={index < allNotifications.length - 1 ? 'border-b border-gray-200 dark:border-slate-800' : ''}>
                           <NotificationCard notif={notif} />
                        </div>
                    ))}
                </div>
            )}
        </TabsContent>
      </Tabs>
    </div>
  )
}