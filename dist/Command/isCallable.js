"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isCallable = isCallable;

function isCallable(maybeCallable) {
  var ts = {}.toString.bind(maybeCallable.call || '');
  return ts().toLowerCase().indexOf('function') > -1;
}