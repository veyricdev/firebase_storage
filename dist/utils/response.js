"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.successResponse = exports.errorResponse = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _constants = require("../config/constants");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var errorResponse = exports.errorResponse = function errorResponse(error) {
  var errorResponseData = {
    result: _constants.RESULT_FAIL,
    isLogger: true,
    msg: 'Server error!'
  };
  return _objectSpread(_objectSpread({}, errorResponseData), error);
};
var successResponse = exports.successResponse = function successResponse() {
  var msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var pagination = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
  var responseData = {
    result: _constants.RESULT_OK,
    msg: msg,
    data: data,
    pagination: pagination
  };
  return responseData;
};