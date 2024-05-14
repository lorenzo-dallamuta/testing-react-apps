// testing custom hooks
// 💯 setup function
// http://localhost:3000/counter-hook
import { expect, test } from 'vitest'
import useCounter from '@/hooks/use-counter'
import { act, render } from '@testing-library/react'

type Props = {
  initialProps?: { initialCount?: number; step?: number }
}

function setup({ initialProps }: Props = {}) {
  const result: { current?: ReturnType<typeof useCounter> } = {}
  function TestComponent() {
    result.current = useCounter(initialProps)
    return null
  }
  render(<TestComponent />)
  return result
}

test('exposes the count and increment/decrement functions', () => {
  const result = setup()
  expect(result.current?.count).toBe(0)
  act(() => result.current?.increment())
  expect(result.current?.count).toBe(1)
  act(() => result.current?.decrement())
  expect(result.current?.count).toBe(0)
})

test('allows customization of the initial count', () => {
  const result = setup({ initialProps: { initialCount: 3 } })
  expect(result.current?.count).toBe(3)
})

test('allows customization of the step', () => {
  const result = setup({ initialProps: { step: 2 } })
  expect(result.current?.count).toBe(0)
  act(() => result.current?.increment())
  expect(result.current?.count).toBe(2)
  act(() => result.current?.decrement())
  expect(result.current?.count).toBe(0)
})
