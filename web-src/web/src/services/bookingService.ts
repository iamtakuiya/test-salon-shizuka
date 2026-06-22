import { api } from './api';
import type { BookingPayload } from '@shared/schemas/bookingSchema';

export const bookingService = {
  async submit(payload: BookingPayload): Promise<{ success: boolean }> {
    const { data } = await api.post<{ success: boolean }>('/api/booking', payload);
    return data;
  },
};