import { expect, test } from 'vitest'
import Counter from '@/components/Counter'
import { render, screen } from '@testing-library/react'

test('hello component', () => {
  render(<Counter />)
  expect(screen.getByTestId('counter-text')).toBeTruthy()
})
