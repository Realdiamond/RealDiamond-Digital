// Content for the personal UI/UX portfolio at /portfolio.
// Case studies are based on the project records in Sanity; screenshots and
// wireframe views in /public/portfolio are captured from the live sites.

export interface PortfolioImage {
  src: string;
  width: number;
  height: number;
  alt: string;
}

export interface DesignDecision {
  title: string;
  description: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  summary: string;
  client: string;
  industry: string;
  location: string;
  year: string;
  timeline: string;
  role: string;
  liveUrl: string;
  tags: string[];
  challenge: string;
  approach: string[];
  decisions: DesignDecision[];
  outcomes: string[];
  images: {
    hero: PortfolioImage;
    mobile: PortfolioImage;
    wireframe: PortfolioImage;
    page?: PortfolioImage;
  };
}

export const profile = {
  name: "Oluwatimilehin Akinsanmi",
  title: "UI/UX Designer & Front-end Developer",
  intro:
    "I design and build websites that are clear, accessible, and easy to use, taking every project from the first layout to the live site. Since 2023 I've shipped websites for non-profits, consulting firms, churches, financial services, and small businesses in Nigeria, Canada, and the United States.",
  about:
    "Because I also write the front-end code, I design with real constraints in mind: responsive layouts, reusable components, and states that developers can build without guesswork. I'm the founder of RealDiamond Digital, where I lead design and development on every project.",
  email: "realdiamonddigital@gmail.com",
  linkedin: "https://www.linkedin.com/in/oluwatimilehin0-akinsanmi1/",
};

export const skillGroups = [
  {
    title: "UI Design",
    items: ["Visual hierarchy & layout", "Typography & colour", "Component design", "Pixel-perfect handoff"],
  },
  {
    title: "UX Design",
    items: ["User flows & journeys", "Information architecture", "Calls-to-action & conversion", "Content structure"],
  },
  {
    title: "Systems & Accessibility",
    items: ["Design systems & tokens", "Responsive, mobile-first design", "Accessible contrast & focus states", "Light & dark themes"],
  },
  {
    title: "Front-end",
    items: ["HTML, CSS & Tailwind CSS", "React & Next.js", "WordPress & ACF", "Headless CMS (Sanity)"],
  },
];

export const processSteps = [
  {
    title: "Discover",
    description: "Understand the business goals, the audiences, and what each visitor needs to do on the site.",
  },
  {
    title: "Structure",
    description: "Map the pages and content hierarchy so the most important actions are the easiest to find.",
  },
  {
    title: "Design",
    description: "Build the interface from consistent components, colours, and type, desktop and mobile together.",
  },
  {
    title: "Build & refine",
    description: "Develop the design, test it on real devices, and refine it after launch based on how people use it.",
  },
];

