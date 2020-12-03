"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Prompt = void 0;

var _promptAsync = _interopRequireDefault(require("prompt-async"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classPrivateFieldLooseBase(receiver, privateKey) { if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) { throw new TypeError("attempted to use private field on non-instance"); } return receiver; }

var id = 0;

function _classPrivateFieldLooseKey(name) { return "__private_" + id++ + "_" + name; }

var _schema = _classPrivateFieldLooseKey("_schema");

var Prompt = /*#__PURE__*/function () {
  _createClass(Prompt, [{
    key: "schema",
    get: function get() {
      return _classPrivateFieldLooseBase(this, _schema)[_schema];
    }
  }]);

  function Prompt(schema) {
    _classCallCheck(this, Prompt);

    Object.defineProperty(this, _schema, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldLooseBase(this, _schema)[_schema] = {
      properties: schema
    };
  }

  _createClass(Prompt, [{
    key: "call",
    value: function () {
      var _call = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _promptAsync["default"].start();

                _context.next = 3;
                return _promptAsync["default"].get(_classPrivateFieldLooseBase(this, _schema)[_schema]);

              case 3:
                result = _context.sent;

                _promptAsync["default"].stop();

                return _context.abrupt("return", result);

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function call() {
        return _call.apply(this, arguments);
      }

      return call;
    }()
  }]);

  return Prompt;
}();

exports.Prompt = Prompt;