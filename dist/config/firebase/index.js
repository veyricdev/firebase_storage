"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.firebaseConfig = void 0;
var _env = require("../env");
var firebaseConfig = exports.firebaseConfig = {
  apiKey: _env.FIREBASE_API_KEY,
  authDomain: _env.FIREBASE_AUTH_DOMAIN,
  projectId: _env.FIREBASE_PROJECT_ID,
  storageBucket: _env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: _env.FIREBASE_MESSAGING_SENDER_ID,
  appId: _env.FIREBASE_APP_ID,
  measurementId: _env.FIREBASE_MEASUREMENT_ID
};