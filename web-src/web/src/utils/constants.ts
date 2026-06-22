// src/utils/constants.ts

// ─── Types ───────────────────────────────────────────────────────────────────

export interface MenuItem {
  name: string;
  /** Short English label — used in booking confirmations and Redux state */
  nameEn?: string;
  nameJa?: string;
  /** Shown in brackets next to the category or item title */
  includes?: string;
  price: number;
  /** Approximate duration string, e.g. "60分" — used in booking flow */
  duration?: string;
  /** If true, render price as "¥X〜" */
  isStartingPrice?: boolean;
  /** If true, render price as "+¥X" */
  isAdditionalFee?: boolean;
  description?: string;
}

export interface MenuCategory {
  /** Unique stable ID — used as React key and booking service ID */
  id: string;
  category: string;
  categoryEn: string;
  categoryDescription?: string;
  img?: string;
  /** Shown in brackets next to the category title, e.g. "シャンプー・ブロー別" */
  includes?: string;
  /** Shown in a bordered note box at the bottom of the category */
  notes?: string;
  items: MenuItem[];
}


// ─── Menu data ───────────────────────────────────────────────────────────────
import SERVICE01 from '@/assets/images/06.services/service-01.png';
import SERVICE02 from '@/assets/images/06.services/service-02.png';
import SERVICE03 from '@/assets/images/06.services/service-03.png';
import SERVICE04 from '@/assets/images/06.services/service-04.png';
import SERVICE05 from '@/assets/images/06.services/service-05.png';
import SERVICE06 from '@/assets/images/06.services/service-06.png';

