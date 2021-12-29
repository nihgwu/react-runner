import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'

import { CodeEditor } from '../CodeEditor'

test('uncontrolled value', () => {
  const handleChange = jest.fn()
  render(<CodeEditor onChange={handleChange} />)
  const editor = screen.getByRole<HTMLTextAreaElement>('textbox')

  fireEvent.change(editor, {
    target: {
      value: `<div>hello</div><div>react-runner</div>`,
    },
  })
  expect(editor.value).toBe(`<div>hello</div><div>react-runner</div>`)
  expect(handleChange).toHaveBeenCalledWith(
    `<div>hello</div><div>react-runner</div>`
  )
})

test('controlled value', () => {
  const handleChange = jest.fn()
  render(<CodeEditor value="" onChange={handleChange} />)
  const editor = screen.getByRole<HTMLTextAreaElement>('textbox')

  fireEvent.change(editor, {
    target: {
      value: `<div>hello</div><div>react-runner</div>`,
    },
  })
  expect(editor.value).toBe(``)
  expect(handleChange).toHaveBeenCalledWith(
    `<div>hello</div><div>react-runner</div>`
  )
})

test('controlled code', () => {
  const handleChange = jest.fn()
  render(<CodeEditor code="" onChange={handleChange} />)
  const editor = screen.getByRole<HTMLTextAreaElement>('textbox')

  fireEvent.change(editor, {
    target: {
      value: `<div>hello</div><div>react-runner</div>`,
    },
  })
  expect(editor.value).toBe(``)
  expect(handleChange).toHaveBeenCalledWith(
    `<div>hello</div><div>react-runner</div>`
  )
})
