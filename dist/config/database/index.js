"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.disconnectDB = exports.client = exports.DB = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _mongodb = require("mongodb");
var _env = require("../env");
var _constants = require("../constants");
/* eslint-disable no-unused-vars */

var TIME_OUT = 120000;
var MAX_CONNECT_RETRY = 3;
var client = exports.client = new _mongodb.MongoClient(_env.MONGO_URL, {
  minPoolSize: 10,
  maxPoolSize: 20,
  maxConnecting: 10,
  serverSelectionTimeoutMS: TIME_OUT,
  connectTimeoutMS: TIME_OUT,
  socketTimeoutMS: TIME_OUT,
  maxIdleTimeMS: TIME_OUT
});

/**
 * It connects to the database
 */
var DB = exports.DB = /*#__PURE__*/function () {
  function DB() {
    (0, _classCallCheck2["default"])(this, DB);
  }
  return (0, _createClass2["default"])(DB, [{
    key: "connect",
    value: // connect
    function () {
      var _connect = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
        var _this = this;
        var connectCount,
          db,
          _args2 = arguments;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              connectCount = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : 0;
              _context2.prev = 1;
              _context2.next = 4;
              return client.connect();
            case 4:
              db = client.db(_env.MONGO_DB_NAME);
              console.log('DB:::: connect successfully!');
              return _context2.abrupt("return", db);
            case 9:
              _context2.prev = 9;
              _context2.t0 = _context2["catch"](1);
              console.error('DB::: connect failure!', _context2.t0);

              // retry connect db when connect fail
              if (!(connectCount < MAX_CONNECT_RETRY)) {
                _context2.next = 15;
                break;
              }
              setTimeout( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
                return _regenerator["default"].wrap(function _callee$(_context) {
                  while (1) switch (_context.prev = _context.next) {
                    case 0:
                      _context.next = 2;
                      return _this.connect(connectCount + 1);
                    case 2:
                    case "end":
                      return _context.stop();
                  }
                }, _callee);
              })), connectCount * 3 * _constants.A_SECOND + Math.random() * _constants.A_SECOND);
              return _context2.abrupt("return");
            case 15:
              process.exit(0);
            case 16:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[1, 9]]);
      }));
      function connect() {
        return _connect.apply(this, arguments);
      }
      return connect;
    }()
    /**
     * get instance
     * @returns {Promise<Db>} Promise<db>
     */
  }], [{
    key: "getInstance",
    value: (function () {
      var _getInstance = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
        var db;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              db = new DB();
              if (DB.instance) {
                _context3.next = 5;
                break;
              }
              _context3.next = 4;
              return db.connect();
            case 4:
              DB.instance = _context3.sent;
            case 5:
              return _context3.abrupt("return", DB.instance);
            case 6:
            case "end":
              return _context3.stop();
          }
        }, _callee3);
      }));
      function getInstance() {
        return _getInstance.apply(this, arguments);
      }
      return getInstance;
    }())
  }]);
}();
/**
 * @type {Db}
 */
(0, _defineProperty2["default"])(DB, "instance", void 0);
var disconnectDB = exports.disconnectDB = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return client.close();
        case 2:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function disconnectDB() {
    return _ref2.apply(this, arguments);
  };
}();