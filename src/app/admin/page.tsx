"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Shield, AlertTriangle } from "lucide-react";
import { notFound } from "next/navigation";

export default function AdminPage() {
  // Gate behind environment variable
  if (process.env.NEXT_PUBLIC_ADMIN_ACCESS !== 'true') {
    notFound();
  }
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Placeholder authentication - implement proper auth in production
    if (password && password.length > 0) {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Password required");
      setPassword("");
    }
  };

  if (isAuthenticated) {
    return (
      <div className="min-h-screen py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto space-y-8"
          >
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h1 className="text-4xl font-serif font-bold text-foreground">
                Admin Dashboard
              </h1>
              <p className="text-lg text-muted-foreground">
                Welcome to the Mustang Ranch admin panel. This is a placeholder for future admin functionality.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    User Management
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Manage user accounts and permissions.
                  </p>
                  <Button variant="secondary" disabled>
                    Coming Soon
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Investment Management
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Add and manage investment opportunities.
                  </p>
                  <Button variant="secondary" disabled>
                    Coming Soon
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    View platform analytics and reports.
                  </p>
                  <Button variant="secondary" disabled>
                    Coming Soon
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <Button
                variant="secondary"
                onClick={() => {
                  setIsAuthenticated(false);
                  setPassword("");
                }}
              >
                Logout
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md mx-auto"
        >
          <Card>
            <CardHeader className="text-center">
              <div className="w-16 h-16 mx-auto bg-mustang/10 rounded-full flex items-center justify-center mb-4">
                <Lock className="h-8 w-8 text-mustang" />
              </div>
              <CardTitle className="text-2xl">Admin Access</CardTitle>
              <p className="text-muted-foreground">
                Enter the admin password to access the dashboard
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin password"
                    required
                  />
                  {error && (
                    <div className="flex items-center gap-2 text-sm text-red-600">
                      <AlertTriangle className="h-4 w-4" />
                      {error}
                    </div>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-mustang hover:bg-mustang/90 text-white"
                >
                  Access Dashboard
                </Button>
              </form>

            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

