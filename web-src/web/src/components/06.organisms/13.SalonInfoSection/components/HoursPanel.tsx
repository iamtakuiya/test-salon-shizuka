import { useRef, useState, useEffect, useCallback } from 'react';
import styles from '../SalonInfoSection.module.scss';
import { useHorizontalWheelScroll } from '../hooks/useHorizontalWheelScroll';
import { HOURS, CLOSED_NOTE } from '../constants';

const CARD_GAP_PX = 8; // matches $space-2 gap in the module

export function HoursPanel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [cardStep, setCardStep] = useState(98);

  useHorizontalWheelScroll(scrollRef);

  // Measure the actual rendered card width once mounted, rather than relying
  // on a hardcoded magic number that drifts whenever the card size changes
  // at a breakpoint.
  useEffect(() => {
    const firstCard = scrollRef.current?.firstElementChild as HTMLElement | null;
    if (firstCard) setCardStep(firstCard.offsetWidth + CARD_GAP_PX);
  }, []);

  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;
    setActiveIndex(Math.round(scrollRef.current.scrollLeft / cardStep));
  }, [cardStep]);

  const scrollToCard = (index: number) => {
    scrollRef.current?.scrollTo({ left: index * cardStep, behavior: 'smooth' });
  };

  return (
    <div className={styles.hours}>
      <div className={styles.hours__inner}>
        <h3 className={styles.hours__title}>営業時間</h3>

        <div ref={scrollRef} onScroll={handleScroll} className={styles.hours__grid}>
          {HOURS.map((row) => {
            const isWeekend = row.day === 'Sat' || row.day === 'Sun';
            return (
              <div key={row.day} className={styles.hours__card}>
                <span className={styles.hours__day}>{row.day}</span>
                <div
                  className={[
                    styles.hours__timeBox,
                    row.closed ? styles['hours__timeBox--closed'] : '',
                    isWeekend ? styles['hours__timeBox--weekend'] : '',
                  ].join(' ')}
                >
                  {row.closed ? (
                    <span className={styles.hours__status}>Closed</span>
                  ) : (
                    <>
                      <span className={styles.hours__time}>{row.open}~</span>
                      <span className={styles.hours__time}>{row.close}</span>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile-only pagination dots — hidden at tablet+ via SCSS */}
        {/* <div className={styles.hours__dots}>
          {HOURS.map((row, i) => (
            <button
              key={row.day}
              type="button"
              aria-label={`${row.day}を表示`}
              className={`${styles.hours__dot} ${
                i === activeIndex ? styles['hours__dot--active'] : ''
              }`}
              onClick={() => scrollToCard(i)}
            />
          ))}
        </div> */}
      </div>

      <div className={styles.hours__closed}>
        <h3 className={styles.hours__closedTitle}>定休日</h3>
        <p className={styles.hours__closedNote}>{CLOSED_NOTE}</p>
      </div>
    </div>
  );
}
