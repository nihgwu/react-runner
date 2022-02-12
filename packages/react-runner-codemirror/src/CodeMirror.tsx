import React, {
  forwardRef,
  useEffect,
  useRef,
  useMemo,
  HTMLAttributes,
} from 'react'
import { EditorView } from '@codemirror/view'

import { useCodeMirror } from './useCodeMirror'
import { defaultParentStyle, Config } from './config'

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
      padding,
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
      () => ({ ...defaultParentStyle, ...style }),
      [style]
    )
    return <div ref={parentRef} style={mergedStyle} {...rest} />
  }
)
