import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const isActive = (path: string) => {
    return location === path ? "text-[#0077cc] font-medium" : "text-gray-600 hover:text-[#0077cc]";
  };

  const navItems = [
    { path: "/about", label: "About" },
    { path: "/services", label: "Services" },
    { path: "/contact", label: "Contact" },
    { path: "/assessment", label: "AI Readiness Assessment" },
    { path: "/marketplace", label: "Marketplace" },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <div className="h-10 w-10 bg-gradient-to-r from-[#0077cc] to-[#0099ff] rounded-full flex items-center justify-center mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-6 h-6">
              <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-1 15v-4H7l5-7v4h4l-5 7z"/>
            </svg>
          </div>
          <span className="text-xl font-bold text-[#0077cc]">CrispAI</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map(item => (
            <Link 
              key={item.path} 
              href={item.path} 
              className={`${isActive(item.path)} transition`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        
        {/* Mobile Navigation Toggle */}
        <button 
          className="md:hidden text-gray-600 hover:text-[#0077cc]"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-expanded={isMobileMenuOpen}
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>
      
      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="container mx-auto px-4 py-3 space-y-3">
            {navItems.map(item => (
              <Link 
                key={item.path} 
                href={item.path} 
                className={`block py-2 ${isActive(item.path)}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
