import { useState } from 'react';
import styles from './MenuSection.module.scss';

import { Section } from '@/components/01.primitives/Section/Section';
import { Container } from '@/components/01.primitives/Container/Container';
import { Stack } from '@/components/01.primitives/Stack/Stack';
import { Box } from '@/components/01.primitives/Box/Box';

import { MENU_CATEGORIES, MENU_FOOTER_NOTES } from '@/utils/constants';

import { useMenuTabs } from '@/animations/hooks/useMenuTabs';
import { MenuHeader } from './components/MenuHeader/MenuHeader';

import { MenuTabs } from './components/MenuTabs/MenuTabs';
import { CategoryList } from './components/CategoryList/CategoryList';
import { FootNote } from './components/FootNotes/FootNotes';

export default function MenuSection() {
  const [activeTabIdx, setActiveTabIdx] = useState(0);

  const { sliderStyle, tabsContainerRef, tabsRef } = useMenuTabs(activeTabIdx);

  // Split into two equal columns for the desktop layout.
  // NOTE: globalIdx passed to CategoryList is the slice offset so each
  // column can reconstruct the true index within MENU_CATEGORIES.
  const halfLength   = Math.ceil(MENU_CATEGORIES.length / 2);
  const leftColumn   = MENU_CATEGORIES.slice(0, halfLength);
  const rightColumn  = MENU_CATEGORIES.slice(halfLength);

  return (
    <Section
      id="menu"
      spacing="lg"
      aria-label="Menu &amp; Pricing"
      className={styles.menu}
    >
      <Container className={styles.menu__container}>
        <Stack gap="xl">

          <MenuHeader />

          {/* Tab strip — mobile only; aria-hidden keeps it out of desktop a11y tree */}
          <MenuTabs
            categories={MENU_CATEGORIES}
            activeTab={activeTabIdx}
            setActiveTab={setActiveTabIdx}
            sliderStyle={sliderStyle}
            tabsRef={tabsRef}
            tabsContainerRef={tabsContainerRef}
          />

          {/* Two-column category panels */}
          <Box className={styles.menu__columns}>

            <Stack gap="lg" className={styles.menu__column}>
              {/* indexOffset=0 — left column starts at MENU_CATEGORIES[0] */}
              <CategoryList
                menuList={leftColumn}
                activeTabIdx={activeTabIdx}
                indexOffset={0}
              />
            </Stack>

            {/* Vertical divider — desktop only */}
            <div className={styles.menu__divider} aria-hidden="true" />

            <Stack gap="lg" className={styles.menu__column}>
              {/* indexOffset=halfLength — right column starts at MENU_CATEGORIES[halfLength] */}
              <CategoryList
                menuList={rightColumn}
                activeTabIdx={activeTabIdx}
                indexOffset={halfLength}
              />
            </Stack>

          </Box>

          <FootNote notes={MENU_FOOTER_NOTES} />

        </Stack>
      </Container>
    </Section>
  );
}
