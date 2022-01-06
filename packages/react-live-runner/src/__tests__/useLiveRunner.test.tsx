import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'

import { useLiveRunner, UseLiveRunnerProps } from '../useLiveRunner'

const Container = (props: UseLiveRunnerProps) => {
  const { element, error, code, setCode } = useLiveRunner(props)

  return (
    <>
      <textarea
        value={code}
        onChange={(event) => setCode(event.target.value)}
      />
      <div data-testid="preview">{element}</div>
      {error && <pre data-testid="error">{error}</pre>}
    </>
  )
}

test('initialCode', () => {
  render(<Container />)
  const editor = screen.getByRole<HTMLTextAreaElement>('textbox')

  expect(screen.getByTestId('preview').innerHTML).toBe('')
  expect(screen.queryByTestId('error')).toBeNull()

  fireEvent.change(editor, {
    target: {
      value: `<div>hello</div><div>react-runner</div>`,
    },
  })

  expect(screen.getByTestId('preview').innerHTML).toBe(
    `<div>hello</div><div>react-runner</div>`
  )
})
