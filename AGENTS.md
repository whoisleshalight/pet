# GSAP Animation Rules — React + TypeScript

Follow these rules strictly when creating, modifying, or optimizing animations using GSAP in React.

## 1. GSAP Integration

* ALWAYS use `@gsap/react` for GSAP animations inside React components.
* ALWAYS use the `useGSAP()` hook instead of `useEffect()` or `useLayoutEffect()` for GSAP animations.
* Register required plugins using `gsap.registerPlugin()`.
* Register plugins outside React components.
* NEVER initialize GSAP animations directly inside the component render function.
* NEVER create animations that can accumulate across React re-renders.

Example:

```tsx
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import styles from './Hero.module.scss';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(`.${styles.title}`, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className={styles.hero}>
      <h1 className={styles.title}>Hello World</h1>
    </section>
  );
};
```

## 2. DOM Element Targeting

* ALWAYS prefer React `useRef()` for individual animated elements.
* Use scoped selectors for multiple elements.
* NEVER use global selectors such as `document.querySelector()` or `document.querySelectorAll()` for component animations.
* NEVER target elements globally using generic CSS classes.
* Use `gsap.utils.selector()` when appropriate.
* Keep animations isolated within their component scope.
* Prefer refs over selectors when animating a single element.

## 3. Animation Cleanup

* ALWAYS ensure animations are properly cleaned up when components unmount.
* Use `useGSAP()` to automatically manage GSAP contexts.
* NEVER leave active ScrollTriggers, timelines, or event listeners after component unmount.
* Use `contextSafe()` for animations created inside event handlers, callbacks, or asynchronous operations.
* Use `revertOnUpdate: true` when animations must be recreated after dependency changes.
* NEVER call `ScrollTrigger.killAll()` for component-specific cleanup.

## 4. ScrollTrigger

* ALWAYS register ScrollTrigger before using it.
* Create ScrollTrigger instances inside `useGSAP()`.
* Use component-scoped triggers.
* Use `scrub` only when animations must follow scroll progress.
* Use `pin` only when the design requires pinned sections.
* Avoid unnecessary ScrollTrigger instances.
* Use `invalidateOnRefresh: true` when animations depend on responsive measurements.
* Use `ScrollTrigger.refresh()` only when layout changes require recalculation.
* NEVER initialize duplicate ScrollTriggers.

## 5. GSAP Timelines

* Prefer `gsap.timeline()` for sequences containing multiple related animations.
* Avoid unnecessary independent tweens when a timeline would provide better control.
* Use timeline labels and position parameters for synchronization.
* Keep animation sequences readable and maintainable.
* Avoid deeply nested timelines unless necessary.

## 6. Performance Optimization

* Prefer animating `transform` and `opacity`.
* Avoid animating layout-heavy properties such as `width`, `height`, `top`, `left`, and `margin` when transform-based alternatives are possible.
* Use `will-change` selectively and remove it when no longer necessary.
* Avoid excessive simultaneous animations.
* Use `gsap.quickTo()` or `gsap.quickSetter()` for frequently updated values when appropriate.
* Avoid unnecessary React state updates during animations.
* NEVER use React state to update animation values on every frame.
* Use GSAP for animation updates instead of triggering React re-renders.

## 7. Responsive Animations

* ALWAYS consider desktop, tablet, and mobile behavior.
* Use `gsap.matchMedia()` for breakpoint-specific animations.
* Ensure responsive animations are properly reverted when breakpoints change.
* Avoid hardcoded animation distances when responsive values are required.
* Respect `prefers-reduced-motion`.
* Disable or simplify nonessential animations for users who prefer reduced motion.

## 8. React StrictMode Compatibility

* ALL GSAP animations must work correctly with React StrictMode.
* Avoid duplicate animations during development.
* Ensure GSAP contexts are correctly reverted.
* NEVER disable React StrictMode to fix GSAP animation issues.
* Fix animation lifecycle problems instead.

## 9. Event-Based Animations

* Use `contextSafe()` for GSAP animations triggered by React event handlers.
* Avoid creating uncontrolled tweens on every mouse movement.
* Use `gsap.quickTo()` for mouse-following animations when appropriate.
* Prevent conflicting animations using `overwrite: 'auto'` when needed.
* Clean up manually registered event listeners.

## 10. Code Quality

* Use TypeScript with correctly typed refs.
* Avoid `any`.
* Keep animation logic separate from unrelated business logic.
* Extract complex animations into reusable custom hooks when appropriate.
* Do not create unnecessary abstractions for simple animations.
* Avoid magic numbers when animation values should be configurable.
* Use consistent easing and duration values.
* Prefer readable, maintainable code over unnecessarily complex solutions.

## 11. GSAP + SCSS Modules

* ALWAYS use SCSS Modules for component-specific styles.
* NEVER depend on global CSS class names for animation targeting.
* Prefer React refs or scoped CSS Module selectors.
* Keep initial visual styles in SCSS when appropriate.
* Use `gsap.set()` for initial states that must be established programmatically.
* Avoid conflicts between CSS transitions and GSAP animations targeting the same properties.
* Do not use CSS animations and GSAP simultaneously on the same properties unless explicitly required.

## 12. Animation Architecture

For complex components, follow this structure:

```text
components/
  Hero/
    Hero.tsx
    Hero.module.scss
    index.ts
```

For reusable or complex animation logic:

```text
hooks/
  useHeroAnimation.ts
  useScrollAnimation.ts
```

* Keep simple animations inside their components.
* Extract animation logic only when complexity or reusability justifies it.
* Avoid unnecessary files and abstractions.

## 13. Critical Rules

* NEVER use `setTimeout()` to initialize GSAP animations as a workaround for rendering or layout issues.
* NEVER use arbitrary delays to fix ScrollTrigger initialization.
* NEVER manipulate React-managed DOM structure without a clear reason.
* NEVER create GSAP animations during rendering.
* NEVER use global DOM queries when component-scoped alternatives exist.
* NEVER introduce memory leaks.
* NEVER sacrifice animation performance for unnecessary visual effects.
* ALWAYS preserve existing component functionality when modifying animations.
* ALWAYS ensure animations work correctly after mounting, unmounting, and remounting.
* ALWAYS use GSAP APIs according to their actual behavior and current documentation.
