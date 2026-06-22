import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

import { Section } from "@/components/01.primitives/Section/Section";
import { Container } from "@/components/01.primitives/Container/Container";
import { Box } from "@/components/01.primitives/Box/Box";

import styles from "./HospitalityText.module.scss"
import { rotatingText } from "@/animations/gsap/rotatingText";

// "髪を育むという贅沢 ・ 強く豊かな髪へ", "心をほどく対話 ・ あなただけのヘアデザイン", "「美容師とお客様」を超えて ・                  
//   心地よく寄り添う"

/**
 * Hospitality section – shows a smooth rolling text animation on mobile devices.
 * On larger screens the texts sit side‑by‑side (flex layout).
 */
export default function HospitalityText() {
  const textRef = useRef<HTMLDivElement>(null);

  // Phrases to display (Japanese copy provided by the user)
  const phrases = [
    '髪を育むという贅沢 ・ 強く豊かな髪へ',
    '心をほどく対話 ・ あなただけのヘアデザイン',
    '「美容師とお客様」を超えて ・ 心地よく寄り添う',
  ];

  const mobilePhrases = [...phrases, phrases[0]];
  const isMobile = window.innerWidth <= 1024;
  const [isAnimated, setIsAnimated] = useState(isMobile);


  // const loopedPhrases = isMobile ? [...phrases, phrases[0]] : phrases;
  
  // useEffect(() => {
  //   // Only run the rolling animation on mobile (max‑width: 767px).
  //   const mq = window.matchMedia('(max-width: 1024px)');

  //   // Fallback/Early return if it's desktop or element doesn't exist
  //   if (!mq.matches || !textRef.current) return;

  //   const element = textRef.current;
  //   if (!element) return;
    
  //   const tl = rotatingText({
  //     element,
  //     items: phrases,
  //     displayDuration: 2,
  //   });

  //   return () => { 
  //     if (tl) tl.kill();
  //   };
  // }, []);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(max-width: 1024px)", () => {
      if (!textRef.current) return;

      const tl = rotatingText({
        element: textRef.current,
        displayDuration: 2,
      });

      return () => {
        tl?.kill();

        gsap.set(textRef.current, {
          clearProps: "all",
        })
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <Section
      id="hospitality"
      className={styles.hospitality}
      aria-label="Salon Shizuka Hospitalities"
    >
      <Container
        size="xl"
        className={styles.hospitality__container}
      >
        <Box className={styles.rotating}>
          <Box
            ref={textRef}
            className={styles.rotating__textContainer}
          >
            {(isAnimated ? mobilePhrases : phrases).map((phrase, index) => (
              <span 
                key={index} 

                className={styles.rotating__phrase}
              >
                {phrase}
                <div className="divider"></div>
              </span>
            ))}
          </Box>
        </Box>
      </Container>

    </Section>
  );
}