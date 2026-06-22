import { Section }          from '@/components/01.primitives/Section/Section';
import { Container }         from '@/components/01.primitives/Container/Container';
import { Stack }             from '@/components/01.primitives/Stack/Stack';
import { useScrollReveal }   from '@/animations/hooks/useScrollReveal';
import { VoiceInteractive }  from './components/VoiceInteractive/VoiceInteractive';
import styles                from './VoiceSection.module.scss';

export default function VoiceSection() {
  const labelRef   = useScrollReveal<HTMLSpanElement>();
  const headingRef = useScrollReveal<HTMLHeadingElement>();

  return (
    <Section id="voice" spacing="lg" aria-label="Customer Reviews">
      <Container className={styles.voice__container}>
        <Stack gap="xl">

          <Stack gap="xs" align="center">
            <span ref={labelRef} className="section-label">Voice</span>
            <h2 ref={headingRef} className={styles.voice__heading}>
              お客様の声
            </h2>
          </Stack>

          <VoiceInteractive />

        </Stack>
      </Container>
    </Section>
  );
}
