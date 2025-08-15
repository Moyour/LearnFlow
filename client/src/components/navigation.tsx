import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const navigation = [
    { name: "Projects", href: "/portfolio" },
    { name: "About", href: "/about" },
    { name: "Resume", href: "/resume", external: true },
  ];

  const isActive = (href: string) => {
    if (href === "/") return location === "/";
    return location.startsWith(href);
  };

  return (
    <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-auto max-w-none">
      <nav className="bg-white/10 backdrop-blur-md rounded-2xl px-6 py-3 shadow-xl border border-white/20 w-auto min-w-max">
        <div className="flex items-center gap-6 md:gap-8">
          {/* Logo */}
          <Link href="/" data-testid="logo-link">
            <div className="text-white font-semibold text-lg hover:text-white/80 transition-colors duration-200 whitespace-nowrap">
              Kazeem.
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                data-testid={`nav-${item.name.toLowerCase()}`}
                className={cn(
                  "text-white/80 hover:text-white transition-colors duration-200 font-medium flex items-center space-x-1 whitespace-nowrap",
                  isActive(item.href) && "text-white"
                )}
              >
                <span>{item.name}</span>
                {item.external && <ExternalLink className="w-3 h-3" />}
              </Link>
            ))}
          </div>
          
          {/* Contact Button */}
          <div className="hidden md:block">
            <Link href="/contact">
              <Button 
                className="bg-white text-indigo-900 hover:bg-white/90 px-6 py-2 rounded-full font-medium transition-all duration-200 hover:scale-105 whitespace-nowrap"
                data-testid="contact-button"
              >
                Contact
              </Button>
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-testid="mobile-menu-toggle"
              className="text-white hover:bg-white/20 hover:text-white"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-white/20">
            <div className="space-y-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  data-testid={`mobile-nav-${item.name.toLowerCase()}`}
                  className={cn(
                    "block text-white/80 hover:text-white transition-colors duration-200 font-medium",
                    isActive(item.href) && "text-white"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="flex items-center space-x-2">
                    <span>{item.name}</span>
                    {item.external && <ExternalLink className="w-3 h-3" />}
                  </div>
                </Link>
              ))}
              <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                <Button 
                  className="w-full bg-white text-indigo-900 hover:bg-white/90 px-6 py-2 rounded-full font-medium transition-colors duration-200 mt-4"
                  data-testid="mobile-contact-button"
                >
                  Contact
                </Button>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}
