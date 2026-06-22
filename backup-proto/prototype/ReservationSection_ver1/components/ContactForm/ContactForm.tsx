import React from "react";

interface ContactFormProps {
  customerName: string;
  setCustomerName: (v: string) => void;
  customerEmail: string;
  setCustomerEmail: (v: string) => void;
  handleFormSubmit: (e: React.FormEvent) => void;
}

export default function ContactForm({
  customerName,
  setCustomerName,
  customerEmail,
  setCustomerEmail,
  handleFormSubmit,
}: ContactFormProps) {
  return (
    <form className="reservation__inputForm" onSubmit={handleFormSubmit}>
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
    </form>
  );
}
