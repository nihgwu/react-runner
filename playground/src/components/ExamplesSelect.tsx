import { examples } from '../utils/examples'

export const ExampleSelect = (props: any) => {
  return (
    <select
      {...props}
      title="Examples"
      name="examples"
      value={'placeholder'}
      onChange={(event) => {
        const hash = event.target.value
        history.replaceState(history.state, '', `#${hash}`)
        window.dispatchEvent(new HashChangeEvent('hashchange'))
      }}
    >
      <option hidden value="placeholder">
        Select example...
      </option>
      {examples.map((item) => (
        <option key={item.hash} value={item.hash}>
          {item.name}
        </option>
      ))}
    </select>
  )
}
