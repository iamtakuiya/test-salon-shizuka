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

type ServiceGalleryProps = {
  page: number;
  totalPages: number;
  onNext: () => void;
  onPrev: () => void;
  onPageSelect: (index: number) => void;
  perPage: number;
  isGrid: boolean;
  activeCategoryId: string;
  onCategorySelect: (id: string) => void;
};

export function ServiceGallery({
  page,
  totalPages,
  onNext,
  onPrev,
  onPageSelect,
  perPage,
  isGrid,
  activeCategoryId,
  onCategorySelect,
}: ServiceGalleryProps) {
  
  // Keep active category's page in view when activeCategoryId changes externally
  useEffect(() => {
    const idx = MENU_CATEGORIES.findIndex((c) => c.id === activeCategoryId);
    if (idx < 0) return;
    const targetPage = Math.floor(idx / perPage);
    onPageSelect(targetPage);
  }, [activeCategoryId, perPage, onPageSelect]);

  const total = MENU_CATEGORIES.length;
  const showSliderNav = !isGrid || total > DESKTOP_GRID_CAPACITY;
  const visibleStart = page * perPage;
  
  // Choose between desktop grid slices or slider tracks cleanly
  const visibleCats = isGrid
    ? MENU_CATEGORIES.slice(visibleStart, visibleStart + DESKTOP_GRID_CAPACITY)
    : MENU_CATEGORIES;

  const slideOffset = isGrid ? 0 : page * (100 / perPage);

  return (
    <div className={styles.gallery}>
      {/* ── Card track ── */}
      <div className={styles.gallery__viewport}>
        <div
          className={[
            styles.gallery__track,
            isGrid ? styles['gallery__track--grid'] : '',
          ].join(' ')}
          style={!isGrid ? { transform: `translateX(-${slideOffset}%)` } : undefined}
        >
          {visibleCats.map((cat) => {
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

      {/* ── Slider controls ── */}
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
                onClick={() => onPageSelect(p)}
              />
            ))}
          </div>

          <div className={styles.gallery__navs}>
            <button
              type="button"
              className={styles.gallery__navBtn}
              onClick={onPrev}
              disabled={page === 0} // Optional visual benefit of updated controller hook mechanics
              aria-label="前へ"
            >
              ‹
            </button>
            <button
              type="button"
              className={styles.gallery__navBtn}
              onClick={onNext}
              disabled={page === totalPages - 1} // Optional benefit
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