import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path: string) => {
    return location === path ? "text-primary font-medium" : "text-gray-600 hover:text-primary";
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <div className="h-10 w-10 bg-gradient-to-r from-primary to-primary-light rounded-full flex items-center justify-center mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-6 h-6">
              <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-1 15v-4H7l5-7v4h4l-5 7z"/>
            </svg>
          </div>
          <span className="text-xl font-bold text-primary">CrispAI</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/about" className={`transition ${isActive("/about")}`}>About</Link>
          <Link href="/services" className={`transition ${isActive("/services")}`}>Services</Link>
          <Link href="/contact" className={`transition ${isActive("/contact")}`}>Contact</Link>
          <Link href="/assessment" className={`transition ${isActive("/assessment")}`}>AI Readiness Assessment</Link>
          <Link href="/marketplace" className={`transition ${isActive("/marketplace")}`}>Marketplace</Link>
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
          <Link href="/about" className="block py-2 text-gray-600 hover:text-primary" onClick={closeMenu}>About</Link>
          <Link href="/services" className="block py-2 text-gray-600 hover:text-primary" onClick={closeMenu}>Services</Link>
          <Link href="/contact" className="block py-2 text-gray-600 hover:text-primary" onClick={closeMenu}>Contact</Link>
          <Link href="/assessment" className="block py-2 text-gray-600 hover:text-primary" onClick={closeMenu}>AI Readiness Assessment</Link>
          <Link href="/marketplace" className="block py-2 text-gray-600 hover:text-primary font-medium" onClick={closeMenu}>Marketplace</Link>
        </div>
      </div>
    </header>
  );
}
