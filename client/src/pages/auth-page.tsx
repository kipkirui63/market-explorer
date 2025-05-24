import React, { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Redirect } from "wouter";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Brain } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AuthPage() {
  const { user, loginMutation, registerMutation } = useAuth();
  const { toast } = useToast();
  const [isLogin, setIsLogin] = useState(true);
  
  // Login state
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  
  // Register state
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    loginMutation.mutate({
      username: loginUsername,
      password: loginPassword
    });
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (registerPassword !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    
    setPasswordError("");
    registerMutation.mutate({
      username: registerUsername,
      password: registerPassword
    }, {
      onSuccess: () => {
        // Redirect to login form after successful registration
        setIsLogin(true);
        // Clear registration form fields
        setRegisterUsername("");
        setRegisterPassword("");
        setConfirmPassword("");
      }
    });
  };

  // If user is already logged in, redirect to saved page or home
  if (user) {
    // Check if there's a redirect URL saved from previous navigation
    const redirectTo = localStorage.getItem('redirectAfterAuth') || '/';
    
    // Clean up the stored redirect
    localStorage.removeItem('redirectAfterAuth');
    
    return <Redirect to={redirectTo} />;
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Form Column */}
      <div className="w-full md:w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6 md:p-8 order-2 md:order-1">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="pb-6">
            <CardTitle className="text-xl sm:text-2xl text-center">
              {isLogin ? "Sign in to your account" : "Create a new account"}
            </CardTitle>
            <CardDescription className="text-center">
              {isLogin
                ? "Enter your credentials to access the marketplace"
                : "Fill out the form to create your account"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLogin ? (
              // Login Form
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="login-username" className="text-sm font-medium">
                    Username
                  </label>
                  <Input
                    id="login-username"
                    value={loginUsername}
                    onChange={(e) => setLoginUsername(e.target.value)}
                    placeholder="test"
                    autoComplete="username"
                    className="h-10"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="login-password" className="text-sm font-medium">
                    Password
                  </label>
                  <Input
                    id="login-password"
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="test123"
                    autoComplete="current-password"
                    className="h-10"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-10 mt-6"
                  disabled={loginMutation.isPending}
                >
                  {loginMutation.isPending ? "Signing in..." : "Sign In"}
                </Button>
              </form>
            ) : (
              // Register Form
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="register-username" className="text-sm font-medium">
                    Username
                  </label>
                  <Input
                    id="register-username"
                    value={registerUsername}
                    onChange={(e) => setRegisterUsername(e.target.value)}
                    placeholder="Choose a username"
                    autoComplete="username"
                    className="h-10"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="register-password" className="text-sm font-medium">
                    Password
                  </label>
                  <Input
                    id="register-password"
                    type="password"
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    placeholder="Create a password"
                    autoComplete="new-password"
                    className="h-10"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="confirm-password" className="text-sm font-medium">
                    Confirm Password
                  </label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    autoComplete="new-password"
                    className="h-10"
                  />
                  {passwordError && (
                    <p className="text-sm text-red-500">{passwordError}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full h-10 mt-6"
                  disabled={registerMutation.isPending}
                >
                  {registerMutation.isPending ? "Creating account..." : "Create Account"}
                </Button>
              </form>
            )}
          </CardContent>
          <CardFooter className="flex flex-col gap-4 pt-0 pb-6">
            <div className="text-center text-sm text-gray-500">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <Button
                variant="link"
                onClick={() => setIsLogin(!isLogin)}
                className="pl-1"
              >
                {isLogin ? "Sign up" : "Sign in"}
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>

      {/* Hero/Info Column */}
      <div className="w-full md:w-full lg:w-1/2 bg-blue-600 text-white p-6 sm:p-8 md:p-12 flex flex-col justify-center order-1 md:order-2 min-h-[220px] md:min-h-0">
        <div className="max-w-md mx-auto">
          <div className="mb-4 md:mb-8 flex justify-center">
            <div className="p-3 md:p-4 bg-white/10 rounded-full">
              <Brain className="w-10 h-10 md:w-16 md:h-16" />
            </div>
          </div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-6 text-center md:text-left">
            Welcome to CrispAI Marketplace
          </h1>
          <p className="text-lg md:text-xl mb-4 md:mb-8 text-center md:text-left">
            Discover and purchase powerful AI applications to enhance your workflow.
          </p>
          <div className="space-y-3 md:space-y-4 hidden md:block">
            <div className="flex items-start">
              <span className="bg-white/20 p-1 rounded mr-3 text-white">✓</span>
              <p>Access to premium AI tools and applications</p>
            </div>
            <div className="flex items-start">
              <span className="bg-white/20 p-1 rounded mr-3 text-white">✓</span>
              <p>Streamline your workflow with intelligent automation</p>
            </div>
            <div className="flex items-start">
              <span className="bg-white/20 p-1 rounded mr-3 text-white">✓</span>
              <p>Personalized recommendations based on your needs</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}