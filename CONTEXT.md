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
- Tech debt cleanup IN PROGRESS (2026-02-23) — see docs/plans/2026-02-23-tech-debt-cleanup.md
- Tasks 1-7 COMPLETE, Tasks 8-10 REMAINING (see below)

### Tech Debt Cleanup Session (2026-02-23) — IN PROGRESS

**Plan file:** `docs/plans/2026-02-23-tech-debt-cleanup.md`
**Execution method:** Subagent-driven development (superpowers:subagent-driven-development)

**Completed (7/10):**
- ✅ Task 1: Removed GSAP + intersection-observer (~55KB bundle reduction) — commit 882d69e
- ✅ Task 2: Added CSP + security headers via vercel.json (corrected after code review) — commits 24d4e4d, 9f3a6d7
- ✅ Task 3: Fixed TopNavBarAutoHide scroll listener (state→ref, passive:true) — commit b941cd7
- ✅ Task 4: Added passive:true to HumorousCounter scroll listener — commit d749c42
- ✅ Task 5: Fixed HumorousCounter RAF restart on measurement rotation (currentMeasurementRef) — commit bff1790
- ✅ Task 6: Fixed selectMeasurement guard clauses + dedup (lastMeasurementIdRef) — commit 64534e8
- ✅ Task 7: Fixed drag listener memory leak (dragOffsetRef) — commit 7e57bc6

**Remaining (3/10):**
- ⏳ Task 8: Fix Visual2_CoffeeCupFill.tsx canvas perf — hoist gradient out of RAF loop, stabilize particle pool via fillProgressRef
- ⏳ Task 9: Add isValidHttpsUrl() to HumorousCounter, validate sourceUrl before rendering as href
- ⏳ Task 10: Push to main (git push origin main), smoke test stories.llmachete.com

**To resume:** Open new session, say "Resume work on Rice to AirPods", then execute Tasks 8-10 from the plan using superpowers:subagent-driven-development. All 7 completed tasks are committed and ready on main branch (not yet pushed to origin).

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

### Latest Session: 2026-01-31 (Evening)
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
