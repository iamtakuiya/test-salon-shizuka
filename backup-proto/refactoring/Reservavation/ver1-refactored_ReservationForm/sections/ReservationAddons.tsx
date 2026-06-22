// sections/ReservationAddons.tsx

import { FormLabel } from '@/components/04.atoms/FormLabel/FormLabel';
import { ADDONS } from '@/utils/constants';
import { AddonPicker } from '../components/AddonPicker/AddonPicker';

type Props = {
  selectedAddonIds: Set<string>;

  onToggle: (addon:(typeof ADDONS)[number]) => void;
};

export function ReservationAddons({
  selectedAddonIds,
  onToggle,
}: Props) {
  // const selectedAddonIds = new Set(booking.selectedAddons.map((a) => a.id));
  // const selectedAddonsForDisplay = ADDONS.filter((a) => selectedAddonIds.has(a.id));

  // function handleAddonToggle(addon: (typeof ADDONS)[number]) {
  //   dispatch(toggleAddon({ id: addon.id, name: addon.nameJa, price: addon.price }));
  // }
  
  return (
    <section>
      <FormLabel>
        追加オプション
      </FormLabel>

      <AddonPicker
        selectedAddonIds={selectedAddonIds}
        onToggle={onToggle}
      />
    </section>
  )
}