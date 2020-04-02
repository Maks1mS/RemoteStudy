import { render } from '@testing-library/react'
import MainLayout from './MainLayout'

test('Renders', () => {
  const { container } = render(<MainLayout>Test</MainLayout>)
  expect(container).toMatchSnapshot()
})
