import React from "react";

interface ConfirmationProps {
  selectedDate: string;
  selectedTime: string;
  selectionList: Array<any>;
  selectedAddons: Array<any>;
  customerName: string;
  customerEmail: string;
  calculateTotal: () => number;
  setShowConfirmation: (v: boolean) => void;
  setIsBooked: (v: boolean) => void;
  isBooked: boolean;
}

export default function Confirmation({
  selectedDate,
  selectedTime,
  selectionList,
  selectedAddons,
  customerName,
  customerEmail,
  calculateTotal,
  setShowConfirmation,
  setIsBooked,
  isBooked,
}: ConfirmationProps) {
  return (
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
                {selectionList.map((i) => i.name).join(', ') || "未選択"}
              </span>
            </div>
            <div className="confirmation__row">
              <span className="confirmation__label">オプション</span>
              <span className="confirmation__value">
                {selectedAddons.map((a) => a.name).join(', ') || "なし"}
              </span>
            </div>
            <div className="confirmation__row">
              <span className="confirmation__label">お名前</span>
              <span className="confirmation__value">{customerName} 様</span>
            </div>
            <div className="confirmation__row">
              <span className="confirmation__label">メール</span>
              <span className="confirmation__value">{customerEmail}</span>
            </div>
            <div className="confirmation__row">
              <span className="confirmation__label">合計（目安）</span>
              <span className="confirmation__value">¥{calculateTotal().toLocaleString()}</span>
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
            ご予約ありがとうございます。<br /> 24時間以内にご連絡いたします。
          </span>
        </div>
      )}
    </div>
  );
}
