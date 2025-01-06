"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UploadController = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _storage = require("firebase/storage");
var _axios = _interopRequireDefault(require("axios"));
var _catchAsync = require("../utils/catchAsync");
var _response = require("../utils/response");
var _env = require("../config/env");
var _utils = require("../utils");
var _UploadModel = _interopRequireDefault(require("../models/UploadModel"));
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
// Initialize Cloud Storage and get a reference to the service
var storage = (0, _storage.getStorage)();
var UploadController = exports.UploadController = {
  upload: (0, _catchAsync.catchAsync)( /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
      var dateTime, fileName, storageRef, metadata, snapshot, downloadURL, data, uploadData;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            if (req.file) {
              _context.next = 2;
              break;
            }
            throw new Error('File Upload Required!');
          case 2:
            if (!(req.headers['x-upload-secret'] !== _env.UPLOAD_SECRET)) {
              _context.next = 4;
              break;
            }
            throw new Error('Something wrong!');
          case 4:
            dateTime = (0, _utils.giveCurrentDateTime)();
            fileName = "".concat((0, _utils.getFileName)(req.file.originalname), "__").concat(dateTime);
            storageRef = (0, _storage.ref)(storage, "files/".concat("".concat(fileName))); // Create file metadata including the content type
            metadata = {
              contentType: req.file.mimetype
            }; // Upload the file in the bucket storage
            _context.next = 10;
            return (0, _storage.uploadBytesResumable)(storageRef, req.file.buffer, metadata);
          case 10:
            snapshot = _context.sent;
            _context.next = 13;
            return (0, _storage.getDownloadURL)(snapshot.ref);
          case 13:
            downloadURL = _context.sent;
            data = {
              name: fileName,
              extName: (0, _utils.getExtname)(req.file.originalname),
              mimetype: req.file.mimetype,
              downloadURL: downloadURL,
              size: (0, _utils.getSize)(req.file.size),
              created_at: Date.now()
            };
            _context.next = 17;
            return _UploadModel["default"].store(data);
          case 17:
            uploadData = _context.sent;
            return _context.abrupt("return", res.json((0, _response.successResponse)('File uploaded to firebase storage!', _objectSpread({}, uploadData))));
          case 19:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }()),
  show: (0, _catchAsync.catchAsync)( /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
      var result;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _UploadModel["default"].findById(req.params.id);
          case 2:
            result = _context2.sent;
            if (result) {
              _context2.next = 5;
              break;
            }
            throw new Error('File not found!');
          case 5:
            return _context2.abrupt("return", res.json((0, _response.successResponse)('Get file!', result)));
          case 6:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    return function (_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }()),
  displayFile: (0, _catchAsync.catchAsync)( /*#__PURE__*/function () {
    var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
      var result, response;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _UploadModel["default"].findById(req.params.id);
          case 2:
            result = _context3.sent;
            if (result) {
              _context3.next = 5;
              break;
            }
            throw new Error('File not found!');
          case 5:
            _context3.next = 7;
            return (0, _axios["default"])(result.downloadURL, {
              responseType: 'arraybuffer'
            });
          case 7:
            response = _context3.sent;
            res.set('Content-Type', response.headers['content-type']);
            res.send(response.data);
          case 10:
          case "end":
            return _context3.stop();
        }
      }, _callee3);
    }));
    return function (_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }()),
  list: (0, _catchAsync.catchAsync)( /*#__PURE__*/function () {
    var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
      var result;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _UploadModel["default"].list(req.query);
          case 2:
            result = _context4.sent;
            return _context4.abrupt("return", res.json((0, _response.successResponse)('List file!', result)));
          case 4:
          case "end":
            return _context4.stop();
        }
      }, _callee4);
    }));
    return function (_x7, _x8) {
      return _ref4.apply(this, arguments);
    };
  }()),
  destroy: (0, _catchAsync.catchAsync)( /*#__PURE__*/function () {
    var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
      var result, desertRef;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _UploadModel["default"].destroy(req.params.id);
          case 2:
            result = _context5.sent;
            if (result) {
              desertRef = (0, _storage.ref)(storage, "files/".concat(result.name));
              (0, _storage.deleteObject)(desertRef);
            }
            return _context5.abrupt("return", res.json((0, _response.successResponse)('Remove file!')));
          case 5:
          case "end":
            return _context5.stop();
        }
      }, _callee5);
    }));
    return function (_x9, _x10) {
      return _ref5.apply(this, arguments);
    };
  }())
};