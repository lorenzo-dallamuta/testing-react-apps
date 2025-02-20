// simple test with ReactDOM
// http://localhost:3000/counter
import { act } from 'react'
import { createRoot } from 'react-dom/client'
import { beforeEach, expect, test } from 'vitest'
import Counter from '@/components/Counter'

// NOTE: this is a new requirement in React 18
// https://react.dev/blog/2022/03/08/react-18-upgrade-guide#configuring-your-testing-environment
// Luckily, it's handled for you by React Testing Library :)
declare var global: typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean }
global.IS_REACT_ACT_ENVIRONMENT = true

beforeEach(() => {
  document.body.innerHTML = ''
})

test('counter increments and decrements when the buttons are clicked', () => {
  const div = document.createElement('div')
  document.body.append(div)

  const root = createRoot(div)
  act(() => root.render(<Counter />))
  const [decrement, increment] = div.querySelectorAll('button')
  const message = (div.firstChild as HTMLElement)?.querySelector('div')

  expect(message?.textContent).toBe('Current count: 0')
  act(() => increment.click())
  expect(message?.textContent).toBe('Current count: 1')
  act(() => decrement.click())
  expect(message?.textContent).toBe('Current count: 0')
})
