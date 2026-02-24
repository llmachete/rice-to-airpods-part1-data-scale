# Codebase Structure

**Analysis Date:** 2026-02-23

## Directory Layout

```
rice-to-airpods-part1-data-scale/
├── app/                           # Next.js App Router pages and layouts
│   ├── globals.css               # Brand colors, typography, custom animations
│   ├── layout.tsx                # Root layout (metadata, analytics, CookieBanner)
│   ├── page.tsx                  # Landing page (/)
│   ├── immersive/
│   │   ├── layout.tsx            # Immersive experience layout
│   │   └── page.tsx              # Full-screen scrollytelling experience
│   └── article/
│       ├── layout.tsx            # Article experience layout
│       └── page.tsx              # Traditional article layout with navigation
├── components/                    # Reusable React components
│   ├── LandingPage.tsx           # Landing page component (experience selector)
│   ├── SeriesIntro.tsx           # Series introduction text block
│   ├── ScrollySection.tsx        # Scrollama.js wrapper for scroll-triggered animations
│   ├── shared/                   # Navigation, UI elements, helpers
│   │   ├── TopNavBar.tsx         # Brand-compliant persistent navigation
│   │   ├── TopNavBarAutoHide.tsx # Auto-hiding nav for immersive experience
│   │   ├── ScrollProgress.tsx    # Sticky scroll progress indicators
│   │   ├── ReflectionZone.tsx    # Interactive Q&A cards (ReflectionZone, LetThatSinkIn, MajorBreak)
│   │   ├── Footnote.tsx          # Footnote reference and collection system
│   │   ├── ExpandableMath.tsx    # Expandable mathematical notation
│   │   ├── VerificationTable.tsx # Source verification tables
│   │   ├── BrandTable.tsx        # Brand-compliant table styling
│   │   └── CookieBanner.tsx      # GDPR cookie consent banner
│   ├── visualizations/           # Data visualization components
│   │   ├── Visual1_RiceGrain_2D.tsx           # Single rice grain illustration
│   │   ├── Visual2_CoffeeCupFill.tsx          # Coffee cup filling animation
│   │   ├── Visual3_ContainerZoom.tsx          # Shipping container scale visualization
│   │   ├── Visual5_Timeline.tsx               # Historical timeline (1980s-2025)
│   │   ├── Visual6_AirPodsCutaway_2D.tsx      # AirPods Pro technical cutaway
│   │   └── Visual7_ResourceComparison.tsx    # Resource comparison chart
│   └── interactive/              # Interactive engagement components
│       ├── HumorousCounter.tsx   # Sticky counter tracking sentences read
│       ├── SentenceCounter.tsx   # Dynamic sentence-by-sentence counter
│       ├── NapsterTimeMachine.tsx # Download speed comparison tool
│       ├── DataHourglass_2D.tsx  # Visual data volume hourglass
│       └── RunningCounter.tsx    # Generic running number animation
├── public/                        # Static assets
│   ├── llmachete-icon-only.svg   # Brand icon (white blade on transparent)
│   ├── llmachete-wordmark.svg    # Brand wordmark logotype
│   └── fonts/                    # Self-hosted brand fonts
│       ├── texgyreadventor-regular.otf
│       └── texgyreadventor-bold.otf
├── data/                         # Content and research data
│   ├── footnotes.json            # Footnote references and citations
│   ├── measurements.json         # Scale calculations and data points
│   ├── SOURCE_VALIDATION_AUDIT_REPORT.md
│   ├── VALIDATION_FIXES_COMPLETE.md
│   └── SOURCE_VALIDATION_100_PERCENT_COMPLETE.md
├── .planning/                    # Documentation and planning
│   └── codebase/                # Architecture and structure docs
├── next.config.ts               # Next.js configuration (static export)
├── tsconfig.json                # TypeScript configuration (path aliases)
├── package.json                 # Dependencies (React, Next.js, D3, GSAP, Scrollama)
├── eslint.config.mjs            # ESLint configuration
├── .gitignore                   # Git ignore patterns
├── .env.local                   # Local environment variables
└── BRAND_COMPLIANCE_COMPLETE.md # Brand implementation documentation
```

