import { render } from '@testing-library/react'
import Timetable from './Timetable'

test('Renders', () => {
  const { container } = render(<Timetable>Test</Timetable>)
  expect(container).toMatchSnapshot()
})
