"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Users,
  UserCheck,
  UserPlus,
  Network,
  Wallet,
  Landmark,
  AlertTriangle,
  ShieldAlert,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// --- DUMMY DATA ---
const earningsData = [
  { name: "Jan", earnings: 4000 },
  { name: "Feb", earnings: 3000 },
  { name: "Mar", earnings: 5000 },
  { name: "Apr", earnings: 4500 },
  { name: "May", earnings: 6000 },
  { name: "Jun", earnings: 5500 },
];

const keyMetrics = [
  {
    icon: Users,
    title: "Total Users",
    value: "10,482",
    change: "+201 this week",
  },
  {
    icon: UserCheck,
    title: "Active Users",
    value: "8,210",
    change: "78.3% of total",
  },
  {
    icon: UserPlus,
    title: "New Registrations",
    subtitle: "(24h)",
    value: "+350",
    change: "Trending up",
  },
  {
    icon: Network,
    title: "Total Downline",
    value: "54,120",
    change: "+1,200 this week",
  },
  {
    icon: Wallet,
    title: "Income Paid",
    subtitle: "(Month)",
    value: "₹8,50,23",
    change: "+15% from last month",
  },
  {
    icon: Landmark,
    title: "Platform Revenue",
    value: "₹1,250,30",
    change: "+12.5% from last month",
  },
];

const criticalAlerts = [
  {
    icon: AlertTriangle,
    title: "Failed Payments",
    description:
      "5 payments failed in the last 24 hours. Please review the transaction logs.",
    variant: "destructive" as const,
  },
  {
    icon: ShieldAlert,
    title: "Suspicious Activity",
    description:
      "User 'user_xyz' has an unusually high number of referral signups. Manual verification recommended.",
    variant: "default" as const,
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6 md:space-y-8">
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
        Dashboard
      </h1>

      {/* --- ALERTS SECTION --- */}
      <div>
        <h2 className="text-lg md:text-xl font-semibold tracking-tight mb-4">
          Critical Alerts
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {criticalAlerts.map((alert, index) => (
            <Alert key={index} variant={alert.variant}>
              <alert.icon className="h-4 w-4" />
              <AlertTitle>{alert.title}</AlertTitle>
              <AlertDescription>{alert.description}</AlertDescription>
            </Alert>
          ))}
        </div>
      </div>

      {/* --- OVERVIEW / KEY METRICS SECTION --- */}
      <div>
        <h2 className="text-lg md:text-xl font-semibold tracking-tight mb-4">
          Overview
        </h2>
        {/* Responsive grid: 1 col on mobile, 2 on sm, 3 on lg, 6 on xl */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {keyMetrics.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <div className="space-y-1">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  {stat.subtitle && (
                    <p className="text-xs text-muted-foreground">
                      {stat.subtitle}
                    </p>
                  )}
                </div>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* --- CHARTS SECTION --- */}
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Platform Revenue Overview</CardTitle>
            <CardDescription>Monthly platform revenue trend.</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={earningsData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                />
                <XAxis
                  dataKey="name"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickFormatter={(value) => `₹${value / 1000}k`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--background))",
                    borderColor: "hsl(var(--border))",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="earnings"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
