import Link from "next/link";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import CTA from "@/components/sections/CTA";
import { ArrowRight, Target, Users, Lightbulb, Award, Clock, Heart, Sparkles, Diamond, TrendingUp, Star, Zap } from "lucide-react";
import { generateSEO } from '@/lib/seo';
import { client } from '@/sanity/lib/client';
import Image from 'next/image';

export const metadata = generateSEO({
  title: 'About Us',
  description: 'Meet the team behind RealDiamond Digital. We combine strategic thinking with creative execution to deliver measurable results for businesses worldwide.',
  keywords: ['about us', 'digital agency team', 'web design experts', 'SEO specialists', 'digital marketing professionals'],
  canonical: 'https://realdiamonddigital.studio/about',
});

// Time-based ISR
export const revalidate = 3600; // 1 hour

// Fetch CEO/team data
async function getCEOData() {
  const ceo = await client.fetch(
    `*[_type == "teamMember" && role match "CEO*"][0]{
      name,
      role,
      initials,
      bio,
      "image": image.asset->url,
      linkedin,
      twitter,
      email
    }`,
    {},
    {
      next: { revalidate: 3600 }
    }
  );
  return ceo;
}

const values = [
  {
    icon: Target,
    title: "Results-Driven",
    description: "Every decision we make is guided by the outcomes that matter most to your business.",
  },
  {
    icon: Heart,
    title: "Client-Centered",
    description: "We treat your business as if it were our own, bringing the same care and commitment.",
  },
  {
    icon: Lightbulb,
    title: "Strategic Thinking",
    description: "We focus on long-term growth strategies, not quick fixes or surface-level solutions.",
  },
  {
    icon: Clock,
    title: "Reliable Delivery",
    description: "We set clear expectations and consistently deliver on our commitments.",
  },
];

