import { RefObject, useEffect } from 'react'
import { Compartment, Extension } from '@codemirror/state'
import { EditorView, highlightActiveLine } from '@codemirror/view'
import { lineNumbers, highlightActiveLineGutter } from '@codemirror/gutter'
import { css } from '@codemirror/lang-css'

import { javascript } from './javascript'

export type Config = {
  padding?: number | string
  readOnly?: boolean
  showLineNumbers?: boolean
  wrapLine?: boolean
  extensions?: Extension
  filename?: string
}

const compartments: Record<keyof Config, Compartment> = {
  padding: new Compartment(),
  readOnly: new Compartment(),
  showLineNumbers: new Compartment(),
  wrapLine: new Compartment(),
  extensions: new Compartment(),
  filename: new Compartment(),
}

export const defaultParentStyle = {
  fontFamily:
    'source-code-pro, Menlo, Monaco, Consolas, Courier New, monospace',
  color: '#abb2bf',
  backgroundColor: '#282c34',
}

const getBaseTheme = (padding: Config['padding'] = 10) =>
  EditorView.theme({
    '&.cm-editor': {
      height: '100%',
    },
    '&.cm-editor.cm-focused': {
      outline: 'none',
    },
    '&.cm-editor .cm-scroller': {
      overflow: 'auto',
      fontFamily:
        'source-code-pro, Menlo, Monaco, Consolas, Courier New, monospace',
    },
    '&.cm-editor .cm-line': {
      padding: 0,
    },
    '&.cm-editor .cm-content': {
      padding: typeof padding === 'string' ? padding : `${padding}px`,
    },
    '&.cm-editor .cm-completionIcon': {
      width: '1em',
      paddingRight: '1.2em',
    },
    '&.cm-editor.cm-focused .cm-activeLineGutter': {
      backgroundColor: 'inherit',
      color: 'white',
    },
    '&.cm-editor:not(.cm-focused) .cm-activeLine': {
      backgroundColor: 'inherit',
    },
    '&.cm-editor .cm-tooltip-autocomplete > ul > li[aria-selected]': {
      backgroundColor: '#353a42',
      color: 'white',
    },
    '&.cm-editor .cm-tooltip': {
      backgroundColor: '#2c313a',
      color: '#abb2bf',
    },
  })

const config: {
  [key in keyof Config]-?: (value: Config[key]) => Extension
} = {
  padding: (padding) => getBaseTheme(padding),
  readOnly: (readOnly) =>
    readOnly
      ? EditorView.editable.of(false)
      : [highlightActiveLine(), highlightActiveLineGutter()],
  showLineNumbers: (showLineNumbers) => (showLineNumbers ? lineNumbers() : []),
  wrapLine: (wrapLine) => (wrapLine ? EditorView.lineWrapping : []),
  extensions: (extensions) => extensions || [],
  filename: (filename) => (filename?.endsWith('.css') ? css() : javascript()),
}

export const getConfig = <T extends keyof Config>(key: T, value: Config[T]) =>
  compartments[key].of(config[key](value as any))

export const useConfig = <T extends keyof Config>(
  view: RefObject<EditorView | null>,
  key: T,
  value: Config[T]
) => {
  useEffect(() => {
    view.current?.dispatch({
      effects: compartments[key].reconfigure(config[key](value as any)),
    })
  }, [key, value])
}
