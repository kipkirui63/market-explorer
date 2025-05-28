import { createContext, ReactNode, useContext, useEffect } from "react";
import {
  useQuery,
  useMutation,
  UseMutationResult,
} from "@tanstack/react-query";
import { insertUserSchema, User as SelectUser, InsertUser } from "@shared/schema";
import { getQueryFn, apiRequest, queryClient } from "../lib/queryClient";
import { useToast } from "@/hooks/use-toast";


type AuthContextType = {
  user: SelectUser | null;
  isLoading: boolean;
  error: Error | null;
  loginMutation: UseMutationResult<SelectUser, Error, LoginData>;
  logoutMutation: UseMutationResult<void, Error, void>;
  registerMutation: UseMutationResult<SelectUser, Error, InsertUser>;
};

type LoginData = Pick<InsertUser, "email" | "password">;

export const AuthContext = createContext<AuthContextType | null>(null);
export function AuthProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();
  const {
    data: user,
    error,
    isLoading,
    refetch
  } = useQuery<SelectUser | null, Error>({
    queryKey: ["/api/user"],
    queryFn: getQueryFn({ on401: "returnNull" }),
  });
  
  // No local storage fallbacks for security

  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginData) => {
      // Only use the secure server API - no fallbacks
      const timestamp = new Date().getTime();
      const res = await apiRequest("POST", `/api/login?_t=${timestamp}`, credentials);
      return await res.json();
    },
    onSuccess: (user: SelectUser) => {
      // Clear all cart data from any users
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('cart_')) {
          localStorage.removeItem(key);
        }
      });
      // Only then set the user data
      queryClient.setQueryData(["/api/user"], user);
      toast({
        title: "Login successful",
        description: `Welcome back, ${user.name || user.email}!`,
        variant: "default",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Login failed",
        description: error.message || "Invalid username or password",
        variant: "destructive",
      });
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (credentials: InsertUser) => {
      const timestamp = new Date().getTime();
      const res = await apiRequest("POST", `/api/register?_t=${timestamp}`, credentials);
      return await res.json();
    },
    onSuccess: (response: any) => {
      // Don't automatically set the user data after registration
      // This will prevent auto-login after registration
      toast({
        title: "Registration successful",
        description: "Your account has been created. Please sign in with your credentials.",
        variant: "default",
      });
    },
    onError: (error: Error) => {
      console.error("Registration error:", error);
      // Check if this is actually a successful registration being treated as error
      if (error.message && error.message.includes("Registration successful")) {
        toast({
          title: "Registration successful",
          description: "Your account has been created. Please sign in with your credentials.",
          variant: "default",
        });
      } else {
        toast({
          title: "Registration failed",
          description: error.message || "Username already exists",
          variant: "destructive",
        });
      }
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      // Add timestamp to prevent caching
      const timestamp = new Date().getTime();
      await apiRequest("POST", `/api/logout?_t=${timestamp}`);
    },
    onSuccess: () => {
      // Clear all cart data when logging out
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('cart_') || key === 'cart' || key === 'cart_guest') {
          localStorage.removeItem(key);
        }
      });
      queryClient.setQueryData(["/api/user"], null);
      toast({
        title: "Logged out",
        description: "You have been successfully logged out",
        variant: "default",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Logout failed",
        description: error.message || "An error occurred during logout",
        variant: "destructive",
      });
    },
  });

  return (
    <AuthContext.Provider
      value={{
        user: user ?? null,
        isLoading,
        error,
        loginMutation,
        logoutMutation,
        registerMutation,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}