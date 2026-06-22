import { useState } from "react";

import { MENU_CATEGORIES } from "@/utils/constants";
import { MenuItem } from "@/utils/constants";

import { type ReservationStage } from "./useReservationStage";

export function useReservationController() {

  // Local category navigation & item selection
  // (items per category are picked locally then synced to Redux on submit)
  const [selectedItems, setSelectedItems] =
    useState<Record<string, MenuItem>>({});

  const [activeCategoryId, setActiveCategoryId] =
    useState(MENU_CATEGORIES[0].id);

  //   // View state
  const [stage, setStage] =
    useState<ReservationStage>('form');

  const [submitting, setSubmitting] =
    useState(false);

  const [submitError, setSubmitError] =
    useState(false);

  return {
    selectedItems,
    setSelectedItems,

    activeCategoryId,
    setActiveCategoryId,

    stage,
    setStage,

    submitting,
    setSubmitting,

    submitError,
    setSubmitError,
  };
}