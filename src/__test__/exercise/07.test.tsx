// testing with context and a custom render method
// http://localhost:3000/easy-button
import * as React from 'react'
import { expect, test } from 'vitest'
import EasyButton from '@/components/EasyButton'
// import { ThemeProvider } from '@/contexts/theme'
import { render } from '@/tests/utils'
import {
  //   RenderOptions,
  //   render as rtlRender,
  screen,
} from '@testing-library/react'

// function render(
//   ui: React.ReactNode,
//   options?: Omit<RenderOptions, 'queries'> & { theme: 'light' | 'dark' },
// ) {
//   const wrapper = ({ children }: React.PropsWithChildren) => (
//     <ThemeProvider initialTheme={options?.theme ?? 'light'}>
//       {children}
//     </ThemeProvider>
//   )
//   // return rtlRender(ui, Object.assign(options, {wrapper}))
//   return rtlRender(ui, { wrapper, ...options }) // leave the 'wrapper' option available to the user
// }

test('renders with the light styles for the light theme', () => {
  // 🐨 uncomment all of this code and your test will be busted on the next line:
  render(<EasyButton>Easy</EasyButton>)
  const button = screen.getByRole('button', { name: /easy/i })
  //   expect(button).toHaveStyle(`
  //     background-color: white;
  //     color: black;
  //   `)
  expect(button.style.backgroundColor).toBe('white')
  expect(button.style.color).toBe('black')
  // 🐨 update the `render` call above to use the wrapper option using the
  // ThemeProvider
})

test('renders with the light styles for the dark theme', () => {
  render(<EasyButton>Easy</EasyButton>, { theme: 'dark' })
  const button = screen.getByRole('button', { name: /easy/i })
  //   expect(button).toHaveStyle(`
  //     background-color: black;
  //     color: white;
  //   `)
  expect(button.style.backgroundColor).toBe('black')
  expect(button.style.color).toBe('white')
})
