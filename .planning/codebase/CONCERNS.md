# Codebase Concerns

**Analysis Date:** 2026-02-23

## Tech Debt

**Complex Component State Management:**
- **Issue:** `HumorousCounter.tsx` manages 10+ state variables (bytes, measurements, visibility, drag position, math display states). Multiple interrelated setState calls make behavior fragile when states interact.
- **Files:** `components/interactive/HumorousCounter.tsx`
- **Impact:** Adding features or fixing drag/measurement rotation edge cases is high-risk. State initialization complexity increases likelihood of silent bugs.
- **Fix approach:** Extract state into a custom hook (e.g., `useDataCounter`) or use useReducer to centralize state transitions. Current useState pattern works but does not scale.

**requestAnimationFrame Loop Dependency Chain:**
- **Issue:** Line 83 in `HumorousCounter.tsx` has `useEffect` dependency on both `startTime` and `currentMeasurement`. When `currentMeasurement` changes, the animation frame loop restarts, potentially causing visual glitches.
- **Files:** `components/interactive/HumorousCounter.tsx` (line 83)
- **Impact:** Measurement rotation (every 15 seconds) causes animation frame handler to recreate. Users may see momentary stutters or counter resets during rotation.
- **Fix approach:** Separate concerns - move measurement rotation logic to independent effect, keep animation frame effect focused only on time-based updates. Use ref to track current measurement instead of dependency.

**Event Listener Accumulation Risk in Drag Handler:**
- **Issue:** Lines 137-173 in `HumorousCounter.tsx` conditionally attach/detach document-level event listeners based on `isDragging` state. If `isDragging` state becomes out of sync with actual event listener attachment (e.g., React component unmounts during drag), listeners persist on document.
- **Files:** `components/interactive/HumorousCounter.tsx` (line 160-172)
- **Impact:** Memory leak potential - uncleared event listeners accumulate on document if component unmounts mid-drag. In a single-page app with heavy navigation, this accumulates over sessions.
- **Fix approach:** Use ref-based flag to track whether listeners are attached. Ensure cleanup happens regardless of state transitions. Consider moving to useCallback with proper dependency array.

**Canvas Particle Regeneration Every Render:**
- **Issue:** `Visual2_CoffeeCupFill.tsx` regenerates all particles array in every animation frame (line 47-67). This creates garbage collection pressure on every frame in scroll-driven experiences.
- **Files:** `components/visualizations/Visual2_CoffeeCupFill.tsx` (lines 47-67)
- **Impact:** Performance degradation on lower-end devices. Particle animation may drop frames, breaking the "smooth 60fps" requirement stated in CONTEXT.md.
- **Fix approach:** Generate particles once on mount or when fill progress crosses threshold, then update positions/opacity by reference rather than recreating array. Use useMemo or move particle generation to useCallback.

**No Error Boundary for Data Import:**
- **Issue:** `HumorousCounter.tsx` directly imports `measurements.json` (line 4) without validation. If JSON is malformed or measurement objects lack required fields, component crashes silently.
- **Files:** `components/interactive/HumorousCounter.tsx` (line 4)
- **Impact:** If data file is corrupted or edited incorrectly, page fails to render with no user feedback about the cause.
- **Fix approach:** Add data validation on import. Validate each measurement has required fields (id, name, volumeM3, weight, unit). Provide fallback measurements if validation fails.

---

## Known Bugs

**Measurement Rotation Can Skip Measurement:**
- **Symptoms:** Clicking "Show the math" then waiting through rotation may cause measurement to repeat (appear twice in a row) or skip appeared measurement.
- **Files:** `components/interactive/HumorousCounter.tsx` (lines 86-96)
- **Trigger:** (1) Expand widget, (2) Click "Show the math" to expand math section, (3) Wait for 15-second rotation to fire, (4) Check if same measurement appears twice.
- **Root cause:** `selectMeasurement()` uses `Math.random()` with no tracking of recently selected measurements. Statistically, repeated selections are possible.
- **Workaround:** None - users see repeated measurements occasionally but it's not broken behavior, just statistically unlikely.

**Drag Position Lost on Component Re-render:**
- **Symptoms:** Dragging the widget, then scrolling (which can trigger re-renders), may snap widget back to default position.
- **Files:** `components/interactive/HumorousCounter.tsx` (lines 38-40, 245-247)
- **Trigger:** (1) Enable drag mode, (2) Drag widget to new position, (3) Scroll page or navigate, (4) Widget snaps back to top-right.
- **Root cause:** `position` state stored in component. Any parent re-render causes this component to unmount/remount, losing position.
- **Workaround:** Users must re-drag after scrolling. Disable drag mode to lock position.

