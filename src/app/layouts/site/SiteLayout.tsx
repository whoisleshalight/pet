import styles from "./SiteLayout.module.scss";
import { useEffect, useRef } from "react";
import {
    Outlet,
    ScrollRestoration,
    useLocation,
    useMatches,
} from "react-router";
import { portfolio } from "../../../config/portfolio";
import { Scrollbar } from "../../../components/scrollbar";
import { Header } from "./header";
import { Footer } from "./footer/Footer.tsx";
import type { HeaderVariant } from "./header";
import { SmoothScroll } from "./scroll";

export function SiteLayout() {
    const location = useLocation();
    const matches = useMatches();
    const headerReference = useRef<HTMLElement>(null);
    const scrollContentReference = useRef<HTMLDivElement>(null);
    const mainContentReference = useRef<HTMLElement>(null);
    const previousPathnameReference = useRef(location.pathname);
    const currentPage = matches.at(-1)?.handle as
        | {
              title?: string;
              headerVariant?: HeaderVariant;
          }
        | undefined;
    const pageTitle = currentPage?.title ?? "Portfolio";
    const headerVariant = currentPage?.headerVariant ?? "compact";

    useEffect(() => {
        document.title = `${pageTitle} — ${portfolio.firstName} ${portfolio.lastName}`;
    }, [pageTitle]);

    useEffect(() => {
        if (previousPathnameReference.current !== location.pathname) {
            mainContentReference.current?.focus({ preventScroll: true });
            previousPathnameReference.current = location.pathname;
        }
    }, [location.pathname]);

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
                        className={styles.siteMain}
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
            <ScrollRestoration />
        </>
    );
}