## Directory Purposes

**`app/`:**
- Purpose: Next.js App Router routes and page structures
- Contains: Page components (.tsx files), layout components, global styles
- Key files:
  - `page.tsx`: Landing page entry point
  - `layout.tsx`: Root configuration, metadata, analytics
  - `globals.css`: Brand colors, typography, animations
  - `immersive/page.tsx`: Scrollytelling experience
  - `article/page.tsx`: Traditional reading experience

**`components/`:**
- Purpose: Modular, reusable React components
- Contains: UI elements, visualizations, interactive features
- Organization: Grouped by functional domain (shared UI, visualizations, interactions)

**`components/shared/`:**
- Purpose: Navigation, layout, and UI utilities
- Contains: TopNavBar (with auto-hide variant), scroll progress indicators, reflection zones (interactive Q&A), footnote system, cookie banner
- Pattern: Each component is independently mountable and can be composed into larger layouts

**`components/visualizations/`:**
- Purpose: Data-driven graphics representing the rice-grain scale metaphor
- Contains: Seven key visualizations (grain → coffee cup → container → warehouse → city block → resource comparison → AirPods)
- Pattern: Each visualization is client-only (`'use client'`), optionally accepts `progress` prop for scroll-driven animation
- Rendering: Combination of SVG (illustrated rice grain, cup, AirPods) and Canvas/D3.js (timeline, resource charts)

**`components/interactive/`:**
- Purpose: Engagement and education through interactive experiences
- Contains: Running counters, time machine (Napster era download simulation), hourglass visualization, reflection zones
- Pattern: Client-only components with internal state management (useState), typically full-screen or prominent page elements

