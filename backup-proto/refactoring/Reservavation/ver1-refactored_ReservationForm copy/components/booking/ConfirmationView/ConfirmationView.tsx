import styles from './Confirmation.module.scss';
import { MenuItem } from '@/utils/constants';

/** Confirmation screen */
type Props = {
  selectedDate: string;
  selectedTime: string;
  selectedItems: Record<string, MenuItem>; // Added so 'i' has a strict type
  selectedAddons: Array<{ name: string; nameJa?: string; price: number }>; // Added
  total: number;

  name: string;
  email: string;

  submitting: boolean;
  submitError: boolean;

  onBack: () => void;
  onConfirm: () => void;
};

export function ConfirmationView({
  selectedDate,
  selectedTime,
  selectedItems,   // Destructure from props
  selectedAddons,  // Destructure from props
  total,
  name,
  email,
  submitting,
  submitError,
  onBack,
  onConfirm,
}: Props) {
  // Now 'i' safely resolves to MenuItem, allowing access to .name without errors
  const menuNames = Object.values(selectedItems)
    .filter(Boolean)
    .map((i) => i.name)
    .join('、');

  // Safely grab the Japanese localized name, falling back to English if needed
  const addonNames = selectedAddons.map((a) => a.nameJa || a.name).join('、');

  const rows = [
    { label: '日時',     value: `${selectedDate} ${selectedTime}` },
    { label: 'メニュー',   value: menuNames || '未選択' },
    addonNames ? { label: 'オプション', value: addonNames } : null,
    { label: 'お名前',   value: `${name} 様` },
    { label: 'メール',   value: email },
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
          ← 修正する
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