"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Users,
  ChevronDown,
  Copy,
  DollarSign,
  Eye,
  Share2,
  TrendingUp,
  Upload,
  AlertTriangle,
  Network,
} from "lucide-react";
import type React from "react";
import { useState } from "react";
import { toast } from "sonner";

const referralData = {
  referralId: "REF123456",
  referralLink: "https://ueiep.com/register?ref=REF123456",
  totalReferrals: 47,
  activeReferrals: 42,
  totalIncome: 15750,
  levels: [
    {
      level: 1,
      count: 12,
      income: 8400,
      percentage: 20,
      members: [
        {
          id: "REF***789",
          status: "Active",
          income: 850,
          joinDate: "2024-01-15",
          lastActive: "Today",
        },
        {
          id: "REF***012",
          status: "Active",
          income: 720,
          joinDate: "2024-01-18",
          lastActive: "Yesterday",
        },
        {
          id: "REF***345",
          status: "Inactive",
          income: 450,
          joinDate: "2024-01-20",
          lastActive: "3 days ago",
        },
      ],
    },
    {
      level: 2,
      count: 18,
      income: 4320,
      percentage: 20,
      members: [
        {
          id: "REF***678",
          status: "Active",
          income: 340,
          joinDate: "2024-01-22",
          lastActive: "Today",
        },
        {
          id: "REF***901",
          status: "Active",
          income: 280,
          joinDate: "2024-01-25",
          lastActive: "Today",
        },
      ],
    },
    {
      level: 3,
      count: 10,
      income: 2100,
      percentage: 20,
      members: [
        {
          id: "REF***234",
          status: "Active",
          income: 180,
          joinDate: "2024-02-01",
          lastActive: "Yesterday",
        },
      ],
    },
    {
      level: 4,
      count: 5,
      income: 750,
      percentage: 20,
      members: [
        {
          id: "REF***567",
          status: "Active",
          income: 90,
          joinDate: "2024-02-05",
          lastActive: "Today",
        },
      ],
    },
    {
      level: 5,
      count: 2,
      income: 180,
      percentage: 20,
      members: [
        {
          id: "REF***890",
          status: "Active",
          income: 45,
          joinDate: "2024-02-10",
          lastActive: "Yesterday",
        },
      ],
    },
  ],
};

