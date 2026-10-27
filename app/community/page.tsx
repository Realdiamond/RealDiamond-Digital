import Link from "next/link";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import CTA from "@/components/sections/CTA";
import { ArrowRight, GraduationCap, Laptop, MapPin, Users } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import { generateSEO } from "@/lib/seo";

export const metadata = generateSEO({
  title: "Community Tech Skills Program",
  description: "Hands-on web development and WordPress training for students through remote, live sessions.",
  keywords: ["community training", "web development", "wordpress", "student tech skills", "remote learning"],
  canonical: "https://realdiamonddigital.studio/community",
});

const highlights = [
  {
    icon: GraduationCap,
    title: "Student-Focused Learning",
    description: "Beginner-friendly lessons that make tech feel accessible and practical.",
  },
  {
    icon: Laptop,
    title: "Hands-On Workshops",
    description: "Real projects students can show in a manifesto, portfolio, or school report.",
  },
  {
    icon: Users,
    title: "Small-Group Support",
    description: "Interactive sessions with time for questions, practice, and feedback.",
  },
  {
    icon: MapPin,
    title: "Remote Delivery",
    description: "Live online sessions that reach students wherever they are.",
  },
];

const skills = [
  "Web fundamentals: HTML, CSS, and basic JavaScript",
  "Building responsive pages for mobile and desktop",
  "WordPress setup, themes, and essential plugins",
  "Content management: pages, posts, and media",
  "Basic website security and maintenance habits",
  "Portfolio and presentation tips for students",
];

const CommunityPage = () => {
  return (
    <Layout>
      <PageHeader
        eyebrow="Community · Tech skills program"
        title="Teaching students real tech skills."
        description="A practical program that helps students build web development and WordPress skills they can show in a school manifesto or a future portfolio, with hands-on projects and live guided sessions."
      >
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Button variant="accent" size="lg" asChild>
            <Link href="/contact">
              Book a school session
              <ArrowRight />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="#skills">See the skills taught</Link>
          </Button>
        </div>
      </PageHeader>

      <section className="pb-16 lg:pb-24">
        <div className="container-wide grid lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] gap-10 items-start">
          <div>
            <div className="bp-heading mb-6">
              <h2 className="text-3xl md:text-4xl font-bold">Structured, flexible, school-ready</h2>
            </div>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed max-w-2xl">
              <p>
                I work with schools, student leaders and local organisers to deliver a focused training program. The
                sessions are practical, engaging and suitable for complete beginners.
              </p>
              <p>
                Scheduling, class size and support adjust to the school calendar. If a sponsor is involved, we align the
                format with the school&apos;s goals and available time, and agree live session hours in advance so
                students can attend consistently.
              </p>
            </div>
          </div>

          <dl className="grid gap-px bg-border border border-border">
            {[
              { title: "Location", desc: "Remote, live online sessions" },
              { title: "Live hours", desc: "Set times agreed with the school" },
              { title: "Audience", desc: "Secondary school students and youth groups" },
            ].map((item) => (
              <div key={item.title} className="bg-card p-5">
                <dt className="bp-label mb-1.5">{item.title}</dt>
                <dd className="font-medium">{item.desc}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section id="skills" className="py-16 lg:py-24 scroll-mt-24">
        <div className="container-wide">
          <div className="bp-heading mb-10">
            <h2 className="text-4xl md:text-5xl font-bold">Skills taught</h2>
            <span className="bp-note">{skills.length} practical modules</span>
          </div>
          <ol className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
            {skills.map((skill, index) => (
              <li key={skill} className="bg-card p-6 flex gap-4">
                <span className="font-mono text-sm text-accent pt-0.5">{String(index + 1).padStart(2, "0")}</span>
                <span className="font-medium leading-relaxed">{skill}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container-wide">
          <div className="max-w-3xl mb-10">
            <div className="bp-heading mb-5">
              <h2 className="text-4xl md:text-5xl font-bold">Why it matters</h2>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              The initiative gives student leaders a clear, measurable program to present while giving young people real
              digital skills. It is a practical way to invest in the community and prepare students for the modern
              workplace.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border">
            {highlights.map((item) => (
              <div key={item.title} className="bg-card p-6 sm:p-7">
                <item.icon className="w-5 h-5 text-accent mb-5" aria-hidden="true" />
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA
        title="Bring the program to your school."
        description="Share your school’s goals and preferred timing. I’ll reply with a simple plan and next steps."
        buttonText="Request a school session"
        buttonLink="/contact"
      />
    </Layout>
  );
};

export default CommunityPage;
