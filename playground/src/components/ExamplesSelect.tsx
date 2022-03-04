import { examples } from '../utils/examples'

export const ExampleSelect = (props: any) => {
  return (
    <select
      {...props}
      name="examples"
      value={'placeholder'}
      onChange={(event) => {
        const hash = event.target.value
        history.replaceState(history.state, '', `#${hash}`)
        window.dispatchEvent(new HashChangeEvent('hashchange'))
      }}
    >
      <option hidden value="placeholder">
        {examples[0].name}
      </option>
      {examples.map((item) => (
        <option key={item.hash} value={item.hash}>
          {item.name}
        </option>
      ))}
    </select>
  )
}
