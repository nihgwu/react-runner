import React, { useState, useMemo } from 'react'
import styled from 'styled-components'
import { createRequire, importCode, Runner } from 'react-runner'

import {
  Container,
  EditorContainer,
  Editor,
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
`

const importFiles = (files: Record<string, string>) => {
  const imports = {
    react: React,
  }
  Object.entries(files).forEach(([name, content]) => {
    try {
      const exports = importCode(content, { require: createRequire(imports) })
      imports[name] = exports
      imports[name.replace(/\.[jt]sx?$/, '')] = exports
    } catch (error) {
      throw [name, error]
    }
  })

  return imports
}

export const MultiFilesExample = () => {
  const [appCode, setAppCode] = useState<string>(todoApp)
  const [taskListCode, setTaskListCode] = useState<string>(todoTaskList)
  const [addTaskCode, setAddTaskCode] = useState<string>(todoAddTask)
  const [importsError, setImportsError] = useState<string | null>(null)
  const [renderError, setRenderError] = useState<string | null>(null)
  const [tab, setTab] = useState(0)

  const scope = useMemo(() => {
    try {
      const scope = {
        require: createRequire(
          importFiles({
            './TaskList.js': taskListCode,
            './AddTask.js': addTaskCode,
          })
        ),
      }
      if (importsError) setImportsError(null)
      return scope
    } catch ([name, error]) {
      setImportsError(`[${name.substring(2)}] ${error.toString()}`)
    }
  }, [taskListCode, addTaskCode])

  return (
    <>
      <Container>
        <EditorContainer>
          <Editor hidden={tab !== 0} value={appCode} onChange={setAppCode} />
          <Editor
            hidden={tab !== 1}
            value={addTaskCode}
            onChange={setAddTaskCode}
          />
          <Editor
            hidden={tab !== 2}
            value={taskListCode}
            onChange={setTaskListCode}
          />
        </EditorContainer>
        <PreviewContainer>
          <Preview>
            {importsError ? (
              <Error>{importsError}</Error>
            ) : (
              <Runner
                code={appCode}
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
