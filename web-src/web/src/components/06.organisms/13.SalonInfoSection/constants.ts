import { ADDRESS_JA, PHONE, MAP_URL } from '@/utils/constants';
import type { HoursRow } from '@/hooks/useOpenNow';
import type { ContactItem, LocationInfoItem, PaymentMethod, QuickAction } from './types';

import salonLogo from "@/assets/svg/logo/logo.svg";
// import SALON_LOGO from "@/assets/svg/logo/logo.svg";
import visaLogo from '@/assets/icons/payments/visa.svg';
import mastercardLogo from '@/assets/icons/payments/mastercard.svg';
import googlePayLogo from "@/assets/icons/payments/GooglePay.svg"; 
import paypalLogo from '@/assets/icons/payments/paypal.svg';
import mapPinIcon from '@/assets/icons/info/location.svg';
import phoneIcon from '@/assets/icons/info/support.svg';
import mailIcon from '@/assets/icons/info/feedback.svg';

export { ADDRESS_JA, PHONE, MAP_URL, salonLogo };

export const MAIL = 'salon@example.com';

const TEL_HREF = `tel:${PHONE.replace(/-/g, '')}`;

// Front-desk hours for this section — closed Mondays + the 2nd Tuesday of
// the month. Intentionally separate from the booking calendar's Wednesday
// closure in ReservationForm: opening hours and bookable hours are
// different business rules and shouldn't share one source of truth.
export const HOURS: HoursRow[] = [
  { day: 'Mon', open: '', close: '', closed: true },
  { day: 'Tue', open: '', close: '', closed: true },
  { day: 'Wed', open: '10:00', close: '20:00', closed: false },
  { day: 'Thu', open: '10:00', close: '20:00', closed: false },
  { day: 'Fri', open: '10:00', close: '20:00', closed: false },
  { day: 'Sat', open: '10:00', close: '19:00', closed: false },
  { day: 'Sun', open: '10:00', close: '19:00', closed: false },
];

export const CLOSED_NOTE = '毎週　月曜日・第2火曜日';

export const PAYMENT_METHODS: readonly PaymentMethod[] = [
  { src: visaLogo, alt: 'Visa' },
  { src: mastercardLogo, alt: 'Mastercard' },
  { src: googlePayLogo, alt: 'Google Pay' },
  { src: paypalLogo, alt: 'PayPal' },
];

export const MAP_QUICK_ACTIONS: readonly QuickAction[] = [
  { icon: mapPinIcon, label: 'Google マップを開く', href: MAP_URL },
  { icon: phoneIcon, label: '電話をかける', href: TEL_HREF },
  { icon: mailIcon, label: 'メールを送る', href: `mailto:${MAIL}` },
];

export const CONTACT_INFO: readonly ContactItem[] = [
  { label: '住所', info: ADDRESS_JA, cta: 'OPEN MAP', href: MAP_URL, external: true },
  { label: 'TEL', info: PHONE, cta: 'CALL NOW', href: TEL_HREF, external: false },
  { label: 'MAIL', info: MAIL, cta: 'SEND EMAIL', href: `mailto:${MAIL}`, external: false },
];

export const LOCATION_INFO: readonly LocationInfoItem[] = [
  { title: 'アクセス', info: ADDRESS_JA, note: '原宿駅 竹下口 徒歩3分' },
  { title: '駐車場', info: '', note: '２台完備 / ２ Spaces' },
];
