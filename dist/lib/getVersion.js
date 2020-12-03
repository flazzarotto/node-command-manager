"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateVersion = updateVersion;
exports.version = void 0;

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var version;
exports.version = version;

try {
  exports.version = version = JSON.parse(_fs["default"].readFileSync(__dirname + '/../../packageJson.json').toString()).version;
} catch (e) {
  exports.version = version = '1.0.0';
}

function updateVersion(type) {
  var types = {
    M: 0,
    m: 1,
    r: 2
  };

  if (types[type] === undefined) {
    throw new Error("Version type ".concat(type, " not recognized. Available types ") + "are ".concat(JSON.stringify(Object.keys(types))));
  }

  var v = version.split('.');
  v[types[type]] = parseInt(v[types[type]]) + 1;
  exports.version = version = v.join('.');
  return version;
}