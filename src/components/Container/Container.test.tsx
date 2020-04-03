import { render } from '@testing-library/react'
import Container from './Container'

test('Renders', () => {
  const { container } = render(<Container>Test</Container>)
  expect(container).toMatchSnapshot()
})
