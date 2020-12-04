"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.interactiveShell = interactiveShell;

var _child_process = _interopRequireDefault(require("child_process"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var normalize = function normalize(string) {
  return string.replace(/[^\w\d]/ig, '').toLowerCase();
};
/**
 * Provides a simple interactive shell to answer prompts
 * @param cmd
 * @param args
 * @param arrayOfAnswers
 * @param done callbackFunction
 */


function interactiveShell(cmd, args) {
  var arrayOfAnswers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var done = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function () {};
  var data_line = '';
  var possibleAnswers = {};

  for (var property in arrayOfAnswers) {
    possibleAnswers[normalize(property)] = arrayOfAnswers[property];
  }

  var childProcess = _child_process["default"].spawn(cmd, args);

  childProcess.stdout.setEncoding('utf8');
  childProcess.stdout.on("data", function (data) {
    data_line += data;
    var prop = normalize(data_line);

    if (possibleAnswers[prop]) {
      console.info(data_line + (prop === 'password' ? '' : possibleAnswers[prop]));
      data_line = '';
      childProcess.stdin.write(possibleAnswers[prop] + '\n');
      delete possibleAnswers[prop];
    } else {
      console.warn(data_line);
    }
  });
  childProcess.stdout.on('error', function (data) {
    console.warn(data);
  });
  childProcess.stderr.on("data", function (data) {
    console.error(data);
  });
  childProcess.stdout.on("end", function (data) {
    console.info(data !== null && data !== void 0 ? data : '');
    done();
  });
}