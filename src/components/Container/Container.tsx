import styled from '@emotion/styled'

const Block = styled.div`
  background: white;
  min-height: 50px;
  border-radius: 5px;
  padding: 5px;
`

const Container: React.FC = ({ children, ...props }) => <Block {...props}>{children}</Block>

export default Container
