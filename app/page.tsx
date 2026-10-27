import Layout from "@/components/layout/Layout";
import Hero from "@/components/sections/Hero";
import ProofBar from "@/components/sections/ProofBar";
import TrustedBySection from "@/components/sections/TrustedBySection";
import WorkSection from "@/components/sections/WorkSection";
import DevProjects from "@/components/sections/DevProjects";
import ServicesGrid from "@/components/sections/ServicesGrid";
import ProcessTimeline from "@/components/sections/ProcessTimeline";
import TestimonialsShowcaseWrapper from "@/components/sections/TestimonialsShowcaseWrapper";
import BlogSection from "@/components/sections/BlogSection";
import FinalCTA from "@/components/sections/FinalCTA";

export const revalidate = 60;

export default function Home() {
  return (
    <Layout>
      <Hero />
      <ProofBar />
      <TrustedBySection />
      <DevProjects />
      <WorkSection title="Client websites" note="structure on the left, shipped site on the right" />
      <ServicesGrid />
      <ProcessTimeline />
      <TestimonialsShowcaseWrapper />
      <BlogSection />
      <FinalCTA />
    </Layout>
  );
}
