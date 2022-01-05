import React from 'react'
import { create, act, ReactTestRenderer } from 'react-test-renderer'

import { Runner } from '../Runner'
import * as Utils from '../utils'

test('code update', () => {
  const onRendered = jest.fn()
  const spy = jest.spyOn(Utils, 'generateElement')
  let instance: ReactTestRenderer

  act(() => {
    instance = create(<Runner code="hello" onRendered={onRendered} />)
  })
  expect(instance!).toMatchInlineSnapshot(`null`)
  expect(onRendered).toHaveBeenCalledTimes(1)
  expect(onRendered).toHaveBeenLastCalledWith(
    'ReferenceError: hello is not defined'
  )
  expect(spy).toHaveBeenCalledTimes(1)

  act(() =>
    instance!.update(
      <Runner code="<div>hello</hello>" onRendered={onRendered} />
    )
  )
  expect(instance!).toMatchInlineSnapshot(`
    <div>
      hello
    </div>
  `)
  expect(onRendered).toHaveBeenCalledTimes(2)
  expect(onRendered).toHaveBeenLastCalledWith(undefined)
  expect(spy).toHaveBeenCalledTimes(2)

  spy.mockRestore()
})

test('scope update', () => {
  const spy = jest.spyOn(Utils, 'generateElement')
  let instance: ReactTestRenderer

  act(() => {
    instance = create(
      <Runner code="<div>hello {value}</div>" scope={{ value: 'react' }} />
    )
  })
  expect(spy).toHaveBeenCalledTimes(1)

  act(() =>
    instance.update(
      <Runner
        code="<div>hello {value}</div>"
        scope={{ value: 'react-runner' }}
      />
    )
  )
  expect(instance!).toMatchInlineSnapshot(`
    <div>
      hello 
      react
    </div>
  `)
  expect(spy).toHaveBeenCalledTimes(1)

  act(() =>
    instance.update(
      <Runner
        code="<div>hello! {value}</div>"
        scope={{ value: 'react-runner' }}
      />
    )
  )
  expect(instance!).toMatchInlineSnapshot(`
    <div>
      hello! 
      react-runner
    </div>
  `)
  expect(spy).toHaveBeenCalledTimes(2)

  spy.mockRestore()
})

test('handle react error', () => {
  const onRendered = jest.fn()
  const spy = jest.spyOn(console, 'error').mockImplementation(() => {})
  let instance: ReactTestRenderer

  act(() => {
    instance = create(
      <Runner code="() => <div>{value}</div>" onRendered={onRendered} />
    )
  })
  expect(instance!).toMatchInlineSnapshot(`null`)
  expect(onRendered).toHaveBeenCalledTimes(1)
  expect(onRendered).toHaveBeenLastCalledWith(
    'ReferenceError: value is not defined'
  )

  spy.mockRestore()
})