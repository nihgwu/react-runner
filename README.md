# react-runner

Run your React code on the air [https://nihgwu.github.io/react-runner/](https://nihgwu.github.io/react-runner/)

## Features

- Inline element
- Inline elements _require React 16.3 or above_
- Function component
- Class component, will class fields support
- Composing components with `render` or `export default`

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
    {({ element, error }) => (error ? error.toString() : element)}
  </Runner>
)
```

or hooks _(require React 16.8 or above)_

```jsx
import { useRunner } from 'react-runner'

const { element, error } = useRunner({ code, scope, type })
```

## About

This package is inspired by [react-live](https://github.com/FormidableLabs/react-live) heavily,
I love it, but I love arrow functions for event handlers instead of bind them manually as well as other modern features,
and I don't want to change my code to be compliant with restrictions, so I created this project,
use [sucrase](https://github.com/alangpierce/sucrase) instead of [Bublé](https://github.com/bublejs/buble) to transpile the code

## License

MIT © [Neo](https://github.com/nihgwu)
