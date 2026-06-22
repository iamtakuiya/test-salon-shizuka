/**
 * TODO
 *Display rule:
Category items are only displayed based on the selected main category. For example, if the main category is "Hair Cut," then only items from the Hair Cut category will be shown.
Category items are main items, so they are not multi-choice. Only one can be selected at a time.
The summary displays all selected items and the total.
The confirmation shows all selected information, including date, time, items, and total.
 */

/**
 * 
 * 
 * Section Layout: Desktop
┌─────────────────────────────────────────────┐
│                 RESERVATION                 │
└─────────────────────────────────────────────┘

┌───────────────┐      ┌────────────────────┐
│   Calendar    │      │   Time Selection   │
└───────────────┘      └────────────────────┘

┌──────────────────────────┐ ┌──────────────┐
│                          │ │              │
│     Service Slider       │ │   Summary    │
│                          │ │   + Form     │
└──────────────────────────┘ └──────────────┘
 */

import { useState } from "react";
import "./styles.css";

import { MENU_CATEGORIES, SERVICES, ADDONS, TIME_SLOTS } from "./constants";

// Calendar helper
function buildCalendar(year, month) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = Array(firstDay).fill(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  return cells;
}

const DAYS_JA = ["日", "月", "火", "水", "木", "金", "土"];
const MONTHS_EN = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Closed on Wednesday (per HOURS)
function isClosed(year, month, day) {
  return new Date(year, month, day).getDay() === 3;
}

function isPast(year, month, day) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(year, month, day) < today;
}

