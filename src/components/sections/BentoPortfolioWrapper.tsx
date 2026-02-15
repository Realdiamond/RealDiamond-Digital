import { client } from "@/sanity/lib/client";
import BentoPortfolio from "./BentoPortfolio";

async function getFeaturedProjects() {
  const query = `*[_type == "project" && featured == true] | order(_createdAt desc)[0...4] {
    _id,
    title,
    "slug": slug,
    category,
    description,
    image,
    results
  }`;

  try {
    const projects = await client.fetch(
      query,
      {},
      {
        next: { revalidate: 900 } // 15 minutes - projects update occasionally
      }
    );
    return projects;
  } catch (error) {
    console.error("Error fetching featured projects:", error);
    return [];
  }
}

export default async function BentoPortfolioWrapper() {
  const projects = await getFeaturedProjects();
  
  if (projects.length === 0) {
    return null;
  }

  return <BentoPortfolio projects={projects} />;
}
