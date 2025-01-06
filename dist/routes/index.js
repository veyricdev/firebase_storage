"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _multer = _interopRequireDefault(require("multer"));
var _controllers = require("../controllers");
var _middlewares = require("../middlewares");
// Setting up multer as a middleware to grab photo uploads
var upload = (0, _multer["default"])({
  storage: _multer["default"].memoryStorage()
});
var router = function router(app) {
  // say hello world
  app.get('/', _controllers.HelloWorld);
  app.get('/upload', _controllers.UploadController.list);
  app.post('/upload', upload.single('file'), _controllers.UploadController.upload);
  app.get('/upload/:id', _controllers.UploadController.displayFile);
  app["delete"]('/upload/:id', _controllers.UploadController.destroy);
  app.get('/upload/:id/info', _controllers.UploadController.show);

  // handle errors
  app.use(_middlewares.errorHandle);
};
var _default = exports["default"] = router;