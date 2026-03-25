# Visual & Interactive Component Audit Fixes

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Fix all functional bugs, apply brand colors, and improve UX across all visualization and interactive components.

**Architecture:** Per-component fixes with atomic commits. Brand color constants defined once, applied everywhere. Canvas components get responsive sizing. Immersive page gets fade transitions.

**Tech Stack:** Next.js 16, TypeScript, Tailwind CSS, D3.js, Canvas 2D API

**Project root:** `/home/llmachete/projects/claude-code/LLMachete/content/rice-to-airpods-part1-data-scale`

**Brand Colors:**
- Copper: `#D47E45` (primary accent, CTAs, highlights)
- Deep Teal: `#0E5A61` (brand primary, headings)
- Medium Teal: `#197A83` (supporting, borders)
- Navy: `#1A2332` (body text, dark elements)
- Sand Beige: `#F0E7E0` (light backgrounds, borders)
- Brand Gradient: `linear-gradient(90deg, #D47E45 0%, #197A83 50%, #0E5A61 100%)`

**Verify after each task:** `npm run lint && npm run build`

---

## Task 1: Visual2_CoffeeCupFill — Responsive Canvas + Brand Colors + Particle Fix

**Files:** `components/visualizations/Visual2_CoffeeCupFill.tsx`

**Changes:**
1. Make canvas responsive: replace fixed `width={400} height={400}` with a container that measures itself, then set canvas dimensions from a `useEffect` + `ResizeObserver`
2. Fix particle distribution: replace `(i * 73) % (cupWidth - 40)` with a 2D grid+jitter approach so particles fill the cup uniformly
3. Apply brand colors:
   - Cup stroke: `#D47E45` (copper) instead of `#888888`
   - Cup handle: `#D47E45`
   - Particles: `rgba(212, 126, 69, opacity)` (copper-toned) instead of beige
   - Particle stroke: `rgba(14, 90, 97, opacity * 0.5)` (teal tint)
   - Progress bar: replace `bg-blue-500` with `bg-[#D47E45]`
   - Title: `text-[#1A2332]` instead of `text-slate-900`
   - Subtitle/info text: `text-[#0E5A61]` instead of `text-slate-600`
   - Canvas border: `border-[#F0E7E0]` instead of `border-slate-200`
   - Background gradient: keep subtle but shift to `from-[#F0E7E0]/30 to-white`

**Commit:** `fix: make Visual2_CoffeeCupFill responsive, fix particle spread, apply brand colors`

---

## Task 2: Visual3_ContainerZoom — Responsive Canvas + Brand Colors

**Files:** `components/visualizations/Visual3_ContainerZoom.tsx`

**Changes:**
1. Canvas already uses `className="w-full h-full"` CSS scaling but draws at fixed 800×600. Add `ResizeObserver` to dynamically set canvas width/height to match container, scale drawing coordinates by `dpr = canvas.width / 800`
2. Apply brand colors:
   - Container outline (stage 4): `#D47E45` instead of `#374151`
   - Container fill gradient: `rgba(212, 126, 69, 0.15)` to `rgba(14, 90, 97, 0.15)` (copper→teal)
   - Human figure: `#0E5A61` (deep teal) instead of `#3B82F6`
   - Texture lines: `rgba(212, 126, 69, 0.2 * labelOpacity)`
   - Dot silhouette (stage 3): `rgba(14, 90, 97, opacity)` (teal)
   - Cup stroke in drawCoffeeCup: `rgba(212, 126, 69, opacity)` instead of gray
   - Progress bar: `bg-[#D47E45]` instead of `bg-blue-500`
   - Title/subtitle text: `text-[#1A2332]` / `text-[#0E5A61]`
   - Border: `border-[#F0E7E0]`

**Commit:** `fix: make Visual3_ContainerZoom responsive, apply brand colors`

---

## Task 3: Visual1_RiceGrain — Brand Color Accents

**Files:** `components/visualizations/Visual1_RiceGrain_2D.tsx`

**Changes:**
1. Add copper accent to grain outline: change `stroke="#D4CDB8"` to `stroke="#D47E45"` with `strokeOpacity="0.4"`
2. Callout label: `text-[#1A2332]` instead of `text-slate-900`, `text-[#0E5A61]` instead of `text-slate-500`
3. Callout border: `border-[#F0E7E0]` instead of `border-slate-200`
4. Technical annotation text: `text-[#1A2332]` instead of `text-slate-700`, `text-[#197A83]` instead of `text-slate-400`
5. Background: keep subtle, shift radial gradient to use `rgba(212, 126, 69, 0.02)` tint

**Commit:** `style: apply brand colors to Visual1_RiceGrain`

---

## Task 4: Visual5_Timeline — Brand Colors + Remove Dead Hover Code

**Files:** `components/visualizations/Visual5_Timeline.tsx`

**Changes:**
1. Line stroke: `#D47E45` (copper) instead of `#0ea5e9`
2. Data point circles fill: `#D47E45`, stroke: `#0E5A61` instead of `#fff`
3. Axis text: `#1A2332` instead of `#475569`
4. Axis label text: `#1A2332` instead of `#334155`
5. Remove unused `hoveredPoint` state and the JSX block (lines 59, 230-240) — it's dead code
6. Title: `text-[#1A2332]`, subtitle: `text-[#0E5A61]`

