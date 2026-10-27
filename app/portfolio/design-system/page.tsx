import Link from "next/link";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { generateSEO } from "@/lib/seo";
import { ArrowLeft, ArrowRight, Sparkles, Globe, PenTool, Layers, Code } from "lucide-react";

export const metadata = generateSEO({
  title: "Design System – UI/UX Case Study",
  description:
    "The tokens, type scale, and components behind realdiamonddigital.studio, built in Tailwind CSS and React with light and dark themes.",
  keywords: ["design system", "design tokens", "component library", "UI/UX case study"],
  canonical: "https://realdiamonddigital.studio/portfolio/design-system",
});

const colorTokens = [
  { name: "Primary", token: "--primary", value: "hsl(220 50% 15%)", role: "Deep navy for default buttons and dark surfaces" },
  { name: "Accent", token: "--accent", value: "hsl(210 95% 55%)", role: "Electric blue for primary actions, links, and focus rings" },
  { name: "Accent secondary", token: "--accent-secondary", value: "hsl(265 85% 60%)", role: "Royal purple, used only in gradients" },
  { name: "Foreground", token: "--foreground", value: "hsl(220 60% 10%)", role: "Headings and body text" },
  { name: "Muted foreground", token: "--muted-foreground", value: "hsl(220 20% 40%)", role: "Supporting text and captions" },
  { name: "Secondary", token: "--secondary", value: "hsl(220 10% 95%)", role: "Chips, subtle fills, and alternating sections" },
  { name: "Border", token: "--border", value: "hsl(220 20% 88%)", role: "Dividers and component outlines" },
  { name: "Destructive", token: "--destructive", value: "hsl(0 84% 60%)", role: "Errors and destructive actions" },
];

const typeScale = [
  { label: "Display", className: "text-6xl md:text-7xl font-bold tracking-tighter leading-[0.95]", sample: "More Calls." },
  { label: "Heading 1", className: "text-5xl font-bold", sample: "Digital Solutions" },
  { label: "Heading 2", className: "text-4xl font-bold", sample: "Selected case studies" },
  { label: "Heading 3", className: "text-2xl font-bold", sample: "UI/UX Design" },
  { label: "Body large", className: "text-xl text-muted-foreground", sample: "Intuitive experiences that turn visitors into customers." },
  { label: "Body", className: "text-base text-muted-foreground", sample: "Every solution is tailored to your specific goals." },
  { label: "Caption", className: "text-sm text-muted-foreground", sample: "Supporting details, labels, and metadata." },
];

const buttonVariants = ["default", "accent", "hero", "outline", "secondary", "ghost", "glass", "link"] as const;
const buttonSizes = ["sm", "default", "lg", "xl"] as const;

const principles = [
  {
    title: "Tokens, not hard-coded values",
    description:
      "Every colour is an HSL CSS variable consumed through Tailwind (bg-accent, text-muted-foreground), so a change in one place updates every screen.",
  },
  {
    title: "Light and dark themes",
    description: "The same tokens are redefined under a .dark class, so every component supports both themes without extra code.",
  },
  {
    title: "One colour for action",
    description: "Electric blue is reserved for actions and links. Purple appears only inside gradients, so it never competes with a call-to-action.",
  },
  {
    title: "Accessible by default",
    description:
      "Interactive components share a visible focus ring for keyboard users and a consistent disabled state, defined once in the base button styles.",
  },
];

