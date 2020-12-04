"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  CommandManager: true,
  console: true,
  colorCodes: true
};
Object.defineProperty(exports, "CommandManager", {
  enumerable: true,
  get: function get() {
    return _CommandManager["default"];
  }
});
Object.defineProperty(exports, "console", {
  enumerable: true,
  get: function get() {
    return _ConsoleColor["default"];
  }
});
Object.defineProperty(exports, "colorCodes", {
  enumerable: true,
  get: function get() {
    return _ConsoleColor.colorCodes;
  }
});

var _CommandManager = _interopRequireDefault(require("./Command/CommandManager"));

var _ConsoleColor = _interopRequireWildcard(require("./Command/ConsoleColor"));

var _Command = require("./Command/Command");

Object.keys(_Command).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _Command[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Command[key];
    }
  });
});

var _interactiveShell = require("./Command/interactiveShell");

Object.keys(_interactiveShell).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _interactiveShell[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _interactiveShell[key];
    }
  });
});

var _isCallable = require("./Command/isCallable");

Object.keys(_isCallable).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _isCallable[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _isCallable[key];
    }
  });
});

var _PromptWrapper = require("./Command/PromptWrapper");

Object.keys(_PromptWrapper).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _PromptWrapper[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _PromptWrapper[key];
    }
  });
});

var _Validator = require("./Command/Validator");

Object.keys(_Validator).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _Validator[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Validator[key];
    }
  });
});

var _getVersion = require("./lib/getVersion");

Object.keys(_getVersion).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _getVersion[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _getVersion[key];
    }
  });
});

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }