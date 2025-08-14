import { Link } from "wouter";
import { Linkedin, Twitter, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-brand-slate text-white py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">Kazeem Salau</h3>
            <p className="text-slate-300">
              Creating impactful learning experiences through innovative instructional design and user-centered thinking.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
                data-testid="footer-linkedin"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
                data-testid="footer-twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
                data-testid="footer-youtube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-slate-300">
              <li>
                <Link href="/about" className="hover:text-white transition-colors" data-testid="footer-about">
                  About
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-white transition-colors" data-testid="footer-portfolio">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors" data-testid="footer-blog">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors" data-testid="footer-contact">
                  Contact
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors" data-testid="footer-resume">
                  Resume
                </a>
              </li>
            </ul>
          </div>
          
          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Services</h4>
            <ul className="space-y-2 text-slate-300">
              <li>Instructional Design</li>
              <li>eLearning Development</li>
              <li>Learning Strategy</li>
              <li>UX for Learning</li>
              <li>Content Development</li>
            </ul>
          </div>
          
        </div>
        
        <div className="border-t border-slate-600 mt-8 pt-8 text-center text-slate-400">
          <p>&copy; 2025 Kazeem Salau. All rights reserved. Built with passion for learning and design.</p>
        </div>
      </div>
    </footer>
  );
}
