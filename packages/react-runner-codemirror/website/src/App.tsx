import { useState } from 'react'

import { CodeMirror } from '../../src/CodeMirror'
import { LiveRunner } from './LiveRunner'
import { TicTacToe } from './examples'
import './App.css'

function App() {
  const [config, setConfig] = useState({
    theme: 'dark' as 'dark' | 'light',
    padding: 10,
    readOnly: false,
    showLineNumbers: false,
    wrapLine: false,
  })
  const [files, setFiles] = useState(TicTacToe)
  const [current, setCurrent] = useState(0)
  const currentFile = files[current]
  return (
    <div className="App">
      <h1>
        <a href="https://github.com/nihgwu/react-runner/tree/master/packages/react-runner-codemirror">
          react-runner-codemirror
        </a>
      </h1>
      <div>React wrapper of CodeMirror6 for React code editing</div>
      <div>
        Live preview powered by
        <a href="https://github.com/nihgwu/react-runner">React Runner</a>
      </div>
      <LiveRunner files={files} />
      <div className="Tabs">
        {files.map((file, idx) => (
          <button
            key={file.name}
            aria-selected={idx === current}
            onClick={() => setCurrent(idx)}
          >
            {file.name}
            {idx > 0 && (
              <>
                <span
                  className="delete"
                  onClick={(event) => {
                    event.stopPropagation()
                    setCurrent(current > 0 ? current - 1 : 0)
                    setFiles(files.filter((x) => x.name !== file.name))
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
            let name = window.prompt('Filename')
            if (!name) return
            if (name.indexOf('.') < 0) name += '.js'
            if (files.some((x) => x.name === name)) {
              window.alert(`${name} already exists`)
              return
            }
            setFiles([...files, { name, content: '' }])
            setCurrent(files.length)
          }}
        >
          +
        </button>
      </div>
      <CodeMirror
        className="CodeMirror"
        value={currentFile.content}
        filename={currentFile.name}
        onChange={(newCode) => {
          const newFiles = [...files]
          newFiles[current] = { ...currentFile, content: newCode }
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
