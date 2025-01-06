"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _path = _interopRequireDefault(require("path"));
var _winston = _interopRequireDefault(require("winston"));
var _winstonDailyRotateFile = _interopRequireDefault(require("winston-daily-rotate-file"));
var _env = require("../env");
var logger = _winston["default"].createLogger({
  // log formats are combined via format.combine
  format: _winston["default"].format.combine(_winston["default"].format.splat(),
  // Time format for log
  _winston["default"].format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss'
  }),
  // add color
  _winston["default"].format.colorize(),
  // set the format of the log
  _winston["default"].format.printf(function (log) {
    // if the log is an error, display the stack trace but do not display the log message
    if (log.stack) return "[".concat(log.timestamp, "] [").concat(log.level, "] ").concat(log.stack);
    return "[".concat(log.timestamp, "] [").concat(log.level, "] ").concat(log.message);
  })),
  transports: _env.IS_VERCEL ? [
  // display log through console
  new _winston["default"].transports.Console(),
  // Set up writing errors to file
  new _winston["default"].transports.File({
    level: 'error',
    filename: _path["default"].join(__dirname, '..', 'logs', 'logs.log'),
    maxsize: 5242880
  })] : [
  // display log through console
  new _winston["default"].transports.Console(),
  // Set up writing errors to file
  new _winston["default"].transports.File({
    level: 'error',
    filename: _path["default"].join(__dirname, '..', 'logs', 'logs.log'),
    maxsize: 5242880
  }), new _winstonDailyRotateFile["default"]({
    filename: _path["default"].join(__dirname, '..', 'logs/date', "%DATE%.log"),
    datePattern: 'YYYY-MM-DD'
  })]
});
var _default = exports["default"] = logger;