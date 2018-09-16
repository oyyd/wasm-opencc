import React from 'react'
import ReactMarkdown from 'react-markdown'
import readmeContent from './readmecontent'
import SyntaxHighlighter from 'react-syntax-highlighter';

class Docs extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      content: readmeContent,
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.converter) {
      this.setState({
        content: newProps.converter.convert(this.state.content),
      })
    }
  }

  render() {
    const { content } = this.state
    return (
      <div style={{ width: 800, margin: '0 auto' }}>
        <ReactMarkdown
          source={content}
          renderers={{
            code: (props) => {
              return <SyntaxHighlighter language={props.language}>
                {props.value}
              </SyntaxHighlighter>
            }
          }}
        />
      </div>
    )
  }
}

export default Docs
