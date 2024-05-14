// Avoid implementation details
// http://localhost:3000/counter
import { expect, test } from 'vitest'
// 🐨 add `screen` to the import here:
import { fireEvent, render } from '@testing-library/react'
import Counter from '@/components/Counter'

test('counter increments and decrements when the buttons are clicked', () => {
  const { container } = render(<Counter />)
  // 🐨 replace these with screen queries
  // 💰 you can use `getByText` for each of these (`getByRole` can work for the button too)
  const [decrement, increment] = container.querySelectorAll('button')
  const message = (container.firstChild as HTMLElement)?.querySelector('div')

  expect(message).toHaveTextContent('Current count: 0')
  fireEvent.click(increment)
  expect(message).toHaveTextContent('Current count: 1')
  fireEvent.click(decrement)
  expect(message).toHaveTextContent('Current count: 0')
})
