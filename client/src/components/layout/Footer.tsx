import { Link } from "wouter";
import { Facebook, Twitter, Instagram, Linkedin, Mail } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Footer = () => {
  return (
    <footer className="pt-12 pb-6 text-white" style={{ backgroundColor: '#0078D4' }}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">CrispAI</h3>
            <p className="mb-4">
              The premier marketplace for digital applications and AI agents.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white">
                <Facebook size={18} />
              </a>
              <a href="#" className="hover:text-white">
                <Twitter size={18} />
              </a>
              <a href="#" className="hover:text-white">
                <Instagram size={18} />
              </a>
              <a href="#" className="hover:text-white">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a
                        href="mailto:crispailtd@gmail.com"
                        className="flex items-center gap-2 hover:text-white"
                      >
                        <Mail size={16} /> Contact Us
                      </a>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Email us at crispailtd@gmail.com for support</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </li>
              <li>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a href="#" className="hover:text-white">
                        FAQs
                      </a>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Frequently asked questions about our products</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </li>
              <li>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a href="#" className="hover:text-white">
                        Developer Resources
                      </a>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Tools and documentation for developers</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </li>
              <li>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a href="#" className="hover:text-white">
                        API Documentation
                      </a>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Learn how to integrate with our APIs</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a href="#" className="hover:text-white">
                        Terms of Service
                      </a>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Agreement governing use of our platform</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </li>
              <li>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a href="#" className="hover:text-white">
                        Privacy Policy
                      </a>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>How we collect and use your data</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </li>
              <li>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a href="#" className="hover:text-white">
                        Cookie Policy
                      </a>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Information about our use of cookies</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </li>
              <li>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a href="#" className="hover:text-white">
                        Refund Policy
                      </a>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Our policy on refunds and returns</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </li>
              <li>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a href="#" className="hover:text-white">
                        License Information
                      </a>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Details about product licensing</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white pt-6 mt-6 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} CrispAI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
