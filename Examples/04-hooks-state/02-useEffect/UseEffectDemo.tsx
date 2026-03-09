import { useState, useEffect } from 'react';

// Exemple 1: useEffect amb array buit (només al muntar)
function Rellotge() {
  const [hora, setHora] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const interval = setInterval(() => {
      setHora(new Date().toLocaleTimeString());
    }, 1000);

    // Funció de neteja: s'executa al desmuntar
    return () => clearInterval(interval);
  }, []); // Array buit = només s'executa una vegada

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>🕐 Rellotge en temps real</h2>
      <p style={{ fontSize: '2rem', fontFamily: 'monospace' }}>{hora}</p>
    </div>
  );
}

// Exemple 2: useEffect amb dependències (fetch de dades)
function UsuariDetall({ userId }: { userId: number }) {
  const [usuari, setUsuari] = useState<any>(null);
  const [carregant, setCarregant] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false; // Protecció contra race conditions
    setCarregant(true);

    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then((res) => {
        if (!res.ok) throw new Error('Error en la petició');
        return res.json();
      })
      .then((data) => {
        if (!ignore) {
          setUsuari(data);
          setError(null);
        }
      })
      .catch((err) => {
        if (!ignore) setError(err.message);
      })
      .finally(() => {
        if (!ignore) setCarregant(false);
      });

    return () => {
      ignore = true; // Cancel·lar si canvia userId
    };
  }, [userId]); // S'executa cada cop que userId canvia

  if (carregant) return <p>Carregant usuari...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '8px' }}>
      <h3>{usuari?.name}</h3>
      <p>📧 {usuari?.email}</p>
      <p>📞 {usuari?.phone}</p>
      <p>🏢 {usuari?.company?.name}</p>
    </div>
  );
}

// Exemple 3: useEffect amb event listener (neteja)
function AmplePantalla() {
  const [ample, setAmple] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setAmple(window.innerWidth);
    window.addEventListener('resize', handleResize);

    // Neteja: eliminem el listener al desmuntar
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <p>
      📐 Amplada de la finestra: <strong>{ample}px</strong>
    </p>
  );
}

// Component principal
export default function UseEffectDemo() {
  const [userId, setUserId] = useState(1);

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Exemples de useEffect</h1>

      <hr />
      <h2>1. Efecte al muntar (rellotge)</h2>
      <Rellotge />

      <hr />
      <h2>2. Efecte amb dependències (fetch)</h2>
      <div style={{ marginBottom: '10px' }}>
        <label>Selecciona usuari: </label>
        <select
          value={userId}
          onChange={(e) => setUserId(Number(e.target.value))}
        >
          {[1, 2, 3, 4, 5].map((id) => (
            <option key={id} value={id}>
              Usuari {id}
            </option>
          ))}
        </select>
      </div>
      <UsuariDetall userId={userId} />

      <hr />
      <h2>3. Efecte amb event listener</h2>
      <AmplePantalla />
    </div>
  );
}
