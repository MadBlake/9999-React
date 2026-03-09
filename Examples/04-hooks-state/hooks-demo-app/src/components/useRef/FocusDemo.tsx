import { useRef } from 'react'

// Sub: Focus automàtic
function FocusDemo() {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="flex-row">
      <input ref={inputRef} placeholder="Prem el botó →" style={{ flex: 1, maxWidth: 300 }} />
      <button className="primary" onClick={() => inputRef.current?.focus()}>
        🔍 Fer Focus
      </button>
      <button onClick={() => inputRef.current?.select()}>
        📋 Seleccionar tot
      </button>
    </div>
  )
}

export default FocusDemo;