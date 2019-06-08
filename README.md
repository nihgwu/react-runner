# react-runner

Run your React code on the air [https://nihgwu.github.io/react-runner/](https://nihgwu.github.io/react-runner/)

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
import Runnder from 'react-runner'

// pseudo code
render(
  <Runner code={code} scope={scope} type={type}>
    {({ element, error }) => (error ? error.toString() : element)}
  </Runner>
)
```

or hooks _(require React 1.6.8 or above)_

```jsx
import { useRunner } from 'react-runner'

const { element, error } = useRunner({ code, scope, type })
```

## License

MIT © [Neo](https://github.com/nihgwu)
