import {
  LiveProvider,
  LiveEditor,
  LivePreview,
  LiveError,
} from 'react-live-runner'
import logo from './logo.svg'
import './App.css'

const example = `
export default function Demo() {
  const [count, setCount] = React.useState(0)

  return (
    <button type="button" onClick={() => setCount((count) => count + 1)}>
      count is: {count}
    </button>
  )
}
`.trim()

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React Runner!</p>
        <LiveProvider code={example}>
          <LiveEditor />
          <LivePreview />
          <LiveError />
        </LiveProvider>
        <p>
          Edit <code>App.tsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            className="App-link"
            href="https://react-runner.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React Runner
          </a>
          {' | '}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header>
    </div>
  )
}

export default App
