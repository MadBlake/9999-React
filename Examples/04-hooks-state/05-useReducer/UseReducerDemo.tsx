import { useReducer, useState } from 'react';

// ============================
// Exemple 1: Comptador amb useReducer
// ============================

interface ComptadorEstat {
  compte: number;
}

type ComptadorAccio =
  | { type: 'INCREMENT' }
  | { type: 'DECREMENT' }
  | { type: 'RESET' }
  | { type: 'SET'; payload: number };

function comptadorReducer(state: ComptadorEstat, action: ComptadorAccio): ComptadorEstat {
  switch (action.type) {
    case 'INCREMENT':
      return { compte: state.compte + 1 };
    case 'DECREMENT':
      return { compte: state.compte - 1 };
    case 'RESET':
      return { compte: 0 };
    case 'SET':
      return { compte: action.payload };
    default:
      return state;
  }
}

function ExempleComptador() {
  const [state, dispatch] = useReducer(comptadorReducer, { compte: 0 });

  return (
    <div style={{ marginBottom: '20px' }}>
      <h2>1. Comptador amb useReducer</h2>
      <p style={{ fontSize: '2rem' }}>{state.compte}</p>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-1</button>
      <button onClick={() => dispatch({ type: 'RESET' })} style={{ margin: '0 10px' }}>
        Reset
      </button>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+1</button>
      <button
        onClick={() => dispatch({ type: 'SET', payload: 100 })}
        style={{ marginLeft: '10px' }}
      >
        Posar a 100
      </button>
    </div>
  );
}

// ============================
// Exemple 2: Llista de tasques (CRUD)
// ============================

interface Tasca {
  id: number;
  text: string;
  completada: boolean;
}

type TascaAccio =
  | { type: 'AFEGIR'; payload: string }
  | { type: 'ESBORRAR'; payload: number }
  | { type: 'COMPLETAR'; payload: number }
  | { type: 'NETEJAR' };

function tascaReducer(state: Tasca[], action: TascaAccio): Tasca[] {
  switch (action.type) {
    case 'AFEGIR':
      return [
        ...state,
        { id: Date.now(), text: action.payload, completada: false },
      ];
    case 'ESBORRAR':
      return state.filter((tasca) => tasca.id !== action.payload);
    case 'COMPLETAR':
      return state.map((tasca) =>
        tasca.id === action.payload
          ? { ...tasca, completada: !tasca.completada }
          : tasca
      );
    case 'NETEJAR':
      return [];
    default:
      return state;
  }
}

