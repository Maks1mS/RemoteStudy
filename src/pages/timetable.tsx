/* eslint-disable react/jsx-key */
import { NextPage, NextPageContext } from 'next'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import withApollo from '../lib/withApollo'
import { useQuery } from '@apollo/react-hooks'
import { gql, ApolloClient, InMemoryCache } from 'apollo-boost'
import { useTable, useSortBy } from 'react-table'
import Container from '../components/Container'
import Link from 'next/link'
import React from 'react'

const QUERY = gql`
  {
    subjects {
      key
      name
      tasks {
        name
      }
    }
  }
`
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

const NavLink = styled.a`
  display: flex;
  height: 100%;
  align-items: center;
  `

const Main = styled.main`
  grid-area: "main";
  display: grid;
  grid-template-columns: 1fr; 
`

const Row = styled.tr`
  border: solid 1px;
`

const Col = styled.td`
  border: solid 1px;
  font-size: 25px;
`

function Table ({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({
    columns,
    data
  }, useSortBy)

  // Render the UI for your table
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>{
                column.render('Header')}
              <span>
                {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
              </span>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

const Index: NextPage = () => {
  const { loading, data } = useQuery(QUERY)

  const subjectsList = ''
  let subjects = []
  if (loading || !data) {
  } else {
    subjects = data.subjects
  }
  const tableData = React.useMemo(() => subjects.map(v => (
    {
      subject: <Link href={`/subjects/${v.key}`}>{v.name}</Link>,
      tasksCnt: v.tasks.length,
      tasks: v.tasks.map(task => task.name).slice(0, 3).join(',')
    }
  )), [subjects])
  const columns = React.useMemo(() => [
    {
      Header: 'Предмет',
      accessor: 'subject'
    }, {
      Header: 'Кол-во уроков',
      accessor: 'tasksCnt',
      sortType: 'basic'
    }, {
      Header: 'Последние задания',
      accessor: 'tasks'
    }
  ], [])

  return <>
    <Layout>
      <Header>
        <div css={css`
          vertical-align: center;
        `}>
          <Link href="/">
            <NavLink css={css`font-weight: bold; font-size: 30px;`}>Remote Study</NavLink>
          </Link>
        </div>
        <Link href="/timetable">
          <NavLink>Все предметы</NavLink>
        </Link>
      </Header>
      <Main>
        <Container css={css`
          min-height: 100px;
          margin: 10px;
          table {
            width: 100%;
            border: 1px solid black;
            tr {
              :last-child {
                td {
                  border-bottom: 0;
                }
              }
            }
            th, td {
              border-bottom: 1px solid black;
              border-right: 1px solid black;
              :last-child {
                border-right: 0;
              }
            }
          }
        `}>
          <div>
            <h2 css={css`
              font-style: bold;
              font-size: 50px;
            `}>Предметы</h2>
          </div>
          { tableData && <Table columns={columns} data={tableData} /> }
        </Container>
      </Main>
    </Layout>
  </>
}

export default withApollo(Index)
