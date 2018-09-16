import React from 'react'
import ReactMarkdown from 'react-markdown'
import readmeContent from './readmecontent'

class Docs extends React.Component {
  render() {
    return (
      <ReactMarkdown source={readmeContent}/>
    )
  }
}

export default Docs
