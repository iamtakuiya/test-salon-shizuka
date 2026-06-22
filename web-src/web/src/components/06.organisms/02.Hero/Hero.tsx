import { useEffect, useRef } from "react";
import { gsap } from "gsap";

import { heroReveal } from "@/animations/gsap/heroReveal";

import { Section } from "@/components/01.primitives/Section/Section";
import { Container } from "@/components/01.primitives/Container/Container";
import { Stack } from "@/components/01.primitives/Stack/Stack";
import { Box } from "@/components/01.primitives/Box/Box";
import LogoWrapper from "../01.Header/LogoWrapper/LogoWrapper";
import { Logo } from "@/components/04.atoms/Logo/Logo";
import { Button } from "@/components/04.atoms/Button/Button";

import styles from "./Hero.module.scss";
import heroMobileImg from "@assets/images/01.hero/hero-mobile.png";
import heroTabletImg from "@assets/images/01.hero/hero-tablet.png";
import heroDesktopImg from "@assets/images/01.hero/hero.png";

export default function Hero() {
  const logoRef     = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef      = useRef<HTMLParagraphElement>(null);
  const ctaRef      = useRef<HTMLDivElement>(null);
  // const overlayRef  = useRef<HTMLDivElement>(null);


  useEffect(() => {
    if (!logoRef.current && !headlineRef.current && !subRef.current && !ctaRef.current) return;

    const ctx = gsap.context(() => {
      heroReveal({
        // overlay: overlayRef.current,
        logo: logoRef.current,
        headline: headlineRef.current,
        sub: subRef.current,
        cta: ctaRef.current,
      });
    });

    return () => ctx.revert();  // Safely cleans up on unmount/re-render
  }, []);


  return (
    <Section
      id="home"
      className={styles.hero}
      aria-label="Salon Shizuka Introduction"
      // style={{ backgroundImage: `url(${heroMobileImg})`}}
    >
      <Box className={styles.hero__bg}>
        <picture>
          <source 
            media="(min-width: 1440px)"
            srcSet={heroDesktopImg}
          />
          <source 
            media="(min-width: 540px)"
            srcSet={heroTabletImg}
          />

          <source 
            media="(min-width: 375px)"
            srcSet={heroMobileImg}
          />

          <img
            src={heroMobileImg}
            alt=""
            aria-hidden="true"
            className={styles.hero__bgImg}
          />
        </picture>
        <div 
          // ref={overlayRef}
          className={styles.hero__overlay} 
        />
      </Box>

      <Container
        size="xl" 
        className={styles.hero__container}
      >
        <Stack 
          gap="lg" 
          align="start" 
          className={styles.hero__content}
        >
          {/* Content */}
          <Box
            className={styles.hero__headlineContainer}
          >
            {/* Logo */}
            <LogoWrapper ref={logoRef} className={styles.header__logoWrapper}>
              <Logo className={styles.hero__logo} />
            </LogoWrapper>
            
            <p
              ref={subRef}
              className={styles.hero__sub}
            >
              <span className={styles.hero__subheadline}>
                あなた本来の美しさと艶を呼び覚ます、
              </span>
              <span className={styles.hero__subheadline}>
                プライベートサロンで特別なひとときを。
              </span>
            </p>
            <h1
              ref={headlineRef}
              className={styles.hero__headline}
            >
              髪が変わる、自分のための贅沢を！ 
            </h1>
          </Box>
          {/* CTA */}
          <Box
            ref={ctaRef}
            className={styles.hero__cta}
          >
            <Button as='a' href="#reservation" aria-label="サロンを予約する" className={styles.hero__ctaBtnGhost}>
              サロンを予約する
            </Button>          
          </Box>
        </Stack>
      </Container>
    </Section>
  );
}