// simple test with React Testing Library
// http://localhost:3000/counter
import { expect, test } from 'vitest'
import { fireEvent, render } from '@testing-library/react'
import Counter from '@/components/Counter'

test('counter increments and decrements when the buttons are clicked', () => {
  const { container } = render(<Counter />)
  const [decrement, increment] = container.querySelectorAll('button')
  const message = (container.firstChild as HTMLElement)?.querySelector('div')

  expect(message?.textContent).toBe('Current count: 0')
  fireEvent.click(increment)
  expect(message?.textContent).toBe('Current count: 1')
  fireEvent.click(decrement)
  expect(message?.textContent).toBe('Current count: 0')
})
