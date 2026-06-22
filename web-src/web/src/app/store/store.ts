import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import { bookingReducer } from '@/features/booking/store/bookingSlice';
import { uiReducer } from '@/app/store/slices/uiSlice';

export const store = configureStore({
  reducer: {
    booking: bookingReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Typed hooks — use these instead of raw useDispatch/useSelector
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;