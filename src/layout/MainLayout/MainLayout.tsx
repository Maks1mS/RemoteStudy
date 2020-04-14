import { css } from '@emotion/core'
import styled from '@emotion/styled'
import Link from 'next/link'

const Layout = styled.div`
  display: grid;
  height: 100%;
  grid-template-areas: "header" "main";
  grid-template-rows:  50px 1fr;
`

const Header = styled.header`
  grid-area: header;
  height: 50px;
  background: #212529;
  color: #fff;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const Main = styled.main`
  grid-area: main;
  display: grid;
  grid-template-columns: 1fr; 
`

const LogoLink = styled.a`
  display: flex;
  height: 100%;
  padding: 0 10px;
  align-items: center;
  font-weight: bold; 
  font-size: 30px;
`

const NavLink = styled.a`
  display: flex;
  height: 100%;
  padding: 0 10px;
  align-items: center;
  :hover {
    color: #212529;
    background: #fff;
  }
`

const MainLayout: React.FC = ({ children }) => {
  return <Layout>
    <Header>
      <div css={css`
        vertical-align: center;
      `}>
        <Link href="/">
          <LogoLink>Remote Study</LogoLink>
        </Link>
      </div>
      <div css={css`
        vertical-align: center;
        padding: 0 25px;
      `}>
        <Link href="/subjects">
          <NavLink>Все предметы</NavLink>
        </Link>
      </div>
    </Header>
    <Main>
      {children}
    </Main>
  </Layout>
}

export default MainLayout
