import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'

import { LiveRunner } from '../LiveRunner'
import { LiveRunnerOptions } from '../types'

const Container = (props: LiveRunnerOptions) => (
  <LiveRunner {...props}>
    {({ element, error, code, onChange }) => (
      <>
        <textarea
          value={code}
          onChange={(event) => onChange(event.target.value)}
        />
        {error && <pre data-testid="error">{error}</pre>}
        <pre data-testid="preview">{element}</pre>
      </>
    )}
  </LiveRunner>
)

test('edit', () => {
  const result = render(<Container sourceCode={`() => <div>hello</div>`} />)
  const editor = screen.getByRole<HTMLTextAreaElement>('textbox')

  expect(editor.value).toBe(`() => <div>hello</div>`)
  expect(screen.getByTestId('preview').innerHTML).toBe(`<div>hello</div>`)
  expect(screen.queryByTestId('error')).toBeNull()

  fireEvent.change(editor, {
    target: {
      value: `<div>hello</div><div>react-runner</div>`,
    },
  })

  expect(screen.getByTestId('preview').innerHTML).toBe(
    `<div>hello</div><div>react-runner</div>`
  )

  fireEvent.change(editor, {
    target: {
      value: `<div>hello</div><div>{react-runner}</div>`,
    },
  })

  expect(screen.getByTestId('preview').innerHTML).toBe(``)
  expect(screen.getByTestId('error').innerHTML).toBe(
    `ReferenceError: react is not defined`
  )

  result.rerender(
    <Container sourceCode={`() => <div>hello react-runner</div>`} />
  )
  expect(screen.getByTestId('preview').innerHTML).toBe(
    `<div>hello react-runner</div>`
  )
  expect(screen.queryByTestId('error')).toBeNull()
})

test('transform code', () => {
  render(
    <Container
      sourceCode={`() => <div>hello</div>`}
      transformCode={(code) => code.replace('hello', 'Hellooo')}
    />
  )
  const editor = screen.getByRole<HTMLTextAreaElement>('textbox')

  expect(editor.value).toBe(`() => <div>hello</div>`)
  expect(screen.getByTestId('preview').innerHTML).toBe(`<div>Hellooo</div>`)
  expect(screen.queryByTestId('error')).toBeNull()

  fireEvent.change(editor, {
    target: {
      value: `<div>hello</div><div>react-runner</div>`,
    },
  })

  expect(screen.getByTestId('preview').innerHTML).toBe(
    `<div>Hellooo</div><div>react-runner</div>`
  )
})
