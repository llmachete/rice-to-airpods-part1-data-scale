# Brand Asset Standardization Design

**Date**: 2026-02-24
**Scope**: All 3 LLMachete sites (Rice to AirPods, Splash Page, Data Hourglass)
**Goal**: Ensure logo, wordmark, and favicons are consistent and correct everywhere.

---

## Decision: Official Warm Orange

**`#D97D42`** (designer original) is the single source of truth for the warm orange / copper accent color. This replaces all references to `#D47E45` across codebases and documentation.

**RGB equivalent**: `rgb(217, 125, 66)` / `rgba(217, 125, 66, opacity)`

---

## 1. Color Standardization

### What Changes
- **Global CLAUDE.md**: `--copper: #D47E45` → `--copper: #D97D42` everywhere
- **Rice to AirPods**: Find-replace `#D47E45` → `#D97D42` in all `.tsx` files. Update `rgba(212, 126, 69, ...)` → `rgba(217, 125, 66, ...)`.
- **Splash page**: Update any `#D47E45` in CSS/HTML
- **Data Hourglass**: Update any references
- **Brand gradient**: `linear-gradient(90deg, #D97D42 0%, #197A83 50%, #0E5A61 100%)`

---

## 2. Favicon Strategy

### Standard Favicon Set (per project)

| File | Format | Size | Purpose |
|------|--------|------|---------|
| `favicon.svg` | SVG | Vector | Modern browsers (scales perfectly) |
| `favicon.ico` | ICO | 16x16 + 32x32 | Legacy browser fallback |
| `apple-touch-icon.png` | PNG | 180x180 | iOS home screen icon |
| `icon-192.png` | PNG | 192x192 | Android/PWA (via manifest) |
| `icon-512.png` | PNG | 512x512 | Android/PWA splash (via manifest) |
| `site.webmanifest` | JSON | — | PWA manifest linking icons |

### Source
Designer's `App icon logo_warm Orange.svg` at:
`/home/llmachete/projects/claude-code/LLMachete/freelancer-brand-content/App icon logo/App icon logo/Warm orange logo/App icon logo_warm Orange.svg`

All raster formats derived from this SVG.

### Per-Project Implementation
- **Rice to AirPods** (Next.js): Place favicon files in `/app/` directory. Next.js auto-discovers via metadata conventions. Add `apple-touch-icon.png` and manifest reference in layout metadata.
- **Splash page** (static HTML): Place files in root directory. Add `<link>` tags in `<head>` for favicon, apple-touch-icon, and manifest.
- **Data Hourglass** (Vite): Place files in `/public/`. Add references in `index.html`.

---

## 3. Logo & Wordmark Assets

### Canonical Set (per project `/public/`)

| File | Source | Content |
|------|--------|---------|
| `llmachete-logo.svg` | Designer warm orange icon SVG | Full icon (orange bg + white blade) |
| `llmachete-icon-only.svg` | Extracted white blade polygons | Icon without background (for colored containers) |
| `llmachete-wordmark.svg` | Designer wordmark SVG | Text-only wordmark (#0D4F56 teal) |

Designer SVGs already use `#D97D42`. No content changes needed — just copy to ensure all projects have identical files.

---

## 4. Cleanup

- **Splash page**: Move 60+ test PNG files to `_archive/` directory
- **Splash page**: Replace inline data-URI favicon with file-based `favicon.svg` + `favicon.ico`
- **CLAUDE.md**: Update brand color section to reflect `#D97D42` as official copper

---

## 5. Verification

After all changes:
1. `npm run lint && npm run build` on Rice to AirPods and Data Hourglass
2. `grep -r "#D47E45"` across all projects — expect 0 results
3. Visual spot-check favicons in Chrome, Safari, Firefox
4. Test apple-touch-icon by long-pressing "Add to Home Screen" on iOS
5. Verify manifest icons load via Chrome DevTools → Application tab

---

## Projects & Paths

| Project | Path | Framework | Deploy |
|---------|------|-----------|--------|
| Rice to AirPods | `/home/llmachete/projects/claude-code/LLMachete/content/rice-to-airpods-part1-data-scale` | Next.js | `git push origin main` → Vercel |
| Splash Page | `/home/llmachete/projects/claude-code/LLMachete/content/llmachete-splash-page` | Static HTML | Manual / Vercel |
| Data Hourglass | `/home/llmachete/projects/claude-code/LLMachete/data-hourglass` | Vite + React | TBD |

## Brand Color Reference (Updated)

```css
--copper: #D97D42;        /* Warm Orange - Primary accent (designer original) */
--deep-teal: #0E5A61;     /* Deep Teal Blue - Brand primary */
--medium-teal: #197A83;   /* Medium Teal - Supporting */
--navy: #1A2332;          /* Navy - Text/dark elements */
--sand-beige: #F0E7E0;    /* Soft Sand Beige - Light accents */
```
