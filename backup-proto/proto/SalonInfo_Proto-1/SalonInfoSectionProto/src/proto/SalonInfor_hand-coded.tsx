import "./styles.css";
import { ADDRESS_JA, PHONE, MAIL, MAP_URL, HOURS } from "./utils/constants";
import LOGO from "./assets/logo.svg";

import paymentLogo01 from "./assets/payments/Yandex.svg";
import paymentLogo02 from "./assets/payments/Visa.svg";
import paymentLogo03 from "./assets/payments/Mastercard.svg";
import paymentLogo04 from "./assets/payments/GooglePay.svg";
import paymentLogo05 from "./assets/payments/PayPal.svg";

import Icon01 from "./assets/icons/info/Location.svg";
import Icon02 from "./assets/icons/info/Support.svg";
import Icon03 from "./assets/icons/info/Feedback.svg";

export const PAYMENTS = [
  { img: paymentLogo01, label: "yandex" },
  { img: paymentLogo02, label: "visa" },
  { img: paymentLogo03, label: "mastercard" },
  { img: paymentLogo04, label: "googlepay" },
  { img: paymentLogo05, label: "paypal" },
] as const;

export const INFO_ICONS = [
  { img: Icon01, label: "Google マップで場所を確認する", name: "location" },
  { img: Icon02, label: "", name: "support" },
  { img: Icon03, label: "", name: "feedback" },
];

export default function SalonInformationProto() {
  const AddressMap = () => {
    return (
      <iframe
        width="450"
        height="250"
        frameborder="0"
        style={{ border: 0 }}
        referrerpolicy="no-referrer-when-downgrade"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25925.83322846608!2d139.59823360000001!3d35.6836705!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6018f1879027708f%3A0x2a9a3f9590026f6!2sSetagaya%20Literary%20Museum!5e0!3m2!1sen!2sjp!4v1781761228683!5m2!1sen!2sjp"
        allowfullscreen
      ></iframe>
    );
  };

  return (
    <section className="salon">
      <header className="salon__headline">
        <img src={LOGO} width={96} />
        <h2 className="salon__label">
          心地よい空間、あなたのペースに合わせて。
        </h2>
      </header>

      <div className="salon__main">
        <div className="salon__left">
          <div className="salon__location">
            <div className="salon__mapWrapper">
              <div className="salon__map">{AddressMap()}</div>
              {INFO_ICONS.map((icon, key) => (
                <div key={key} className="salon__ctaWrapper">
                  <div className="salon__ctaWrapper icon">
                    <a
                      href="https://maps.app.goo.gl/DPCTpbdACqRzG3px9"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="salon__link"
                      aria-label={icon.label}
                    >
                      <img
                        src={icon.img}
                        alt={icon.label}
                        width={43}
                        height={43}
                      />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="salon__info">
              {/* Badge Text */}
              <div className="salon__realtimeBadge">
                <span>営業中</span>
                <span>OPEN NOW</span>
              </div>

              {/* Access Info */}
              <div className="salon__accessInfo">
                <h3 className="salon__infoLabel">アクセス</h3>
                <ul className="salon__infoList">
                  <li className="salon__infoItem">{ADDRESS_JA}</li>
                  <li className="salon__infoItem">原宿駅 竹下口 徒歩3分</li>
                </ul>
              </div>

              {/* Parking Info */}
              <div className="salon__accessInfo">
                <h3 className="salon__infoLabel">駐車場</h3>
                <ul className="salon__infoList">
                  <li className="salon__infoItem">２台完備 / ２Spaces</li>
                </ul>
              </div>
            </div>
          </div>
          {/* Weeklychart */}
          <div className="salon__weeklyChart">
            <div className="salon__chartInfo">
              <h3 className="salon__infoLabel">営業時間</h3>
              <div className="salon__chartContainer">
                {HOURS.map((item, key) => (
                  <div key={key} className="salon__chartContent">
                    <h4 className="salon__chartLabel">{item.day}</h4>
                    <div className="salon__chart">
                      {item.closed ? (
                        <span className="chartText">Closed</span>
                      ) : (
                        <div className="chartTextWrapper">
                          <span className="chartText">{item.open}</span>
                          <br />
                          <span className="chartText">{item.close}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/*  Closed Info */}
          <div className="salon__closedInfo">
            <h3 className="salon__infoLabel">定休日</h3>
            <ul className="salon__infoList">
              <li className="salon__infoItem">毎週　月曜日・第2火曜日</li>
            </ul>
          </div>
        </div>

        {/* Right */}
        <div className="salon__right">
          <div className="salon__contactInfo">
            <h3 className="salon__infoLabel">連絡先</h3>
            {/*  Contact Info */}
            <div className="salon__contactInfo">
              <div className="salon__contactContent">
                <div className="salon__contactDetail">
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
                    <span>OPEN MAP</span>
                  </a>
                </div>
              </div>
              {/* Phone */}
              <div className="salon__contactContent">
                <div className="salon__contactDetail">
                  <h4 className="salon__infoLabel">TEL</h4>
                  <ul className="salon__infoList">
                    <li className="salon__infoItem">{PHONE}</li>
                  </ul>
                </div>
                <div className="salon__ctaWrapper ghost">
                  <a
                    href={`tel: ${PHONE}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="salon__link"
                    aria-label="Salonへ電話する"
                  >
                    <span>CALL NOW</span>
                  </a>
                </div>
              </div>
              {/* Mail */}
              <div className="salon__contactContent">
                <div className="salon__contactDetail">
                  <h4 className="salon__infoLabel">MAIL</h4>
                  <ul className="salon__infoList">
                    <li className="salon__infoItem">{MAIL}</li>
                  </ul>
                </div>
                <div className="salon__ctaWrapper ghost">
                  <a
                    href={`mail: ${MAIL}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="salon__link"
                    aria-label="SalonへMAILする"
                  >
                    <span>SEND MAIL</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="salon__paymentInfo">
            {/*  Payment Info */}
            <div className="salon__closedInfo">
              <h3 className="salon__infoLabel">お支払方法</h3>
              {PAYMENTS.map((item, key) => {
                <ul key={key} className="salon__infoList">
                  <li className="salon__infoItem">
                    <img src={item.img} alt={item.label} />
                  </li>
                </ul>;
              })}
            </div>
          </div>

          <div className="salon__ctaWrapper booknow">
            {/* This CTA jump to Reservation section */}
            <a href="#reservation">ご予約はこちら (BOOK NOW)</a>
          </div>
        </div>
      </div>
    </section>
  );
}
