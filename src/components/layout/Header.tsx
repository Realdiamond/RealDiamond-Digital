"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? "bg-background/95 backdrop-blur-md border-b border-border/50 shadow-sm" 
          : "bg-transparent"
      }`}
    >
      <div className="container-wide">
        <nav className="flex items-center justify-between h-20">
          <a href="/" className="flex items-center justify-center group">
            <Image
              src="/icons/logo.png"
              alt="RealDiamond Digital"
              width={300}
              height={120}
              className="h-16 w-auto object-contain transition-opacity duration-300 group-hover:opacity-80"
              priority
            />
          </a>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-all duration-300 relative ${
                  isActive(link.href)
                    ? "text-accent"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-accent to-accent-secondary rounded-full" />
                )}
              </a>
            ))}
          </div>

          <div className="hidden lg:block">
            <Button className="bg-gradient-to-r from-accent to-accent-secondary hover:shadow-glow text-white font-semibold">
              <a href="/contact">Start Project</a>
            </Button>
          </div>

          <button
            className="lg:hidden p-2 glass-card"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </nav>

        {isMenuOpen && (
          <div className="lg:hidden py-6 border-t border-border/50 animate-fade-in bg-background/95 backdrop-blur-md">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-base font-medium py-3 px-4 rounded-xl transition-all ${
                    isActive(link.href)
                      ? "text-accent bg-accent/10"
                      : "text-foreground hover:text-accent hover:bg-secondary"
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <Button className="mt-4 bg-gradient-to-r from-accent to-accent-secondary hover:shadow-glow text-white font-semibold">
                <a href="/contact" onClick={() => setIsMenuOpen(false)}>
                  Start Project
                </a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
