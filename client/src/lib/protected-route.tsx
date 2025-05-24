import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";
import { Redirect, Route } from "wouter";

export function ProtectedRoute({
  path,
  component: Component,
}: {
  path: string;
  component: () => React.JSX.Element;
}) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <Route path={path}>
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="h-8 w-8 animate-spin text-border" />
        </div>
      </Route>
    );
  }

  if (!user) {
    return (
      <Route path={path}>
        {() => {
          // Save the current path for redirection after login
          localStorage.setItem('redirectAfterAuth', path);
          
          // Use window.location for a complete page refresh
          // This works better than Redirect for our specific case
          window.location.href = "/auth";
          
          // Still need to return something for React
          return <div className="hidden">Redirecting...</div>;
        }}
      </Route>
    );
  }

  return <Route path={path} component={Component} />;
}