// testing with context and a custom render method
// http://localhost:3000/easy-button
import { PropsWithChildren } from 'react'
import { expect, test } from 'vitest'
import EasyButton from '@/components/EasyButton'
import { ThemeProvider } from '@/contexts/theme'
import { render, screen } from '@testing-library/react'

test('renders with the light styles for the light theme', () => {
  const Wrapper = ({ children }: PropsWithChildren) => (
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
