"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getVersion = getVersion;
exports.updateVersion = updateVersion;

var _fs = _interopRequireDefault(require("fs"));

var _ConsoleColor = _interopRequireDefault(require("../Command/ConsoleColor"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function getVersion(packageJsonDir) {
  try {
    return JSON.parse(_fs["default"].readFileSync((packageJsonDir + '/').replace(/\/+$/, '/') + 'package.json').toString()).version;
  } catch (e) {
    _ConsoleColor["default"].warn('Unable to find package.json (' + e.message + '). Using version ' + version + ' instead.');

    return '0.0.0';
  }
}

function updateVersion(type, packageJsonFile) {
  var version = getVersion(packageJsonFile);
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

  for (var subVersion = types[type] + 1; subVersion < 3; subVersion++) {
    v[subVersion] = 0;
  }

  version = v.join('.');
  return version;
}