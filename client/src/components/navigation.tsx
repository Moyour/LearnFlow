import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Reusable link wrapper with scroll-to-top
function ScrollLink({ href, children, onClick, ...props }: any) {
  return (
    <Link
      href={href}
      {...props}
      onClick={(e) => {
        if (onClick) onClick(e);
        requestAnimationFrame(() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        });
      }}
    >
      {children}
    </Link>
  );
}

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const navigation = [
    { name: "Projects", href: "/portfolio" },
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
  ];
  const isActive = (href: string) => {
    if (href === "/") return location === "/";
    return location.startsWith(href);
  };

  return (
    <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
      <nav className="bg-white/10 backdrop-blur-md rounded-2xl px-6 py-3 shadow-xl border border-white/20">
        <div className="flex items-center justify-between gap-6">
          {/* Logo */}
          <ScrollLink href="/" data-testid="logo-link">
            <div className="text-white font-semibold text-lg hover:text-white/80 transition-colors duration-200 whitespace-nowrap">
              Kazeem.
            </div>
          </ScrollLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navigation.map((item) => (
              <ScrollLink
                key={item.name}
                href={item.href}
                data-testid={`nav-${item.name.toLowerCase()}`}
                className={cn(
                  "text-white/80 hover:text-white transition-colors duration-200 font-medium flex items-center gap-1 whitespace-nowrap",
                  isActive(item.href) && "text-white"
                )}
              >
                <span>{item.name}</span>
                {item.external && <ExternalLink className="w-3 h-3" />}
              </ScrollLink>
            ))}
          </div>

          {/* Contact Button */}
          <div className="hidden md:block">
            <ScrollLink href="/contact">
              <Button 
                className="bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 text-white hover:from-pink-500 hover:via-purple-600 hover:to-indigo-600 px-5 py-2 rounded-full font-medium transition-all duration-200 hover:scale-105 whitespace-nowrap"
                data-testid="contact-button"
              >
                Contact
              </Button>
            </ScrollLink>
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
            <div className="flex flex-col gap-4">
              {navigation.map((item) => (
                <ScrollLink
                  key={item.name}
                  href={item.href}
                  data-testid={`mobile-nav-${item.name.toLowerCase()}`}
                  className={cn(
                    "block text-white/80 hover:text-white transition-colors duration-200 font-medium",
                    isActive(item.href) && "text-white"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="flex items-center gap-2">
                    <span>{item.name}</span>
                    {item.external && <ExternalLink className="w-3 h-3" />}
                  </div>
                </ScrollLink>
              ))}
              <ScrollLink href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                <Button 
                  className="w-full bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 text-white hover:from-pink-500 hover:via-purple-600 hover:to-indigo-600 px-6 py-2 rounded-full font-medium transition-colors duration-200 mt-2"
                  data-testid="mobile-contact-button"
                >
                  Contact
                </Button>
              </ScrollLink>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}
