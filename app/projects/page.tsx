import { client } from "@/sanity/lib/client";
import Layout from "@/components/layout/Layout";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import ProjectsFilter from "@/components/ProjectsFilter";
import { generateSEO } from '@/lib/seo';
import { CMS_REVALIDATE, docTag, listTag } from '@/lib/cms-cache';

export const metadata = generateSEO({
  title: 'Our Projects',
  description: 'Explore our portfolio of successful web design, SEO, and digital marketing projects. See how we have helped businesses achieve measurable growth and results.',
  keywords: ['portfolio', 'web design projects', 'SEO case studies', 'digital marketing results', 'client success stories'],
  canonical: 'https://realdiamonddigital.studio/projects',
});

async function getProjects() {
  const projects = await client.fetch(
    `*[_type == "project"] | order(coalesce(order, 999) asc) {
      _id,
      title,
      "slug": slug.current,
      category,
      description,
      "image": image.asset->url,
      tags,
      year,
      duration,
      featured,
      order
    }`,
    {},
    {
      next: {
        revalidate: CMS_REVALIDATE.project,
        tags: [docTag('project'), listTag('project')],
      }
    }
  );
  return projects;
}

export const revalidate = 60;

const serviceCategories = [
  { id: "all", name: "All" },
  { id: "web", name: "Web Design" },
  { id: "webdev", name: "Web Development" },
  { id: "uiux", name: "UI/UX Design" },
  { id: "seo", name: "SEO" },
  { id: "branding", name: "Branding" },
  { id: "ecommerce", name: "E-Commerce" },
];

export default async function Projects() {
  const allProjects = await getProjects();

  return (
    <Layout>
      <PageHeader
        eyebrow="Projects"
        title="Every website, from first sketch to launch."
        note={`${allProjects.length} projects · 2023 to today`}
        description="The full archive of client websites I've designed and built. For the thinking behind the work, read the detailed case studies."
      >
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 mt-8 font-semibold text-accent hover:gap-3 transition-all"
        >
          Read the case studies
          <ArrowRight className="w-4 h-4" />
        </Link>
      </PageHeader>

      <ProjectsFilter projects={allProjects} categories={serviceCategories} />
    </Layout>
  );
}
