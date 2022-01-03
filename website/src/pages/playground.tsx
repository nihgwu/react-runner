import React, { useCallback, useEffect, useReducer, useState } from 'react'
import styled, { css } from 'styled-components'
import { useRunner } from 'react-live-runner'

import {
  Editor,
  EditorContainer,
  Preview,
  PreviewContainer,
  Error,
  transformCode,
} from '../components/LiveRunner'
import { getCode, replaceState } from '../utils/urlHash'
import { scope } from '../constants'

// @ts-ignore
import sampleCode from '!!raw-loader!./examples/hacker-news.tsx'

const Container = styled.div`
  position: relative;
  display: flex;
  box-shadow: 0 0 8px 0 lightsteelblue;
  overflow: hidden;
  margin: 16px;
  height: calc(100vh - 80px);

  @media (max-width: 960px) {
    flex-direction: column-reverse;
  }
`

const Playground = () => {
  const [code, setCode] = useState('')
  const { element, error } = useRunner({
    code: transformCode(code),
    scope,
  })
  const handleChange = useCallback((code) => {
    setCode(code)
    replaceState(code)
  }, [])

  // to clear editing history
  const [editorKey, resetEditor] = useReducer((state: number) => state + 1, 0)
  useEffect(() => {
    setCode(getCode(sampleCode))
    resetEditor()

    const reset = () => {
      setCode(sampleCode)
      resetEditor()
    }
    window.addEventListener('playground', reset)
    return () => window.removeEventListener('playground', reset)
  }, [])

  return (
    <Container>
      <EditorContainer>
        <Editor
          key={editorKey}
          value={code}
          language="tsx"
          padding={16}
          onChange={handleChange}
        />
      </EditorContainer>
      <PreviewContainer>
        <Preview>{element}</Preview>
        {error && <Error>{error}</Error>}
      </PreviewContainer>
    </Container>
  )
}

export default Playground
