import React, { useState, useRef, useEffect, useCallback } from 'react';
import styles from '../../ReservationSection.module.scss';
import { MENU_CATEGORIES } from '@/utils/constants';
import { DESKTOP_GRID_CAPACITY } from '@/utils/constants';

/** Service gallery */
export default function ServiceGallery({
  activeCategoryId,
  onCategorySelect,
}: {
  activeCategoryId: string;
  onCategorySelect: (id: string) => void;
}) {
  const total = MENU_CATEGORIES.length;
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(1);
  const [isGrid, setIsGrid] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  // Adjust page viewport if the active item changes externally
  useEffect(() => {
    const idx = MENU_CATEGORIES.findIndex((c) => c.id === activeCategoryId);
    if (idx < 0) return;
    const targetPage = Math.floor(idx / perPage);
    setPage(targetPage);
  }, [activeCategoryId, perPage]);

  const updateLayout = useCallback(() => {
    const w = window.innerWidth;
    if (w >= 1024) {
      setIsGrid(true);
      setPerPage(DESKTOP_GRID_CAPACITY);
    } else if (w >= 768) {
      setIsGrid(false);
      setPerPage(2);
    } else {
      setIsGrid(false);
      setPerPage(1);
    }
  }, []);

  useEffect(() => {
    updateLayout();
    window.addEventListener('resize', updateLayout);
    return () => window.removeEventListener('resize', updateLayout);
  }, [updateLayout]);

  const totalPages = Math.ceil(total / perPage);
  const showSliderNav = !isGrid || total > DESKTOP_GRID_CAPACITY;
  const visibleStart = page * perPage;
  const visibleCats = isGrid
    ? MENU_CATEGORIES.slice(visibleStart, visibleStart + DESKTOP_GRID_CAPACITY)
    : MENU_CATEGORIES;
  
    // Track translation using container percentage chunks
  // const slideOffset = isGrid ? 0 : page * (100 / perPage);
  
  const firstVisibleIndex = page * perPage;

  // NEW: Setup only horizontal scrolling not page up and down
  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // We only run this custom scroll logic when we are in mobile/tablet sliding mode
    if (isGrid) return; 

    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    // Find all cards inside the track
    const cards = track.querySelectorAll(`.${styles.gallery__card}`);
    const targetCard = cards[firstVisibleIndex] as HTMLElement;

    if (targetCard) {
      const viewportWidth = viewport.getBoundingClientRect().width;
      const cardWidth = targetCard.getBoundingClientRect().width;

      // Calculate the target card's left position relative to the track parent container
      // Exact center math: Card's offset positioning minus half of the empty structural viewport remaining space
      const targetOffsetLeft = targetCard.offsetLeft - (viewportWidth - cardWidth) / 2;

      // Scroll ONLY the viewport container horizontally
      viewport.scrollTo({
        left: targetOffsetLeft,
        behavior: 'smooth',
      });
    }
  }, [firstVisibleIndex, isGrid]);


  const goPrev = () => setPage((p) => (p === 0 ? totalPages - 1 : p - 1));
  const goNext = () => setPage((p) => (p === totalPages - 1 ? 0 : p + 1));

  return (
    <div className={styles.gallery}>
      <div ref={viewportRef} className={styles.gallery__viewport}>
        <div
          ref={trackRef}
          className={[styles.gallery__track, isGrid ? styles['gallery__track--grid'] : ''].join(' ')}
          // style={!isGrid ? { transform: `translateX(-${slideOffset}%)` } : undefined}
        >
          {(isGrid ? visibleCats : MENU_CATEGORIES).map((cat) => {
            const active = cat.id === activeCategoryId;
            return (
              <button
                key={cat.id}
                type="button"
                aria-pressed={active}
                className={[
                  styles.gallery__card,
                  active ? styles['gallery__card--active'] : '',
                ].join(' ')}
                // style={!isGrid ? { flex: `0 0 ${100 / perPage}%` } : undefined}
                onClick={() => onCategorySelect(cat.id)}
              >
                {cat.img ? (
                  <img src={cat.img} alt={cat.category} className={styles.gallery__img} loading="lazy" />
                ) : (
                  <div className={styles.gallery__imgPlaceholder} aria-hidden="true" />
                )}
                <span className={styles.gallery__cardEn}>{cat.categoryEn}</span>
                <span className={styles.gallery__cardName}>{cat.category}</span>
              </button>
            );
          })}
        </div>
      </div>
      {showSliderNav && (
        <div className={styles.gallery__ctrl}>
          <div className={styles.gallery__dots} role="tablist" aria-label="ページ">
            {Array.from({ length: totalPages }).map((_, p) => (
              <button
                key={p}
                type="button"
                role="tab"
                aria-selected={p === page}
                aria-label={`ページ ${p + 1}`}
                className={[
                  styles.gallery__dot,
                  p === page ? styles['gallery__dot--active'] : '',
                ].join(' ')}
                onClick={() => setPage(p)}
              />
            ))}
          </div>
          <div className={styles.gallery__navs}>
            <button type="button" className={styles.gallery__navBtn} onClick={goPrev} aria-label="前へ">‹</button>
            <button type="button" className={styles.gallery__navBtn} onClick={goNext} aria-label="次へ">›</button>
          </div>
        </div>
      )}
    </div>
  );
}