const About = async () => {
  const ceo = await getCEOData();

  return (
    <Layout>
      <section className="pt-24 pb-16 bg-background relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="bg-orb bg-orb-1 opacity-20" />
          <div className="bg-orb bg-orb-2 opacity-15" />
        </div>

        <div className="container-wide relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 glass-card mb-6">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-muted-foreground">About RealDiamond Digital</span>
            </div>
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6">
              Your Partner for{" "}
              <span className="text-gradient">More Calls & Revenue</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              We're a CEO-led digital agency focused on building high-converting websites and local SEO strategies 
              that help service businesses grow. We work closely with local service businesses like HVAC, plumbing, roofing, cleaning, and similar companies to deliver real leads and measurable revenue.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-accent font-medium mb-4 tracking-wide uppercase text-sm">Our Story</p>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
                Built on Experience, <span className="text-gradient">Driven by Results</span>
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  RealDiamond Digital was founded with a clear vision: to provide businesses with the same 
                  level of digital expertise that large corporations have access to, but with the personal 
                  attention and agility that only a focused team can deliver.
                </p>
                <p>
                  We've seen too many businesses struggle with agencies that overpromise and underdeliver, 
                  or freelancers who lack the strategic depth to drive real results. That's why we built 
                  a different kind of agency—one that combines strategic thinking with hands-on execution.
                </p>
                <p>
                  Today, we specialize in helping local service businesses like HVAC, plumbing, roofing, cleaning, and similar companies who are ready to invest in their digital presence and see measurable returns.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="glass-card p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-accent-secondary/10" />
                <div className="relative z-10 space-y-8">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent-secondary rounded-xl flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="w-8 h-8 text-accent-foreground" />
                    </div>
                    <div>
                      <p className="text-3xl font-heading font-bold text-foreground">50+</p>
                      <p className="text-sm text-muted-foreground">Projects Delivered</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-accent-secondary to-accent rounded-xl flex items-center justify-center flex-shrink-0">
                      <Star className="w-8 h-8 text-accent-foreground" />
                    </div>
                    <div>
                      <p className="text-3xl font-heading font-bold text-foreground">4.9/5</p>
                      <p className="text-sm text-muted-foreground">Client Satisfaction</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent-secondary rounded-xl flex items-center justify-center flex-shrink-0">
                      <Zap className="w-8 h-8 text-accent-foreground" />
                    </div>
                    <div>
                      <p className="text-3xl font-heading font-bold text-foreground">3-5</p>
                      <p className="text-sm text-muted-foreground">Expert Team Members</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary/30 border-y border-border/50">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="lg:order-2">
              <div className="glass-card overflow-hidden relative group h-[650px] md:h-[700px]">
                {ceo?.image ? (
                  <>
                    <Image
                      src={ceo.image}
                      alt={ceo.name || 'CEO'}
                      fill
                      className="object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 via-30% to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-8 text-left z-10">
                      <p className="text-gradient font-heading text-2xl md:text-3xl font-bold mb-2">
                        {ceo?.name || 'Oluwatimilehin Akinsanmi'}
                      </p>
                      <p className="text-accent text-lg font-medium">{ceo?.role || 'CEO & Lead Strategist'}</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-br from-accent to-accent-secondary flex items-center justify-center">
                      <span className="font-heading text-8xl font-bold text-accent-foreground opacity-20">
                        {ceo?.initials || 'OA'}
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-8 text-left z-10 bg-gradient-to-t from-background via-background/50 via-30% to-transparent">
                      <p className="text-gradient font-heading text-2xl md:text-3xl font-bold mb-2">
                        {ceo?.name || 'Oluwatimilehin Akinsanmi'}
                      </p>
                      <p className="text-accent text-lg font-medium">{ceo?.role || 'CEO & Lead Strategist'}</p>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="lg:order-1">
              <p className="text-accent font-medium mb-4 tracking-wide uppercase text-sm">Leadership</p>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
                CEO-Led, <span className="text-gradient">Personally Invested</span>
              </h2>
              <div className="space-y-4 text-muted-foreground">
                {ceo?.bio ? (
                  <p>{ceo.bio}</p>
                ) : (
                  <>
                    <p>
                      RealDiamond Digital is led by <strong className="text-foreground">{ceo?.name || 'Oluwatimilehin Akinsanmi'}</strong>, 
                      who brings years of experience in digital strategy, web development, and business growth.
                    </p>
                    <p>
                      Unlike large agencies where your project might be handed off to junior staff, at RealDiamond Digital, 
                      the CEO is actively involved in every engagement. This means senior-level strategic thinking and 
                      hands-on attention from day one.
                    </p>
                    <p>
                      Backed by a dedicated team of 3-5 specialists in design, development, and SEO, we deliver the 
                      capabilities of a full-service agency with the personal commitment of a trusted partner.
                    </p>
                  </>
                )}
              </div>
              <div className="mt-8">
                <Button className="bg-gradient-to-r from-accent to-accent-secondary hover:shadow-glow text-white font-semibold" asChild>
                  <Link href="/contact">
                    Let's Discuss Your Project
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container-wide">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <p className="text-accent font-medium mb-4 tracking-wide uppercase text-sm">Our Values</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              What <span className="text-gradient">Guides Our Work</span>
            </h2>
            <p className="text-muted-foreground">
              These principles shape every decision we make and every project we deliver.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div key={value.title} className="glass-card-hover p-8 text-center">
                <div className="w-14 h-14 bg-gradient-to-br from-accent to-accent-secondary rounded-xl flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-7 h-7 text-accent-foreground" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary/30 border-y border-border/50">
        <div className="container-wide">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <p className="text-accent font-medium mb-4 tracking-wide uppercase text-sm">The Team</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Small Team, <span className="text-gradient">Big Impact</span>
            </h2>
            <p className="text-muted-foreground">
              We keep our team intentionally small to ensure every client receives focused attention 
              and every project gets senior-level expertise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { icon: Users, title: "3-5 Core Members", desc: "A focused team of specialists who work directly on your project." },
              { icon: Target, title: "Direct Access", desc: "Communicate directly with the people doing the work—no middlemen." },
              { icon: Award, title: "Senior Expertise", desc: "Every team member brings years of specialized experience." },
            ].map((item) => (
              <div key={item.title} className="glass-card-hover p-8 text-center">
                <item.icon className="w-12 h-12 text-accent mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA 
        title="Ready to Work With Us?"
        description="We'd love to learn about your business and discuss how we can help you achieve your goals."
      />
    </Layout>
  );
};

export default About;
