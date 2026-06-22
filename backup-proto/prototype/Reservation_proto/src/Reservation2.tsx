/**
 * TODO
 * To support selecting one main item per category simultaneously
 * (e.g., picking one specific Hair Cut and one specific Hair Color and one specific Perm without them wiping each other out),
 *  we need to change our state from tracking a single selectedItem object to a selectedItems dictionary/object lookup mapped by Category ID.
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
  // Navigation / Step State
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isBooked, setIsBooked] = useState(false);

  // Form inputs
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");

  // Selection States
  const today = new Date();
  const [calYear, setCalYear] = useState(today.getFullYear());
  const [calMonth, setCalMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  // Menu Pickers (Defaults to first category)
  const [selectedCategoryId, setSelectedCategoryId] = useState("cut");
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedAddons, setSelectedAddons] = useState([]);

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
    } else setCalMonth((m) => m + 1);
  };

  const handleDayClick = (day) => {
    const formattedDate = `${calYear}-${String(calMonth + 1).padStart(
      2,
      "0"
    )}-${String(day).padStart(2, "0")}`;
    setSelectedDate(formattedDate);
  };

  // Switch category and wipe previous selection since it's a single item choice
  const handleCategoryChange = (id) => {
    setSelectedCategoryId(id);
    setSelectedItem(null);
  };

  const handleAddonToggle = (addon) => {
    if (selectedAddons.some((a) => a.id === addon.id)) {
      setSelectedAddons(selectedAddons.filter((a) => a.id !== addon.id));
    } else {
      setSelectedAddons([...selectedAddons, addon]);
    }
  };

  // Get active Category Data block
  const activeCategory = MENU_CATEGORIES.find(
    (cat) => cat.id === selectedCategoryId
  );

  // Compute Total Price
  const calculateTotal = () => {
    const baseItemPrice = selectedItem ? selectedItem.price : 0;
    const addonsPrice = selectedAddons.reduce(
      (sum, addon) => sum + addon.price,
      0
    );
    return baseItemPrice + addonsPrice;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (
      !selectedDate ||
      !selectedTime ||
      !selectedItem ||
      !customerName ||
      !customerEmail
    ) {
      alert("日時、メニュー、お客様情報をすべて入力してください。");
      return;
    }
    setShowConfirmation(true);
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
          {!showConfirmation ? (
            <>
              {/* Above */}
              <div className="data_time">
                {/* Date Picker */}
                <div className="calendar">
                  <div className="calendar__nav">
                    <button
                      className="calendar__navBtn"
                      aria-label="前月"
                      type="button"
                      onClick={prevMonth}
                    >
                      ‹
                    </button>
                    <span className="calendar__month">
                      {MONTHS_EN[calMonth]} {calYear}
                    </span>
                    <button
                      className="calendar__navBtn"
                      aria-label="翌月"
                      type="button"
                      onClick={nextMonth}
                    >
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
                    const isSelected = selectedDate === dateStr;

                    return (
                      <button
                        key={i}
                        type="button"
                        disabled={disabled}
                        onClick={() => handleDayClick(day)}
                        className={`calendar__day ${
                          disabled ? "disabled" : ""
                        } ${isSelected ? "selected" : ""}`}
                      >
                        {day}
                      </button>
                    );
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
                        <button
                          key={service.id}
                          type="button"
                          className={`services__card ${
                            selectedCategoryId === service.id
                              ? "active-category"
                              : ""
                          }`}
                          onClick={() => handleCategoryChange(service.id)}
                        >
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
                    {/* Focus Graphic Box matching selected Category */}
                    {activeCategory && (
                      <div className="reservation__serviceFocusPanel">
                        <div className="services__categoryGrid">
                          <img
                            src={activeCategory.img}
                            alt={activeCategory.category}
                            className="services__img"
                          />
                        </div>
                        <div className="services__menuItemWrapper">
                          <h3 className="services__price">¥4000</h3>
                          <p className="services__categoryDesc">
                            {activeCategory.categoryDescription}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Isolated Single Choice Item Section */}
                    <div className="service__pickupMenu">
                      <h3 className="services__price">
                        ご希望のメニュー (1つ選択)
                      </h3>
                      {activeCategory?.items.map((item, index) => {
                        const inputId = `menu-item-${index}`;
                        return (
                          <div key={index} className="service__radioGroup">
                            <input
                              type="radio"
                              name="pickup-menu-selection"
                              id={inputId}
                              checked={selectedItem?.name === item.name}
                              onChange={() => setSelectedItem(item)}
                            />
                            <label htmlFor={inputId}>{item.name}</label>
                            <span className="price">
                              ¥{item.price.toLocaleString()}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Addon Multi-Choice Picker */}
                  <div className="reservation__addons">
                    <div className="service__addonMenu">
                      <h3 className="services__title">
                        追加オプション (複数選択可)
                      </h3>
                      {ADDONS.map((addon) => (
                        <div key={addon.id} className="service__menuItem">
                          <div className="service__checkboxGroup">
                            <input
                              type="checkbox"
                              id={addon.id}
                              checked={selectedAddons.some(
                                (a) => a.id === addon.id
                              )}
                              onChange={() => handleAddonToggle(addon)}
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

                  {/* Reactive Running Live Summary Calculation */}
                  <div className="reservation__summary">
                    <div className="reservation__summary">
                      <hr />
                      {selectedItem && (
                        <div className="summary__row">
                          <span className="summary__label">
                            {selectedItem.name}
                          </span>

                          <div className="summary__dashed"></div>
                          <span className="summary__price">
                            {selectedItem.price.toLocaleString()}
                          </span>
                        </div>
                      )}

                      {selectedAddons.map((addon) => (
                        <div className="summary__row">
                          <span className="summary__label">{addon.name}</span>
                          <div className="summary__dashed"></div>
                          <span className="summary__price">
                            {addon.price.toLocaleString()}
                          </span>
                        </div>
                      ))}

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
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                      />
                    </div>
                    <div className="inputForm__row">
                      <input
                        type="email"
                        className="reservation__value"
                        placeholder="Email"
                        required
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
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
            </>
          ) : (
            /* Final Confirmation and thank you overlay views */
            <div className="reservation__message">
              {!isBooked ? (
                <>
                  <div className="reservation__confirmation">
                    <div className="confirmation__row">
                      <span className="confirmation__label">日時</span>
                      <span className="confirmation__value">
                        {selectedDate} {selectedTime}
                      </span>
                    </div>
                    <div className="confirmation__row">
                      <span className="confirmation__label">メニュー</span>
                      <span className="confirmation__value">
                        {selectedItem ? selectedItem.name : "未選択"}
                      </span>
                    </div>
                    <div className="confirmation__row">
                      <span className="confirmation__label">オプション</span>
                      <span className="confirmation__value">
                        {selectedAddons.map((a) => a.name).join(", ") || "なし"}
                      </span>
                    </div>
                    <div className="confirmation__row">
                      <span className="confirmation__label">お名前</span>
                      <span className="confirmation__value">
                        {customerName} 様
                      </span>
                    </div>
                    <div className="confirmation__row">
                      <span className="confirmation__label">メール</span>
                      <span className="confirmation__value">
                        {customerEmail}
                      </span>
                    </div>
                    <div className="confirmation__row">
                      <span className="confirmation__label">合計（目安）</span>
                      <span className="confirmation__value">
                        ¥{calculateTotal().toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="reservation__submitBtnWrapper">
                    <button
                      type="button"
                      onClick={() => setShowConfirmation(false)}
                      className="reservation__submitBtn backBtn"
                    >
                      修正する
                    </button>

                    <button
                      type="button"
                      className="reservation__submitBtn"
                      onClick={() => setIsBooked(true)}
                    >
                      この内容で予約する
                    </button>
                  </div>
                </>
              ) : (
                // {/* Success message */}
                <div className="success__wrapper">
                  <span className="reservation__successMsg">
                    ご予約ありがとうございます。
                    <br /> 24時間以内にご連絡いたします。
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
