"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _HelloWorldController = require("./HelloWorldController");
Object.keys(_HelloWorldController).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _HelloWorldController[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _HelloWorldController[key];
    }
  });
});
var _UploadController = require("./UploadController");
Object.keys(_UploadController).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _UploadController[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _UploadController[key];
    }
  });
});