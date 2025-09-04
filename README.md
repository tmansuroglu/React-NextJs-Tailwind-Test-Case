This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Project Structure
```
src/
  ├── app/                            # App Router for routes, layouts, and API
  │   ├── layout.tsx                  # Root layout (Server Component, static, TypeScript)
  │   ├── layout.test.ts              # Optional: Test for layout
  │   ├── page.tsx                    # Default page (e.g., static homepage, TypeScript)
  │   ├── page.test.ts                # Optional: Test for default page
  │   ├── page-1/                     # Example page route (e.g., server-side)
  │   │   ├── page.tsx                # Page component (TypeScript)
  │   │   └── page.test.ts            # Optional: Test for page-1
  │   ├── api/                        # API Route Handlers
  │   │   ├── api-1/                  # Example API endpoint (/api/api-1)
  │   │   │   ├── route.ts            # Route Handler (TypeScript)
  │   │   │   └── route.test.ts       # Optional: Test for api-1
  │   │   └── api-2/                  # Example API endpoint (/api/api-2)
  │   │       ├── route.ts            # Route Handler (TypeScript)
  │   │       └── route.test.ts       # Optional: Test for api-2
  │   └── globals.css                 # Optional: Global CSS (imported in layout.tsx)
  ├── components/                     # Feature-based components with colocated CSS
  │   ├── feature-1/                  # Example feature (e.g., interactive component)
  │   │   ├── feature-1.tsx           # Client Component ('use client', TypeScript)
  │   │   ├── feature-1.module.css    # Colocated CSS Module
  │   │   └── feature-1.test.tsx      # Optional: Test for feature-1
  │   ├── feature-2/                  # Example feature (e.g., static component)
  │   │   ├── feature-2.tsx           # Server Component (TypeScript)
  │   │   ├── feature-2.module.css    # Colocated CSS Module
  │   │   └── feature-2.test.tsx      # Optional: Test for feature-2
  ├── lib/                            # Utilities and data fetching
  │   ├── data.ts                     # Server-side data fetching (TypeScript)
  │   ├── data.test.ts                # Optional: Test for data
  │   ├── utils.ts                    # General utility functions (TypeScript)
  │   └── utils.test.ts               # Optional: Test for utils
  ├── public/                         # Static assets (e.g., favicon, images)
  ├── .env.local                      # Environment variables
  ├── .gitignore                      # Git ignore for build artifacts
  ├── next.config.ts                  # Next.js configuration (TypeScript)
  ├── eslint.config.mjs               # ESLint configuration
  ├── next-env.d.ts                   # TypeScript environment definitions
  ├── package.json                    # Dependencies and scripts
  ├── package-lock.json               # Lock file for dependencies
  ├── postcss.config.mjs              # PostCSS configuration
  ├── README.md                       # Project documentation
  └── tsconfig.json                   # TypeScript configuration
```