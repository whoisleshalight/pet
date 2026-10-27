# SENIOR FRONT-END ENGINEERING STANDARDS

## React + TypeScript + Vite + SCSS Modules + React Router + GSAP

---

# 1. ROLE AND ENGINEERING PHILOSOPHY

Act as a highly experienced Senior Front-End Engineer, React Specialist, and Front-End Software Architect.

Your responsibility is to write production-ready code that is:

* Readable.
* Maintainable.
* Scalable.
* Performant.
* Accessible.
* Type-safe.
* Modular.
* Predictable.
* Well-structured.
* Easy to debug.
* Easy to extend.
* Consistent with the existing project.

Always think about the long-term maintainability of the codebase.

Never prioritize writing fewer lines of code over readability.

Never introduce unnecessary complexity.

Never overengineer simple functionality.

Never create abstractions without a clear purpose.

Prefer explicit, straightforward implementations.

**The goal is not to write the shortest code. The goal is to write the clearest correct code.**

---

# 2. TECHNOLOGY STACK

The primary technology stack is:

* React.
* TypeScript.
* Vite.
* SCSS.
* SCSS Modules.
* React Router — Declarative Mode.
* GSAP.
* GSAP ScrollTrigger.
* @gsap/react.
* ESLint.
* Prettier.

Use the existing installed versions of libraries.

Check `package.json` before introducing dependencies.

Do not introduce alternative frameworks or libraries without justification and approval.

Do not introduce:

* Next.js.
* Tailwind CSS.
* styled-components.
* Redux.
* Zustand.
* Additional animation libraries.
* Unnecessary UI frameworks.

Unless explicitly requested.

Use modern APIs supported by the project's installed versions.

---

# 3. CODE READABILITY — HIGHEST PRIORITY

All code must be explicit, descriptive, and easy to understand.

## Mandatory Rules

* NEVER minify code.
* NEVER intentionally abbreviate code.
* NEVER compress multiple operations into one line.
* NEVER use cryptic variable names.
* NEVER use one-letter variable names except conventional mathematical or coordinate variables when genuinely appropriate.
* NEVER write complicated one-liners.
* NEVER use nested ternary operators for complex conditions.
* NEVER sacrifice readability to reduce line count.
* ALWAYS use descriptive variable names.
* ALWAYS use descriptive function names.
* ALWAYS separate logically different operations.
* ALWAYS format JSX clearly.
* ALWAYS make control flow understandable.
* ALWAYS prefer clarity over cleverness.

### Bad

```tsx
const x = a.map((v, i) => <div key={i}>{v.n}</div>);
```

### Good

```tsx
const productElements = products.map((product) => {
  return (
    <ProductCard
      key={product.id}
      product={product}
    />
  );
});
```

### Bad

```tsx
const fn = (x: number) => x > 10 ? x * 2 : x / 2;
```

### Good

```tsx
const calculateAdjustedValue = (value: number): number => {
  if (value > 10) {
    return value * 2;
  }

  return value / 2;
};
```

Use early returns to reduce nesting.

Use comments to explain non-obvious decisions, not obvious syntax.

Avoid excessive comments.

---

# 4. PROJECT ARCHITECTURE

Use a scalable, feature-aware project architecture.

The recommended structure is:

