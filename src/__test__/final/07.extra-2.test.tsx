// testing with context and a custom render method
// 💯 create a custom render method
// http://localhost:3000/easy-button
import { expect, test } from 'vitest'
import { RenderOptions, render, screen } from '@testing-library/react'
import EasyButton from '@/components/EasyButton'
import { ThemeProvider } from '@/contexts/theme'

function renderWithProviders(
  ui: React.ReactNode,
  {
    theme = 'light',
    ...options
  }: Omit<RenderOptions, 'queries'> & { theme?: 'light' | 'dark' } = {},
) {
  const Wrapper = ({ children }: React.PropsWithChildren) => (
    <ThemeProvider initialTheme={theme}>{children}</ThemeProvider>
  )
  return render(ui, { wrapper: Wrapper, ...options })
}

test('renders with the light styles for the light theme', () => {
  renderWithProviders(<EasyButton>Easy</EasyButton>)
  const button = screen.getByRole('button', { name: /easy/i })
  //   expect(button).toHaveStyle(`
  //     background-color: white;
  //     color: black;
  //   `)
  expect(button.style.backgroundColor).toBe('white')
  expect(button.style.color).toBe('black')
})

test('renders with the dark styles for the dark theme', () => {
  renderWithProviders(<EasyButton>Easy</EasyButton>, {
    theme: 'dark',
  })
  const button = screen.getByRole('button', { name: /easy/i })
  //   expect(button).toHaveStyle(`
  //     background-color: black;
  //     color: white;
  //   `)
  expect(button.style.backgroundColor).toBe('black')
  expect(button.style.color).toBe('white')
})
