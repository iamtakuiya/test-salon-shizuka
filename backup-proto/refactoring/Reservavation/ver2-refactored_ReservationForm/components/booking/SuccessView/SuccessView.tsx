type Props = {
  onReset: () => void;
};

import styles from '../../ReservationForm.module.scss'
// ─────────────────────────────────────────────────────────────────────────────

/** Success screen */
export function SuccessView({ onReset }: Props) {
  return (
    <div className={styles.success}>
      <span className={styles.success__icon} aria-hidden="true">✓</span>
      <h3 className={styles.success__heading}>ご予約ありがとうございます</h3>
      <p className={styles.success__body}>
        ご登録のメールアドレスに確認メールをお送りしました。
        <br />
        24時間以内にご連絡いたします。
      </p>
      <button type="button" className={styles.btnGhost} onClick={onReset}>
        新しいご予約
      </button>
    </div>
  );
}