export const MENU_CATEGORIES: MenuCategory[] = [
  {
    id: "cut",
    category: "ヘアカット",
    categoryEn: "Hair Cut",
    categoryDescription:
      "骨格や髪質、生え癖を見極め、乾かすだけで美しくまとまる再現性の高いスタイルをご提案します。",
    img: SERVICE01,
    items: [
      {
        name: "スタンダードカット",
        nameEn: "Standard Cut",
        includes: "カット・シャンプー・ブロー込",
        price: 6050,
        duration: "60分",
        description:
          "お客様の日常に溶け込む、お手入れのしやすいベースカットです。",
      },
      {
        name: "前髪カット",
        nameEn: "Fringe Cut",
        price: 1650,
        duration: "15分",
        description: "第一印象を左右する繊細なラインを丁寧に整えます。",
      },
      {
        name: "眉カット",
        nameEn: "Eyebrow Trim",
        price: 550,
        duration: "10分",
        description:
          "お顔の骨格に合わせて、ナチュラルで洗練された印象に仕上げます。",
      },
    ],
  },
  {
    id: "color",
    category: "ヘアカラー",
    categoryEn: "Hair Color",
    categoryDescription:
      "髪と頭皮への負担を抑えたこだわりの薬剤を使用。あなた本来の肌の透明感を引き出す、柔らかく艶やかな色味を表現します。",
    img: SERVICE02,
    includes: "シャンプー・ブロー別",
    notes:
      "カラー単品でのご利用の場合は、別途シャンプー・ブロー料金（¥1,980）を頂戴いたします。カット等、他のブロー込みメニューと組み合わせる場合は追加料金はかかりません。",
    items: [
      {
        name: "ショート",
        nameEn: "Short",
        price: 6600,
        duration: "90分",
      },
      {
        name: "ミディアム",
        nameEn: "Medium",
        price: 7150,
        duration: "100分",
      },
      {
        name: "ロング",
        nameEn: "Long",
        price: 7700,
        duration: "110分",
      },
      {
        name: "スーパーロング",
        nameEn: "Super Long",
        price: 8800,
        duration: "120分",
      },
      {
        name: "ダブルカラー",
        nameEn: "Double Color",
        includes: "ケアブリーチ＋カラー",
        price: 8800,
        duration: "150分",
        isStartingPrice: true,
        isAdditionalFee: true,
        description: "透明感や立体感をより引き出すための特別メニューです。",
      },
    ],
  },
  {
    id: "perm",
    category: "スタンダードパーマ",
    categoryEn: "Perm",
    categoryDescription:
      "髪に優しい薬剤で、ふんわりと柔らかな質感を生み出します。",
    img: SERVICE03,
    includes: "カット・シャンプー・ブロー込",
    items: [
      {
        name: "ショート",
        nameEn: "Short",
        price: 12100,
        duration: "90分",
      },
      {
        name: "ミディアム",
        nameEn: "Medium",
        price: 12650,
        duration: "100分",
      },
      {
        name: "ロング",
        nameEn: "Long",
        price: 13200,
        duration: "110分",
      },
      {
        name: "スパイラルパーマ",
        nameEn: "Spiral Perm",
        price: 2200,
        duration: "30分",
        isStartingPrice: true,
        isAdditionalFee: true,
      },
      {
        name: "ポイントパーマ",
        nameEn: "Point Perm",
        includes: "シャンプー・ブロー別",
        price: 3850,
        duration: "60分",
        isStartingPrice: true,
        description:
          "前髪やトップなど、ボリュームが欲しい部分にピンポイントで動きをつけます。",
      },
      {
        name: "ストレートパーマ",
        nameEn: "Straight Perm",
        includes: "シャンプー・ブロー別",
        price: 7700,
        duration: "90分",
        isStartingPrice: true,
        description: "ボリュームを自然に抑え、扱いやすい髪へと導きます。",
      },
    ],
  },
  {
    id: "straight",
    category: "縮毛矯正",
    categoryEn: "Straightening",
    categoryDescription:
      "髪の体力を守る「酸性ストレート」などを用い、シルクのような艶と柔らかな手触りを叶える本格髪質改善です。",
    img: SERVICE04,
    includes: "カット・シャンプー・ブロー込",
    items: [
      {
        name: "ショート",
        nameEn: "Short",
        price: 20900,
        duration: "150分",
      },
      {
        name: "ミディアム",
        nameEn: "Medium",
        price: 22000,
        duration: "165分",
      },
      {
        name: "ロング",
        nameEn: "Long",
        price: 23100,
        duration: "180分",
      },
      {
        name: "ポイントストレート",
        nameEn: "Point Straight",
        includes: "シャンプー・ブロー別",
        price: 6600,
        duration: "90分",
        isStartingPrice: true,
        description:
          "顔まわりや前髪など、特に気になる部分のクセを綺麗に伸ばします。",
      },
    ],
  },
  {
    id: "treatment",
    category: "トリートメント ＆ ヘッドスパ",
    categoryEn: "Treatment & Head Spa",
    categoryDescription:
      "厳選されたヘアケアプログラムで、髪本来の健やかな美しさと、心安らぐ贅沢な癒やしをお届けします。",
    img: SERVICE05,
    items: [
      {
        name: "クイックトリートメント",
        nameEn: "Quick Treatment",
        includes: "シャンプー・ブロー別",
        price: 3850,
        duration: "30分",
        description: "お急ぎの時にも、髪の表面を滑らかに整えるお手軽なケア。",
      },
      {
        name: "フローディア トリートメント",
        nameEn: "Flaudia Treatment",
        includes: "シャンプー・ブロー別",
        price: 6050,
        duration: "45分",
        description:
          "髪の記憶を補修する医学発想のシステムトリートメント。芯から潤う本質的な髪質改善を。",
      },
      {
        name: "極上ヘッドスパ",
        nameEn: "Premium Head Spa",
        includes: "シャンプー・ブロー別",
        price: 3850,
        duration: "30分",
        description:
          "日々の疲れや頭皮の緊張をほぐし、根本からの立ち上がりと深いリラクゼーションを促します。",
      },
    ],
  },
  {
    id: "other",
    category: "その他",
    categoryEn: "Other",
    categoryDescription:
      "特別な日のヘアセットや、日常のスタイリングまで幅広くご対応いたします。",
    img: SERVICE06,
    items: [
      {
        name: "シャンプー・ブロー",
        nameEn: "Shampoo & Blow",
        price: 1980,
        duration: "30分",
        description:
          "カラーやトリートメント単品メニューと組み合わせてご利用ください。",
      },
      {
        name: "ヘアセット（アップスタイル）",
        nameEn: "Hair Set (Up Style)",
        price: 6050,
        duration: "60分",
        description:
          "結婚式や特別な日のお出かけに、崩れにくく華やかなスタイルを。",
      },
      {
        name: "アレンジ・スタイリング",
        nameEn: "Styling",
        price: 4400,
        duration: "45分",
        isStartingPrice: true,
        description:
          "カジュアルなパーティーや、少し気分を上げたい普段の日のお出かけに。",
      },
    ],
  },
];


export const MENU_FOOTER_NOTES: string[] = [
  '価格は全て税込表示です。',
  '※施術内容により価格が変動する場合がございます。詳しくはカウンセリング時にご確認ください。',
  'パーマ・縮毛矯正メニューには、すべてカット料金が含まれております。',
];

// ─── Legacy flat arrays — kept for ReservationForm / bookingSlice ────────────
// These are the simple flat lists the booking flow uses. Add or remove items
// here independently of the display menu above.

export interface ServiceItem {
  id: string;
  name: string;
  nameJa: string;
  price: number;
  duration: string;
}

export const SERVICES: ServiceItem[] = [
  { id: 'cut',           name: 'Standard Cut',      nameJa: 'スタンダードカット',         price: 6050,  duration: '60分'  },
  { id: 'color-short',   name: 'Color (Short)',      nameJa: 'ヘアカラー（ショート）',     price: 6600,  duration: '90分'  },
  { id: 'color-medium',  name: 'Color (Medium)',     nameJa: 'ヘアカラー（ミディアム）',   price: 7150,  duration: '100分' },
  { id: 'color-long',    name: 'Color (Long)',       nameJa: 'ヘアカラー（ロング）',       price: 7700,  duration: '110分' },
  { id: 'perm-short',    name: 'Perm (Short)',       nameJa: 'パーマ（ショート）',         price: 12100, duration: '90分'  },
  { id: 'perm-medium',   name: 'Perm (Medium)',      nameJa: 'パーマ（ミディアム）',       price: 12650, duration: '100分' },
  { id: 'perm-long',     name: 'Perm (Long)',        nameJa: 'パーマ（ロング）',           price: 13200, duration: '110分' },
  { id: 'straight-s',   name: 'Straightening (S)',  nameJa: '縮毛矯正（ショート）',       price: 20900, duration: '150分' },
  { id: 'straight-m',   name: 'Straightening (M)',  nameJa: '縮毛矯正（ミディアム）',     price: 22000, duration: '165分' },
  { id: 'straight-l',   name: 'Straightening (L)',  nameJa: '縮毛矯正（ロング）',         price: 23100, duration: '180分' },
];

