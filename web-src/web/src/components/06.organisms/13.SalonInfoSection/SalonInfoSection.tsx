import styles from './SalonInfoSection.module.scss';
import { Section } from '@/components/01.primitives/Section/Section';
import { Container } from '@/components/01.primitives/Container/Container';
import { Stack } from '@/components/01.primitives/Stack/Stack';
import {
  SalonInfoHeader,
  LocationPanel,
  HoursPanel,
  ContactPanel,
  PaymentsPanel,
} from './components';

export default function SalonInfoSection() {
  return (
    <Section id="info" spacing="lg" aria-label="Salon Info" className={styles.salonInfo}>
      <Container size="xl">
        <Stack gap="xl">
          <SalonInfoHeader />

          {/* Two columns on laptop+, stacked on mobile/tablet — a custom
              div rather than <Row>, since Row can't switch flex-direction
              by breakpoint (see ConceptSection / OwnerSection / MapHours
              for the same pattern). */}
          <div className={styles.salonInfo__grid}>
            <Stack gap="md" className={styles.salonInfo__left}>
              <LocationPanel />
              <HoursPanel />
            </Stack>

            <Stack gap="md" className={styles.salonInfo__right}>
              <ContactPanel />
              <PaymentsPanel />
            </Stack>
          </div>
        </Stack>
      </Container>
    </Section>
  );
}
