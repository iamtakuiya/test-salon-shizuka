/**
 * TODO
 * And how do I handle scrolling so that when I scroll up and the scroll container is the first item, the page scrolls up as normal? Similarly,
 * when I scroll down and the scroll container is the last item,
 * the window scrolls down as normal. Currently, scrolling doesn't work when at the first or last items; it just keeps the scroll within the container and doesn't scroll the page.
 */

import { useRef, useState, useEffect } from "react";
import "./styles.css";
import { Section, Container, Grid, Row, Stack, Box } from '@/components/primitives';
// import { ADDRESS_JA, PHONE, MAIL, MAP_URL, HOURS } from "./utils/constants";
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

const LOCATION_INFO = [
  { title: "アクセス", info: `${ADDRESS_JA}`, note: "原宿駅 竹下口 徒歩3分" },
  { title: "駐車場", info: "", note: "２台完備 / ２Spaces" },
] as const;

// Extracted to prevent re-creation on every render pass
function EmbeddedGoogleMap() {
  return (
    <iframe
      frameBorder="0"
      style={{
        border: 0,
      }}
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

export default function SalonInfoSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  // Set up the open status state hook
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const gridRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  function handleScroll() {
    if (!gridRef.current) return;

    const cardWidth = 98;

    const index = Math.round(gridRef.current.scrollLeft / cardWidth);

    setCurrentIndex(index);
  }

  function snapToCard(index: number) {
    gridRef.current?.scrollTo({
      left: index * 98,
      behavior: "smooth",
    });
  }

  useEffect(() => {
    const section = gridRef.current;
    const track = trackRef.current;

    if (!section || !track) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();

      const progress =
        Math.abs(rect.top) / (section.offsetHeight - window.innerHeight);

      const maxTranslate = track.scrollWidth - window.innerWidth;

      track.style.transform = `translateX(-${progress * maxTranslate}px)`;
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // The JavaScript "Wheel Translation" Approach, the Wheel Scroll useEffect hook:
  useEffect(() => {
    const hoursCard = cardRef.current;
    const scrollGrid = gridRef.current;

    // We need BOTH elements available to proceed
    if (!hoursCard || !scrollGrid) return;

    const handleWheelScroll = (event: WheelEvent) => {
      if (event.deltaY === 0) return;

      const currentScroll = scrollGrid.scrollLeft;
      const maxScroll = scrollGrid.scrollWidth - scrollGrid.clientWidth;

      // Boundary condition checks
      const isAtStart = event.deltaY < 0 && currentScroll <= 0;
      const isAtEnd = event.deltaY > 0 && currentScroll >= maxScroll - 1;

      // If the inner timetable has hit its horizontal limits,
      // let the browser natively pass the scroll up to the main window page.
      if (isAtStart || isAtEnd) {
        return;
      }

      // If we are safely inside the horizontal tracks, stop the page drop
      // and translate the vertical wheel momentum to the grid's horizontal property.
      event.preventDefault();
      scrollGrid.scrollLeft += event.deltaY;
    };

    // Attach the listener directly to the entire card wrapper
    hoursCard.addEventListener("wheel", handleWheelScroll, { passive: false });

    return () => {
      hoursCard.removeEventListener("wheel", handleWheelScroll);
    };
  }, []);

  // This effect to calculate and update the status dynamically
  useEffect(() => {
    // Initial check on page load
    setIsOpen(checkIfOpen(HOURS));

    // Optional: Re-verify every 60 seconds so the badge changes automatically without a refresh
    const intervalId = setInterval(() => {
      setIsOpen(checkIfOpen(HOURS));
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Section className="salon">
      {/* 1. Header (Logo & Catchphrase) */}
      <header className="salon__header">
        <img
          src={SALON_LOGO}
          alt="SALON Shizuka"
          className="salon__headerLogo"
          width={96}
        />
        <h2 className="salon__headerTagline">
          心地よい空間、あなたのペースに合わせて。
        </h2>
      </header>

      <Container>
        <Row gap="lg" className="salon__main">
        <Box as="div" className="salon__left">
          {/* Location Block */}
          <div className="salon__locationBlock">
            <div className="salon__mapContent">
              {/* Map */}
              <div className="salon__mapEmbed">
                <EmbeddedGoogleMap />
              </div>
              {/* Actions */}
              <div className="salon__mapActions">
                {MAP_QUICK_ACTIONS.map((action, index) => (
                  <a
                    key={index}
                    href={action.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="salon-mapActionsBtn"
                    aria-label={action.label}
                  >
                    <img src={action.src} alt={action.label} />
                  </a>
                ))}
              </div>
            </div>

            {/* Location Meta Specs */}
            <div className="salon__metaDetails">
              {/* Badge Text */}
              <div
                className={`statusBadge ${
                  !isOpen ? "statusBadge--closed" : ""
                }`}
              >
                <div
                  className={`salon__statusDot ${
                    !isOpen ? "salon__statusDot--closed" : ""
                  }`}
                ></div>
                <span className="statusBadge__ja">
                  {isOpen ? "営業中" : "営業時間外"}
                </span>
                <div className="line"></div>
                <span className="statusBadge__en">
                  {isOpen ? "OPEN NOW" : "CLOSED NOW"}
                </span>
              </div>

              {LOCATION_INFO.map((location, key) => (
                <div key={key} className="salon__detailGroup">
                  <h3 className="salon__infoTitle">{location.title}</h3>
                  <ul className="salon__infoTextContent">
                    {location.info && (
                      <li className="salon__infoText">{location.info}</li>
                    )}
                    <li className="salon__infoText">{location.note}</li>
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div ref={cardRef} className="salon__hoursCard">
            {/* Weeklychart */}
            <div className="salon__weeklyChart">
              <div className="salon__chartInfo">
                <h3 className="salon__chartTitle">営業時間</h3>
                <Grid
                  ref={gridRef}
                  onScroll={handleScroll}
                  className="salon__chartGrid scroll-container"
                >
                  {HOURS.map((item, key) => {
                    const isWeekend = item.day === "Sat" || item.day === "Sun";

                    return (
                      <div key={key} className={`salon__chartCard`}>
                        <h4 className="salon__chartLabel">{item.day}</h4>

                        <div
                          className={`salon__chartTimeBox 
                          ${item.closed ? "salon__chartTimeBoxClosed" : ""}
                          ${isWeekend ? "salon__chartTimeBoxWeekend" : ""}`}
                        >
                          {item.closed ? (
                            <span className="salon__statusText">Closed</span>
                          ) : (
                            <>
                              <span className="salon__timeText">
                                {item.open}~
                              </span>

                              <span className="salon__timeText">
                                {item.close}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            {/*  Closed Info */}
            <div className="salon__closedInfo">
              <h3 className="salon__infoTitle">定休日</h3>
              <ul className="salon__infoTextContent">
                <li className="salon__infoText">毎週　月曜日・第2火曜日</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right */}
        <Box as="div" className="salon__right">
          <div className="salon__contactCard">
            <h3 className="salon__contactTitle">連絡先</h3>

            {/*  Contact Info */}
            <div className="salon__contactItem">
              {CONTACT_INFO.map((contact, index) => (
                <div key={index} className="salon__contactContent">
                  <div className="salon__contactItemBody">
                    <h4 className="salon__infoLabel">{contact.label}</h4>
                    <ul className="salon__infoList">
                      <li className="salon__infoItem">{contact.info}</li>
                    </ul>
                  </div>
                  <div className="salon__ctaWrapper ghost">
                    <a
                      href={contact.href}
                      target={contact.target}
                      rel={contact.rel}
                      className="salon__link"
                    >
                      {contact.cta}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="divider"></div>

          <div className="salon__payments">
            {/*  Payment Info */}
            <div className="salon__paymentsContent">
              <h3 className="salon__paymentsTitle">お支払方法</h3>
              <div className="salon__paymentsGrid">
                {PAYMENT_METHODS.map((method, index) => (
                  <img
                    key={index}
                    src={method.src}
                    alt={method.alt}
                    width={24}
                    height={24}
                    className="salon__paymentsLogo"
                  />
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="salon__ctaWrapper booknow">
              {/* This CTA jump to Reservation section */}
              <a href="#reservation" className="salon__actionBtn primary">
                ご予約はこちら (BOOK NOW)
              </a>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
