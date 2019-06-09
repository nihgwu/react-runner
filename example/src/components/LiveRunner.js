import React from 'react'
import styled from 'styled-components'
import {
  LiveProvider,
  LiveEditor,
  LivePreview,
  LiveError,
} from 'react-live-runner'

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

const Editor = styled(LiveEditor)`
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

const Error = styled(LiveError)`
  background: #fcc;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  margin: 0;
  padding: 10px;
  color: #f00;
  overflow-y: auto;
`

const LiveRunner = props => (
  <LiveProvider {...props}>
    <Container>
      <EditorContainer>
        <Editor />
      </EditorContainer>
      <Preview>
        <LivePreview Component={Element} />
        <Error />
      </Preview>
    </Container>
  </LiveProvider>
)

export default LiveRunner
