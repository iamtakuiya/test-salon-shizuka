/**
 * ReservationForm
 *
 * Layout strategy:
 *   Mobile  → single-column vertical flow
 *   Tablet  → calendar + timeslots side-by-side; service slider shows 2 cards/slide
 *   Laptop+ → two-column: [calendar / slider / addons] | [sticky summary + form]
 *             service gallery switches to 2 × 3 grid; slider nav only shown when > 6 items
 *
 * State split (per SALON_SHIZUKA_MASTER_GUIDE):
 *   Redux Toolkit → date, time, selected service items, selected addons   (cross-step persistence)
 *   React Hook Form + Zod → name, email                                   (local form validation)
 *   Local useState → view stage, calendar month/year, slider page         (ephemeral UI)
 *
 * Note: Redux slices are imported from the project's bookingSlice.
 * Replace the stub imports below with your real store paths before use.
 */

import { useState, useRef, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import styles from './ReservationForm.module.scss';

import { Section }    from '@/components/01.primitives/Section/Section';
import { Container }  from '@/components/01.primitives/Container/Container';
import { Stack }      from '@/components/01.primitives/Stack/Stack';
import { useScrollReveal } from '@/animations/hooks/useScrollReveal';

// Redux — swap with real store paths
import { useAppDispatch, useAppSelector } from '@/app/store/store';
import {
  setDate,
  setTime,
  toggleService,
  toggleAddon,
  resetBooking,
} from '@/features/booking/store/bookingSlice';

import { bookingService }    from '@/services/bookingService';
import { MENU_CATEGORIES, ADDONS, TIME_SLOTS } from '@/utils/constants';
import type { MenuCategory, MenuItem } from '@/utils/constants';

// ─── Constants ───────────────────────────────────────────────────────────────

const DAYS_JA   = ['日', '月', '火', '水', '木', '金', '土'];
const MONTHS_EN = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
];

/** Max cards shown in the desktop 2×3 gallery before slider nav appears */
const DESKTOP_GRID_CAPACITY = 6;

// ─── Zod schema (contact step only; booking data lives in Redux) ──────────────

const contactSchema = z.object({
  name:  z.string().min(1, 'お名前を入力してください').max(100),
  email: z.string().email('有効なメールアドレスを入力してください'),
});
type ContactData = z.infer<typeof contactSchema>;

// ─── View stages ─────────────────────────────────────────────────────────────

type Stage = 'form' | 'confirm' | 'success';

// ─── Calendar helpers ─────────────────────────────────────────────────────────

function buildCalendarCells(year: number, month: number): (number | null)[] {
  const firstDay     = new Date(year, month, 1).getDay();
  const daysInMonth  = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = Array(firstDay).fill(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  return cells;
}

function isClosedDay(year: number, month: number, day: number) {
  return new Date(year, month, day).getDay() === 3; // Wednesdays closed
}

function isPastDay(year: number, month: number, day: number) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(year, month, day) < today;
}

