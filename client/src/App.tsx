import { Switch, Route } from "wouter";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import HomeSPA from "@/pages/home-spa";
import About from "@/pages/About";
import Services from "@/pages/services";
import Contact from "@/pages/contact";
import Assessment from "@/pages/assessment";
import Marketplace from "@/pages/Marketplace";
import BasicCart from "@/pages/BasicCart";
import AuthPage from "@/pages/auth-page";
import SimpleCheckout from "@/pages/SimpleCheckout";
import CheckoutSuccess from "@/pages/checkout-success";

import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "@/lib/protected-route";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomeSPA} />
      <Route path="/classic" component={Home} />
      <Route path="/assessment" component={Assessment} />
      <Route path="/marketplace" component={Marketplace} />
      <Route path="/cart" component={BasicCart} />
      <Route path="/checkout" component={SimpleCheckout} />
      <ProtectedRoute path="/checkout/success" component={CheckoutSuccess} />
      <Route path="/auth" component={AuthPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
