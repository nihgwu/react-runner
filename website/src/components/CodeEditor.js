import React, { useState, useCallback } from 'react'
import Editor from 'react-simple-code-editor'
import Highlight, { Prism } from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/vsDarkPlus'

const CodeEditor = ({ code: _code, language = 'jsx', onChange, ...rest }) => {
  const [code, setCode] = useState(_code)

  const highlightCode = useCallback(
    code => (
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
    ),
    [code, language]
  )
  const handleChange = useCallback(code => {
    setCode(code)
    onChange && onChange(code)
  })

  return (
    <Editor
      padding={10}
      value={code}
      highlight={highlightCode}
      onValueChange={handleChange}
      {...rest}
    />
  )
}

export default CodeEditor
