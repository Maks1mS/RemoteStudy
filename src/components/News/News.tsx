import styled from '@emotion/styled'

const Container = styled.div`
  background: white;
  font-family: 'Roboto';
  border-radius: 5px;
`
type Props = {
  title: string
}

const News: React.FC<Props> = ({ title }) => {
  return <Container><h2>{title}</h2></Container>
}

export default News
