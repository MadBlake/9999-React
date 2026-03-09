import { useState, useEffect } from 'react'

// Sub-component: Rellotge en temps real
const Rellotge = () => {
  const [hora, setHora] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => setHora(new Date()), 1000)
    return () => clearInterval(interval) // Cleanup
  }, []) // [] = només al muntar

  return (
    <div style={{ textAlign: 'center' }}>
      <div className="stopwatch">
        {hora.toLocaleTimeString('ca-ES')}
      </div>
      <p style={{ color: '#888', fontSize: '0.85rem' }}>
        {hora.toLocaleDateString('ca-ES', {
          weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
        })}
      </p>
    </div>
  )
}

export default Rellotge;