// simple test with ReactDOM
// http://localhost:3000/counter
import { act } from 'react'
import { createRoot } from 'react-dom/client'
import { expect, test } from 'vitest'
import Counter from '@/components/Counter'

// NOTE: this is a new requirement in React 18
// https://react.dev/blog/2022/03/08/react-18-upgrade-guide#configuring-your-testing-environment
// Luckily, it's handled for you by React Testing Library :)
declare var global: typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean }
global.IS_REACT_ACT_ENVIRONMENT = true

const clickEvent = new MouseEvent('click', {
  bubbles: true,
  cancelable: true,
  button: 0,
})

test('counter increments and decrements when the buttons are clicked', () => {
  const div = document.createElement('div')
  document.body.appendChild(div)
  const root = createRoot(div)
  act(() => root.render(<Counter />))
  const [decrement, increment] = div.querySelectorAll('button')
  const firstChild = (div.firstChild as HTMLElement)?.querySelector('div')
  expect(firstChild?.textContent).toBe('Current count: 0')
  act(() => increment.dispatchEvent(clickEvent))
  expect(firstChild?.textContent).toBe('Current count: 1')
  act(() => decrement.dispatchEvent(clickEvent))
  expect(firstChild?.textContent).toBe('Current count: 0')
  div.remove()
  // 🦉 If you don't cleanup, then it could impact other tests and/or cause a memory leak
})
