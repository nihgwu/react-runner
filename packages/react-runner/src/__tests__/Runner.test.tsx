import React from 'react'
import { create, act, ReactTestRenderer } from 'react-test-renderer'

import { Runner } from '../Runner'
import { RunnerOptions } from '../types'
import * as Utils from '../utils'

const Container = (props: RunnerOptions) => {
  return (
    <Runner {...props}>
      {({ element, error }) => <>{element || error}</>}
    </Runner>
  )
}

test('code', () => {
  const spy = jest.spyOn(Utils, 'compile')
  let instance: ReactTestRenderer

  act(() => {
    instance = create(<Container code="hello" />)
  })
  expect(instance!).toMatchInlineSnapshot(
    `"ReferenceError: hello is not defined"`
  )
  expect(spy).toHaveBeenCalledTimes(1)

  act(() => instance!.update(<Container code="<div>hello</hello>" />))
  expect(instance!).toMatchInlineSnapshot(`
    <div>
      hello
    </div>
  `)
  expect(spy).toHaveBeenCalledTimes(2)

  spy.mockRestore()
})

test('scope', () => {
  const spy = jest.spyOn(Utils, 'compile')
  let instance: ReactTestRenderer

  act(() => {
    instance = create(
      <Container code="<div>hello {value}</div>" scope={{ value: 'react' }} />
    )
  })
  expect(spy).toHaveBeenCalledTimes(1)

  act(() =>
    instance.update(
      <Container
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
      <Container
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

test('handle error', () => {
  const spy = jest.spyOn(console, 'error').mockImplementation(() => {})
  let instance: ReactTestRenderer

  act(() => {
    instance = create(<Container code="() => <div>{value}</div>" />)
  })
  expect(instance!).toMatchInlineSnapshot(
    `"ReferenceError: value is not defined"`
  )

  spy.mockRestore()
})
