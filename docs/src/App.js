import React from 'react';
import PlayGround from './PlayGround';
import Docs from './Docs';
import CONFIG from '../../generated/config';

const NAME_MAP = {
  's2t.json': '簡體到繁體',
  't2s.json': '繁體到簡體',
  's2tw.json': '簡體到臺灣正體',
  'tw2s.json': '臺灣正體到簡體',
  's2hk.json': '簡體到香港繁體（香港小學學習字詞表標準）',
  'hk2s.json': '香港繁體（香港小學學習字詞表標準）到簡體',
  's2twp.json': '簡體到繁體（臺灣正體標準）並轉換爲臺灣常用詞彙',
  'tw2sp.json': '繁體（臺灣正體標準）到簡體並轉換爲中國大陸常用詞彙',
  't2tw.json': '繁體（OpenCC 標準）到臺灣正體',
  't2hk.json': '繁體（OpenCC 標準）到香港繁體（香港小學學習字詞表標準）',
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      converterType: 's2t.json',
      converter: null,
    };
  }

  componentDidMount() {
    this.changeConverter(this.state.converterType);
  }

  changeConverter(type) {
    const { ready, DictSource, Converter } = window.OpenCCWasm_;

    if (this.state.converter) {
      this.state.converter.delete();
    }

    this.setState({
      converterType: type,
      converter: null,
    });

    ready()
      .then(() => {
        const dictSource = new DictSource(type);

        return dictSource.get();
      })
      .then(args => {
        const converter = new Converter(...args);

        this.setState({
          converterType: type,
          converter,
        });
      })
      .catch(err => {
        console.log('err', err);
      });
  }

  render() {
    const { converter, converterType } = this.state;

    return (
      <div>
        <h1 style={{ color: '#333', fontSize: '24px'}}>
          wasm-opencc开放中文转换（<a href="https://github.com/BYVoid/OpenCC">
            OpenCC
          </a>）wasm版本
        </h1>
        <div>
          {Object.keys(CONFIG).map(name => (
            <button
              onClick={() => this.changeConverter(name)}
              style={{
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
                background: converterType === name ? '#40a9ff' : 'white',
              }}
            >
              {NAME_MAP[name]}
            </button>
          ))}
        </div>
        <PlayGround converter={converter} />
        <Docs converter={converter} />
      </div>
    );
  }
}

export default App;
