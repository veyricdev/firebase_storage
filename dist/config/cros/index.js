"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.corsOptions = void 0;
var _httpStatusCodes = require("http-status-codes");
var _constants = require("../constants");
var _ApiError = _interopRequireDefault(require("../../utils/ApiError"));
var corsOptions = exports.corsOptions = {
  origin: function origin(_origin, callback) {
    // alow all when not production
    if (!_constants.IS_PROD) return callback(null, true);

    // check domain is in whitelist domain
    if (_constants.WHITELIST_DOMAINS.filter(Boolean).includes(_origin)) return callback(null, true);

    // If the domain is not accepted, an error is returned
    return callback(new _ApiError["default"]("".concat(_origin, " not allowed by our CORS Policy."), _httpStatusCodes.StatusCodes.FORBIDDEN));
  },
  // Some legacy browsers (IE11, various SmartTVs) choke on 204
  optionsSuccessStatus: 200,
  // CORS will allow receiving cookies from requests, (Tease :D | In the MERN Stack Advance advanced direct learning course, I will guide you to attach jwt access token and refresh token to httpOnly Cookies)
  credentials: true
};