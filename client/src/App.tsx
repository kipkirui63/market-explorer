import { Switch, Route } from "wouter";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import HomeSPA from "@/pages/home-spa";
import About from "@/pages/about";
import Services from "@/pages/services";
import Contact from "@/pages/contact";
import Assessment from "@/pages/assessment";
import Marketplace from "@/pages/Marketplace";
import CartPage from "@/pages/CartPage";
import AuthPage from "@/pages/auth-page";
import CustomCheckout from "@/pages/custom-checkout";
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
      {/* Removed dedicated About page route to avoid confusion */}
      <Route path="/services" component={Services} />
      <Route path="/contact" component={Contact} />
      <Route path="/assessment" component={Assessment} />
      <Route path="/marketplace" component={Marketplace} />
      <ProtectedRoute path="/cart" component={CartPage} />
      <ProtectedRoute path="/checkout" component={CustomCheckout} />
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
