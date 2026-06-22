import styles from './VoiceSection.module.scss';
import { Section } from '@/components/01.primitives/Section/Section';
import { Container } from '@/components/01.primitives/Container/Container';
import { Stack } from '@/components/01.primitives/Stack/Stack';
import { useScrollReveal } from '@/animations/hooks/useScrollReveal';

interface Review {
  id: number;
  name: string;
  date: string;
  rating: number;
  comment: string;
  service: string;
}

const REVIEWS: Review[] = [
  {
    id: 1,
    name: 'M.T. 様',
    date: '2025年4月',
    rating: 5,
    comment:
      '初めて伺いましたが、カウンセリングがとても丁寧で安心しました。仕上がりも大満足です。また必ず来ます！',
    service: 'カット + カラー',
  },
  {
    id: 2,
    name: 'K.S. 様',
    date: '2025年3月',
    rating: 5,
    comment:
      '完全個室なのでゆっくりできました。ヘッドスパが特に気持ちよく、施術後は頭が軽くなった感じがします。',
    service: 'ヘッドスパ + トリートメント',
  },
  {
    id: 3,
    name: 'Y.N. 様',
    date: '2025年2月',
    rating: 5,
    comment:
      '骨格に合わせた提案をしていただき、今まで悩んでいたスタイルの問題が解決しました。センスが素晴らしい！',
    service: 'カット + パーマ',
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className={styles.voice__stars} aria-label={`評価 ${count}/5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`${styles.voice__star} ${i < count ? styles['voice__star--filled'] : ''}`}
          aria-hidden="true"
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default function VoiceSection() {
  const labelRef   = useScrollReveal<HTMLSpanElement>();
  const headingRef = useScrollReveal<HTMLHeadingElement>();

  return (
    <Section id="voice" spacing="lg" aria-label="Customer Reviews">
      <Container>
        <Stack gap="xl">
          <Stack gap="xs" align="center">
            <span ref={labelRef} className="section-label">Voice</span>
            <h2 ref={headingRef} className={styles.voice__heading}>
              お客様の声
            </h2>
          </Stack>

          <div className={styles.voice__grid}>
            {REVIEWS.map((review) => (
              <article key={review.id} className={styles.voice__card}>
                <div className={styles.voice__cardHeader}>
                  <StarRating count={review.rating} />
                  <span className={styles.voice__service}>{review.service}</span>
                </div>
                <blockquote className={styles.voice__comment}>
                  {review.comment}
                </blockquote>
                <footer className={styles.voice__footer}>
                  <span className={styles.voice__name}>{review.name}</span>
                  <span className={styles.voice__date}>{review.date}</span>
                </footer>
              </article>
            ))}
          </div>
        </Stack>
      </Container>
    </Section>
  );
}
