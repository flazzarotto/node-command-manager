"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getVersion = getVersion;
exports.updateVersion = updateVersion;

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var version = null;

function getVersion(packageJsonDir) {
  if (version) {
    return version;
  }

  try {
    version = JSON.parse(_fs["default"].readFileSync((packageJsonDir + '/').replace(/\/+$/, '/') + 'package.json').toString()).version;
  } catch (e) {
    console.error(e);
    version = '0.0.0';
  }

  return version;
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