export function DownlineContent() {
  const [openLevels, setOpenLevels] = useState<Record<number, boolean>>({});
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${type} copied to clipboard!`);
  };

  const toggleLevel = (level: number) => {
    setOpenLevels((prev) => ({ ...prev, [level]: !prev[level] }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      toast.success("Screenshot uploaded successfully!");
    }
  };

  const getStatusClasses = (status: string) => {
    return status === "Active"
      ? "bg-green-100 text-green-800 border-green-200 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/20"
      : "bg-gray-200 text-gray-700 border-gray-300 dark:bg-slate-700 dark:text-slate-300 dark:border-slate-600";
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-slate-100">
          Downline Management
        </h1>
        <p className="text-gray-600 dark:text-slate-400 text-lg">
          Track your referral network and monitor your passive income growth.
        </p>
      </div>

      <Card className="bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-slate-100">
            Referral & Commission System Overview
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-slate-400">
            Understand how our fair and transparent commission system works.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4 text-sm text-gray-700 dark:text-slate-300 mb-6">
            <li className="flex items-start gap-3">
              <Users className="h-5 w-5 mt-0.5 text-primary dark:text-teal-400 flex-shrink-0" />
              <span>
                Each user can refer up to <strong>six new users</strong>,
                creating a network that extends through{" "}
                <strong>five levels</strong>.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <DollarSign className="h-5 w-5 mt-0.5 text-primary dark:text-teal-400 flex-shrink-0" />
              <span>
                For every level (1 to 5), the platform distributes an equal
                commission of <strong>20%</strong> from a{" "}
                <strong>10% monthly contribution</strong> made by each user,
                based on their social media income.
              </span>
            </li>
          </ul>
          <Alert
            variant="destructive"
            className="bg-yellow-50 dark:bg-yellow-500/10 text-yellow-800 dark:text-yellow-200 border-yellow-200 dark:border-yellow-500/20"
          >
            <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
            <AlertTitle className="font-bold text-yellow-900 dark:text-yellow-100">
              Key Policies
            </AlertTitle>
            <AlertDescription>
              <ul className="list-disc pl-5 mt-2 space-y-2">
                <li>
                  Commissions are paid only after the referred users (downline)
                  submit their monthly contribution.
                </li>
                <li>
                  A user’s monthly downline earnings are released only if that
                  user contributes their own monthly share within{" "}
                  <strong>5 working days</strong>.
                </li>
                <li>
                  If the user fails to contribute, they will not receive
                  earnings for that month, and their account will be{" "}
                  <strong>deactivated</strong>.
                </li>
                <li>
                  Reactivation is possible only after submitting the pending
                  monthly income share with <strong>admin approval</strong>.
                </li>
              </ul>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 bg-sky-100 dark:bg-sky-500/10 rounded-full">
              <Users className="h-6 w-6 text-sky-600 dark:text-sky-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900 dark:text-slate-100">
                {referralData.totalReferrals}
              </div>
              <div className="text-sm text-gray-600 dark:text-slate-400">
                Total Referrals
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 bg-green-100 dark:bg-green-500/10 rounded-full">
              <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900 dark:text-slate-100">
                {referralData.activeReferrals}
              </div>
              <div className="text-sm text-gray-600 dark:text-slate-400">
                Active Members
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 bg-purple-100 dark:bg-purple-500/10 rounded-full">
              <DollarSign className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900 dark:text-slate-100">
                ₹{referralData.totalIncome.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600 dark:text-slate-400">
                Total Income
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 bg-yellow-100 dark:bg-yellow-500/10 rounded-full">
              <Network className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900 dark:text-slate-100">
                5
              </div>
              <div className="text-sm text-gray-600 dark:text-slate-400">
                Active Levels
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-slate-100">
            Referral Tools
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label
                htmlFor="referralId"
                className="text-gray-700 dark:text-slate-300"
              >
                Your Referral ID
              </Label>
              <div className="flex space-x-2">
                <Input
                  id="referralId"
                  value={referralData.referralId}
                  readOnly
                  className="bg-gray-100 dark:bg-slate-800 border-gray-300 dark:border-slate-700 text-gray-800 dark:text-slate-300"
                />
                <Button
                  variant="outline"
                  onClick={() =>
                    copyToClipboard(referralData.referralId, "Referral ID")
                  }
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="referralLink"
                className="text-gray-700 dark:text-slate-300"
              >
                Referral Link
              </Label>
              <div className="flex space-x-2">
                <Input
                  id="referralLink"
                  value={referralData.referralLink}
                  readOnly
                  className="bg-gray-100 dark:bg-slate-800 border-gray-300 dark:border-slate-700 text-gray-800 dark:text-slate-300"
                />
                <Button
                  variant="outline"
                  onClick={() =>
                    copyToClipboard(referralData.referralLink, "Referral Link")
                  }
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          <div className="flex space-x-4 pt-4 border-t border-gray-200 dark:border-slate-800">
            <Button className="bg-primary hover:bg-primary-hover text-primary-foreground dark:bg-teal-600 dark:hover:bg-teal-700 dark:text-white">
              <Share2 className="mr-2 h-4 w-4" />
              Share on WhatsApp
            </Button>
            <Button variant="outline">
              <Share2 className="mr-2 h-4 w-4" />
              Share on Telegram
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-slate-100">
            Income Breakdown by Level
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {referralData.levels.map((level) => (
            <Collapsible
              key={level.level}
              open={openLevels[level.level]}
              onOpenChange={() => toggleLevel(level.level)}
            >
              <CollapsibleTrigger className="w-full">
                {/* === BADLAAV YAHAN KIYA GAYA HAI === */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between p-4 rounded-lg bg-gray-50 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700 hover:bg-gray-100 dark:hover:border-slate-600 transition-colors">
                  {/* Left part: Level, Members, Commission */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 w-full md:w-auto">
                    <div className="flex items-center gap-4">
                      <ChevronDown
                        className={`h-5 w-5 text-gray-500 dark:text-slate-400 transition-transform duration-300 ${openLevels[level.level] ? "-rotate-180" : ""}`}
                      />
                      <span className="font-semibold text-lg text-gray-800 dark:text-slate-200">
                        Level {level.level}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{level.count} Members</Badge>
                      <Badge
                        variant="outline"
                        className="bg-green-100 text-green-800 border-green-200 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/20"
                      >
                        {level.percentage}% Commission
                      </Badge>
                    </div>
                  </div>
                  {/* Right part: Income */}
                  <div className="text-left md:text-right mt-2 md:mt-0 w-full md:w-auto">
                    <div className="text-xl font-bold text-green-600 dark:text-green-400">
                      ₹{level.income.toLocaleString()}
                    </div>
                  </div>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent className="py-2 pl-6">
                <div className="mt-2 ml-6 border-l border-gray-200 dark:border-slate-700 pl-6 space-y-3">
                  {level.members.map((member, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-md bg-gray-50 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700"
                    >
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 items-center">
                        <div className="col-span-2 sm:col-span-1">
                          <div className="font-mono text-sm text-gray-700 dark:text-slate-300">
                            {member.id}
                          </div>
                          <Badge
                            className={getStatusClasses(member.status)}
                            variant="outline"
                          >
                            {member.status}
                          </Badge>
                        </div>
                        <div className="text-left sm:text-center">
                          <div className="text-xs text-gray-500 dark:text-slate-400">
                            Income Gen.
                          </div>
                          <div className="font-semibold text-green-600 dark:text-green-400">
                            ₹{member.income}
                          </div>
                        </div>
                        <div className="text-left sm:text-center">
                          <div className="text-xs text-gray-500 dark:text-slate-400">
                            Join Date
                          </div>
                          <div className="font-medium text-gray-700 dark:text-slate-300">
                            {member.joinDate}
                          </div>
                        </div>
                        <div className="text-left sm:text-center">
                          <div className="text-xs text-gray-500 dark:text-slate-400">
                            Last Active
                          </div>
                          <div className="font-medium text-gray-700 dark:text-slate-300">
                            {member.lastActive}
                          </div>
                        </div>
                        <div className="col-span-2 sm:col-span-1 text-right">
                          <Button variant="ghost" size="sm">
                            <Eye className="mr-2 h-3 w-3" /> Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </CardContent>
      </Card>

      <Card className="bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-slate-100">
            Social Media Income Verification
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-slate-400">
            Upload your Social Media Analytics screenshot to verify channel income
            and unlock bonuses.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-gray-300 dark:border-slate-700 rounded-lg p-8 text-center bg-gray-50 dark:bg-slate-800/50">
            <Upload className="h-12 w-12 text-gray-400 dark:text-slate-500 mx-auto mb-4" />
            <p className="text-lg font-medium text-gray-800 dark:text-slate-300">
              Click to upload or drag and drop
            </p>
            <p className="text-sm text-gray-500 dark:text-slate-500 mb-4">
              PNG, JPG, or WEBP (max. 10MB)
            </p>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
              id="screenshot-upload"
            />
            <label htmlFor="screenshot-upload">
              <Button variant="outline" asChild>
                <span className="cursor-pointer">
                  <Upload className="mr-2 h-4 w-4" /> Choose File
                </span>
              </Button>
            </label>
          </div>
          {uploadedFile && (
            <Alert className="mt-4 border-green-200 dark:border-green-500/30 bg-green-50 dark:bg-green-500/10 text-green-800 dark:text-green-200">
              <Upload className="h-5 w-5 text-green-600 dark:text-green-400" />
              <AlertTitle className="text-gray-900 dark:text-white">
                File Uploaded Successfully
              </AlertTitle>
              <AlertDescription>{uploadedFile.name}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
