import styled from 'styled-components'

const Container = styled.header`
  background: steelblue;
  color: #fff;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
`

const Nav = styled.nav`
  max-width: 960px;
  height: 50px;
  margin: auto;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 600px) {
    padding: 0 10px;
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
  margin: 10px 0;
`

const Header = () => (
  <Container>
    <Nav>
      <Link href="/">
        <Title>react-runner</Title>
      </Link>
      <Link href="https://github.com/nihgwu/react-runner">Github</Link>
    </Nav>
  </Container>
)

export default Header
