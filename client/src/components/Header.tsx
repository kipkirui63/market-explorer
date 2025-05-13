import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import crispAILogo from "@/assets/crispai_logo.png";

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
    return location === path ? "text-[#0099ff] font-medium" : "text-gray-600 hover:text-[#0099ff]";
  };

  return (
    <header className="bg-white sticky top-0 z-50 border-b border-gray-100">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <img src={crispAILogo} alt="CrispAI Logo" className="h-8 mr-2" />
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/about" className={`transition ${isActive("/about")}`}>About</Link>
          <Link href="/services" className={`transition ${isActive("/services")}`}>Services</Link>
          <Link href="/contact" className={`transition ${isActive("/contact")}`}>Contact</Link>
          <Link href="/assessment" className={`transition ${isActive("/assessment")}`}>AI Readiness Assessment</Link>
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <User className="h-4 w-4" />
                  {user.username}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/auth">
              <Button size="sm" variant="default">Sign In</Button>
            </Link>
          )}
        </nav>
        
        {/* Mobile Navigation Toggle */}
        <button 
          className="md:hidden text-gray-600 hover:text-[#0099ff]"
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
          <Link href="/about" className="block py-2 text-gray-600 hover:text-[#0099ff]" onClick={closeMenu}>About</Link>
          <Link href="/services" className="block py-2 text-gray-600 hover:text-[#0099ff]" onClick={closeMenu}>Services</Link>
          <Link href="/contact" className="block py-2 text-gray-600 hover:text-[#0099ff]" onClick={closeMenu}>Contact</Link>
          <Link href="/assessment" className="block py-2 text-gray-600 hover:text-[#0099ff]" onClick={closeMenu}>AI Readiness Assessment</Link>
          
          <div className="pt-2 border-t border-gray-100">
            {user ? (
              <div className="space-y-2">
                <div className="py-2 text-gray-600 flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  <span>{user.username}</span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => {
                    handleLogout();
                    closeMenu();
                  }}
                  className="w-full justify-start"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <Link href="/auth" onClick={closeMenu}>
                <Button size="sm" variant="default" className="w-full">
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
