 import { Section, Row, Box } from "@/components/01.primitives";
import styles from "./Footer.module.scss"; // Enforced CSS modules usage pattern

export interface FooterNavLinkProp {
  href?: string;
  text: string;
  isExistPage: boolean;
}

export const FOOTER_NAV_LINK: FooterNavLinkProp[] = [
  { href: "#home", text: "Home", isExistPage: true },
  { href: "#concept", text: "Concept", isExistPage: true },
  { href: "#menu", text: "Menu", isExistPage: true },
  { href: "#gallery", text: "Hair Styles", isExistPage: true },
  { href: "#recruit", text: "Recruit", isExistPage: false },
];

export const COPYRIGHT = "© 20XX SALON SHIZUKA. All rights reserved.";

export default function Footer() {
  return (
    <Section as="footer" spacing="sm" className={styles.footer}>
      <Box className={styles.footer__container}>
        <nav className={styles.footer__nav}>
          <Row as="ul" gap="md" align="center" className={styles.footer__navList}>
            {FOOTER_NAV_LINK.map((item, index) => (
              <li key={index} className={styles.footer__navItem}>
                <a href={item.href} className={styles.footer__navLink}>
                  {item.text}
                </a>
              </li>
            ))}
          </Row>
        </nav>

        <div className={styles.copyright}>
          <p className={styles.copyright__text}>{COPYRIGHT}</p>
        </div>
      </Box>
    </Section>
  );
}