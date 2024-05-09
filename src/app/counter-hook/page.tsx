'use client'

import useCounter from '@/hooks/use-counter'

function Page() {
  const { count, increment, decrement } = useCounter()
  return (
    <div>
      <div>Current count: {count}</div>
      <button onClick={decrement}>Decrement</button>
      <button onClick={increment}>Increment</button>
    </div>
  )
}

export default Page
