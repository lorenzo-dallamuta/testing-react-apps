// testing custom hooks
// http://localhost:3000/counter-hook
import { expect, test } from 'vitest'
import { act, render, renderHook, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useCounter from '@/hooks/use-counter'

function CounterConsumer() {
  const { count, increment, decrement } = useCounter()
  return (
    <div>
      <div data-testid="counter-text">Current count: {count}</div>
      <button onClick={decrement}>Decrement</button>
      <button onClick={increment}>Increment</button>
    </div>
  )
}

// let count, increment, decrement
// function CounterConsumer() {
//   // 💰 here's how to use the hook:
//   ;({count, increment, decrement} = useCounter())
//   return null
// }

// function setup(props) {
//   // let count, increment, decrement
//   const result = {}
//   function CounterConsumer() {
//     // ;({count, increment, decrement} = useCounter(props))
//     // result.current = useCounter(props)     // NOTE, that the reference contained in the variable 'result' is not changed, but the contained property current is re-assigned
//     Object.assign(result, useCounter(props))  // NOTE, that the reference contained in the variable 'result' is not changed, but its content properties are re-assigned
//     return null
//   }
//   render(<CounterConsumer />)
//   // return {count, increment, decrement}
//   return result                               // NOTE, the whole point is that this thing shouldn't mutate when CounterConsumer is run
// }

test('exposes the count and increment/decrement functions', async () => {
  render(<CounterConsumer />)
  const message = screen.getByTestId('counter-text')
  const decrement = screen.getByRole('button', { name: /decrement/i })
  const increment = screen.getByRole('button', { name: /increment/i })
  expect(message).toHaveTextContent('Current count: 0')
  // expect(count).toBe(0)
  await userEvent.click(increment)
  // act(() => increment())
  expect(message).toHaveTextContent('Current count: 1')
  // expect(count).toBe(1)
  await userEvent.click(decrement)
  // act(() => decrement())
  expect(message).toHaveTextContent('Current count: 0')
  // expect(count).toBe(0)
})

test('allow customization of the initial count', async () => {
  // const result = setup({initialCount: 42})
  // const {result} = renderHook(() => useCounter({initialCount: 42}))
  const { result } = renderHook(useCounter, {
    initialProps: { initialCount: 42 },
  })
  render(<CounterConsumer />)
  expect(result.current.count).toBe(42)
})

test('allow customization of the step', async () => {
  // const {count, increment, decrement} = setup({step: 8})  // assigns the destructured value of count once
  // const result = setup({step: 8})    // assigns to a wrapper variable around the reactive object, access with result.current.PROPERTY
  // const result = setup({step: 8})    // assigns to a wrapper variable around the reactive object, access with result.PROPERTY
  // const {result} = renderHook(() => useCounter({step: 8}))
  const { result } = renderHook(useCounter, { initialProps: { step: 8 } })
  // expect(result.count).toBe(0)
  expect(result.current.count).toBe(0)
  // act(() => result.increment())
  act(() => result.current.increment())
  // expect(result.count).toBe(8)
  expect(result.current.count).toBe(8)
  // act(() => result.decrement())
  act(() => result.current.decrement())
  // expect(result.count).toBe(0)
  expect(result.current.count).toBe(0)
})
