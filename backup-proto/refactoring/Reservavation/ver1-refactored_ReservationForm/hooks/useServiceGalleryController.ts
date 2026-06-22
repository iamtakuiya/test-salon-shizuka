// hooks/useServiceGalleryController.ts

import { useCallback, useEffect, useMemo, useState } from 'react';

/** Cards shown in the desktop 2×3 grid before pagination kicks in. */
const DESKTOP_GRID_CAPACITY = 6;

type Props = {
  totalItems: number;
};

export function useServiceGalleryController({ totalItems }: Props) {
  const [page, setPage]       = useState(0);
  const [perPage, setPerPage] = useState(1);
  const [isGrid, setIsGrid]   = useState(false);

  const updateLayout = useCallback(() => {
    const w = window.innerWidth;

    if (w >= 1024) {
      // Laptop+: 2×3 static grid; pagination only when items > 6
      setIsGrid(true);
      setPerPage(DESKTOP_GRID_CAPACITY);
    } else if (w >= 768) {
      // Tablet: 2-card slider
      setIsGrid(false);
      setPerPage(2);
    } else {
      // Mobile: 1-card slider
      setIsGrid(false);
      setPerPage(1);
    }
  }, []);

  useEffect(() => {
    updateLayout();
    window.addEventListener('resize', updateLayout);
    return () => window.removeEventListener('resize', updateLayout);
  }, [updateLayout]);

  // Reset to page 0 whenever perPage changes (e.g. on resize)
  useEffect(() => {
    setPage(0);
  }, [perPage]);

  const totalPages = useMemo(
    () => Math.ceil(totalItems / perPage),
    [totalItems, perPage],
  );

  // Show slider nav when in slider mode, or in grid mode but items overflow one page
  const showSliderNav = !isGrid || totalItems > DESKTOP_GRID_CAPACITY;

  function next() {
    setPage((p) => (p + 1 >= totalPages ? 0 : p + 1));
  }

  function prev() {
    setPage((p) => (p - 1 < 0 ? totalPages - 1 : p - 1));
  }

  function goTo(index: number) {
    setPage(Math.max(0, Math.min(index, totalPages - 1)));
  }

  return {
    page,
    perPage,
    isGrid,
    totalPages,
    showSliderNav,
    DESKTOP_GRID_CAPACITY,
    next,
    prev,
    goTo,
  };
}