export default function ReservationSectionProto() {
  // Calendar State
  const today = new Date();
  const [calYear, setCalYear] = useState(today.getFullYear());
  const [calMonth, setCalMonth] = useState(today.getMonth());
  const cells = buildCalendar(calYear, calMonth);

  const prevMonth = () => {
    if (calMonth === 0) {
      setCalYear((y) => y - 1);
      setCalMonth(11);
    } else setCalMonth((m) => m - 1);
  };

  const nextMonth = () => {
    if (calMonth === 11) {
      setCalYear((y) => y + 1);
      setCalMonth(0);
    } else setCalMonth((m) => m - 1);
  };

  const handleDayClick = (day) => {
    const mm = String(calMonth + 1).padStart(2, "0");
    const dd = String(day).padStart(2, "0");
  };

  return (
    <>
      <section id="reservation" className="reservation">
        {/* Healine */}
        <div className="reservation__headline">
          <span className="reservation__subheading">ご予約</span>
          <h2 className="reservation__heading">Reservation</h2>
        </div>

        {/* Main */}
        <div className="reservation__panel">
          {/* Above */}
          <div className="data_time">
            {/* Date Picker */}
            <div className="calendar">
              <div className="calendar__nav">
                <button className="calendar__navBtn" aria-label="前月">
                  ‹
                </button>
                <span className="calendar__month">
                  {MONTHS_EN[calMonth]} {calYear}
                </span>
                <button className="calendar__navBtn" aria-label="翌月">
                  ›
                </button>
              </div>

              {/* Grid */}
              <div className="calendar__grid">
                {DAYS_JA.map((d) => (
                  <div key={d} className="calendar__dayHeader">
                    {d}
                  </div>
                ))}
              </div>
              {cells.map((day, i) => {
                if (!day) return <div key={`empty-${i}`} />;
                const dateStr = `${calYear}-${String(calMonth + 1).padStart(
                  2,
                  "0"
                )}-${String(day).padStart(2, "0")}`;
                const disabled =
                  isClosed(calYear, calMonth, day) ||
                  isPast(calYear, calMonth, day);

                return <button className="calendar__day">{day}</button>;
              })}
            </div>

            {/* Time Slots */}
            <div className="reservation__timeslot">
              <div className="timeslot__labelWrapper">
                <h3 className="timeslot__label">ご希望時間</h3>
              </div>

              <div className="timeSlots">
                {TIME_SLOTS.map((t) => (
                  <button key={t} className="timeSlots__slot">
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="service_options_confirmation">
            <div className="reservation__sectionHeadline">
              <h3 className="reservation__label">
                ご希望のヘアケアをお選びください
              </h3>
            </div>

            {/* Service Picker */}
            {/* Card */}
            <div className="reservation__content">
              <div className="reservation__serviceGrid">
                <div className="reservation__serviceCategory">
                  {MENU_CATEGORIES.map((service) => (
                    <button key={service.id} className="services__card">
                      <img
                        src={service.img}
                        alt={service.category}
                        className="services__img"
                      />
                      <span className="services__label">
                        {service.category}
                      </span>
                    </button>
                  ))}
                </div>
                <div className="services__controller">
                  <button className="services__pagination">.</button>
                  <div className="buttons">
                    <button className="services__navBtn" aria-label="Prev">
                      ‹
                    </button>
                    <button className="services__navBtn" aria-label="Next">
                      ›
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <aside className="reservation__sidebar">
              {/* Service Picker */}
              <div className="reservation__services">
                <div className="reservation__serviceFocusPanel">
                  {/* Only show selected category */}
                  {MENU_CATEGORIES.map((category) => (
                    <>
                      <div key={category.id} className="services__categoryGrid">
                        {/* Image is related selected category of services__card */}
                        <img
                          src={category.img}
                          alt={category.category}
                          className="services__img"
                        />
                      </div>

                      <div className="services__menuItemWrapper">
                        {category.items.map((item, index) => (
                          <div key={index} className="services__menuItem">
                            {/* Display pickup menu item data, rest of them are not */}
                            {/* Price */}
                            <h3 className="services__price">
                              {item.price.toLocaleString()}
                            </h3>
                            {/* Description */}
                            {category.categoryDescription && (
                              <p className="services__itemDesc">
                                {category.categoryDescription}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </>
                  ))}
                </div>

                {/* Pickup Menu Options */}
                <div className="service__pickupMenu">
                  <h3 className="services__price">ご希望のメニュー</h3>
                  {/* Map through selected category's item */}
                  {MENU_CATEGORIES.map((category) => (
                    <div key={category.name} className="service__menuItem">
                      {category.items.map((item, index) => {
                        // Generate a unique ID for accessible input/label pairing
                        const inputId = `menu-item-${index}`;

                        return (
                          <div key={index} className="service__radioGroup">
                            <input
                              type="radio"
                              name="pickup-menu-selection"
                              id={inputId}
                            />
                            <label htmlFor={inputId}>{item.name}</label>
                            <span className="price">
                              ¥{item.price.toLocaleString()}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>

              {/* Addon Picker */}
              <div className="reservation__addons">
                <div className="service__addonMenu">
                  <h3 className="services__title">追加オプション</h3>
                  {/* Map through selected category's item */}
                  {ADDONS.map((addon) => (
                    <div key={addon.name} className="service__menuItem">
                      <div key={addon.id} className="service__checkboxGroup">
                        <input
                          type="checkbox"
                          name="pickup-menu-selection"
                          id={addon.id}
                        />
                        <label htmlFor={addon.id}>{addon.name}</label>
                        <span className="price">
                          ¥{addon.price.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Summary Display */}
              <div className="reservation__summary">
                <div className="reservation__summary">
                  <hr />
                  <div className="summary__row">
                    <span className="summary__label">
                      クイックトリートメント
                    </span>
                    <div className="summary__dashed"></div>
                    <span className="summary__price">¥4,500</span>
                  </div>
                  <hr />
                  <div className="summary__row">
                    <span className="summary__label">Total</span>
                    <span className="summary__total">¥4,500</span>
                  </div>
                </div>

                {/* Footnote */}
                <div className="service__summaryFootNote">
                  <p className="summary__footNote">
                    表記価格は税込・基本料金です。髪の長さや状態により追加料金が発生する場合がございます。詳細はカウンセリング時にご案内いたします。
                  </p>
                </div>
              </div>

              {/* Customer info Form */}
              <div className="reservation__inputForm">
                <div className="inputForm__row">
                  <input
                    type="text"
                    className="reservation__value"
                    placeholder="お名前"
                  />
                </div>
                <div className="inputForm__row">
                  <input
                    type="email"
                    className="reservation__value"
                    placeholder="Email"
                  />
                </div>
                <div className="reservation__submitBtnWrapper">
                  <button type="submit" className="reservation__submitBtn">
                    内容を確認する
                  </button>
                </div>
              </div>
            </aside>
          </div>

          {/* Final Confirmation and thank you message */}
          <div className="reservation__message">
            <div className="reservation__confirmation">
              <div className="confirmation__row">
                <span className="confirmation__label">日時</span>
                <span className="confirmation__value">2026-06-23 12:00</span>
              </div>
              <div className="confirmation__row">
                <span className="confirmation__label">メニュー</span>
                <span className="confirmation__value">
                  パーマ（ミディアム）
                </span>
              </div>
              <div className="confirmation__row">
                <span className="confirmation__label">オプション</span>
                <span className="confirmation__value">極上ヘッドスパ</span>
              </div>
              <div className="confirmation__row">
                <span className="confirmation__label">お名前</span>
                <span className="confirmation__value">John Doe 様</span>
              </div>
              <div className="confirmation__row">
                <span className="confirmation__label">メール</span>
                <span className="confirmation__value">example@mail.com</span>
              </div>
              <div className="confirmation__row">
                <span className="confirmation__label">合計（目安）</span>
                <span className="confirmation__value">¥105,050</span>
              </div>
            </div>

            <div className="reservation__submitBtnWrapper">
              <button type="submit" className="reservation__submitBtn">
                この内容で予約する
              </button>
            </div>

            {/* Success message */}
            <span className="reservation__successMsg">
              ご予約ありがとうございます。
              <br /> 24時間以内にご連絡いたします。
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
