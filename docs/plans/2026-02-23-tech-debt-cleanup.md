# Tech Debt Cleanup & Performance Optimizations

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Clean up all tech debt and apply performance optimizations identified in the codebase audit on the deployed Rice to AirPods Part 1 article at stories.llmachete.com.

**Architecture:** This is a Next.js 16 static export site with no backend. All changes are client-side React + config file edits. Deployment is automatic on `git push origin main` via Vercel.

**Tech Stack:** Next.js 16, React 19, TypeScript strict, Tailwind CSS 4, Scrollama.js, Canvas API, `requestAnimationFrame`.

**Verification after each task:** `npm run lint && npm run build` from the project root. Build must succeed with zero errors before committing.

**Project root:** `/home/llmachete/projects/claude-code/LLMachete/content/rice-to-airpods-part1-data-scale`

---

## Task 1: Remove Unused Dependencies (GSAP + intersection-observer)

GSAP (~50KB) and intersection-observer (~5KB) are in package.json but not imported anywhere in the source. D3 IS used in Visual5_Timeline.tsx — do not remove it.

**Files:**
- Modify: `package.json`

**Step 1: Confirm GSAP is unused**

```bash
grep -r "gsap" components/ app/ --include="*.tsx" --include="*.ts"
```
Expected: No output. If output appears, stop — GSAP is used and must not be removed.

**Step 2: Confirm intersection-observer is unused**

```bash
grep -r "intersection-observer" components/ app/ --include="*.tsx" --include="*.ts"
```
Expected: No output.

**Step 3: Remove from package.json**

In `package.json`, remove these two lines from `"dependencies"`:
```json
"gsap": "^3.14.2",
"intersection-observer": "^0.12.2",
```

**Step 4: Reinstall and verify build**

```bash
npm install
npm run lint && npm run build
```
Expected: Clean build. No TypeScript or lint errors.

**Step 5: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: remove unused GSAP and intersection-observer dependencies"
```

---

## Task 2: Add Content Security Policy via vercel.json

The site loads an inline Google Analytics script with no CSP. `output: 'export'` in next.config.ts means Next.js `headers()` doesn't work — headers must be configured in `vercel.json` for Vercel's CDN to serve them.

**Files:**
- Create: `vercel.json`

**Step 1: Create vercel.json with CSP headers**

Create `/vercel.json` with this content:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com; connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://vitals.vercel-insights.com; img-src 'self' data: https://www.google-analytics.com; style-src 'self' 'unsafe-inline'; font-src 'self'; object-src 'none'; frame-ancestors 'none';"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        }
      ]
    }
  ]
}
```

**Step 2: Verify build still succeeds**

```bash
npm run lint && npm run build
```
Expected: Clean build.

**Step 3: Commit**

```bash
git add vercel.json
git commit -m "security: add Content-Security-Policy and security headers via vercel.json"
```

---

## Task 3: Fix TopNavBarAutoHide Scroll Listener (State → Ref)

**Problem:** `lastScrollY` is stored as React state. Every scroll event calls `setLastScrollY()`, which triggers a re-render, which re-runs the `useEffect`, which removes and re-adds the scroll listener. On a fast scroll, this add/remove cycle happens hundreds of times per second.

**Fix:** Replace `lastScrollY` state with a `useRef` so the value updates without triggering re-renders or effect restarts.

**Files:**
- Modify: `components/shared/TopNavBarAutoHide.tsx`

**Step 1: Replace `useState` for lastScrollY with `useRef`**

Find this block (lines 43–43):
```typescript
const [lastScrollY, setLastScrollY] = useState(0);
```

Replace with:
```typescript
const lastScrollYRef = useRef(0);
```

**Step 2: Update the scroll effect**

Find this entire effect (lines 50–74):
```typescript
useEffect(() => {
  if (!mounted) return;

  const controlNavbar = () => {
    const currentScrollY = window.scrollY;

    // Always show at very top of page
    if (currentScrollY < 100) {
      setIsVisible(true);
    }
    // Show when scrolling up
    else if (currentScrollY < lastScrollY) {
      setIsVisible(true);
    }
    // Hide when scrolling down (but only after scrolling past header)
    else if (currentScrollY > lastScrollY && currentScrollY > 100) {
      setIsVisible(false);
    }

    setLastScrollY(currentScrollY);
  };

  window.addEventListener('scroll', controlNavbar);
  return () => window.removeEventListener('scroll', controlNavbar);
}, [mounted, lastScrollY]);
```

