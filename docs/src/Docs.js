import React from 'react'
import ReactMarkdown from 'react-markdown'
import readmeContent from './readmecontent'

class Docs extends React.Component {
  render() {
    return (
      <div style={{ width: 800, margin: '0 auto' }}>
        <ReactMarkdown source={readmeContent}/>
      </div>
    )
  }
}

export default Docs
