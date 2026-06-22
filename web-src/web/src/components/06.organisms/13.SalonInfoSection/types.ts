export interface PaymentMethod {
  src: string;
  alt: string;
}

export interface QuickAction {
  icon: string;
  label: string;
  href: string;
}

export interface ContactItem {
  label: string;
  info: string;
  cta: string;
  href: string;
  external: boolean;
}

export interface LocationInfoItem {
  title: string;
  info: string;
  note: string;
}
