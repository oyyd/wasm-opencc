'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _PlayGround = require('./PlayGround');

var _PlayGround2 = _interopRequireDefault(_PlayGround);

var _Docs = require('./Docs');

var _Docs2 = _interopRequireDefault(_Docs);

var _config = require('../../generated/config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NAME_MAP = {
  's2t.json': '簡體到繁體',
  't2s.json': '繁體到簡體',
  's2tw.json': '簡體到臺灣正體',
  'tw2s.json': '臺灣正體到簡體',
  's2hk.json': '簡體到香港繁體（香港小學學習字詞表標準）',
  'hk2s.json': '香港繁體（香港小學學習字詞表標準）到簡體',
  's2twp.json': '簡體到繁體（臺灣正體標準）並轉換爲臺灣常用詞彙',
  'tw2sp.json': '繁體（臺灣正體標準）到簡體並轉換爲中國大陸常用詞彙',
  't2tw.json': '繁體（OpenCC 標準）到臺灣正體',
  't2hk.json': '繁體（OpenCC 標準）到香港繁體（香港小學學習字詞表標準）'
};

function ConvertWhenPossible(props) {
  if (props.converter) {
    return props.converter.convert(props.content);
  }
  return props.content;
}

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this.state = {
      converterType: 's2t.json',
      converter: null
    };
    return _this;
  }

  _createClass(App, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.changeConverter(this.state.converterType);
    }
  }, {
    key: 'changeConverter',
    value: function changeConverter(type) {
      var _this2 = this;

      var _window$OpenCCWasm_ = window.OpenCCWasm_,
          ready = _window$OpenCCWasm_.ready,
          DictSource = _window$OpenCCWasm_.DictSource,
          Converter = _window$OpenCCWasm_.Converter;


      if (this.state.converter) {
        this.state.converter.delete();
      }

      this.setState({
        converterType: type,
        converter: null
      });

      ready().then(function () {
        var dictSource = new DictSource(type);

        return dictSource.get();
      }).then(function (args) {
        var converter = new (Function.prototype.bind.apply(Converter, [null].concat(_toConsumableArray(args))))();

        _this2.setState({
          converterType: type,
          converter: converter
        });
      }).catch(function (err) {
        console.log('err', err);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _state = this.state,
          converter = _state.converter,
          converterType = _state.converterType;


      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'h1',
          { style: { color: '#333', fontSize: '24px' } },
          _react2.default.createElement(ConvertWhenPossible, { converter: converter, content: 'wasm-opencc\u5F00\u653E\u4E2D\u6587\u8F6C\u6362' }),
          '\uFF08',
          _react2.default.createElement(
            'a',
            { href: 'https://github.com/BYVoid/OpenCC' },
            'OpenCC'
          ),
          '\uFF09',
          _react2.default.createElement(ConvertWhenPossible, { converter: converter, content: 'wasm\u7248\u672C' })
        ),
        _react2.default.createElement(
          'div',
          null,
          Object.keys(_config2.default).map(function (name) {
            return _react2.default.createElement(
              'button',
              {
                onClick: function onClick() {
                  return _this3.changeConverter(name);
                },
                style: {
                  cursor: 'pointer',
                  margin: '0 6px 10px 0',
                  padding: '0 10px',
                  fontSize: '14px',
                  height: '34px',
                  borderRadius: '4px',
                  lineHeight: 1.5,
                  fontWeight: 400,
                  textAlign: 'center',
                  borderColor: '#d9d9d9',
                  color: converterType === name ? '#FFF' : 'rgba(0, 0, 0, 0.65)',
                  background: converterType === name ? '#40a9ff' : 'white'
                }
              },
              _react2.default.createElement(ConvertWhenPossible, { content: NAME_MAP[name], converter: converter })
            );
          })
        ),
        _react2.default.createElement(_PlayGround2.default, { converter: converter }),
        _react2.default.createElement(_Docs2.default, { converter: converter })
      );
    }
  }]);

  return App;
}(_react2.default.Component);

exports.default = App;