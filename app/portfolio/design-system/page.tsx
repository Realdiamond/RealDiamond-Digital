import Link from "next/link";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { generateSEO } from "@/lib/seo";
import { ArrowLeft, ArrowRight } from "lucide-react";

export const metadata = generateSEO({
  title: "Design System – UI/UX Case Study",
  description:
    "The Source design system behind realdiamonddigital.studio: tokens, type, an annotation kit and components, built in Tailwind CSS and React.",
  keywords: ["design system", "design tokens", "component library", "UI/UX case study"],
  canonical: "https://realdiamonddigital.studio/portfolio/design-system",
});

const colorTokens = [
  { name: "Ink", token: "--foreground", value: "hsl(216 33% 92%)", role: "Headings, body text and light panels" },
  { name: "Canvas", token: "--background", value: "hsl(220 27% 6%)", role: "Page background under the grid" },
  { name: "Grid", token: "--grid", value: "hsl(220 22% 9.5%)", role: "Faint 32px grid lines" },
  { name: "Brand blue", token: "--accent", value: "hsl(222 100% 68%)", role: "The one colour for actions, links and focus" },
  { name: "String amber", token: "--annotation", value: "hsl(38 92% 62%)", role: "Annotation lines, frames and markers" },
  { name: "Amber ink", token: "--annotation-ink", value: "hsl(38 92% 68%)", role: "Code comments and stack tags" },
  { name: "Muted text", token: "--muted-foreground", value: "hsl(218 16% 68%)", role: "Supporting text and captions" },
  { name: "Hairline", token: "--border", value: "hsl(220 18% 19%)", role: "Panel borders and dividers" },
];

const typeScale = [
  { label: "Display · 88/86", className: "text-5xl sm:text-6xl lg:text-[88px] lg:leading-[0.98] font-bold tracking-[-0.03em]", sample: "Structure first." },
  { label: "H1 · 72", className: "text-5xl lg:text-7xl font-bold tracking-[-0.03em]", sample: "Services" },
  { label: "H2 · 48", className: "text-4xl md:text-5xl font-bold", sample: "Selected work" },
  { label: "H3 · 24", className: "text-2xl font-semibold", sample: "UI/UX Design" },
  { label: "Body large · 20", className: "text-xl text-muted-foreground", sample: "Websites people understand at first glance." },
  { label: "Body · 16", className: "text-base text-muted-foreground", sample: "Every solution is tailored to your goals." },
  { label: "Label · Mono 12", className: "bp-label", sample: "Ceramics studio · Canada · 2025" },
];

const buttonVariants = ["accent", "default", "outline", "secondary", "ghost", "link"] as const;
const buttonSizes = ["sm", "default", "lg", "xl"] as const;

const principles = [
  {
    title: "Speak the language of the work",
    description:
      "Notes read like code comments and results like string literals, so the interface uses the same vocabulary as the code behind it.",
  },
  {
    title: "One colour for action",
    description: "Brand blue is reserved for actions, links and focus. Amber is only for annotations and stack tags, so the two never compete.",
  },
  {
    title: "Tokens, not hard-coded values",
    description:
      "Every colour is an HSL CSS variable consumed through Tailwind (bg-accent, text-muted-foreground), so one change updates every screen.",
  },
  {
    title: "Accessible by default",
    description:
      "Text colours meet WCAG AA contrast on the dark canvas, and every interactive component shares one visible focus ring for keyboard users.",
  },
];

