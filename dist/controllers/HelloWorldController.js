"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HelloWorld = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _utils = require("../utils");
var HelloWorld = exports.HelloWorld = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_req, res, next) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          try {
            res.send('<h1 style="text-align: center; margin-top: 100px;">Hello world!<br/>App build with Nodejs/Express by AVNENDV.😜😜😜</h1>');
          } catch (error) {
            next((0, _utils.errorResponse)(error));
          }
        case 1:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function HelloWorld(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();