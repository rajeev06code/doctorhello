
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserPlus, Smartphone, User, Loader2, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";


export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [formLoading, setFormLoading] = useState(false);

  const { user, loading: authLoading, error: authError, setError: setAuthError, register } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);
  

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setAuthError(null); // Clear previous errors
    try {
      // For localStorage auth, we're directly calling register which then calls login
      await register(fullName, phoneNumber);
      // Navigation is handled within the register (then login) function of AuthContext upon success
    } catch (err: any) {
      // Error is set by AuthContext's register function
      console.error("Register page submit error", err);
    } finally {
      setFormLoading(false);
    }
  };
  
  if (authLoading && !user) { // Show loader if auth is loading and no user yet (initial load)
     return (
      <div className="container mx-auto px-4 py-12 flex justify-center items-center min-h-[calc(100vh-15rem)]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  // If user becomes available while authLoading is true (e.g. from localStorage), redirect will happen via useEffect.
  if (user) return null;


  return (
    <div className="container mx-auto px-4 py-12 flex justify-center items-center min-h-[calc(100vh-15rem)]">
      <Card className="w-full max-w-md shadow-xl border border-border/60">
        <CardHeader className="text-center items-center pt-8">
          <div className="bg-primary/10 text-primary p-3 rounded-full w-fit mb-4">
            <UserPlus className="h-8 w-8" />
          </div>
          <CardTitle className="text-3xl text-primary">Create Account</CardTitle>
          <CardDescription className="mt-1">Join Hello Doctor to access healthcare services.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 px-6 pb-8 md:px-8">
          {authError && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Registration Failed</AlertTitle>
              <AlertDescription>{authError}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleRegisterSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="fullName" className="font-medium">Full Name</Label>
              <div className="flex items-center border border-input rounded-md focus-within:ring-2 focus-within:ring-ring bg-background">
                <User className="h-5 w-5 text-muted-foreground ml-3 mr-2 shrink-0"/>
                <Input 
                  id="fullName" 
                  placeholder="Enter your full name" 
                  className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 flex-1 h-9"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="mobile" className="font-medium">Mobile Number (with +91)</Label>
              <div className="flex items-center border border-input rounded-md focus-within:ring-2 focus-within:ring-ring bg-background">
                <Smartphone className="h-5 w-5 text-muted-foreground ml-3 mr-2 shrink-0"/>
                <Input 
                  id="mobile" 
                  type="tel" 
                  placeholder="+919876543210" 
                  className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 flex-1 h-9"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </div>
            </div>
            <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground h-10 text-base" disabled={formLoading || authLoading}>
              {(formLoading || authLoading) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Register
            </Button>
          </form>
          
          <p className="text-center text-sm text-muted-foreground pt-2">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-primary hover:underline">
              Login here
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