export default function DesignSystemPage() {
  return (
    <Layout hideAgencyWidgets>
      <section className="pt-10 pb-12 lg:pt-14 lg:pb-16">
        <div className="container-wide">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-accent transition-colors mb-10"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to portfolio
          </Link>
          <div className="max-w-4xl">
            <p className="bp-label mb-6">Design system case study</p>
            <h1 className="text-[44px] leading-[1.02] sm:text-6xl lg:text-7xl font-bold tracking-[-0.03em]">
              The Source design system
            </h1>
            <p className="bp-note mt-4">rendered live from the production code, not from static images</p>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mt-6 max-w-3xl">
              realdiamonddigital.studio runs on a small token-based design system I built with Tailwind CSS and React. It
              treats every page like a code editor: a dark canvas with a faint grid, light type, one blue for action and
              code-comment annotations in string-literal amber.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="container-wide">
          <div className="bp-heading mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold">Principles</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border">
            {principles.map((principle) => (
              <div key={principle.title} className="bg-card p-6">
                <h3 className="font-semibold text-lg mb-2">{principle.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{principle.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="container-wide">
          <div className="bp-heading mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold">Colour tokens</h2>
            <span className="bp-note">{colorTokens.length} tokens</span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border">
            {colorTokens.map((color) => (
              <div key={color.token} className="bg-card">
                <div className="h-24 border-b border-border" style={{ background: `hsl(var(${color.token}))` }} />
                <div className="p-4">
                  <p className="font-semibold">{color.name}</p>
                  <p className="font-mono text-xs text-muted-foreground mt-1">{color.token}</p>
                  <p className="font-mono text-xs text-muted-foreground">{color.value}</p>
                  <p className="text-sm text-muted-foreground mt-2">{color.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="container-wide">
          <div className="bp-heading mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold">Typography</h2>
            <span className="bp-note">Geist · Geist Mono</span>
          </div>
          <div className="bp-panel divide-y divide-border">
            {typeScale.map((type) => (
              <div key={type.label} className="grid md:grid-cols-[200px_minmax(0,1fr)] gap-2 md:gap-6 items-baseline p-5 sm:p-6">
                <p className="bp-label">{type.label}</p>
                <p className={`${type.className} min-w-0 break-words`}>{type.sample}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="container-wide">
          <div className="bp-heading mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold">Annotation kit</h2>
            <span className="bp-note">the pieces that make the Source look</span>
          </div>
          <div className="grid lg:grid-cols-2 gap-px bg-border border border-border">
            <div className="bg-card p-8 sm:p-10">
              <p className="bp-label mb-10">Frame + note · .bp-frame .bp-note</p>
              <div className="relative bp-frame">
                <span className="bp-note absolute -top-8 left-0">H2 · 48/52</span>
                <p className="text-4xl font-bold">Annotated heading</p>
              </div>
              <div className="bp-spacer my-4" data-size="24" aria-hidden="true" />
              <p className="text-muted-foreground">Spacing marker · .bp-spacer</p>
            </div>
            <div className="bg-card p-8 sm:p-10 flex flex-col gap-8">
              <div>
                <p className="bp-label mb-4">Result tag · .bp-result</p>
                <span className="bp-result">+75% traffic in month one</span>
              </div>
              <div>
                <p className="bp-label mb-4">Highlight · .bp-highlight</p>
                <p className="text-3xl font-bold">
                  Design the <span className="bp-highlight">structure</span>
                </p>
              </div>
              <div>
                <p className="bp-label mb-5">Crop marks · .bp-crop</p>
                <div className="bp-crop bp-panel p-4 w-48">
                  <i aria-hidden="true" />
                  <i aria-hidden="true" />
                  <i aria-hidden="true" />
                  <i aria-hidden="true" />
                  <div className="aspect-[4/3] bg-secondary flex items-center justify-center font-mono text-xs text-muted-foreground">
                    4:3
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="container-wide">
          <div className="bp-heading mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold">Buttons</h2>
            <span className="bp-note">
              one component · {buttonVariants.length} variants · {buttonSizes.length} sizes
            </span>
          </div>
          <div className="bp-panel p-6 sm:p-8 space-y-8">
            <div className="flex flex-wrap gap-4 items-center">
              {buttonVariants.map((variant) => (
                <Button key={variant} variant={variant}>
                  {variant.charAt(0).toUpperCase() + variant.slice(1)}
                </Button>
              ))}
            </div>
            <div className="flex flex-wrap gap-4 items-end">
              {buttonSizes.map((size) => (
                <Button key={size} variant="accent" size={size}>
                  {size === "default" ? "Default" : size.toUpperCase()}
                  <ArrowRight />
                </Button>
              ))}
            </div>
            <div className="flex flex-wrap gap-4 items-center">
              <Button variant="accent" disabled>
                Disabled
              </Button>
              <p className="text-muted-foreground">Press Tab to see the shared focus ring.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="container-wide">
          <div className="bp-heading mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold">Panels</h2>
            <span className="bp-note">flat panels on a dark grid, no glows or gradients</span>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bp-panel p-6">
              <p className="bp-label mb-3">Panel</p>
              <p className="text-muted-foreground">Card surface with a 1px hairline. Used for most content.</p>
            </div>
            <div className="grid grid-cols-2 gap-px bg-border border border-border">
              {["Hairline", "grid", "for", "groups"].map((cell) => (
                <div key={cell} className="bg-card p-4 font-mono text-xs text-muted-foreground">
                  {cell}
                </div>
              ))}
            </div>
            <div className="bg-foreground text-background p-6">
              <p className="font-mono text-xs uppercase tracking-wider text-background/60 mb-3">Light panel</p>
              <p className="text-background/80">For the one moment per page that needs the most attention.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-8 pb-20 lg:pb-24">
        <div className="container-wide">
          <Link href="/portfolio" className="inline-flex items-center gap-2 font-semibold text-accent hover:gap-3 transition-all">
            <ArrowLeft className="w-4 h-4" />
            All case studies
          </Link>
        </div>
      </section>
    </Layout>
  );
}
