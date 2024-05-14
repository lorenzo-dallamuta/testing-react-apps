// testing with context and a custom render method
// 💯 add a test for the dark theme
// http://localhost:3000/easy-button
import { expect, test } from 'vitest'
import EasyButton from '@/components/EasyButton'
import { ThemeProvider } from '@/contexts/theme'
import { render, screen } from '@testing-library/react'

test('renders with the light styles for the light theme', () => {
  const Wrapper = ({ children }: React.PropsWithChildren) => (
    <ThemeProvider initialTheme="light">{children}</ThemeProvider>
  )
  render(<EasyButton>Easy</EasyButton>, { wrapper: Wrapper })
  const button = screen.getByRole('button', { name: /easy/i })
  //   expect(button).toHaveStyle(`
  //     background-color: white;
  //     color: black;
  //   `)
  expect(button.style.backgroundColor).toBe('white')
  expect(button.style.color).toBe('black')
})

test('renders with the dark styles for the dark theme', () => {
  const Wrapper = ({ children }: React.PropsWithChildren) => (
    <ThemeProvider initialTheme="dark">{children}</ThemeProvider>
  )
  render(<EasyButton>Easy</EasyButton>, { wrapper: Wrapper })
  const button = screen.getByRole('button', { name: /easy/i })
  //   expect(button).toHaveStyle(`
  //     background-color: black;
  //     color: white;
  //   `)
  expect(button.style.backgroundColor).toBe('black')
  expect(button.style.color).toBe('white')
})
