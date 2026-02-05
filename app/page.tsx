import Layout from "@/components/layout/Layout";
import Hero from "@/components/sections/Hero";
import CaseStudies from "@/components/sections/CaseStudies";
import TrustedBySection from "@/components/sections/TrustedBySection";
import ImpactStatement from "@/components/sections/ImpactStatement";
import BentoPortfolio from "@/components/sections/BentoPortfolio";
import ServicesGrid from "@/components/sections/ServicesGrid";
import ProcessTimeline from "@/components/sections/ProcessTimeline";
import TestimonialsShowcaseWrapper from "@/components/sections/TestimonialsShowcaseWrapper";
import BlogSection from "@/components/sections/BlogSection";
import FinalCTA from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <Layout>
      <Hero />
      <CaseStudies />
      <TrustedBySection />
      <ImpactStatement />
      <BentoPortfolio />
      <ServicesGrid />
      <ProcessTimeline />
      <TestimonialsShowcaseWrapper />
      <BlogSection />
      <FinalCTA />
    </Layout>
  );
}