export default function DesignSystemPage() {
  return (
    <Layout hideAgencyWidgets>
      <section className="pt-24 pb-12 bg-background relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="bg-orb bg-orb-1 opacity-20" />
          <div className="bg-orb bg-orb-2 opacity-15" />
        </div>
        <div className="container-wide relative">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to portfolio
          </Link>
          <div className="max-w-3xl">
            <p className="text-sm font-medium text-accent mb-3">Design System Case Study</p>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              The RealDiamond Digital design system
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-4">
              realdiamonddigital.studio runs on a small, token-based design system I built with Tailwind CSS and React. Every
              page, from services to this portfolio, is assembled from the same colours, type scale, and components.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Everything on this page is rendered live from the production code, not from static images.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-secondary/30">
        <div className="container-wide">
          <h2 className="font-heading text-3xl font-bold text-foreground mb-8">Principles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {principles.map((principle) => (
              <div key={principle.title} className="glass-card p-6">
                <h3 className="font-semibold text-foreground mb-2">{principle.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{principle.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container-wide">
          <h2 className="font-heading text-3xl font-bold text-foreground mb-2">Colour tokens</h2>
          <p className="text-muted-foreground mb-8">Light theme values. Each token is redefined for the dark theme.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {colorTokens.map((color) => (
              <div key={color.token} className="glass-card overflow-hidden">
                <div className="h-24 border-b border-border" style={{ background: `hsl(var(${color.token}))` }} />
                <div className="p-4">
                  <p className="font-semibold text-foreground">{color.name}</p>
                  <p className="text-xs font-mono text-muted-foreground mt-1">{color.token}</p>
                  <p className="text-xs font-mono text-muted-foreground">{color.value}</p>
                  <p className="text-sm text-muted-foreground mt-2">{color.role}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 glass-card overflow-hidden">
            <div className="h-20 bg-gradient-to-r from-accent to-accent-secondary" />
            <div className="p-4">
              <p className="font-semibold text-foreground">Brand gradient</p>
              <p className="text-sm text-muted-foreground">Accent to accent secondary, used for hero buttons and highlighted words.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-secondary/30">
        <div className="container-wide">
          <h2 className="font-heading text-3xl font-bold text-foreground mb-8">Typography</h2>
          <div className="glass-card divide-y divide-border">
            {typeScale.map((type) => (
              <div key={type.label} className="grid md:grid-cols-[180px_1fr] gap-2 md:gap-6 items-baseline p-6">
                <p className="text-sm font-medium text-muted-foreground">{type.label}</p>
                <p className={`font-heading text-foreground ${type.className}`}>{type.sample}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container-wide">
          <h2 className="font-heading text-3xl font-bold text-foreground mb-2">Buttons</h2>
          <p className="text-muted-foreground mb-8">
            One component with {buttonVariants.length} visual variants and {buttonSizes.length} sizes, built with
            class-variance-authority.
          </p>
          <div className="glass-card p-6 md:p-8 space-y-8">
            <div className="flex flex-wrap gap-4 items-center">
              {buttonVariants.map((variant) => (
                <Button key={variant} variant={variant}>
                  {variant === "default" ? "Default" : variant.charAt(0).toUpperCase() + variant.slice(1)}
                </Button>
              ))}
            </div>
            <div className="flex flex-wrap gap-4 items-end">
              {buttonSizes.map((size) => (
                <Button key={size} variant="accent" size={size}>
                  {size === "default" ? "Default" : size.toUpperCase()}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              ))}
            </div>
            <div className="flex flex-wrap gap-4 items-center">
              <Button variant="accent" disabled>
                Disabled
              </Button>
              <p className="text-sm text-muted-foreground">Press Tab to see the shared focus ring.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-secondary/30">
        <div className="container-wide">
          <h2 className="font-heading text-3xl font-bold text-foreground mb-8">Components</h2>
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="glass-card p-8">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg bg-gradient-to-br from-indigo-500 to-violet-500">
                <PenTool className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-foreground mb-3">Service card</h3>
              <p className="text-muted-foreground mb-6">Icon tile, title, summary, and up to four sub-service chips.</p>
              <div className="flex flex-wrap gap-2">
                {[
                  { icon: Globe, label: "Chip" },
                  { icon: Layers, label: "With icon" },
                  { icon: Code, label: "Consistent" },
                ].map((chip) => (
                  <span
                    key={chip.label}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-secondary text-foreground text-xs font-medium rounded-lg border border-border/50"
                  >
                    <chip.icon className="w-3.5 h-3.5 text-accent" />
                    {chip.label}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="glass-card p-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 glass-card mb-4">
                  <Sparkles className="w-4 h-4 text-accent" />
                  <span className="text-sm font-medium text-muted-foreground">Section label</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Glass surfaces combine a translucent background, a 24px backdrop blur, and a soft border token.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: "Glass", className: "shadow-glass" },
                  { label: "Elevated", className: "shadow-elevated" },
                  { label: "Glow", className: "shadow-glow" },
                ].map((shadow) => (
                  <div key={shadow.label} className={`bg-card rounded-2xl p-4 h-24 flex items-end ${shadow.className}`}>
                    <span className="text-sm font-medium text-foreground">{shadow.label}</span>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Buttons · 12px radius", className: "rounded-xl" },
                  { label: "Cards & chips · 16px radius", className: "rounded-2xl" },
                ].map((radius) => (
                  <div key={radius.label} className={`border-2 border-accent/60 bg-accent/5 h-20 p-3 flex items-end ${radius.className}`}>
                    <span className="text-sm font-medium text-foreground">{radius.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container-wide flex justify-between items-center">
          <Link href="/portfolio" className="inline-flex items-center gap-2 text-accent font-semibold">
            <ArrowLeft className="w-4 h-4" />
            All case studies
          </Link>
        </div>
      </section>
    </Layout>
  );
}
