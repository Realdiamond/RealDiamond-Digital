"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, CheckCircle2 } from "lucide-react";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
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
    setError("");

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
        setIsSuccess(true);
      } else {
        setError(data.error || "Failed to send message. Please try again.");
      }
    } catch (error) {
      setError("Network error. Please check your connection and try again.");
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
    // Clear error when user starts typing
    if (error) setError("");
  };

  const resetForm = () => {
    setIsSuccess(false);
    setFormData({
      name: "",
      email: "",
      company: "",
      service: "",
      message: "",
    });
  };

  // Success State
  if (isSuccess) {
    return (
      <div className="text-center py-12 space-y-6">
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-green-600 dark:text-green-400" />
          </div>
        </div>
        <div className="space-y-3">
          <h3 className="text-2xl font-bold text-foreground">Message Sent Successfully!</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            Thank you for reaching out! We've received your message and will get back to you within 24 hours.
          </p>
        </div>
        <Button
          onClick={resetForm}
          variant="outline"
          className="mt-4"
        >
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-2">
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
          className="bg-background/50"
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
          Email Address *
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={handleChange}
          placeholder="john@example.com"
          className="bg-background/50"
        />
      </div>

      {/* Company */}
      <div>
        <label htmlFor="company" className="block text-sm font-semibold text-foreground mb-2">
          Company Name
        </label>
        <Input
          id="company"
          name="company"
          type="text"
          value={formData.company}
          onChange={handleChange}
          placeholder="Your Company"
          className="bg-background/50"
        />
      </div>

      {/* Service Interest */}
      <div>
        <label htmlFor="service" className="block text-sm font-semibold text-foreground mb-2">
          What service are you interested in?
        </label>
        <select
          id="service"
          name="service"
          value={formData.service}
          onChange={handleChange as any}
          className="flex h-11 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <option value="">Select a service</option>
          <option value="web-design">Web Design & Development</option>
          <option value="seo">SEO & Online Visibility</option>
          <option value="branding">Brand & Visual Design</option>
          <option value="growth">Growth & Optimization</option>
          <option value="other">Other / Not Sure</option>
        </select>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-foreground mb-2">
          Tell us about your project *
        </label>
        <Textarea
          id="message"
          name="message"
          required
          value={formData.message}
          onChange={handleChange}
          placeholder="I'm looking for help with..."
          rows={6}
          className="bg-background/50 resize-none"
        />
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        size="lg"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-accent to-accent-secondary hover:shadow-glow"
      >
        {isSubmitting ? "Sending..." : "Send Message"}
        <Send className="w-4 h-4" />
      </Button>

      <p className="text-sm text-muted-foreground text-center">
        We'll respond within 24 hours. Usually much faster!
      </p>
    </form>
  );
}
