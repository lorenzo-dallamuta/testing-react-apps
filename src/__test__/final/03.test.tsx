// Avoid implementation details
// http://localhost:3000/counter
import * as React from 'react'
import { expect, test } from 'vitest'
import Counter from '@/components/Counter'
import { fireEvent, render, screen } from '@testing-library/react'

test('counter increments and decrements when the buttons are clicked', () => {
  render(<Counter />)
  const increment = screen.getByRole('button', { name: /increment/i })
  const decrement = screen.getByRole('button', { name: /decrement/i })
  const message = screen.getByText(/current count/i)

  expect(message).toHaveTextContent('Current count: 0')
  fireEvent.click(increment)
  expect(message).toHaveTextContent('Current count: 1')
  fireEvent.click(decrement)
  expect(message).toHaveTextContent('Current count: 0')
})
