// sections/ReservationAddons.tsx

import { FormLabel } from '@/components/atoms/FormLabel/FormLabel';
import { useAppDispatch, useAppSelector } from '@/app/store/store';
import { AddonPicker } from '../components/AddonPicker/AddonPicker';
import { ADDONS } from '@/utils/constants';
import { toggleAddon } from '@/features/booking/store/bookingSlice';

type Props = {
  selectedAddonIds: Set<string>;

  onToggle: (addon: any) => void;
};

export function ReservationAddons({
  selectedAddonIds,
  onToggle,
}: Props) {
  const dispatch = useAppDispatch();

  function handleAddonToggle(addon: (typeof ADDONS)[number]) {
    dispatch(toggleAddon({ id: addon.id, name: addon.nameJa, price: addon.price }));
  }
  
  return (
    <section>
      <FormLabel>
        追加オプション
      </FormLabel>

      <AddonPicker
        selectedAddonIds={selectedAddonIds}
        onToggle={handleAddonToggle}
      />
    </section>
  );
}