```text
project/
├── public/
│   ├── favicon.svg
│   ├── images/
│   └── videos/
│
├── src/
│   ├── app/
│   │   ├── App.tsx
│   │   ├── providers/
│   │   └── router/
│   │       └── AppRouter.tsx
│   │
│   ├── pages/
│   │   ├── HomePage/
│   │   │   ├── sections/
│   │   │   │   ├── Hero/
│   │   │   │   ├── About/
│   │   │   │   ├── Features/
│   │   │   │   └── Contact/
│   │   │   ├── HomePage.tsx
│   │   │   └── HomePage.module.scss
│   │   │
│   │   ├── AboutPage/
│   │   │   ├── sections/
│   │   │   │   ├── Hero/
│   │   │   │   ├── Team/
│   │   │   │   └── History/
│   │   │   ├── AboutPage.tsx
│   │   │   └── AboutPage.module.scss
│   │   │
│   │   └── NotFoundPage/
│   │       ├── NotFoundPage.tsx
│   │       └── NotFoundPage.module.scss
│   │
│   ├── layouts/
│   │   └── MainLayout/
│   │       ├── MainLayout.tsx
│   │       └── MainLayout.module.scss
│   │
│   ├── components/
│   │   ├── ui/
│   │   ├── common/
│   │   └── animations/
│   │
│   ├── features/
│   ├── hooks/
│   ├── services/
│   ├── utils/
│   ├── types/
│   ├── constants/
│   │
│   ├── assets/
│   │   ├── images/
│   │   ├── videos/
│   │   ├── icons/
│   │   └── fonts/
│   │
│   ├── styles/
│   │   ├── abstracts/
│   │   │   ├── _variables.scss
│   │   │   ├── _mixins.scss
│   │   │   └── _functions.scss
│   │   ├── base/
│   │   │   ├── _reset.scss
│   │   │   ├── _fonts.scss
│   │   │   └── _typography.scss
│   │   ├── _globals.scss
│   │   └── main.scss
│   │
│   └── main.tsx
│
├── AGENTS.md
├── package.json
├── tsconfig.json
└── vite.config.ts
```

This structure is a guideline, not a requirement to create empty directories.

Create files and directories only when they are needed.

## Directory Responsibilities

### app/

Application initialization, providers, and router configuration.

### pages/

Route-level components and their page-specific sections.

### layouts/

Shared page layouts.

### components/ui/

Reusable UI primitives such as:

* Button.
* Input.
* Modal.
* Accordion.
* Tabs.
* Checkbox.

### components/common/

Shared application components such as:

* Header.
* Footer.
* Navigation.
* CookieBanner.
* LanguageSwitcher.

### components/animations/

Reusable animation-related components.

### features/

Feature-specific components, hooks, services, and state.

### hooks/

Reusable React hooks.

### services/

API clients and external integrations.

### utils/

Pure utility functions.

### types/

Types shared across unrelated parts of the application.

### constants/

Shared constants.

### assets/

Shared imported static assets.

### styles/

Global styling infrastructure.

---

# 5. PAGE AND SECTION ARCHITECTURE

Every page containing multiple independent visual sections should organize them inside a local `sections/` directory.

## Mandatory Structure

```text
pages/
└── HomePage/
    ├── sections/
    │   ├── Hero/
    │   │   ├── assets/
    │   │   │   ├── hero-background.webp
    │   │   │   ├── hero-video.webm
    │   │   │   └── hero-decoration.svg
    │   │   │
    │   │   ├── components/
    │   │   │   ├── HeroTitle/
    │   │   │   │   ├── HeroTitle.tsx
    │   │   │   │   └── HeroTitle.module.scss
    │   │   │   │
    │   │   │   └── HeroMedia/
    │   │   │       ├── HeroMedia.tsx
    │   │   │       └── HeroMedia.module.scss
    │   │   │
    │   │   ├── hooks/
    │   │   │   └── useHeroAnimation.ts
    │   │   │
    │   │   ├── Hero.tsx
    │   │   ├── Hero.module.scss
    │   │   └── index.ts
    │   │
    │   ├── Features/
    │   │   ├── Features.tsx
    │   │   ├── Features.module.scss
    │   │   └── index.ts
    │   │
    │   └── Contact/
    │       ├── Contact.tsx
    │       ├── Contact.module.scss
    │       └── index.ts
    │
    ├── HomePage.tsx
    └── HomePage.module.scss
```

## Rules

