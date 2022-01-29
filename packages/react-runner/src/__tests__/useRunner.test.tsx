import React, { useEffect, useRef } from 'react'
import { create, act, ReactTestRenderer } from 'react-test-renderer'

import { useRunner, UseRunnerProps, UseRunnerReturn } from '../useRunner'

const Container = ({
  onRendered,
  ...props
}: UseRunnerProps & {
  onRendered?: (result: UseRunnerReturn) => void
}) => {
  const result = useRunner(props)

  const onRenderedRef = useRef(onRendered)
  onRenderedRef.current = onRendered
  useEffect(() => {
    onRenderedRef.current?.(result)
  }, [result])

  return result.element
}

const setup = (props: UseRunnerProps) => {
  let instance: ReactTestRenderer
  let result: UseRunnerReturn

  act(() => {
    instance = create(
      <Container
        {...props}
        onRendered={(value) => {
          result = value
        }}
      />
    )
  })

  return {
    instance: instance!,
    result: result!,
    update: (props: UseRunnerProps) => {
      act(() => {
        instance!.update(
          <Container
            {...props}
            onRendered={(value) => {
              result.element = value.element
              result.error = value.error
            }}
          />
        )
      })
    },
  }
}

test('code update', () => {
  const { result, update } = setup({ code: `hello` })
  expect(result.element).toMatchInlineSnapshot(`null`)
  expect(result.error).toBe('ReferenceError: hello is not defined')

  update({ code: `<div>hello</hello>` })
  expect(create(result.element!)).toMatchInlineSnapshot(`
    <div>
      hello
    </div>
  `)
})

test('scope update', () => {
  const { result, update } = setup({
    code: `<div>hello {value}</div>`,
    scope: { value: 'react' },
  })

  expect(create(result.element!)).toMatchInlineSnapshot(`
    <div>
      hello 
      react
    </div>
  `)

  update({
    code: `<div>hello {value}</div>`,
    scope: { value: 'react-runner' },
  })
  expect(create(result.element!)).toMatchInlineSnapshot(`
    <div>
      hello 
      react-runner
    </div>
  `)

  update({
    code: `<div>hello! {value}</div>`,
    scope: { value: 'react-runner' },
  })
  expect(create(result.element!)).toMatchInlineSnapshot(`
    <div>
      hello! 
      react-runner
    </div>
  `)
})

test('cache', () => {
  const spy = jest.spyOn(console, 'error').mockImplementation(() => {})

  const { result, update } = setup({ code: `() => <div>{value}</div>` })

  expect(create(result.element!)).toMatchInlineSnapshot(`null`)
  expect(result.error).toBe('ReferenceError: value is not defined')

  update({ code: `() => <div>hello</div>` })
  expect(create(result.element!)).toMatchInlineSnapshot(`
    <div>
      hello
    </div>
  `)
  expect(result.error).toBeNull()

  update({ code: `() => <div>{hello}</div>` })
  expect(create(result.element!)).toMatchInlineSnapshot(`
    <div>
      hello
    </div>
  `)
  expect(result.error).toBe('ReferenceError: hello is not defined')

  update({ code: `() => <div>react</div>` })
  expect(create(result.element!)).toMatchInlineSnapshot(`
    <div>
      react
    </div>
  `)
  expect(result.error).toBeNull()

  spy.mockRestore()
})

test('disable cache', () => {
  const spy = jest.spyOn(console, 'error').mockImplementation(() => {})

  const { result, update } = setup({
    code: `() => <div>{value}</div>`,
    disableCache: true,
  })

  expect(create(result.element!)).toMatchInlineSnapshot(`null`)
  expect(result.error).toBe('ReferenceError: value is not defined')

  update({ code: `() => <div>hello</div>`, disableCache: true })
  expect(create(result.element!)).toMatchInlineSnapshot(`
    <div>
      hello
    </div>
  `)
  expect(result.error).toBeNull()

  update({ code: `() => <div>{hello}</div>`, disableCache: true })
  expect(create(result.element!)).toMatchInlineSnapshot(`null`)
  expect(result.error).toBe('ReferenceError: hello is not defined')

  update({ code: `() => <div>react</div>`, disableCache: true })
  expect(create(result.element!)).toMatchInlineSnapshot(`
    <div>
      react
    </div>
  `)
  expect(result.error).toBeNull()

  spy.mockRestore()
})

test('toggle cache', () => {
  const spy = jest.spyOn(console, 'error').mockImplementation(() => {})

  const { result, update } = setup({
    code: `() => <div>hello</div>`,
    disableCache: true,
  })

  expect(create(result.element!)).toMatchInlineSnapshot(`
    <div>
      hello
    </div>
  `)
  expect(result.error).toBeNull()

  update({ code: `() => <div>{hello}</div>`, disableCache: true })
  expect(create(result.element!)).toMatchInlineSnapshot(`null`)
  expect(result.error).toBe('ReferenceError: hello is not defined')

  update({ code: `() => <div>{hello}</div>`, disableCache: false })
  expect(create(result.element!)).toMatchInlineSnapshot(`
    <div>
      hello
    </div>
  `)
  expect(result.error).toBe('ReferenceError: hello is not defined')

  update({ code: `() => <div>{hello}</div>`, disableCache: true })
  expect(create(result.element!)).toMatchInlineSnapshot(`null`)
  expect(result.error).toBe('ReferenceError: hello is not defined')

  spy.mockRestore()
})
