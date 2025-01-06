"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _express = _interopRequireDefault(require("express"));
var _plugins = require("./plugins");
var _env = require("./config/env");
var app = (0, _express["default"])();
(0, _plugins.setupApp)(app);
app.listen(_env.PORT, function () {
  console.log("Server is running at http://localhost:".concat(_env.PORT));
});