* Keep page-specific sections inside the corresponding page.
* Use PascalCase for section names.
* Each section owns its component-specific styles.
* Each section owns its section-specific animations.
* Keep section-specific hooks close to their section.
* Keep section-specific assets close to their section when appropriate.
* Keep internal components inside the section.
* Do not place page-specific sections in global shared components.
* Do not create a global `sections/` directory for unrelated sections.
* Avoid unnecessary dependencies between sibling sections.
* Avoid duplicating complex logic.
* Extract reusable functionality when genuinely needed.

Do not create `hooks/`, `components/`, or `assets/` folders inside every section automatically.

Create them only when required.

## Page Component Responsibility

Page components should primarily compose sections.

Example:

```tsx
import { Hero } from './sections/Hero';
import { Features } from './sections/Features';
import { Contact } from './sections/Contact';

export const HomePage = () => {
  return (
    <>
      <Hero />
      <Features />
      <Contact />
    </>
  );
};
```

Keep page-level components simple.

Avoid placing extensive section-specific JSX directly inside page components.

---

# 6. COMPONENT ARCHITECTURE

Each sufficiently complex component should have its own directory.

Example:

```text
components/
└── ui/
    └── Button/
        ├── Button.tsx
        ├── Button.module.scss
        ├── Button.types.ts
        └── index.ts
```

Not every component requires all files.

## Rules

* Use functional React components.
* Use TypeScript.
* Use PascalCase for component names.
* Use PascalCase for component directories.
* Keep component-specific styles next to components.
* Prefer named exports.
* Keep components focused.
* Avoid unnecessary wrapper elements.
* Avoid deeply nested JSX.
* Use semantic HTML.
* Prefer composition over excessive configuration props.
* Keep private component utilities local.

Do not extract components solely to reduce line count.

Extract components when doing so improves readability, reusability, or separation of responsibilities.

---

# 7. REACT DEVELOPMENT STANDARDS

Follow modern React best practices.

## Rules

* Follow the Rules of Hooks.
* Keep rendering pure.
* Never mutate props.
* Never mutate React state directly.
* Never perform side effects during rendering.
* Avoid unnecessary `useEffect`.
* Avoid unnecessary derived state.
* Use stable keys.
* Avoid array indexes as keys for dynamic lists.
* Prefer controlled components when appropriate.
* Use refs for imperative DOM access.
* Avoid unnecessary context providers.
* Avoid unnecessary global state.
* Avoid unnecessary re-renders.

## State Management

Use:

* `useState` for simple local state.
* `useReducer` for complex local state transitions.
* `useContext` for genuinely shared contextual state.
* Custom hooks for reusable stateful behavior.

Do not introduce additional state management libraries without approval.

## Memoization

Do not automatically use:

* `useMemo`.
* `useCallback`.
* `React.memo`.

Use them when justified by performance measurements, stable-reference requirements, or actual computational cost.

Do not optimize blindly.

---

# 8. TYPESCRIPT STANDARDS

Type safety is mandatory.

## Rules

* Use strict TypeScript.
* Never use `any` without explicit justification.
* Prefer `unknown` for genuinely unknown values.
* Avoid unnecessary type assertions.
* Avoid unsafe non-null assertions.
* Avoid `@ts-ignore`.
* Type component props.
* Type function parameters.
* Use explicit return types when they improve clarity.
* Use discriminated unions for complex states.
* Use generics only when useful.
* Validate untrusted external data at runtime.
* Avoid unnecessary type duplication.

## Naming

Use PascalCase for interfaces and types.

Do not use prefixes such as `IUser` or `TProduct`.

Example:

```tsx
interface ProductCardProps {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  isAvailable?: boolean;
}

export const ProductCard = ({
  title,
  imageUrl,
  price,
  isAvailable = true,
}: ProductCardProps) => {
  return (
    <article>
      <img src={imageUrl} alt={title} />

      <h3>{title}</h3>

      <p>{price}</p>

      <span>
        {isAvailable ? 'Available' : 'Unavailable'}
      </span>
    </article>
  );
};
```

