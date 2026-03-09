import { useState, memo } from 'react';
import { useTrackRender } from '../RenderTracker';
import './RenderDemo.css';

/**
 * Componente de demostración para enseñar el ciclo de renderizado de React.
 * Contiene varios escenarios comunes que causan re-renders.
 */
export const RenderDemo = () => {
  useTrackRender('RenderDemo', 'HomePage');
  
  return (
    <div className="render-demo">
      <h2>🎓 Demostración de Renderizado en React</h2>
      <p className="demo-intro">
        Interactúa con los componentes y observa el panel derecho para ver 
        cuándo y por qué se re-renderizan.
      </p>
      
      <div className="demo-sections">
        <ParentChildDemo />
        <StateDemo />
        <MemoDemo />
      </div>
    </div>
  );
};

/**
 * Demo 1: Re-render cuando el padre se re-renderiza
 */
const ParentChildDemo = () => {
  useTrackRender('ParentDemo', 'RenderDemo');
  const [parentCount, setParentCount] = useState(0);

  return (
    <div className="demo-section">
      <h3>📦 Caso 1: Re-render del Padre</h3>
      <p className="demo-explanation">
        Cuando el estado del padre cambia, <strong>todos los hijos</strong> se 
        re-renderizan, aunque sus props no cambien.
      </p>
      
      <div className="demo-content">
        <button 
          className="demo-button"
          onClick={() => setParentCount(c => c + 1)}
        >
          Actualizar Padre ({parentCount})
        </button>
        
        <div className="children-container">
          <ChildA />
          <ChildB message="Soy Child B" />
        </div>
      </div>
    </div>
  );
};

const ChildA = () => {
  useTrackRender('ChildA', 'ParentDemo');
  return <div className="child-box child-a">Child A (sin props)</div>;
};

const ChildB = ({ message }: { message: string }) => {
  useTrackRender('ChildB', 'ParentDemo');
  return <div className="child-box child-b">{message}</div>;
};

/**
 * Demo 2: Re-render por cambio de estado propio
 */
const StateDemo = () => {
  useTrackRender('StateDemo', 'RenderDemo');
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  return (
    <div className="demo-section">
      <h3>🔄 Caso 2: Cambio de Estado Propio</h3>
      <p className="demo-explanation">
        Cada vez que el estado de un componente cambia con <code>useState</code>, 
        el componente se re-renderiza.
      </p>
      
      <div className="demo-content">
        <div className="state-controls">
          <button 
            className="demo-button"
            onClick={() => setCount(c => c + 1)}
          >
            Count: {count}
          </button>
          
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Escribe algo..."
            className="demo-input"
          />
        </div>
        <p className="state-display">
          Estado actual: count={count}, text="{text}"
        </p>
      </div>
    </div>
  );
};

/**
 * Demo 3: Optimización con React.memo
 */
const MemoDemo = () => {
  useTrackRender('MemoDemo', 'RenderDemo');
  const [count, setCount] = useState(0);

  return (
    <div className="demo-section">
      <h3>⚡ Caso 3: Optimización con memo()</h3>
      <p className="demo-explanation">
        <code>React.memo()</code> evita re-renders innecesarios si las props no cambian.
        Compara los dos hijos:
      </p>
      
      <div className="demo-content">
        <button 
          className="demo-button"
          onClick={() => setCount(c => c + 1)}
        >
          Actualizar MemoDemo ({count})
        </button>
        
        <div className="children-container">
          <NormalChild label="Sin memo (se re-renderiza)" />
          <MemoizedChild label="Con memo (no se re-renderiza)" />
        </div>
      </div>
    </div>
  );
};

const NormalChild = ({ label }: { label: string }) => {
  useTrackRender('NormalChild', 'MemoDemo');
  return <div className="child-box normal">{label}</div>;
};

const MemoizedChild = memo(({ label }: { label: string }) => {
  useTrackRender('MemoizedChild', 'MemoDemo');
  return <div className="child-box memoized">{label}</div>;
});
