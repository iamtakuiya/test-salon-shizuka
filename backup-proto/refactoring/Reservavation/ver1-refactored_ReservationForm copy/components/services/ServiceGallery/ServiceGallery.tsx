import { useState, useRef, useEffect, useCallback } from 'react';

import styles from './ServiceGallery.module.scss'

import { MENU_CATEGORIES, DESKTOP_GRID_CAPACITY } from '@/utils/constants';
/**
 * ServiceGallery
 *
 * Breakpoint behaviour:
 *   Mobile  (<768 px)  → 1 card visible, arrow + dot slider
 *   Tablet  (<1024 px) → 2 cards visible side-by-side, arrow + dot slider
 *   Laptop+ (≥1024 px) → 2×3 grid; slider nav only when items > 6
 */
export function ServiceGallery({
  activeCategoryId,
  onCategorySelect,
}: {
  activeCategoryId: string;
  onCategorySelect: (id: string) => void;
}) {
  const total = MENU_CATEGORIES.length;

  /** Slider page index — one "page" = perPage cards */
  const [page, setPage] = useState(0);

  /** Number of cards per slide — recalculated on resize */
  const [perPage, setPerPage] = useState(1);

  /** Whether we're in desktop grid mode */
  const [isGrid, setIsGrid] = useState(false);

  const trackRef = useRef<HTMLDivElement>(null);

  // Keep active category's page in view when activeCategoryId changes externally
  useEffect(() => {
    const idx = MENU_CATEGORIES.findIndex((c) => c.id === activeCategoryId);
    if (idx < 0) return;
    const targetPage = Math.floor(idx / perPage);
    setPage(targetPage);
  }, [activeCategoryId, perPage]);


  // OPTION: IF desktop layout is grid, then apply this updateLayout
  // const updateLayout = useCallback(() => {
  //   const w = window.innerWidth;
  //   if (w >= 1024) {
  //     setIsGrid(true);
  //     setPerPage(DESKTOP_GRID_CAPACITY);
  //   } else if (w >= 768) {
  //     setIsGrid(false);
  //     setPerPage(2);
  //   } else {
  //     setIsGrid(false);
  //     setPerPage(1);
  //   }
  // }, []);

  const updateLayout = useCallback(() => {
    const w = window.innerWidth;
    if (w >= 768) {
      // Both Tablet and Desktop now use the 2-card slider layout
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

  const totalPages      = Math.ceil(total / perPage);
  const showSliderNav   = !isGrid || total > DESKTOP_GRID_CAPACITY;
  const visibleStart    = page * perPage;
  const visibleCats     = isGrid
    ? MENU_CATEGORIES.slice(visibleStart, visibleStart + DESKTOP_GRID_CAPACITY)
    : MENU_CATEGORIES; // slider uses CSS transform — all cats rendered

  const slideOffset = isGrid ? 0 : (page * (100 / perPage));

  function goPrev() {
    setPage((p) => (p === 0 ? totalPages - 1 : p - 1));
  }
  function goNext() {
    setPage((p) => (p === totalPages - 1 ? 0 : p + 1));
  }

  return (
    <div className={styles.gallery}>
      {/* ── Card track ── */}
      <div className={styles.gallery__viewport}>
        <div
          ref={trackRef}
          className={[
            styles.gallery__track,
            isGrid ? styles['gallery__track--grid'] : '',
          ].join(' ')}
          style={!isGrid ? { transform: `translateX(-${slideOffset}%)` } : undefined}
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
                style={!isGrid ? { flex: `0 0 ${100 / perPage}%` } : undefined}
                onClick={() => onCategorySelect(cat.id)}
              >
                {cat.img ? (
                  <img
                    src={cat.img}
                    alt={cat.category}
                    className={styles.gallery__img}
                    loading="lazy"
                  />
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

      {/* ── Slider controls (hidden in grid mode when ≤ 6 items) ── */}
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
            <button
              type="button"
              className={styles.gallery__navBtn}
              onClick={goPrev}
              aria-label="前へ"
            >
              ‹
            </button>
            <button
              type="button"
              className={styles.gallery__navBtn}
              onClick={goNext}
              aria-label="次へ"
            >
              ›
            </button>
          </div>
        </div>
      )}
    </div>
  );
}