import { MenuItem } from './constants';

// ─── Price formatter ─────────────────────────────────────────────────────────
export function formatPrice(item: MenuItem): string {
  const base = `¥${item.price.toLocaleString('ja-JP')}`;
  if (item.isAdditionalFee) return `+${base}${item.isStartingPrice ? '〜' : ''}`;
  if (item.isStartingPrice)  return `${base}〜`;
  return base;
}
