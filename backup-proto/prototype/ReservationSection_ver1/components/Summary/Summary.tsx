import React from "react";

interface SummaryProps {
  selectionList: Array<any>;
  selectedAddons: Array<any>;
  calculateTotal: () => number;
}

export default function Summary({ selectionList, selectedAddons, calculateTotal }: SummaryProps) {
  return (
    <div className="reservation__summary">
      <div className="reservation__summaryContainer">
        <div className="divider" />
        {selectionList.map((item, idx) => (
          <div key={`sum-item-${idx}`} className="summary__row">
            <span className="summary__label">{item.name}</span>
            <div className="summary__dashed" />
            <span className="summary__price">¥{item.price.toLocaleString()}</span>
          </div>
        ))}
        {selectedAddons.map((addon) => (
          <div key={addon.id} className="summary__row">
            <span className="summary__label">{addon.name}</span>
            <div className="summary__dashed" />
            <span className="summary__price">¥{addon.price.toLocaleString()}</span>
          </div>
        ))}
        <div className="divider" />
        <div className="summary__row">
          <span className="summary__label font-bold">Total</span>
          <span className="summary__total">¥{calculateTotal().toLocaleString()}</span>
        </div>
      </div>
      <div className="service__summaryFootNote">
        <p className="summary__footNote">
          表記価格は税込・基本料金です。髪の長さや状態により追加料金が発生する場合がございます。詳細はカウンセリング時にご案内いたします。
        </p>
      </div>
    </div>
  );
}
