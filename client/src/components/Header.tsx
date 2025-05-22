import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, User, LogOut } from "lucide-react";
import crispAILogo from "@/assets/crispai_logo.png";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();
  const { user, logoutMutation } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const isActive = (path: string) => {
    return location === path ? "text-primary font-medium" : "text-gray-600 hover:text-primary";
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <img src={crispAILogo} alt="CrispAI Logo" className="h-10 mr-2" />
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className={`transition ${isActive("/")}`}>Home</Link>
          <Link href="/about" className={`transition ${isActive("/about")}`}>About</Link>
          <Link href="/services" className={`transition ${isActive("/services")}`}>Services</Link>
          <Link href="/contact" className={`transition ${isActive("/contact")}`}>Contact</Link>
          <Link href="/assessment" className={`transition ${isActive("/assessment")}`}>Assessment</Link>
          <Link href="/marketplace" className={`transition ${isActive("/marketplace")}`}>Marketplace</Link>
          {user && (
            <Button 
              variant="ghost" 
              className="flex items-center text-gray-600 hover:text-primary"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-1" />
              Logout
            </Button>
          )}
        </nav>
        
        {/* Mobile Navigation Toggle */}
        <button 
          className="md:hidden text-gray-600 hover:text-primary"
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>
      
      {/* Mobile Navigation Menu */}
      <div className={`md:hidden bg-white shadow-md ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="container mx-auto px-4 py-3 space-y-3">
          <Link href="/" className="block py-2 text-gray-600 hover:text-primary" onClick={closeMenu}>Home</Link>
          <Link href="/about" className="block py-2 text-gray-600 hover:text-primary" onClick={closeMenu}>About</Link>
          <Link href="/services" className="block py-2 text-gray-600 hover:text-primary" onClick={closeMenu}>Services</Link>
          <Link href="/contact" className="block py-2 text-gray-600 hover:text-primary" onClick={closeMenu}>Contact</Link>
          <Link href="/assessment" className="block py-2 text-gray-600 hover:text-primary" onClick={closeMenu}>Assessment</Link>
          <Link href="/marketplace" className="block py-2 text-gray-600 hover:text-primary" onClick={closeMenu}>Marketplace</Link>
          {user && (
            <button 
              className="flex items-center py-2 text-gray-600 hover:text-primary" 
              onClick={() => {
                handleLogout();
                closeMenu();
              }}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
