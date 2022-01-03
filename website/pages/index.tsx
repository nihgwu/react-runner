import { Fragment } from 'react'
import styled, { css } from 'styled-components'

import { UseRunner as LiveRunner } from '../components/LiveRunner'
import { examples } from '../examples'

const Container = styled.div`
  max-width: 1024px;
  margin: 0 auto;
  padding: 24px 16px;
`

const Title = styled.h3`
  color: steelblue;
`

const Description = styled.div`
  color: steelblue;
`

const scope = { styled, css }

const Page = () => (
  <Container>
    <Description>Run your React code on the go, in different ways</Description>
    {examples.map(({ key, title, code }) => (
      <Fragment key={key}>
        <Title id={key}>{title}</Title>
        <LiveRunner code={code} scope={scope} language="tsx" />
      </Fragment>
    ))}
  </Container>
)

export default Page
