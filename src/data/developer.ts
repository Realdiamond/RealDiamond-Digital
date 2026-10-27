// Developer edition content. Projects and figures come from the front-end CV.

export interface DevProject {
  name: string;
  path: string;
  kind: string;
  summary: string;
  stack: string[];
  highlights: string[];
}

export const devProfile = {
  github: "https://github.com/Realdiamond",
  stack: ["React", "Next.js", "TypeScript", "React Native", "Tailwind CSS"],
};

export const devProjects: DevProject[] = [
  {
    name: "GlazionStudio",
    path: "~/projects/glazionstudio",
    kind: "AI web app",
    summary:
      "The complete front-end for an AI-powered ceramics and pottery assistant for artists and researchers: a Q&A chat with semantic search, photo-upload matching to find glaze recipes, and recipe-to-image generation with live feedback.",
    stack: ["React", "Vite", "TypeScript", "Tailwind CSS"],
    highlights: [
      "AI chat with semantic search results",
      "Image upload with visual similarity matching",
      "97% TypeScript codebase",
      "95+ production deployments on Vercel",
    ],
  },
  {
    name: "CampusHealth",
    path: "~/projects/campushealth",
    kind: "Booking platform",
    summary:
      "The full front-end for a university health centre booking platform (FUTA), with separate experiences for students, doctors and administrators.",
    stack: ["Next.js 14", "TypeScript", "Tailwind CSS", "Axios", "Zod"],
    highlights: [
      "Role-based protected routing for 3 user types",
      "Automatic JWT token refresh",
      "20+ reusable components: calendars, record tables, modals",
      "Type-safe forms with React Hook Form and Zod",
    ],
  },
  {
    name: "SBZ Farm Management",
    path: "~/projects/sbz-farm",
    kind: "Mobile app · in progress",
    summary:
      "A React Native app for a commercial poultry farm in Nigeria, covering inventory, egg production, feed, health, sales and expenses, designed to keep working without a connection.",
    stack: ["React Native", "TypeScript", "SQLite"],
    highlights: [
      "40+ screens across 7 role-based dashboards",
      "Offline-first data entry with background sync",
      "Push alerts for low feed, mortality and vaccinations",
      "Live KPI dashboard for the farm admin",
    ],
  },
];
