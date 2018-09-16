'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactMarkdown = require('react-markdown');

var _reactMarkdown2 = _interopRequireDefault(_reactMarkdown);

var _readmecontent = require('./readmecontent');

var _readmecontent2 = _interopRequireDefault(_readmecontent);

var _reactSyntaxHighlighter = require('react-syntax-highlighter');

var _reactSyntaxHighlighter2 = _interopRequireDefault(_reactSyntaxHighlighter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Docs = function (_React$Component) {
  _inherits(Docs, _React$Component);

  function Docs(props) {
    _classCallCheck(this, Docs);

    var _this = _possibleConstructorReturn(this, (Docs.__proto__ || Object.getPrototypeOf(Docs)).call(this, props));

    _this.state = {
      content: _readmecontent2.default
    };
    return _this;
  }

  _createClass(Docs, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      if (newProps.converter) {
        this.setState({
          content: newProps.converter.convert(this.state.content)
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var content = this.state.content;

      return _react2.default.createElement(
        'div',
        { style: { width: 800, margin: '0 auto' } },
        _react2.default.createElement(_reactMarkdown2.default, {
          source: content,
          renderers: {
            code: function code(props) {
              return _react2.default.createElement(
                _reactSyntaxHighlighter2.default,
                { language: props.language },
                props.value
              );
            }
          }
        })
      );
    }
  }]);

  return Docs;
}(_react2.default.Component);

exports.default = Docs;