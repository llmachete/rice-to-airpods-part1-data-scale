# Coding Conventions

**Analysis Date:** 2026-02-23

## Naming Patterns

**Files:**
- Component files: PascalCase with descriptive names (e.g., `TopNavBar.tsx`, `ExpandableMath.tsx`)
- Visualization components: `Visual[N]_[Description].tsx` (e.g., `Visual1_RiceGrain_2D.tsx`)
- Interactive components: Descriptive PascalCase (e.g., `RunningCounter.tsx`, `NapsterTimeMachine.tsx`)
- Page files: `page.tsx` and `layout.tsx` (Next.js convention)
- Shared/utility components in `components/shared/` directory

**Functions:**
- Default exported components: PascalCase (e.g., `export default function TopNavBar()`)
- React hooks follow React convention (e.g., `useState`, `useEffect`, `useRef`)
- Event handlers use camelCase with `handle` or `on` prefix where applicable
- Internal utility functions use camelCase (e.g., `formatDisplay()`, `calculateBytes()`)

**Variables:**
- State variables: camelCase (e.g., `currentScale`, `scrollProgress`, `isExpanded`)
- Constants: UPPER_SNAKE_CASE for data rates and configuration (e.g., `RATES`, `confidenceColors`)
- Type/interface instances: camelCase (e.g., `visibleScrollProgress`)
- React refs: camelCase with `Ref` suffix (e.g., `scrollerRef`, `startTimeRef`)

**Types:**
- Interface names: PascalCase prefixed with component name or semantic meaning (e.g., `TopNavBarProps`, `ScrollySectionProps`, `ExpandableMathProps`)
- Union types: PascalCase (e.g., `UnitMode`, `ScopeMode`, `VisualMode`)
- Nested types within interfaces: Inline as needed
- Type annotations always present on props interfaces

## Code Style

**Formatting:**
- ESLint v9 with Next.js configuration (`eslint.config.mjs`)
- Enforces core-web-vitals and TypeScript rules
- Import statements organized, linting catches issues

**Linting:**
- Tool: ESLint v9 with `@eslint/config-next`
- Rules: Core web vitals compliance + TypeScript strict mode
- No auto-fix script in package.json; uses `npm run lint` for checking
- Files ignored: `.next/**`, `out/**`, `build/**`, `next-env.d.ts`

## Import Organization

**Order:**
1. React imports (`react`, `react-dom`)
2. Next.js imports (`next/image`, `next/dynamic`, `next/metadata`)
3. External libraries (D3, GSAP, Scrollama)
4. Internal components (`@/components/...`)
5. Hooks and utilities

**Path Aliases:**
- `@/*`: Points to project root directory (configured in `tsconfig.json`)
- Used for clean imports: `import Component from '@/components/ComponentName'`
- Enables refactoring without deep relative paths

**Example import block from `app/immersive/page.tsx`:**
```typescript
'use client';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import ScrollySection from '@/components/ScrollySection';
import { FootnoteRef } from '@/components/shared/Footnote';

const TopNavBarAutoHide = dynamic(
  () => import('@/components/shared/TopNavBarAutoHide'),
  { ssr: false }
);
```

## Error Handling

**Patterns:**
- No explicit try-catch blocks observed in source code
- Relies on React error boundaries (implicitly via Next.js runtime)
- Dynamic imports include fallback UI: `loading: () => <div className="...">Loading visualization...</div>`
- Null checks for hydration: `if (!mounted) return null;` in `TopNavBar.tsx`
- Type safety via TypeScript strict mode handles most errors at compile time

**Example from `TopNavBar.tsx`:**
```typescript
const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true);
}, []);

if (!mounted) return null; // Prevent hydration mismatch
```

## Logging

**Framework:** Console is not used for logging in production code. No logger library detected.

**Patterns:**
- No logging infrastructure observed in source components
- Application is client-side React - debugging via browser DevTools
- Analytics via Vercel Analytics (`@vercel/analytics`)

## Comments

**When to Comment:**
- JSDoc comments for component purposes and brand compliance requirements
- Inline comments for complex calculations or non-obvious logic
- Section comments for visual/rendering logic

**JSDoc/TSDoc:**
- Observed in components like `TopNavBar.tsx`: Multi-line header with purpose, brand compliance notes, and color/font guidelines
- Example:
```typescript
/**
 * LLMachete Brand-Compliant Top Navigation Bar
 * Three sections: Brand | Current Scale | Reading Progress
 *
 * Brand Colors (Official Brand Guideline):
 * - Warm Orange (Copper): #D47E45 (primary accent)
 * - Deep Teal: #0E5A61 (brand primary)
 * ...
 */
```

## Function Design

**Size:** Components are focused and single-responsibility. Visualization components handle rendering, interactive components handle state updates.

