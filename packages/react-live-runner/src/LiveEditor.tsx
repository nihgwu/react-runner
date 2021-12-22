import React from 'react'

import { useLiveContext } from './LiveContext'
import { CodeEditor, CodeEditorProps } from './CodeEditor'

export type LiveEditorProps = Omit<
  CodeEditorProps,
  'code' | 'language' | 'theme' | 'onChange'
>

export const LiveEditor = (props: LiveEditorProps) => {
  const { code, language, theme, onChange } = useLiveContext()

  return (
    <CodeEditor
      {...props}
      value={code}
      language={language}
      theme={theme}
      onChange={onChange}
    />
  )
}
