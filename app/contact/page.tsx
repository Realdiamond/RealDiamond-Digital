"use client";

import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  CheckCircle, 
  ArrowRight,
  Calendar,
  Send,
  Sparkles
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Message sent successfully!",
          description: "We'll get back to you within 24 hours.",
        });

        setFormData({
          name: "",
          email: "",
          company: "",
          service: "",
          message: "",
        });
      } else {
        toast({
          title: "Failed to send message",
          description: data.error || "Please try again later.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Failed to send message",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

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
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Your Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Smith"
                      className="bg-secondary border-border/50 focus:border-accent"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email Address *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@company.com"
                      className="bg-secondary border-border/50 focus:border-accent"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-foreground mb-2">
                    Company Name
                  </label>
                  <Input
                    id="company"
                    name="company"
                    type="text"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Your Company"
                    className="bg-secondary border-border/50 focus:border-accent"
                  />
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-foreground mb-2">
                    Service Interested In
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full h-11 px-4 rounded-xl border border-border/50 bg-secondary text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  >
                    <option value="">Select a service</option>
                    <option value="web-development">Web Design & Development</option>
                    <option value="seo">SEO & Online Visibility</option>
                    <option value="design">Brand & Visual Design</option>
                    <option value="growth">Growth & Optimization</option>
                    <option value="other">Not sure / Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Tell Us About Your Project *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="What are you looking to achieve? What challenges are you facing?"
                    className="bg-secondary border-border/50 focus:border-accent"
                  />
                </div>

                <Button 
                  type="submit" 
                  variant="hero" 
                  size="lg" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <div className="glass-card p-8 mb-8">
                <h2 className="font-heading text-2xl font-bold text-foreground mb-6">
                  Contact Information
                </h2>
                <div className="space-y-6">
                  {[
                    { icon: Mail, label: "Email Us", value: "hello@diamondworks.com" },
                    { icon: Phone, label: "Call Us", value: "+1 (555) 123-4567" },
                    { icon: MapPin, label: "Location", value: "Working globally with clients worldwide" },
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
              <div className="glass-card p-8 relative overflow-hidden">
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
                  <Button variant="hero" className="w-full">
                    Book a Free Consultation
                    <ArrowRight className="w-4 h-4" />
                  </Button>
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
    </Layout>
  );
};

export default Contact;
