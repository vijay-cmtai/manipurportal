"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, LogOut, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Component function yahan se shuru hota hai
export default function LogoutPage() {
  // Saari logic ab is component ke andar hai
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [logoutSuccess, setLogoutSuccess] = useState<boolean | null>(null);

  useEffect(() => {
    // Isse aap chahein to uncomment kar sakte hain, taaki page load hote hi logout ho jaaye
    // const timer = setTimeout(() => {
    //   if (!isLoggingOut && logoutSuccess === null) {
    //     handleLogout();
    //   }
    // }, 500);
    // return () => clearTimeout(timer);
  }, []); // Empty dependency array ensures this runs only once on mount

  const handleLogout = async () => {
    setIsLoggingOut(true);
    setLogoutSuccess(null); // Reset status

    // Simulate API call for logout
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate network delay
      // In a real app, you'd clear auth tokens, session, etc.
      setLogoutSuccess(true);
      setTimeout(() => {
        router.push("/login"); // Redirect to login page after successful logout
      }, 1000);
    } catch (error) {
      console.error("Logout failed:", error);
      setLogoutSuccess(false);
      setIsLoggingOut(false);
    }
  };

  // JSX return statement ab component ke andar hai
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 dark:from-slate-900 dark:to-slate-950 flex items-center justify-center py-8">
      <div className="container mx-auto px-4 max-w-md">
        <Card className="text-center shadow-lg">
          <CardHeader>
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <LogOut className="h-8 w-8 text-primary-foreground" />
            </div>
            <CardTitle className="text-2xl">Confirm Logout</CardTitle>
            <p className="text-muted-foreground">
              Are you sure you want to log out of your account?
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {logoutSuccess === null && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="outline"
                  onClick={() => router.back()}
                  disabled={isLoggingOut}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="flex-1"
                >
                  {isLoggingOut ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2"></div>
                      Logging Out...
                    </>
                  ) : (
                    "Log Out"
                  )}
                </Button>
              </div>
            )}

            {logoutSuccess === true && (
              <div className="text-center text-green-600 dark:text-green-500">
                <CheckCircle className="h-12 w-12 mx-auto mb-4" />
                <p className="text-lg font-semibold">
                  You have been successfully logged out.
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Redirecting to login page...
                </p>
              </div>
            )}

            {logoutSuccess === false && (
              <div className="text-center text-red-600 dark:text-red-500">
                <XCircle className="h-12 w-12 mx-auto mb-4" />
                <p className="text-lg font-semibold">Logout failed.</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Please try again or contact support.
                </p>
                <Button onClick={handleLogout} className="mt-4">
                  Try Again
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
