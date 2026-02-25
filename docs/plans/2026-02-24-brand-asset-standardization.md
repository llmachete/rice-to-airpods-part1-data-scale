# Brand Asset Standardization Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Standardize logo, wordmark, favicons, and brand color (#D97D42) across all 3 LLMachete sites.

**Architecture:** Global find-replace of #D47E45 → #D97D42, copy canonical favicon/logo assets to each project, add webmanifest files, clean up splash page test files.

**Tech Stack:** Next.js (Rice to AirPods), Static HTML (Splash Page), Vite+React (Data Hourglass). SVG logos, ICO/PNG favicons generated via sharp or manual conversion.

**Design Doc:** `docs/plans/2026-02-24-brand-asset-standardization-design.md`

---

## Task 1: Color Replace — Rice to AirPods (#D47E45 → #D97D42)

**Files to modify (all in `/home/llmachete/projects/claude-code/LLMachete/content/rice-to-airpods-part1-data-scale/`):**
- `components/LandingPage.tsx`
- `components/SeriesIntro.tsx`
- `components/interactive/DataHourglass_2D.tsx`
- `components/visualizations/Visual1_RiceGrain_2D.tsx`
- `components/visualizations/Visual2_CoffeeCupFill.tsx`
- `components/visualizations/Visual3_ContainerZoom.tsx`
- `components/visualizations/Visual5_Timeline.tsx`
- `components/visualizations/Visual6_AirPodsCutaway_2D.tsx`
- `components/visualizations/Visual7_ResourceComparison.tsx`
- `components/shared/TopNavBar.tsx`
- `components/shared/TopNavBarAutoHide.tsx`
- `components/shared/BrandTable.tsx`
- `app/globals.css`

**Changes:**
1. Find-replace `#D47E45` → `#D97D42` across all files listed above (use `replace_all`)
2. Find-replace `rgba(212, 126, 69` → `rgba(217, 125, 66` in:
   - `components/visualizations/Visual2_CoffeeCupFill.tsx`
   - `components/visualizations/Visual3_ContainerZoom.tsx`
   - `components/visualizations/Visual1_RiceGrain_2D.tsx`
   - `components/shared/TopNavBar.tsx`
   - `components/shared/TopNavBarAutoHide.tsx`

**Verify:** `npm run lint && npm run build`

**Commit:** `style: standardize brand color #D47E45 → #D97D42 (designer original)`

---

## Task 2: Color Replace — Splash Page (#D47E45 → #D97D42)

**File:** `/home/llmachete/projects/claude-code/LLMachete/content/llmachete-splash-page/index.html`

**Changes:**
1. Line 82: `background: #D47E45;` → `background: #D97D42;`
2. Line 99: `border-color: #D47E45;` → `border-color: #D97D42;`
3. Line 100: `color: #D47E45;` → `color: #D97D42;`

**Commit:** `style: standardize brand color to #D97D42 on splash page`

---

## Task 3: Generate Favicon Asset Set

**Working directory:** Rice to AirPods project root

**Source SVG:** `/home/llmachete/projects/claude-code/LLMachete/freelancer-brand-content/App icon logo/App icon logo/Warm orange logo/App icon logo_warm Orange.svg`

**Steps:**
1. Create a `favicon.svg` from the source SVG (simplified for web, viewBox 0 0 512 512)
2. Use `sharp` (already in Next.js deps) or `convert` (ImageMagick) to generate:
   - `apple-touch-icon.png` (180x180)
   - `icon-192.png` (192x192)
   - `icon-512.png` (512x512)
