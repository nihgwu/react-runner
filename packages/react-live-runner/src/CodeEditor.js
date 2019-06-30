import React from 'react'
import PropTypes from 'prop-types'
import Editor from 'react-simple-code-editor'

import CodeBlock from './CodeBlock'
import defaultTheme from './defaultTheme'

export default class CodeEditor extends React.Component {
  state = {
    code: this.props.sourceCode,
  }

  highlightCode = code => {
    const { language, theme } = this.props

    return <CodeBlock code={code} language={language} theme={theme} noWrapper />
  }

  handleChange = code => {
    const { onChange } = this.props

    if (this.props.code !== undefined) onChange(code)
    else this.setState({ code }, () => onChange(code))
  }

  componentDidUpdate(prevProps) {
    const { code, sourceCode } = this.props
    if (code === undefined && sourceCode !== prevProps.sourceCode) {
      this.setState(sourceCode)
    }
  }

  render() {
    const {
      sourceCode,
      code,
      language,
      theme,
      style,
      padding,
      onChange,
      ...rest
    } = this.props

    const _code = code !== undefined ? code : this.state.code
    return (
      <Editor
        padding={padding}
        value={_code || ''}
        highlight={this.highlightCode}
        onValueChange={this.handleChange}
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
  sourceCode: PropTypes.string,
  code: PropTypes.string,
  language: PropTypes.string,
  padding: PropTypes.number,
  theme: PropTypes.object,
  style: PropTypes.object,
  onChange: PropTypes.func,
}
