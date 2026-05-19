import fs from 'fs';
import path from 'path';
import configJson from '../config.json';

// Simple helper to load .env file if it exists locally
const envPath = path.join(__dirname, '../.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const parts = line.split('=');
    if (parts.length >= 2) {
      const key = parts[0].trim();
      const val = parts.slice(1).join('=').trim().replace(/^['"]|['"]$/g, '');
      if (key && !key.startsWith('#')) {
        process.env[key] = val;
      }
    }
  });
}

const config = {
  database: {
    host: process.env.DB_HOST || configJson.database.host,
    port: parseInt(process.env.DB_PORT || '') || configJson.database.port,
    user: process.env.DB_USER || configJson.database.user,
    password: process.env.DB_PASSWORD !== undefined ? process.env.DB_PASSWORD : configJson.database.password,
    database: process.env.DB_DATABASE || configJson.database.database
  },
  secret: process.env.JWT_SECRET || configJson.secret,
  emailFrom: process.env.EMAIL_FROM || configJson.emailFrom,
  smtpOptions: process.env.SMTP_HOST ? {
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  } : configJson.smtpOptions
};

export default config;
