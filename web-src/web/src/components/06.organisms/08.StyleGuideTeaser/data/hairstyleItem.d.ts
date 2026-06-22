import { HairStyleItem } from '../types/hairstyle.types';

import HairStyle01 from '@assets/images/05.hairstyle/hairstyle-01.png';
import HairStyle02 from '@assets/images/05.hairstyle/hairstyle-02.png';
import HairStyle03 from '@assets/images/05.hairstyle/hairstyle-03.png';
import HairStyle04 from '@assets/images/05.hairstyle/hairstyle-04.png';

// ── Data ────────────────────────────────────────────────────────────────────
export const STYLES: HairStyleItem[] = [
  {
    id: '1',
    image: HairStyle01,
    alt: "ショートボブ後ろ",
    label: "ショートボブ",
  },
  {
    id: '2',
    image: HairStyle03,
    alt: "ウェーブミディ横",
    label: "ウェーブミディ",
  },
  {
    id: '3',
    image: HairStyle03,
    alt: "ストレートミディ横",
    label: "ストレートミディ",
  },
  {
    id: '4',
    image: HairStyle04,
    alt: "艶ストレート横",
    label: "艶ストレート",
  },
];