import React from 'react'
import styled from 'styled-components'

import Layout from '../components/Layout'

const Container = styled.div`
  padding: 20px;
  text-align: center;
`

const NotFoundPage = () => (
  <Layout>
    <Container>
      <h1>NOT FOUND</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </Container>
  </Layout>
)

export default NotFoundPage
