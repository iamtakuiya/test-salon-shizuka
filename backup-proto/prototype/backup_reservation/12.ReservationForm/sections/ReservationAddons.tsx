// sections/ReservationAddons.tsx

import { FormLabel } from '@/components/atoms/FormLabel/FormLabel';

import { AddonPicker } from '../components/AddonPicker/AddonPicker';

type Props = {
  selectedAddonIds: Set<string>;

  onToggle: (addon: any) => void;
};

export function ReservationAddons({
  selectedAddonIds,
  onToggle,
}: Props) {
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
  );
}