import React from 'react'
import PropTypes from 'prop-types'
import Highlight, { Prism } from 'prism-react-renderer'

import defaultTheme from './defaultTheme'

export default function CodeBlock({
  code,
  language,
  theme,
  noWrapper,
  padding,
  className: _className,
  style: _style,
  ...rest
}) {
  return (
    <Highlight code={code} language={language} Prism={Prism} theme={theme}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => {
        const children = tokens.map((line, i) => (
          <div {...getLineProps({ line, key: i })}>
            {line.map((token, key) => (
              <span {...getTokenProps({ token, key })} />
            ))}
          </div>
        ))

        if (noWrapper) return children

        const wrapperStyle = {
          margin: 0,
          padding: 0,
        }
        return (
          <pre
            className={_className ? `${className} ${_className}` : className}
            style={{ ...style, ...wrapperStyle, ..._style }}
            {...rest}
          >
            {children}
          </pre>
        )
      }}
    </Highlight>
  )
}

CodeBlock.defaultProps = {
  language: 'jsx',
  theme: defaultTheme,
  noWrapper: false,
  padding: 10,
}

CodeBlock.propTypes = {
  code: PropTypes.string,
  language: PropTypes.string,
  theme: PropTypes.object,
  noWrapper: PropTypes.bool,
  padding: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.object,
}
