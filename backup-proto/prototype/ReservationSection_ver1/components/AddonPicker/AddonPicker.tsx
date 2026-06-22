
interface AddonPickerProps {
  addons: Array<any>;
  selectedAddons: Array<any>;
  handleAddonToggle: (addon: any) => void;
}

export default function AddonPicker({ addons, selectedAddons, handleAddonToggle }: AddonPickerProps) {
  return (
    <div className="reservation__addons">
      <h3 className="services__title">追加オプション</h3>
      <div className="service__addonMenu">
        {addons.map((addon) => (
          <div key={addon.id} className="service__menuItem">
            <div className="service__checkboxGroup">
              <input
                type="checkbox"
                id={addon.id}
                checked={selectedAddons.some((a) => a.id === addon.id)}
                onChange={() => handleAddonToggle(addon)}
              />
              <label htmlFor={addon.id}>{addon.name}</label>
              <span className="price">¥{addon.price.toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
