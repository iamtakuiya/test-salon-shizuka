import { createSlice, createSelector } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
export interface ServiceItem {
  id: string;
  name: string;
  price: number;
}

// A minimal local type that avoids the circular import:
interface RootState {
  booking: BookingState;
}

interface BookingState {
  selectedDate: string | null;
  selectedTime: string | null;
  selectedServices: ServiceItem[];
  selectedAddons: ServiceItem[];
}

const initialState: BookingState = {
  selectedDate: null,
  selectedTime: null,
  selectedServices: [],
  selectedAddons: [],
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setDate(state, action: PayloadAction<string>) {
      state.selectedDate = action.payload;
    },
    setTime(state, action: PayloadAction<string>) {
      state.selectedTime = action.payload;
    },
    toggleService(state, action: PayloadAction<ServiceItem>) {
      const idx = state.selectedServices.findIndex(s => s.id === action.payload.id);
      if (idx >= 0) {
        state.selectedServices.splice(idx, 1);
      } else {
        state.selectedServices.push(action.payload);
      }
    },
    toggleAddon(state, action: PayloadAction<ServiceItem>) {
      const idx = state.selectedAddons.findIndex(a => a.id === action.payload.id);
      if (idx >= 0) {
        state.selectedAddons.splice(idx, 1);
      } else {
        state.selectedAddons.push(action.payload);
      }
    },
    resetBooking: () => initialState,
  },
});

export const { setDate, setTime, toggleService, toggleAddon, resetBooking } = bookingSlice.actions;
export const bookingReducer = bookingSlice.reducer;

// Selectors
const selectBooking = (state: RootState) => state.booking;

export const selectTotal = createSelector(
  [selectBooking],
  (booking) =>
    [...booking.selectedServices, ...booking.selectedAddons]
      .reduce((sum, item) => sum + item.price, 0)
);

export const selectIsDateTimeSelected = createSelector(
  [selectBooking],
  (booking) => booking.selectedDate !== null && booking.selectedTime !== null
);