# react-runner

Run your React code on the go [https://nihgwu.github.io/react-runner/](https://nihgwu.github.io/react-runner/)

## Features

- Inline element
- Inline elements _require React 16.3 or above_
- Function component
- Class component, **with class fields support**
- Composing components with `render` or `export default`
- Support `typescript` or `flow`

## Install

```bash
# Yarn
yarn add react-runner

# NPM
npm install --save react-runner
```

## Props

- **children** `function({ element, error })`, _required_ render props
- **code** `string`, _required_ the code to be ran
- **scope** `object` globals that could be used in `code`
- **type** `string` the type system of the code, code be `typescript` or `flow`

## Usage

```jsx
import Runner from 'react-runner'

// pseudo code
render(
  <Runner code={code} scope={scope} type={type}>
    {({ element, error }) => (error ? error : element)}
  </Runner>
)
```

or hooks _(require React 16.8 or above)_

```jsx
import { useRunner } from 'react-runner'

const { element, error } = useRunner({ code, scope, type })
```

## Caveats

As Sucrase transpiles your code to work in modern JS runtime only, so your code would not work on IE, depending on the features you used. If you want to work with old browsers, use [react-runner-buble](https://github.com/nihgwu/react-runner/tree/master/packages/react-runner-buble) instead.

## react-live-runner

`react-runner` is inspired by [react-live](https://github.com/FormidableLabs/react-live) heavily,
I love it, but I love arrow functions for event handlers instead of bind them manually as well as other modern features,
and I don't want to change my code to be compliant with restrictions, so I created this project,
use [Sucrase](https://github.com/alangpierce/sucrase) instead of [Bublé](https://github.com/bublejs/buble) to transpile the code.

If you are using `react-live` in your project and want a smooth transition, `react-live-runner` is there for you which provide the identical way to play with:

```jsx
import {
  LiveProvider,
  LiveEditor,
  LiveError,
  LivePreview,
} from 'react-live-runner'

// pseudo code
render(
  <LiveProvider code={code}>
    <LiveEditor />
    <LiveError />
    <LivePreview />
  </LiveProvider>
)
```

or you can use render props

```jsx
import LiveRunner, { CodeEditor } from 'react-live-runner'

// pseudo code
render(
  <LiveRunner sourceCode={sourceCode} scope={scope} type={type}>
    {({element, error, code, onChange }) => (
      <div>
        <CodeEditor code={code} onChange={onChange} />
        {error ? error : element)}
      </div>
    )}
  </LiveRunner>
)
```

or hooks _(require React 16.8 or above)_

```jsx
import { useLiveRunner } from 'react-live-runner'

const { element, error, code, onChange } = useLiveRunner({
  sourceCode,
  scope,
  type,
})
```

or use `react-runner` directly

```jsx
import { useState, useEffect } from 'react'
import { useRunner } from 'react-runner'

const [code, onChange] = useState(sourceCode)
const { element, error } = useRunner({ code, scope, type })

useEffect(() => {
  onChange(sourceCode)
}, [sourceCode])
```

See the real world usage here https://github.com/nihgwu/react-runner/blob/master/website/src/components/LiveRunner.js

## License

MIT © [Neo Nie](https://github.com/nihgwu)
