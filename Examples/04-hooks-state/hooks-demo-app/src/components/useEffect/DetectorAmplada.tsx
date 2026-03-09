import { useState, useEffect } from 'react'

// Sub-component: Window resize listener
const DetectorAmplada = () => {
  const [ample, setAmple] = useState(window.innerWidth)

  useEffect(() => {
    const handler = () => setAmple(window.innerWidth)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler) // Cleanup
  }, [])

  const color = ample < 768 ? '#e65100' : ample < 1200 ? '#1565c0' : '#2e7d32'

  return (
    <div className="flex-row">
      <span>📐 Amplada: </span>
      <span className="badge" style={{ background: color + '20', color }}>
        {ample}px
      </span>
      <span style={{ color: '#aaa' }}>
        {ample < 768 ? '(mòbil)' : ample < 1200 ? '(tablet)' : '(escriptori)'}
      </span>
    </div>
  )
}

export default DetectorAmplada;