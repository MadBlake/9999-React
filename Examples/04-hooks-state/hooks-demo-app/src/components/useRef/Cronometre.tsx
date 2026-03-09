import { useState, useRef, useEffect } from 'react'

// Sub: Cronòmetre
const Cronometre = () => {
  const [temps, setTemps] = useState(0)
  const [actiu, setActiu] = useState(false)
  const intervalRef = useRef<number | null>(null)

  const iniciar = () => {
    if (intervalRef.current !== null) return
    setActiu(true)
    intervalRef.current = window.setInterval(() => {
      setTemps((t) => t + 10)
    }, 10)
  }

  const aturar = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
      setActiu(false)
    }
  }

  const reiniciar = () => {
    aturar()
    setTemps(0)
  }

  useEffect(() => {
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [])

  const min = Math.floor(temps / 60000)
  const seg = Math.floor((temps % 60000) / 1000)
  const ms = Math.floor((temps % 1000) / 10)

  return (
    <div style={{ textAlign: 'center' }}>
      <div className="stopwatch">
        {String(min).padStart(2, '0')}:{String(seg).padStart(2, '0')}.
        {String(ms).padStart(2, '0')}
      </div>
      <div className="flex-row" style={{ justifyContent: 'center' }}>
        {!actiu ? (
          <button className="primary" onClick={iniciar}>▶️ Start</button>
        ) : (
          <button onClick={aturar}>⏸️ Pause</button>
        )}
        <button className="danger" onClick={reiniciar}>🔄 Reset</button>
      </div>
    </div>
  )
}

export default Cronometre;