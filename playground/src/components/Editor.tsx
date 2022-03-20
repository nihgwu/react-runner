import React, { useEffect, useState } from 'react'
import { CodeMirror, CodeMirrorProps } from 'react-runner-codemirror'

import { getTheme, observeThemeChange } from '../utils/theme'

export const Editor = (props: CodeMirrorProps) => {
  const [theme, setTheme] = useState(getTheme)
  useEffect(() => observeThemeChange(setTheme), [])

  return <CodeMirror theme={theme} padding={16} showLineNumbers {...props} />
}

export default Editor
