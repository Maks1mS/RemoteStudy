import styled from '@emotion/styled'

const Container = styled.div`
  background: white;
  min-height: 50px;
  border-radius: 5px;
`

const Timetable: React.FC = ({ children }) => <div>
  {children}
</div>

export default Timetable
