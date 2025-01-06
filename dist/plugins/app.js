"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setupApp = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _lib = require("./lib");
var _database = require("../config/database");
var _routes = _interopRequireDefault(require("../routes"));
var setupApp = exports.setupApp = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(app) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          // setup libs
          (0, _lib.setupLibs)(app);
          _context.next = 3;
          return _database.DB.getInstance();
        case 3:
          // register routes
          (0, _routes["default"])(app);
        case 4:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function setupApp(_x) {
    return _ref.apply(this, arguments);
  };
}();