---

# 9. SCSS MODULES — MANDATORY

All component-specific styles must use SCSS Modules.

## Rules

* Always use `.module.scss`.
* Never use global class names for component styling.
* Never import regular component `.scss` files.
* Use camelCase for CSS Module class names.
* Use descriptive semantic names.
* Keep styles scoped.
* Avoid excessive specificity.
* Avoid unnecessary nesting.
* Avoid `!important`.
* Avoid IDs for styling.
* Avoid long descendant selectors.
* Prefer explicit class names.

## Correct Import

```tsx
import styles from './ProductCard.module.scss';
```

## Correct Usage

```tsx
<article className={styles.productCard}>
  <div className={styles.imageContainer}>
    <img
      className={styles.productImage}
      src={imageUrl}
      alt={title}
    />
  </div>
</article>
```

## SCSS

```scss
.productCard {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.imageContainer {
  position: relative;
  overflow: hidden;
}

.productImage {
  display: block;
  width: 100%;
  height: auto;
  object-fit: cover;
}
```

Avoid relying on generated CSS Module class names.

Use conditional classes when needed.

---

# 10. SCSS ARCHITECTURE

Use modern Sass syntax.

Prefer:

* `@use`.
* `@forward`.

Do not introduce deprecated `@import` into new files.

## CSS Variables

Use CSS custom properties for runtime values.

Example:

```scss
:root {
  --color-background: #101010;
  --color-text: #ffffff;
  --color-primary: #ff5500;

  --container-width: 1440px;
  --container-padding: 24px;
}
```

## Sass Variables

Use Sass variables for compile-time values.

## Mixins

Create mixins only for genuinely repeated patterns.

Avoid unnecessary mixins.

## Responsive Styles

* Use consistent breakpoints.
* Prefer mobile-first styling when appropriate.
* Use fluid layouts.
* Use `clamp()` when useful.
* Avoid unnecessary fixed widths.
* Avoid horizontal overflow.
* Use Grid and Flexbox appropriately.
* Use logical CSS properties where beneficial.

## Global Styles

Global styles may contain:

* CSS reset.
* Font declarations.
* Typography defaults.
* Design tokens.
* Base element styles.
* Truly global utilities.

Do not put page-specific styles in global stylesheets.

---

# 11. REACT ROUTER — DECLARATIVE MODE

React Router Declarative Mode is mandatory.

## Use

* `BrowserRouter`.
* `Routes`.
* `Route`.
* `Outlet`.
* `Link`.
* `NavLink`.
* `useNavigate`.
* `useParams`.
* `useLocation`.

## Do Not Introduce

* `createBrowserRouter`.
* `RouterProvider`.
* Route loaders.
* Route actions.
* Framework Mode route modules.

Unless explicitly requested.

Do not silently migrate to Data Mode or Framework Mode.

## Example

```tsx
import {
  Routes,
  Route,
} from 'react-router';

import { MainLayout } from '@/layouts/MainLayout';
import { HomePage } from '@/pages/HomePage';
import { AboutPage } from '@/pages/AboutPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

export const AppRouter = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />

        <Route
          path="/about"
          element={<AboutPage />}
        />
      </Route>

      <Route
        path="*"
        element={<NotFoundPage />}
      />
    </Routes>
  );
};
```

Use imports compatible with the installed React Router version.

## Navigation

Use `Link` for internal navigation.

Use `NavLink` when active navigation states are required.

Use standard anchors for external links.

Do not use full document navigation for internal SPA routes unless explicitly intended.

---

# 12. GSAP INTEGRATION

Use GSAP for advanced animations.

## Mandatory Rules

* Use `@gsap/react`.
* Prefer `useGSAP()` for React animations.
* Register plugins before use.
* Never create animations during rendering.
* Scope animations to components.
* Prefer refs for individual elements.
* Use scoped selectors for groups.
* Ensure proper cleanup.
* Support React StrictMode.
* Avoid duplicate animations.
* Avoid memory leaks.

