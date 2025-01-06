"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WHITELIST_DOMAINS_URL = exports.UPLOAD_SECRET = exports.TOKEN_SECRET = exports.PORT = exports.NODE_ENV = exports.MONGO_URL = exports.MONGO_DB_NAME = exports.IS_VERCEL = exports.FIREBASE_STORAGE_BUCKET = exports.FIREBASE_PROJECT_ID = exports.FIREBASE_MESSAGING_SENDER_ID = exports.FIREBASE_MEASUREMENT_ID = exports.FIREBASE_AUTH_DOMAIN = exports.FIREBASE_APP_ID = exports.FIREBASE_API_KEY = void 0;
require("dotenv/config");
var PORT = exports.PORT = process.env.PORT || 3000;
var NODE_ENV = exports.NODE_ENV = process.env.NODE_ENV || 'development';
var TOKEN_SECRET = exports.TOKEN_SECRET = process.env.TOKEN_SECRET || 'TOKEN_SECRET';
var UPLOAD_SECRET = exports.UPLOAD_SECRET = process.env.UPLOAD_SECRET || 'UPLOAD_SECRET';
var FIREBASE_API_KEY = exports.FIREBASE_API_KEY = process.env.FIREBASE_API_KEY || '';
var FIREBASE_AUTH_DOMAIN = exports.FIREBASE_AUTH_DOMAIN = process.env.FIREBASE_AUTH_DOMAIN || '';
var FIREBASE_PROJECT_ID = exports.FIREBASE_PROJECT_ID = process.env.FIREBASE_PROJECT_ID || '';
var FIREBASE_STORAGE_BUCKET = exports.FIREBASE_STORAGE_BUCKET = process.env.FIREBASE_STORAGE_BUCKET || '';
var FIREBASE_MESSAGING_SENDER_ID = exports.FIREBASE_MESSAGING_SENDER_ID = process.env.FIREBASE_MESSAGING_SENDER_ID || '';
var FIREBASE_APP_ID = exports.FIREBASE_APP_ID = process.env.FIREBASE_APP_ID || '';
var FIREBASE_MEASUREMENT_ID = exports.FIREBASE_MEASUREMENT_ID = process.env.FIREBASE_MEASUREMENT_ID || '';
var WHITELIST_DOMAINS_URL = exports.WHITELIST_DOMAINS_URL = process.env.WHITELIST_DOMAINS_URL || '';
var IS_VERCEL = exports.IS_VERCEL = +process.env.IS_VERCEL || false;
var MONGO_URL = exports.MONGO_URL = process.env.MONGODB_URI || process.env.MONGO_URL || '';
var MONGO_DB_NAME = exports.MONGO_DB_NAME = process.env.MONGO_DB_NAME || 'upload_db';