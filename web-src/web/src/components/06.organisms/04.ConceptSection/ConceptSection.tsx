import { useState, useEffect } from 'react';
import { useScrollReveal } from '@/animations/hooks/useScrollReveal';
import styles from './ConceptSection.module.scss';
import { Section } from "@/components/01.primitives/Section/Section";
import { Container } from "@/components/01.primitives/Container/Container";
import { Stack } from "@/components/01.primitives/Stack/Stack";
import { Box } from "@/components/01.primitives/Box/Box";

import conceptMobileImg from '@/assets/images/02.concept/concept-mobile.png';
import conceptTabletImg from '@/assets/images/02.concept/concept-tablet.png';
import conceptDesktopImg from '@/assets/images/02.concept/concept.png';
import { Card } from "@/components/02.surface/02.Card/Card";


export const SALON_MOOD_MESSAGES = [
  { id: "read_book", content: "今日は静かに本を読みたい。" },
  { id: "close_eyes", content: "何も考えずに、ただ目を閉じたい。" },
  { id: "consult_hair", content: "あるいは、誰にも言えない髪の悩みをゆっくり聞いてほしい。" },
  { id: "salon_concept", content: "SALON SHIZUKAでは、落ち着いた寛ぎの空間のなかで、その日のあなたの心に合わせた距離感で寄り添います。 カウンセリングの最初に「今日の過ごし方のご希望」をお伺いします。どうぞ遠慮なく、友人のような気さくさで、リラックスしてお過ごしください。" },
] as const;


export default function ConceptSection() {
  const labelRef = useScrollReveal<HTMLSpanElement>();
  const headingRef = useScrollReveal<HTMLHeadingElement>();
  const imgRef = useScrollReveal<HTMLDivElement>();
  const cardRef = useScrollReveal<HTMLDivElement>();
  const textRef = useScrollReveal<HTMLParagraphElement>();

  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsTablet(window.innerWidth >= 769)
    }

    handleResize();

    window.addEventListener('resize', handleResize)
    return () =>  window.removeEventListener('resize', handleResize)

  }, [])

  return (
    <Section
      id="concept"
      className={styles.concept}
      spacing="lg"
      aria-label="Concept"
    >
      <Container
        className={styles.concept__grid}
      >
        <Stack 
          className={styles.concept__headline}
        >
          {/* Tagline */}
          <span
            ref={labelRef}
            className={styles.concept__label}
          >
            CONCEPT
          </span>
          {/* Headline */}
          <h2
            ref={headingRef}
            className={styles.concept__heading}
          >
            <span className={styles.concept__headingText}>
              あなたの髪と
            </span>
            <span className={styles.concept__headingText}>
              {isTablet ? (
                    <>
                      ゆっくり<br />向き合う
                    </>
                  ): (
                    "ゆっくり向き合う"
              )}
            </span>
          </h2>
        </Stack>

        {/* Image */}
        <Box
          ref={imgRef}
          className={styles.concept__imageWrapper}
        >

          <picture>
            <source 
              media="(min-width: 1024px)"
              srcSet={conceptDesktopImg}
            />
            <source 
              media="(min-width: 768px)"
              srcSet={conceptTabletImg}
            />

            <img
              src={conceptMobileImg}
              alt="サロン外観 — 静かで落ち着いた外観"
              className={styles.concept__image}
              loading="lazy"
            />
          </picture>
        </Box>

        <Card 
          ref={cardRef}
          className={styles.concept__card}
          padding="none"
        >
          {/* Body Text */}
          {SALON_MOOD_MESSAGES.map((message, index) => (              
            <p
              key={index} 
              className={styles.concept__text}
            >
              <span 
                ref={textRef}
              >
                {message.content}
              </span>
            </p>
          ))}
        </Card>
      </Container>
    </Section>
  );
};

