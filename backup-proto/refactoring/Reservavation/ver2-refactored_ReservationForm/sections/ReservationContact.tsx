// sections/ReservationContact.tsx

import { BookingSummary } from "../components/booking/BookingSummary/BookingSummary";

type Props = {
  selectedItems: any;
  selectedAddons: any;
  total: number;

  register: any;
  errors: any;

  onSubmit: () => void;
};

export function ReservationContact(props: Props) {
  return (
    <BookingSummary
      selectedItems={props.selectedItems}
      selectedAddons={props.selectedAddons}
      total={props.total}
      register={props.register}
      errors={props.errors}
      onSubmit={props.onSubmit}
    />
  );
}