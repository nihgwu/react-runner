import { useEffect, useReducer, useState } from 'react'
import styled from 'styled-components'
import { useAsyncRunner } from 'react-live-runner'

import {
  Editor,
  EditorContainer,
  Preview,
  PreviewContainer,
  Error,
} from '../components/LiveRunner'
import { getHashCode, updateHash } from '../utils/urlHash'

// @ts-ignore
import sampleCode from '!!raw-loader!./examples/dynamic-imports.tsx'

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

export const transformCode = (code: string) =>
  code.replace(/^import ([^']*) from 'react'/gm, 'const $1 = React')

const Playground = () => {
  const [code, onChange] = useState('')
  const { element, error } = useAsyncRunner({
    code: transformCode(code),
  })

  // reset to clear editing history
  const [editorKey, resetEditor] = useReducer((state: number) => state + 1, 0)

  const hashCode = getHashCode()
  useEffect(() => {
    if (hashCode !== undefined) {
      onChange(getHashCode())
      resetEditor()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (hashCode === undefined) {
      onChange(sampleCode)
      resetEditor()
    }
    updateHash(code)
  })
  return (
    <Container>
      <EditorContainer>
        <Editor
          key={editorKey}
          value={code}
          language="tsx"
          padding={16}
          onChange={onChange}
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
