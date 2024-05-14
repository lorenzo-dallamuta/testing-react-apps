// testing with context and a custom render method
// http://localhost:3000/easy-button
import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import EasyButton from '@/components/EasyButton'
import { ThemeProvider } from '@/contexts/theme'

test('renders with the light styles for the light theme', () => {
  // 🐨 uncomment all of this code and your test will be busted on the next line:
  // render(<EasyButton>Easy</EasyButton>)
  // const button = screen.getByRole('button', {name: /easy/i})
  // 💰 the toHaveStyle matcher is notoriously fickle, if you find something
  // doesn't work when you think it should try taking a look with screen.debug()
  // // expect(button).toHaveStyle(`
  // //   background-color: white;
  // //   color: black;
  // // `)
  // expect(button.style.backgroundColor).toBe('white')
  // expect(button.style.color).toBe('black')
  //
  // 🐨 update the `render` call above to use the wrapper option using the
  // ThemeProvider
})

/* eslint no-unused-vars:0 */