**Fill Percentage Display Lag:**
- **Symptoms:** Fill percentage indicator lags behind actual counter by 1-2 frames on first load or measurement rotation.
- **Files:** `components/interactive/HumorousCounter.tsx` (lines 65-71)
- **Trigger:** New measurement selected → fillPercentage recalculates → visual bar updates on next frame.
- **Root cause:** `setFillPercentage` called in different effect than counter update. Racing updates.
- **Workaround:** None - visual only, no functional impact.

---

## Security Considerations

**Environment Variable Exposure:**
- **Risk:** `.env.local` contains `NEXT_PUBLIC_GA_MEASUREMENT_ID` (line 3 in `.env.local`). While this is intentionally public (GA requires it client-side), it can be used to identify the specific GA property and associate it with the project.
- **Files:** `.env.local`, `app/layout.tsx` (lines 26-42)
- **Current mitigation:** Field is correctly prefixed `NEXT_PUBLIC_` (Next.js convention for client-side vars). No secrets stored in file.
- **Recommendations:** (None required - configuration follows security best practices for GA integration.)

**External Link Validation Missing:**
- **Risk:** `HumorousCounter.tsx` renders external links to source URLs (lines 387-394, 494-501) without validation. Malformed measurement data could inject arbitrary URLs into DOM.
- **Files:** `components/interactive/HumorousCounter.tsx`, `components/shared/VerificationTable.tsx`
- **Current mitigation:** `rel="noopener noreferrer"` prevents window access - good defensive practice.
- **Recommendations:** Add validation in data import to ensure sourceUrl is valid HTTPS URL before rendering. Use URL constructor to validate.

**No Content Security Policy:**
- **Risk:** Inline Google Analytics script (app/layout.tsx, lines 33-40) executes arbitrary code if GA domain is compromised or man-in-the-middle attack occurs.
- **Files:** `app/layout.tsx` (lines 33-40)
- **Current mitigation:** Uses Google's CDN with HTTPS. Script is loaded after page load (strategy="afterInteractive").
- **Recommendations:** Add CSP header in next.config.ts to restrict script-src to specific domains. Add Subresource Integrity (SRI) hash to GA script tag.

---

## Performance Bottlenecks

**Multiple requestAnimationFrame Loops Running Simultaneously:**
- **Problem:** `HumorousCounter.tsx` (line 73) + `Visual2_CoffeeCupFill.tsx` (line 100+) + other visualizations may all run their own animation loops independently. If multiple visualizations are rendered on same page, 3+ RAF loops compete for frame budget.
- **Files:** `components/interactive/HumorousCounter.tsx`, `components/visualizations/Visual2_CoffeeCupFill.tsx`, `components/visualizations/Visual3_ContainerZoom.tsx`, `components/interactive/DataHourglass_2D.tsx`
- **Cause:** Component-level RAF loops are decoupled - no coordination. Each thinks it has full frame budget.
- **Improvement path:** Create shared animation loop manager (custom hook) that multiple components register updates with. Single RAF loop calls all registered update functions. Reduces from N loops to 1.

**Scroll Event Listener Without Throttle/Debounce:**
- **Problem:** `HumorousCounter.tsx` (line 110) and `TopNavBarAutoHide.tsx` attach scroll listeners that fire on every pixel scroll. In high-DPI displays or fast scrolling, hundreds of events/second fire, triggering setState on each.
- **Files:** `components/interactive/HumorousCounter.tsx` (line 110), `components/shared/TopNavBarAutoHide.tsx`
- **Cause:** Scroll event tied directly to setState without rate limiting.
- **Improvement path:** Throttle scroll events to ~16ms intervals (one frame). Use `useCallback` with ref-based debouncing, or integrate with Intersection Observer for visibility checking instead of scroll position tracking.

**Canvas Gradients Recreated Every Frame:**
- **Problem:** `Visual2_CoffeeCupFill.tsx` creates gradient objects (line 85) inside animation loop, every frame. Gradients are garbage-collected and recreated on next frame.
- **Files:** `components/visualizations/Visual2_CoffeeCupFill.tsx` (line 85)
- **Cause:** Gradient creation inside animate() function instead of setup phase.
- **Improvement path:** Pre-compute gradient objects once and reuse. Move gradient creation outside animation loop to useEffect cleanup/setup phase.

**No Lazy Loading for Data Files:**
- **Problem:** `measurements.json` loaded synchronously on component mount (line 4 in HumorousCounter.tsx). If file is large or network slow, blocks component render.
- **Files:** `data/measurements.json`, `components/interactive/HumorousCounter.tsx`
- **Cause:** Direct ES6 import without dynamic import() or lazy loading.
- **Improvement path:** Use dynamic import in useEffect. Show loading state while measurements load. Current setup works (small file) but does not scale.

---

