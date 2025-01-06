"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setupLibs = void 0;
var _express = _interopRequireDefault(require("express"));
var _cookieParser = _interopRequireDefault(require("cookie-parser"));
var _expressSession = _interopRequireDefault(require("express-session"));
var _morgan = _interopRequireDefault(require("morgan"));
var _cors = _interopRequireDefault(require("cors"));
var _compression = _interopRequireDefault(require("compression"));
var _helmet = _interopRequireDefault(require("helmet"));
var _expressRateLimit = require("express-rate-limit");
var _app = require("firebase/app");
var _env = require("../config/env");
var _constants = require("../config/constants");
var _firebase = require("../config/firebase");
var _cros = require("../config/cros");
var limiter = (0, _expressRateLimit.rateLimit)({
  windowMs: 15 * 60 * 1000,
  // 15 minutes
  limit: 100,
  // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: 'draft-7',
  // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false // Disable the `X-RateLimit-*` headers
  // store: ... , // Use an external store for more precise rate limiting
});

//Initialize a firebase application
(0, _app.initializeApp)(_firebase.firebaseConfig);
var setupLibs = exports.setupLibs = function setupLibs(app) {
  _env.IS_VERCEL || app.use((0, _morgan["default"])('dev'));
  app.use(_express["default"].json({
    limit: '1mb'
  }));
  app.use(_express["default"].urlencoded({
    extended: false,
    limit: '1mb'
  }));
  app.use((0, _cookieParser["default"])());
  app.use((0, _expressSession["default"])({
    secret: _env.TOKEN_SECRET,
    cookie: {
      maxAge: 2 * 60 * 60 * _constants.A_SECOND
    },
    // 2 hours
    resave: false,
    saveUninitialized: true
  }));
  app.use((0, _cors["default"])(_cros.corsOptions));
  app.use((0, _helmet["default"])({
    crossOriginResourcePolicy: false
  }));
  app.use((0, _compression["default"])());

  // Apply the rate limiting middleware to all requests on production
  if (_env.NODE_ENV === 'production') app.use(limiter);
};