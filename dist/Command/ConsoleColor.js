"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.colorCodes = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var colorCodes = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  dim: "\x1b[2m",
  underscore: "\x1b[4m",
  blink: "\x1b[5m",
  reverse: "\x1b[7m",
  hidden: "\x1b[8m",
  fgBlack: "\x1b[30m",
  fgRed: "\x1b[31m",
  fgGreen: "\x1b[32m",
  fgYellow: "\x1b[33m",
  fgBlue: "\x1b[34m",
  fgMagenta: "\x1b[35m",
  fgCyan: "\x1b[36m",
  fgWhite: "\x1b[37m",
  bgBlack: "\x1b[40m",
  bgRed: "\x1b[41m",
  bgGreen: "\x1b[42m",
  bgYellow: "\x1b[43m",
  bgBlue: "\x1b[44m",
  bgMagenta: "\x1b[45m",
  bgCyan: "\x1b[46m",
  bgWhite: "\x1b[47m",
  noColor: '\x1b[0m'
};
exports.colorCodes = colorCodes;

function strArgs(args) {
  return '%s'; // let array = Object.values(args).map(param => '%'+(typeof param).charAt(0))
  // console.log(array)
  // return array.join('')
}

var defaultColors = {
  log: null,
  error: colorCodes.bgRed + colorCodes.fgWhite,
  info: colorCodes.bgCyan + colorCodes.fgWhite,
  warn: colorCodes.fgYellow
};
var _default = {
  _setCustomColors: function _setCustomColors() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultColors,
        log = _ref.log,
        error = _ref.error,
        info = _ref.info,
        warn = _ref.warn;

    defaultColors = _objectSpread(_objectSpread({}, defaultColors), {}, {
      log: log,
      error: error,
      info: info,
      warn: warn
    });
  },
  log: function log() {
    var _console;

    if (defaultColors.log) {
      this.writeColor(defaultColors.log + strArgs(arguments), 'warn', arguments);
      return;
    }

    (_console = console).log.apply(_console, arguments);
  },
  error: function error() {
    this.writeColor(defaultColors.error + strArgs(arguments), 'error', arguments);
  },
  info: function info() {
    this.writeColor(defaultColors.info + strArgs(arguments), 'info', arguments);
  },
  warn: function warn() {
    this.writeColor(defaultColors.warn + strArgs(arguments), 'warn', arguments);
  },
  writeColor: function writeColor(colors) {
    var _console2;

    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'log';
    var rest = arguments.length > 2 ? arguments[2] : undefined;

    for (var color in colorCodes) {
      colors = colors.replace(new RegExp(color, 'g'), colorCodes[color]);
    }

    colors += colorCodes.noColor;

    (_console2 = console)[type].apply(_console2, [colors].concat(_toConsumableArray(rest)));
  }
};
exports["default"] = _default;