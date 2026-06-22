// ReservationSection – composition root (formerly App.tsx)
import React, { useState } from "react";
import "./ReservationSection.module.scss"; // section‑level styles
import { MENU_CATEGORIES, ADDONS } from "@/utils/constants";
import styles from './ReservationSection.module.scss';

// Sub‑components (presentational)
import {
  Calendar,
  TimePicker,
  ServiceSlider,
  ServiceFocusPanel,
  AddonPicker,
  Summary,
  Confirmation,
  ContactForm,
} from "./components/index";

export default function ReservationSection() {
  // ==== Router / step state ====
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isBooked, setIsBooked] = useState(false);

  // ==== Form fields ====
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");

  // ==== Date & time picker ====
  const today = new Date();
  const [calYear, setCalYear] = useState(today.getFullYear());
  const [calMonth, setCalMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  // ==== Service selector ====
  const [selectedCategoryId, setSelectedCategoryId] = useState("cut");
  const [selectedItems, setSelectedItems] = useState<Record<string, any>>({}); // map by category id
  const [selectedAddons, setSelectedAddons] = useState<Array<any>>([]);

  // ---- Helpers for calendar navigation ----
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

  // ---- Selection handlers ----
  const handleItemSelect = (categoryId: string, item: any) => {
    setSelectedItems((prev) => ({ ...prev, [categoryId]: item }));
  };
  const handleAddonToggle = (addon: any) => {
    if (selectedAddons.some((a) => a.id === addon.id)) {
      setSelectedAddons(selectedAddons.filter((a) => a.id !== addon.id));
    } else {
      setSelectedAddons([...selectedAddons, addon]);
    }
  };

  const activeCategory = MENU_CATEGORIES.find((c) => c.id === selectedCategoryId);
  const activeMenuSelectionList = Object.values(selectedItems).filter(Boolean);

  const calculateTotal = () => {
    const base = activeMenuSelectionList.reduce((sum, i) => sum + i.price, 0);
    const add = selectedAddons.reduce((sum, a) => sum + a.price, 0);
    return base + add;
  };

  const currentCategoryIndex = MENU_CATEGORIES.findIndex((c) => c.id === selectedCategoryId);

  const handlePrevSlide = () => {
    const prevIdx = currentCategoryIndex === 0 ? MENU_CATEGORIES.length - 1 : currentCategoryIndex - 1;
    setSelectedCategoryId(MENU_CATEGORIES[prevIdx].id);
  };
  const handleNextSlide = () => {
    const nextIdx = currentCategoryIndex === MENU_CATEGORIES.length - 1 ? 0 : currentCategoryIndex + 1;
    setSelectedCategoryId(MENU_CATEGORIES[nextIdx].id);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime || activeMenuSelectionList.length === 0) {
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
          <>
            {/* Date & Time */}
            <Calendar
              calYear={calYear}
              calMonth={calMonth}
              setCalYear={setCalYear}
              setCalMonth={setCalMonth}
              prevMonth={prevMonth}
              nextMonth={nextMonth}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
            <TimePicker
              selectedTime={selectedTime}
              setSelectedTime={setSelectedTime}
            />

            {/* Service Slider */}
            <ServiceSlider
              categories={MENU_CATEGORIES}
              selectedCategoryId={selectedCategoryId}
              setSelectedCategoryId={setSelectedCategoryId}
              currentIndex={currentCategoryIndex}
              handlePrevSlide={handlePrevSlide}
              handleNextSlide={handleNextSlide}
            />

            {/* Sidebar – focus panel, menu, addons, summary, contact form */}
            <aside className="reservation__sidebar">
              <ServiceFocusPanel
                activeCategory={activeCategory}
                selectedItems={selectedItems}
                handleItemSelect={handleItemSelect}
              />
              <AddonPicker
                addons={ADDONS}
                selectedAddons={selectedAddons}
                handleAddonToggle={handleAddonToggle}
              />
              <Summary
                selectionList={activeMenuSelectionList}
                selectedAddons={selectedAddons}
                calculateTotal={calculateTotal}
              />
              <ContactForm
                customerName={customerName}
                setCustomerName={setCustomerName}
                customerEmail={customerEmail}
                setCustomerEmail={setCustomerEmail}
                handleFormSubmit={handleFormSubmit}
              />
            </aside>
          </>
        ) : (
          <Confirmation
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            selectionList={activeMenuSelectionList}
            selectedAddons={selectedAddons}
            customerName={customerName}
            customerEmail={customerEmail}
            calculateTotal={calculateTotal}
            setShowConfirmation={setShowConfirmation}
            setIsBooked={setIsBooked}
            isBooked={isBooked}
          />
        )}
      </div>
    </section>
  );
}
