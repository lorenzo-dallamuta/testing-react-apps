// testing with context and a custom render method
// 💯 swap @testing-library/react with app test utils
// http://localhost:3000/easy-button
import { expect, test } from 'vitest'
import { screen } from '@testing-library/react'
import EasyButton from '@/components/EasyButton'
import { render } from '@/tests/utils'

test('renders with the light styles for the light theme', () => {
  render(<EasyButton>Easy</EasyButton>, { theme: 'light' })
  const button = screen.getByRole('button', { name: /easy/i })
  //   expect(button).toHaveStyle(`
  //     background-color: white;
  //     color: black;
  //   `)
  expect(button.style.backgroundColor).toBe('white')
  expect(button.style.color).toBe('black')
})

test('renders with the dark styles for the dark theme', () => {
  render(<EasyButton>Easy</EasyButton>, { theme: 'dark' })
  const button = screen.getByRole('button', { name: /easy/i })
  //   expect(button).toHaveStyle(`
  //     background-color: black;
  //     color: white;
  //   `)
  expect(button.style.backgroundColor).toBe('black')
  expect(button.style.color).toBe('white')
})
