import { Stack } from '@/components/01.primitives/Stack/Stack';
import { useScrollReveal } from '@/animations/hooks/useScrollReveal';
import styles from './MenuHeader.module.scss';

export function MenuHeader() {
  // Fix: label ref on the <span>, heading ref on the <h2> — matches every
  // other section (ConceptSection, GallerySlider, VoiceSection, etc.)
  // const labelRef   = useScrollReveal<HTMLSpanElement>();
  const headingRef = useScrollReveal<HTMLHeadingElement>();
  const subHeadingRef = useScrollReveal<HTMLParagraphElement>();

  return (
    <Stack gap="xs" align="center">
      {/* Fix: section-label span was missing entirely */}
      {/* <span ref={labelRef} className="section-label">メニュー・料金</span> */}
      <h2 ref={headingRef} className={styles.menu__heading}>
        Menu
      </h2>
      <p ref={subHeadingRef} className={styles.menu__subheading}>
        カウンセリングをもとに、あなたの骨格、髪質、<br />
        日々のライフスタイルに寄り添った施術をご提案いたします
      </p>
    </Stack>
  );
}
