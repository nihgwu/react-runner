import { transform } from '../transform'

test('react component', () => {
  const result = transform(`<div>react-runner</div>`)
  expect(result).toMatchInlineSnapshot(
    `"React.createElement('div', null, \\"react-runner\\")"`
  )
})

test('react component', () => {
  const result = transform(`() => <div>react-runner</div>`)
  expect(result).toMatchInlineSnapshot(
    `"() => React.createElement('div', null, \\"react-runner\\")"`
  )
})

test('react component with typescript', () => {
  const result = transform(
    `(props: { foo?: number }) => <div>react-runner</div>`
  )
  expect(result).toMatchInlineSnapshot(
    `"(props) => React.createElement('div', null, \\"react-runner\\")"`
  )
})
