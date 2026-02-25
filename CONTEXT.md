# Rice to AirPods Context

## Project Identity

### Purpose
An interactive scrollytelling experience that makes data scale tangible. Uses the journey from a single grain of rice to AirPods annual sales to help readers viscerally understand exponential data growth. First major content piece for LLMachete.

### Spirit / Intent / Zeitgeist
**Make data scale tangible.** Transform abstract numbers into visceral understanding. Full-screen immersion with no distractions. Each scroll should create an "aha" moment. The visualization IS the story - words support, not dominate.

### What Good Looks Like
- Reader understands data scale intuitively after the experience
- Scroll interactions are butter-smooth (60fps)
- Brand-compliant: TeX Gyre Adventor fonts, official colors
- Works flawlessly on mobile devices
- Page loads fast (< 3 seconds)
- Accessible with proper contrast ratios

### Validation Rubric
- [ ] LLMachete brand guidelines fully applied
- [ ] Scroll performance is smooth (60fps)
- [ ] Scale visualizations create "aha" moments
- [ ] Mobile experience is complete (not degraded)
- [ ] Typography: TeX Gyre Adventor properly loaded
- [ ] Colors: #D47E45, #0E5A61, #1A2332, #F0E7E0

---

## Current State

### Active Tasks
| Task | Status | Notes |
|------|--------|-------|
| Initial build | completed | Full scrollytelling implemented |
| Brand compliance | completed | Typography and colors verified |
| Deployment | completed | Live on Vercel |
| Mobile optimization | completed | Responsive design verified |
| Performance tuning | completed | Smooth scroll confirmed |
| Lint cleanup (81→0 errors) | completed | 2026-02-24, all errors resolved |
| Visual audit & fixes | **COMPLETED** | All 10 tasks done, deployed 2026-02-24 |
| Brand asset standardization | **READY TO EXECUTE** | Plan at docs/plans/2026-02-24-brand-asset-standardization.md |

### Recent Decisions
| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-01 | Self-hosted fonts | Control, performance, consistency |
| 2026-01 | Full-screen sections | Immersive experience |
| 2026-01 | Landing page with mode selection | User choice: immersive vs quick read |

### Open Questions / Blockers
- [x] Should we add analytics tracking? → YES, GA4 + Vercel Analytics active
- [ ] Part 2 content: what topic next?

### Technical Debt / Known Issues
- Tech debt cleanup COMPLETE (2026-02-24) — all 10 tasks done, deployed to production

### Session Log: 2026-02-24 (Visual Audit)
**Focus**: Lint cleanup + visual/interactive component audit

**Accomplished:**
- Lint cleanup: 81 problems → 0 errors, 3 warnings (all acceptable _-prefixed unused vars)
- Full audit of all 6 visualizations, 5 interactive components, 2 page layouts, ScrollySection, LandingPage, SeriesIntro
- Created comprehensive fix plan: `docs/plans/2026-02-24-visual-audit-fixes.md`

**Lint fixes applied (already committed-ready, not yet committed):**
- SeriesIntro.tsx: file-level eslint-disable for unescaped entities
- ScrollySection.tsx: replaced `any` with typed ScrollamaResponse interfaces
- LandingPage.tsx: replaced `any` with typed Window & { gtag }
- DataHourglass_2D.tsx: &apos; escapes + _mode prefix
- NapsterTimeMachine.tsx: &apos; escape
- VerificationTable.tsx: &quot; escapes
- HumorousCounter.tsx: useRef pattern for Date.now(), removed unused disable, removed unused e param
- CookieBanner.tsx: eslint-disable-line for hydration gate, removed unused disable
- ScrollProgress.tsx: eslint-disable-line for DOM query on mount
- TopNavBar.tsx: eslint-disable-line for hydration + scroll-derived state
- TopNavBarAutoHide.tsx: same pattern as TopNavBar
- Visual2_CoffeeCupFill.tsx: removed unused eslint-disable directive