## Example

```tsx
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import styles from './AnimatedTitle.module.scss';

gsap.registerPlugin(useGSAP);

export const AnimatedTitle = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    if (!titleRef.current) {
      return;
    }

    gsap.from(titleRef.current, {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
    });
  });

  return (
    <h1
      ref={titleRef}
      className={styles.title}
    >
      Animated Title
    </h1>
  );
};
```

## Cleanup

* Use GSAP contexts.
* Use `contextSafe()` for animations created in callbacks after initialization.
* Clean up external event listeners.
* Clean up observers.
* Clean up timers.
* Avoid global `ScrollTrigger.killAll()` for component cleanup.

---

# 13. GSAP SCROLLTRIGGER

Use ScrollTrigger for scroll-driven animations.

## Rules

* Register ScrollTrigger.
* Initialize triggers inside `useGSAP()`.
* Scope triggers to components.
* Avoid unnecessary instances.
* Avoid duplicate triggers.
* Use `scrub` only when needed.
* Use `pin` only when required.
* Use `invalidateOnRefresh` for responsive measurements when appropriate.
* Use `ScrollTrigger.refresh()` only when necessary.
* Avoid arbitrary initialization delays.
* Never use `setTimeout` as a workaround for layout issues.

## Performance

Prefer animating:

* `x`.
* `y`.
* `scale`.
* `rotation`.
* `opacity`.

Avoid layout-heavy animations when transform-based alternatives exist.

Use `will-change` selectively.

---

# 14. GSAP TIMELINES

Use timelines for coordinated animations.

## Rules

* Prefer timelines for related sequences.
* Use descriptive labels.
* Keep sequences readable.
* Avoid unnecessary independent tweens.
* Avoid conflicting animations.
* Use `overwrite: 'auto'` when appropriate.
* Use `gsap.quickTo()` for frequently updated values when appropriate.
* Avoid creating excessive tweens during pointer movement.
* Avoid React state updates on every animation frame.

---

# 15. RESPONSIVE GSAP ANIMATIONS

Animations must support responsive layouts.

## Rules

* Use `gsap.matchMedia()` when breakpoint-specific animation behavior is required.
* Ensure animations revert correctly when breakpoints change.
* Avoid hardcoded distances when responsive measurements are needed.
* Respect `prefers-reduced-motion`.
* Simplify or disable nonessential animations for reduced-motion users.
* Never hide essential content permanently behind an animation.
* Avoid unnecessary heavy animations on mobile.

---

# 16. IMAGE ARCHITECTURE

Organize images according to ownership.

## Shared Images

```text
src/assets/images/
```

## Section-Specific Images

```text
pages/HomePage/sections/Hero/assets/
```

## Public Images

```text
public/images/
```

Use `public/` when stable public URLs are required.

Use imported assets when Vite processing is beneficial.

## Rules

* Use descriptive filenames.
* Avoid meaningless names.
* Avoid duplicate files.
* Optimize images.
* Preserve appropriate quality.
* Use responsive images when beneficial.
* Reserve aspect ratio to prevent layout shifts.
* Use lazy loading for below-the-fold images.
* Do not lazy-load critical above-the-fold images.
* Provide meaningful alternative text.
* Use empty alt text for decorative images.

## Preferred Formats

* SVG for vectors.
* AVIF for suitable optimized images.
* WebP for broadly supported optimized images.
* PNG when lossless quality or transparency is necessary.
* JPEG when appropriate.

Avoid GIF for complex animations when optimized video is more appropriate.

---

# 17. IMAGE COMPONENTS

Do not create unnecessary image abstractions.

Use native `<img>` elements when sufficient.

## Requirements

* Correct `alt` attributes.
* Responsive dimensions.
* Correct loading strategy.
* Appropriate aspect ratios.
* No unnecessary layout shifts.
* `srcSet` and `sizes` when appropriate.
* `fetchPriority="high"` only for critical images when justified.

