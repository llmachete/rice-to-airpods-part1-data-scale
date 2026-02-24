# Architecture

**Analysis Date:** 2026-02-23

## Pattern Overview

**Overall:** Next.js App Router with static export + client-side interactive visualizations. Dual-experience pattern (immersive scrollytelling vs. guided article) sharing identical content and visualization components.

**Key Characteristics:**
- Static site generation (Next.js `output: 'export'`) deployed to Vercel
- Client-side scrollytelling engine using Scrollama.js for scroll-triggered animations
- Dynamic component loading for visualizations and interactive elements (reducing initial JS payload)
- Brand-compliant design system with LLMachete colors and typography
- Multi-format content delivery: landing page → experience selector → immersive/article modes

## Layers

**Presentation Layer:**
- Purpose: Render visual UI and handle user interactions
- Location: `/app/` (page routes) and `/components/` (reusable components)
- Contains: Page layouts (landing, immersive, article), navigation, visual components
- Depends on: React 19, Next.js 16, dynamic imports for lazy loading
- Used by: Browser renders all pages through Next.js App Router

**Visualization Layer:**
- Purpose: Render data-driven graphics and animated transitions
- Location: `/components/visualizations/` (Visual1-7 components)
- Contains: D3.js/SVG illustrations, canvas-based graphics, scroll-progress driven animations
- Depends on: D3.js v7.9, GSAP v3.14 for animations, CSS animations
- Used by: Immersive and article pages to display rice grain → container → ocean progression

**Interaction Layer:**
- Purpose: Handle user engagement and content discovery
- Location: `/components/interactive/` (HumorousCounter, NapsterTimeMachine, SentenceCounter, DataHourglass)
- Contains: Interactive calculators, time machine experiences, progress tracking, reflection zones
- Depends on: React hooks (useState, useEffect), Scrollama.js callbacks
- Used by: Both immersive and article experiences to create engagement moments

**Content/Navigation Layer:**
- Purpose: Structure narrative flow and provide navigation
- Location: `/components/shared/` (TopNavBar, TopNavBarAutoHide, ReflectionZone, Footnote)
- Contains: Brand-compliant navigation, scroll progress indicators, reflection prompts, footnote system
- Depends on: Next.js Image optimization, React state management
- Used by: Both experiences to maintain context and encourage reading progression

