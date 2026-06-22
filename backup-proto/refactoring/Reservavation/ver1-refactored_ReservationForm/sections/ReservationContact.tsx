// sections/ReservationContact.tsx
import { useForm } from "react-hook-form";
import { ContactData } from "../schema/contactSchema";
import { BookingSummary } from "../components/booking/BookingSummary/BookingSummary";

type Props = {
  selectedItems: any;
  selectedAddons: any;
  total: number;

  register: ReturnType<typeof useForm<ContactData>>['register'];
  errors: ReturnType<typeof useForm<ContactData>>['formState']['errors'];

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