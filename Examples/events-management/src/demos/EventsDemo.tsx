import { useState } from 'react';
import './EventsDemo.css';

// ============================================================
// DEMO 1: onClick bàsic — Comptador
// ============================================================
function ClickDemo() {
  const [comptador, setComptador] = useState(0);

  const handleIncrement = () => {
    setComptador((c) => c + 1);
  };

  const handleDecrement = () => {
    setComptador((c) => c - 1);
  };

  const handleReset = () => {
    setComptador(0);
  };

  return (
    <section className="demo-section">
      <h2>1. onClick — Comptador</h2>
      <p className="demo-description">
        Exemple bàsic d'<code>onClick</code>: passem <strong>referències</strong>{' '}
        a funcions, no les executem.
      </p>
      <div className="demo-content">
        <span className="comptador-valor">{comptador}</span>
        <div className="boto-grup">
          <button onClick={handleDecrement} className="btn btn-secondary">
            − Decrementar
          </button>
          <button onClick={handleReset} className="btn btn-outline">
            ↺ Reset
          </button>
          <button onClick={handleIncrement} className="btn btn-primary">
            + Incrementar
          </button>
        </div>
      </div>
      <pre className="demo-code">
        {`// ✅ Referència a funció
<button onClick={handleIncrement}>

// ❌ Execució immediata (ERROR!)
<button onClick={handleIncrement()}>`}
      </pre>
    </section>
  );
}

// ============================================================
// DEMO 2: onChange — Formulari controlat
// ============================================================
function ChangeDemo() {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    categoria: 'tecnologia',
    missatge: '',
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section className="demo-section">
      <h2>2. onChange — Formulari controlat</h2>
      <p className="demo-description">
        Cada camp usa <code>onChange</code> per actualitzar l'estat. El formulari
        és <strong>controlat</strong>: React és la font de veritat.
      </p>
      <div className="demo-content demo-form-layout">
        <div className="demo-form">
          <label>
            Nom:
            <input
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              placeholder="El teu nom"
            />
          </label>

          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="email@exemple.com"
            />
          </label>

          <label>
            Categoria:
            <select
              name="categoria"
              value={formData.categoria}
              onChange={handleChange}
            >
              <option value="tecnologia">Tecnologia</option>
              <option value="musica">Música</option>
              <option value="esport">Esport</option>
              <option value="art">Art</option>
            </select>
          </label>

          <label>
            Missatge:
            <textarea
              name="missatge"
              value={formData.missatge}
              onChange={handleChange}
              placeholder="Escriu un missatge..."
              rows={3}
            />
          </label>
        </div>

        <div className="demo-output">
          <h4>Estat actual:</h4>
          <pre>{JSON.stringify(formData, null, 2)}</pre>
        </div>
      </div>

      <pre className="demo-code">
        {`const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setFormData(prev => ({ ...prev, [name]: value }));
};`}
      </pre>
    </section>
  );
}

