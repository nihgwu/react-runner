import React from 'react'
import { render, screen } from '@testing-library/react'

import { CodeBlock } from '../CodeBlock'

test('default', () => {
  render(<CodeBlock data-testid="block" />)

  expect(screen.getByTestId('block').tagName).toBe('PRE')
})

test('noWrap', () => {
  render(<CodeBlock data-testid="block" noWrap className="foo" />)

  expect(screen.getByTestId('block').style.whiteSpace).toBe('pre')
})
