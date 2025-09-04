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

src/
├── app/                              # App Router for routes, layouts, and API
│   ├── layout.js                     # Root layout (Server Component, static)
│   ├── page.js                       # Default page (e.g., static homepage)
│   ├── page-1/                       # Example page route (e.g., server-side)
│   │   └── page.js                   # Page component
│   ├── api/                          # API Route Handlers
│   │   ├── api-1/                    # Example API endpoint (/api/api-1)
│   │   │   └── route.js              # Route Handler
│   │   └── api-2/                    # Example API endpoint (/api/api-2)
│   │       └── route.js              # Route Handler
│   └── globals.css                   # Optional: Global CSS (imported in layout.js)
├── components/                       # Feature-based components with colocated CSS
│   ├── feature-1/                    # Example feature (e.g., interactive component)
│   │   ├── feature-1.js              # Client Component ('use client')
│   │   └── feature-1.module.css      # Colocated CSS Module
│   ├── feature-2/                    # Example feature (e.g., static component)
│   │   ├── feature-2.js              # Server Component
│   │   └── feature-2.module.css      # Colocated CSS Module
├── lib/                              # Utilities and data fetching
│   ├── data.js                       # Server-side data fetching
│   └── utils.js                      # General utility functions
├── public/                           # Static assets (e.g., favicon, images)
├── .env.local                        # Environment variables
├── .gitignore                        # Git ignore for build artifacts
├── next.config.mjs                   # Next.js configuration
├── package.json                      # Dependencies and scripts
└── README.md                         # Project documentation