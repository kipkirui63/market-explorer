import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, LogOut } from "lucide-react";
import crispAILogo from "@/assets/crispai_logo.png";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";

export default function SPAHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
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

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
      closeMenu();
    }
  };

  // Check which section is in view
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'services', 'testimonials', 'contact'];
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (section: string) => {
    return activeSection === section ? "text-primary font-medium" : "text-gray-600 hover:text-primary";
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <a 
          href="#home" 
          className="flex items-center cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('home');
          }}
        >
          <img src={crispAILogo} alt="CrispAI Logo" className="h-10 mr-2" />
        </a>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <a 
            href="#home" 
            className={`transition cursor-pointer ${isActive("home")}`}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('home');
            }}
          >
            Home
          </a>
          <Link 
            href="/about" 
            className="transition text-gray-600 hover:text-primary"
          >
            About
          </Link>
          <a 
            href="#services" 
            className={`transition cursor-pointer ${isActive("services")}`}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('services');
            }}
          >
            Services
          </a>
          <Link 
            href="/contact" 
            className="transition text-gray-600 hover:text-primary"
          >
            Contact
          </Link>
          <Link href="/assessment" className="transition text-gray-600 hover:text-primary">
            Assessment
          </Link>
          <Link href="/marketplace" className="transition text-gray-600 hover:text-primary">
            Marketplace
          </Link>
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
          <a 
            href="#home" 
            className="block py-2 text-gray-600 hover:text-primary"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('home');
            }}
          >
            Home
          </a>
          <Link
            href="/about"
            className="block py-2 text-gray-600 hover:text-primary"
            onClick={closeMenu}
          >
            About
          </Link>
          <a 
            href="#services" 
            className="block py-2 text-gray-600 hover:text-primary"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('services');
            }}
          >
            Services
          </a>
          <Link 
            href="/contact" 
            className="block py-2 text-gray-600 hover:text-primary"
            onClick={closeMenu}
          >
            Contact
          </Link>
          <Link href="/assessment" className="block py-2 text-gray-600 hover:text-primary" onClick={closeMenu}>
            Assessment
          </Link>
          <Link href="/marketplace" className="block py-2 text-gray-600 hover:text-primary" onClick={closeMenu}>
            Marketplace
          </Link>
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