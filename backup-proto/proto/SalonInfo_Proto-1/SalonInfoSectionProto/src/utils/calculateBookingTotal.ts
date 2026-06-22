import type { MenuItem } from '@/utils/constants';

export function calculateBookingTotal(
  selectedItems: Record<string, MenuItem>,
  selectedAddons: {
    price: number;
  }[]
) {
  const serviceTotal =
    Object.values(selectedItems)
      .filter(Boolean)
      .reduce((sum, item) => sum + item.price, 0);

  const addonTotal =
    selectedAddons.reduce(
      (sum, addon) => sum + addon.price,
      0
    );

  return serviceTotal + addonTotal;
}