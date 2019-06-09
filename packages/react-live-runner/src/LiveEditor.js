import React from 'react'
import LiveContext from './LiveContext'
import CodeEditor from './CodeEditor'

export default function LiveEditor(props) {
  return (
    <LiveContext.Consumer>
      {({ code, language, theme, onChange }) => (
        <CodeEditor
          code={code}
          language={language}
          theme={theme}
          onChange={onChange}
          {...props}
        />
      )}
    </LiveContext.Consumer>
  )
}
