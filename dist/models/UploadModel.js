"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.UploadModel = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _database = require("../config/database");
var _utils = require("../utils");
var UploadModel = exports.UploadModel = /*#__PURE__*/function () {
  function UploadModel() {
    var _this = this;
    (0, _classCallCheck2["default"])(this, UploadModel);
    (0, _defineProperty2["default"])(this, "COLLECTION_NAME", 'uploads');
    (0, _defineProperty2["default"])(this, "COLLECTION", function () {
      return _database.DB.instance.collection(_this.COLLECTION_NAME);
    });
  }
  return (0, _createClass2["default"])(UploadModel, [{
    key: "list",
    value: function () {
      var _list = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref) {
        var _ref$limit, limit, _ref$page, page, result;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _ref$limit = _ref.limit, limit = _ref$limit === void 0 ? 20 : _ref$limit, _ref$page = _ref.page, page = _ref$page === void 0 ? 1 : _ref$page;
              _context.next = 3;
              return this.COLLECTION().find({}).skip(page - 1).limit(limit).toArray();
            case 3:
              result = _context.sent;
              return _context.abrupt("return", result);
            case 5:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function list(_x) {
        return _list.apply(this, arguments);
      }
      return list;
    }()
  }, {
    key: "store",
    value: function () {
      var _store = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(data) {
        var result;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return this.COLLECTION().insertOne(data);
            case 2:
              result = _context2.sent;
              if (!result.insertedId) {
                _context2.next = 7;
                break;
              }
              _context2.next = 6;
              return this.COLLECTION().findOne({
                _id: result.insertedId
              });
            case 6:
              return _context2.abrupt("return", _context2.sent);
            case 7:
              return _context2.abrupt("return", null);
            case 8:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function store(_x2) {
        return _store.apply(this, arguments);
      }
      return store;
    }()
  }, {
    key: "findById",
    value: function () {
      var _findById = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(id) {
        var result;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return this.COLLECTION().findOne({
                _id: (0, _utils.toObjectId)(id)
              });
            case 2:
              result = _context3.sent;
              return _context3.abrupt("return", result);
            case 4:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function findById(_x3) {
        return _findById.apply(this, arguments);
      }
      return findById;
    }()
  }, {
    key: "destroy",
    value: function () {
      var _destroy = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(id) {
        var result;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return this.COLLECTION().findOneAndDelete({
                _id: (0, _utils.toObjectId)(id)
              });
            case 2:
              result = _context4.sent;
              return _context4.abrupt("return", result);
            case 4:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this);
      }));
      function destroy(_x4) {
        return _destroy.apply(this, arguments);
      }
      return destroy;
    }()
  }]);
}();
var _default = exports["default"] = new UploadModel();