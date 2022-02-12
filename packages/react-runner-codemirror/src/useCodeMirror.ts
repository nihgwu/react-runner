import { RefObject, useEffect, useRef } from 'react'
import { EditorState } from '@codemirror/state'
import { EditorView } from '@codemirror/view'

import { basicSetup } from './basicSetup'
import { getConfig, useConfig, Config } from './config'

const defaultFilename = '__default_filename__'

export type UseCodeMirrorProps = Config & {
  parentRef: RefObject<Element | DocumentFragment | undefined>
  code?: string
  onChange?: (code: string) => void
}

export const useCodeMirror = ({
  parentRef,
  code,
  onChange,
  padding,
  readOnly,
  showLineNumbers,
  wrapLine,
  extensions,
  filename = defaultFilename,
}: UseCodeMirrorProps) => {
  const viewRef = useRef<EditorView | null>(null)
  const stateCache = useRef(new Map<string, EditorState>())
  const codeCache = useRef(new Map<string, string | undefined>())
  const prevFilename = useRef<string>()
  const onChangeRef = useRef(onChange)
  onChangeRef.current = onChange

  useEffect(() => {
    if (!parentRef.current) return

    // cache state on file change
    if (prevFilename.current && viewRef.current) {
      stateCache.current.set(prevFilename.current, viewRef.current.state)
      !viewRef.current.hasFocus && viewRef.current.focus()
    }
    if (viewRef.current && filename && stateCache.current.has(filename)) {
      const cachedState = stateCache.current.get(filename)!
      viewRef.current.setState(cachedState)
    } else {
      const state = EditorState.create({
        doc: code,
        extensions: [
          basicSetup,
          EditorView.updateListener.of((update) => {
            if (update.docChanged) {
              const newCode = update.state.sliceDoc()
              codeCache.current.set(filename, newCode)
              onChangeRef.current?.(newCode)
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
    if (!codeCache.current.has(filename)) {
      codeCache.current.set(filename, code)
    }
    viewRef.current.dispatch({
      effects: EditorView.scrollIntoView(viewRef.current.state.selection.main, {
        xMargin: 30,
        yMargin: 30,
      }),
    })
    prevFilename.current = filename
  }, [filename])

  useEffect(() => {
    if (
      !viewRef.current ||
      code === undefined ||
      code === codeCache.current.get(filename)
    ) {
      return
    }

    viewRef.current.dispatch({
      changes: {
        from: 0,
        to: viewRef.current.state.doc.length,
        insert: code,
      },
    })
  }, [code, filename])

  useConfig(viewRef, 'padding', padding)
  useConfig(viewRef, 'readOnly', readOnly)
  useConfig(viewRef, 'showLineNumbers', showLineNumbers)
  useConfig(viewRef, 'wrapLine', wrapLine)
  useConfig(viewRef, 'extensions', extensions)
  useConfig(viewRef, 'filename', filename)

  useEffect(
    () => () => {
      if (viewRef.current) {
        viewRef.current.destroy()
        viewRef.current = null
      }
      stateCache.current.clear()
      codeCache.current.clear()
    },
    []
  )

  return viewRef
}
