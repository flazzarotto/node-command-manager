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

var prompt = new _PromptWrapper.Prompt();
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
 * @param hiddenProps {string[]}list of props you want to hide entered values, such as password - default: ['password']
 */


function interactiveShell(_x, _x2) {
  return _interactiveShell.apply(this, arguments);
}

function _interactiveShell() {
  _interactiveShell = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(cmd, args) {
    var possibleAnswers,
        interactive,
        customNormalizeFunction,
        hiddenProps,
        data_line,
        childProcess,
        timeout,
        lastDataLine,
        stdOutErrLine,
        stdErrLine,
        _args3 = arguments;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            possibleAnswers = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : {};
            interactive = _args3.length > 3 && _args3[3] !== undefined ? _args3[3] : true;
            customNormalizeFunction = _args3.length > 4 && _args3[4] !== undefined ? _args3[4] : normalize;
            hiddenProps = _args3.length > 5 && _args3[5] !== undefined ? _args3[5] : ['password'];
            data_line = '';
            _context3.next = 7;
            return _child_process["default"].spawn(cmd, _toConsumableArray(args), {
              stdio: interactive ? 'pipe' : ['pipe', 1, 2]
            });

          case 7:
            childProcess = _context3.sent;
            timeout = null;

            if (interactive) {
              childProcess.stdout.setEncoding('utf8');
              lastDataLine = null;
              childProcess.stdout.on("data", /*#__PURE__*/function () {
                var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(data) {
                  var prop, matchingProperty, possibleAnswer, hidden;
                  return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          if (timeout) {
                            clearTimeout(timeout);
                          }

                          data_line += data;
                          prop = customNormalizeFunction(data_line);
                          matchingProperty = possibleAnswers[prop] ? prop : Object.keys(possibleAnswers).filter(function (property) {
                            return prop.match(property);
                          })[0];
                          possibleAnswer = possibleAnswers[matchingProperty];

                          if (!possibleAnswer) {
                            _context2.next = 16;
                            break;
                          }

                          hidden = hiddenProps.indexOf(matchingProperty) > -1 || hiddenProps.indexOf(prop) > -1;

                          if (!(lastDataLine === data_line)) {
                            _context2.next = 12;
                            break;
                          }

                          _ConsoleColor["default"].warn('Same property (' + data_line + ') asked again ( value already provided: ' + possibleAnswer + ')');

                          _context2.next = 11;
                          return prompt.call({
                            "continue": {
                              description: 'Please enter another value',
                              hidden: hidden
                            }
                          });

                        case 11:
                          possibleAnswer = _context2.sent["continue"];

                        case 12:
                          _ConsoleColor["default"].log(data_line + (hidden ? '******' : possibleAnswer));

                          childProcess.stdin.write(possibleAnswer + '\n');
                          _context2.next = 18;
                          break;

                        case 16:
                          _ConsoleColor["default"].log(data_line);

                          timeout = setTimeout( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                            var hidden;
                            return regeneratorRuntime.wrap(function _callee$(_context) {
                              while (1) {
                                switch (_context.prev = _context.next) {
                                  case 0:
                                    hidden = hiddenProps.indexOf(prop) > -1;
                                    _context.next = 3;
                                    return prompt.call({
                                      "continue": {
                                        description: 'No property matching ' + prop + ', please provide manual value',
                                        hidden: hidden
                                      }
                                    });

                                  case 3:
                                    possibleAnswer = _context.sent["continue"];

                                    _ConsoleColor["default"].log(data_line + (hidden ? '******' : possibleAnswer));

                                    childProcess.stdin.write(possibleAnswer + '\n');

                                  case 6:
                                  case "end":
                                    return _context.stop();
                                }
                              }
                            }, _callee);
                          })), 3000);

                        case 18:
                          lastDataLine = data_line;
                          data_line = '';

                        case 20:
                        case "end":
                          return _context2.stop();
                      }
                    }
                  }, _callee2);
                }));

                return function (_x3) {
                  return _ref.apply(this, arguments);
                };
              }());
              stdOutErrLine = '';
              childProcess.stdout.on('error', function (data) {
                if (timeout) {
                  clearTimeout(timeout);
                }

                stdOutErrLine += data;

                if (stdOutErrLine.indexOf("\n") > -1 && stdOutErrLine.replace(/\s/g, '').length) {
                  _ConsoleColor["default"].error('__GLOBAL__ERROR__');

                  _ConsoleColor["default"].error(data.toString());

                  stdOutErrLine = '';
                }
              });
              stdErrLine = '';
              childProcess.stderr.on("data", function (data) {
                if (timeout) {
                  clearTimeout(timeout);
                }

                stdErrLine += data;

                if (stdErrLine.indexOf("\n") > -1 && stdErrLine.replace(/\s/g, '').length) {
                  _ConsoleColor["default"].error(data + '');

                  stdErrLine = '';
                }

                timeout = setTimeout(function () {
                  childProcess.kill();
                }, 10000);
              });
            }

            return _context3.abrupt("return", new Promise(function (resolve) {
              childProcess.on('exit', function () {
                clearTimeout(timeout);
                childProcess.kill();
                resolve();
              });
            }));

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _interactiveShell.apply(this, arguments);
}