function formatDateISO(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

// ─── Price formatter ──────────────────────────────────────────────────────────

function formatPrice(item: MenuItem): string {
  const base = `¥${item.price.toLocaleString('ja-JP')}`;
  if (item.isAdditionalFee) return `+${base}${item.isStartingPrice ? '〜' : ''}`;
  if (item.isStartingPrice)  return `${base}〜`;
  return base;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

/** Calendar date picker */
function CalendarPicker({
  year, month, selectedDate,
  onPrevMonth, onNextMonth, onDayClick,
}: {
  year: number; month: number; selectedDate: string;
  onPrevMonth: () => void; onNextMonth: () => void;
  onDayClick: (day: number) => void;
}) {
  const cells = buildCalendarCells(year, month);

  return (
    <div className={styles.calendar}>
      <div className={styles.calendar__nav}>
        <button
          type="button"
          className={styles.calendar__navBtn}
          onClick={onPrevMonth}
          aria-label="前月"
        >
          ‹
        </button>
        <span className={styles.calendar__month}>
          {MONTHS_EN[month]} {year}
        </span>
        <button
          type="button"
          className={styles.calendar__navBtn}
          onClick={onNextMonth}
          aria-label="翌月"
        >
          ›
        </button>
      </div>

      <div className={styles.calendar__divider} aria-hidden="true" />

      <div className={styles.calendar__grid} role="grid" aria-label="日程選択">
        {DAYS_JA.map((d) => (
          <div key={d} className={styles.calendar__dayHeader} role="columnheader">
            {d}
          </div>
        ))}

        {cells.map((day, i) => {
          if (!day) return <div key={`empty-${i}`} role="gridcell" aria-hidden="true" />;

          const dateStr  = formatDateISO(year, month, day);
          const disabled = isClosedDay(year, month, day) || isPastDay(year, month, day);
          const selected = selectedDate === dateStr;

          return (
            <button
              key={dateStr}
              type="button"
              role="gridcell"
              disabled={disabled}
              aria-disabled={disabled}
              aria-pressed={selected}
              aria-label={`${year}年${month + 1}月${day}日${disabled ? ' — 定休日' : ''}`}
              className={[
                styles.calendar__day,
                disabled ? styles['calendar__day--disabled'] : '',
                selected  ? styles['calendar__day--selected']  : '',
              ].join(' ')}
              onClick={() => !disabled && onDayClick(day)}
            >
              {day}
            </button>
          );
        })}
      </div>

      <p className={styles.calendar__note}>水曜定休</p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

/** Time slot grid */
function TimeSlotPicker({
  selectedTime,
  onSelect,
}: {
  selectedTime: string;
  onSelect: (t: string) => void;
}) {
  return (
    <div className={styles.timeSlots} role="group" aria-label="時間帯の選択">
      {TIME_SLOTS.map((t) => (
        <button
          key={t}
          type="button"
          aria-pressed={selectedTime === t}
          className={[
            styles.timeSlots__slot,
            selectedTime === t ? styles['timeSlots__slot--selected'] : '',
          ].join(' ')}
          onClick={() => onSelect(t)}
        >
          {t}
        </button>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

/**
 * ServiceGallery
 *
 * Breakpoint behaviour:
 *   Mobile  (<768 px)  → 1 card visible, arrow + dot slider
 *   Tablet  (<1024 px) → 2 cards visible side-by-side, arrow + dot slider
 *   Laptop+ (≥1024 px) → 2×3 grid; slider nav only when items > 6
 */
function ServiceGallery({
  activeCategoryId,
  onCategorySelect,
}: {
  activeCategoryId: string;
  onCategorySelect: (id: string) => void;
}) {
  const total = MENU_CATEGORIES.length;

  /** Slider page index — one "page" = perPage cards */
  const [page, setPage] = useState(0);

  /** Number of cards per slide — recalculated on resize */
  const [perPage, setPerPage] = useState(1);

  /** Whether we're in desktop grid mode */
  const [isGrid, setIsGrid] = useState(false);

  const trackRef = useRef<HTMLDivElement>(null);

  // Keep active category's page in view when activeCategoryId changes externally
  useEffect(() => {
    const idx = MENU_CATEGORIES.findIndex((c) => c.id === activeCategoryId);
    if (idx < 0) return;
    const targetPage = Math.floor(idx / perPage);
    setPage(targetPage);
  }, [activeCategoryId, perPage]);

  const updateLayout = useCallback(() => {
    const w = window.innerWidth;
    if (w >= 1024) {
      setIsGrid(true);
      setPerPage(DESKTOP_GRID_CAPACITY);
    } else if (w >= 768) {
      setIsGrid(false);
      setPerPage(2);
    } else {
      setIsGrid(false);
      setPerPage(1);
    }
  }, []);

  useEffect(() => {
    updateLayout();
    window.addEventListener('resize', updateLayout);
    return () => window.removeEventListener('resize', updateLayout);
  }, [updateLayout]);

  const totalPages      = Math.ceil(total / perPage);
  const showSliderNav   = !isGrid || total > DESKTOP_GRID_CAPACITY;
  const visibleStart    = page * perPage;
  const visibleCats     = isGrid
    ? MENU_CATEGORIES.slice(visibleStart, visibleStart + DESKTOP_GRID_CAPACITY)
    : MENU_CATEGORIES; // slider uses CSS transform — all cats rendered

  const slideOffset = isGrid ? 0 : (page * (100 / perPage));

  function goPrev() {
    setPage((p) => (p === 0 ? totalPages - 1 : p - 1));
  }
  function goNext() {
    setPage((p) => (p === totalPages - 1 ? 0 : p + 1));
  }

  return (
    <div className={styles.gallery}>
      {/* ── Card track ── */}
      <div className={styles.gallery__viewport}>
        <div
          ref={trackRef}
          className={[
            styles.gallery__track,
            isGrid ? styles['gallery__track--grid'] : '',
          ].join(' ')}
          style={!isGrid ? { transform: `translateX(-${slideOffset}%)` } : undefined}
        >
          {(isGrid ? visibleCats : MENU_CATEGORIES).map((cat) => {
            const active = cat.id === activeCategoryId;
            return (
              <button
                key={cat.id}
                type="button"
                aria-pressed={active}
                className={[
                  styles.gallery__card,
                  active ? styles['gallery__card--active'] : '',
                ].join(' ')}
                style={!isGrid ? { flex: `0 0 ${100 / perPage}%` } : undefined}
                onClick={() => onCategorySelect(cat.id)}
              >
                {cat.img ? (
                  <img
                    src={cat.img}
                    alt={cat.category}
                    className={styles.gallery__img}
                    loading="lazy"
                  />
                ) : (
                  <div className={styles.gallery__imgPlaceholder} aria-hidden="true" />
                )}
                <span className={styles.gallery__cardEn}>{cat.categoryEn}</span>
                <span className={styles.gallery__cardName}>{cat.category}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Slider controls (hidden in grid mode when ≤ 6 items) ── */}
      {showSliderNav && (
        <div className={styles.gallery__ctrl}>
          <div className={styles.gallery__dots} role="tablist" aria-label="ページ">
            {Array.from({ length: totalPages }).map((_, p) => (
              <button
                key={p}
                type="button"
                role="tab"
                aria-selected={p === page}
                aria-label={`ページ ${p + 1}`}
                className={[
                  styles.gallery__dot,
                  p === page ? styles['gallery__dot--active'] : '',
                ].join(' ')}
                onClick={() => setPage(p)}
              />
            ))}
          </div>

          <div className={styles.gallery__navs}>
            <button
              type="button"
              className={styles.gallery__navBtn}
              onClick={goPrev}
              aria-label="前へ"
            >
              ‹
            </button>
            <button
              type="button"
              className={styles.gallery__navBtn}
              onClick={goNext}
              aria-label="次へ"
            >
              ›
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

/** Focus panel: menu items for the active category */
function CategoryFocusPanel({
  category,
  selectedItems,
  onItemSelect,
}: {
  category: MenuCategory;
  selectedItems: Record<string, MenuItem>;
  onItemSelect: (catId: string, item: MenuItem) => void;
}) {
  return (
    <div className={styles.focusPanel}>
      {/* Category description */}
      {category.categoryDescription && (
        <p className={styles.focusPanel__desc}>{category.categoryDescription}</p>
      )}

      {/* Includes note */}
      {category.includes && (
        <p className={styles.focusPanel__includes}>
          ［{category.includes}］
        </p>
      )}

      {/* Radio menu items */}
      <div
        className={styles.menuList}
        role="radiogroup"
        aria-label={`${category.category} メニュー選択`}
      >
        {category.items.map((item, idx) => {
          const inputId = `menu-${category.id}-${idx}`;
          const checked = selectedItems[category.id]?.name === item.name;

          return (
            <label
              key={inputId}
              htmlFor={inputId}
              className={[
                styles.menuList__item,
                checked ? styles['menuList__item--selected'] : '',
              ].join(' ')}
            >
              <input
                type="radio"
                id={inputId}
                name={`menu-group-${category.id}`}
                checked={checked}
                onChange={() => onItemSelect(category.id, item)}
                className={styles.menuList__radio}
              />
              <span className={styles.menuList__name}>
                {item.name}
                {item.includes && (
                  <span className={styles.menuList__includes}> [{item.includes}]</span>
                )}
              </span>
              {item.duration && (
                <span className={styles.menuList__duration}>{item.duration}</span>
              )}
              <span className={styles.menuList__price}>{formatPrice(item)}</span>
            </label>
          );
        })}
      </div>

      {/* Category note */}
      {category.notes && (
        <p className={styles.focusPanel__note}>＊{category.notes}</p>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

/** Addon checkbox list */
function AddonPicker({
  selectedAddonIds,
  onToggle,
}: {
  selectedAddonIds: Set<string>;
  onToggle: (addon: (typeof ADDONS)[number]) => void;
}) {
  return (
    <div className={styles.addonList} role="group" aria-label="追加オプション選択">
      {ADDONS.map((addon) => {
        const checked = selectedAddonIds.has(addon.id);
        return (
          <label
            key={addon.id}
            htmlFor={`addon-${addon.id}`}
            className={[
              styles.addonList__item,
              checked ? styles['addonList__item--selected'] : '',
            ].join(' ')}
          >
            <input
              type="checkbox"
              id={`addon-${addon.id}`}
              checked={checked}
              onChange={() => onToggle(addon)}
              className={styles.addonList__checkbox}
            />
            <span className={styles.addonList__name}>{addon.nameJa}</span>
            <span className={styles.addonList__duration}>{addon.duration}</span>
            <span className={styles.addonList__price}>¥{addon.price.toLocaleString()}</span>
          </label>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

/** Sticky summary + contact form (right column on desktop) */
function BookingSummary({
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
              表記価格は税込・基本料金です。髪の状態により変動する場合があります。
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

// ─────────────────────────────────────────────────────────────────────────────

/** Confirmation screen */
function ConfirmationView({
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

// ─────────────────────────────────────────────────────────────────────────────

/** Success screen */
function SuccessView({ onReset }: { onReset: () => void }) {
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

// ─── Main component ───────────────────────────────────────────────────────────

export default function ReservationForm() {
  const labelRef   = useScrollReveal<HTMLSpanElement>();
  const headingRef = useScrollReveal<HTMLHeadingElement>();

  const dispatch = useAppDispatch();
  const booking  = useAppSelector((s) => s.booking);

  // Derived values from Redux state
  const selectedDate    = booking.selectedDate    ?? '';
  const selectedTime    = booking.selectedTime    ?? '';
  // selectedServices is a flat ServiceItem array; we map back to MenuItem for display
  // selectedAddons likewise — keep as-is from Redux and re-derive below

  // Local category navigation & item selection
  // (items per category are picked locally then synced to Redux on submit)
  const [selectedItems, setSelectedItems] = useState<Record<string, MenuItem>>({});
  const [activeCategoryId, setActiveCategoryId] = useState(MENU_CATEGORIES[0].id);

  const selectedAddonIds = new Set(booking.selectedAddons.map((a) => a.id));
  const selectedAddonsForDisplay = ADDONS.filter((a) => selectedAddonIds.has(a.id));

  // View state
  const [stage, setStage]             = useState<Stage>('form');
  const [submitting, setSubmitting]   = useState(false);
  const [submitError, setSubmitError] = useState(false);

  // Calendar
  const today = new Date();
  const [calYear, setCalYear]   = useState(today.getFullYear());
  const [calMonth, setCalMonth] = useState(today.getMonth());

  // React Hook Form (contact fields only)
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<ContactData>({ resolver: zodResolver(contactSchema) });

  // Computed total
  const total =
    Object.values(selectedItems).filter(Boolean).reduce((s, i) => s + i.price, 0) +
    booking.selectedAddons.reduce((s, a) => s + a.price, 0);

  // ── Handlers ──

  function handlePrevMonth() {
    if (calMonth === 0) { setCalYear((y) => y - 1); setCalMonth(11); }
    else setCalMonth((m) => m - 1);
  }
  function handleNextMonth() {
    if (calMonth === 11) { setCalYear((y) => y + 1); setCalMonth(0); }
    else setCalMonth((m) => m + 1);
  }
  function handleDayClick(day: number) {
    dispatch(setDate(formatDateISO(calYear, calMonth, day)));
  }
  function handleTimeSelect(t: string) {
    dispatch(setTime(t));
  }

  function handleItemSelect(catId: string, item: MenuItem) {
    setSelectedItems((prev) => ({ ...prev, [catId]: item }));
  }

  function handleAddonToggle(addon: (typeof ADDONS)[number]) {
    dispatch(toggleAddon({ id: addon.id, name: addon.nameJa, price: addon.price }));
  }

  // Submit → show confirmation
  const handleFormSubmit = handleSubmit(() => {
    if (!selectedDate || !selectedTime) {
      alert('日程と時間帯を選択してください。');
      return;
    }
    if (Object.values(selectedItems).filter(Boolean).length === 0) {
      alert('メニューを1つ以上選択してください。');
      return;
    }
    setStage('confirm');
  });

  // Final booking POST
  async function handleConfirm() {
    setSubmitting(true);
    setSubmitError(false);
    const contact = getValues();
    try {
      // Sync local item selections to Redux before submitting
      const servicePayload = Object.values(selectedItems)
        .filter(Boolean)
        .map((item) => ({ id: item.name, name: item.name, price: item.price }));

      await bookingService.submit({
        name:     contact.name,
        email:    contact.email,
        date:     selectedDate,
        time:     selectedTime,
        services: servicePayload,
        addons:   booking.selectedAddons,
      });

      dispatch(resetBooking());
      setSelectedItems({});
      setStage('success');
    } catch {
      setSubmitError(true);
    } finally {
      setSubmitting(false);
    }
  }

  function handleReset() {
    dispatch(resetBooking());
    setSelectedItems({});
    setActiveCategoryId(MENU_CATEGORIES[0].id);
    setStage('form');
  }

  const activeCategory = MENU_CATEGORIES.find((c) => c.id === activeCategoryId)!;

  // ── Render ──

  return (
    <Section id="reservation" spacing="lg" aria-label="Reservation">
      <Container size="md">
        <Stack gap="xl">

          {/* Section header */}
          <Stack gap="xs" align="center">
            <span ref={labelRef} className="section-label">Reservation</span>
            <h2 ref={headingRef} className={styles.heading}>ご予約</h2>
          </Stack>

          {/* ── Success ── */}
          {stage === 'success' && <SuccessView onReset={handleReset} />}

          {/* ── Confirmation ── */}
          {stage === 'confirm' && (
            <ConfirmationView
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              selectedItems={selectedItems}
              selectedAddons={selectedAddonsForDisplay}
              total={total}
              name={getValues('name')}
              email={getValues('email')}
              submitting={submitting}
              submitError={submitError}
              onBack={() => setStage('form')}
              onConfirm={handleConfirm}
            />
          )}

          {/* ── Main form ── */}
          {stage === 'form' && (
            <div className={styles.layout}>

              {/* ── Left column ── */}
              <div className={styles.layout__main}>

                {/* Date + Time (side-by-side on tablet+) */}
                <div className={styles.dateTime}>
                  <div className={styles.dateTime__cal}>
                    <span className={styles.fieldLabel}>日程を選択</span>
                    <CalendarPicker
                      year={calYear}
                      month={calMonth}
                      selectedDate={selectedDate}
                      onPrevMonth={handlePrevMonth}
                      onNextMonth={handleNextMonth}
                      onDayClick={handleDayClick}
                    />
                  </div>

                  <div className={styles.dateTime__time}>
                    <span className={styles.fieldLabel}>時間帯を選択</span>
                    <TimeSlotPicker
                      selectedTime={selectedTime}
                      onSelect={handleTimeSelect}
                    />
                  </div>
                </div>

                {/* Service gallery */}
                <div className={styles.serviceSection}>
                  <span className={styles.fieldLabel}>メニューカテゴリ</span>
                  <ServiceGallery
                    activeCategoryId={activeCategoryId}
                    onCategorySelect={setActiveCategoryId}
                  />
                </div>

                {/* Focus panel for selected category */}
                <div className={styles.serviceSection}>
                  <span className={styles.fieldLabel}>
                    {activeCategory.category} — メニュー
                  </span>
                  <CategoryFocusPanel
                    category={activeCategory}
                    selectedItems={selectedItems}
                    onItemSelect={handleItemSelect}
                  />
                </div>

                {/* Addons */}
                <div className={styles.serviceSection}>
                  <span className={styles.fieldLabel}>追加オプション</span>
                  <AddonPicker
                    selectedAddonIds={selectedAddonIds}
                    onToggle={handleAddonToggle}
                  />
                </div>

                {/* Summary + form visible inline on mobile/tablet; sidebar on desktop */}
                <div className={styles.layout__inlineForm}>
                  <BookingSummary
                    selectedItems={selectedItems}
                    selectedAddons={selectedAddonsForDisplay}
                    total={total}
                    register={register}
                    errors={errors}
                    onSubmit={handleFormSubmit}
                  />
                </div>
              </div>

              {/* ── Right column (desktop only) ── */}
              <aside className={styles.layout__sidebar} aria-label="予約サマリー">
                <BookingSummary
                  selectedItems={selectedItems}
                  selectedAddons={selectedAddonsForDisplay}
                  total={total}
                  register={register}
                  errors={errors}
                  onSubmit={handleFormSubmit}
                />
              </aside>
            </div>
          )}

        </Stack>
      </Container>
    </Section>
  );
}