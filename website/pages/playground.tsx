import React, { useCallback, useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import { useLiveRunner } from 'react-live-runner'

import {
  Editor,
  EditorContainer,
  Preview,
  PreviewContainer,
  Error,
  transformCode,
} from '../components/LiveRunner'
import { getCode, replaceState } from '../utils/urlHash'

// @ts-ignore
import sampleCode from '!!raw-loader!./examples/hacker-news.tsx'

const scope = { styled, css }

const Container = styled.div`
  position: relative;
  display: flex;
  box-shadow: 0 0 8px 0 lightsteelblue;
  overflow: hidden;
  margin: 24px;
  height: calc(100vh - 96px);
`

const Playground = () => {
  const [sourceCode, setSourceCode] = useState('')
  const { element, error, onChange } = useLiveRunner({
    sourceCode,
    scope,
    transformCode,
  })
  const handleChange = useCallback(
    (code) => {
      onChange(code)
      replaceState(code)
    },
    [onChange]
  )

  useEffect(() => {
    setSourceCode(getCode(sampleCode))
  }, [])

  return (
    <Container>
      <EditorContainer>
        <Editor
          key={sourceCode}
          defaultValue={sourceCode}
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
