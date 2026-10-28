// Short monospace tags shown above service titles in the Blueprint design
export const serviceTags: Record<string, string> = {
  "Web Design & Development": "DEV",
  "UI/UX Design": "UX",
  "SEO & Online Visibility": "SEO",
  "Brand & Visual Design": "BRAND",
  "Growth & Optimization": "CARE",
};

export function getServiceTag(title: string) {
  return serviceTags[title] || "SERVICE";
}
