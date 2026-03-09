import { useState, useMemo, useCallback, memo } from 'react';

// ============================
// Exemple 1: React.memo
// ============================

const FillPesat = memo(function FillPesat({ text }: { text: string }) {
  console.log('🔴 FillPesat renderitzat!');
  // Simulem un component pesat
  const items = Array.from({ length: 100 }, (_, i) => `${text} - Element ${i + 1}`);

  return (
    <div style={{ border: '1px solid #e0e0e0', padding: '10px', borderRadius: '8px', maxHeight: '150px', overflow: 'auto' }}>
      <p><strong>Component Fill (memo)</strong> - Mira la consola per veure si es renderitza</p>
      <ul style={{ fontSize: '0.8rem' }}>
        {items.slice(0, 5).map((item, i) => (
          <li key={i}>{item}</li>
        ))}
        <li>... i {items.length - 5} més</li>
      </ul>
    </div>
  );
});

function ExempleReactMemo() {
  const [comptador, setComptador] = useState(0);
  const [textFill, setTextFill] = useState('Hola');

  return (
    <div style={{ marginBottom: '20px' }}>
      <h2>1. React.memo</h2>
      <p>El comptador canvia el pare, però el Fill NO es re-renderitza (comprova la consola):</p>
      <button onClick={() => setComptador((c) => c + 1)}>
        Comptador pare: {comptador}
      </button>
      <button
        onClick={() => setTextFill(textFill === 'Hola' ? 'Adéu' : 'Hola')}
        style={{ marginLeft: '10px' }}
      >
        Canviar text fill ({textFill})
      </button>
      <FillPesat text={textFill} />
    </div>
  );
}

// ============================
// Exemple 2: useMemo
// ============================

function generarLlista(n: number): { id: number; nom: string; puntuacio: number }[] {
  return Array.from({ length: n }, (_, i) => ({
    id: i,
    nom: `Usuari ${i + 1}`,
    puntuacio: Math.floor(Math.random() * 100),
  }));
}

function ExempleUseMemo() {
  const [cerca, setCerca] = useState('');
  const [color, setColor] = useState('#ffffff');

  // Generem la llista una sola vegada (fora del component normalment,
  // però aquí amb useMemo per demostrar)
  const usuaris = useMemo(() => {
    console.log('🔵 Generant llista de 10.000 usuaris...');
    return generarLlista(10000);
  }, []);

  // ✅ Només filtrem quan canvia 'cerca' o 'usuaris', NO quan canvia el color
  const filtrats = useMemo(() => {
    console.log('🟢 Filtrant usuaris...');
    return usuaris.filter((u) =>
      u.nom.toLowerCase().includes(cerca.toLowerCase())
    );
  }, [usuaris, cerca]);

  return (
    <div style={{ marginBottom: '20px' }}>
      <h2>2. useMemo - Càlcul costós cachejat</h2>
      <div>
        <input
          value={cerca}
          onChange={(e) => setCerca(e.target.value)}
          placeholder="Cercar usuari..."
          style={{ padding: '8px', marginRight: '10px', width: '200px' }}
        />
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          title="Canviar color (NO re-filtra)"
        />
      </div>
      <div style={{ backgroundColor: color, padding: '10px', borderRadius: '8px', marginTop: '10px' }}>
        <p>Trobats: <strong>{filtrats.length}</strong> de {usuaris.length}</p>
        <ul style={{ maxHeight: '120px', overflow: 'auto', fontSize: '0.85rem' }}>
          {filtrats.slice(0, 10).map((u) => (
            <li key={u.id}>{u.nom} (puntuació: {u.puntuacio})</li>
          ))}
          {filtrats.length > 10 && <li>... i {filtrats.length - 10} més</li>}
        </ul>
      </div>
      <p style={{ color: '#888', fontSize: '0.85rem' }}>
        💡 Canviar el color NO re-filtra la llista (mira la consola)
      </p>
    </div>
  );
}

// ============================
// Exemple 3: useCallback
// ============================

const BotoMemoitzat = memo(function BotoMemoitzat({
  onClick,
  label,
}: {
  onClick: () => void;
  label: string;
}) {
  console.log(`🟡 Botó "${label}" renderitzat`);
  return (
    <button onClick={onClick} style={{ margin: '5px', padding: '8px 16px' }}>
      {label}
    </button>
  );
});

function ExempleUseCallback() {
  const [comptador, setComptador] = useState(0);
  const [text, setText] = useState('');

  // ❌ Sense useCallback: es crea una funció nova a cada render
  const handleIncrementInestable = () => {
    setComptador((c) => c + 1);
  };

  // ✅ Amb useCallback: la referència és estable
  const handleIncrementEstable = useCallback(() => {
    setComptador((c) => c + 1);
  }, []);

  return (
    <div style={{ marginBottom: '20px' }}>
      <h2>3. useCallback - Estabilitzar funcions</h2>
      <p>Comptador: <strong>{comptador}</strong></p>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Escriu per provocar re-render del pare..."
        style={{ padding: '8px', width: '300px', marginBottom: '10px' }}
      />
      <div>
        <BotoMemoitzat onClick={handleIncrementInestable} label="Inestable (es re-renderitza)" />
        <BotoMemoitzat onClick={handleIncrementEstable} label="Estable (NO es re-renderitza)" />
      </div>
      <p style={{ color: '#888', fontSize: '0.85rem' }}>
        💡 Escriu al input i mira la consola: el botó "Estable" no es re-renderitza
      </p>
    </div>
  );
}

// ============================
// Component principal
// ============================

export default function UseMemoDemo() {
  return (
    <div style={{ padding: '20px', maxWidth: '700px', margin: '0 auto' }}>
      <h1>Memoització a React</h1>
      <p style={{ color: '#666' }}>
        Obre la consola del navegador (F12) per veure quan es renderitzen els components.
      </p>
      <hr />
      <ExempleReactMemo />
      <hr />
      <ExempleUseMemo />
      <hr />
      <ExempleUseCallback />
    </div>
  );
}