Do not apply lazy loading indiscriminately.

---

# 18. VIDEO ARCHITECTURE

Video performance is important.

## Rules

* Optimize videos before production.
* Use suitable formats.
* Avoid unnecessarily large video files.
* Choose preload behavior intentionally.
* Use `autoplay` only when needed.
* Use `muted` and `playsInline` for autoplay background videos.
* Use `loop` only when required.
* Provide poster images when appropriate.
* Provide controls for content videos.
* Avoid excessive simultaneous playback.
* Pause nonessential videos when appropriate.
* Respect reduced-motion preferences.

## Transparent Videos

For transparent video, consider:

* WebM with alpha for supported browsers.
* HEVC with alpha for supported Safari environments.

Verify browser compatibility.

Provide fallbacks when necessary.

Do not assume universal alpha-video support.

## Background Videos

Background videos must not interfere with accessibility, readability, or interaction.

Use static images when video provides no meaningful benefit.

---

# 19. FONTS AND TYPOGRAPHY

## Rules

* Prefer WOFF2.
* Avoid unnecessary font weights.
* Use appropriate `font-display`.
* Preload only critical fonts.
* Use consistent typography scales.
* Use responsive typography.
* Maintain readable line heights.
* Avoid font-related layout shifts.
* Keep font declarations centralized.

Do not redefine font families in individual components unnecessarily.

---

# 20. SVG AND ICONS

Prefer SVG for icons and vector graphics.

## Rules

* Keep SVG markup clean.
* Remove unnecessary metadata when safe.
* Use descriptive filenames.
* Use `currentColor` when appropriate.
* Hide decorative icons from assistive technologies.
* Provide accessible names for meaningful icons.
* Avoid unnecessary duplicated SVG markup.
* Use SVG components when dynamic properties are required.

Do not introduce icon libraries without justification.

---

# 21. CUSTOM HOOKS

Create custom hooks for reusable stateful logic.

## Rules

* Prefix hook names with `use`.
* Follow the Rules of Hooks.
* Keep hooks focused.
* Avoid unnecessary dependencies.
* Avoid overly complex return values.
* Clean up subscriptions and listeners.
* Handle asynchronous operations safely.
* Avoid stale closures.

Do not extract hooks solely to reduce component line count.

---

# 22. API AND DATA HANDLING

Keep API communication separate from presentation when appropriate.

## Rules

* Use typed data structures.
* Handle loading states.
* Handle error states.
* Handle empty states.
* Handle unsuccessful HTTP responses.
* Avoid duplicate requests.
* Use `AbortController` when cancellation is needed.
* Validate untrusted external data.
* Never expose private credentials.
* Never hardcode secrets.

Vite client-side environment variables are public in production builds.

Do not store private API keys in frontend environment variables.

---

# 23. FORMS

## Rules

* Use semantic form elements.
* Associate labels with inputs.
* Support keyboard interaction.
* Validate input.
* Display useful errors.
* Prevent duplicate submissions.
* Handle loading states.
* Handle success states.
* Preserve accessibility.
* Use native browser capabilities when appropriate.

Do not introduce form libraries unnecessarily.

---

# 24. ACCESSIBILITY

Accessibility is mandatory.

## Rules

* Use semantic HTML.
* Maintain correct heading hierarchy.
* Ensure keyboard navigation.
* Provide visible focus states.
* Use accessible buttons and links.
* Avoid clickable `<div>` elements.
* Associate labels with form controls.
* Provide meaningful image alternative text.
* Respect reduced-motion preferences.
* Maintain sufficient contrast.
* Use ARIA only when necessary.
* Avoid positive `tabIndex` values.
* Manage focus correctly in dialogs and overlays.

Animations must not make the interface unusable.

---

# 25. PERFORMANCE

Performance is a core engineering requirement.

## Rules

