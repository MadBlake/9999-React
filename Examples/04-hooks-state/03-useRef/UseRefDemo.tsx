import { useState, useRef, useEffect } from 'react';

// Exemple 1: Accés al DOM - Focus automàtic
function FormulariFocus() {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <h2>1. Accés al DOM - Focus</h2>
      <input
        ref={inputRef}
        type="text"
        placeholder="Prem el botó per fer focus aquí..."
        style={{ padding: '8px', marginRight: '10px', width: '300px' }}
      />
      <button onClick={handleClick}>🔍 Fer Focus</button>
    </div>
  );
}

// Exemple 2: Cronòmetre amb useRef per l'interval
function Cronometre() {
  const [segons, setSegons] = useState(0);
  const intervalRef = useRef<number | null>(null);

  const iniciar = () => {
    if (intervalRef.current !== null) return; // Evitar duplicats
    intervalRef.current = window.setInterval(() => {
      setSegons((s) => s + 1);
    }, 1000);
  };

  const aturar = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const reiniciar = () => {
    aturar();
    setSegons(0);
  };

  // Neteja al desmuntar
  useEffect(() => {
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div style={{ marginBottom: '20px' }}>
      <h2>2. Cronòmetre (ref per guardar interval ID)</h2>
      <p style={{ fontSize: '2rem', fontFamily: 'monospace' }}>
        ⏱️ {segons}s
      </p>
      <button onClick={iniciar} style={{ marginRight: '5px' }}>▶️ Start</button>
      <button onClick={aturar} style={{ marginRight: '5px' }}>⏸️ Stop</button>
      <button onClick={reiniciar}>🔄 Reset</button>
    </div>
  );
}

// Exemple 3: Comptador de renders amb useRef
function ComptadorRenders() {
  const [text, setText] = useState('');
  const renderCount = useRef(0);

  // Incrementem el comptador a cada render
  // (fet dins useEffect per ser correcte)
  useEffect(() => {
    renderCount.current += 1;
  });

  return (
    <div style={{ marginBottom: '20px' }}>
      <h2>3. Comptador de renders (ref silenciosa)</h2>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Escriu quelcom..."
        style={{ padding: '8px', width: '300px' }}
      />
      <p>
        Has escrit: <strong>{text}</strong>
      </p>
      <p>
        El component s'ha renderitzat <strong>{renderCount.current}</strong>{' '}
        vegades
      </p>
      <p style={{ color: '#888', fontSize: '0.85rem' }}>
        💡 La ref no provoca re-renders addicionals
      </p>
    </div>
  );
}

// Exemple 4: Guardar valor anterior
function ValorAnterior() {
  const [comptador, setComptador] = useState(0);
  const valorAnteriorRef = useRef<number>(0);

  useEffect(() => {
    valorAnteriorRef.current = comptador;
  }, [comptador]);

  return (
    <div style={{ marginBottom: '20px' }}>
      <h2>4. Guardar valor anterior</h2>
      <p>Valor actual: <strong>{comptador}</strong></p>
      <p>Valor anterior: <strong>{valorAnteriorRef.current}</strong></p>
      <button onClick={() => setComptador((c) => c + 1)}>+1</button>
    </div>
  );
}

// Component principal
export default function UseRefDemo() {
  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Exemples de useRef</h1>
      <hr />
      <FormulariFocus />
      <hr />
      <Cronometre />
      <hr />
      <ComptadorRenders />
      <hr />
      <ValorAnterior />
    </div>
  );
}