3. Use `convert` to generate `favicon.ico` (16x16 + 32x32 + 48x48 multi-res)
4. If ImageMagick not available, write a Node.js script using `sharp` to generate all PNGs and use the existing `favicon.ico` (it already uses #D97D42 from the designer)
5. Create `site.webmanifest`:
```json
{
  "name": "LLMachete",
  "short_name": "LLMachete",
  "icons": [
    { "src": "/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ],
  "theme_color": "#D97D42",
  "background_color": "#ffffff",
  "display": "standalone"
}
```

**Output files placed in a shared location** to be copied to each project in subsequent tasks.

**Commit:** `feat: generate standardized favicon and manifest assets`

---

## Task 4: Deploy Favicons — Rice to AirPods (Next.js)

**Project:** `/home/llmachete/projects/claude-code/LLMachete/content/rice-to-airpods-part1-data-scale/`

**Changes:**
1. Copy `favicon.svg` to `/app/` (Next.js convention — auto-discovered as favicon)
2. Replace existing `/app/favicon.ico` with new multi-res version (or keep existing if already #D97D42)
3. Copy `apple-touch-icon.png` to `/app/` (Next.js auto-discovers)
4. Copy `icon-192.png`, `icon-512.png` to `/public/`
5. Copy `site.webmanifest` to `/public/`
6. Update `/app/layout.tsx` metadata to include manifest link:
   ```tsx
   export const metadata: Metadata = {
     // ... existing metadata
     manifest: '/site.webmanifest',
   };
   ```
7. Ensure `/public/llmachete-logo.svg` matches designer source (already #D97D42 — verify, don't change if matching)

**Verify:** `npm run lint && npm run build`

**Commit:** `feat: add complete favicon set and webmanifest to Rice to AirPods`

---

## Task 5: Deploy Favicons — Splash Page (Static HTML)

**Project:** `/home/llmachete/projects/claude-code/LLMachete/content/llmachete-splash-page/`

**Changes:**
1. Copy `favicon.svg`, `favicon.ico`, `apple-touch-icon.png` to project root
2. Copy `icon-192.png`, `icon-512.png`, `site.webmanifest` to project root
3. Copy `llmachete-logo.svg`, `llmachete-icon-only.svg`, `llmachete-wordmark.svg` to project root
4. Replace inline favicon data-URI in `index.html` `<head>` with file references:
   ```html
   <link rel="icon" type="image/svg+xml" href="/favicon.svg">
   <link rel="icon" type="image/x-icon" href="/favicon.ico">
   <link rel="apple-touch-icon" href="/apple-touch-icon.png">
   <link rel="manifest" href="/site.webmanifest">
   ```
5. Remove the old inline `data:image/svg+xml,...` favicon link

**Commit:** `feat: add proper favicon files and manifest to splash page`

---

## Task 6: Deploy Favicons — Data Hourglass (Vite)

**Project:** `/home/llmachete/projects/claude-code/LLMachete/content/data-hourglass/`

**Changes:**
1. Delete `/public/vite.svg` (Vite placeholder)
2. Copy `favicon.svg`, `favicon.ico`, `apple-touch-icon.png` to `/public/`
3. Copy `icon-192.png`, `icon-512.png`, `site.webmanifest` to `/public/`
4. Copy `llmachete-logo.svg`, `llmachete-icon-only.svg`, `llmachete-wordmark.svg` to `/public/`
5. Update `/index.html` — replace Vite SVG reference:
   ```html
   <link rel="icon" type="image/svg+xml" href="/favicon.svg">
   <link rel="apple-touch-icon" href="/apple-touch-icon.png">
   <link rel="manifest" href="/site.webmanifest">
   ```
6. Delete `/src/assets/react.svg` if unused

**Commit:** `feat: add LLMachete favicon and brand assets to Data Hourglass`

---

## Task 7: Splash Page Cleanup — Archive Test PNGs

**Project:** `/home/llmachete/projects/claude-code/LLMachete/content/llmachete-splash-page/`

**Changes:**
1. Create `_archive/` directory
2. Move all test/iteration PNG files (60+ files like `logo-CLEAN-FINAL.png`, `wordmark-teal.png`, `comparison-before-after.png`, etc.) to `_archive/`
3. Keep only production files in root: `index.html`, `llmachete-logo-sidebyside.png` (used in HTML), favicon files, SVG logos, manifest

**Commit:** `chore: archive 60+ test PNG files from splash page root`

---

## Task 8: Update CLAUDE.md Brand Color References

**Files:**
- `/home/llmachete/CLAUDE.md` (global)
- `/home/llmachete/projects/claude-code/LLMachete/CLAUDE.md` (project)

**Changes:**
1. Find-replace `#D47E45` → `#D97D42` in both files
2. Update any descriptive text that says "Warm Orange" color to note it's the designer-original hex
3. Update rgba references if present: `rgba(212, 126, 69` → `rgba(217, 125, 66`

**Commit:** `docs: update CLAUDE.md brand color to #D97D42 (designer original)`

---

## Task 9: Final Verification

**Steps:**
1. `cd /home/llmachete/projects/claude-code/LLMachete/content/rice-to-airpods-part1-data-scale && npm run lint && npm run build`
2. Grep for stale color: `grep -r "#D47E45" --include="*.tsx" --include="*.css" --include="*.html" --include="*.md"` across all 3 projects + CLAUDE.md files — expect 0 results in source files (docs/plans references are OK)
3. Verify favicon files exist in each project:
   - Rice to AirPods: `/app/favicon.ico`, `/app/favicon.svg`, `/app/apple-touch-icon.png`, `/public/site.webmanifest`
   - Splash Page: `favicon.svg`, `favicon.ico`, `apple-touch-icon.png`, `site.webmanifest`
   - Data Hourglass: `/public/favicon.svg`, `/public/apple-touch-icon.png`, `/public/site.webmanifest`
4. `git push origin main` on Rice to AirPods to deploy to Vercel
5. Push splash page and data hourglass if they have remotes configured

---

## Execution Order

- Tasks 1, 2: Independent color replacements (can be parallel)
- Task 3: Generate favicon assets (dependency for Tasks 4-6)
- Tasks 4, 5, 6: Deploy favicons per project (can be parallel after Task 3)
- Task 7: Cleanup (independent)
- Task 8: CLAUDE.md updates (independent)
- Task 9: Final verification (run last)

**Recommended waves:**
- Wave 1 (parallel): Tasks 1, 2
- Wave 2: Task 3
- Wave 3 (parallel): Tasks 4, 5, 6, 7, 8
- Wave 4: Task 9