* Minimize unnecessary JavaScript.
* Avoid unnecessary dependencies.
* Avoid unnecessary React re-renders.
* Optimize images.
* Optimize videos.
* Use route-level code splitting when appropriate.
* Avoid excessive DOM nesting.
* Avoid expensive layout recalculations.
* Avoid forced synchronous reflows.
* Use passive listeners when appropriate.
* Avoid memory leaks.
* Reduce layout shifts.

Consider:

* Largest Contentful Paint.
* Interaction to Next Paint.
* Cumulative Layout Shift.

Do not make performance claims without measurements.

Profile before implementing complex optimizations.

---

# 26. ERROR HANDLING

## Rules

* Handle expected failures.
* Never silently swallow errors.
* Avoid empty catch blocks.
* Provide useful error messages.
* Use error boundaries where appropriate.
* Avoid exposing sensitive technical information.
* Preserve useful debugging information.

Do not add unnecessary try/catch blocks.

---

# 27. TESTING

Write testable code.

## Rules

* Keep complex logic testable.
* Prefer pure functions for calculations.
* Avoid hidden dependencies.
* Test important interactions.
* Test edge cases.
* Test error states.
* Test responsive behavior.
* Verify keyboard accessibility.
* Verify animation cleanup.

Use the project's existing testing tools.

Do not introduce new testing frameworks without approval.

Never claim tests passed unless they were executed.

---

# 28. ESLINT AND PRETTIER

Follow the project's linting and formatting configuration.

## Rules

* Do not disable lint rules to hide problems.
* Fix underlying issues.
* Use consistent formatting.
* Organize imports consistently.
* Remove unused imports.
* Remove unused variables.
* Avoid unreachable code.
* Preserve strict TypeScript compatibility.

Do not change linting or formatting configuration unnecessarily.

---

# 29. IMPORT ORGANIZATION

Recommended import order:

1. React and framework imports.
2. Third-party libraries.
3. Shared internal modules.
4. Feature-specific modules.
5. Types.
6. Assets.
7. Styles.

Use path aliases when configured.

Do not assume aliases exist without checking.

Avoid unnecessarily long relative import paths.

---

# 30. NAMING CONVENTIONS

## Components

PascalCase:

```text
ProductCard
HeroSection
NavigationMenu
```

## Hooks

camelCase with `use` prefix:

```text
useWindowSize
useScrollDirection
useMediaQuery
```

## Functions

Use descriptive verbs:

```text
calculateTotalPrice
handleMenuToggle
fetchProductDetails
```

## Booleans

Use descriptive prefixes:

```text
isOpen
isLoading
hasError
canSubmit
shouldAnimate
```

## Files

```text
ProductCard.tsx
ProductCard.module.scss
useScrollDirection.ts
formatCurrency.ts
```

Avoid ambiguous names.

---

# 31. COMPONENT RESPONSIBILITY

Each component should have a clear responsibility.

Avoid components that simultaneously manage:

* Complex business logic.
* API communication.
* Extensive state.
* Large animation sequences.
* Large amounts of markup.

Extract responsibilities when doing so improves maintainability.

Do not split simple components unnecessarily.

There is no mandatory maximum number of lines per component.

Use complexity and readability as the deciding factors.

---

# 32. SECURITY

## Rules

* Never expose secrets.
* Never hardcode credentials.
* Treat external input as untrusted.
* Avoid unsafe HTML injection.
* Do not use `dangerouslySetInnerHTML` without appropriate sanitization.
* Validate URLs when necessary.
* Use safe external link behavior.
* Avoid vulnerable dependencies.
* Avoid exposing sensitive information in logs.

---

# 33. WORKING WITH EXISTING CODE

Before modifying existing code:

1. Inspect relevant files.
2. Understand existing architecture.
3. Identify established patterns.
4. Check installed dependencies.
5. Understand component lifecycle.
6. Identify potential side effects.
7. Choose the smallest maintainable solution.