## Fragile Areas

**Weighted Random Selection Function:**
- **Files:** `components/interactive/HumorousCounter.tsx` (lines 44-56)
- **Why fragile:** Function assumes measurements array has elements and weights sum to non-zero. If data file is corrupted (empty array, all weights = 0), infinite loop occurs or returns undefined.
- **Safe modification:** Add guard clauses - check array length > 0, check totalWeight > 0 before random selection. Return null if invalid state.
- **Test coverage:** No test file found for this component. Gaps: (1) Empty measurements array, (2) Weight distribution correctness, (3) Repeated calls don't repeat measurement.
- **Risk:** Medium - user would see blank widget or infinite loading state.

**Measurement Rotation with Active Math Display:**
- **Files:** `components/interactive/HumorousCounter.tsx` (lines 86-96)
- **Why fragile:** When measurement rotates, component sets `showMath` and `showFormalMath` to false (lines 91-92). If user is mid-interaction (scrolling formal math modal), this forces modal close.
- **Safe modification:** Before closing modals on rotation, check if user is actively reading formal math. Defer rotation if `showFormalMath` is true.
- **Test coverage:** No test. Gap: Rotation + math display interaction not covered.
- **Risk:** Low - annoying UX, not broken, but users lose context.

**Canvas Fill Calculation Precision:**
- **Files:** `components/visualizations/Visual2_CoffeeCupFill.tsx` (lines 57-59)
- **Why fragile:** Fill height calculation relies on exact pixel math. Fractional fills (e.g., progress = 0.5001) may produce float rounding artifacts causing visual discontinuities between frames.
- **Safe modification:** Use integer math or Math.round() on intermediate calculations. Add epsilon comparison for fill boundaries.
- **Test coverage:** No test. Gap: Boundary conditions (progress = 0, 0.5, 0.9999, 1.0) not explicitly tested.
- **Risk:** Low - visual artifacts only, not functional.

**TopNavBar Auto-Hide Logic:**
- **Files:** `components/shared/TopNavBarAutoHide.tsx` (line 209)
- **Why fragile:** Auto-hide tied to scroll position. Rapid scroll direction changes may cause nav bar to flicker in/out. Logic not idempotent - state changes can race.
- **Safe modification:** Add debounce to hide logic. Track scroll velocity to distinguish intentional scrolls from jitter. Add visual transition to prevent flicker.
- **Test coverage:** No test. Gap: Rapid scroll, edge scrolling, mobile scroll-bounce scenarios.
- **Risk:** Medium - poor UX on touch devices with scroll bounce.

---

## Scaling Limits

**Measurements Array Growth:**
- **Current capacity:** `measurements.json` likely contains <100 measurements (reasonable for initial data file). Weighted random selection is O(n).
- **Limit:** If measurements grow to 10,000+, weighted selection becomes noticeably slow (~1ms per selection).
- **Scaling path:** Replace linear scan with cumulative weight array + binary search. O(n) setup → O(log n) per selection.

**Canvas Resolution:**
- **Current capacity:** Canvas dimensions auto-scale to container. Visual2_CoffeeCupFill renders 200 particles max (line 48). Smooth on modern devices.
- **Limit:** If particle count increases to 1000+, canvas animation drops frames on lower-end devices (iPad gen 6, older Android).
- **Scaling path:** Implement particle level-of-detail (LOD) - render fewer particles on lower-end devices. Use requestIdleCallback to defer particle updates.

**Multiple Page Routes:**
- **Current capacity:** 3 routes (landing, immersive, article). CONTEXT.md identifies Part 2 as next content.
- **Limit:** As Part 2-5 are added, each with similar visualizations, bundle size grows. Each visualization component (Visual1-7) adds 180-614 lines.
- **Scaling path:** Implement code splitting at route level. Extract shared visualization utilities into reusable library.

---

## Dependencies at Risk

**D3.js Unused?**
- **Risk:** `package.json` includes `"d3": "^7.9.0"` and `"@types/d3": "^7.4.3"` but no grep search found D3 imports in source. Likely dead dependency.
- **Impact:** Adds ~170KB to bundle (D3 is large). If not used, pure waste.
- **Migration plan:** Remove if not used. If D3 is planned for Part 2, verify it's actually needed (likely can achieve same visualizations with Canvas/SVG + CSS).

**GSAP Included but May Be Unused:**
- **Risk:** `package.json` includes `"gsap": "^3.14.2"` but project uses CSS transitions + custom RAF animations instead. GSAP is a professional animation library that may be overkill for this use case.
- **Impact:** Adds ~50KB to bundle. If CSS transitions suffice, unnecessary.
- **Recommendation:** Audit actual usage. If GSAP not used, remove and rely on CSS Transitions + custom RAF for animations.

