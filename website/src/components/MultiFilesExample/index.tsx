import React, { useState, useMemo } from 'react'
import styled from 'styled-components'
import { importCode, Runner } from 'react-runner'

import {
  Container,
  CodeMirror,
  PreviewContainer,
  Preview,
  Error,
} from '../LiveRunner'

// @ts-ignore
import todoApp from '!!raw-loader!./App.js'
// @ts-ignore
import todoTaskList from '!!raw-loader!./TaskList.js'
// @ts-ignore
import todoAddTask from '!!raw-loader!./AddTask.js'

const Tab = styled.div`
  display: inline-block;
  color: ${(props) => (props['aria-current'] ? 'steelblue' : 'gray')};
  padding: 4px;
  cursor: pointer;
`

const importFiles = (files: Record<string, string>) => {
  const imports = {
    react: React,
  }
  Object.entries(files).forEach(([name, content]) => {
    try {
      const exports = importCode(content, { import: imports })
      imports[name] = exports
      imports[name.replace(/\.[jt]sx?$/, '')] = exports
    } catch (error) {
      throw [name, error]
    }
  })

  return imports
}

export const MultiFilesExample = () => {
  const [codes, setCodes] = useState<string[]>([
    todoApp,
    todoAddTask,
    todoTaskList,
  ])
  const [importsError, setImportsError] = useState<string | null>(null)
  const [renderError, setRenderError] = useState<string | null>(null)
  const [tab, setTab] = useState(0)

  const scope = useMemo(() => {
    try {
      const scope = {
        import: importFiles({
          './AddTask.js': codes[1],
          './TaskList.js': codes[2],
        }),
      }
      if (importsError) setImportsError(null)
      return scope
    } catch ([name, error]) {
      setImportsError(`[${name.substring(2)}] ${error.toString()}`)
    }
  }, [codes, importsError])

  return (
    <>
      <Container>
        <CodeMirror
          filename={`${tab}`}
          defaultValue={codes[tab]}
          onChange={(newCode) => {
            const newCodes = [...codes]
            newCodes[tab] = newCode
            setCodes(newCodes)
          }}
        />
        <PreviewContainer>
          <Preview>
            {importsError ? (
              <Error>{importsError}</Error>
            ) : (
              <Runner
                code={codes[0]}
                scope={scope}
                onRendered={(error) => {
                  if (error) {
                    setRenderError(error.toString())
                  } else if (renderError) {
                    setRenderError(null)
                  }
                }}
              />
            )}
          </Preview>
          {renderError && <Error>{renderError}</Error>}
        </PreviewContainer>
      </Container>
      <div>
        {['App.js', 'AddTask.js', 'TaskList.js'].map((item, idx) => (
          <Tab
            key={item}
            aria-current={idx === tab}
            onClick={() => setTab(idx)}
          >
            {item}
          </Tab>
        ))}
      </div>
    </>
  )
}
