import "./styles.css";
import { ADDRESS_JA, PHONE, MAIL, MAP_URL, HOURS } from "./utils/constants";
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

export default function StoreInfoProto() {
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

  return (
    <section className="salon">
      {/* 1. Header (Logo & Catchphrase) */}
      <header className="salonHeader">
        <img
          src={SALON_LOGO}
          alt="SALON Shizuka"
          className="salonHeader__logo"
          width={96}
        />
        <h2 className="salonHeader__tagline">
          心地よい空間、あなたのペースに合わせて。
        </h2>
      </header>

      <div className="salon__main">
        <div className="salon__left">
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
              <div className="statusBadge">
                <div className="salon__statusDot"></div>
                <span className="statusBadge__ja">営業中</span>
                <div className="line"></div>
                <span className="statusBadge__en">OPEN NOW</span>
              </div>

              {/* Access Info */}
              <div className="salon__detailGroup">
                <h3 className="salon__infoTitle">アクセス</h3>
                <ul className="salon__infoTextContent">
                  <li className="salon__infoText">{ADDRESS_JA}</li>
                  <li className="salon__infoText">原宿駅 竹下口 徒歩3分</li>
                </ul>
              </div>

              {/* Parking Info */}
              <div className="salon__detailGroup">
                <h3 className="salon__infoTitle">駐車場</h3>
                <ul className="salon__infoTextContent">
                  <li className="salon__infoText">２台完備 / ２Spaces</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="salon__hoursCard">
            {/* Weeklychart */}
            <div className="salon__weeklyChart">
              <div className="salon__chartInfo">
                <h3 className="salon__chartTitle">営業時間</h3>
                <div className="salon__chartGrid">
                  {HOURS.map((item, key) => (
                    <div key={key} className={`salon__chartCard`}>
                      <h4 className="salon__chartLabel">{item.day}</h4>

                      <div
                        className={`salon__chartTimeBox 
                        ${item.closed ? "salon__chartTimeBoxClosed" : ""}
                        ${
                          item.day === "Sat" || item.day === "Sun"
                            ? "salon__chartTimeBoxWeekend"
                            : ""
                        }
                        `}
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
                  ))}
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
        <div className="salon__right">
          <div className="salon__contactCard">
            <h3 className="salon__contactTitle">連絡先</h3>

            {/*  Contact Info */}
            <div className="salon__contactItem">
              {/* Address */}
              <div className="salon__contactContent">
                <div className="salon__contactItemBody">
                  <h4 className="salon__infoLabel">住所</h4>
                  <ul className="salon__infoList">
                    <li className="salon__infoItem">{ADDRESS_JA}</li>
                  </ul>
                </div>
                <div className="salon__ctaWrapper ghost">
                  <a
                    href="https://maps.app.goo.gl/DPCTpbdACqRzG3px9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="salon__link"
                    aria-label="Google マップで場所を確認する"
                  >
                    OPEN MAP
                  </a>
                </div>
              </div>
              {/* PHONE */}
              <div className="salon__contactContent">
                <div className="salon__contactItemBody">
                  <h4 className="salon__infoLabel">TEL</h4>
                  <ul className="salon__infoList">
                    <li className="salon__infoItem">{PHONE}</li>
                  </ul>
                </div>
                <div className="salon__ctaWrapper ghost">
                  <a
                    href={`tel:${PHONE}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="salon__link"
                    aria-label="Salonへ電話する"
                  >
                    CALL NOW
                  </a>
                </div>
              </div>

              {/* MAIL */}
              <div className="salon__contactContent">
                <div className="salon__contactItemBody">
                  <h4 className="salon__infoLabel">MAIL</h4>
                  <ul className="salon__infoList">
                    <li className="salon__infoItem">{MAIL}</li>
                  </ul>
                </div>
                <div className="salon__ctaWrapper ghost">
                  <a
                    href={`mailto:${MAIL}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="salon__link"
                    aria-label="Salonへ電話する"
                  >
                    SEND EMAIL
                  </a>
                </div>
              </div>
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
    </section>
  );
}