export const ADDONS: ServiceItem[] = [
  { id: 'treatment-quick',    name: 'Quick Treatment',     nameJa: 'クイックトリートメント',          price: 3850, duration: '30分' },
  { id: 'treatment-flaudia',  name: 'Flaudia Treatment',   nameJa: 'フローディア トリートメント',     price: 6050, duration: '45分' },
  { id: 'head-spa',           name: 'Premium Head Spa',    nameJa: '極上ヘッドスパ',                  price: 3850, duration: '30分' },
  { id: 'shampoo-blow',       name: 'Shampoo & Blow',      nameJa: 'シャンプー・ブロー',              price: 1980, duration: '30分' },
  { id: 'fringe-cut',         name: 'Fringe Cut',          nameJa: '前髪カット',                      price: 1650, duration: '15分' },
  { id: 'eyebrow',            name: 'Eyebrow Trim',        nameJa: '眉カット',                        price: 550,  duration: '10分' },
];

// ─── Booking time slots ───────────────────────────────────────────────────────

export const TIME_SLOTS: string[] = [
  '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30',
  '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00', '17:30',
  '18:00', '18:30',
];

export const DAYS_JA = ["日", "月", "火", "水", "木", "金", "土"];

export const MONTHS_EN = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/** Max cards shown in the desktop 2×3 gallery before slider nav appears */
export const DESKTOP_GRID_CAPACITY = 6;

// ─── Location constants ───────────────────────────────────────────────────────
// Payment Provider Logos
import visaLogo from "@/assets/icons/payments/Visa.svg";
import mastercardLogo from "@/assets/icons/payments/Mastercard.svg";
import googlePayLogo from "@/assets/icons/payments/GooglePay.svg"; 
import payPalLogo from "@/assets/icons/payments/PayPal.svg";

// Quick Action Icons (Overlaying the Map)
import mapPinIcon from "@/assets/icons/info/Location.svg";
import phoneIcon from "@/assets/icons/info/Support.svg";
import mailIcon from "@/assets/icons/info/Feedback.svg";

export const ADDRESS_JA = '東京都渋谷区神宮前1-1-1';
export const PHONE      = '03-0000-0000';
export const MAIL = "salon@example.com";
export const MAP_URL    = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS_JA)}`;

export const HOURS = [
  { day: "Mon", dayJa: "月", open: "", close: "", closed: true },
  { day: "Tue", dayJa: "火", open: "", close: "", closed: true },
  { day: "Wed", dayJa: "水", open: "10:00", close: "20:00", closed: false },
  { day: "Thu", dayJa: "木", open: "10:00", close: "20:00", closed: false },
  { day: "Fri", dayJa: "金", open: "10:00", close: "20:00", closed: false },
  { day: "Sat", dayJa: "土", open: "10:00", close: "19:00", closed: false },
  { day: "Sun", dayJa: "日", open: "10:00", close: "19:00", closed: false },
] as const;

export const PAYMENT_METHODS = [
  { src: visaLogo, alt: "Visa" },
  { src: mastercardLogo, alt: "Mastercard" },
  { src: googlePayLogo, alt: "Google Pay" },
  { src: payPalLogo, alt: "PayPal" },
] as const;

export const MAP_QUICK_ACTIONS = [
  { src: mapPinIcon, label: "Google マップを開く", href: MAP_URL },
  { src: phoneIcon, label: "電話をかける", href: `tel:${PHONE}` },
  { src: mailIcon, label: "メールを送る", href: `mailto:${MAIL}` },
] as const;

export const CONTACT_INFO = [
  {
    label: "住所",
    info: ADDRESS_JA,
    cta: "OPEN MAP",
    href: MAP_URL,
    rel: "noopener noreferrer",
    target: "_blank",
  },
  {
    label: "TEL",
    info: PHONE,
    cta: "CALL NOW",
    href: `tel:${PHONE}`,
    rel: "",
    target: "_self",
  },
  {
    label: "MAIL",
    info: MAIL,
    cta: "SEND EMAIL",
    href: `mailto:${MAIL}`,
    rel: "",
    target: "_self",
  },
] as const;

export const LOCATION_INFO = [
  { title: "アクセス", info: `${ADDRESS_JA}`, note: "原宿駅 竹下口 徒歩3分" },
  { title: "駐車場", info: "", note: "２台完備 / ２Spaces" },
] as const;
