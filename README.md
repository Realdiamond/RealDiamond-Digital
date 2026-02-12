# RealDiamond Digital - Next.js Website

A professional web design and development agency website built with Next.js 15, React 18, TypeScript, Tailwind CSS, and Sanity CMS.

## ✨ Features

- 🎨 Modern, responsive design with Tailwind CSS
- ⚡ Server-side rendering with Next.js 15 App Router
- 📝 Content management with Sanity CMS
- 🔍 SEO optimized pages
- 📱 Mobile-first responsive design
- 🎭 Dynamic project showcases and portfolio
- 📰 Blog with rich content support
- 💬 Client testimonials section
- 🛠️ Services pages with detailed information
- 📧 Contact forms with validation
- 🎨 Radix UI + shadcn/ui components
- 🌙 Beautiful animations and interactions

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **UI Library**: React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **CMS**: Sanity CMS
- **Components**: Radix UI + shadcn/ui
- **State Management**: TanStack Query (React Query)
- **Forms**: React Hook Form + Zod
- **Icons**: Lucide React
- **Deployment**: Vercel (recommended)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm (or yarn)
- A Sanity account ([sign up for free](https://www.sanity.io/))
- [Install Node.js with nvm](https://github.com/nvm-sh/nvm#installing-and-updating) (optional)

### Installation

```sh
# Step 1: Clone the repository
git clone <YOUR_GIT_URL>
cd diamond-works

# Step 2: Install dependencies
npm install

# Step 3: Set up environment variables
# Create a .env.local file in the root directory
cp .env.example .env.local

# Add your Sanity credentials to .env.local:
# NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
# NEXT_PUBLIC_SANITY_DATASET=production
# NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
# SANITY_API_TOKEN=your_token (optional, for write operations)

# Step 4: Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

### Sanity Studio Setup

The project includes an integrated Sanity Studio accessible at `/myworks`:

1. Navigate to [http://localhost:3000/myworks](http://localhost:3000/myworks)
2. Sign in with your Sanity account
3. Start adding content (projects, blog posts, testimonials, etc.)

For detailed Sanity setup instructions, see [SANITY_SETUP_GUIDE.md](./SANITY_SETUP_GUIDE.md).

## 📝 Available Scripts

```sh
npm run dev      # Start development server on http://localhost:3000
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
npm run test     # Run tests with Vitest
```

## 📁 Project Structure

```
diamond-works/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── providers.tsx      # Client-side providers (React Query, etc.)
│   ├── globals.css        # Global styles
│   ├── about/             # About page
│   ├── blog/              # Blog pages and dynamic routes
│   ├── contact/           # Contact page
│   ├── projects/          # Projects pages and dynamic routes
│   ├── services/          # Services page
│   ├── studio/            # Sanity Studio route
│   └── testimonials/      # Testimonials page
├── src/
│   ├── components/        # React components
│   │   ├── layout/       # Layout components (Header, Footer, Layout)
│   │   ├── sections/     # Page sections (Hero, Services, etc.)
│   │   └── ui/           # UI components (shadcn/ui)
│   ├── data/             # Static data
│   ├── hooks/            # Custom React hooks
│   └── lib/              # Utility functions
├── sanity/               # Sanity CMS configuration
│   ├── schemas/          # Sanity schema definitions
│   ├── lib/              # Sanity client configuration
│   └── env.ts            # Sanity environment variables
├── public/               # Static assets (images, icons, etc.)
├── scripts/              # Utility scripts
├── next.config.mjs       # Next.js configuration
├── sanity.config.ts      # Sanity Studio configuration
├── tailwind.config.ts    # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration
```

## 🌐 Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_TOKEN=your_token_here  # Optional, for write operations
```

To get your Sanity credentials:
1. Go to [sanity.io/manage](https://www.sanity.io/manage)
2. Select your project
3. Find your Project ID in the project settings
4. Generate an API token if needed (Settings → API → Tokens)

## 🚢 Deployment

### Vercel (Recommended)

The easiest way to deploy this Next.js app is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import your repository on Vercel
3. Add your environment variables in the Vercel dashboard
4. Deploy!

Or use the Vercel CLI:

```sh
npm install -g vercel
vercel
```

### Other Platforms

This Next.js app can also be deployed to:
- **Netlify**: Add build command `npm run build` and publish directory `.next`
- **AWS Amplify**: Follow Next.js deployment guide
- **Cloudflare Pages**: Use Next.js adapter
- **Any Node.js hosting**: Run `npm run build` then `npm start`

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Sanity Documentation](https://www.sanity.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Radix UI Documentation](https://www.radix-ui.com/)
- [shadcn/ui Documentation](https://ui.shadcn.com/)

## 📄 License

This project is private and proprietary.

## 🤝 Support

For support, contact RealDiamond Digital at [your-email@example.com]
