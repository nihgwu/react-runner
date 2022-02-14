import { useState } from 'react'

import { CodeMirror } from '../../src/CodeMirror'
import { LiveRunner } from './LiveRunner'
import './App.css'

const appCode = `import { Counter } from './Counter.tsx'

export default function App() {
  return <Counter />
}`

const counterCode = `import {useState} from 'react'

export function Counter() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>{count}</div>
      <button onClick={() => setCount(count => count + 1)}>+</button>
      <button onClick={() => setCount(count => count - 1)}>-</button>
    </>
  )
}`

function App() {
  const [config, setConfig] = useState({
    theme: 'dark' as 'dark' | 'light',
    padding: 10,
    readOnly: false,
    showLineNumbers: false,
    wrapLine: false,
  })
  const [files, setFiles] = useState([
    {
      filename: 'App.tsx',
      code: appCode,
    },
    {
      filename: 'Counter.tsx',
      code: counterCode,
    },
  ])
  const [current, setCurrent] = useState(0)
  const currentFile = files[current]
  return (
    <div className="App">
      <h1>
        <a href="https://github.com/nihgwu/react-runner">
          react-runner-codemirror
        </a>
      </h1>
      <p>React wrapper of CodeMirror6 for React code editing</p>
      <LiveRunner files={files} />
      <div className="Tabs">
        {files.map((file, idx) => (
          <button
            key={file.filename}
            aria-selected={idx === current}
            onClick={() => setCurrent(idx)}
          >
            {file.filename}
            {idx > 0 && (
              <>
                <span
                  className="delete"
                  onClick={(event) => {
                    event.stopPropagation()
                    setCurrent(current > 0 ? current - 1 : 0)
                    setFiles(files.filter((x) => x.filename !== file.filename))
                  }}
                >
                  x
                </span>
              </>
            )}
          </button>
        ))}
        <button
          onClick={() => {
            let filename = window.prompt('Filename')
            if (!filename) return
            if (filename.indexOf('.') < 0) filename += '.js'
            if (files.some((x) => x.filename === filename)) {
              window.alert(`${filename} already exists`)
              return
            }
            setFiles([...files, { filename, code: '' }])
            setCurrent(files.length)
          }}
        >
          +
        </button>
      </div>
      <CodeMirror
        className="CodeMirror"
        value={currentFile.code}
        filename={currentFile.filename}
        onChange={(newCode) => {
          const newFiles = [...files]
          newFiles[current] = { ...currentFile, code: newCode }
          setFiles(newFiles)
        }}
        {...config}
      />
      <div className="Bar">
        <label>
          <input
            type="checkbox"
            checked={config.theme === 'light'}
            onChange={(event) =>
              setConfig({
                ...config,
                theme: event.currentTarget.checked ? 'light' : 'dark',
              })
            }
          />
          light
        </label>
        <label>
          <input
            type="number"
            value={config.padding}
            onChange={(event) =>
              setConfig({
                ...config,
                padding: Number(event.currentTarget.value),
              })
            }
          />
          padding
        </label>
        <label>
          <input
            type="checkbox"
            checked={config.readOnly}
            onChange={(event) =>
              setConfig({
                ...config,
                readOnly: event.currentTarget.checked,
              })
            }
          />
          readOnly
        </label>
        <label>
          <input
            type="checkbox"
            checked={config.showLineNumbers}
            onChange={(event) =>
              setConfig({
                ...config,
                showLineNumbers: event.currentTarget.checked,
              })
            }
          />
          showLineNumbers
        </label>
        <label>
          <input
            type="checkbox"
            checked={config.wrapLine}
            onChange={(event) =>
              setConfig({
                ...config,
                wrapLine: event.currentTarget.checked,
              })
            }
          />
          wrapLine
        </label>
      </div>
    </div>
  )
}

export default App
