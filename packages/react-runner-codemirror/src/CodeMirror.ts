import {
  createElement,
  useRef,
  ComponentPropsWithoutRef,
  ReactElement,
} from 'react'

import { useCodeMirror, UseCodeMirrorOptions } from './useCodeMirror'

const defaultStyle = {
  fontFamily:
    'source-code-pro, Menlo, Monaco, Consolas, Courier New, monospace',
  color: '#abb2bf',
  backgroundColor: '#282c34',
}

export type CodeMirrorProps = Omit<
  ComponentPropsWithoutRef<'div'>,
  'defaultValue' | 'value' | 'onChange' | 'readOnly'
> &
  UseCodeMirrorOptions

export const CodeMirror = ({
  defaultValue,
  value,
  onChange,
  padding,
  extensions,
  readOnly,
  showLineNumbers,
  wrapLine,
  filename,
  style,
  ...rest
}: CodeMirrorProps): ReactElement => {
  const ref = useRef<HTMLDivElement>()
  useCodeMirror(ref, {
    defaultValue,
    value,
    onChange,
    padding,
    extensions,
    readOnly,
    showLineNumbers,
    wrapLine,
    filename,
  })

  return createElement('div', {
    ref,
    style: { ...defaultStyle, ...style },
    ...rest,
  })
}
