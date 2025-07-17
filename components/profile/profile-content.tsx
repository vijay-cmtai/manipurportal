"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Bell, CreditCard, Eye, EyeOff, FileText, HelpCircle, Lock, LogOut, Mail, Shield, Smartphone } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

export function ProfileContent() {
  const [showPassword, setShowPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [formData, setFormData] = useState({
    fullName: "John Doe", email: "john.doe@example.com", mobile: "9876543210", upiName: "John Doe",
    upiId: "john@paytm", currentPassword: "", newPassword: "", confirmPassword: "",
  })
  const [notifications, setNotifications] = useState({ email: true, inApp: true, sms: false, marketing: true })

  const devices = [
    { id: 1, name: "iPhone 13", location: "Mumbai, India", lastActive: "Active now", current: true },
    { id: 2, name: "Chrome on Windows", location: "Mumbai, India", lastActive: "2 hours ago", current: false },
    { id: 3, name: "Android App", location: "Delhi, India", lastActive: "1 day ago", current: false },
  ]

  const calculatePasswordStrength = (password: string) => {
    let strength = 0
    if (password.length >= 8) strength += 25
    if (/[A-Z]/.test(password)) strength += 25
    if (/[0-9]/.test(password)) strength += 25
    if (/[^A-Za-z0-9]/.test(password)) strength += 25
    return strength
  }

  const handlePasswordChange = (password: string) => {
    setFormData((prev) => ({ ...prev, newPassword: password }))
    setPasswordStrength(calculatePasswordStrength(password))
  }

  const handleSave = (section: string) => {
    toast.success(`${section} updated successfully!`)
  }

  const getStrengthColor = () => {
    if (passwordStrength < 50) return "bg-red-500"
    if (passwordStrength < 75) return "bg-yellow-500"
    return "bg-green-500"
  }

  const getStrengthText = () => {
    if (passwordStrength < 25) return "Weak"
    if (passwordStrength < 50) return "Fair"
    if (passwordStrength < 75) return "Good"
    return "Strong"
  }

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">Profile & Settings</h1>
        <p className="text-gray-600 dark:text-slate-400 text-lg">Manage your account settings and preferences</p>
      </div>

      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 h-auto">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="devices">Devices</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="support">Support</TabsTrigger>
        </TabsList>

        <TabsContent value="personal">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800">
              <CardHeader><CardTitle className="flex items-center gap-2"><User />Personal Information</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2"><Label htmlFor="fullName">Full Name</Label><Input id="fullName" value={formData.fullName} onChange={(e) => setFormData((prev) => ({ ...prev, fullName: e.target.value }))}/></div>
                <div className="space-y-2"><Label htmlFor="email">Email Address</Label><div className="flex space-x-2"><Input id="email" type="email" value={formData.email} onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))} /><Button variant="outline" size="sm">Verify</Button></div><p className="text-xs text-gray-500 dark:text-slate-500">Email verification is required for changes.</p></div>
                <div className="space-y-2"><Label htmlFor="mobile">Mobile Number</Label><div className="flex space-x-2"><Input id="mobile" value={formData.mobile} onChange={(e) => setFormData((prev) => ({ ...prev, mobile: e.target.value }))} /><Button variant="outline" size="sm">Verify</Button></div><p className="text-xs text-gray-500 dark:text-slate-500">SMS verification is required for changes.</p></div>
                <Button onClick={() => handleSave("Personal Information")} className="w-full">Save Changes</Button>
              </CardContent>
            </Card>
            <Card className="bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800">
              <CardHeader><CardTitle className="flex items-center gap-2"><CreditCard />Payment Information</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2"><Label htmlFor="upiName">UPI Name</Label><Input id="upiName" value={formData.upiName} onChange={(e) => setFormData((prev) => ({ ...prev, upiName: e.target.value }))} /></div>
                <div className="space-y-2"><Label htmlFor="upiId">UPI ID</Label><Input id="upiId" placeholder="yourname@paytm" value={formData.upiId} onChange={(e) => setFormData((prev) => ({ ...prev, upiId: e.target.value }))} /></div>
                <div className="bg-sky-50 dark:bg-sky-500/10 border border-sky-200 dark:border-sky-500/30 rounded-lg p-3"><p className="text-sky-700 dark:text-sky-300 text-sm flex items-center gap-2"><Shield className="h-4 w-4" /> Your payment information is encrypted and secure.</p></div>
                <Button onClick={() => handleSave("Payment Information")} className="w-full">Update UPI Details</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="security">
          <Card className="bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800">
            <CardHeader><CardTitle className="flex items-center gap-2"><Lock />Change Password</CardTitle><CardDescription>For your security, we recommend using a strong and unique password.</CardDescription></CardHeader>
            <CardContent className="space-y-4 max-w-md">
              <div className="space-y-2"><Label htmlFor="currentPassword">Current Password</Label><div className="relative"><Input id="currentPassword" type={showPassword ? "text" : "password"} value={formData.currentPassword} onChange={(e) => setFormData((prev) => ({ ...prev, currentPassword: e.target.value }))} className="pr-10"/><button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 text-gray-500 dark:text-slate-400 hover:text-gray-800 dark:hover:text-slate-200">{showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button></div></div>
              <div className="space-y-2"><Label htmlFor="newPassword">New Password</Label><div className="relative"><Input id="newPassword" type={showPassword ? "text" : "password"} value={formData.newPassword} onChange={(e) => handlePasswordChange(e.target.value)} className="pr-10"/><button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 text-gray-500 dark:text-slate-400 hover:text-gray-800 dark:hover:text-slate-200">{showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button></div>
                {formData.newPassword && (<div className="space-y-2 pt-1"><div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-1.5"><div className={`h-1.5 rounded-full transition-all duration-300 ${getStrengthColor()}`} style={{ width: `${passwordStrength}%` }}></div></div><div className="flex items-center justify-between text-xs"><span className="text-gray-500 dark:text-slate-500">Password Strength</span><span className={`font-medium ${passwordStrength < 50 ? "text-red-500 dark:text-red-400" : passwordStrength < 75 ? "text-yellow-500 dark:text-yellow-400" : "text-green-500 dark:text-green-400"}`}>{getStrengthText()}</span></div></div>)}
              </div>
              <div className="space-y-2"><Label htmlFor="confirmPassword">Confirm New Password</Label><Input id="confirmPassword" type="password" value={formData.confirmPassword} onChange={(e) => setFormData((prev) => ({ ...prev, confirmPassword: e.target.value }))}/></div>
              <Button onClick={() => handleSave("Password")} className="w-full">Update Password</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="devices">
          <Card className="bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800">
            <CardHeader><CardTitle className="flex items-center justify-between"><div className="flex items-center gap-2"><Smartphone/>Device Management</div><Button variant="destructive"><LogOut className="mr-2 h-4 w-4" />Logout All Devices</Button></CardTitle><CardDescription>This is a list of devices that have logged into your account. Revoke any sessions that you do not recognize.</CardDescription></CardHeader>
            <CardContent>
              <div className="space-y-4">
                {devices.map((device) => (
                  <div key={device.id} className={`flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-slate-800/50 border ${device.current ? 'border-green-300 dark:border-green-500/30' : 'border-gray-200 dark:border-slate-700'}`}>
                    <div className="flex items-center space-x-4"><Smartphone className="h-6 w-6 text-gray-500 dark:text-slate-400" /><div><div className="font-semibold text-gray-800 dark:text-slate-200 flex items-center space-x-2"><span>{device.name}</span>{device.current && <Badge variant="outline" className="text-green-700 border-green-300 dark:text-green-400 dark:border-green-500/50">Current Device</Badge>}</div><div className="text-sm text-gray-500 dark:text-slate-500">{device.location} • {device.lastActive}</div></div></div>
                    {!device.current && <Button variant="outline" size="sm" className="text-red-600 border-red-300 hover:bg-red-50 dark:text-red-400 dark:border-red-500/50 dark:hover:bg-red-500/10 dark:hover:text-red-300"><LogOut className="mr-2 h-3 w-3" />Logout</Button>}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800">
            <CardHeader><CardTitle className="flex items-center gap-2"><Bell />Notification Preferences</CardTitle><CardDescription>Choose how you want to be notified about important account activity and platform updates.</CardDescription></CardHeader>
            <CardContent className="space-y-6 max-w-2xl">
              <div className="space-y-4">
                 {[{id: 'email', label: 'Email Notifications', desc: 'Receive updates via email.'},{id: 'inApp', label: 'In-App Notifications', desc: 'Show notifications in the app.'},{id: 'sms', label: 'SMS Notifications', desc: 'Receive important updates via SMS.'},{id: 'marketing', label: 'Marketing Communications', desc: 'Receive promotional offers and tips.'}].map(item => (
                    <div key={item.id} className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700">
                        <div><Label htmlFor={item.id} className="font-medium">{item.label}</Label><p className="text-sm text-gray-600 dark:text-slate-400">{item.desc}</p></div>
                        <Switch id={item.id} checked={notifications[item.id as keyof typeof notifications]} onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, [item.id]: checked }))}/>
                    </div>
                 ))}
              </div>
              <Button onClick={() => handleSave("Notification Preferences")} className="w-full">Save Preferences</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="support">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800">
              <CardHeader><CardTitle className="flex items-center gap-2"><HelpCircle/>Help & Support</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                {[{href: '/dashboard/support', icon: HelpCircle, label: 'Help Center'},{href: '/dashboard/support', icon: Mail, label: 'Contact Support'},{href: '/faq', icon: HelpCircle, label: 'FAQ'}].map(item => (<Button key={item.label} variant="outline" className="w-full justify-start" asChild><a href={item.href}><item.icon className="mr-2 h-4 w-4" />{item.label}</a></Button>))}
              </CardContent>
            </Card>
            <Card className="bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800">
              <CardHeader><CardTitle className="flex items-center gap-2"><FileText/>Legal & Policies</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                {[{href: '/privacy', label: 'Privacy Policy'},{href: '/terms', label: 'Terms & Conditions'},{href: '/refund', label: 'Refund Policy'}].map(item => (<Button key={item.label} variant="outline" className="w-full justify-start" asChild><a href={item.href}><FileText className="mr-2 h-4 w-4" />{item.label}</a></Button>))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}