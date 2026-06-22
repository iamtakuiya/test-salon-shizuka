import React from "react";

interface ServiceFocusPanelProps {
  activeCategory: any;
  selectedItems: Record<string, any>;
  handleItemSelect: (categoryId: string, item: any) => void;
}

export default function ServiceFocusPanel({
  activeCategory,
  selectedItems,
  handleItemSelect,
}: ServiceFocusPanelProps) {
  if (!activeCategory) return null;
  const selectedItem = selectedItems[activeCategory.id];
  return (
    <div className="reservation__serviceFocusPanel">
      <div className="services__categoryGrid">
        <img src={activeCategory.img} alt={activeCategory.category} className="services__img" />
      </div>
      <div className="services__menuItemWrapper">
        <h3 className="services__price">
          {selectedItem ? `¥${selectedItem.price.toLocaleString()}` : "メニュー未選択"}
        </h3>
        <p className="services__categoryDesc">{activeCategory.categoryDescription}</p>
      </div>
    </div>
  );
}
