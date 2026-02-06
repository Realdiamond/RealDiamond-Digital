import Layout from "@/components/layout/Layout";
import ContactForm from "@/components/ContactForm";
import FAQ from "@/components/sections/FAQ";
import { Button } from "@/components/ui/button";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  CheckCircle, 
  ArrowRight,
  Calendar,
  Sparkles
} from "lucide-react";

const Contact = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-24 pb-16 bg-background relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="bg-orb bg-orb-1 opacity-20" />
          <div className="bg-orb bg-orb-2 opacity-15" />
        </div>

        <div className="container-wide relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 glass-card mb-6">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-muted-foreground">Get in Touch</span>
            </div>
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6">
              Let's Discuss Your{" "}
              <span className="text-gradient">Project</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Whether you have a specific project in mind or just want to explore how we can help, 
              we'd love to hear from you. Let's start a conversation.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-background">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-foreground mb-6">
                Send Us a Message
              </h2>
              <ContactForm />
            </div>

            {/* Contact Info */}
            <div>
              <div className="glass-card p-8 mb-8">
                <h2 className="font-heading text-2xl font-bold text-foreground mb-6">
                  Contact Information
                </h2>
                <div className="space-y-6">
                  {[
                    { icon: Mail, label: "Email Us", value: "realdiamonddigital@gmail.com" },
                    { icon: Phone, label: "Call Us", value: "08138462476" },
                    { icon: MapPin, label: "Location", value: "Available Worldwide" },
                    { icon: Clock, label: "Response Time", value: "We respond within 24 business hours" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-accent to-accent-secondary rounded-xl flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-5 h-5 text-accent-foreground" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{item.label}</p>
                        <p className="text-muted-foreground">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Book a Call CTA */}
              <div id="consultation" className="glass-card p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-accent-secondary/10" />
                <div className="relative z-10">
                  <Calendar className="w-10 h-10 text-accent mb-4" />
                  <h3 className="font-heading text-xl font-semibold text-foreground mb-3">
                    Prefer to Talk First?
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Schedule a free 30-minute consultation call to discuss your project and 
                    see if we're a good fit to work together.
                  </p>
                  <div className="space-y-3">
                    <Button asChild variant="hero" className="w-full">
                      <a href="https://calendly.com/realdiamonddigital/30-min-consultation-event" target="_blank" rel="noopener noreferrer">
                        Book via Calendly
                        <Calendar className="w-4 h-4" />
                      </a>
                    </Button>
                    <Button asChild variant="outline" className="w-full">
                      <a href="https://wa.me/2348138462476?text=Hi,%20I'd%20like%20to%20schedule%20a%20consultation" target="_blank" rel="noopener noreferrer">
                        Chat on WhatsApp
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="mt-8 space-y-3">
                {["No obligation consultation", "Honest assessment of your needs", "Clear pricing, no hidden fees"].map((text) => (
                  <div key={text} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-accent" />
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />
    </Layout>
  );
};

export default Contact;
