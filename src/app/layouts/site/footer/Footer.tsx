import styles from "./Footer.module.scss";
import { portfolio } from "../../../../config/portfolio";
export function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerInner}>
                <div className="">
                    <a href="" className={styles.logo}>
                        {portfolio.shortName}
                    </a>
                    <ul>
                        <li>
                            <a href="#">UpWork</a>
                        </li>
                        <li>
                            <a href="#">Fiver</a>
                        </li>
                        <li>
                            <a href="#">WhatsApp</a>
                        </li>
                        <li>
                            <a href="#">Telegram</a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}
