import React, { useEffect, useState } from 'react'

export const ExampleSelect = (props: any) => {
  const [examples, setExamples] = useState<{ name: string; hash: string }[]>([])
  useEffect(() => {
    import('../utils/examples').then((m) => setExamples(m.examples)).catch()
  }, [])
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
