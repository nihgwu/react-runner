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

const Header = styled.div`
  display: flex;
  overflow: auto;

  & > * {
    flex: 1;
    color: gray;
    margin-bottom: 4px;
  }
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
      <Header>
        <div>AddTask.js</div>
        <div>TaskList.js</div>
      </Header>
      <Container>
        <EditorContainer>
          <Editor value={addTaskCode} onChange={setAddTaskCode} />
        </EditorContainer>
        <EditorContainer>
          <Editor value={taskListCode} onChange={setTaskListCode} />
        </EditorContainer>
      </Container>
      <br />
      <Header>
        <div>Preview</div>
        <div>App.js</div>
      </Header>
      <Container>
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
        <EditorContainer>
          <Editor value={appCode} onChange={setAppCode} />
        </EditorContainer>
      </Container>
    </>
  )
}
