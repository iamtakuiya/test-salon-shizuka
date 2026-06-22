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

import React, { useState } from "react";
import "./styles.css";

import { MENU_CATEGORIES, ADDONS, TIME_SLOTS } from "./constants";

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

function isClosed(year, month, day) {
  return new Date(year, month, day).getDay() === 3; // Closed on Wednesdays
}

function isPast(year, month, day) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(year, month, day) < today;
}

export default function ReservationSectionProto() {
  // View Router State
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isBooked, setIsBooked] = useState(false);

  // Customer Contact Fields
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");

  // Date & Time Picker States
  const today = new Date();
  const [calYear, setCalYear] = useState(today.getFullYear());
  const [calMonth, setCalMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  // Slider & Focus Panel Navigation View State
  const [selectedCategoryId, setSelectedCategoryId] = useState("cut");

  // Selection Storage: Maps unique choices by Category ID { "cut": itemObj, "color": itemObj }
  const [selectedItems, setSelectedItems] = useState({});
  const [selectedAddons, setSelectedAddons] = useState([]);

  const cells = buildCalendar(calYear, calMonth);

  // Month Shifting Navigation
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

  // Dynamic Radio Single-Choice updates partitioned per Category Scope
  const handleItemSelect = (categoryId, item) => {
    setSelectedItems((prev) => ({
      ...prev,
      [categoryId]: item,
    }));
  };

  const handleAddonToggle = (addon) => {
    if (selectedAddons.some((a) => a.id === addon.id)) {
      setSelectedAddons(selectedAddons.filter((a) => a.id !== addon.id));
    } else {
      setSelectedAddons([...selectedAddons, addon]);
    }
  };

  // Gather arrays of active structured selection models
  const activeMenuSelectionList = Object.values(selectedItems).filter(Boolean);
  const activeCategory = MENU_CATEGORIES.find(
    (cat) => cat.id === selectedCategoryId
  );
  const currentCategoryIndex = MENU_CATEGORIES.findIndex(
    (cat) => cat.id === selectedCategoryId
  );

  // Aggregated Price Calculator Engine
  const calculateTotal = () => {
    const basePrice = activeMenuSelectionList.reduce(
      (sum, item) => sum + item.price,
      0
    );
    const addonPrice = selectedAddons.reduce(
      (sum, addon) => sum + addon.price,
      0
    );
    return basePrice + addonPrice;
  };

  // Controller Slide Steps Shifting Actions
  const handleNextSlide = () => {
    const nextIdx =
      currentCategoryIndex === MENU_CATEGORIES.length - 1
        ? 0
        : currentCategoryIndex + 1;
    setSelectedCategoryId(MENU_CATEGORIES[nextIdx].id);
  };

  const handlePrevSlide = () => {
    const prevIdx =
      currentCategoryIndex === 0
        ? MENU_CATEGORIES.length - 1
        : currentCategoryIndex - 1;
    setSelectedCategoryId(MENU_CATEGORIES[prevIdx].id);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (
      !selectedDate ||
      !selectedTime ||
      activeMenuSelectionList.length === 0
    ) {
      alert("日時、および最低1つのメニュー項目を選択してください。");
      return;
    }
    setShowConfirmation(true);
  };

  return (
    <section id="reservation" className="reservation">
      <div className="reservation__headline">
        <span className="reservation__subheading">ご予約</span>
        <h2 className="reservation__heading">Reservation</h2>
      </div>

      <div className="reservation__panel">
        {!showConfirmation ? (
          /* ================= STEP 1: INTERACTIVE SELECTION INTERFACE ================= */
          <>
            <div className="data__time">
              {/* Date Calendar Picker */}
              <div className="calendar">
                <div className="calendar__nav">
                  <button
                    type="button"
                    onClick={prevMonth}
                    className="calendar__navBtn"
                    aria-label="前月"
                  >
                    ‹
                  </button>
                  <span className="calendar__month">
                    {MONTHS_EN[calMonth]} {calYear}
                  </span>
                  <button
                    type="button"
                    onClick={nextMonth}
                    className="calendar__navBtn"
                    aria-label="翌月"
                  >
                    ›
                  </button>
                </div>

                <div className="divider"></div>

                <div className="calendar__grid">
                  {DAYS_JA.map((d) => (
                    <div key={d} className="calendar__dayHeader">
                      {d}
                    </div>
                  ))}
                  {cells.map((day, i) => {
                    if (!day)
                      return (
                        <div
                          key={`empty-${i}`}
                          className="calendar__dayEmpty"
                        />
                      );
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
              </div>

              {/* Time Slots Selection */}
              <div className="reservation__timeslot">
                <div className="timeslot__labelWrapper">
                  <h3 className="timeslot__label">ご希望時間</h3>
                </div>
                <div className="timeSlots">
                  {TIME_SLOTS.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setSelectedTime(t)}
                      className={`timeSlots__slot ${
                        selectedTime === t ? "selected" : ""
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Configurator Workflow Core */}
            <form
              onSubmit={handleFormSubmit}
              className="service_options_confirmation"
            >
              <div className="reservation__sectionHeadline">
                <h3 className="reservation__label">
                  ご希望のヘアケアをお選びください
                </h3>
              </div>

              {/* Multi-Card Fit Content Shift Slider */}
              <div className="reservation__content">
                <div className="reservation__serviceGrid">
                  <div className="services__sliderViewport">
                    <div
                      className="reservation__serviceCategory"
                      style={{
                        transform: `translateX(-${
                          currentCategoryIndex * (100 / MENU_CATEGORIES.length)
                        }%)`,
                        width: `${MENU_CATEGORIES.length * 50}%`,
                        display: "flex",
                        transition:
                          "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)",
                      }}
                    >
                      {MENU_CATEGORIES.map((service) => (
                        <button
                          key={service.id}
                          type="button"
                          className={`services__card ${
                            selectedCategoryId === service.id
                              ? "active-category"
                              : ""
                          }`}
                          onClick={() => setSelectedCategoryId(service.id)}
                          style={{ width: `${100 / MENU_CATEGORIES.length}%` }}
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
                  </div>

                  {/* Slider Pagination Controls */}
                  <div className="services__controller">
                    <div className="services__pagination">
                      {MENU_CATEGORIES.map((service, index) => (
                        <button
                          key={`dot-${service.id}`}
                          type="button"
                          className={`services__dot ${
                            selectedCategoryId === service.id
                              ? "active-dot"
                              : ""
                          }`}
                          onClick={() => setSelectedCategoryId(service.id)}
                          aria-label={`Go to slide ${index + 1}`}
                        />
                      ))}
                    </div>
                    <div className="services__navBtnWrapper">
                      <button
                        type="button"
                        className="services__navBtn"
                        onClick={handlePrevSlide}
                        aria-label="Prev"
                      >
                        ‹
                      </button>
                      <button
                        type="button"
                        className="services__navBtn"
                        onClick={handleNextSlide}
                        aria-label="Next"
                      >
                        ›
                      </button>
                    </div>
                  </div>
                </div>

                <aside className="reservation__sidebar">
                  {/* Contextual Visual Focus Panel & Submenu options */}
                  <div className="reservation__services">
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
                          <h3 className="services__price">
                            {selectedItems[activeCategory.id]
                              ? `¥${selectedItems[
                                  activeCategory.id
                                ].price.toLocaleString()}`
                              : "メニュー未選択"}
                          </h3>
                          <p className="services__categoryDesc">
                            {activeCategory.categoryDescription}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Isolated Sub-Menu Items for Active Tab Choice */}
                    <div className="service__pickupMenu">
                      <h3 className="services__title">メニュー</h3>
                      <div className="service__radioGroupWrapper">
                        {activeCategory?.items.map((item, index) => {
                          const inputId = `menu-item-${activeCategory.id}-${index}`;
                          return (
                            <div key={index} className="service__radioGroup">
                              <input
                                type="radio"
                                name={`pickup-menu-selection-${activeCategory.id}`}
                                id={inputId}
                                checked={
                                  selectedItems[activeCategory.id]?.name ===
                                  item.name
                                }
                                onChange={() =>
                                  handleItemSelect(activeCategory.id, item)
                                }
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
                  </div>

                  {/* Addons Array Multi-choice Picker */}
                  <div className="reservation__addons">
                    <h3 className="services__title">追加オプション</h3>
                    <div className="service__addonMenu">
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

                  {/* Aggregated Cross-Category Living Summary Display */}
                  <div className="reservation__summary">
                    <div className="reservation__summaryContainer">
                      {/* <h3 className="services__title">選択内容の確認</h3> */}
                      <div className="divider"></div>
                      {activeMenuSelectionList.map((item, idx) => (
                        <div key={`sum-item-${idx}`} className="summary__row">
                          <span className="summary__label">{item.name}</span>
                          <div className="summary__dashed" />
                          <span className="summary__price">
                            ¥{item.price.toLocaleString()}
                          </span>
                        </div>
                      ))}
                      {selectedAddons.map((addon) => (
                        <div key={addon.id} className="summary__row">
                          <span className="summary__label">{addon.name}</span>
                          <div className="summary__dashed" />
                          <span className="summary__price">
                            ¥{addon.price.toLocaleString()}
                          </span>
                        </div>
                      ))}
                      <div className="divider"></div>
                      <div className="summary__row">
                        <span className="summary__label font-bold">Total</span>
                        <span className="summary__total">
                          ¥{calculateTotal().toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <div className="service__summaryFootNote">
                      <p className="summary__footNote">
                        表記価格は税込・基本料金です。髪の長さや状態により追加料金が発生する場合がございます。詳細はカウンセリング時にご案内いたします。
                      </p>
                    </div>
                  </div>

                  {/* Customer Information Block */}
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
            </form>
          </>
        ) : (
          /* ================= STEP 2: PRISTINE FINAL OVERLAY VIEW ================= */
          <div className="confirmationPanel">
            {!isBooked ? (
              <>
                <div className="confirmation">
                  <div className="confirmation__row">
                    <span className="confirmation__label">日時</span>
                    <span className="confirmation__value">
                      {selectedDate} {selectedTime}
                    </span>
                  </div>
                  <div className="confirmation__row">
                    <span className="confirmation__label">メニュー</span>
                    <span className="confirmation__value">
                      {activeMenuSelectionList
                        .map((item) => item.name)
                        .join(", ") || "未選択"}
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
                    <span className="confirmation__value">{customerEmail}</span>
                  </div>
                  <div className="confirmation__row">
                    <span className="confirmation__label">合計（目安）</span>
                    <span className="confirmation__value">
                      ¥{calculateTotal().toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="confirmation__inputForm">
                  <div className="confirmation__submitBtnWrapper">
                    <button
                      type="button"
                      onClick={() => setShowConfirmation(false)}
                      className="confirmation__submitBtn--ghost"
                    >
                      修正する
                    </button>
                  </div>
                  <div className="confirmation__submitBtnWrapper">
                    <button
                      type="button"
                      onClick={() => setIsBooked(true)}
                      className="confirmation__submitBtn"
                    >
                      この内容で予約する
                    </button>
                  </div>
                </div>
              </>
            ) : (
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
  );
}

window.addEventListener("resize", () => {
  console.log(window.innerWidth);
});
