import {
  LiveProvider,
  LiveEditor,
  LivePreview,
  LiveError,
} from 'react-live-runner'
import logo from './logo.svg';
import './App.css';

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
        <LiveProvider code={example}>
          <LiveEditor />
          <LivePreview />
          <LiveError />
        </LiveProvider>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
