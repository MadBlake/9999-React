import { useState, useEffect } from 'react'

// Sub-component: Fetch amb dependències
const UsuariFetch = ({ userId }: { userId: number }) => {
  const [usuari, setUsuari] = useState<Record<string, string> | null>(null)
  const [carregant, setCarregant] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let ignore = false // Protecció race conditions
    setCarregant(true)
    setError(null)

    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then((res) => {
        if (!res.ok) throw new Error('Error en la petició')
        return res.json()
      })
      .then((data) => {
        if (!ignore) { setUsuari(data); setCarregant(false) }
      })
      .catch((err) => {
        if (!ignore) { setError(err.message); setCarregant(false) }
      })

    return () => { ignore = true } // Cancel·la si userId canvia
  }, [userId])

  if (carregant) return <p>⏳ Carregant usuari #{userId}...</p>
  if (error) return <p style={{ color: 'red' }}>❌ {error}</p>

  return (
    <div className="user-card">
      <h3>{usuari?.name}</h3>
      <p>📧 {usuari?.email}</p>
      <p>📞 {usuari?.phone}</p>
      <p>🏢 {usuari?.company && (usuari.company as unknown as Record<string, string>).name}</p>
    </div>
  )
}
export default UsuariFetch;