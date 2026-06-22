import Image01 from '@/assets/images/07.voice/voice-01.png';
import Image02 from '@/assets/images/07.voice/voice-02.png';
import Image03 from '@/assets/images/07.voice/voice-03.png';


// testimonials.ts
export interface TestimonialProps {
  id: number;
  image: string;

  comment?: string;
  description?: string;

  name: string;
  age?: number;
  occupation?: string;

  service?: string;
  date?: string;
  rating: number;
}

export const TESTIMONIALS: TestimonialProps[] = [
  {
    id: 1,
    image: Image01,
    comment:
      "産後に髪が細くなり悩んでいましたが、丁寧にカウンセリングしていただき、扱いやすい髪になりました。",
    description:
      "子供を産んでから髪質が変わり、細くパサつくようになって半分諦めていました。Salon Shizukaさんでは私の日々のワンオペ育児スタイルまで考えた丁寧なカウンセリングをしてくださり、それだけでホッと安心できました。今では朝、乾かすだけで綺麗にまとまるので本当に助かっています。",
    name: "M.T. 様",
    age: 34,
    occupation: "マーケター / 1児の母",
    service: "カット + カラー",
    date: "2026年3月",
    rating: 5,
  },
  {
    id: 2,
    image: Image02,
    comment:
      "完全個室なので周りの目を気にせずゆっくりできました。ヘッドスパの技術がとにかく凄いです！",
    description:
      "仕事の繁忙期で頭痛がするほど疲れていましたが、プライベート空間での極上ヘッドスパに心底癒されました。施術が始まった瞬間に寝てしまうほど気持ちよく、終わった後は視界がパッと明るくなり、頭が驚くほど軽くなりました。自分へのご褒美にまた伺います。",
    name: "K.S. 様",
    age: 41,
    occupation: "IT企業経営",
    service: "ヘッドスパ + トリートメント",
    date: "2026年3月",
    rating: 5,
  },
  {
    id: 3,
    image: Image03,
    comment:
      "骨格に合わせた提案をしていただき、今まで悩んでいたスタイルの問題が解決しました。センスが素晴らしい！",
    description:
      "エラ張りがコンプレックスで、いつも同じような髪型で輪郭を隠していました。担当スタイリストさんは私の骨格の強みを活かしたショートヘアを提案してくださり、最初は緊張しましたが、周りから『今までで一番似合う！』と大絶賛されました。新しい自分に出会えて嬉しいです。",
    name: "Y.N. 様",
    age: 27,
    occupation: "アパレル店員",
    service: "カット + パーマ",
    date: "2026年2月",
    rating: 4,
  },
];
