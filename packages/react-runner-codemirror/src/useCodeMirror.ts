import { RefObject, useEffect, useRef } from 'react'
import { EditorState } from '@codemirror/state'
import { EditorView } from '@codemirror/view'

import { basicSetup } from './basicSetup'
import { getConfig, useConfig, Config } from './config'

export type UseCodeMirrorOptions = Config & {
  defaultValue?: string
  value?: string
  onChange?: (value: string) => void
}

export const useCodeMirror = (
  parentRef: RefObject<Element | DocumentFragment | undefined>,
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
  }: UseCodeMirrorOptions
) => {
  const viewRef = useRef<EditorView | null>(null)

  useEffect(() => {
    if (!viewRef.current || value === undefined) return

    const currentCode = viewRef.current.state.sliceDoc()
    if (value === currentCode) return

    viewRef.current.dispatch({
      changes: {
        from: 0,
        to: viewRef.current.state.doc.length,
        insert: value,
      },
    })
  }, [value])

  useConfig(viewRef, 'padding', padding)
  useConfig(viewRef, 'readOnly', readOnly)
  useConfig(viewRef, 'showLineNumbers', showLineNumbers)
  useConfig(viewRef, 'wrapLine', wrapLine)
  useConfig(viewRef, 'extensions', extensions)
  useConfig(viewRef, 'filename', filename)

  const stateMap = useRef(new Map<string, EditorState>())
  const prevFilename = useRef<string>()
  const onChangeRef = useRef(onChange)
  onChangeRef.current = onChange

  useEffect(() => {
    if (!parentRef.current) return

    if (prevFilename.current && viewRef.current) {
      stateMap.current.set(prevFilename.current, viewRef.current.state)
      !viewRef.current.hasFocus && viewRef.current.focus()
    }
    if (viewRef.current && filename && stateMap.current.has(filename)) {
      const cachedState = stateMap.current.get(filename)!
      viewRef.current.setState(cachedState)
      viewRef.current.scrollPosIntoView(cachedState.selection.main.from)
    } else {
      const state = EditorState.create({
        doc: value !== undefined ? value : defaultValue,
        extensions: [
          basicSetup,
          EditorView.updateListener.of((update) => {
            if (update.docChanged) {
              onChangeRef.current?.(update.state.sliceDoc())
            }
          }),
          getConfig('padding', padding),
          getConfig('readOnly', readOnly),
          getConfig('showLineNumbers', showLineNumbers),
          getConfig('wrapLine', wrapLine),
          getConfig('extensions', extensions),
          getConfig('filename', filename),
        ],
      })
      if (!viewRef.current) {
        viewRef.current = new EditorView({
          state,
          parent: parentRef.current,
        })
      } else {
        viewRef.current.setState(state)
      }
    }
    prevFilename.current = filename
  }, [filename])

  useEffect(
    () => () => {
      if (viewRef.current) {
        viewRef.current.destroy()
        viewRef.current = null
      }
      stateMap.current.clear()
    },
    []
  )

  return viewRef
}
