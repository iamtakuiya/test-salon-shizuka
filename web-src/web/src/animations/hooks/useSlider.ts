/**
 * useSlider
 * ─────────
 * Pure slider state + navigation logic.
 * No DOM, no GSAP — just the numbers and callbacks.
 * Consumed by <ImageSlider> and also directly by sections
 * that want full control over rendering.
 */

import {
  useMemo,
  useState,
} from 'react';

interface UseSliderProps {
  totalItems: number;
  visibleItems: number;
}

export function useSlider({
  totalItems,
  visibleItems,
}: UseSliderProps) {
  const [current, setCurrent] =
    useState(0);

  const maxIndex = useMemo(
    () =>
      Math.max(
        0,
        totalItems - visibleItems
      ),
    [totalItems, visibleItems]
  );

  const totalSteps =
    maxIndex + 1;

  const next = () => {
    setCurrent((prev) =>
      prev >= totalItems - 1
        ? 0
        : prev + 1
    );
  };

  const prev = () => {
    setCurrent((prev) =>
      prev <= 0
        ? totalItems - 1
        : prev - 1
    );
  };

  const goTo = (
    index: number
  ) => {
    setCurrent(index);
  };

  return {
    current,
    next,
    prev,
    goTo,
    totalSteps,
  };
}