"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.errorHandle = void 0;
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _httpStatusCodes = require("http-status-codes");
var _winston = _interopRequireDefault(require("../config/logs/winston"));
var _response = require("../utils/response");
var _constants = require("../config/constants");
var _env = require("../config/env");
var _excluded = ["isLogger"];
var infoStack = function infoStack(stack) {
  var stackLines = stack === null || stack === void 0 ? void 0 : stack.split('\n');
  if (stackLines && stackLines.length > 1) {
    // Get the second line in the stack (usually contains fileName and lineNumber)
    var secondLine = stackLines[1].trim();

    // Parse information from the stack stream
    var match = /\((.*):(\d+):(\d+)\)/.exec(secondLine);
    if (match) {
      var raw = match[1];
      var fileName = match[1];
      var lineNumber = match[2];
      return {
        raw: raw,
        fileName: fileName,
        lineNumber: lineNumber
      };
    }
  }
  return {
    raw: null,
    fileName: null,
    lineNumber: null
  };
};

// eslint-disable-next-line no-unused-vars
var errorHandle = exports.errorHandle = function errorHandle(err, _req, res, _next) {
  if (!err.statusCode) err.statusCode = _httpStatusCodes.StatusCodes.INTERNAL_SERVER_ERROR;
  var responseError = {
    statusCode: err.statusCode,
    message: err.message || _httpStatusCodes.StatusCodes[err.statusCode],
    // If there is an error without a message, get the standard ReasonPhrases according to the Status Code
    stack: infoStack(err.stack)
  };
  var error = (0, _response.errorResponse)(responseError);
  var isLogger = error.isLogger,
    errorData = (0, _objectWithoutProperties2["default"])(error, _excluded);
  if (isLogger) _env.IS_VERCEL || _winston["default"].error(JSON.stringify(errorData));
  return res.json({
    result: errorData.result,
    msg: _constants.IS_PROD ? 'Something went wrong! Please check the data again!' : errorData.message
  });
};