import nodemailer from 'nodemailer';
import config from './config';
import fs from 'fs';
import path from 'path';

export default async function sendEmail({ to, subject, html, from = config.emailFrom }: any) {
  const transporter = nodemailer.createTransport(config.smtpOptions);
  const info = await transporter.sendMail({ from, to, subject, html });
  console.log('Email sent to:', to, 'Subject:', subject);
  console.log('Ethereal URL:', nodemailer.getTestMessageUrl(info));

  try {
    const logPath = path.join(__dirname, '..', 'email_logs.txt');
    const logContent = `-----------------------------------\nDate: ${new Date().toISOString()}\nTo: ${to}\nSubject: ${subject}\nEthereal URL: ${nodemailer.getTestMessageUrl(info)}\nHTML:\n${html}\n-----------------------------------\n`;
    fs.appendFileSync(logPath, logContent, 'utf8');
  } catch (err) {
    console.error('Failed to write email logs:', err);
  }
}
