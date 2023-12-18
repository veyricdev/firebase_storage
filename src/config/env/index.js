import 'dotenv/config';

export const PORT = process.env.PORT || 3000;
export const NODE_ENV = process.env.NODE_ENV || 'development';
export const TOKEN_SECRET = process.env.TOKEN_SECRET || 'TOKEN_SECRET';
export const UPLOAD_SECRET = process.env.UPLOAD_SECRET || 'UPLOAD_SECRET';
export const FIREBASE_API_KEY = process.env.FIREBASE_API_KEY || '';
export const FIREBASE_AUTH_DOMAIN = process.env.FIREBASE_AUTH_DOMAIN || '';
export const FIREBASE_PROJECT_ID = process.env.FIREBASE_PROJECT_ID || '';
export const FIREBASE_STORAGE_BUCKET = process.env.FIREBASE_STORAGE_BUCKET || '';
export const FIREBASE_MESSAGING_SENDER_ID = process.env.FIREBASE_MESSAGING_SENDER_ID || '';
export const FIREBASE_APP_ID = process.env.FIREBASE_APP_ID || '';
export const FIREBASE_MEASUREMENT_ID = process.env.FIREBASE_MEASUREMENT_ID || '';
export const WHITELIST_DOMAINS_URL = process.env.WHITELIST_DOMAINS_URL || '';
