import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { css } from '@emotion/core'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import styled from '@emotion/styled'
import MainLayout from '../../layout/MainLayout'
import Container from '../../components/Container'
import withApollo from '../../lib/withApollo'
import Error from 'next/error'
import Button from '../../components/Button'
import PulseLoader from 'react-spinners/PulseLoader'

const QUERY = gql`
  query Query($key: String){
    subject(key: $key) {
      key
      name
      url
      tasks {
        name
      }
    }
  }
`

const CenterLoader = styled.div`
  display: grid;
  justify-content: center;
  align-content: center;
  height: 100%;
`

const Index: NextPage = () => {
  const router = useRouter()
  const { loading, data, error } = useQuery<any, {key: string}>(QUERY, { variables: { key: router.query.name as string } })
  console.log(error)
  if (loading) {
    return <CenterLoader><PulseLoader/></CenterLoader>
  }
  if (error) {
    return <Error statusCode={404} />
  }
  const { subject } = data
  return <MainLayout>
    <Container css={css`
      height: 240px;
      margin: 10px;
    `}>
      <h2 css={css`
        font-style: bold;
        font-size: 50px;
      `}>{subject.name}</h2>
      <Button onClick={() => { window.open(subject.url, '_blank') } }>ОТКРЫТЬ</Button>
      <ul>
        {subject.tasks.map((v, i) => <li key={i}>{v.name}</li>)}
      </ul>
    </Container>
  </MainLayout>
}

export default withApollo(Index)
