// Avoid implementation details
// http://localhost:3000/counter
import * as React from 'react'
import { expect, test } from 'vitest'
import Counter from '@/components/Counter'
// 🐨 add `screen` to the import here:
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

test('counter increments and decrements when the buttons are clicked', async () => {
  render(<Counter />)
  // 🐨 replace these with screen queries
  // 💰 you can use `getByText` for each of these (`getByRole` can work for the button too)
  const decrement = screen.getByRole('button', { name: 'Decrement' })
  const increment = screen.getByRole('button', { name: 'Increment' })
  const message = screen.getByTestId('counter-text')

  expect(message).toHaveTextContent('Current count: 0')
  await userEvent.click(increment)
  expect(message).toHaveTextContent('Current count: 1')
  await userEvent.click(decrement)
  expect(message).toHaveTextContent('Current count: 0')
})
