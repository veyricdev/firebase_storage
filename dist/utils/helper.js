"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.errorResponse = void 0;
exports.getExtname = getExtname;
exports.getFileName = getFileName;
exports.getSize = getSize;
exports.toObjectId = exports.slugify = exports.giveCurrentDateTime = void 0;
var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _nodePath = _interopRequireDefault(require("node:path"));
var _mongodb = require("mongodb");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var errorResponse = exports.errorResponse = function errorResponse(error) {
  var errorResponseData = {
    result: 0,
    isLogger: true,
    msg: 'Server error!'
  };
  return _objectSpread(_objectSpread({}, errorResponseData), error);
};

/** slug generator */
var slugify = exports.slugify = function slugify(str) {
  var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '-';
  return String(str).normalize('NFKD') // split accented characters into their base characters and diacritical marks
  .replace(/[\u0300-\u036f]/g, '') // remove all the accents, which happen to be all in the \u03xx UNICODE block.
  .trim() // trim leading or trailing whitespace
  .toLowerCase() // convert to lowercase
  .replace(/[đ]/g, 'd') // change đ to d
  .replace(/[^a-z0-9 -]/g, '') // remove non-alphanumeric characters
  .replace(/\s+/g, prefix) // replace spaces with hyphens
  .replace(/-+/g, prefix);
}; // remove consecutive hyphens +

var giveCurrentDateTime = exports.giveCurrentDateTime = function giveCurrentDateTime() {
  var today = new Date();
  var date = "".concat(today.getFullYear(), "-").concat(today.getMonth() + 1, "-").concat(today.getDate());
  var time = "".concat(today.getHours(), "-").concat(today.getMinutes(), "-").concat(today.getSeconds());
  var dateTime = "".concat(date, "-").concat(time);
  return dateTime;
};
var toObjectId = exports.toObjectId = function toObjectId(str) {
  return (0, _typeof2["default"])(str) === 'object' ? str : _mongodb.ObjectId.createFromHexString(str);
};
function getSize(bytes) {
  var decimals = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
  if (bytes === 0) return '0 Bytes';
  var k = 1024;
  var dm = decimals < 0 ? 0 : decimals;
  var sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  var i = Math.floor(Math.log(bytes) / Math.log(k));
  return "".concat(Number.parseFloat((bytes / Math.pow(k, i)).toFixed(dm)), " ").concat(sizes[i]);
}
function getFileName(fileName) {
  return fileName.substring(0, fileName.lastIndexOf('.'));
}
function getExtname(fileName) {
  return _nodePath["default"].extname(fileName).replace('.', '');
}