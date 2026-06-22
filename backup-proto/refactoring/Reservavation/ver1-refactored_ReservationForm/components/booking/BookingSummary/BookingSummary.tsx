import { useForm } from 'react-hook-form';

import styles from './BookingSummary.module.scss';

import { ADDONS } from '@/utils/constants';
import { MenuItem } from '@/utils/constants';
import { ContactData } from '../../../schema/contactSchema';


/** Sticky summary + contact form (right column on desktop) */
export function BookingSummary({
  selectedItems,
  selectedAddons,
  total,
  register,
  errors,
  onSubmit,
}: {
  selectedItems: Record<string, MenuItem>;
  selectedAddons: (typeof ADDONS)[number][];
  total: number;
  register: ReturnType<typeof useForm<ContactData>>['register'];
  errors: ReturnType<typeof useForm<ContactData>>['formState']['errors'];
  onSubmit: React.FormEventHandler;
}) {
  const lineItems = [...Object.values(selectedItems).filter(Boolean), ...selectedAddons];

  return (
    <div className={styles.sidebar}>
      {/* Summary */}
      <div className={styles.summary}>
        <span className={styles.summary__label}>選択内容</span>

        {lineItems.length === 0 ? (
          <p className={styles.summary__empty}>メニューを選択してください</p>
        ) : (
          <>
            <div className={styles.summary__rows}>
              {lineItems.map((item, i) => (
                <div key={i} className={styles.summary__row}>
                  <span className={styles.summary__itemName}>{item.name}</span>
                  <div className={styles.summary__dashed} />
                  <span className={styles.summary__itemPrice}>
                    ¥{item.price.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            <div className={styles.summary__divider} aria-hidden="true" />

            <div className={styles.summary__totalRow}>
              <span className={styles.summary__totalLabel}>合計（目安）</span>
              <span className={styles.summary__total}>¥{total.toLocaleString()}</span>
            </div>

            <p className={styles.summary__note}>
              ※ 表記価格は税込・基本料金です。髪の状態により変動する場合があります。
            </p>
          </>
        )}
      </div>

      {/* Contact form */}
      <form onSubmit={onSubmit} className={styles.contactForm} noValidate>
        <span className={styles.summary__label}>お客様情報</span>

        <div className={styles.contactForm__field}>
          <label htmlFor="rsv-name" className={styles.contactForm__fieldLabel}>
            お名前 <span aria-hidden="true" className={styles.contactForm__required}>*</span>
          </label>
          <input
            id="rsv-name"
            type="text"
            autoComplete="name"
            placeholder="山田 花子"
            aria-invalid={!!errors.name}
            className={[
              styles.contactForm__input,
              errors.name ? styles['contactForm__input--error'] : '',
            ].join(' ')}
            {...register('name')}
          />
          {errors.name && (
            <p className={styles.contactForm__error} role="alert">
              {errors.name.message}
            </p>
          )}
        </div>

        <div className={styles.contactForm__field}>
          <label htmlFor="rsv-email" className={styles.contactForm__fieldLabel}>
            メールアドレス <span aria-hidden="true" className={styles.contactForm__required}>*</span>
          </label>
          <input
            id="rsv-email"
            type="email"
            autoComplete="email"
            placeholder="hanako@example.com"
            aria-invalid={!!errors.email}
            className={[
              styles.contactForm__input,
              errors.email ? styles['contactForm__input--error'] : '',
            ].join(' ')}
            {...register('email')}
          />
          {errors.email && (
            <p className={styles.contactForm__error} role="alert">
              {errors.email.message}
            </p>
          )}
        </div>

        <button type="submit" className={styles.btn}>
          内容を確認する
        </button>
      </form>
    </div>
  );
}