import { render } from '@testing-library/react'
import News from './News'

test('Renders', () => {
  const { container } = render(<News title="Test"/>)
  expect(container).toMatchSnapshot()
})