function ExempleTasques() {
  const estatInicial: Tasca[] = [
    { id: 1, text: 'Aprendre useState', completada: true },
    { id: 2, text: 'Aprendre useEffect', completada: true },
    { id: 3, text: 'Aprendre useReducer', completada: false },
  ];

  const [tasques, dispatch] = useReducer(tascaReducer, estatInicial);
  const [novaTasca, setNovaTasca] = useState('');

  const handleAfegir = () => {
    if (novaTasca.trim()) {
      dispatch({ type: 'AFEGIR', payload: novaTasca.trim() });
      setNovaTasca('');
    }
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <h2>2. Llista de Tasques (CRUD complet)</h2>

      <div style={{ marginBottom: '10px' }}>
        <input
          value={novaTasca}
          onChange={(e) => setNovaTasca(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAfegir()}
          placeholder="Nova tasca..."
          style={{ padding: '8px', marginRight: '10px', width: '250px' }}
        />
        <button onClick={handleAfegir}>➕ Afegir</button>
        <button
          onClick={() => dispatch({ type: 'NETEJAR' })}
          style={{ marginLeft: '10px', color: 'red' }}
        >
          🗑️ Netejar tot
        </button>
      </div>

      {tasques.length === 0 ? (
        <p style={{ color: '#888' }}>No hi ha tasques</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {tasques.map((tasca) => (
            <li
              key={tasca.id}
              style={{
                padding: '8px',
                margin: '4px 0',
                backgroundColor: tasca.completada ? '#e8f5e9' : '#fff3e0',
                borderRadius: '4px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span
                style={{
                  textDecoration: tasca.completada ? 'line-through' : 'none',
                  cursor: 'pointer',
                }}
                onClick={() => dispatch({ type: 'COMPLETAR', payload: tasca.id })}
              >
                {tasca.completada ? '✅' : '⬜'} {tasca.text}
              </span>
              <button
                onClick={() => dispatch({ type: 'ESBORRAR', payload: tasca.id })}
                style={{ color: 'red', border: 'none', cursor: 'pointer' }}
              >
                ❌
              </button>
            </li>
          ))}
        </ul>
      )}

      <p style={{ color: '#888', fontSize: '0.85rem' }}>
        📊 Total: {tasques.length} | Completades:{' '}
        {tasques.filter((t) => t.completada).length}
      </p>
    </div>
  );
}

// ============================
// Exemple 3: Formulari complex
// ============================

interface FormulariEstat {
  nom: string;
  email: string;
  edat: number;
  acceptaTermes: boolean;
  errors: string[];
}

type FormulariAccio =
  | { type: 'CAMP_CANVIAT'; payload: { camp: string; valor: string | number | boolean } }
  | { type: 'VALIDAR' }
  | { type: 'RESET' };

const formulariInicial: FormulariEstat = {
  nom: '',
  email: '',
  edat: 0,
  acceptaTermes: false,
  errors: [],
};

function formulariReducer(state: FormulariEstat, action: FormulariAccio): FormulariEstat {
  switch (action.type) {
    case 'CAMP_CANVIAT':
      return {
        ...state,
        [action.payload.camp]: action.payload.valor,
        errors: [], // Netejar errors al canviar
      };
    case 'VALIDAR': {
      const errors: string[] = [];
      if (!state.nom.trim()) errors.push('El nom és obligatori');
      if (!state.email.includes('@')) errors.push("L'email ha de contenir @");
      if (state.edat < 18) errors.push('Has de ser major de 18');
      if (!state.acceptaTermes) errors.push('Has d\'acceptar els termes');
      return { ...state, errors };
    }
    case 'RESET':
      return formulariInicial;
    default:
      return state;
  }
}

function ExempleFormulari() {
  const [state, dispatch] = useReducer(formulariReducer, formulariInicial);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({ type: 'VALIDAR' });
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <h2>3. Formulari complex</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '8px' }}>
          <input
            value={state.nom}
            onChange={(e) =>
              dispatch({ type: 'CAMP_CANVIAT', payload: { camp: 'nom', valor: e.target.value } })
            }
            placeholder="Nom"
            style={{ padding: '8px', width: '250px' }}
          />
        </div>
        <div style={{ marginBottom: '8px' }}>
          <input
            value={state.email}
            onChange={(e) =>
              dispatch({ type: 'CAMP_CANVIAT', payload: { camp: 'email', valor: e.target.value } })
            }
            placeholder="Email"
            style={{ padding: '8px', width: '250px' }}
          />
        </div>
        <div style={{ marginBottom: '8px' }}>
          <input
            type="number"
            value={state.edat}
            onChange={(e) =>
              dispatch({
                type: 'CAMP_CANVIAT',
                payload: { camp: 'edat', valor: Number(e.target.value) },
              })
            }
            placeholder="Edat"
            style={{ padding: '8px', width: '250px' }}
          />
        </div>
        <div style={{ marginBottom: '8px' }}>
          <label>
            <input
              type="checkbox"
              checked={state.acceptaTermes}
              onChange={(e) =>
                dispatch({
                  type: 'CAMP_CANVIAT',
                  payload: { camp: 'acceptaTermes', valor: e.target.checked },
                })
              }
            />{' '}
            Accepto els termes i condicions
          </label>
        </div>

        <button type="submit" style={{ marginRight: '10px' }}>
          ✅ Validar
        </button>
        <button type="button" onClick={() => dispatch({ type: 'RESET' })}>
          🔄 Reset
        </button>
      </form>

      {state.errors.length > 0 && (
        <div style={{ marginTop: '10px', color: 'red' }}>
          <p><strong>Errors:</strong></p>
          <ul>
            {state.errors.map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      {state.errors.length === 0 && state.nom && (
        <pre style={{ marginTop: '10px', backgroundColor: '#f5f5f5', padding: '10px' }}>
          {JSON.stringify(state, null, 2)}
        </pre>
      )}
    </div>
  );
}

// ============================
// Component principal
// ============================

export default function UseReducerDemo() {
  return (
    <div style={{ padding: '20px', maxWidth: '700px', margin: '0 auto' }}>
      <h1>Exemples de useReducer</h1>
      <hr />
      <ExempleComptador />
      <hr />
      <ExempleTasques />
      <hr />
      <ExempleFormulari />
    </div>
  );
}
