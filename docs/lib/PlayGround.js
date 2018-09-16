'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CodeMirror = null;

if (process.browser) {
  CodeMirror = require('codemirror');
}

var DEFAULT_CONTENT = '中文简繁转换开源项目，支持词汇级别的转换、异体字转换和地区习惯用词转换（中国大陆、台湾、香港）。 Features 特点 严格区分「一简对多繁」和「一简对多异」。 完全兼容异体字，可以实现动态替换。 严格审校一简对多繁词条，原则为「能分则不合」。 支持中国大陆、台湾、香港异体字和地区习惯用词转换，如「里」「里」、「鼠标」「滑鼠」。 词库和函数库完全分离，可以自由修改、导入、扩展。 支持C、C++、Python、PHP、Java、Ruby、Node.js and Android。 兼容Windows、Linux、Mac平台。';

var PlayGround = function (_React$Component) {
  _inherits(PlayGround, _React$Component);

  function PlayGround(props) {
    _classCallCheck(this, PlayGround);

    var _this = _possibleConstructorReturn(this, (PlayGround.__proto__ || Object.getPrototypeOf(PlayGround)).call(this, props));

    _this.refers = {};
    _this.mirrow = null;
    _this.state = {
      result: ''
    };
    return _this;
  }

  _createClass(PlayGround, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this.mirror = new CodeMirror(this.refers.textarea, {
        lineNumbers: true,
        mode: 'text',
        lineWrapping: true
      });

      this.mirror.setSize('100%');
      this.mirror.setValue(DEFAULT_CONTENT);
      this.mirror.on('change', function (_, obj) {
        if (_this2.props.converter) {
          _this2.setState({
            result: _this2.props.converter.convert(_this2.mirror.getValue())
          });
        }
      });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      if (!this.props.converter && props.converter) {
        this.setState({
          result: props.converter.convert(this.mirror.getValue())
        });
      }

      if (!props.converter) {
        this.setState({
          result: '(正在获取词典数据，请稍等...)'
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { style: { width: '50%', display: 'inline-block' } },
          _react2.default.createElement('div', {
            style: {
              fontSize: '14px',
              border: '1px solid #eee',
              borderRadius: '4px'
            },
            ref: function ref(textarea) {
              return _this3.refers.textarea = textarea;
            }
          })
        ),
        _react2.default.createElement(
          'div',
          {
            style: {
              width: '50%',
              display: 'inline-block',
              verticalAlign: 'top',
              boxSizing: 'border-box',
              padding: '10px',
              fontSize: '14px'
            }
          },
          _react2.default.createElement(
            'div',
            { style: {} },
            this.state.result
          )
        )
      );
    }
  }]);

  return PlayGround;
}(_react2.default.Component);

exports.default = PlayGround;