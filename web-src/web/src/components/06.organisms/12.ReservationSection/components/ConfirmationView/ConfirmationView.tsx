import styles from '../../ReservationSection.module.scss';
import { ADDONS } from '@/utils/constants';

import { MenuItem } from '@/utils/constants';
// ─────────────────────────────────────────────────────────────────────────────


/** Confirmation screen */
export function ConfirmationView({
  selectedDate,
  selectedTime,
  selectedItems,
  selectedAddons,
  total,
  name,
  email,
  submitting,
  submitError,
  onBack,
  onConfirm,
}: {
  selectedDate: string;
  selectedTime: string;
  selectedItems: Record<string, MenuItem>;
  selectedAddons: (typeof ADDONS)[number][];
  total: number;
  name: string;
  email: string;
  submitting: boolean;
  submitError: boolean;
  onBack: () => void;
  onConfirm: () => void;
}) {
  const menuNames  = Object.values(selectedItems).filter(Boolean).map((i) => i.name).join('、');
  const addonNames = selectedAddons.map((a) => a.nameJa).join('、');

  const rows = [
    { label: '日時',          value: `${selectedDate} ${selectedTime}` },
    { label: 'メニュー',      value: menuNames || '未選択' },
    addonNames ? { label: 'オプション', value: addonNames } : null,
    { label: 'お名前',        value: `${name} 様` },
    { label: 'メール',        value: email },
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <div className={styles.confirmation}>
      <div className={styles.confirmation__table}>
        {rows.map(({ label, value }) => (
          <div key={label} className={styles.confirmation__row}>
            <span className={styles.confirmation__label}>{label}</span>
            <span className={styles.confirmation__value}>{value}</span>
          </div>
        ))}
        <div className={[styles.confirmation__row, styles['confirmation__row--total']].join(' ')}>
          <span className={styles.confirmation__label}>合計（目安）</span>
          <span className={styles.confirmation__totalVal}>¥{total.toLocaleString()}</span>
        </div>
      </div>

      {submitError && (
        <p className={styles.confirmation__error} role="alert">
          エラーが発生しました。もう一度お試しください。
        </p>
      )}

      <div className={styles.confirmation__footer}>
        <button
          type="button"
          className={styles.btnGhost}
          onClick={onBack}
        >
          {/* ←  */}
          修正する
        </button>
        <button
          type="button"
          className={styles.btn}
          disabled={submitting}
          onClick={onConfirm}
        >
          {submitting ? '送信中…' : 'この内容で予約する'}
        </button>
      </div>
    </div>
  );
}