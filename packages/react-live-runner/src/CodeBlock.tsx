import React, { ComponentPropsWithoutRef, CSSProperties } from 'react'
import Highlight, { Prism } from 'prism-react-renderer'

import { Language, Theme } from './types'
import defaultTheme from './defaultTheme'

export type CodeBlockProps = Omit<
  ComponentPropsWithoutRef<'pre'>,
  'children'
> & {
  children?: string
  language?: Language
  theme?: Theme
  noWrapper?: boolean
  noWrap?: boolean
  padding?: number
}

export const CodeBlock = ({
  children: code = '',
  language = 'jsx',
  theme = defaultTheme,
  padding = 10,
  noWrapper,
  noWrap,
  className: _className,
  style: _style,
  ...rest
}: CodeBlockProps) => {
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

        const wrapperStyle: CSSProperties = {
          margin: 0,
          padding: padding,
          whiteSpace: noWrap ? 'pre' : 'pre-wrap',
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
