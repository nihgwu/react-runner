import React from 'react'
import styled from 'styled-components'

const Container = styled.header`
  background: steelblue;
  color: #fff;
`

const Nav = styled.nav`
  height: 50px;
  max-width: 900px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Link = styled.a`
  color: #fff;
  text-decoration: none;

  &:hover {
    color: #eee;
  }
`

const Title = styled.h1`
  margin: 10px 0;
`

const Header = () => (
  <Container>
    <Nav>
      <Link href="https://nihgwu.github.io/react-runner/">
        <Title>react-runner</Title>
      </Link>
      <Link href="https://github.com/nihgwu/react-runner">Github</Link>
    </Nav>
  </Container>
)

export default Header
