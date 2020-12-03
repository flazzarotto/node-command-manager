"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.optionValidator = exports.modValidator = void 0;

var _isCallable = require("./isCallable");

var _Command = require("./Command");

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var modValidator = function modValidator(mod, version) {
  if (!mod.mod) {
    throw new Error('`mod` field is required for mods.');
  }

  if (!mod.options) {
    throw new Error('`options` field is required for mods, even if empty.');
  }

  if (!mod.exec) {
    throw new Error('callable `exec` field is required for mods.');
  }

  if (mod.exec instanceof _Command.Command) {
    return;
  }

  if (!Array.isArray(mod.exec)) {
    mod.exec = [mod.exec];
  }

  var _iterator = _createForOfIteratorHelper(mod.exec),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var exec = _step.value;

      if (!(0, _isCallable.isCallable)(exec)) {
        throw new Error('`exec` field is required to be a callable object or an array of callable objects');
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  mod.exec = new _Command.Command(null, mod.options, mod.exec, version);
};

exports.modValidator = modValidator;

var optionValidator = function optionValidator(option) {
  if (!option.name) {
    throw new Error('`name` field is required for options.');
  }

  if (!option.type) {
    throw new Error('`type` field is required for options.');
  }
};

exports.optionValidator = optionValidator;