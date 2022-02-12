import styled from 'styled-components'
import NextLink from 'next/link'

const Container = styled.header`
  background: steelblue;
  color: #fff;
  position: sticky;
  top: 0;
  z-index: 1;
  width: 100%;
  height: 48px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Nav = styled.nav`
  & > :not(:last-child) {
    margin-right: 16px;
  }
`

const Link = styled.a`
  color: #fff;
  text-decoration: none;

  &:hover {
    color: #eee;
  }
`

const Title = styled.h1`
  font-size: 24px;
  margin: 0;
`

export const Header = () => (
  <Container>
    <NextLink href="/" passHref>
      <Link>
        <Title>React Runner</Title>
      </Link>
    </NextLink>
    <Nav>
      <NextLink href="/playground" passHref>
        <Link>Playground</Link>
      </NextLink>
      <Link href="https://github.com/nihgwu/react-runner">Github</Link>
    </Nav>
  </Container>
)