**Styling/Brand Layer:**
- Purpose: Enforce LLMachete brand identity across all pages
- Location: `/app/globals.css` (brand colors, typography, custom animations)
- Contains: CSS variables for brand colors (#D47E45 copper, #0E5A61 deep teal, etc.), @font-face declarations for TeX Gyre Adventor, Tailwind configuration
- Depends on: Tailwind CSS v4, self-hosted OpenType fonts in `/public/fonts/`
- Used by: All components via Tailwind class names and CSS variables

**Routing/Configuration Layer:**
- Purpose: Configure Next.js behavior and manage routes
- Location: `next.config.ts`, `tsconfig.json`, `app/layout.tsx`
- Contains: Static export configuration, TypeScript path aliases (`@/*`), root metadata and analytics setup
- Depends on: Next.js framework, Vercel Analytics, Google Analytics 4
- Used by: Next.js build system to generate static HTML and manage module resolution

## Data Flow

**User lands on site:**

1. Browser requests `https://stories.llmachete.com/`
2. Next.js serves `app/page.tsx` (LandingPage component)
3. LandingPage renders brand header + SeriesIntro + experience choice cards
4. User clicks "Immersive" or "Guided Reading" button
5. Router navigates to `/immersive` or `/article` (via `useRouter().push()`)

**Immersive Experience Flow:**

1. `app/immersive/page.tsx` renders ImmersivePage component
2. Page sets up scroll progress listeners (window.addEventListener('scroll'))
3. Scrollama.js initialized via ScrollySection component wrapper
4. User scrolls → onStepEnter callback fires when `.scroll-step` enters viewport
5. Callback updates `currentStep` and `currentVisual` state
6. Visual component re-renders based on `currentVisual` value
7. onStepProgress callback fires continuously with scroll progress (0-1)
8. Progress value passed to visualization components (e.g., Visual2_CoffeeCupFill receives `progress` prop)
9. Visualization animates based on progress value
10. TopNavBarAutoHide updates currentScale indicator based on pageScrollProgress
11. ScrollProgress component renders sticky progress indicators in corners

**Article Experience Flow:**

1. `app/article/page.tsx` renders ArticlePage component (similar content, different layout)
2. No Scrollama.js triggered animations—traditional scroll reading
3. TopNavBar remains visible with progress tracking
4. Same visualization components loaded dynamically, but displayed inline with text
5. Same footnote system and reflection zones embedded throughout

**State Management:**
- Local React state (useState) in page components
- Props passed down to child components (visualizations, interactive elements)
- Scroll progress lifted to page level and passed to multiple consumers (TopNavBar, visualizations)
- Analytics events tracked via gtag() function (if GA4 configured)

## Key Abstractions

**ScrollySection (Scrollama wrapper):**
- Purpose: Encapsulate scroll-step detection logic
- Location: `components/ScrollySection.tsx`
- Pattern: Wrapper component that initializes Scrollama library on mount, manages step entry/exit/progress callbacks
- Lifecycle: setup on mount → cleanup on unmount to prevent memory leaks
- Consumed by: ImmersivePage as parent container for all scroll-stepped content

**Visualization Components (Visual1-7):**
- Purpose: Render scale-transition graphics as SVG or Canvas illustrations
- Examples: `Visual1_RiceGrain_2D`, `Visual2_CoffeeCupFill`, `Visual3_ContainerZoom`, `Visual5_Timeline`, `Visual6_AirPodsCutaway_2D`, `Visual7_ResourceComparison`
- Pattern: Client-only components (use 'use client' directive) with optional `progress` prop for animation
- Input: Scroll progress (0-1) or static display
- Output: D3.js/SVG rendered graphics with smooth transitions

**Interactive Components (Reflection Zones, Counters):**
- Purpose: Create engagement moments and demonstrate data velocity
- Examples: `HumorousCounter`, `NapsterTimeMachine`, `SentenceCounter`, `DataHourglass_2D`, `ReflectionZone`, `LetThatSinkIn`, `MajorBreak`
- Pattern: Client-only components that track state (counter value, user interaction, time elapsed)
- Output: Interactive UI with user participation (click/read-triggered state changes)

**Brand Compliance Components:**
- Purpose: Ensure consistent application of LLMachete identity
- Examples: `TopNavBar`, `TopNavBarAutoHide`, `LandingPage`, `SeriesIntro`
- Pattern: Structured layout components that apply official brand colors and typography
- Enforcement: CSS class names reference brand variables; Image components use official SVG logos

## Entry Points

**Landing Page (`/`):**
- Location: `app/page.tsx`
- Triggers: User visits stories.llmachete.com
- Responsibilities: Render LLMachete branding, series introduction, experience selection (immersive vs. guided)
- Loads: LandingPage component (client-side), SeriesIntro component, brand assets (logo SVG)

**Immersive Experience (`/immersive`):**
- Location: `app/immersive/page.tsx`
- Triggers: User clicks "Launch Immersive" button or navigates directly to /immersive
- Responsibilities: Full-screen scrollytelling with sticky visualization panels, narrative content alongside
- Loads: All visualization components dynamically, ScrollySection wrapper, TopNavBarAutoHide, interactive components
- Key behavior: Scroll-position drives which visualization renders in sticky panel

**Article Experience (`/article`):**
- Location: `app/article/page.tsx`
- Triggers: User clicks "Start Reading" button or navigates directly to /article
- Responsibilities: Traditional article layout with integrated visualizations and interactive elements
- Loads: Same content and visualizations as immersive, but displayed in content flow with persistent TopNavBar
- Key behavior: Linear reading experience with progress tracking

**Root Layout:**
- Location: `app/layout.tsx`
- Triggers: All pages inherit root layout
- Responsibilities: Set up global metadata, load analytics scripts (GA4), include CookieBanner component
- Loads: Brand fonts via @font-face (globals.css), Vercel Analytics SDK, Google Analytics 4 script

## Error Handling

**Strategy:** Graceful degradation for client-side interactive features; static content always renders

**Patterns:**

- **Dynamic imports with loading fallback:** Visualizations and interactive components use `dynamic()` with loading placeholder (`<div>Loading visualization...</div>`)
  ```typescript
  const Visual1_RiceGrain = dynamic(
    () => import('@/components/visualizations/Visual1_RiceGrain_2D'),
    { ssr: false, loading: () => <div>Loading visualization...</div> }
  );
  ```

- **SSR disabled for client-only code:** Components using browser APIs (window, document) marked with `'use client'` directive and loaded with `ssr: false` in dynamic imports

- **Null checks for mounted state:** Components using window/document APIs check `mounted` flag before rendering
  ```typescript
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  ```

- **Event listener cleanup:** Scroll listeners explicitly removed in useEffect cleanup functions to prevent memory leaks

- **Analytics guard:** GA4 tracking checks if gtag function exists before calling
  ```typescript
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'experience_choice', {...});
  }
  ```

## Cross-Cutting Concerns

**Logging:** Console output (no dedicated logging library). Analytics events tracked via Google Analytics 4 when user selects experience type.

**Validation:** Scroll progress values clamped to 0-1 range using `Math.min(Math.max(progress, 0), 1)`. Component props validated at runtime (TypeScript interfaces).

**Authentication:** None. Static site with no backend authentication. Cookie banner present for analytics consent (GDPR compliance).

**Brand Consistency:** All components reference centralized CSS variables for colors and use self-hosted TeX Gyre Adventor fonts. TopNavBar enforces brand colors and logo placement across all pages. Tailwind classes consistently apply brand palette (#D47E45, #0E5A61, #197A83, #1A2332, #F0E7E0).

---

*Architecture analysis: 2026-02-23*