Replace with:
```typescript
useEffect(() => {
  if (!mounted) return;

  const controlNavbar = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY < 100) {
      setIsVisible(true);
    } else if (currentScrollY < lastScrollYRef.current) {
      setIsVisible(true);
    } else if (currentScrollY > lastScrollYRef.current && currentScrollY > 100) {
      setIsVisible(false);
    }

    lastScrollYRef.current = currentScrollY;
  };

  window.addEventListener('scroll', controlNavbar, { passive: true });
  return () => window.removeEventListener('scroll', controlNavbar);
}, [mounted]);
```

Note the two changes: (1) `lastScrollY` → `lastScrollYRef.current`, (2) `{ passive: true }` added (tells browser the handler won't call `preventDefault()`, enabling scroll optimizations), (3) `lastScrollY` removed from dependency array.

**Step 3: Verify build**

```bash
npm run lint && npm run build
```

**Step 4: Commit**

```bash
git add components/shared/TopNavBarAutoHide.tsx
git commit -m "perf: fix TopNavBarAutoHide scroll listener to use ref instead of state"
```

---

## Task 4: Fix HumorousCounter Scroll Listener (Add passive flag)

**Problem:** The scroll listener in HumorousCounter fires `setIsVisible` on every pixel scroll without `passive: true`, preventing browser scroll optimizations.

**Files:**
- Modify: `components/interactive/HumorousCounter.tsx`

**Step 1: Add passive flag to scroll listener**

Find this line (line 110):
```typescript
window.addEventListener('scroll', handleScroll);
```

Replace with:
```typescript
window.addEventListener('scroll', handleScroll, { passive: true });
```

**Step 2: Verify build**

```bash
npm run lint && npm run build
```

**Step 3: Commit**

```bash
git add components/interactive/HumorousCounter.tsx
git commit -m "perf: add passive flag to HumorousCounter scroll listener"
```

---

## Task 5: Fix HumorousCounter RAF Restart on Measurement Change

**Problem:** The animation RAF loop at line 59 has `[startTime, currentMeasurement]` in its dependency array. When `currentMeasurement` rotates every 15 seconds, the entire RAF loop cancels and restarts — causing a visual stutter. `currentMeasurement` is only needed to calculate `fillPercentage` inside the loop.

**Fix:** Store `currentMeasurement` in a ref so the RAF effect can read the latest value without listing it as a dependency (and without restarting the loop).

**Files:**
- Modify: `components/interactive/HumorousCounter.tsx`

**Step 1: Add a ref for currentMeasurement**

After the existing `animationFrameRef` line (line 35):
```typescript
const animationFrameRef = useRef<number | undefined>(undefined);
```

Add:
```typescript
const currentMeasurementRef = useRef<Measurement | null>(null);
```

**Step 2: Keep the ref in sync with state**

After the rotation `useEffect` (after line 96), add a new effect to sync the ref:
```typescript
// Keep ref in sync so RAF loop can read current measurement without restart
useEffect(() => {
  currentMeasurementRef.current = currentMeasurement;
}, [currentMeasurement]);
```

**Step 3: Update the RAF effect to use the ref**

Find the RAF `useEffect` (lines 59–83):
```typescript
useEffect(() => {
  const updateCounter = () => {
    const elapsed = (Date.now() - startTime) / 1000;
    const bytes = Math.floor(elapsed * BYTES_PER_SECOND);
    setCurrentBytes(bytes);

    // Calculate fill percentage if we have a measurement
    if (currentMeasurement) {
      const riceVolumeM3 = bytes * RICE_GRAIN_VOLUME_M3;
      const ratio = riceVolumeM3 / currentMeasurement.volumeM3;
      const percentage = Math.min(Math.floor(ratio * 100), 100);
      setFillPercentage(percentage);
    }

    animationFrameRef.current = requestAnimationFrame(updateCounter);
  };

  updateCounter();

  return () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  };
}, [startTime, currentMeasurement]);
```

Replace with:
```typescript
useEffect(() => {
  const updateCounter = () => {
    const elapsed = (Date.now() - startTime) / 1000;
    const bytes = Math.floor(elapsed * BYTES_PER_SECOND);
    setCurrentBytes(bytes);

    // Use ref to avoid restarting RAF loop when measurement rotates
    const measurement = currentMeasurementRef.current;
    if (measurement) {
      const riceVolumeM3 = bytes * RICE_GRAIN_VOLUME_M3;
      const ratio = riceVolumeM3 / measurement.volumeM3;
      const percentage = Math.min(Math.floor(ratio * 100), 100);
      setFillPercentage(percentage);
    }

    animationFrameRef.current = requestAnimationFrame(updateCounter);
  };

  updateCounter();

  return () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  };
}, [startTime]); // currentMeasurement removed — read via ref instead
```

**Step 4: Verify build**

```bash
npm run lint && npm run build
```

**Step 5: Commit**

```bash
git add components/interactive/HumorousCounter.tsx
git commit -m "perf: fix HumorousCounter RAF loop restart on measurement rotation"
```

---

## Task 6: Fix selectMeasurement — Guard Clauses + Dedup

**Problem 1:** `selectMeasurement()` has no guard for an empty measurements array or all-zero weights. An empty array causes `return measurements.measurements[0]` to return `undefined`, crashing the component. All-zero weights causes infinite weighted selection.

**Problem 2:** `Math.random()` with no history tracking means the same measurement can appear twice in a row.

**Files:**
- Modify: `components/interactive/HumorousCounter.tsx`

**Step 1: Add a ref to track the last selected measurement id**

After the `currentMeasurementRef` ref added in Task 5, add:
```typescript
const lastMeasurementIdRef = useRef<string | null>(null);
```

**Step 2: Replace selectMeasurement with a guarded + dedup version**

Find the entire `selectMeasurement` function (lines 44–56):
```typescript
const selectMeasurement = (): Measurement => {
  const totalWeight = measurements.measurements.reduce((sum, m) => sum + m.weight, 0);
  let random = Math.random() * totalWeight;

  for (const measurement of measurements.measurements) {
    random -= measurement.weight;
    if (random <= 0) {
      return measurement as Measurement;
    }
  }

  return measurements.measurements[0] as Measurement;
};
```

Replace with:
```typescript
const selectMeasurement = (): Measurement | null => {
  const items = measurements.measurements;
  if (!items || items.length === 0) return null;

  const totalWeight = items.reduce((sum, m) => sum + m.weight, 0);
  if (totalWeight <= 0) return items[0] as Measurement;

  // Avoid repeating the last measurement (try up to 3 times)
  for (let attempt = 0; attempt < 3; attempt++) {
    let random = Math.random() * totalWeight;
    for (const measurement of items) {
      random -= measurement.weight;
      if (random <= 0) {
        if (measurement.id !== lastMeasurementIdRef.current || items.length === 1) {
          lastMeasurementIdRef.current = measurement.id;
          return measurement as Measurement;
        }
        break; // Same as last — retry
      }
    }
  }

  // Fallback: pick first item that isn't the last one shown
  const fallback = items.find((m) => m.id !== lastMeasurementIdRef.current);
  const selected = (fallback ?? items[0]) as Measurement;
  lastMeasurementIdRef.current = selected.id;
  return selected;
};
```

**Step 3: Update callers to handle null return**

Find the rotation effect (lines 86–96):
```typescript
useEffect(() => {
  setCurrentMeasurement(selectMeasurement());

  const interval = setInterval(() => {
    setCurrentMeasurement(selectMeasurement());
    setShowMath(false);
    setShowFormalMath(false);
  }, ROTATION_INTERVAL);

  return () => clearInterval(interval);
}, []);
```

Replace with:
```typescript
useEffect(() => {
  const initial = selectMeasurement();
  if (initial) setCurrentMeasurement(initial);

  const interval = setInterval(() => {
    const next = selectMeasurement();
    if (next) {
      setCurrentMeasurement(next);
      setShowMath(false);
      setShowFormalMath(false);
    }
  }, ROTATION_INTERVAL);

  return () => clearInterval(interval);
}, []); // eslint-disable-line react-hooks/exhaustive-deps
```

**Step 4: Verify build**

```bash
npm run lint && npm run build
```

**Step 5: Commit**

```bash
git add components/interactive/HumorousCounter.tsx
git commit -m "fix: add guard clauses and dedup to selectMeasurement in HumorousCounter"
```

---

## Task 7: Fix HumorousCounter Drag Listener Memory Leak

**Problem:** The drag `useEffect` (lines 137–173) adds `mousemove`, `mouseup`, `touchmove`, `touchend` to `document` when `isDragging === true`. If the component unmounts while `isDragging` is true (e.g., navigating away mid-drag), the cleanup function removes the listeners — but the cleanup references stale `handleMouseMove`/`handleEnd` closures created in that render, not the ones actually attached. This can leave orphaned listeners on `document`.

**Fix:** Track whether listeners are attached via a ref, and ensure cleanup always removes the correct function references.

**Files:**
- Modify: `components/interactive/HumorousCounter.tsx`

**Step 1: Replace the drag useEffect**

Find the entire drag `useEffect` (lines 137–173):
```typescript
useEffect(() => {
  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragOffset.x,
      y: e.clientY - dragOffset.y,
    });
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const touch = e.touches[0];
    setPosition({
      x: touch.clientX - dragOffset.x,
      y: touch.clientY - dragOffset.y,
    });
  };

  const handleEnd = () => {
    setIsDragging(false);
  };

  if (isDragging) {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleEnd);
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleEnd);
  }

  return () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleEnd);
    document.removeEventListener('touchmove', handleTouchMove);
    document.removeEventListener('touchend', handleEnd);
  };
}, [isDragging, dragOffset]);
```

Replace with:
```typescript
const dragOffsetRef = useRef(dragOffset);
useEffect(() => {
  dragOffsetRef.current = dragOffset;
}, [dragOffset]);

useEffect(() => {
  if (!isDragging) return;

  const handleMouseMove = (e: MouseEvent) => {
    setPosition({
      x: e.clientX - dragOffsetRef.current.x,
      y: e.clientY - dragOffsetRef.current.y,
    });
  };

  const handleTouchMove = (e: TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    setPosition({
      x: touch.clientX - dragOffsetRef.current.x,
      y: touch.clientY - dragOffsetRef.current.y,
    });
  };

  const handleEnd = () => {
    setIsDragging(false);
  };

  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseup', handleEnd);
  document.addEventListener('touchmove', handleTouchMove, { passive: false });
  document.addEventListener('touchend', handleEnd);

  return () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleEnd);
    document.removeEventListener('touchmove', handleTouchMove);
    document.removeEventListener('touchend', handleEnd);
  };
}, [isDragging]);
```

Note: `dragOffset` is now read via `dragOffsetRef.current` inside the handlers, so the effect only runs when `isDragging` changes. The listeners are always the ones actually attached, so cleanup is always correct.

**Step 2: Verify build**

```bash
npm run lint && npm run build
```

**Step 3: Commit**

```bash
git add components/interactive/HumorousCounter.tsx
git commit -m "fix: prevent drag event listener memory leak in HumorousCounter"
```

---

## Task 8: Fix Visual2 Canvas Performance (Hoist Gradient + Stable Particles)

**Two problems in `Visual2_CoffeeCupFill.tsx`:**

1. **Gradient created every frame** (line 85 inside `animate()`). Gradient objects should be created once in effect setup and reused.

2. **Entire effect (and thus RAF loop) restarts on every `fillProgress` change.** The effect dependency is `[fillProgress]`. Since `fillProgress` changes continuously during scroll, the RAF loop is constantly cancelled and restarted, regenerating particles on every change.

**Fix:** Restructure the effect to run once on mount (no dependency on `fillProgress`), read `fillProgress` via a ref inside the animation loop, and hoist the gradient.

**Files:**
- Modify: `components/visualizations/Visual2_CoffeeCupFill.tsx`

**Step 1: Add a ref for fillProgress**

After the existing refs (after line 17 `animationFrameRef`), add:
```typescript
const fillProgressRef = useRef(fillProgress);
```

**Step 2: Keep the ref in sync with the prop**

Replace the first `useEffect` (lines 20–22):
```typescript
useEffect(() => {
  setFillProgress(progress);
}, [progress]);
```

With:
```typescript
useEffect(() => {
  setFillProgress(progress);
  fillProgressRef.current = progress;
}, [progress]);
```

**Step 3: Restructure the canvas effect**

Replace the entire canvas `useEffect` (lines 30–128):
```typescript
useEffect(() => {
  const canvas = canvasRef.current;
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const width = canvas.width;
  const height = canvas.height;

  // Coffee cup dimensions (centered)
  const cupWidth = 180;
  const cupHeight = 220;
  const cupX = (width - cupWidth) / 2;
  const cupY = height - cupHeight - 60;

  // Pre-compute gradient once (not inside animation loop)
  const gradient = ctx.createLinearGradient(cupX, cupY, cupX, cupY + cupHeight);
  gradient.addColorStop(0, '#FFFFFF');
  gradient.addColorStop(1, '#F0F0F0');

  // Stable particle pool — positions updated each frame based on current fill
  const maxParticles = 200;
  const particles: { x: number; y: number; size: number; opacity: number }[] = [];
  for (let i = 0; i < maxParticles; i++) {
    particles.push({ x: 0, y: 0, size: 2 + Math.random() * 2, opacity: 0.6 + Math.random() * 0.4 });
  }

  const animate = () => {
    const currentFill = fillProgressRef.current;
    const particleCount = Math.floor(currentFill * maxParticles);

    ctx.clearRect(0, 0, width, height);

    // Draw cup body
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(cupX + 20, cupY);
    ctx.lineTo(cupX + cupWidth - 20, cupY);
    ctx.lineTo(cupX + cupWidth - 10, cupY + cupHeight);
    ctx.lineTo(cupX + 10, cupY + cupHeight);
    ctx.closePath();
    ctx.fillStyle = gradient; // reuse pre-computed gradient
    ctx.fill();
    ctx.strokeStyle = '#888888';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Cup handle
    ctx.beginPath();
    ctx.arc(cupX + cupWidth - 5, cupY + cupHeight / 2, 25, -Math.PI / 2, Math.PI / 2, false);
    ctx.strokeStyle = '#888888';
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.restore();

    // Update and draw only the active particles
    const fillHeight = currentFill * (cupHeight - 40);
    for (let i = 0; i < particleCount; i++) {
      // Assign stable positions using index-based determinism within fill zone
      particles[i].x = cupX + 20 + ((i * 73) % (cupWidth - 40));
      particles[i].y = cupY + cupHeight - 20 - ((i * 47) % Math.max(fillHeight, 1));

      ctx.beginPath();
      ctx.arc(particles[i].x, particles[i].y, particles[i].size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(245, 245, 220, ${particles[i].opacity})`;
      ctx.fill();
      ctx.strokeStyle = `rgba(220, 220, 200, ${particles[i].opacity * 0.5})`;
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }

    animationFrameRef.current = requestAnimationFrame(animate);
  };

  animate();

  return () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  };
}, []); // eslint-disable-line react-hooks/exhaustive-deps — reads fillProgress via ref
```

**Step 4: Verify the canvas still renders correctly at 0%, 50%, 100% fill**

Run dev server and scroll to the coffee cup section:
```bash
npm run dev
```
Open http://localhost:3000/immersive and scroll through the coffee cup visualization. Verify grains appear and fill smoothly.

**Step 5: Verify build**

```bash
npm run lint && npm run build
```

**Step 6: Commit**

```bash
git add components/visualizations/Visual2_CoffeeCupFill.tsx
git commit -m "perf: hoist canvas gradient and stabilize particle pool in Visual2_CoffeeCupFill"
```

---

## Task 9: Validate sourceUrl Before Rendering as href

**Problem:** `HumorousCounter.tsx` renders `currentMeasurement.sourceUrl` directly as an `href` anchor without validating it's a proper HTTPS URL. Malformed or non-HTTPS data in `measurements.json` could silently render as a `javascript:` or relative URL.

**Files:**
- Modify: `components/interactive/HumorousCounter.tsx`

**Step 1: Add a URL validation utility function**

Add this function before the component definition (after the constants, before `export default function HumorousCounter`):

```typescript
function isValidHttpsUrl(url: string | undefined): url is string {
  if (!url) return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'https:';
  } catch {
    return false;
  }
}
```

**Step 2: Replace both sourceUrl anchor tags with guarded versions**

Find the first anchor (lines 387–394 — inside conversational math section):
```typescript
{currentMeasurement.sourceUrl && (
  <a
    href={currentMeasurement.sourceUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="text-teal-600 hover:text-teal-700 underline text-xs"
  >
    Verify source ↗
  </a>
)}
```

Replace with:
```typescript
{isValidHttpsUrl(currentMeasurement.sourceUrl) && (
  <a
    href={currentMeasurement.sourceUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="text-teal-600 hover:text-teal-700 underline text-xs"
  >
    Verify source ↗
  </a>
)}
```

Find the second anchor (lines 492–501 — inside formal math modal):
```typescript
{currentMeasurement.sourceUrl && (
  <div>
    <a
      href={currentMeasurement.sourceUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="text-teal-600 hover:text-teal-700 underline"
    >
      Verify source documentation ↗
    </a>
  </div>
)}
```

Replace with:
```typescript
{isValidHttpsUrl(currentMeasurement.sourceUrl) && (
  <div>
    <a
      href={currentMeasurement.sourceUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="text-teal-600 hover:text-teal-700 underline"
    >
      Verify source documentation ↗
    </a>
  </div>
)}
```

**Step 3: Verify build**

```bash
npm run lint && npm run build
```

**Step 4: Commit**

```bash
git add components/interactive/HumorousCounter.tsx
git commit -m "security: validate sourceUrl is HTTPS before rendering as anchor href"
```

---

## Task 10: Deploy and Smoke Test

**Step 1: Push to main (triggers Vercel auto-deploy)**

```bash
git push origin main
```

**Step 2: Wait for Vercel deployment (~2 minutes)**

Check deployment status at Vercel dashboard or via:
```bash
# If Vercel CLI is installed:
vercel ls
```

**Step 3: Smoke test stories.llmachete.com**

Verify in browser:
- [ ] Landing page loads at `stories.llmachete.com`
- [ ] "Launch Immersive" and "Start Reading" buttons work
- [ ] HumorousCounter widget appears, counter increments, measurement rotates after ~15s
- [ ] Scrolling through immersive — coffee cup (Visual2) fills smoothly
- [ ] No console errors in browser DevTools
- [ ] TopNavBar hides on scroll down, reappears on scroll up
- [ ] "Show the math" expands, "Show formal calculation" modal opens and closes

**Step 4: Verify CSP in browser**

Open DevTools → Network tab → click any request → Response Headers. Confirm `Content-Security-Policy` header is present.

**Step 5: Check bundle size improvement**

Removing GSAP (~50KB) and intersection-observer (~5KB) should reduce the JS bundle. In Vercel deployment summary or locally:
```bash
npm run build
# Check the build output for JS chunk sizes
```

---

## Summary of Changes

| Task | File(s) | Type | Impact |
|------|---------|------|--------|
| 1 | package.json | Dependency removal | ~55KB bundle reduction |
| 2 | vercel.json (new) | Security | CSP + security headers |
| 3 | TopNavBarAutoHide.tsx | Perf | Eliminates scroll listener churn |
| 4 | HumorousCounter.tsx | Perf | Passive scroll listener |
| 5 | HumorousCounter.tsx | Perf | Eliminates RAF restart on rotation |
| 6 | HumorousCounter.tsx | Fix | No repeated measurements, null safety |
| 7 | HumorousCounter.tsx | Fix | Drag listener memory leak |
| 8 | Visual2_CoffeeCupFill.tsx | Perf | Stable RAF loop, hoisted gradient |
| 9 | HumorousCounter.tsx | Security | HTTPS URL validation |
| 10 | — | Deploy | Smoke test production |
