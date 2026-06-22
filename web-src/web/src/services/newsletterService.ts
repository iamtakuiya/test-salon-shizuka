import { api } from './api';

export const newsletterService = {
  async subscribe(email: string): Promise<{ success: boolean }> {
    const { data } = await api.post<{ success: boolean }>('/api/newsletter', { email });
    return data;
  },
};