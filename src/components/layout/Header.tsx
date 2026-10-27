"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight, Menu, X } from "lucide-react";

const navLinks = [
  { href: "/portfolio", label: "Case Studies" },
  { href: "/projects", label: "Projects" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path || pathname.startsWith(`${path}/`);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-colors duration-300 ${
        isScrolled || isMenuOpen
          ? "bg-background/95 backdrop-blur-sm border-border"
          : "bg-background/0 border-transparent"
      }`}
    >
      <div className="container-wide">
        <nav className="flex items-center justify-between h-20" aria-label="Main">
          <Link href="/" className="flex items-center" aria-label="RealDiamond Digital home">
            <Image
              src="/icons/logo.png"
              alt="RealDiamond Digital"
              width={300}
              height={68}
              className="h-9 w-auto object-contain logo-on-dark"
              priority
            />
          </Link>

          <ul className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={`relative text-[15px] font-medium transition-colors ${
                    isActive(link.href) ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-accent" aria-hidden="true" />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden lg:block">
            <Button variant="accent" asChild>
              <Link href="/contact">
                Start a project
                <ArrowRight />
              </Link>
            </Button>
          </div>

          <button
            type="button"
            className="lg:hidden w-11 h-11 flex items-center justify-center border border-border bg-card rounded-md"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>

        {isMenuOpen && (
          <div className="lg:hidden pb-6 animate-fade-in">
            <ul className="border-t border-border">
              {navLinks.map((link) => (
                <li key={link.href} className="border-b border-border">
                  <Link
                    href={link.href}
                    className={`flex items-center justify-between py-4 text-lg font-medium ${
                      isActive(link.href) ? "text-accent" : "text-foreground"
                    }`}
                  >
                    {link.label}
                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                  </Link>
                </li>
              ))}
            </ul>
            <Button variant="accent" size="lg" className="w-full mt-6" asChild>
              <Link href="/contact">Start a project</Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