**Next.js Version Pinned to 16.1.1:**
- **Risk:** `package.json` pins `"next": "16.1.1"`. No tests found. Upgrading Next.js without test coverage is risky.
- **Impact:** Potential incompatibilities with future dependencies. Security fixes in Next.js require manual updates.
- **Recommendation:** Add test coverage before upgrading. Keep Next.js within minor version (16.x) for stability.

**intersection-observer Polyfill:**
- **Risk:** `package.json` includes `"intersection-observer": "^0.12.2"` as polyfill for older browsers. Modern browsers (Chrome 51+, FF 55+) have native support.
- **Impact:** Adds ~5KB. Not critical, but consider dropping if targeting modern browsers only.
- **Recommendation:** Review browser support target. If targeting modern browsers only, can remove.

---

## Missing Critical Features

**No Analytics for User Engagement:**
- **Problem:** GA4 tracking added (CONTEXT.md confirms), but no event tracking for specific user interactions (e.g., "user expanded formal math", "user dragged counter", "user switched between immersive/article mode").
- **Blocks:** Cannot measure which visualizations are engaging. Cannot optimize content based on user behavior.
- **Priority:** High - Business needs engagement data to justify continuation of Part 2-5.
- **Implementation:** Add gtag() events for key interactions (e.g., ga_event('visualization', 'action:expand_math', {...details})).

**No Accessibility Testing:**
- **Problem:** CONTEXT.md states "Accessible with proper contrast ratios" as validation criteria but no ARIA labels found in components. No screen reader testing documented.
- **Blocks:** Cannot verify compliance with WCAG 2.1 AA standard. Users with visual impairments may not access content.
- **Priority:** High - Legal requirement for public-facing educational content.
- **Implementation:** Add ARIA labels to all interactive elements. Test with screen reader (NVDA/JAWS). Add skip navigation link.

**No Performance Budget:**
- **Problem:** No lighthouse budget or performance monitoring. Bundle size can grow without notice.
- **Blocks:** Cannot catch performance regressions early.
- **Priority:** Medium - Important for user experience on mobile/slow networks.
- **Implementation:** Add Vercel Speed Insights (already enabled per CONTEXT.md). Set budget: <100KB main bundle, <3s FCP on 4G.

**No Offline Support:**
- **Problem:** No service worker or offline fallback. Page requires internet to load GA scripts. If CDN is down, users see blank page.
- **Blocks:** Resilience against network failures.
- **Priority:** Low - Not critical for this use case, but could improve UX.
- **Implementation:** Add service worker for asset caching. Graceful degradation if GA fails to load.

---

## Test Coverage Gaps

**No Unit Tests for Components:**
- **Untested area:** All interactive components (HumorousCounter, RunningCounter, etc.) lack unit tests.
- **Files:** `components/interactive/*.tsx`, `components/visualizations/*.tsx`
- **What's not tested:**
  - Weighted random selection correctness
  - Animation frame loop cleanup
  - Event listener attachment/detachment
  - State transitions (minimize/maximize, drag mode toggle)
  - Math calculations (rice volume ratio)
  - Fill percentage boundary conditions (0%, 50%, 100%)
- **Risk:** High - Complex state logic can fail silently.
- **Recommendation:** Add Jest + React Testing Library tests for at least HumorousCounter and Visual2_CoffeeCupFill. Target 70%+ coverage.

**No Integration Tests for Page Flows:**
- **Untested area:** Multi-page flows (landing → immersive vs article choice).
- **Files:** `app/page.tsx`, `app/immersive/page.tsx`, `app/article/page.tsx`
- **What's not tested:** Navigation between routes, state persistence, GA events firing correctly.
- **Risk:** Medium - Users may encounter broken flows unnoticed.
- **Recommendation:** Add E2E tests with Playwright or Cypress covering landing page flow.

**No Performance Regression Tests:**
- **Untested area:** Frame rate, animation smoothness, bundle size.
- **Files:** All animation-heavy components.
- **What's not tested:** Animation frame drops, memory leaks, garbage collection pauses.
- **Risk:** Medium - Performance degradation can accumulate imperceptibly.
- **Recommendation:** Add Lighthouse CI to verify performance budget. Set threshold: LH Performance > 90.

**No Visual Regression Tests:**
- **Untested area:** Visual accuracy of SVG/Canvas visualizations.
- **Files:** `components/visualizations/*.tsx`, `components/shared/BrandTable.tsx`
- **What's not tested:** Color accuracy, layout shifts, responsive design at different viewport sizes.
- **Risk:** Low - Visual issues are caught manually, but can cause brand inconsistency.
- **Recommendation:** Add Percy or Chromatic for visual regression testing.

---

*Concerns audit: 2026-02-23*