export const caseStudies: CaseStudy[] = [
  {
    slug: "bto-global-foundation",
    title: "BTO Global Foundation",
    summary:
      "A mission-driven website that turns a non-profit's environmental programs into clear paths for donors, partners, and volunteers.",
    client: "BTO Foundation for Environment and Climate Action",
    industry: "Non-profit / Environmental sustainability",
    location: "Africa",
    year: "2025",
    timeline: "5 days",
    role: "UI/UX design & development",
    liveUrl: "https://btoglobalfoundation.com",
    tags: ["Non-profit", "UX for donations", "Responsive design", "Content strategy"],
    challenge:
      "BTO needed a website that could explain a wide range of programs, from climate adaptation to its Waste-to-Wealth model for youth and women, while inspiring two very different audiences to act: individual donors and organisations looking to partner.",
    approach: [
      "Defined the two primary actions, donating and partnering, and gave each its own path from the first screen",
      "Organised six program areas into short, consistent summaries that visitors can scan before going deeper",
      "Used impact figures as early social proof to build trust before asking for support",
      "Designed for accessibility and readability so the content works for a broad, diverse audience",
      "Structured the content so the team can keep publishing program updates and impact reports",
    ],
    decisions: [
      {
        title: "Two audiences, two clear calls-to-action",
        description:
          "Directly under the hero, “Make a Donation” and “Partner With Us” sit side by side. The donation button uses the warm accent colour for the highest emphasis, while partnering uses a calmer slate, so each audience recognises its path at a glance.",
      },
      {
        title: "Proof before the ask",
        description:
          "Impact numbers, 1,050 volunteers & partners and ₦1.3M in support contributions, appear right after the calls-to-action, giving first-time visitors a reason to trust the foundation.",
      },
      {
        title: "Scannable program cards",
        description:
          "Each focus area follows the same pattern: a short uppercase title, a two-line summary, and a “Learn more” link. The repetition makes six programs easy to compare without overwhelming the page.",
      },
      {
        title: "Thumb-friendly on mobile",
        description:
          "On phones, the two calls-to-action become full-width stacked blocks with large tap targets, keeping the primary actions within easy reach.",
      },
    ],
    outcomes: [
      "Launched a complete, responsive website in five days",
      "Gave donors and partners separate, clearly signposted paths to get involved",
      "Created a content structure the foundation can grow with program updates and impact reporting",
    ],
    images: {
      hero: {
        src: "/portfolio/bto-global-foundation/desktop.jpg",
        width: 1440,
        height: 900,
        alt: "BTO Global Foundation homepage hero with Make a Donation and Partner With Us calls-to-action",
      },
      mobile: {
        src: "/portfolio/bto-global-foundation/mobile.jpg",
        width: 780,
        height: 1688,
        alt: "BTO Global Foundation homepage on mobile with stacked full-width buttons",
      },
      wireframe: {
        src: "/portfolio/bto-global-foundation/wireframe.jpg",
        width: 1200,
        height: 2417,
        alt: "Wireframe view of the BTO Global Foundation homepage layout",
      },
    },
  },
  {
    slug: "smitbridge-global-ventures",
    title: "SmitBridge Global Ventures",
    summary:
      "A corporate website that makes four very different consulting services easy to understand for communities, companies, and governments.",
    client: "SmitBridge Global Ventures LLC",
    industry: "Environmental & business consulting",
    location: "Nigeria (global reach)",
    year: "2024",
    timeline: "2 weeks",
    role: "UI/UX design & development",
    liveUrl: "https://smitbridgeglobal.com/",
    tags: ["Corporate", "Information architecture", "Responsive design", "Trust & credibility"],
    challenge:
      "SmitBridge offers agribusiness, sustainable farming, environmental and immigration consulting, and business advisory services. The risk was a website that felt scattered. It needed to communicate the full breadth of services while still looking credible enough for government and enterprise clients.",
    approach: [
      "Grouped every offering into four clear service lines with consistent naming",
      "Designed a professional, trust-building interface suitable for government and enterprise clients",
      "Planned navigation around three client segments: communities, companies, and governments",
      "Used real-world photography of farming and fieldwork to support the sustainability story",
      "Added clear contact paths for enquiries across every service line",
    ],
    decisions: [
      {
        title: "The full offer in one glance",
        description:
          "The four service lines sit in a single card row that overlaps the hero, so visitors see the complete scope of the business on the first screen without scrolling or opening menus.",
      },
      {
        title: "A repeatable column pattern",
        description:
          "Each service column uses the same structure, an icon, a title, and a bulleted list of sub-services, which makes long lists easy to scan and compare.",
      },
      {
        title: "One colour for action",
        description:
          "A single yellow is reserved for primary actions like “Get Started” and “Explore Our Services”, while deep green carries headings and brand moments. Visitors always know where to click.",
      },
      {
        title: "Built-in trust signals",
        description:
          "An asymmetric photo collage of real fieldwork and a closing “Let's Build a Sustainable Future Together” band reinforce credibility and end the page with a clear next step.",
      },
    ],
    outcomes: [
      "Brought four service lines together in one coherent, professional platform",
      "Gave each client segment a clear path to the services and contact options relevant to them",
      "Established a consistent corporate identity across desktop and mobile",
    ],
    images: {
      hero: {
        src: "/portfolio/smitbridge-global-ventures/desktop.jpg",
        width: 1440,
        height: 900,
        alt: "SmitBridge Global Ventures homepage hero with service cards",
      },
      mobile: {
        src: "/portfolio/smitbridge-global-ventures/mobile.jpg",
        width: 780,
        height: 1688,
        alt: "SmitBridge Global Ventures homepage on mobile",
      },
      wireframe: {
        src: "/portfolio/smitbridge-global-ventures/wireframe.jpg",
        width: 1200,
        height: 2458,
        alt: "Wireframe view of the SmitBridge Global Ventures homepage layout",
      },
      page: {
        src: "/portfolio/smitbridge-global-ventures/page.jpg",
        width: 1200,
        height: 2458,
        alt: "Full SmitBridge Global Ventures homepage design",
      },
    },
  },
  {
    slug: "pottery-by-tolu",
    title: "Pottery by Tolu",
    summary:
      "A custom website for a Canadian ceramics studio that helps each type of visitor find the right class, workshop, or studio session, and book it.",
    client: "Potterybytolu Studios",
    industry: "Pottery & ceramics studio",
    location: "Winnipeg, Canada",
    year: "2025",
    timeline: "2 weeks design & development + 2 days SEO",
    role: "UI/UX design, WordPress development & SEO",
    liveUrl: "https://potterybytolu.com/",
    tags: ["Small business", "Booking UX", "Custom WordPress", "Local SEO"],
    challenge:
      "The studio offers weekly classes, group events, open studio time, and glaze research, each for a different kind of customer. The owner needed a professional website that showcased the work, made these offerings easy to tell apart, and turned local searches into booked sessions.",
    approach: [
      "Designed and developed a custom WordPress theme from scratch",
      "Structured content with custom post types and Advanced Custom Fields so the owner can update classes himself",
      "Organised the offering into four clear paths, one for each type of visitor",
      "Optimised every page for search and set up the Google Business Profile, the channels that brought the most calls",
      "Designed responsive layouts for mobile and tablet visitors",
    ],
    decisions: [
      {
        title: "Four ways in, one per visitor type",
        description:
          "Classes, Events & Workshops, Open Studio, and Glaze Research Lab are presented as four large photo cards. Each card has a small category label and key details, so visitors self-select the path that fits them.",
      },
      {
        title: "Photography that sells the experience",
        description:
          "Real photos of people at the wheel and in the studio do the persuading. Text sits on soft overlays at the bottom of each card, keeping the imagery front and centre.",
      },
      {
        title: "Warm, crafted visual language",
        description:
          "Terracotta accents, an elegant serif with italic highlights, and generous whitespace give the site the handmade, premium feel of the studio itself.",
      },
      {
        title: "Content the client can manage",
        description:
          "Custom post types and fields mean new classes and workshops follow the same layout automatically, keeping the design consistent as the studio grows.",
      },
    ],
    outcomes: [
      "75% increase in website traffic in the first month",
      "More booked calls from local search",
      "Full on-page SEO and an optimised Google Business Profile",
      "Custom WordPress build delivered in two weeks",
    ],
    images: {
      hero: {
        src: "/portfolio/pottery-by-tolu/desktop.jpg",
        width: 1440,
        height: 1680,
        alt: "Pottery by Tolu “Four ways to engage” section with photo cards for classes, events, open studio and glaze lab",
      },
      mobile: {
        src: "/portfolio/pottery-by-tolu/mobile.jpg",
        width: 780,
        height: 1688,
        alt: "Pottery by Tolu homepage on mobile",
      },
      wireframe: {
        src: "/portfolio/pottery-by-tolu/wireframe.jpg",
        width: 1200,
        height: 2317,
        alt: "Wireframe view of the Pottery by Tolu homepage layout",
      },
    },
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}
