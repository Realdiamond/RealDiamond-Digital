import Layout from "@/components/layout/Layout";
import PageHeader from "@/components/layout/PageHeader";
import ContactForm from "@/components/ContactForm";
import FAQ from "@/components/sections/FAQ";
import { Button } from "@/components/ui/button";
import { FaWhatsapp } from "react-icons/fa";
import { Calendar } from "lucide-react";
import { generateSEO } from "@/lib/seo";

export const metadata = generateSEO({
  title: "Contact Us",
  description:
    "Get in touch with RealDiamond Digital. Schedule a free consultation to discuss your web design, SEO, or digital marketing project. Available worldwide.",
  keywords: ["contact", "free consultation", "get quote", "digital marketing consultation", "web design inquiry"],
  canonical: "https://realdiamonddigital.studio/contact",
});

const details = [
  { label: "Email", value: "realdiamonddigital@gmail.com", href: "mailto:realdiamonddigital@gmail.com" },
  { label: "Phone / WhatsApp", value: "+234 813 846 2476", href: "tel:+2348138462476" },
  { label: "Location", value: "Nigeria · working worldwide" },
  { label: "Response time", value: "Within 24 business hours" },
];

const assurances = ["No-obligation first call", "Honest assessment of what you need", "Clear pricing, no hidden fees"];

const Contact = () => {
  return (
    <Layout>
      <PageHeader
        eyebrow="Contact"
        title="Tell me what you're building."
        description="Whether you have a clear brief or just a problem with your current website, send a message or book a call. You'll hear back from me, not a sales team."
      />

      <section className="pb-16 lg:pb-24">
        <div className="container-wide grid lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] gap-8 items-start">
          <div className="bp-panel p-6 sm:p-8">
            <div className="bp-heading mb-6">
              <h2 className="text-2xl font-bold">Send a message</h2>
              <span className="bp-note">all fields marked * are required</span>
            </div>
            <ContactForm />
          </div>

          <div className="space-y-8">
            <div id="consultation" className="bg-foreground text-background p-6 sm:p-8 scroll-mt-28">
              <p className="font-mono text-xs uppercase tracking-wider text-background/60 mb-4">Prefer to talk first?</p>
              <h2 className="text-2xl font-bold mb-3">Book a free 30-minute call</h2>
              <p className="text-background/75 leading-relaxed mb-6">
                We&apos;ll talk through your project and whether we&apos;re a good fit, with no obligation.
              </p>
              <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3">
                <Button variant="accent" className="flex-1" asChild>
                  <a href="https://calendly.com/realdiamonddigital/30-min-consultation-event" target="_blank" rel="noopener noreferrer">
                    Book via Calendly
                    <Calendar />
                  </a>
                </Button>
                <Button className="flex-1 bg-transparent border border-background/30 text-background hover:bg-background/10" asChild>
                  <a
                    href="https://wa.me/2348138462476?text=Hi,%20I'd%20like%20to%20schedule%20a%20consultation"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Chat on WhatsApp
                    <FaWhatsapp />
                  </a>
                </Button>
              </div>
            </div>

            <dl className="gap-px bg-border border border-border grid">
              {details.map((item) => (
                <div key={item.label} className="bg-card p-5">
                  <dt className="bp-label mb-1.5">{item.label}</dt>
                  <dd className="font-medium break-words">
                    {item.href ? (
                      <a href={item.href} className="hover:text-accent transition-colors">
                        {item.value}
                      </a>
                    ) : (
                      item.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>

            <ul className="space-y-2.5">
              {assurances.map((text) => (
                <li key={text} className="flex items-center gap-3 text-muted-foreground">
                  <span className="w-1.5 h-1.5 bg-accent shrink-0" aria-hidden="true" />
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <FAQ />
    </Layout>
  );
};

export default Contact;
