import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import Counter from '../components/Counter'

test('hello component', () => {
  render(<Counter />)
  expect(screen.getByTestId('counter-text')).toBeTruthy()
})
