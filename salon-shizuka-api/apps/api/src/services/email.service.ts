import nodemailer from 'nodemailer';
import { env } from '../config/env';
import { logger } from './logger.service';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: env.GMAIL_USER,
    clientId: env.GMAIL_CLIENT_ID,
    clientSecret: env.GMAIL_CLIENT_SECRET,
    refreshToken: env.GMAIL_REFRESH_TOKEN,
  },
});

interface BookingData {
  name: string;
  email: string;
  date: string;
  time: string;
  total: number;
}

export async function sendOwnerNotification(booking: BookingData) {
  try {
    await transporter.sendMail({
      from: env.GMAIL_USER,
      to: env.OWNER_EMAIL,
      subject: `【新規予約】${booking.name} 様 — ${booking.date} ${booking.time}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #C9A96E;">新規ご予約が入りました</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><b>お名前</b></td><td style="padding: 8px;">${booking.name} 様</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><b>日時</b></td><td style="padding: 8px;">${booking.date} ${booking.time}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><b>合計</b></td><td style="padding: 8px;">¥${booking.total.toLocaleString()}</td></tr>
            <tr><td style="padding: 8px;"><b>Email</b></td><td style="padding: 8px;">${booking.email}</td></tr>
          </table>
        </div>
      `,
    });
    logger.info('Owner notification sent', { to: env.OWNER_EMAIL });
  } catch (err) {
    logger.error('Owner notification failed', { error: String(err) });
    throw err;
  }
}

export async function sendGuestConfirmation(booking: BookingData) {
  try {
    await transporter.sendMail({
      from: `"SALON SHIZUKA" <${env.GMAIL_USER}>`,
      to: booking.email,
      subject: `【ご予約確認】SALON SHIZUKA — ${booking.date}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #C9A96E;">ご予約ありがとうございます</h2>
          <p>${booking.name} 様</p>
          <p>以下の内容でご予約を承りました。</p>
          <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><b>日時</b></td><td style="padding: 8px;">${booking.date} ${booking.time}</td></tr>
            <tr><td style="padding: 8px;"><b>合計（目安）</b></td><td style="padding: 8px;">¥${booking.total.toLocaleString()}</td></tr>
          </table>
          <p style="margin-top: 24px; color: #7A6E66; font-size: 14px;">24時間以内にご連絡いたします。<br>— SALON SHIZUKA</p>
        </div>
      `,
    });
    logger.info('Guest confirmation sent', { to: booking.email });
  } catch (err) {
    logger.error('Guest confirmation failed', { error: String(err) });
    throw err;
  }
}
