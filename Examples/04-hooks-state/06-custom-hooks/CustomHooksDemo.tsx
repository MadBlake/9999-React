import { useState } from 'react';

// ============================
// Custom Hook 1: useCounter
// ============================

function useCounter(initialValue = 0) {
  const [counter, setCounter] = useState(initialValue);

  const increment = (step = 1) => setCounter((c) => c + step);
  const decrement = (step = 1) => setCounter((c) => Math.max(0, c - step));
  const reset = () => setCounter(initialValue);

  return { counter, increment, decrement, reset };
}

// ============================
// Custom Hook 2: useToggle
// ============================

function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  const toggle = () => setValue((v) => !v);
  const setTrue = () => setValue(true);
  const setFalse = () => setValue(false);

  return { value, toggle, setTrue, setFalse };
}

// ============================
// Custom Hook 3: useForm
// ============================

function useForm<T extends Record<string, any>>(initialValues: T) {
  const [values, setValues] = useState<T>(initialValues);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const reset = () => setValues(initialValues);

  return { values, handleChange, reset, setValues };
}

// ============================
// Custom Hook 4: useLocalStorage
// ============================

function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    const valueToStore = value instanceof Function ? value(storedValue) : value;
    setStoredValue(valueToStore);
    window.localStorage.setItem(key, JSON.stringify(valueToStore));
  };

  const removeValue = () => {
    window.localStorage.removeItem(key);
    setStoredValue(initialValue);
  };

  return { storedValue, setValue, removeValue };
}

// ============================
// Exemples d'ús dels Custom Hooks
// ============================

// Exemple 1: useCounter
function ExempleComptador() {
  const productes = useCounter(1);
  const puntuacio = useCounter(50);

  return (
    <div style={{ marginBottom: '20px' }}>
      <h2>1. useCounter - Comptadors independents</h2>
      <div style={{ display: 'flex', gap: '40px' }}>
        <div>
          <p>🛒 Productes: <strong>{productes.counter}</strong></p>
          <button onClick={() => productes.decrement()}>-</button>
          <button onClick={() => productes.increment()} style={{ margin: '0 5px' }}>+</button>
          <button onClick={productes.reset}>Reset</button>
        </div>
        <div>
          <p>⭐ Puntuació: <strong>{puntuacio.counter}</strong></p>
          <button onClick={() => puntuacio.decrement(10)}>-10</button>
          <button onClick={() => puntuacio.increment(10)} style={{ margin: '0 5px' }}>+10</button>
          <button onClick={puntuacio.reset}>Reset</button>
        </div>
      </div>
      <p style={{ color: '#888', fontSize: '0.85rem' }}>
        💡 Dos usos del mateix hook, estats totalment independents
      </p>
    </div>
  );
}

// Exemple 2: useToggle
function ExempleToggle() {
  const menuVisible = useToggle(false);
  const modeOscur = useToggle(false);

  return (
    <div style={{ marginBottom: '20px' }}>
      <h2>2. useToggle - Booleà reutilitzable</h2>
      <div style={{ display: 'flex', gap: '20px', marginBottom: '10px' }}>
        <button onClick={menuVisible.toggle}>
          {menuVisible.value ? '📖 Tancar menú' : '📕 Obrir menú'}
        </button>
        <button onClick={modeOscur.toggle}>
          {modeOscur.value ? '☀️ Mode clar' : '🌙 Mode fosc'}
        </button>
      </div>

      {menuVisible.value && (
        <div style={{
          padding: '10px',
          backgroundColor: modeOscur.value ? '#333' : '#f0f0f0',
          color: modeOscur.value ? '#fff' : '#333',
          borderRadius: '8px',
        }}>
          <p>📋 Contingut del menú</p>
          <ul>
            <li>Opció 1</li>
            <li>Opció 2</li>
            <li>Opció 3</li>
          </ul>
          <button onClick={menuVisible.setFalse}>Tancar</button>
        </div>
      )}
    </div>
  );
}

// Exemple 3: useForm
function ExempleFormulari() {
  const { values, handleChange, reset } = useForm({
    nom: '',
    email: '',
    missatge: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Enviat!\nNom: ${values.nom}\nEmail: ${values.email}\nMissatge: ${values.missatge}`);
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <h2>3. useForm - Formulari genèric</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '8px' }}>
          <input
            name="nom"
            value={values.nom}
            onChange={handleChange}
            placeholder="Nom"
            style={{ padding: '8px', width: '250px' }}
          />
        </div>
        <div style={{ marginBottom: '8px' }}>
          <input
            name="email"
            value={values.email}
            onChange={handleChange}
            placeholder="Email"
            style={{ padding: '8px', width: '250px' }}
          />
        </div>
        <div style={{ marginBottom: '8px' }}>
          <textarea
            name="missatge"
            value={values.missatge}
            onChange={handleChange}
            placeholder="Missatge"
            style={{ padding: '8px', width: '250px', height: '60px' }}
          />
        </div>
        <button type="submit" style={{ marginRight: '10px' }}>📤 Enviar</button>
        <button type="button" onClick={reset}>🔄 Reset</button>
      </form>

      <pre style={{ marginTop: '10px', backgroundColor: '#f5f5f5', padding: '10px', fontSize: '0.85rem' }}>
        {JSON.stringify(values, null, 2)}
      </pre>
    </div>
  );
}

// Exemple 4: useLocalStorage
function ExempleLocalStorage() {
  const { storedValue: nom, setValue: setNom, removeValue: clearNom } =
    useLocalStorage<string>('demo-nom', '');

  return (
    <div style={{ marginBottom: '20px' }}>
      <h2>4. useLocalStorage - Persistència al navegador</h2>
      <input
        value={nom}
        onChange={(e) => setNom(e.target.value)}
        placeholder="El teu nom (es guardarà al localStorage)"
        style={{ padding: '8px', width: '350px', marginRight: '10px' }}
      />
      <button onClick={clearNom}>🗑️ Esborrar</button>
      <p style={{ color: '#888', fontSize: '0.85rem' }}>
        💡 Recarrega la pàgina i el nom seguirà allà!
      </p>
    </div>
  );
}

// ============================
// Component principal
// ============================

export default function CustomHooksDemo() {
  return (
    <div style={{ padding: '20px', maxWidth: '700px', margin: '0 auto' }}>
      <h1>Exemples de Custom Hooks</h1>
      <p style={{ color: '#666' }}>
        Cada hook encapsula lògica reutilitzable que simplifica els components.
      </p>
      <hr />
      <ExempleComptador />
      <hr />
      <ExempleToggle />
      <hr />
      <ExempleFormulari />
      <hr />
      <ExempleLocalStorage />
    </div>
  );
}
