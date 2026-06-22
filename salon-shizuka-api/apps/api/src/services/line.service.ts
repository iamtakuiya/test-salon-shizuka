import axios from 'axios';
import { env } from '../config/env';
import { logger } from './logger.service';

interface BookingData {
  name: string;
  date: string;
  time: string;
  total: number;
  email: string;
}

export async function pushLineMessage(booking: BookingData) {
  const text = [
    '📅 新規ご予約が入りました',
    `━━━━━━━━━━━━━━`,
    `お名前: ${booking.name} 様`,
    `日時: ${booking.date} ${booking.time}`,
    `合計: ¥${booking.total.toLocaleString()}`,
    `Email: ${booking.email}`,
    `━━━━━━━━━━━━━━`,
    `SALON SHIZUKA 予約システム`,
  ].join('\n');

  try {
    await axios.post(
      'https://api.line.me/v2/bot/message/push',
      {
        to: env.LINE_OWNER_USER_ID,
        messages: [{ type: 'text', text }],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${env.LINE_CHANNEL_ACCESS_TOKEN}`,
        },
      }
    );
    logger.info('LINE notification sent');
  } catch (err) {
    logger.error('LINE notification failed', { error: String(err) });
    throw err;
  }
}
