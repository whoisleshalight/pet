import styles from "./SiteLayout.module.scss";
import { useEffect, useRef } from "react";
import {
    Outlet,
    useLocation,
    useMatches,
} from "react-router";
import { portfolio } from "../../../config/portfolio";
import { Scrollbar } from "../../../components/scrollbar";
import { CursorFollower } from "../../../components/common/CursorFollower/CursorFollower";
import { Header } from "./header";
import { Footer } from "./footer/Footer.tsx";
import type { HeaderVariant } from "./header";
import { SmoothScroll } from "./scroll";
import { RouteScrollRestoration } from "./scroll/RouteScrollRestoration";
import { usePageTransition } from "./transitions/usePageTransition";

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
          }
        | undefined;
    const pageTitle = currentPage?.title ?? "Portfolio";
    const headerVariant = currentPage?.headerVariant ?? "compact";

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
                    <Footer />
                </div>
            </SmoothScroll>
            <Scrollbar
                contentReference={scrollContentReference}
                navigationKey={location.key}
                controlsId="scroll-content"
            />
            <RouteScrollRestoration navigationKey={location.key} />
            <CursorFollower />
        </>
    );
}
