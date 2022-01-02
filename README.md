# react-runner

Run your React code on the go [https://nihgwu.github.io/react-runner/](https://nihgwu.github.io/react-runner/)

## Features

- Inline element(s)
- Function component
- Class component, **with class fields support**
- Composing components with `render` or `export default`
- Support `Typescript`
- Server Side Rendering

Hacker News [in react-runner](https://nihgwu.github.io/react-runner/#hacker-news) vs [in real world](https://nihgwu.github.io/react-runner/hacker-news), with the same code

## Install

```bash
# Yarn
yarn add react-runner

# NPM
npm install --save react-runner
```

## Options

- **code** `string`, _required_ the code to be ran
- **scope** `object` globals that could be used in `code`

## Usage

```jsx
import { useRunner } from 'react-runner'

const { element, error } = useRunner({ code, scope })
```

or use `Runner` as a component directly and handle error with `onRendered`

```jsx
import { Runner } from 'react-runner'

const element = <Runner code={code} scope={scope} onRendered={handleRendered} />
```

## Browser support

```
"browserslist": [
  "Chrome > 61",
  "Edge > 16",
  "Firefox > 60",
  "Safari > 10.1"
]
```

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

...
<LiveProvider code={code}>
  <LiveEditor />
  <LiveError />
  <LivePreview />
</LiveProvider>
...
```

or you can use render props

```jsx
import LiveRunner, { CodeEditor } from 'react-live-runner'

...
<LiveRunner sourceCode={sourceCode} scope={scope}>
  {({element, error, code, onChange }) => (
    <div>
      <CodeEditor code={code} onChange={onChange} />
      {error ? error : element)}
    </div>
  )}
</LiveRunner>
...
```

or hooks for better custom rendering

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
const { element, error } = useRunner({ code, scope })

useEffect(() => {
  onChange(sourceCode)
}, [sourceCode])
```

See the real world usage here https://github.com/nihgwu/react-runner/blob/master/website/src/components/LiveRunner.js

## License

MIT © [Neo Nie](https://github.com/nihgwu)
