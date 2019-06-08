import React from 'react'
import PropTypes from 'prop-types'
import Editor from 'react-simple-code-editor'
import Highlight, { Prism } from 'prism-react-renderer'
import vsDarkPlus from 'prism-react-renderer/themes/vsDarkPlus'

export default class CodeEditor extends React.Component {
  highlightCode = code => {
    const { language, theme } = this.props

    return (
      <Highlight code={code} language={language} Prism={Prism} theme={theme}>
        {({ tokens, getLineProps, getTokenProps }) => (
          <>
            {tokens.map((line, i) => (
              <div {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </>
        )}
      </Highlight>
    )
  }

  render() {
    const { code, language, theme, style, onChange, ...rest } = this.props

    return (
      <Editor
        padding={10}
        value={code || ''}
        highlight={this.highlightCode}
        onValueChange={onChange}
        style={{
          whiteSpace: 'pre',
          fontFamily: 'monospace',
          ...(theme && typeof theme.plain === 'object' ? theme.plain : {}),
          ...style,
        }}
        {...rest}
      />
    )
  }
}

CodeEditor.defaultProps = {
  language: 'jsx',
  theme: vsDarkPlus,
  onChange: () => {},
}

CodeEditor.propTypes = {
  code: PropTypes.string,
  language: PropTypes.string,
  theme: PropTypes.object,
  style: PropTypes.object,
  onChange: PropTypes.func,
}
