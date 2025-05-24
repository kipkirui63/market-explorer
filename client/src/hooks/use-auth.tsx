import { createContext, ReactNode, useContext, useEffect } from "react";
import {
  useQuery,
  useMutation,
  UseMutationResult,
} from "@tanstack/react-query";
import { insertUserSchema, User as SelectUser, InsertUser } from "@shared/schema";
import { getQueryFn, apiRequest, queryClient } from "../lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { getLocalUser, saveLocalUser, clearLocalUser, productionLogin, productionLogout } from "@/utils/auth-helpers";

type AuthContextType = {
  user: SelectUser | null;
  isLoading: boolean;
  error: Error | null;
  loginMutation: UseMutationResult<SelectUser, Error, LoginData>;
  logoutMutation: UseMutationResult<void, Error, void>;
  registerMutation: UseMutationResult<SelectUser, Error, InsertUser>;
};

type LoginData = Pick<InsertUser, "username" | "password">;

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
  
  // If we're in a production build, check for saved user in localStorage
  useEffect(() => {
    if (!user) {
      const savedUser = getLocalUser();
      if (savedUser) {
        queryClient.setQueryData(["/api/user"], savedUser);
      }
    } else {
      // Keep local storage in sync with current user
      saveLocalUser(user);
    }
  }, [user]);

  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginData) => {
      try {
        // Try the regular API login first
        const timestamp = new Date().getTime();
        const res = await apiRequest("POST", `/api/login?_t=${timestamp}`, credentials);
        return await res.json();
      } catch (error) {
        console.error("API login failed, trying production fallback:", error);
        
        // Use production-compatible login as fallback
        return await productionLogin(credentials.username, credentials.password);
      }
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
        description: `Welcome back, ${user.username}!`,
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
      // Add timestamp to prevent caching
      const timestamp = new Date().getTime();
      const res = await apiRequest("POST", `/api/register?_t=${timestamp}`, credentials);
      try {
        const data = await res.json();
        return data;
      } catch (error) {
        console.error("Failed to parse registration response:", error);
        throw new Error("Registration service error. Please try again later.");
      }
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
      toast({
        title: "Registration failed",
        description: error.message || "Username already exists",
        variant: "destructive",
      });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("POST", "/api/logout");
    },
    onSuccess: () => {
      // Clear all cart data when logging out
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('cart_')) {
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