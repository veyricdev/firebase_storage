"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WHITELIST_DOMAINS = exports.RESULT_OK = exports.RESULT_FAIL = exports.IS_PROD = exports.A_SECOND = void 0;
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _env = require("../env");
var A_SECOND = exports.A_SECOND = 1000;
var RESULT_FAIL = exports.RESULT_FAIL = 0;
var RESULT_OK = exports.RESULT_OK = 1;
var IS_PROD = exports.IS_PROD = _env.NODE_ENV.includes('prod');
var WHITELIST_DOMAINS = exports.WHITELIST_DOMAINS = (0, _toConsumableArray2["default"])(_env.WHITELIST_DOMAINS_URL.split(','));