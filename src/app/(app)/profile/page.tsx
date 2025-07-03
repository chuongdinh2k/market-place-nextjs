"use client";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";

export default function ProfilePage() {
  // Get the current user
  const { user } = useAuth();

  // If the user is not authenticated, redirect to login
  if (!user) {
    redirect("/sign-up");
  }

  return (
    <div className="container mx-auto py-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Profile</h1>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Name</div>
                    <div className="font-medium">
                      {user.name || "Not provided"}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Email</div>
                    <div className="font-medium">{user.email}</div>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">
                    Account Type
                  </div>
                  <div className="font-medium">{user.role}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Account Security</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">Password</div>
                  <div className="font-medium">••••••••</div>
                </div>
                <div>
                  <form action="/api/auth/change-password" method="POST">
                    <button
                      type="submit"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Change password
                    </button>
                  </form>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
