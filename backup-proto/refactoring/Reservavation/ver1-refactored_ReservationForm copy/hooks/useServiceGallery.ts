import { useState } from "react";

export function useServiceGallery() {

  /** Slider page index — one "page" = perPage cards */
  const [page, setPage] = useState(0);
  
    /** Number of cards per slide — recalculated on resize */
  const [perPage, setPerPage] = useState(1);
  
    /** Whether we're in desktop grid mode */
  const [isGrid, setIsGrid] = useState(false);

  return (
    page,
    perPage,
    isGrid,
  );
}
