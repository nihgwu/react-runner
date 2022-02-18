import React, {
  forwardRef,
  useEffect,
  useRef,
  useMemo,
  HTMLAttributes,
  CSSProperties,
} from 'react'
import { EditorView } from '@codemirror/view'

import { useCodeMirror } from './useCodeMirror'
import { Config, Theme } from './config'

export type CodeMirrorProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'defaultValue' | 'value' | 'onChange'
> &
  Config & {
    defaultValue?: string
    value?: string
    onChange?: (code: string) => void
  }

export const CodeMirror = forwardRef<EditorView, CodeMirrorProps>(
  (
    {
      defaultValue,
      value,
      onChange,
      theme = 'dark',
      padding = 10,
      readOnly,
      showLineNumbers,
      wrapLine,
      extensions,
      filename,
      style,
      ...rest
    },
    ref
  ): JSX.Element => {
    const parentRef = useRef<HTMLDivElement>(null)
    const unControlledValue = useMemo(() => defaultValue, [filename])

    const viewRef = useCodeMirror({
      parentRef: parentRef,
      code: value !== undefined ? value : unControlledValue,
      onChange,
      theme,
      padding,
      readOnly,
      showLineNumbers,
      wrapLine,
      extensions,
      filename,
    })

    useEffect(() => {
      if (typeof ref === 'function') {
        ref(viewRef.current)
      } else if (ref) {
        ref.current = viewRef.current
      }

      return () => {
        if (typeof ref === 'function') {
          ref(null)
        } else if (ref) {
          ref.current = null
        }
      }
    }, [])

    const mergedStyle = useMemo(
      () => ({
        fontFamily:
          'source-code-pro, Menlo, Monaco, Consolas, Courier New, monospace',
        ...getThemeStyle(theme),
        ...style,
      }),
      [style, theme]
    )
    return <div ref={parentRef} style={mergedStyle} {...rest} />
  }
)

const getThemeStyle = (theme: Theme): CSSProperties => {
  if (theme === 'dark') {
    return {
      backgroundColor: '#282c34',
      color: '#abb2bf',
    }
  }
  if (theme === 'light') {
    return {
      backgroundColor: 'white',
      color: '#282c34',
    }
  }
  return {}
}