// ============================================================
// DEMO 3: onSubmit + preventDefault
// ============================================================
function SubmitDemo() {
  const [dades, setDades] = useState({ nom: '', email: '' });
  const [enviaments, setEnviaments] = useState<
    { nom: string; email: string; timestamp: string }[]
  >([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDades((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // IMPORTANT: Evitem la recàrrega de la pàgina
    e.preventDefault();

    if (!dades.nom || !dades.email) {
      alert('Si us plau, ompliu tots els camps.');
      return;
    }

    setEnviaments((prev) => [
      ...prev,
      { ...dades, timestamp: new Date().toLocaleTimeString() },
    ]);
    setDades({ nom: '', email: '' });
  };

  return (
    <section className="demo-section">
      <h2>3. onSubmit + preventDefault</h2>
      <p className="demo-description">
        Sense <code>e.preventDefault()</code>, el formulari recarregaria la
        pàgina. En una <strong>SPA</strong>, volem evitar-ho.
      </p>
      <div className="demo-content">
        <form onSubmit={handleSubmit} className="demo-form-inline">
          <input
            type="text"
            name="nom"
            value={dades.nom}
            onChange={handleChange}
            placeholder="Nom"
          />
          <input
            type="email"
            name="email"
            value={dades.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <button type="submit" className="btn btn-primary">
            Enviar
          </button>
        </form>

        {enviaments.length > 0 && (
          <div className="demo-resultats">
            <h4>Enviaments ({enviaments.length}):</h4>
            <ul>
              {enviaments.map((env, i) => (
                <li key={i}>
                  <strong>{env.nom}</strong> — {env.email}{' '}
                  <span className="timestamp">({env.timestamp})</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <pre className="demo-code">
        {`const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault(); // ← INDISPENSABLE en SPAs
  // Processar dades...
};`}
      </pre>
    </section>
  );
}

// ============================================================
// DEMO 4: Passant arguments als handlers
// ============================================================
interface Usuari {
  id: number;
  nom: string;
  email: string;
}

const USUARIS_INICIALS: Usuari[] = [
  { id: 1, nom: 'Anna Garcia', email: 'anna@exemple.com' },
  { id: 2, nom: 'Marc López', email: 'marc@exemple.com' },
  { id: 3, nom: 'Laia Puig', email: 'laia@exemple.com' },
  { id: 4, nom: 'Oriol Martí', email: 'oriol@exemple.com' },
];

function ArgumentsDemo() {
  const [usuaris, setUsuaris] = useState<Usuari[]>(USUARIS_INICIALS);
  const [seleccionat, setSeleccionat] = useState<Usuari | null>(null);

  const handleEliminar = (id: number) => {
    setUsuaris((prev) => prev.filter((u) => u.id !== id));
    if (seleccionat?.id === id) setSeleccionat(null);
  };

  const handleSeleccionar = (usuari: Usuari) => {
    setSeleccionat(usuari);
  };

  const handleReset = () => {
    setUsuaris(USUARIS_INICIALS);
    setSeleccionat(null);
  };

  return (
    <section className="demo-section">
      <h2>4. Passant arguments als handlers</h2>
      <p className="demo-description">
        Usem <strong>arrow functions</strong> per passar arguments addicionals
        als handlers: <code>onClick={'() => fn(id)'}</code>
      </p>
      <div className="demo-content">
        {usuaris.length === 0 ? (
          <p className="demo-empty">No queden usuaris 🤷</p>
        ) : (
          <ul className="usuari-llista">
            {usuaris.map((usuari) => (
              <li
                key={usuari.id}
                className={`usuari-item ${seleccionat?.id === usuari.id ? 'seleccionat' : ''}`}
              >
                <div className="usuari-info">
                  <strong>{usuari.nom}</strong>
                  <span>{usuari.email}</span>
                </div>
                <div className="boto-grup">
                  <button
                    onClick={() => handleSeleccionar(usuari)}
                    className="btn btn-small btn-outline"
                  >
                    👁 Veure
                  </button>
                  <button
                    onClick={() => handleEliminar(usuari.id)}
                    className="btn btn-small btn-danger"
                  >
                    🗑 Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <button onClick={handleReset} className="btn btn-outline" style={{ marginTop: '1rem' }}>
          ↺ Restaurar usuaris
        </button>

        {seleccionat && (
          <div className="demo-output">
            <h4>Usuari seleccionat:</h4>
            <pre>{JSON.stringify(seleccionat, null, 2)}</pre>
          </div>
        )}
      </div>

      <pre className="demo-code">
        {`// ✅ Arrow function per passar arguments
<button onClick={() => handleEliminar(usuari.id)}>

// ❌ Això executa la funció immediatament!
<button onClick={handleEliminar(usuari.id)}>`}
      </pre>
    </section>
  );
}

// ============================================================
// DEMO 5: SyntheticEvent — Inspecció de l'objecte event
// ============================================================
function SyntheticEventDemo() {
  const [eventInfo, setEventInfo] = useState<Record<string, string>>({});
  const [eventLog, setEventLog] = useState<string[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setEventInfo({
      type: e.type,
      target: (e.target as HTMLElement).tagName,
      currentTarget: (e.currentTarget as HTMLElement).tagName,
      clientX: String(e.clientX),
      clientY: String(e.clientY),
      bubbles: String(e.bubbles),
      timeStamp: `${e.timeStamp.toFixed(0)}ms`,
    });
    setEventLog((prev) => [
      `[${new Date().toLocaleTimeString()}] ${e.type} a (${e.clientX}, ${e.clientY})`,
      ...prev.slice(0, 9),
    ]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setEventInfo({
      type: e.type,
      key: e.key,
      code: e.code,
      altKey: String(e.altKey),
      ctrlKey: String(e.ctrlKey),
      shiftKey: String(e.shiftKey),
      repeat: String(e.repeat),
    });
    setEventLog((prev) => [
      `[${new Date().toLocaleTimeString()}] teclat: "${e.key}" (${e.code})`,
      ...prev.slice(0, 9),
    ]);
  };

  return (
    <section className="demo-section">
      <h2>5. SyntheticEvent — Inspecció</h2>
      <p className="demo-description">
        React envolta els events natius en un <code>SyntheticEvent</code> per
        garantir compatibilitat cross-browser.
      </p>
      <div className="demo-content demo-form-layout">
        <div>
          <button onClick={handleClick} className="btn btn-primary" style={{ marginBottom: '1rem' }}>
            🖱 Fes clic aquí
          </button>
          <br />
          <input
            type="text"
            onKeyDown={handleKeyDown}
            placeholder="Prem tecles aquí..."
            style={{ padding: '0.5rem', width: '100%' }}
          />
        </div>

        <div className="demo-output">
          <h4>Propietats de l'event:</h4>
          {Object.keys(eventInfo).length > 0 ? (
            <pre>{JSON.stringify(eventInfo, null, 2)}</pre>
          ) : (
            <p className="demo-empty">Interactua per veure les propietats</p>
          )}
        </div>
      </div>

      {eventLog.length > 0 && (
        <div className="demo-log">
          <h4>Registre d'events (últims 10):</h4>
          <ul>
            {eventLog.map((entry, i) => (
              <li key={i} className="log-entry">
                {entry}
              </li>
            ))}
          </ul>
        </div>
      )}

      <pre className="demo-code">
        {`const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  console.log(e.type);         // 'click'
  console.log(e.target);       // Element que l'ha disparat
  console.log(e.clientX);      // Coordenada X del ratolí
  console.log(e.nativeEvent);  // Event natiu del navegador
};`}
      </pre>
    </section>
  );
}

// ============================================================
// DEMO 6: Esdeveniments de teclat i focus
// ============================================================
function KeyboardFocusDemo() {
  const [focusat, setFocusat] = useState<string | null>(null);
  const [teclesPretes, setTeclesPretes] = useState<string[]>([]);

  const handleFocus = (camp: string) => (_e: React.FocusEvent<HTMLInputElement>) => {
    setFocusat(camp);
  };

  const handleBlur = (_e: React.FocusEvent<HTMLInputElement>) => {
    setFocusat(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setTeclesPretes((prev) => [...prev, `Enter premut a "${focusat}"`]);
    }
    if (e.key === 'Escape') {
      (e.target as HTMLInputElement).blur();
    }
  };

  return (
    <section className="demo-section">
      <h2>6. Events de teclat i focus</h2>
      <p className="demo-description">
        <code>onFocus</code>, <code>onBlur</code> i <code>onKeyDown</code>{' '}
        permeten crear interfícies reactives al teclat.
      </p>
      <div className="demo-content">
        <div className="demo-form">
          <label className={focusat === 'nom' ? 'label-focus' : ''}>
            Nom (focus per veure l'efecte):
            <input
              type="text"
              onFocus={handleFocus('nom')}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              placeholder="Prem Enter o Escape"
            />
          </label>
          <label className={focusat === 'email' ? 'label-focus' : ''}>
            Email:
            <input
              type="email"
              onFocus={handleFocus('email')}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              placeholder="Prem Enter o Escape"
            />
          </label>
        </div>

        <div className="demo-status">
          <p>
            Camp amb focus:{' '}
            <strong>{focusat ?? <em>cap</em>}</strong>
          </p>
          {teclesPretes.length > 0 && (
            <ul>
              {teclesPretes.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <pre className="demo-code">
        {`// Pattern: Higher-order function per reutilitzar handlers
const handleFocus = (camp: string) => (e: React.FocusEvent) => {
  setFocusat(camp);
};

<input onFocus={handleFocus('nom')} onBlur={handleBlur} />`}
      </pre>
    </section>
  );
}

// ============================================================
// COMPONENT PRINCIPAL
// ============================================================
export default function EventsDemo() {
  return (
    <div className="events-demo">
      <header className="demo-header">
        <h1>🎯 Gestió d'Esdeveniments en React</h1>
        <p>
          Exemples interactius dels conceptes principals de la gestió d'events
          en React amb TypeScript.
        </p>
      </header>

      <ClickDemo />
      <ChangeDemo />
      <SubmitDemo />
      <ArgumentsDemo />
      <SyntheticEventDemo />
      <KeyboardFocusDemo />
    </div>
  );
}
