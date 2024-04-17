# React Runner

Run your React code on the go [https://react-runner.vercel.app](https://react-runner.vercel.app)

## Features

- Inline element
- Function component
- Class component, **with class fields support**
- Composing components with `render` or `export default`
- Server Side Rendering
- `import` statement
- [Multi files](https://react-runner.vercel.app/#multi-files)
- Typescript

With React Runner, you can write your live code in the real world way, check out Hacker News [in react-runner](https://react-runner.vercel.app/#hacker-news) vs [in real world](https://react-runner.vercel.app/examples/hacker-news), with the same code

You can even build your own async runner to support dynamic imports, try [Play React](https://play-react.vercel.app)

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
import { Runner } from 'react-runner'

const element = <Runner code={code} scope={scope} onRendered={handleRendered} />
```

or use hook `useRunner` with cache support

```jsx
import { useRunner } from 'react-runner'

const { element, error } = useRunner({ code, scope })
```

### `import` statement and multi files

```js
import { importCode } from 'react-runner'
import * as YourPkg from 'your-pkg'

const baseScope = {
  /* base globals */
}

const scope = {
  ...baseScope,
  // scope used by import statement
  import: {
    constants: { A: 'a' },
    'your-pkg': YourPkg,
    './local-file': importCode(localFileContent, baseScope),
  },
}
```

then in your live code you can import them

```js
import { A } from 'constants'
import Foo, { Bar } from 'your-pkg'
import What, { Ever } from './local-file'

export default function Demo() {
  /* render */
}
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

## Resources

- [Play React](https://play-react.vercel.app/)
- [CodeMirror for React Runner](https://react-runner-codemirror.vercel.app/)
- [Storybook Addon](https://storybook.js.org/addons/storybook-addon-react-runner/)

## react-live-runner

`react-runner` is inspired by [react-live](https://github.com/FormidableLabs/react-live) heavily,
I love it, but I love arrow functions for event handlers instead of bind them manually as well as other modern features,
and I don't want to change my code to be compliant with restrictions, so I created this project,
use [Sucrase](https://github.com/alangpierce/sucrase) instead of [Bublé](https://github.com/bublejs/buble) to transpile the code.

If you are using `react-live` in your project and want a smooth transition, `react-live-runner` is there for you which provide the identical way to play with, and `react-live-runner` re-exports `react-runner` so you can use everything in `react-runner` by importing `react-live-runner`

```jsx
import {
  LiveProvider,
  LiveEditor,
  LiveError,
  LivePreview,
} from 'react-live-runner'

...
<LiveProvider code={code} scope={scope}>
  <LiveEditor />
  <LivePreview />
  <LiveError />
</LiveProvider>
...
```

or hooks for better custom rendering

```jsx
import { useLiveRunner, CodeEditor } from 'react-live-runner'

const { element, error, code, onChange } = useLiveRunner({
  initialCode,
  scope,
  transformCode,
})

...
<>
  <CodeEditor value={code} onChange={onChange} />
  <div>{element}</div>
  {error && <pre>{error}</pre>}
</>
...
```

or use `react-runner` directly

```jsx
import { useState, useEffect } from 'react'
import { useRunner } from 'react-runner'

const [code, onChange] = useState(initialCode)
const { element, error } = useRunner({ code, scope })

useEffect(() => {
  onChange(initialCode)
}, [initialCode])

...
<>
  <textarea value={code} onChange={event => onChange(event.target.value)}>
  <div>{element}</div>
  {error && <pre>{error}</pre>}
</>
...
```

Check the real world usage here https://github.com/nihgwu/react-runner/blob/master/website/src/components/LiveRunner.tsx

## License

MIT © [Neo Nie](https://github.com/nihgwu)
