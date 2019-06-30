import React from 'react'
import PropTypes from 'prop-types'
import Editor from 'react-simple-code-editor'

import CodeBlock from './CodeBlock'
import defaultTheme from './defaultTheme'

export default class CodeEditor extends React.Component {
  highlightCode = code => {
    const { language, theme } = this.props

    return <CodeBlock code={code} language={language} theme={theme} noWrapper />
  }

  render() {
    const {
      code,
      language,
      theme,
      style,
      padding,
      onChange,
      ...rest
    } = this.props

    return (
      <Editor
        padding={padding}
        value={code || ''}
        highlight={this.highlightCode}
        onValueChange={onChange}
        style={
          theme && typeof theme.plain === 'object'
            ? { ...theme.plain, ...style }
            : style
        }
        {...rest}
      />
    )
  }
}

CodeEditor.defaultProps = {
  language: 'jsx',
  padding: 10,
  theme: defaultTheme,
  onChange: () => {},
}

CodeEditor.propTypes = {
  code: PropTypes.string,
  language: PropTypes.string,
  padding: PropTypes.number,
  theme: PropTypes.object,
  style: PropTypes.object,
  onChange: PropTypes.func,
}
