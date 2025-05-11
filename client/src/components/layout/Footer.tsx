import { Link } from "wouter";
import { Facebook, Twitter, Linkedin, PhoneCall, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#003366] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#0077cc" className="w-6 h-6">
                  <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-1 15v-4H7l5-7v4h4l-5 7z"/>
                </svg>
              </div>
              <span className="text-xl font-bold">CrispAI</span>
            </div>
            <p className="text-sm text-gray-300 mb-4">
              Empowering businesses with intelligent AI solutions that drive growth and innovation.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-white hover:text-[#0099ff] transition" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" className="text-white hover:text-[#0099ff] transition" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com" className="text-white hover:text-[#0099ff] transition" aria-label="LinkedIn">
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
              <li><Link href="/contact" className="text-gray-300 hover:text-white transition">Careers</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-white transition">Blog</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-white transition">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <PhoneCall className="h-5 w-5 mr-2 mt-0.5" />
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
