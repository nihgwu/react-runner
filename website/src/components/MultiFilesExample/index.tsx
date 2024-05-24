import React, { useState, useMemo } from 'react'
import styled from 'styled-components'
import { importCode, Runner, Scope } from 'react-runner'

import {
  Container,
  CodeMirror,
  PreviewContainer,
  Preview,
  PreviewError,
} from '../LiveRunner'

// @ts-ignore
import todoApp from '!!raw-loader!./App.js'
// @ts-ignore
import todoAddTask from '!!raw-loader!./AddTask.js'
// @ts-ignore
import todoTaskList from '!!raw-loader!./TaskList.js'

const Tab = styled.div`
  display: inline-block;
  color: ${(props) => (props['aria-current'] ? 'steelblue' : 'gray')};
  padding: 4px;
  cursor: pointer;
`

const withFiles = (scope: Scope, files: Record<string, string>) => {
  const imports: Scope = { ...scope.import }
  const lookup = new Set<string>()
  const importsProxy = new Proxy(imports, {
    getOwnPropertyDescriptor(target, prop) {
      if (target.hasOwnProperty(prop)) {
        return Object.getOwnPropertyDescriptor(target, prop)
      }
      if (files.hasOwnProperty(prop)) {
        return { writable: true, enumerable: true, configurable: true }
      }
    },
    get(target, prop: string) {
      if (prop in target) return target[prop]
      if (files.hasOwnProperty(prop)) {
        if (lookup.has(prop)) {
          throw new Error(
            `Circular dependency detected: ${[...lookup, prop].join(' -> ')}`
          )
        }
        lookup.add(prop)
        return (target[prop] = importCode(files[prop], {
          ...scope,
          import: importsProxy,
        }))
      }
    },
  })

  Object.keys(files).forEach((file) => {
    try {
      imports[file] = importsProxy[file]
      lookup.clear()
    } catch (error) {
      error.filename = file
      throw error
    }
  })

  return { ...scope, import: imports }
}

const baseScope = {
  import: {
    react: React,
  },
}

const defaultCode = `
export default function App(){return null}
`

export const MultiFilesExample = () => {
  const [codes, setCodes] = useState<string[]>([
    todoApp,
    todoAddTask,
    todoTaskList,
  ])
  const [importsError, setImportsError] = useState<string | null>(null)
  const [renderError, setRenderError] = useState<string | null>(null)
  const [tab, setTab] = useState(0)
  const [readied, setReadied] = useState(false)
  const scope = useMemo(() => {
    try {
      if (readied) {
        const scope = withFiles(baseScope, {
          './AddTask.js': codes[1],
          './TaskList.js': codes[2],
        })
        if (importsError) setImportsError(null)
        return scope
      }
      return baseScope
    } catch (error) {
      setImportsError(
        `${error.filename ? `[${error.filename}] ` : ''}${error.toString()}`
      )
    }
  }, [codes, importsError, readied])

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
              <PreviewError>{importsError}</PreviewError>
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
                  setReadied(true)
                }}
              />
            )}
          </Preview>
          {renderError && <PreviewError>{renderError}</PreviewError>}
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
