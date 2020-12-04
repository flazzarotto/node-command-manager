"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.interactiveShell = interactiveShell;

var _child_process = _interopRequireDefault(require("child_process"));

var _PromptWrapper = require("./PromptWrapper");

var _ConsoleColor = _interopRequireDefault(require("./ConsoleColor"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var prompt = new _PromptWrapper.Prompt({
  "continue": {
    description: 'Please enter another value'
  }
});
/**
 * Basic normalize function to match your labels and prompted labels
 * @param string
 * @returns {string}
 */

var normalize = function normalize(string) {
  return string.replace(/[^\w\d]/ig, '').toLowerCase();
};
/**
 * Provides a simple interactive shell to answer prompts
 * @param cmd command name to execute
 * @param args command arguments
 * @param possibleAnswers {object} if interactive, the list of {promptA: valueA} to answer prompt - promptA can use regex syntax (ex. 't.*')
 * @param interactive
 * @param customNormalizeFunction {function} your own normalize function for prompted labels - default: strip all non alphanumerical characters
 */


function interactiveShell(_x, _x2) {
  return _interactiveShell.apply(this, arguments);
}

function _interactiveShell() {
  _interactiveShell = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(cmd, args) {
    var possibleAnswers,
        interactive,
        customNormalizeFunction,
        data_line,
        childProcess,
        lastDataLine,
        stdOutErrLine,
        stdErrLine,
        _args2 = arguments;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            possibleAnswers = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : {};
            interactive = _args2.length > 3 && _args2[3] !== undefined ? _args2[3] : true;
            customNormalizeFunction = _args2.length > 4 && _args2[4] !== undefined ? _args2[4] : normalize;
            data_line = '';
            _context2.next = 6;
            return _child_process["default"].spawn(cmd, _toConsumableArray(args), {
              stdio: interactive ? 'pipe' : ['pipe', 1, 2]
            });

          case 6:
            childProcess = _context2.sent;

            if (interactive) {
              childProcess.stdout.setEncoding('utf8');
              lastDataLine = null;
              childProcess.stdout.on("data", /*#__PURE__*/function () {
                var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(data) {
                  var prop, possibleAnswer;
                  return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          data_line += data;
                          prop = customNormalizeFunction(data_line);
                          possibleAnswer = possibleAnswers[prop] || possibleAnswers[Object.keys(possibleAnswers).filter(function (property) {
                            return prop.match(property);
                          })[0]];

                          if (!possibleAnswer) {
                            _context.next = 13;
                            break;
                          }

                          if (!(lastDataLine === data_line)) {
                            _context.next = 9;
                            break;
                          }

                          _ConsoleColor["default"].warn('Same property (' + data_line + ') asked again ( value already provided: ' + possibleAnswer + ')');

                          _context.next = 8;
                          return prompt.call();

                        case 8:
                          possibleAnswer = _context.sent["continue"];

                        case 9:
                          _ConsoleColor["default"].log(data_line + (prop === 'password' ? '' : possibleAnswer));

                          childProcess.stdin.write(possibleAnswer + '\n');
                          _context.next = 14;
                          break;

                        case 13:
                          _ConsoleColor["default"].info(data_line);

                        case 14:
                          lastDataLine = data_line;
                          data_line = '';

                        case 16:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee);
                }));

                return function (_x3) {
                  return _ref.apply(this, arguments);
                };
              }());
              stdOutErrLine = '';
              childProcess.stdout.on('error', function (data) {
                stdOutErrLine += data;

                if (stdOutErrLine.indexOf("\n") > -1 && stdOutErrLine.replace(/\s/g, '').length) {
                  _ConsoleColor["default"].error(data.toString());

                  stdOutErrLine = '';
                }
              });
              stdErrLine = '';
              childProcess.stderr.on("data", function (data) {
                stdErrLine += data;

                if (stdErrLine.indexOf("\n") > -1 && stdErrLine.replace(/\s/g, '').length) {
                  _ConsoleColor["default"].error(data + '');

                  stdErrLine = '';
                }
              });
            }

            return _context2.abrupt("return", new Promise(function (resolve) {
              childProcess.on('exit', function () {
                childProcess.kill();
                resolve();
              });
            }));

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _interactiveShell.apply(this, arguments);
}