export const CMS_REVALIDATE = {
  blog: 60,
  project: 60,
  service: 1800,
  testimonial: 1800,
  teamMember: 3600,
  sitemap: 300,
} as const;

export const CMS_TAGS = {
  blog: "cms:blog",
  category: "cms:category",
  project: "cms:project",
  service: "cms:service",
  testimonial: "cms:testimonial",
  faq: "cms:faq",
  teamMember: "cms:team-member",
  companyLogo: "cms:company-logo",
  siteSettings: "cms:site-settings",
} as const;

export type CmsDocType = keyof typeof CMS_TAGS;

export function docTag(type: CmsDocType) {
  return CMS_TAGS[type];
}

export function listTag(type: CmsDocType) {
  return `${CMS_TAGS[type]}:list`;
}

export function entryTag(type: CmsDocType, slug: string) {
  return `${CMS_TAGS[type]}:${slug}`;
}