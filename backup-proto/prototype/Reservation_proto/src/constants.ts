// src/utils/constants.ts

// ─── Types ───────────────────────────────────────────────────────────────────

export interface MenuItem {
  name: string;
  /** Short English label — used in booking confirmations and Redux state */
  nameEn?: string;
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

export const MENU_CATEGORIES: MenuCategory[] = [
  {
    id: "cut",
    category: "ヘアカット",
    categoryEn: "Hair Cut",
    categoryDescription:
      "骨格や髪質、生え癖を見極め、乾かすだけで美しくまとまる再現性の高いスタイルをご提案します。",
    img: "https://images.unsplash.com/photo-1634449571010-02389ed0f9b0?q=80&w=1200&auto=format&fit=crop",
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
    img: "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=1200&auto=format&fit=crop",
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
    img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1200&auto=format&fit=crop",
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
    img: "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?q=80&w=1200&auto=format&fit=crop",
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
    img: "https://images.unsplash.com/photo-1519415510236-8a37f2047a58?q=80&w=1200&auto=format&fit=crop",
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
    img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=1200&auto=format&fit=crop",
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
  "価格は全て税込表示です。",
  "※施術内容により価格が変動する場合がございます。詳しくはカウンセリング時にご確認ください。",
  "パーマ・縮毛矯正メニューには、すべてカット料金が含まれております。",
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
  {
    id: "cut",
    name: "Standard Cut",
    nameJa: "スタンダードカット",
    price: 6050,
    duration: "60分",
  },
  {
    id: "color-short",
    name: "Color (Short)",
    nameJa: "ヘアカラー（ショート）",
    price: 6600,
    duration: "90分",
  },
  {
    id: "color-medium",
    name: "Color (Medium)",
    nameJa: "ヘアカラー（ミディアム）",
    price: 7150,
    duration: "100分",
  },
  {
    id: "color-long",
    name: "Color (Long)",
    nameJa: "ヘアカラー（ロング）",
    price: 7700,
    duration: "110分",
  },
  {
    id: "perm-short",
    name: "Perm (Short)",
    nameJa: "パーマ（ショート）",
    price: 12100,
    duration: "90分",
  },
  {
    id: "perm-medium",
    name: "Perm (Medium)",
    nameJa: "パーマ（ミディアム）",
    price: 12650,
    duration: "100分",
  },
  {
    id: "perm-long",
    name: "Perm (Long)",
    nameJa: "パーマ（ロング）",
    price: 13200,
    duration: "110分",
  },
  {
    id: "straight-s",
    name: "Straightening (S)",
    nameJa: "縮毛矯正（ショート）",
    price: 20900,
    duration: "150分",
  },
  {
    id: "straight-m",
    name: "Straightening (M)",
    nameJa: "縮毛矯正（ミディアム）",
    price: 22000,
    duration: "165分",
  },
  {
    id: "straight-l",
    name: "Straightening (L)",
    nameJa: "縮毛矯正（ロング）",
    price: 23100,
    duration: "180分",
  },
];

export const ADDONS: ServiceItem[] = [
  {
    id: "treatment-quick",
    name: "Quick Treatment",
    nameJa: "クイックトリートメント",
    price: 3850,
    duration: "30分",
  },
  {
    id: "treatment-flaudia",
    name: "Flaudia Treatment",
    nameJa: "フローディア トリートメント",
    price: 6050,
    duration: "45分",
  },
  {
    id: "head-spa",
    name: "Premium Head Spa",
    nameJa: "極上ヘッドスパ",
    price: 3850,
    duration: "30分",
  },
  {
    id: "shampoo-blow",
    name: "Shampoo & Blow",
    nameJa: "シャンプー・ブロー",
    price: 1980,
    duration: "30分",
  },
  {
    id: "fringe-cut",
    name: "Fringe Cut",
    nameJa: "前髪カット",
    price: 1650,
    duration: "15分",
  },
  {
    id: "eyebrow",
    name: "Eyebrow Trim",
    nameJa: "眉カット",
    price: 550,
    duration: "10分",
  },
];

// ─── Booking time slots ───────────────────────────────────────────────────────

export const TIME_SLOTS: string[] = [
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
];

// ─── Location constants ───────────────────────────────────────────────────────

export const ADDRESS_JA = "東京都渋谷区神宮前1-1-1";
export const PHONE = "03-0000-0000";
export const MAP_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  ADDRESS_JA
)}`;

export const HOURS = [
  { day: "Mon", dayJa: "月", open: "10:00", close: "20:00", closed: false },
  { day: "Tue", dayJa: "火", open: "10:00", close: "20:00", closed: false },
  { day: "Wed", dayJa: "水", open: "", close: "", closed: true },
  { day: "Thu", dayJa: "木", open: "10:00", close: "20:00", closed: false },
  { day: "Fri", dayJa: "金", open: "10:00", close: "20:00", closed: false },
  { day: "Sat", dayJa: "土", open: "10:00", close: "19:00", closed: false },
  { day: "Sun", dayJa: "日", open: "10:00", close: "19:00", closed: false },
] as const;
