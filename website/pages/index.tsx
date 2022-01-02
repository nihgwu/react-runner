import { Fragment } from 'react'
import styled, { css } from 'styled-components'

import { Layout } from '../components/Layout'
import { UseRunner as LiveRunner } from '../components/LiveRunner'
import { examples } from '../examples'

const Title = styled.h3`
  color: steelblue;
`

const Description = styled.div`
  color: steelblue;
`

const scope = { styled, css }

const Page = () => (
  <Layout>
    <Description>Run your React code on the go, in different ways</Description>
    {examples.map(({ key, title, code }) => (
      <Fragment key={key}>
        <Title id={key}>{title}</Title>
        <LiveRunner code={code} scope={scope} language="tsx" />
      </Fragment>
    ))}
  </Layout>
)

export default Page
