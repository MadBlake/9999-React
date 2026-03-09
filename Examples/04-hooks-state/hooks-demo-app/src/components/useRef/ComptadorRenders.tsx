import { useState, useRef, useEffect } from 'react'

// Sub: Comptador de renders
const  ComptadorRenders = () => {
  const [text, setText] = useState('')
  const renderCount = useRef(0)

  useEffect(() => { renderCount.current += 1 })

  return (
    <div>
      <div className="flex-row">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Escriu per provocar renders..."
          style={{ flex: 1, maxWidth: 350 }}
        />
        <span className="badge info">
          Renders: {renderCount.current}
        </span>
      </div>
      <div className="hint tip" style={{ marginTop: 10 }}>
        💡 La ref compta els renders sense provocar-ne de nous
      </div>
    </div>
  )
}

export default ComptadorRenders;
