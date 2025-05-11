import { Link } from "wouter";
import { Facebook, Twitter, Linkedin, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary-dark text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <img src="/media/crispai_logo.png" alt="CrispAI Logo" className="h-10 mr-2 bg-white rounded p-1" />
            </div>
            <p className="text-sm text-gray-300 mb-4">
              Empowering businesses with intelligent AI solutions that drive growth and innovation.
            </p>
            <div className="flex space-x-4">
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
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Solutions</h3>
            <ul className="space-y-2">
              <li><Link href="/services" className="text-gray-300 hover:text-white transition">AI for Operations</Link></li>
              <li><Link href="/services" className="text-gray-300 hover:text-white transition">AI for HR</Link></li>
              <li><Link href="/services" className="text-gray-300 hover:text-white transition">AI for IT</Link></li>
              <li><Link href="/services" className="text-gray-300 hover:text-white transition">AI for Healthcare</Link></li>
              <li><Link href="/services" className="text-gray-300 hover:text-white transition">AI for Education</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-300 hover:text-white transition">About Us</Link></li>
              <li><Link href="/about" className="text-gray-300 hover:text-white transition">Our Team</Link></li>
              <li><Link href="/about" className="text-gray-300 hover:text-white transition">Careers</Link></li>
              <li><Link href="/about" className="text-gray-300 hover:text-white transition">Blog</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-white transition">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <Phone className="h-5 w-5 mr-2 mt-0.5" />
                <span>+1 (343) 580-1393</span>
              </li>
              <li className="flex items-start">
                <Mail className="h-5 w-5 mr-2 mt-0.5" />
                <span>ai@crispvision.org</span>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 mt-0.5" />
                <span>123 Innovation Drive<br />Suite 301<br />Ottawa, ON K1A 0B1</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-700 text-sm text-gray-400 flex flex-col md:flex-row justify-between items-center">
          <p>© {new Date().getFullYear()} CrispAI. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/about" className="hover:text-white transition">Privacy Policy</Link>
            <Link href="/about" className="hover:text-white transition">Terms of Service</Link>
            <Link href="/about" className="hover:text-white transition">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
