import { useScrollReveal } from '@/animations/hooks/useScrollReveal';
import styles from './OwnerSection.module.scss';
import { Section } from "@/components/01.primitives/Section/Section";
import { Container } from "@/components/01.primitives/Container/Container";
import { Stack } from "@/components/01.primitives/Stack/Stack";
import { Box } from "@/components/01.primitives/Box/Box";

import ownerMobileImg from '@/assets/images/04.owner/owner-mobile.png';
import ownerTabletImg from '@/assets/images/04.owner/owner-tablet.png';
import ownerDesktopImg from '@/assets/images/04.owner/owner-desk.png';
import { Card } from "@/components/02.surface/02.Card/Card";

export default function OwnerSection() {
  const labelRef = useScrollReveal<HTMLSpanElement>();
  const headingRef = useScrollReveal<HTMLHeadingElement>();
  const imgRef = useScrollReveal<HTMLDivElement>();
  const cardRef = useScrollReveal<HTMLDivElement>();
  const textRef = useScrollReveal<HTMLParagraphElement>();

  return (
    <Section
      id="owner"
      className={styles.owner}
      spacing="lg"
      aria-label="owner"
    >
      <Container className={styles.owner__grid}>
        <Stack 
          className={styles.owner__headline}
        >
          {/* Tagline */}
          <span
            ref={labelRef}
            className={styles.owner__label}
          >
            Owner shizuka 
          </span>
          {/* Headline */}
          <h2
            ref={headingRef}
            className={styles.owner__heading}
          >
            <span className={styles.owner__headingText}>
              髪のお悩み,
            </span>
            <span className={styles.owner__headingText}>
              ここではゆっくり
            </span>
            <span className={styles.owner__headingText}>
              話してくださいね
            </span>
          </h2>
        </Stack>

        {/* Image */}
        <Box
          ref={imgRef}
          className={styles.owner__imageWrapper}
        >

          <picture>
            <source 
              media="(min-width: 1024px)"
              srcSet={ownerDesktopImg}
            />
            <source 
              media="(min-width: 768px)"
              srcSet={ownerTabletImg}
            />

            <img
              src={ownerMobileImg}
              alt="オーナー 静花の写真"
              className={styles.owner__image}
              loading="lazy"
            />
          </picture>
        </Box>

        <Card 
          ref={cardRef}
          className={styles.owner__card}
          padding="none"
        >
          {/* Body Text */}
          <p ref={textRef}>お客様とお話ししていて、いつも思うことがあります。皆様それぞれ違う悩みを持っていて、その場しのぎではない「根本的な改善」で、ずっと自分の髪を好きでいてほしいな、と。</p>
          <p ref={textRef}>Salon Shizukaを完全予約制のプライベート空間にしたのは、まわりの目を気にせず、ホッと一息ついてほしかったからです。他店だとちょっと緊張して言いにくいようなお悩みも、ここでは肩の力を抜いて何でもお話ししてください。</p>
          <p ref={textRef}>丁寧なヘアケアとお家でのちょっとしたコツを一緒におさらいしながら、柔らかいツヤやふんわりとした健やかさなど、あなた本来の美しさを引き出していきます！</p>
        </Card>
      </Container>
    </Section>
  );
};