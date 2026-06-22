// Data utils/constants.ts
export interface MenuItem {
  name: string;
  includes?: string;

  price: number;

  is_starting_price: boolean;
  is_additional_fee: boolean;

  description?: string;
}

export interface MenuCategory {
  category: string;
  category_description: string;

  includes?: string;
  notes?: string;

  items: MenuItem[];
}

export interface Services {
  currency: string;
  tax_included: boolean;

  footer_notes: string[];

  menu: MenuCategory[];
}

/**
 * Add the property of description if you want to add the value to the items. 
 * {
      name: "ショート",
      description: "Add_property_value_here",
    }
 *
  
*/

export const SERVICES:Services = {
  currency: "JPY",
  tax_included: true,

  footer_notes: [
    "価格は全て税込表示です。",
    "※施術内容により価格が変動する場合がございます。詳しくはカウンセリング時にご確認ください。",
    "パーマ・縮毛矯正メニューには、すべてカット料金が含まれております。",
  ],
  
  menu: [
    {
      category: "ヘアカット",
      category_description:
        "骨格や髪質、生え癖を見極め、乾かすだけで美しくまとまる再現性の高いスタイルをご提案します。",
      items: [
        {
          name: "スタンダードカット",
          includes: "カット・シャンプー・ブロー込",
          price: 6050,
          is_starting_price: false,
          is_additional_fee: false,
          description:
            "お客様の日常に溶け込む、お手入れのしやすいベースカットです。",
        },
        {
          name: "前髪カット",
          price: 1650,
          is_starting_price: false,
          is_additional_fee: false,
          description: "第一印象を左右する繊細なラインを丁寧に整えます。",
        },
        {
          name: "眉カット",
          price: 550,
          is_starting_price: false,
          is_additional_fee: false,
          description:
            "お顔の骨格に合わせて、ナチュラルで洗練された印象に仕上げます。",
        },
      ],
    },
    {
      category: "ヘアカラー",
      category_description:
        "髪と頭皮への負担を抑えたこだわりの薬剤を使用。あなた本来の肌の透明感を引き出す、柔らかく艶やかな色味を表現します。",
      includes: "シャンプー・ブロー別",
      notes:
        "カラー単品でのご利用の場合は、別途シャンプー・ブロー料金（¥1,980）を頂戴いたします。カット等、他のブロー込みメニューと組み合わせる場合は追加料金はかかりません。",
      items: [
        {
          name: "ショート",
          price: 6600,
          is_starting_price: false,
          is_additional_fee: false,
        },
        {
          name: "ミディアム",
          price: 7150,
          is_starting_price: false,
          is_additional_fee: false,
        },
        {
          name: "ロング",
          price: 7700,
          is_starting_price: false,
          is_additional_fee: false,
        },
        {
          name: "スーパーロング",
          price: 8800,
          is_starting_price: false,
          is_additional_fee: false,
        },
        {
          name: "ダブルカラー (ケアブリーチ＋カラー)",
          price: 8800,
          is_starting_price: true,
          is_additional_fee: true,
          description: "透明感や立体感をより引き出すための特別メニューです。",
        },
      ],
    },
    {
      category: "スタンダードパーマ",
      category_description:
        "髪に優しい薬剤で、ふんわりと柔らかな質感を生み出します。",
      includes: "カット・シャンプー・ブロー込",
      items: [
        {
          name: "ショート",
          price: 12100,
          is_starting_price: false,
          is_additional_fee: false,
        },
        {
          name: "ミディアム",
          price: 12650,
          is_starting_price: false,
          is_additional_fee: false,
        },
        {
          name: "ロング",
          price: 13200,
          is_starting_price: false,
          is_additional_fee: false,
        },
        {
          name: "スパイラルパーマ",
          price: 2200,
          is_starting_price: true,
          is_additional_fee: true,
        },
        {
          name: "ポイントパーマ",
          includes: "シャンプー・ブロー別",
          price: 3850,
          is_starting_price: true,
          is_additional_fee: false,
          description:
            "前髪やトップなど、ボリュームが欲しい部分にピンポイントで動きをつけます。",
        },
        {
          name: "ストレートパーマ",
          includes: "シャンプー・ブロー別",
          price: 7700,
          is_starting_price: true,
          is_additional_fee: false,
          description: "ボリュームを自然に抑え、扱いやすい髪へと導きます。",
        },
      ],
    },
    {
      category: "縮毛矯正",
      category_description:
        "髪の体力を守る「酸性ストレート」などを用い、シルクのような艶と柔らかな手触りを叶える本格髪質改善です。",
      includes: "カット・シャンプー・ブロー込",
      items: [
        {
          name: "ショート",
          price: 20900,
          is_starting_price: false,
          is_additional_fee: false,
        },
        {
          name: "ミディアム",
          price: 22000,
          is_starting_price: false,
          is_additional_fee: false,
        },
        {
          name: "ロング",
          price: 23100,
          is_starting_price: false,
          is_additional_fee: false,
        },
        {
          name: "ポイントストレート",
          includes: "シャンプー・ブロー別",
          price: 6600,
          is_starting_price: true,
          is_additional_fee: false,
          description:
            "顔まわりや前髪など、特に気になる部分のクセを綺麗に伸ばします。",
        },
      ],
    },
    {
      category: "トリートメント ＆ ヘッドスパ",
      category_description:
        "秘密のケア方法と厳選されたヘアケアプログラムで、髪本来の健やかな美しさと、心安らぐ贅沢な癒やしをお届けします。",
      items: [
        {
          name: "クイックトリートメント",
          includes: "シャンプー・ブロー別",
          price: 3850,
          is_starting_price: false,
          is_additional_fee: false,
          description: "お急ぎの時にも、髪の表面を滑らかに整えるお手軽なケア。",
        },
        {
          name: "フローディア トリートメント",
          includes: "シャンプー・ブロー別",
          price: 6050,
          is_starting_price: false,
          is_additional_fee: false,
          description:
            "髪の記憶を補修する医学発想のシステムトリートメント。芯から潤う本質的な髪質改善を。",
        },
        {
          name: "極上ヘッドスパ",
          includes: "シャンプー・ブロー別",
          price: 3850,
          is_starting_price: false,
          is_additional_fee: false,
          description:
            "日々の疲れや頭皮の緊張をほぐし、根本からの立ち上がりと深いリラクゼーションを促します。おやすみ前のセルフケアのように。",
        },
      ],
    },
    {
      category: "その他",
      category_description:
        "秘密のケア方法と厳選されたヘアケアプログラムで、髪本来の健やかな美しさと、心安らぐ贅沢な癒やしをお届けします。",
      items: [
        {
          name: "シャンプー・ブロー",
          price: 1980,
          is_starting_price: false,
          is_additional_fee: false,
          description:
            "カラーやトリートメント単品メニューと組み合わせてご利用ください。",
        },
        {
          name: "ヘアセット（アップスタイル）",
          price: 6050,
          is_starting_price: false,
          is_additional_fee: false,
          description:
            "結婚式や特別な日のお出かけに、崩れにくく華やかなスタイルを。",
        },
        {
          name: "アレンジ・スタイリング",
          price: 4400,
          is_starting_price: true,
          is_additional_fee: false,
          description:
            "カジュアルなパーティーや、少し気分を上げたい普段の日のお出かけに。",
        },
      ],
    },
  ],
};
