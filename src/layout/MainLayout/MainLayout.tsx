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
  grid-area: "header";
  height: 50px;
  background: #212529;
  color: #fff;
  display: flex;
  flex-direction: row;
`

const Main = styled.main`
  grid-area: "main";
  display: grid;
  grid-template-columns: 1fr; 
`

const NavLink = styled.a`
  display: flex;
  height: 100%;
  align-items: center;
`

const MainLayout: React.FC = ({ children }) => {
  return <Layout>
    <Header>
      <div css={css`
        vertical-align: center;
      `}>
        <Link href="/">
          <NavLink css={css`font-weight: bold; font-size: 30px;`}>Remote Study</NavLink>
        </Link>
      </div>
      <Link href="/subjects">
        <NavLink>Все предметы</NavLink>
      </Link>
    </Header>
    <Main>
      {children}
    </Main>
  </Layout>
}

export default MainLayout
