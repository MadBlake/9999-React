import { useState } from 'react'

export function useCounter(initialValue = 0) {
  const [counter, setCounter] = useState(initialValue)

  const increment = (step = 1) => setCounter((c) => c + step)
  const decrement = (step = 1) => setCounter((c) => Math.max(0, c - step))
  const reset = () => setCounter(initialValue)

  return { counter, increment, decrement, reset }
}
