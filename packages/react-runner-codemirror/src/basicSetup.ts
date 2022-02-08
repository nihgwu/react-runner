import { EditorView, keymap } from '@codemirror/view'
import { EditorState, Extension } from '@codemirror/state'
import { history, historyKeymap } from '@codemirror/history'
import { indentOnInput } from '@codemirror/language'
import { defaultKeymap, indentMore, indentLess } from '@codemirror/commands'
import { closeBrackets, closeBracketsKeymap } from '@codemirror/closebrackets'
import { autocompletion, completionKeymap } from '@codemirror/autocomplete'
import { commentKeymap } from '@codemirror/comment'
import { defaultHighlightStyle } from '@codemirror/highlight'
import { oneDark } from '@codemirror/theme-one-dark'

const insertSoftTab = ({ state, dispatch }: EditorView) => {
  if (state.selection.ranges.some((r) => !r.empty)) {
    return indentMore({ state, dispatch })
  }

  dispatch(
    state.update(state.replaceSelection('  '), {
      scrollIntoView: true,
      userEvent: 'input',
    })
  )
  return true
}

export const basicSetup: Extension = [
  oneDark,
  history(),
  EditorState.tabSize.of(2),
  EditorState.allowMultipleSelections.of(true),
  indentOnInput(),
  defaultHighlightStyle.fallback,
  closeBrackets(),
  autocompletion(),
  keymap.of([
    ...closeBracketsKeymap,
    ...defaultKeymap,
    ...historyKeymap,
    ...commentKeymap,
    ...completionKeymap,
    {
      key: 'Tab',
      run: insertSoftTab,
      shift: indentLess,
    },
    {
      key: 'Escape',
      run: (view) => {
        if (view.hasFocus) view.dom.focus()
        return true
      },
    },
  ]),
]
