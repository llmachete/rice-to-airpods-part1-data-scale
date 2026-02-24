# Testing Patterns

**Analysis Date:** 2026-02-23

## Test Framework

**Runner:**
- Not detected - No test runner configured in this project
- `package.json` has no test scripts (`"test": ...` absent)
- No Jest, Vitest, or other test framework installed

**Assertion Library:**
- Not applicable - no test infrastructure present

**Run Commands:**
```bash
npm run lint              # Check ESLint compliance (only test-like command)
npm run build            # Verify build succeeds
npm run dev              # Local development
```

## Test File Organization

**Location:**
- No test files found in source directories (`app/`, `components/`, `data/`)
- Only dependency test files exist in `node_modules/` (Zod, TSConfig-paths test suites)
- Production code has zero test coverage

**Naming:**
- Not applicable - no project test files exist
- Convention if implemented: `*.test.tsx` or `*.spec.tsx` (industry standard)

**Structure:**
- Not established - no tests present

## Testing Strategy

**Current State:** This is a visual content/storytelling application prioritizing rendering and interactivity over logic validation. Testing is not part of the current development workflow.

**What Could Be Tested (If Framework Added):**
- Component rendering with various props
- Dynamic component loading and fallback UI
- State updates from scrolling interactions
- Utility calculations (data scale conversions, formatting)
- Accessibility attributes (aria-labels, progress bar values)
- Responsive behavior at different screen sizes

## Mocking

**Framework:** Not applicable - no tests present

**Patterns:**
- Not established

**What Would Need Mocking (If Tests Added):**
- Scrollama.js library (complex scroll event handling)
- Dynamic imports (use Jest/Vitest mocking)
- Browser APIs: `Date.now()`, `IntersectionObserver` if used
- Image loading from `next/image`

## Component Testing Approach (If Implemented)

Given the component-heavy nature of this codebase, recommended testing approach would be:

**Unit Tests (Hypothetical):**
```typescript
// Example: Testing ExpandableMath component props rendering
import { render, screen } from '@testing-library/react';
import ExpandableMath from '@/components/shared/ExpandableMath';

describe('ExpandableMath', () => {
  it('renders claim text from props', () => {
    render(
      <ExpandableMath
        claim="Test claim"
        conversationalMath={[{ label: 'Step 1', content: 'Calculation' }]}
        source="Test source"
        confidence="HIGH"
      />
    );
    expect(screen.getByText('Test claim')).toBeInTheDocument();
  });
});
```

**Integration Tests (Hypothetical):**
```typescript
// Testing scroll-driven component updates
describe('TopNavBar with ScrollySection', () => {
  it('updates current scale indicator on scroll progress', () => {
    // Mount component, simulate scrollProgress prop changes
    // Verify state updates and DOM reflects changes
  });
});
```

## Fixtures and Factories

**Test Data:**
- Not established - no test infrastructure

**Hypothetical Pattern (If Tests Added):**
```typescript
// fixtures/scrollData.ts
export const mockScrollProgress = {
  atTop: 0,
  atByte: 0.05,
  atKilobyte: 0.2,
  atGigabyte: 0.35,
  atZettabyte: 0.6,
  atAirPods: 0.85,
  atBottom: 1.0,
};

// fixtures/mathSections.ts
export const mockMathSection = {
  conversational: [
    { label: 'Step 1', content: '1 grain = 1 byte' },
    { label: 'Step 2', content: '1000 bytes = 1 kilobyte' },
  ],
  formal: [
    { label: 'Formula', content: 'bytes = grains * 8' },
  ],
};
```

## Coverage

**Requirements:** None enforced

**Observation:** Application is 100% untested. Coverage would be 0% if measured.

**Why No Tests:**
- Project is primarily visual/interactive content with minimal business logic
- Rendered via Next.js SSR with client-side interactivity
- Core functionality (scrollytelling) relies on Scrollama.js library (external dependency)
- Focus is on UX/UI rather than algorithmic correctness

## Test Types

**Unit Tests:**
- Not implemented
- Candidates: Utility functions, state update logic, data formatting
- Would use React Testing Library

**Integration Tests:**
- Not implemented
- Candidates: Scroll interactions with component state, dynamic component loading
- Would test component interaction chains

**E2E Tests:**
- Not implemented
- Tool if needed: Playwright, Cypress
- Could test: Full page scroll experience, navigation between pages, interactive elements

## Accessibility Testing

**Current Approach:** No automated testing, but components include accessibility attributes:

**Examples from codebase:**
- `TopNavBar.tsx` progress bar: `role="progressbar"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, `aria-label`
- Image alt text: `alt="LLMachete"` on all Image components
- Semantic HTML: `<nav>`, `<button>`, `<a>` elements

**If Formal Testing Added:**
- Use `@testing-library/jest-dom` for a11y matchers
- axe-core for automated accessibility scanning
- Manual keyboard navigation testing

## Build Verification

**Current QA Approach:**
- `npm run build`: Verifies Next.js build succeeds (TypeScript errors caught)
- `npm run lint`: ESLint v9 checks code quality
- Manual testing in `npm run dev`

## Type Safety as Quality Gate

**Current:** TypeScript strict mode (enabled in `tsconfig.json`) provides compile-time safety:
- All components have interface definitions
- Props are type-checked
- Union types prevent invalid state values
- No `any` types (except intentional Scrollama cast)

This partially replaces unit testing for logic errors.

## Hypothetical Testing Stack (If Implemented)

**Recommended:**
```json
{
  "devDependencies": {
    "@testing-library/react": "^14",
    "@testing-library/jest-dom": "^6",
    "@testing-library/user-event": "^14",
    "jest": "^29",
    "@types/jest": "^29",
    "jest-environment-jsdom": "^29",
    "vitest": "^1" (alternative to Jest)
  }
}
```

**Test Configuration (jest.config.js - hypothetical):**
```typescript
export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>'],
  testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1'
  },
  collectCoverageFrom: [
    'components/**/*.{ts,tsx}',
    'app/**/*.{ts,tsx}',
    '!**/*.d.ts'
  ]
};
```

**Run Commands (hypothetical):**
```bash
npm test                 # Run all tests
npm test -- --watch     # Watch mode
npm test -- --coverage  # With coverage report
```

## Testing Gaps

**Untested Areas:**
- Component rendering across all code files (`app/`, `components/`)
- Scroll event handling in ScrollySection wrapper
- Dynamic import loading and fallback display
- State calculations in RunningCounter and other interactive components
- Responsive behavior at breakpoints
- Animation/transition timing
- Data scale conversions and formatting

**Risk:** Visual regressions or interaction bugs could ship undetected. Scroll-triggered animations or state updates might break with future changes.

## Recommended Testing Strategy (Future)

**Phase 1: Critical Path**
- Add tests for interactive component state (RunningCounter, ExpandableMath)
- Test scroll event integration (TopNavBar state changes)
- Verify dynamic imports load correctly

**Phase 2: Component Coverage**
- Unit tests for all shared components in `components/shared/`
- Tests for visualization rendering
- Accessibility compliance checks

**Phase 3: Integration & E2E**
- Full page scroll scenarios with Playwright
- Navigation between pages (article, immersive)
- Lead capture form validation

---

*Testing analysis: 2026-02-23*

**Summary:** This codebase is currently untested. The project prioritizes visual storytelling and interactivity over logic-heavy code. Adding a test framework would increase development friction without significant ROI at current scale. Consider testing when introducing more complex state management or business logic operations.
