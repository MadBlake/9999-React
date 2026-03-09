import { useState, useRef, useEffect } from 'react'


// Sub: Valor anterior
const ValorAnterior = () => {
  const [valor, setValor] = useState(0)
  const prevRef = useRef(0)

  useEffect(() => { prevRef.current = valor }, [valor])

  return (
    <div className="flex-row">
      <button onClick={() => setValor((v) => v - 1)}>-1</button>
      <div style={{ textAlign: 'center', minWidth: 180 }}>
        <div>Actual: <strong style={{ fontSize: '1.3rem' }}>{valor}</strong></div>
        <div style={{ color: '#888', fontSize: '0.85rem' }}>Anterior: {prevRef.current}</div>
      </div>
      <button onClick={() => setValor((v) => v + 1)}>+1</button>
    </div>
  )
}

export default ValorAnterior;