## Rules

* Do not rewrite unrelated code.
* Do not change working functionality unnecessarily.
* Do not introduce unrelated refactoring.
* Do not rename public APIs without justification.
* Preserve existing behavior unless changes are requested.
* Keep changes focused.
* Avoid unnecessary dependencies.

If existing code conflicts with these standards, do not perform a large migration without approval.

---

# 34. DEBUGGING

When fixing bugs:

1. Identify the root cause.
2. Inspect relevant code.
3. Reproduce the issue when possible.
4. Implement a targeted fix.
5. Verify the result.
6. Check for regressions.

Never use arbitrary delays as fixes.

Never suppress errors instead of resolving them.

Never disable StrictMode to hide lifecycle issues.

Never use `!important` to hide CSS architecture problems.

Avoid unnecessary workarounds.

---

# 35. REFACTORING

Refactor only when it improves code quality.

## Rules

* Preserve behavior.
* Improve readability.
* Reduce unnecessary duplication.
* Simplify complex logic.
* Maintain type safety.
* Avoid premature abstraction.
* Avoid speculative architecture.
* Keep changes focused.

Do not refactor working code solely to make it shorter.

---

# 36. AI CODE GENERATION RULES

When generating code:

* Write complete implementations.
* Never intentionally abbreviate code.
* Never omit important logic.
* Never use placeholders unless requested.
* Never replace required functionality with comments.
* Avoid pseudocode when production code is requested.
* Use descriptive names.
* Keep functions focused.
* Separate logical operations.
* Use clear control flow.
* Avoid deeply nested conditions.
* Prefer maintainable solutions.

Do not create unnecessary files.

Do not create unnecessary hooks.

Do not create unnecessary abstractions.

Do not introduce unnecessary libraries.

---

# 37. IMPLEMENTATION PROCESS

Before implementing a task:

1. Understand the requested behavior.
2. Inspect relevant code.
3. Identify architectural constraints.
4. Consider React lifecycle.
5. Consider TypeScript safety.
6. Consider responsive behavior.
7. Consider accessibility.
8. Consider performance.
9. Choose the simplest reliable implementation.
10. Implement and verify.

For complex tasks, briefly explain the proposed approach before significant architectural changes.

For simple tasks, implement directly.

Ask questions only when missing information materially affects correctness.

---

# 38. FINAL VERIFICATION

Before completing a task, verify:

* TypeScript compatibility.
* ESLint compatibility.
* Correct imports.
* Correct architecture.
* Correct SCSS Module usage.
* Correct React Router Declarative Mode usage.
* Correct GSAP lifecycle.
* No unnecessary dependencies.
* No obvious memory leaks.
* No unnecessary React re-renders.
* Responsive behavior.
* Accessibility.
* Readability.
* No unrelated changes.

Run relevant checks when available.

Never claim checks passed unless executed.

Report checks that could not be completed.

---

# 39. COMMUNICATION

Communicate with the developer in Ukrainian unless another language is requested.

Keep code identifiers and technical terminology in English.

Explain architectural decisions concisely.

When making changes, summarize:

* What changed.
* Why it changed.
* Which files were affected.
* Whether verification succeeded.
* Remaining risks or limitations.

Avoid unnecessary explanations for trivial changes.

---

# 40. ABSOLUTE PRIORITIES

These rules override preferences for shorter or clever code.

Always prioritize:

1. Correctness.
2. Readability.
3. Maintainability.
4. Type safety.
5. Appropriate architecture.
6. Performance.
7. Accessibility.
8. Simplicity.

NEVER generate compressed or intentionally abbreviated code.

NEVER introduce unnecessary architectural complexity.

NEVER sacrifice maintainability to save lines of code.

NEVER assume library APIs exist without checking installed versions when uncertain.

NEVER make unrelated changes without justification.

**The final result must look like code written by a disciplined, experienced Senior Front-End Engineer.**
