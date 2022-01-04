import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'

import { LiveProvider, LiveEditor, LiveError, LivePreview } from '..'

test('default', () => {
  render(
    <LiveProvider>
      <LivePreview data-testid="preview" />
    </LiveProvider>
  )

  expect(screen.getByTestId('preview')).toBeDefined()
})

test('edit', () => {
  const result = render(
    <LiveProvider code={`() => <div>hello</div>`}>
      <LiveEditor />
      <LivePreview data-testid="preview" />
      <LiveError data-testid="error" />
    </LiveProvider>
  )
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

  expect(screen.getByTestId('preview').innerHTML).toBe(
    `<div>hello</div><div>react-runner</div>`
  )
  expect(screen.getByTestId('error').innerHTML).toBe(
    `ReferenceError: react is not defined`
  )

  result.rerender(
    <LiveProvider code={`() => <div>hello react-runner</div>`}>
      <LiveEditor />
      <LiveError data-testid="error" />
      <LivePreview data-testid="preview" />
    </LiveProvider>
  )
  expect(screen.getByTestId('preview').innerHTML).toBe(
    `<div>hello react-runner</div>`
  )
  expect(screen.queryByTestId('error')).toBeNull()
})

test('disableCache', () => {
  const result = render(
    <LiveProvider code={`() => <div>hello</div>`} disableCache>
      <LiveEditor />
      <LiveError data-testid="error" />
      <LivePreview data-testid="preview" />
    </LiveProvider>
  )
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
    <LiveProvider code={`() => <div>hello react-runner</div>`}>
      <LiveEditor />
      <LiveError data-testid="error" />
      <LivePreview data-testid="preview" />
    </LiveProvider>
  )
  expect(screen.getByTestId('preview').innerHTML).toBe(
    `<div>hello react-runner</div>`
  )
  expect(screen.queryByTestId('error')).toBeNull()
})

test('transform code', () => {
  render(
    <LiveProvider
      code={`() => <div>hello</div>`}
      transformCode={(code) => code.replace('hello', 'Hellooo')}
    >
      <LiveEditor />
      <LiveError data-testid="error" />
      <LivePreview data-testid="preview" />
    </LiveProvider>
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