**`public/`:**
- Purpose: Static assets served directly by Next.js
- Contains: Brand logos (icon + wordmark SVG), self-hosted typography files
- Usage: Referenced in components via Next.js Image component for optimization
- Brand critical: SVG assets must match official LLMachete design (angular blade shape, #D47E45 copper background)

**`data/`:**
- Purpose: Content data, research citations, validation documentation
- Contains: Footnote reference mappings, scale calculations, source validation audit trails
- Format: JSON files for programmatic access, Markdown files for human documentation
- Not deployed: These files are development-only and not included in static export

## Key File Locations

**Entry Points:**
- `app/page.tsx`: Landing page at root URL
- `app/immersive/page.tsx`: Full-screen scrollytelling experience
- `app/article/page.tsx`: Article layout with persistent navigation
- `app/layout.tsx`: Root configuration and global setup

**Configuration:**
- `next.config.ts`: Static export mode, image optimization settings
- `tsconfig.json`: TypeScript compilation, path alias `@/*` pointing to project root
- `package.json`: Dependencies (React 19.2.3, Next.js 16.1.1, D3.js 7.9, GSAP 3.14.2, Scrollama.js 3.2.0)
- `.env.local`: Google Analytics 4 measurement ID (NEXT_PUBLIC_GA_MEASUREMENT_ID)

**Core Logic:**
- `components/ScrollySection.tsx`: Scrollama.js initialization and step management
- `components/visualizations/`: All data visualization rendering logic
- `components/interactive/`: All user engagement components
- `app/immersive/page.tsx`: Primary narrative flow and scroll orchestration

**Testing:**
- No test files present in structure. Testing appears to be manual.
- Source validation documentation in `/data/` serves as validation record

**Styling:**
- `app/globals.css`: Root stylesheet with @import tailwindcss, brand CSS variables, @font-face declarations, custom keyframe animations
- Individual components use Tailwind classes referencing brand variables (e.g., `bg-[#D47E45]`, `text-[#0E5A61]`)

## Naming Conventions

**Files:**
- React components: PascalCase (e.g., `LandingPage.tsx`, `ScrollySection.tsx`, `Visual1_RiceGrain_2D.tsx`)
- Utilities and hooks: camelCase (e.g., `globals.css`, `next.config.ts`, `eslint.config.mjs`)
- Visualization components: `VisualN_DescriptiveTitle.tsx` where N is sequential number (1-7)
- Interactive components: `ComponentName.tsx` describing the interaction type (Counter, TimeMachine, Hourglass)

**Directories:**
- Lowercase, plural for collections (e.g., `components/`, `visualizations/`, `interactive/`)
- Lowercase, singular for feature-specific directories (e.g., `app/immersive/`, `app/article/`)
- Grouping by functional domain within `components/`: `shared/` (reusable UI), `visualizations/` (graphics), `interactive/` (engagement)

**CSS/Styling:**
- Brand colors referenced as Tailwind arbitrary values: `bg-[#D47E45]`, `text-[#0E5A61]`, `border-[#F0E7E0]`
- Custom animations defined in `globals.css` with `@keyframes` prefixed by animation name (e.g., `@keyframes slideDown`, `.animate-slideDown`)
- CSS variables for brand colors in `:root` selector

**Component Props:**
- TypeScript interfaces for component props (e.g., `interface ScrollySectionProps`, `interface TopNavBarProps`)
- Props named descriptively: `onStepEnter`, `onStepProgress`, `scrollProgress`, `currentVisual`, `children`

## Where to Add New Code

**New Feature (e.g., new scale visualization or interactive element):**
- Primary code: `components/visualizations/VisualN_NewTitle.tsx` or `components/interactive/NewFeature.tsx`
- Tests: Not currently organized; add to project-level tests directory if implementing test suite
- Integration: Import into appropriate page (`app/immersive/page.tsx` or `app/article/page.tsx`) with dynamic import and loading fallback
- Styling: Use Tailwind classes referencing brand variables; add custom animations to `globals.css` if needed

**New Component/Module (reusable UI element):**
- Implementation: `components/shared/NewComponent.tsx` if general-purpose UI
- Implementation: `components/NewDomain/Component.tsx` if domain-specific (follow existing pattern of shared/visualizations/interactive)
- Pattern: Export as default function, use TypeScript interface for props, mark `'use client'` if using browser APIs
- Integration: Import in page or other component files; use dynamic import with loading state for heavy components

**Utilities/Helpers:**
- Shared helpers: Create utility files at `components/utils/` or top-level `lib/` directory (currently unused)
- Import pattern: Use path alias `@/` (e.g., `import { utility } from '@/components/utils/helpers'`)

## Special Directories

**`.planning/codebase/`:**
- Purpose: Architecture and structure documentation for future sessions
- Generated: Yes (created by GSD map-codebase agent)
- Committed: Yes, for knowledge preservation
- Contents: ARCHITECTURE.md, STRUCTURE.md for reference

**`.next/`:**
- Purpose: Next.js build output and cached compilation
- Generated: Yes, by `next build`
- Committed: No, included in `.gitignore`
- Size: ~730 KB (contains optimized static HTML, JS bundles, CSS)

**`node_modules/`:**
- Purpose: NPM package dependencies
- Generated: Yes, by `npm install`
- Committed: No, included in `.gitignore`
- Size: 8.5 MB (Tailwind, Next.js, D3.js, GSAP, Scrollama)

**`data/`:**
- Purpose: Research data and validation records
- Generated: Partially (validation reports are generated during research phase)
- Committed: Yes, for audit trail
- Contents: Footnote mappings (JSON), measurement calculations (JSON), validation audit reports (Markdown)
- Note: Not deployed to production static site

**`public/`:**
- Purpose: Static assets served at root of deployed site
- Generated: No, hand-curated
- Committed: Yes
- Critical files: Brand logo SVG files, self-hosted fonts (.otf files)
- Deployment: Files served as-is; ensure SVG files match official brand guidelines

---

*Structure analysis: 2026-02-23*
