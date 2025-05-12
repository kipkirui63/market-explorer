import { Link } from "wouter";
import { Facebook, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary-dark text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="mb-6">
            <img src="/media/crispai_logo.png" alt="CrispAI Logo" className="h-10 bg-white rounded p-1" />
          </div>
          <p className="text-sm text-gray-300 mb-6 max-w-xl">
            Empowering businesses with intelligent AI solutions that drive growth and innovation.
          </p>
          <div className="flex space-x-6 mb-8">
            <a href="#" className="text-white hover:text-primary-lighter" aria-label="Facebook">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="#" className="text-white hover:text-primary-lighter" aria-label="Twitter">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="text-white hover:text-primary-lighter" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
          
          <div className="text-sm text-gray-400">
            <p>© {new Date().getFullYear()} CrispAI. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
