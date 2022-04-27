import React from 'react'
import { render, screen } from '@testing-library/react'

import { CodeBlock } from '../CodeBlock'

test('default', () => {
  render(<CodeBlock data-testid="block">hello</CodeBlock>)

  expect(screen.getByTestId('block').tagName).toBe('PRE')
})

test('noWrap', () => {
  render(
    <CodeBlock data-testid="block" noWrap className="foo">
      hello
    </CodeBlock>
  )

  expect(screen.getByTestId('block').style.whiteSpace).toBe('pre')
})

test('children', () => {
  render(<CodeBlock data-testid="block">world</CodeBlock>)

  expect(screen.getByTestId('block').textContent).toBe('world\n')
})