**Parameters:**
- Props passed via interface (e.g., `ScrollySectionProps`, `ExpandableMathProps`)
- Default values used for optional props: `offset = 0.5`, `debug = false`
- Destructuring in function signature: `{ scrollProgress = 0 }: TopNavBarProps`

**Return Values:**
- React components return JSX
- Event handlers return void
- Utility calculations return specific types: `{ value: string; unit: string }`
- Null returns for hydration safety: `if (!mounted) return null;`

## Module Design

**Exports:**
- All components use `export default` (single export per file)
- No named exports observed
- Each component file is self-contained

**Barrel Files:**
- No barrel files (`index.ts`) observed
- Each component imported directly from its file path
- Encourages explicit imports and tree-shaking

## State Management

**Pattern:** React hooks exclusively (`useState`, `useEffect`, `useRef`)

**Example from `TopNavBar.tsx`:**
```typescript
const [currentScale, setCurrentScale] = useState<{
  name: string;
  icon: string;
  color: string;
}>({
  name: 'Byte',
  icon: '○',
  color: 'text-[#0E5A61]'
});
```

**Example from `RunningCounter.tsx`:**
```typescript
const [bytesCreated, setBytesCreated] = useState(0);
const [unitMode, setUnitMode] = useState<UnitMode>('grains');
const startTimeRef = useRef<number>(Date.now());
```

## Styling

**Tool:** Tailwind CSS v4 with PostCSS

**Approach:**
- Utility-first CSS via Tailwind class names
- Brand colors defined as CSS variables in `app/globals.css`:
  - `--copper: #D47E45` (Warm Orange)
  - `--deep-teal: #0E5A61` (Deep Teal)
  - `--navy: #1A2332` (Navy)
  - `--sand-beige: #F0E7E0` (Sand Beige)
- Colors referenced via Tailwind arbitrary values: `text-[#D47E45]`, `bg-[#0E5A61]`

**Inline Styles:**
- Minimal inline styles; prefer Tailwind utilities
- Dynamic styles use inline `style={}` for calculated/runtime values (e.g., progress bar width in `TopNavBar.tsx`)
- Example: `style={{ width: `${scrollProgress * 100}%` }}`

**CSS-in-JS:**
- Some components use `<style jsx>` for scoped animations
- Example from `Visual1_RiceGrain_2D.tsx`:
```typescript
<style jsx>{`
  @keyframes grain-float {
    0%, 100% { transform: translateY(0) rotate(-2deg); }
    50% { transform: translateY(-12px) rotate(2deg); }
  }
  .animate-grain-float {
    animation: grain-float 6s ease-in-out infinite;
  }
`}</style>
```

## TypeScript Configuration

**Compiler Options (tsconfig.json):**
- Target: ES2017
- Strict mode: enabled
- Module: esnext
- JSX: react-jsx
- Module resolution: bundler
- Incremental compilation enabled
- Path aliases: `@/*` maps to project root

**Type Safety:**
- All React props have explicit interface definitions
- Function parameters typed
- No `any` types except in specific Scrollama integration (cast `response as any`)
- Union types for mode/state (e.g., `type UnitMode = 'grains' | 'volume' | 'containers' | 'real-world'`)

## Client vs Server Components

**Directive Usage:**
- `'use client'` at top of client components (required for React hooks)
- Examples: `TopNavBar.tsx`, `ScrollySection.tsx`, `ExpandableMath.tsx`
- Page components sometimes use dynamic imports to defer client components

**Dynamic Imports:**
- Used for large visualization components: `const Visual1_RiceGrain = dynamic(...)`
- Pattern: `dynamic(() => import('@/components/...'), { ssr: false, loading: () => <div>...</div> })`
- Reduces bundle size for immersive page

## Font/Typography

**Implementation:**
- TeX Gyre Adventor loaded via @font-face in `app/globals.css`
- Font files: `texgyreadventor-regular.otf` (400), `texgyreadventor-bold.otf` (700)
- Fallback: Franklin Gothic Book for secondary text
- Applied globally: `font-family: 'TeX Gyre Adventor', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`
- Headings: font-weight 700
- Body: font-weight 400

## Special Patterns

**Hydration Safety:**
- Components check `if (!mounted)` after hydration to prevent mismatch errors
- Used in `TopNavBar.tsx` and other interactive components

**Dynamic Component Loading:**
- Used for scroll-heavy pages to improve initial load
- Pattern: `dynamic(() => import(...), { ssr: false, loading: () => <Skeleton /> })`

**Scroll Event Integration:**
- Scrollama.js wrapped in `ScrollySection` component
- Provides `onStepEnter`, `onStepExit`, `onStepProgress` callbacks
- Type-safe response objects: `{ element: HTMLElement; index: number; direction: 'up' | 'down' }`

---

*Convention analysis: 2026-02-23*
