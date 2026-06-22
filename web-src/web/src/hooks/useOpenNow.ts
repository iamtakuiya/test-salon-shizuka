import { useEffect, useState } from 'react';

export interface HoursRow {
  day: string;
  open: string;
  close: string;
  closed: boolean;
}

/**
 * Computes whether the salon is currently open from a Mon-first HOURS table
 * (Mon=0 ... Sun=6), re-checking once a minute so any "open now" badge
 * flips automatically without a page refresh.
 */
export function useOpenNow(hours: readonly HoursRow[]): boolean {
  const [isOpen, setIsOpen] = useState(() => checkIsOpen(hours));

  useEffect(() => {
    setIsOpen(checkIsOpen(hours));
    const id = setInterval(() => setIsOpen(checkIsOpen(hours)), 60_000);
    return () => clearInterval(id);
    // `hours` is a module-level constant in practice; re-running on identity
    // change (not deep-equality) is the correct, cheap behavior here.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hours]);

  return isOpen;
}

function checkIsOpen(hours: readonly HoursRow[]): boolean {
  const now = new Date();

  // JS Date#getDay(): 0=Sun..6=Sat — remap to Mon-first (Mon=0 ... Sun=6)
  // to match how HOURS tables are authored across this project.
  const jsDay = now.getDay();
  const mondayFirstIndex = jsDay === 0 ? 6 : jsDay - 1;
  const today = hours[mondayFirstIndex];

  if (!today || today.closed || !today.open || !today.close) return false;

  const [openH, openM] = today.open.split(':').map(Number);
  const [closeH, closeM] = today.close.split(':').map(Number);
  const nowMinutes = now.getHours() * 60 + now.getMinutes();

  return nowMinutes >= openH * 60 + openM && nowMinutes < closeH * 60 + closeM;
}
