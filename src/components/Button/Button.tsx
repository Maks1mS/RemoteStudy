import styled from '@emotion/styled'

const Btn = styled.button`
  color: white;
  background: #0351C1;
  border: 0;
  box-shadow: 0;
  border-radius: 5px;
  font-size: 20px;
  padding: 5px 32px;
  :hover {
    background: #0043A4;
  }
  :active {
    background: #002D6D;
  }
`

const Button: React.FC<{} & React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, ...props }) => (
  <Btn {...props}>{children}</Btn>
)

export default Button
