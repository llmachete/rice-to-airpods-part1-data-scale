# Technology Stack

**Analysis Date:** 2026-02-23

## Languages

**Primary:**
- TypeScript 5.x - All source code, components, configuration
- JavaScript - Runtime execution

**Secondary:**
- CSS - Styling (via Tailwind CSS)

## Runtime

**Environment:**
- Node.js v22.18.0 (no .nvmrc enforced, check locally)

**Package Manager:**
- npm (inferred from package-lock.json presence in lockfile patterns)
- Lockfile: Present (implicit from npm ecosystem)

## Frameworks

**Core:**
- Next.js 16.1.1 - Full-stack React framework with static export
- React 19.2.3 - UI component library
- React DOM 19.2.3 - React web rendering

**Styling:**
- Tailwind CSS 4.x - Utility-first CSS framework
- @tailwindcss/postcss 4.x - PostCSS integration for Tailwind

**Build/Dev:**
- TypeScript 5.x - Type checking and transpilation
- ESLint 9.x - Code linting (eslint-config-next for Next.js rules)
- PostCSS 8+ (implicit) - CSS processing

**Data Visualization & Animation:**
- D3 7.9.0 - Data-driven document manipulation for visualizations
- @types/d3 7.4.3 - TypeScript type definitions for D3
- GSAP 3.14.2 - Greensock Animation Platform for timeline animations
- Scrollama 3.2.0 - Scroll-driven storytelling interactions
- intersection-observer 0.12.2 - Polyfill for scroll trigger detection

## Key Dependencies

**Critical:**
- @vercel/analytics 1.4.1 - Web vitals collection (Core Web Vitals: LCP, FID, CLS)
- Vercel deployment infrastructure integration

**Analytics & Monitoring:**
- Google Analytics 4 - Configurable via `NEXT_PUBLIC_GA_MEASUREMENT_ID` env var
- Vercel Analytics - Built-in performance monitoring

**Frontend Infrastructure:**
- Scrollama 3.2.0 - Enables scroll-triggered narrative transitions
- D3 7.9.0 - Supports complex data visualizations (rice grain scale visualization, container zoom comparisons)
- GSAP 3.14.2 - Manages animation timelines for visual transitions
- intersection-observer 0.12.2 - Detects when scroll sections enter viewport for trigger-based interactions

## Configuration

**Environment:**
- Environment variables configured via `.env.local` (not committed to git)
- Key required variable: `NEXT_PUBLIC_GA_MEASUREMENT_ID` - Google Analytics property ID
- Uses NEXT_PUBLIC prefix for client-side accessibility

**Build:**
- `next.config.ts` - Next.js configuration
  - `output: 'export'` - Static site generation (no server-side rendering)
  - `images: { unoptimized: true }` - Disable Next.js image optimization for static export
- `tsconfig.json` - TypeScript compiler options
  - Target: ES2017 for browser compatibility
  - Path alias: `@/*` maps to root directory for clean imports
  - Strict mode enabled (`strict: true`)
- `postcss.config.mjs` - PostCSS configuration for Tailwind CSS integration
- `eslint.config.mjs` - ESLint 9.x flat config format with Next.js presets

## Platform Requirements

**Development:**
- Node.js v22.18.0+
- npm package manager
- Modern browser with ES2017 support (Chrome, Firefox, Safari, Edge)
- 512MB+ RAM for build process
- ~500MB disk space for node_modules

**Production:**
- Static hosting (Vercel, Netlify, S3 + CloudFront, GitHub Pages, etc.)
- CDN for optimal geographic distribution (Vercel includes Edge Network)
- No server-side runtime required
- HTTPS/TLS for analytics security

## Deployment

**Current Hosting:**
- Vercel (inferred from @vercel/analytics and brand context)
- Static site export to CDN
- Automatic deployments from git push to main branch

**Build Output:**
- Static HTML, CSS, JS files in `out/` directory
- No server-side rendering
- Client-side routing via Next.js Link components

## Development Scripts

```bash
npm run dev      # Start local dev server (localhost:3000)
npm run build    # Build static site to out/ directory
npm start        # Serve production build locally
npm run lint     # Run ESLint on source files
```

---

*Stack analysis: 2026-02-23*
