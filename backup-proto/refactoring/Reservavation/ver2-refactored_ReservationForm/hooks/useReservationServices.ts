import { useState } from "react";
import { MenuItem } from "@/utils/constants";
import { MENU_CATEGORIES } from "@/utils/constants";

export function useReservationServices() {
  const [selectedItems, setSelectedItems] =
    useState<Record<string, MenuItem>>({});

  const [activeCategoryId, setActiveCategoryId] =
    useState(MENU_CATEGORIES[0].id);

  const handleItemSelect = (
    categoryId: string,
    item: MenuItem
  ) => {
    setSelectedItems((prev) => ({
      ...prev,
      [categoryId]: item,
    }));
  };

  return {
    selectedItems,
    activeCategoryId,
    setActiveCategoryId,
    handleItemSelect,
  };
}