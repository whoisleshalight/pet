import styles from "./SiteLayout.module.scss";
import { useEffect, useRef, useSyncExternalStore } from "react";
import {
    Outlet,
    useLocation,
    useMatches,
} from "react-router";
import { portfolio } from "../../../config/portfolio";
import { newsFeedMotionQuery } from "../../../features/news/newsFeedSettings";
import { Scrollbar } from "../../../components/scrollbar";
import { CursorFollower } from "../../../components/common/CursorFollower/CursorFollower";
import { Header } from "./header";
import { Footer } from "./footer/Footer.tsx";
import type { HeaderVariant } from "./header";
import { SmoothScroll } from "./scroll";
import { RouteScrollRestoration } from "./scroll/RouteScrollRestoration";
import { usePageTransition } from "./transitions/usePageTransition";

function subscribeToFullscreenViewport(onChange: () => void) {
    const mediaQuery = window.matchMedia(newsFeedMotionQuery);
    mediaQuery.addEventListener("change", onChange);

    return () => mediaQuery.removeEventListener("change", onChange);
}

function getFullscreenViewportSnapshot() {
    return window.matchMedia(newsFeedMotionQuery).matches;
}

export function SiteLayout() {
    const location = useLocation();
    const matches = useMatches();
    const headerReference = useRef<HTMLElement>(null);
    const scrollContentReference = useRef<HTMLDivElement>(null);
    const mainContentReference = useRef<HTMLElement>(null);
    const currentPage = matches.at(-1)?.handle as
        | {
              title?: string;
              headerVariant?: HeaderVariant;
              isFullscreen?: boolean;
          }
        | undefined;
    const pageTitle = currentPage?.title ?? "Portfolio";
    const headerVariant = currentPage?.headerVariant ?? "compact";
    const isFullscreenPage = currentPage?.isFullscreen ?? false;
    const isFullscreenViewport = useSyncExternalStore(
        subscribeToFullscreenViewport,
        getFullscreenViewportSnapshot,
    );
    const shouldShowFooter = !isFullscreenPage || !isFullscreenViewport;

    usePageTransition(mainContentReference);

    useEffect(() => {
        document.title = `${pageTitle} — ${portfolio.firstName} ${portfolio.lastName}`;
    }, [pageTitle]);

    return (
        <>
            <Header headerReference={headerReference} variant={headerVariant} />
            <SmoothScroll
                contentReference={scrollContentReference}
                navigationKey={location.key}
            >
                <div
                    id="scroll-content"
                    className={styles.scrollContent}
                    ref={scrollContentReference}
                >
                    <main
                        className={`${styles.siteMain}${headerVariant === "expanded" ? ` ${styles.siteMainExpandedHeader}` : ""}`}
                        id="main-content"
                        ref={mainContentReference}
                        tabIndex={-1}
                    >
                        <Outlet />
                    </main>
                    {shouldShowFooter && <Footer />}
                </div>
            </SmoothScroll>
            {!isFullscreenPage && (
                <Scrollbar
                    contentReference={scrollContentReference}
                    navigationKey={location.key}
                    controlsId="scroll-content"
                />
            )}
            <RouteScrollRestoration navigationKey={location.key} />
            <CursorFollower />
        </>
    );
}
