import React, { useState } from 'react'
import styled from 'styled-components'
import { useRunner } from 'react-runner'
import { CodeEditor } from 'react-live-runner'

const Container = styled.div`
  display: flex;
  box-shadow: 0 0 8px 0 lightsteelblue;
  height: 250px;
  overflow: hidden;
`

const EditorContainer = styled.div`
  flex: 1;
  overflow: auto;
`

const Editor = styled(CodeEditor)`
  white-space: pre;
  font-family: monospace;
  background: #222;
  caret-color: #fff;
  min-width: 100%;
  min-height: 100%;
  float: left;

  & > textarea,
  & > pre {
    outline: none;
    white-space: pre !important;
  }
`

const Preview = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
`

const Element = styled.div`
  text-align: center;
`

const Error = styled.div`
  background: #fcc;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding: 10px;
  color: #f00;
  overflow-y: auto;
`

const LiveRunner = ({ code: _code, scope, type, transformCode }) => {
  const [code, setCode] = useState(_code.trim())
  const { element, error } = useRunner({ code, scope })

  return (
    <Container>
      <EditorContainer>
        <Editor code={code} language="jsx" onChange={setCode} />
      </EditorContainer>
      <Preview>
        {error ? (
          <Error>{error.toString()}</Error>
        ) : (
          <Element>{element}</Element>
        )}
      </Preview>
    </Container>
  )
}

export default LiveRunner
