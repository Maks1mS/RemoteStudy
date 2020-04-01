import styled from '@emotion/styled'

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

const MainLayout: React.FC = ({ children }) => {
  return <Layout>
    <Header>

    </Header>
    <Main>
      {children}
    </Main>
  </Layout>
}

export default MainLayout
