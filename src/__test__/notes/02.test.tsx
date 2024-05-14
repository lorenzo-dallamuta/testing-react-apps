// simple test with React Testing Library
// http://localhost:3000/counter
import { expect, test } from 'vitest'
import { fireEvent, render } from '@testing-library/react'
import Counter from '@/components/Counter'

// 💣 so you can now delete this!
// global.IS_REACT_ACT_ENVIRONMENT = true

// 💣 remove this. React Testing Library does this automatically!
// beforeEach(() => {
//   document.body.innerHTML = ''
// })

test('counter increments and decrements when the buttons are clicked', () => {
  // 💣 remove these two lines, React Testing Library will create the div for you
  // const div = document.createElement('div')
  // document.body.append(div)

  // 🐨 swap createRoot and root.render with React Testing Library's render
  const { container } = render(<Counter />)

  // 🐨 instead of `div` here you'll want to use the `container` you get back
  // from React Testing Library
  const [decrement, increment] = container.querySelectorAll('button')
  const message = (container.firstChild as HTMLElement)?.querySelector('div')
  expect(message).toHaveTextContent('Current count: 0')

  // 🐨 replace the next two statements with `fireEvent.click(button)`
  // 💰 note that you can remove `act` completely!
  fireEvent.click(increment)
  expect(message).toHaveTextContent('Current count: 1')
  fireEvent.click(decrement)
  expect(message).toHaveTextContent('Current count: 0')
})