**Visual audit execution COMPLETED this session:**
- Committed lint fixes (81→0 errors, 2 warnings remain)
- Task 1: CoffeeCupFill — responsive canvas + particle fix + brand colors
- Task 2: ContainerZoom — responsive canvas + brand colors
- Task 3: RiceGrain — brand color accents
- Task 4: Timeline — brand colors + removed dead hover code
- Task 5: AirPodsCutaway — brand colors + faster particles
- Task 6: ResourceComparison — brand colors
- Task 7: DataHourglass — brand accent color
- Task 8: Immersive page — fade transitions + useCallback memoization
- Task 9: Landing page — fixed misleading article mode description
- Task 10: Final verification + deploy (pushed to origin/main)
- All 10 atomic commits pushed, Vercel deployed

### Session Log: 2026-02-24 (Brand Asset Standardization — Planning)
**Focus**: Audit and plan brand consistency across all LLMachete sites

**Accomplished:**
- Full audit of logo, wordmark, favicon across Rice to AirPods, Splash Page, Data Hourglass
- Discovered color hex mismatch: designer files use #D97D42, code uses #D47E45
- User decision: #D97D42 (designer original) is the single source of truth
- Design doc: `docs/plans/2026-02-24-brand-asset-standardization-design.md`
- Implementation plan: `docs/plans/2026-02-24-brand-asset-standardization.md`
- Both committed and pushed

