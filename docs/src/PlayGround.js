import React from 'react';

let CodeMirror = null

if (process.browser) {
  CodeMirror = require('codemirror');
}

const DEFAULT_CONTENT =
  '中文简繁转换开源项目，支持词汇级别的转换、异体字转换和地区习惯用词转换（中国大陆、台湾、香港）。 Features 特点 严格区分「一简对多繁」和「一简对多异」。 完全兼容异体字，可以实现动态替换。 严格审校一简对多繁词条，原则为「能分则不合」。 支持中国大陆、台湾、香港异体字和地区习惯用词转换，如「里」「里」、「鼠标」「滑鼠」。 词库和函数库完全分离，可以自由修改、导入、扩展。 支持C、C++、Python、PHP、Java、Ruby、Node.js and Android。 兼容Windows、Linux、Mac平台。';

class PlayGround extends React.Component {
  constructor(props) {
    super(props);

    this.refers = {};
    this.mirrow = null;
    this.state = {
      result: '',
    };
  }

  componentDidMount() {
    this.mirror = new CodeMirror(this.refers.textarea, {
      lineNumbers: true,
      mode: 'text',
      lineWrapping: true,
    });

    this.mirror.setSize('100%');
    this.mirror.setValue(DEFAULT_CONTENT);
    this.mirror.on('change', (_, obj) => {
      if (this.props.converter) {
        this.setState({
          result: this.props.converter.convert(this.mirror.getValue()),
        });
      }
    });
  }

  componentWillReceiveProps(props) {
    if (!this.props.converter && props.converter) {
      this.setState({
        result: props.converter.convert(this.mirror.getValue())
      })
    }

    if (!props.converter) {
      this.setState({
        result: '(正在获取词典数据，请稍等...)'
      })
    }
  }

  render() {
    return (
      <div>
        <div style={{ width: '50%', display: 'inline-block' }}>
          <div
            style={{
              fontSize: '14px',
              border: '1px solid #eee',
              borderRadius: '4px',
            }}
            ref={textarea => (this.refers.textarea = textarea)}
          />
        </div>
        <div
          style={{
            width: '50%',
            display: 'inline-block',
            verticalAlign: 'top',
            boxSizing: 'border-box',
            padding: '10px',
            fontSize: '14px',
          }}
        >
          <div style={{}}>{this.state.result}</div>
        </div>
      </div>
    );
  }
}

export default PlayGround;
