# External Integrations

**Analysis Date:** 2026-02-23

## APIs & External Services

**Analytics:**
- Google Analytics 4 - Web traffic and user behavior tracking
  - SDK/Client: gtag (loaded via `https://www.googletagmanager.com/gtag/js`)
  - Configuration: `NEXT_PUBLIC_GA_MEASUREMENT_ID` environment variable
  - Implementation: `app/layout.tsx` (lines 26-43)
  - Event tracking: Page views, user interactions, scroll depth (implicit via GA4)
  - Cookie consent: Managed via `CookieBanner` component with localStorage-based consent tracking

- Vercel Web Analytics - Core Web Vitals monitoring
  - SDK/Client: @vercel/analytics/react (v1.4.1)
  - Implementation: `app/layout.tsx` (line 49)
  - Auto-collects: LCP (Largest Contentful Paint), FID (First Input Delay), CLS (Cumulative Layout Shift)
  - No configuration needed - automatic on Vercel deployment

**Social & Engagement:**
- Google Forms - Email capture and lead generation
  - Integration: Embedded form link `https://forms.gle/GxhytVcDT9tMCsWG8`
  - Location: `app/immersive/page.tsx` (line 636) and `app/article/page.tsx` (line 392)
  - Purpose: Newsletter signup and feedback collection

- LinkedIn - Social follow links
  - LLMachete company page: `https://www.linkedin.com/company/llmachete/` (multiple page references)
  - Author profile: `https://www.linkedin.com/in/zachkeshner` (footer)

## Data Storage

**Databases:**
- None - Static site (no backend database)

**File Storage:**
- Local filesystem only
  - Brand assets: `/public/llmachete-logo.svg`, `/public/llmachete-icon-only.svg`, `/public/llmachete-wordmark.svg`
  - Custom fonts: `/public/fonts/texgyreadventor-regular.otf`, `/public/fonts/texgyreadventor-bold.otf`
  - 3D models: `/public/models/` (directory exists but not inspected)

**Caching:**
- Client-side localStorage - Cookie consent state
  - Key: `cookieConsent` (values: "accepted" | "declined")
  - Implementation: `components/shared/CookieBanner.tsx` (lines 11-16)
- Browser cache via HTTP headers (Vercel CDN defaults)

## Authentication & Identity

**Auth Provider:**
- None - Public content, no user authentication
- Email capture via Google Forms (non-authenticated)

## Monitoring & Observability

**Error Tracking:**
- Vercel Web Analytics (implicit Core Web Vitals error detection)
- Google Analytics 4 (session abandonment tracking, user engagement signals)

**Logs:**
- Vercel deployment logs (automatic)
- Browser console errors (development only)

## CI/CD & Deployment

**Hosting:**
- Vercel (primary - indicated by @vercel/analytics dependency and NEXT_PUBLIC env vars pattern)
- Static export to global CDN network
- Automatic TLS/HTTPS

**CI Pipeline:**
- Vercel automatic deployments (git push to main → build → deploy)
- ESLint checks during development (npm run lint)
- Build validation: `npm run build` produces static output

## Environment Configuration

**Required env vars:**
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` - Google Analytics 4 measurement ID (e.g., G-XXXXXXXXXX)

**Optional env vars:**
- None detected in codebase

**Secrets location:**
- `.env.local` - Local development environment variables (not committed to git, 177 bytes)
- Vercel Environment Variables dashboard - Production secrets managed via UI

## Webhooks & Callbacks

**Incoming:**
- None - Static site cannot receive webhooks

**Outgoing:**
- Google Analytics 4 - Sends user event data to Google's servers
  - Endpoint: `https://www.googletagmanager.com/gtag/js`
  - Payload: Page views, custom events, user properties
  - Frequency: Real-time as users interact with page

- Vercel Analytics - Sends Core Web Vitals to Vercel
  - Endpoint: Vercel's analytics collection service
  - Payload: LCP, FID, CLS metrics
  - Frequency: Per session

## Data Flow

**User Interaction → Analytics:**

1. User visits `stories.llmachete.com` (or article/immersive subpages)
2. `app/layout.tsx` loads GA4 script if `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set
3. User consent checked via `CookieBanner` component
4. If consent = "accepted", GA4 tracks:
   - Page views
   - Scroll depth (via Scrollama interactions)
   - Interactive component clicks
5. Simultaneously, Vercel Analytics collects Core Web Vitals
6. Data sent to Google Analytics 4 and Vercel dashboards

**Lead Generation:**
1. User scrolls to CTA section
2. Google Form embedded link presented
3. User fills form → data stored in Google Sheets
4. Automated notification (external to this codebase)

## Third-Party Content & References

**Embedded Links (Non-Integrated):**
- ScienceDirect academic papers - Referenced but not fetched
- World Economic Forum content - Referenced but not fetched
- IEEE Spectrum articles - Referenced but not fetched
- Statista reports - Referenced but not fetched
- Market research firms (IDC, Mordor Intelligence, Grand View Research) - Cited for data validation only

**Social Media References:**
- LinkedIn company and personal profiles (links only, no API integration)

---

*Integration audit: 2026-02-23*