**NOT yet done (next session):**
- Execute brand asset standardization plan (9 tasks)
- Use `superpowers:subagent-driven-development` or `superpowers:executing-plans`
- Wave 1: Tasks 1-2 (color replace #D47E45 → #D97D42 in Rice to AirPods + Splash Page)
- Wave 2: Task 3 (generate favicon asset set from designer SVG)
- Wave 3: Tasks 4-8 (deploy favicons to all 3 sites, cleanup, update CLAUDE.md)
- Wave 4: Task 9 (final verification + deploy)

**Key context for next session:**
- Official warm orange is now **#D97D42** (not #D47E45)
- rgba equivalent: rgba(217, 125, 66, opacity)
- Designer source SVG: `/home/llmachete/projects/claude-code/LLMachete/freelancer-brand-content/App icon logo/App icon logo/Warm orange logo/App icon logo_warm Orange.svg`
- Data Hourglass is at `/home/llmachete/projects/claude-code/LLMachete/content/data-hourglass/` (NOT `/data-hourglass/`)
- Splash page has 60+ test PNGs to archive
- Existing favicon.ico in Rice to AirPods already uses #D97D42 from designer (may be reusable)
- Article mode promises "same visualizations" but has zero visualization imports
- Particle distribution in Visual2 clusters left side

### Tech Debt Cleanup (2026-02-23/24) — COMPLETE ✅

**Plan file:** `docs/plans/2026-02-23-tech-debt-cleanup.md`

**All 10 tasks completed:**
- ✅ Task 1: Removed GSAP + intersection-observer (~55KB bundle reduction) — commit 882d69e
- ✅ Task 2: Added CSP + security headers via vercel.json — commits 24d4e4d, 9f3a6d7
- ✅ Task 3: Fixed TopNavBarAutoHide scroll listener (state→ref, passive:true) — commit b941cd7
- ✅ Task 4: Added passive:true to HumorousCounter scroll listener — commit d749c42
- ✅ Task 5: Fixed HumorousCounter RAF restart on measurement rotation (currentMeasurementRef) — commit bff1790
- ✅ Task 6: Fixed selectMeasurement guard clauses + dedup (lastMeasurementIdRef) — commit 64534e8
- ✅ Task 7: Fixed drag listener memory leak (dragOffsetRef) — commit 7e57bc6
- ✅ Task 8: Hoisted canvas gradient + stable particle pool in Visual2_CoffeeCupFill — commit adaacf5
- ✅ Task 9: Added isValidHttpsUrl() to HumorousCounter, guards both sourceUrl anchors — commit 3149774
- ✅ Task 10: Pushed to origin main — Vercel auto-deploy triggered (2026-02-24)

---

## Architecture

### Tech Stack
- **Framework**: Next.js 16.1.1
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: Vercel (auto-deploy on push)

### Key Patterns
- Component-based scrollytelling sections
- Intersection Observer for scroll triggers
- CSS transforms for smooth animations
- Self-hosted fonts in /public/fonts/

### External Dependencies
| Dependency | Purpose | Status |
|------------|---------|--------|
| Vercel | Hosting | Active |
| Cloudflare | DNS | Active |
| Google Analytics | Tracking | Active |

### File Structure Highlights
```
rice-to-airpods-part1-data-scale/
├── app/
│   ├── page.tsx             # Landing page (experience chooser)
│   ├── immersive/page.tsx   # Full-screen experience (NO nav bar)
│   └── article/page.tsx     # Guided reading (WITH nav bar)
├── components/
│   ├── shared/
│   │   ├── TopNavBar.tsx    # Brand-compliant nav (scale indicator + progress)
│   │   └── BrandTable.tsx   # Styled data tables
│   ├── LandingPage.tsx      # Entry point with two cards
│   ├── SeriesIntro.tsx      # 5-article series introduction
│   └── [ScrollSections]/    # Individual scroll visualizations
├── public/
│   ├── fonts/               # TeX Gyre Adventor (self-hosted)
│   └── llmachete-*.svg      # Logo assets
└── styles/
    └── globals.css          # Brand variables
```

---

## Deployment

### Production URLs
| Route | URL | Description |
|-------|-----|-------------|
| Landing | https://stories.llmachete.com/ | Experience chooser (immersive vs article) |
| Immersive | https://stories.llmachete.com/immersive | Full-screen, cinematic (no nav bar) |
| Article | https://stories.llmachete.com/article | Guided reading (with nav bar + progress) |

### Deployment Process
**To deploy changes:**
```bash
cd /home/llmachete/projects/claude-code/LLMachete/content/rice-to-airpods-part1-data-scale
git add <files>
git commit -m "Your commit message"
git push origin main
```
- Vercel auto-deploys on push to `main`
- Typical deploy time: 2-5 minutes
- Check status: `gh api repos/llmachete/rice-to-airpods-part1-data-scale/commits/main/status --jq '.state'`

### DNS Configuration (Cloudflare)
```
Type: CNAME
Name: stories
Target: cname.vercel-dns.com
Proxy: ON (orange cloud)
TTL: Auto
```

### Analytics
- **Google Analytics**: `G-2DC5C2SCKH`
- **Vercel Analytics**: Enabled in Vercel dashboard
- **Experience tracking**: `experience_choice` event tracks immersive vs article selection

### GitHub Repository
- **URL**: https://github.com/llmachete/rice-to-airpods-part1-data-scale
- **Branch**: `main` (production)

### Dashboards
- **Vercel**: https://vercel.com/dashboard
- **Google Analytics**: https://analytics.google.com
- **Cloudflare DNS**: https://dash.cloudflare.com

---

## Session Log

### Latest Session: 2026-02-24 (continued)
**Focus**: Lint error cleanup across codebase

**Accomplished**:
- Fixed lint errors in 9 files (commit daba35d, pushed to origin)
- article/page.tsx + immersive/page.tsx: eslint-disable for prose apostrophes
- RunningCounter.tsx: RATES moved outside component, Date.now purity fix, unused state removed
- SentenceCounter.tsx + Visual3_ContainerZoom.tsx: apostrophe escaping
- CookieBanner.tsx: function ordering + proper window typing (no more `any`)
- Visual2_CoffeeCupFill.tsx: fixed malformed eslint-disable comment
- Visual5_Timeline.tsx + Visual6_AirPodsCutaway_2D.tsx: unused vars + setState-in-effect

**Remaining lint errors** (81 total, down from ~144, still in other files):
- NapsterTimeMachine + other components: `no-explicit-any`, `setState-in-effect`, `no-unused-vars`
- These are in files NOT yet touched — future cleanup task

**Next Steps**:
1. Smoke test stories.llmachete.com (Vercel deployed)
2. Optional: continue lint cleanup in NapsterTimeMachine + remaining files
3. Plan Part 2 content

---

### Previous Session: 2026-02-24
**Focus**: Tech debt cleanup Tasks 8 & 9 (final 2 of 10)

**Accomplished**:
- Task 8: Visual2_CoffeeCupFill.tsx — hoisted gradient out of RAF loop, created stable particle pool (index-based determinism), added fillProgressRef so effect runs once with `[]` dependency (commit adaacf5)
- Task 9: HumorousCounter.tsx — added `isValidHttpsUrl()` validator, guarded both sourceUrl anchor tags against non-HTTPS/malformed URLs (commit 3149774)
- Task 10: Pushed to origin main — Vercel auto-deploy triggered

**In Progress**:
- None (tech debt cleanup complete)

**Next Steps**:
1. Smoke test stories.llmachete.com (landing, immersive, coffee cup fill, HumorousCounter)
2. Plan Part 2 content (3 Vs Framework)

**Key Context for Next Session**:
- Tech debt cleanup plan (docs/plans/2026-02-23-tech-debt-cleanup.md) is 100% complete
- All 10 tasks committed and deployed to production

---

### Previous Session: 2026-01-31 (Evening)
**Focus**: SeriesIntro technical accessibility improvements

**Accomplished**:
- Added inline definitions for technical terms (GPT, IoT, LLMs, cyber-physical systems, CAGR)
- Tightened 4IR section (~100 words removed, consolidated 3→2 paragraphs)
- Deployed to production (commit `bece544`)
- Updated CONTEXT.md with complete deployment documentation

**In Progress**:
- N/A

**Next Steps**:
1. Monitor reader engagement with intro content
2. Plan Part 2 content (3 Vs Framework)
3. Consider A/B testing intro length

**Key Context for Next Session**:
- Project is DEPLOYED at https://stories.llmachete.com/
- Deployment process: `git push origin main` → Vercel auto-deploys (2-5 min)
- DNS: Cloudflare CNAME `stories` → `cname.vercel-dns.com`
- Analytics: GA4 `G-2DC5C2SCKH` + Vercel Analytics

---

### Previous Sessions

#### 2026-01-31 (Morning) - Context System Setup
- Created CONTEXT.md for Rice to AirPods project
- Added to project registry with aliases

#### 2026-01-29 - Deployment
- Final deployment to Vercel
- Brand compliance verification
- Mobile testing complete

#### 2026-01-12 - Typography Update
- Switched from Lato to official TeX Gyre Adventor fonts
- Self-hosted font implementation
- Brand compliance documentation created

---

## Reference Materials

### Key Documentation
- `BRAND_COMPLIANCE_COMPLETE.md` - Brand verification
- `DEPLOYMENT_COMPLETE.md` - Comprehensive deployment guide with testing checklist
- `DEPLOYMENT-GUIDE.md` - Original deployment instructions
- `TOP_NAV_BAR_IMPLEMENTATION.md` - TopNavBar technical docs
- `MULTI_PAGE_STRUCTURE_PLAN.md` - URL structure and SEO
- Parent project CLAUDE.md for brand guidelines

### Related Projects
- **LLMachete**: Parent business project
- **Data Hourglass**: Next visualization in pipeline

### External Resources
- TeX Gyre fonts: GUST e-foundry
- Vercel docs: https://vercel.com/docs
- Cloudflare DNS: https://dash.cloudflare.com
