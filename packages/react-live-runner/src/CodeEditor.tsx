import React, {
  useCallback,
  useState,
  useRef,
  ComponentPropsWithoutRef,
  useMemo,
} from 'react'
import Editor from 'react-simple-code-editor'

import { CodeBlock } from './CodeBlock'
import { Language, Theme, PrismLib } from './types'
import defaultTheme from './defaultTheme'

type EditorProps = ComponentPropsWithoutRef<typeof Editor>

export type CodeEditorProps = Omit<
  EditorProps,
  'defaultValue' | 'value' | 'onValueChange' | 'highlight' | 'onChange'
> & {
  defaultValue?: string
  value?: string
  language?: Language
  padding?: number
  theme?: Theme
  Prism?: PrismLib
  onChange?: (value: string) => void
}

export const CodeEditor = ({
  defaultValue,
  value: controlledValue,
  language = 'jsx',
  theme = defaultTheme,
  Prism,
  padding = 10,
  onChange,
  ...rest
}: CodeEditorProps) => {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue || '')
  const isControlled = controlledValue !== undefined

  const highlightCode = useCallback(
    (code: string) => (
      <CodeBlock language={language} theme={theme} Prism={Prism} noWrapper>
        {code}
      </CodeBlock>
    ),
    [language, theme, Prism]
  )

  const onChangeRef = useRef(onChange)
  onChangeRef.current = onChange
  const handleChange = useCallback(
    (code: string) => {
      if (!isControlled) setUncontrolledValue(code)
      onChangeRef.current?.(code)
    },
    [isControlled]
  )
  const style = useMemo(
    () => ({ ...theme.plain, ...rest.style }),
    [theme.plain, rest.style]
  )

  return (
    <Editor
      {...rest}
      padding={padding}
      value={isControlled ? controlledValue : uncontrolledValue}
      highlight={highlightCode}
      onValueChange={handleChange}
      style={style}
    />
  )
}
