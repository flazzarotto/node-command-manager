"use strict";

var _ = require(".");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var initOptions = [{
  name: 'force',
  "short": 'f',
  type: 'boolean',
  description: 'Force file override (if project not empty)',
  example: "'script init --force' or 'script -f'"
}];
var initMod = {
  mod: 'init',
  description: 'Initialize project',
  options: initOptions,
  exec: function exec() {
    throw new Error('t'); // console.log(arguments)
  }
};
var mods = [initMod];
var npmSimplePublisherCommand = new _.CommandManager((0, _.getVersion)('./'));
var cmd = npmSimplePublisherCommand.newCommand({
  mods: mods
});

_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return cmd.call(__dirname + '/', './');

        case 3:
          _context.next = 9;
          break;

        case 5:
          _context.prev = 5;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);
          return _context.abrupt("return");

        case 9:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, null, [[0, 5]]);
}))();