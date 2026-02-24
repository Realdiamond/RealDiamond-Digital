import Link from "next/link";
import { Mail, Phone, MapPin, Linkedin, Twitter, Instagram } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-secondary/50 border-t border-border/50 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="bg-orb bg-orb-2 opacity-20" />
      </div>

      <div className="container-wide section-padding relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-6">
            <Link href="/" className="flex items-center">
              <Image
                src="/icons/logo.png"
                alt="RealDiamond Digital"
                width={300}
                height={120}
                className="h-24 w-auto object-contain"
              />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Strategic web design, development & SEO that transforms visitors into customers and grows revenue.
            </p>
            <div className="flex gap-3">
              {[
                { Icon: Linkedin, href: "https://www.linkedin.com/in/oluwatimilehin0-akinsanmi1/" },
                { Icon: Twitter, href: "https://x.com/Iam_RealDiamond/" },
                { Icon: Instagram, href: "#" },
              ].map(({ Icon, href }, i) => (
                <a 
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 glass-card flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent/50 transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
              <a 
                href="https://wa.me/2348138462476"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 glass-card flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent/50 transition-all duration-300"
              >
                <FaWhatsapp className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="font-heading font-semibold text-lg text-foreground">Services</h4>
            <ul className="space-y-3">
              {["Web Design & Development", "SEO & Online Visibility", "Brand & Visual Design", "Growth & Optimization"].map((service) => (
                <li key={service}>
                  <Link href="/services" className="text-muted-foreground hover:text-accent text-sm transition-colors">
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="font-heading font-semibold text-lg text-foreground">Company</h4>
            <ul className="space-y-3">
              {[
                { label: "About Us", href: "/about" },
                { label: "Projects", href: "/projects" },
                { label: "Testimonials", href: "/testimonials" },
                { label: "Blog", href: "/blog" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-muted-foreground hover:text-accent text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="font-heading font-semibold text-lg text-foreground">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 glass-card flex items-center justify-center">
                  <Mail className="w-4 h-4 text-accent" />
                </div>
                <a href="mailto:realdiamonddigital@gmail.com" className="text-muted-foreground hover:text-accent transition-colors">
                  realdiamonddigital@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 glass-card flex items-center justify-center">
                  <Phone className="w-4 h-4 text-accent" />
                </div>
                <a href="tel:08138462476" className="text-muted-foreground hover:text-accent transition-colors">
                  08138462476
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <div className="w-8 h-8 glass-card flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-accent" />
                </div>
                <span>Available Worldwide</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} RealDiamond Digital. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
