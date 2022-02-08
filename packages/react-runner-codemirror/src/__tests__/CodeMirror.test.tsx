import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'

import { CodeMirror } from '../CodeMirror'

test('render', () => {
  const { container } = render(
    <CodeMirror value={`<div>hello</div><div>react-runner</div>`} />
  )
  expect(container.textContent).toMatchInlineSnapshot(
    `"<div>hello</div><div>react-runner</div>"`
  )
})
