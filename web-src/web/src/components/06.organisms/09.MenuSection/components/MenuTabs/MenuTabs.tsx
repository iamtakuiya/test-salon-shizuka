import type { CSSProperties } from 'react';
import type { MenuCategory } from '@/utils/constants'; // Fix: was @/utils/services (doesn't exist)
import styles from './MenuTabs.module.scss';

interface Props {
  categories: MenuCategory[];
  activeTab: number;
  setActiveTab: (index: number) => void;
  sliderStyle: { left: number; width: number };
  tabsRef: React.MutableRefObject<(HTMLButtonElement | null)[]>;
  tabsContainerRef: React.RefObject<HTMLDivElement>;
}

export function MenuTabs({
  categories,
  activeTab,
  setActiveTab,
  sliderStyle,
  tabsRef,
  tabsContainerRef,
}: Props) {
  return (
    <div className={styles.tabsWrapper} aria-hidden="true">
      <div
        ref={tabsContainerRef}
        className={styles.tabs}
        role="tablist"
      >
        {categories.map((cat, idx) => (
          <button
            key={cat.id}
            ref={(el) => { tabsRef.current[idx] = el; }}
            role="tab"
            aria-selected={activeTab === idx}
            aria-controls={`menu-panel-${cat.id}`}
            className={`${styles.tab} ${activeTab === idx ? styles.tabActive : ''}`}
            onClick={() => setActiveTab(idx)}
          >
            {cat.category}
          </button>
        ))}
        {/* Sliding underline — position driven by JS */}
        <div className={styles.tabSlider} style={sliderStyle as CSSProperties} />
      </div>
    </div>
  );
}
