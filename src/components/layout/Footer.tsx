import Link from "next/link";
import Image from "next/image";
import { Linkedin, Twitter } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const columns = [
  {
    title: "Work",
    links: [
      { label: "Case studies", href: "/portfolio" },
      { label: "All projects", href: "/projects" },
      { label: "Design system", href: "/portfolio/design-system" },
      { label: "Testimonials", href: "/testimonials" },
    ],
  },
  {
    title: "Studio",
    links: [
      { label: "Services", href: "/services" },
      { label: "About", href: "/about" },
      { label: "Community", href: "/community" },
      { label: "Blog", href: "/blog" },
    ],
  },
];

const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/oluwatimilehin0-akinsanmi1/", Icon: Linkedin },
  { label: "X (Twitter)", href: "https://x.com/Iam_RealDiamond/", Icon: Twitter },
  { label: "WhatsApp", href: "https://wa.me/2348138462476", Icon: FaWhatsapp },
];

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container-wide py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] gap-12">
          <div className="space-y-5">
            <Link href="/" className="inline-flex" aria-label="RealDiamond Digital home">
              <Image
                src="/icons/logo.png"
                alt="RealDiamond Digital"
                width={300}
                height={68}
                className="h-9 w-auto object-contain"
              />
            </Link>
            <p className="text-muted-foreground leading-relaxed max-w-xs">
              A small design and development studio led by Oluwatimilehin Akinsanmi. UI/UX design, websites and SEO
              for organisations that want to be understood at first glance.
            </p>
            <div className="flex gap-2">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 flex items-center justify-center border border-border rounded-md text-muted-foreground hover:text-accent hover:border-accent transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <p className="bp-label mb-5">{column.title}</p>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-foreground hover:text-accent transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <p className="bp-label mb-5">Contact</p>
            <ul className="space-y-3">
              <li>
                <a href="mailto:realdiamonddigital@gmail.com" className="text-foreground hover:text-accent transition-colors break-all">
                  realdiamonddigital@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+2348138462476" className="text-foreground hover:text-accent transition-colors">
                  +234 813 846 2476
                </a>
              </li>
              <li className="text-muted-foreground">Based in Nigeria, working worldwide</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-border flex flex-col sm:flex-row justify-between gap-3">
          <p className="font-mono text-xs text-muted-foreground">
            © {new Date().getFullYear()} RealDiamond Digital
          </p>
          <p className="font-mono text-xs text-muted-foreground">Designed and built in-house on an 8pt grid</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
