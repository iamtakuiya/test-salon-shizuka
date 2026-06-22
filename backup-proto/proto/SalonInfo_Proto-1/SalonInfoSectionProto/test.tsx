import React from "react";
import "./styles.css";
import SALON_LOGO from "./assets/logo.svg";

// Payment Provider Logos
import visaLogo from "./assets/payments/Visa.svg";
import mastercardLogo from "./assets/payments/Mastercard.svg";
import googlePayLogo from "./assets/payments/GooglePay.svg";
import payPalLogo from "./assets/payments/PayPal.svg";

// Quick Action Icons (Overlaying the Map)
import mapPinIcon from "./assets/icons/info/Location.svg";
import phoneIcon from "./assets/icons/info/Support.svg";
import mailIcon from "./assets/icons/info/Feedback.svg";

export const ADDRESS_JA = "東京都渋谷区神宮前1-1-1";
export const PHONE = "03-0000-0000";
export const MAIL = "salon@example.com";
export const MAP_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  ADDRESS_JA
)}`;

export const HOURS = [
  { day: "Mon", dayJa: "月", open: "", close: "", closed: true },
  { day: "Tue", dayJa: "火", open: "", close: "", closed: true },
  { day: "Wed", dayJa: "水", open: "10:00", close: "20:00", closed: false },
  { day: "Thu", dayJa: "木", open: "10:00", close: "20:00", closed: false },
  { day: "Fri", dayJa: "金", open: "10:00", close: "20:00", closed: false },
  { day: "Sat", dayJa: "土", open: "10:00", close: "19:00", closed: false },
  { day: "Sun", dayJa: "日", open: "10:00", close: "19:00", closed: false },
] as const;

const PAYMENT_METHODS = [
  { src: visaLogo, alt: "Visa" },
  { src: mastercardLogo, alt: "Mastercard" },
  { src: googlePayLogo, alt: "Google Pay" },
  { src: payPalLogo, alt: "PayPal" },
] as const;

const MAP_QUICK_ACTIONS = [
  { src: mapPinIcon, label: "Google マップを開く", href: MAP_URL },
  { src: phoneIcon, label: "電話をかける", href: `tel:${PHONE}` },
  { src: mailIcon, label: "メールを送る", href: `mailto:${MAIL}` },
] as const;

const CONTACT_INFO = [
  {
    label: "住所",
    info: ADDRESS_JA,
    cta: "OPEN MAP",
    href: MAP_URL,
    rel: "noopener noreferrer",
    target: "_blank",
  },
  {
    label: "TEL",
    info: PHONE,
    cta: "CALL NOW",
    href: `tel:${PHONE}`,
    rel: "",
    target: "_self",
  },
  {
    label: "MAIL",
    info: MAIL,
    cta: "SEND EMAIL",
    href: `mailto:${MAIL}`,
    rel: "",
    target: "_self",
  },
] as const;

const LOCATION_DETAILS = [
  { title: "アクセス", info: ADDRESS_JA, note: "原宿駅 竹下口 徒歩3分" },
  { title: "駐車場", info: "", note: "２台完備 / ２Spaces" },
] as const;

// Extracted outside the component cycle to optimize canvas tree rendering speeds
function EmbeddedGoogleMap() {
  return (
    <iframe
      frameBorder="0"
      style={{ border: 0 }}
      referrerPolicy="no-referrer-when-downgrade"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25925.83322846608!2d139.59823360000001!3d35.6836705!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6018f1879027708f%3A0x2a9a3f9590026f6!2sSetagaya%20Literary%20Museum!5e0!3m2!1sen!2sjp!4v1781761228683!5m2!1sen!2sjp"
      allowFullScreen
      title="Salon Location Map"
    />
  );
}

function checkIfOpen(hoursConfig: typeof HOURS): boolean {
  const now = new Date();

  // JavaScript getDay() returns: 0 = Sun, 1 = Mon, 2 = Tue, 3 = Wed, 4 = Thu, 5 = Fri, 6 = Sat
  // We need to remap this to match your HOURS array index alignment:
  // Mon=0, Tue=1, Wed=2, Thu=3, Fri=4, Sat=5, Sun=6
  const currentJsDay = now.getDay();
  const hoursIndex = currentJsDay === 0 ? 6 : currentJsDay - 1;

  const todayConfig = hoursConfig[hoursIndex];

  // 1. If the configuration explicitly flags today as closed, stop here.
  if (todayConfig.closed || !todayConfig.open || !todayConfig.close) {
    return false;
  }

  // 2. Extract current hours and minutes
  const currentHours = now.getHours();
  const currentMinutes = now.getMinutes();
  const currentTimeInMinutes = currentHours * 60 + currentMinutes;

  // 3. Parse the setup configuration strings (e.g., "10:00" -> 600 minutes)
  const [openH, openM] = todayConfig.open.split(":").map(Number);
  const [closeH, closeM] = todayConfig.close.split(":").map(Number);

  const openTimeInMinutes = openH * 60 + openM;
  const closeTimeInMinutes = closeH * 60 + closeM;

  // 4. Return true if the current time falls directly within the open and close window
  return (
    currentTimeInMinutes >= openTimeInMinutes &&
    currentTimeInMinutes < closeTimeInMinutes
  );
}

export default function StoreInfoProto() {
  return (
    <section className="salon-section">
      {/* 1. Header Component Block */}
      <header className="salon-header">
        <img
          src={SALON_LOGO}
          alt="SALON Shizuka"
          className="salon-header__logo"
          width={96}
        />
        <h2 className="salon-header__tagline">
          心地よい空間、あなたのペースに合わせて。
        </h2>
      </header>

      {/* 2. Primary Twin Layout Context Container */}
      <div className="salon-main">
        {/* ■ Left Main Content Workspace Column */}
        <div className="salon-main__left">
          {/* Location Details Segment Context */}
          <div className="salon-location-block">
            <div className="salon-map-content">
              <div className="salon-map-embed">
                <EmbeddedGoogleMap />
              </div>
              <div className="salon-map-actions">
                {MAP_QUICK_ACTIONS.map((action, index) => (
                  <a
                    key={index}
                    href={action.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="salon-map-actions__btn"
                    aria-label={action.label}
                  >
                    <img src={action.src} alt={action.label} />
                  </a>
                ))}
              </div>
            </div>

            {/* Real-time Open Info Metadata Badges */}
            <div className="salon-meta-details">
              <div className="status-badge">
                <div className="status-badge__dot" />
                <span className="status-badge__ja">営業中</span>
                <div className="status-badge__divider" />
                <span className="status-badge__en">OPEN NOW</span>
              </div>

              {LOCATION_DETAILS.map((location, index) => (
                <div key={index} className="salon-detail-group">
                  <h3 className="salon-detail-group__title">
                    {location.title}
                  </h3>
                  <ul className="salon-detail-group__list">
                    {location.info && (
                      <li className="salon-detail-group__item">
                        {location.info}
                      </li>
                    )}
                    <li className="salon-detail-group__item">
                      {location.note}
                    </li>
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Combined Operations Hours Visual Matrix */}
          <div className="salon-hours-card">
            <div className="salon-weekly-chart">
              <h3 className="salon-weekly-chart__title">営業時間</h3>
              <div className="salon-weekly-chart__grid">
                {HOURS.map((item, index) => (
                  <div key={index} className="salon-chart-card">
                    <h4 className="salon-chart-card__label">{item.day}</h4>
                    <div
                      className={`salon-chart-card__timebox 
                        ${
                          item.closed ? "salon-chart-card__timebox--closed" : ""
                        }
                        ${
                          item.day === "Sat" || item.day === "Sun"
                            ? "salon-chart-card__timebox--weekend"
                            : ""
                        }
                      `}
                    >
                      {item.closed ? (
                        <span className="salon-chart-card__status">Closed</span>
                      ) : (
                        <>
                          <span className="salon-chart-card__time">
                            {item.open}~
                          </span>
                          <span className="salon-chart-card__time">
                            {item.close}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Static Closed Schedule Explanatory Context Info */}
            <div className="salon-closed-info">
              <h3 className="salon-closed-info__title">定休日</h3>
              <ul className="salon-closed-info__list">
                <li className="salon-closed-info__item">
                  毎週 月曜日・第2火曜日
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* ■ Right Action Panel Sidebar Sidebar Section Column */}
        <div className="salon-main__right">
          <div className="salon-contact-card">
            <h3 className="salon-contact-card__title">連絡先</h3>
            <div className="salon-contact-card__items">
              {CONTACT_INFO.map((contact, index) => (
                <div key={index} className="salon-contact-row">
                  <div className="salon-contact-row__body">
                    <h4 className="salon-contact-row__label">
                      {contact.label}
                    </h4>
                    <ul className="salon-contact-row__list">
                      <li className="salon-contact-row__item">
                        {contact.info}
                      </li>
                    </ul>
                  </div>
                  <div className="salon-contact-row__cta-box">
                    <a
                      href={contact.href}
                      target={contact.target}
                      rel={contact.rel}
                      className="salon-contact-row__link"
                    >
                      {contact.cta}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="salon-divider" />

          {/* Secure Transact Payments Ecosystem and Primary Global CTA Conversion Target */}
          <div className="salon-payments">
            <div className="salon-payments__content">
              <h3 className="salon-payments__title">お支払方法</h3>
              <div className="salon-payments__grid">
                {PAYMENT_METHODS.map((method, index) => (
                  <img
                    key={index}
                    src={method.src}
                    alt={method.alt}
                    width={24}
                    height={24}
                    className="salon-payments__logo"
                  />
                ))}
              </div>
            </div>

            <div className="salon-primary-cta">
              <a href="#reservation" className="salon-primary-cta__btn">
                ご予約はこちら (BOOK NOW)
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
