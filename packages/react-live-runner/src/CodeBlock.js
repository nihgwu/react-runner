import React from 'react'
import PropTypes from 'prop-types'
import Highlighter, { Prism } from 'prism-react-renderer'

import defaultTheme from './theme'

export default function Highlight({
  code,
  language,
  theme,
  noWrapper,
  padding,
  style,
  ...rest
}) {
  const children = (
    <Highlighter code={code} language={language} Prism={Prism} theme={theme}>
      {({ tokens, getLineProps, getTokenProps }) =>
        tokens.map((line, i) => (
          <div {...getLineProps({ line, key: i })}>
            {line.map((token, key) => (
              <span {...getTokenProps({ token, key })} />
            ))}
          </div>
        ))
      }
    </Highlighter>
  )

  if (noWrapper) return children

  const containerStyle = {
    margin: 0,
    paddingTop: padding,
    paddingRight: padding,
    paddingBottom: padding,
    paddingLeft: padding,
  }
  return (
    <pre
      style={{
        ...(theme && typeof theme.plain === 'object' && theme.plain),
        ...containerStyle,
        ...style,
      }}
      {...rest}
    >
      {children}
    </pre>
  )
}

Highlight.defaultProps = {
  language: 'jsx',
  theme: defaultTheme,
  noWrapper: false,
  padding: 10,
}

Highlight.propTypes = {
  code: PropTypes.string,
  language: PropTypes.string,
  theme: PropTypes.object,
  style: PropTypes.object,
  noWrapper: PropTypes.bool,
  padding: PropTypes.number,
}
