import { prisma } from '../db/client';
import { sendOwnerNotification, sendGuestConfirmation } from './email.service';
import { pushLineMessage } from './line.service';
import { logger } from './logger.service';

interface ServiceItem {
  id: string;
  name: string;
  price: number;
}

interface BookingInput {
  name: string;
  email: string;
  date: string;
  time: string;
  services: ServiceItem[];
  addons: ServiceItem[];
}

export const bookingService = {
  async create(data: BookingInput) {
    // Always recalculate total server-side — never trust client value
    const total = [...data.services, ...data.addons]
      .reduce((sum, item) => sum + item.price, 0);

    const booking = await prisma.booking.create({
      data: {
        name:     data.name,
        email:    data.email,
        date:     data.date,
        time:     data.time,
        services: JSON.stringify(data.services),
        addons:   JSON.stringify(data.addons),
        total,
      },
    });

    logger.info('Booking saved', { id: booking.id, total });

    // Fire all notifications in parallel.
    // allSettled: if LINE fails, emails still go out.
    const results = await Promise.allSettled([
      sendOwnerNotification({ ...data, total }),
      sendGuestConfirmation({ ...data, total }),
      pushLineMessage({ ...data, total }),
    ]);

    results.forEach((result, i) => {
      const labels = ['ownerEmail', 'guestEmail', 'line'];
      if (result.status === 'rejected') {
        logger.error(`Notification failed: ${labels[i]}`, {
          reason: String(result.reason),
          bookingId: booking.id,
        });
      }
    });

    return booking;
  },
};