**Commit:** `style: apply brand colors to Visual5_Timeline, remove dead hover code`

---

## Task 5: Visual6_AirPodsCutaway — Brand Colors

**Files:** `components/visualizations/Visual6_AirPodsCutaway_2D.tsx`

**Changes:**
1. H2 chip: fill `#197A83` (medium teal) instead of `#0EA5E9`, stroke `#0E5A61`
2. Chip glow radialGradient: `#197A83` instead of `#0EA5E9`
3. Data stream gradient: `#D47E45` (copper) instead of `#F5F5DC`
4. Particle fill: `#D47E45` instead of `#F5F5DC`
5. Legend chip color: `bg-[#197A83]` instead of `bg-cyan-500`
6. Legend stream dot: `bg-[#D47E45]` instead of `bg-[#F5F5DC]`
7. Pulse dots in info overlay: `bg-[#D47E45]` instead of `bg-cyan-400`
8. Speed up particle animation: `4s` → `2.5s` for all 5 particles (adjust stagger delays proportionally)

**Commit:** `style: apply brand colors to Visual6_AirPodsCutaway, speed up particles`

---

## Task 6: Visual7_ResourceComparison — Brand Colors

**Files:** `components/visualizations/Visual7_ResourceComparison.tsx`

**Changes:**
1. Traditional side background: `bg-[#F0E7E0]` instead of `bg-slate-100`
2. Traditional heading: `text-[#1A2332]` instead of `text-slate-900`
3. Data side background: `bg-[#0E5A61]/5` instead of `bg-blue-50`
4. Data heading: `text-[#0E5A61]` instead of `text-blue-900`
5. Data properties text: `text-[#0E5A61]` instead of `text-blue-600`
6. ✓ in data column: `text-[#0E5A61]` instead of `text-blue-700`
7. ~ value: `text-[#D47E45]` instead of `text-amber-600`
8. Divider gradient: `via-[#197A83]` instead of `via-slate-300`
9. ResourceItem name: `text-[#1A2332]` instead of `text-slate-700`

**Commit:** `style: apply brand colors to Visual7_ResourceComparison`

---

## Task 7: Interactive Components — Brand Colors

**Files:**
- `components/interactive/DataHourglass_2D.tsx`
- `components/interactive/HumorousCounter.tsx`
- `components/interactive/NapsterTimeMachine.tsx`
- `components/interactive/SentenceCounter.tsx`
- `components/interactive/RunningCounter.tsx`

**Changes per file — focus on accent colors only (these are complex components, minimal touch):**

**DataHourglass_2D.tsx:**
- "The paradox" strong tag: `text-[#D47E45]` instead of `text-cyan-400`
- Section header accents: use brand navy/teal where slate is used for headings

**HumorousCounter.tsx:**
- No color changes needed (it's a floating widget, subtle is correct)

**NapsterTimeMachine.tsx:**
- No structural changes (complex interactive, leave functional)

**SentenceCounter.tsx:**
- No structural changes

**RunningCounter.tsx:**
- No structural changes

**Commit:** `style: apply brand accent colors to DataHourglass`

---

## Task 8: Immersive Page — Visual Fade Transitions

**Files:** `app/immersive/page.tsx`

**Changes:**
1. Wrap each visualization in a transition container. Replace the conditional rendering blocks (lines 149-183) with a pattern that keeps all visuals mounted but uses opacity/visibility transitions:

```tsx
{/* Instead of conditional rendering, use opacity transitions */}
<div className={`absolute inset-0 transition-opacity duration-500 ${currentVisual === 'visual-1' ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
  <Visual1_RiceGrain />
</div>
```

This gives smooth 500ms crossfades between visuals instead of hard cuts.

2. Wrap `handleStepEnter` and `handleStepProgress` in `useCallback` to prevent ScrollySection from recreating the Scrollama instance on every render.

**Commit:** `fix: add fade transitions between visuals, memoize scroll handlers`

---

## Task 9: Landing Page — Fix Article Mode Promise

**Files:** `components/LandingPage.tsx`

**Changes:**
1. Update the article mode card description to accurately reflect what article mode offers (text + interactive elements, NOT full visualizations). Change "All same visualizations" to "Interactive elements inline" or similar honest description.

**Commit:** `fix: correct article mode description on landing page`

---

## Task 10: Final Verification

**Steps:**
1. Run `npm run lint` — expect 0 errors (3 warnings OK)
2. Run `npm run build` — expect clean build
3. Run `git status` to verify all changes are committed
4. Push: `git push origin main` (triggers Vercel deploy)

---

## Execution Order

Tasks 1-7 are independent (per-component) — can be parallelized with subagent-driven development.
Task 8 depends on understanding the visual components (run after 1-6).
Task 9 is independent.
Task 10 is final verification (run last).

**Recommended waves:**
- Wave 1 (parallel): Tasks 1, 2, 3, 4, 5, 6, 7, 9
- Wave 2: Task 8
- Wave 3: Task 10
