import { useState, memo, useCallback } from 'react';
import { useTrackRender } from '../RenderTracker';
import './RenderingExample.css';

/**
 * Ejemplo educativo que demuestra:
 * 1. Renderizado completo: cuando el padre se re-renderiza, TODOS los hijos lo hacen
 * 2. Renderizado parcial con memo(): solo se re-renderiza si sus props cambian
 * 3. Renderizado aislado: estado local que solo afecta a un componente
 */
export const RenderingExample = () => {
  useTrackRender('RenderingExample');

  return (
    <div className="rendering-example">
      <header className="example-header">
        <h1>🎓 Entendiendo el Renderizado en React</h1>
        <p>Observa el panel de renderizado mientras interactúas con cada sección</p>
      </header>

      <div className="examples-grid">
        <FullRenderExample />
        <PartialRenderExample />
        <IsolatedRenderExample />
      </div>

      <ConceptsExplanation />
      <ComponentDependencyTree />
    </div>
  );
};

/**
 * EJEMPLO 1: Renderizado Completo
 * Cuando el estado del padre cambia, TODOS los hijos se re-renderizan
 */
const FullRenderExample = () => {
  useTrackRender('FullRenderExample', 'RenderingExample');
  const [parentState, setParentState] = useState(0);

  return (
    <section className="example-section full-render">
      <div className="section-header">
        <span className="section-icon">🔴</span>
        <h2>Renderizado Completo</h2>
      </div>
      
      <div className="section-explanation">
        <p>
          Cuando el <strong>estado del padre</strong> cambia, React re-renderiza 
          el padre y <strong>todos sus hijos</strong>, aunque no usen ese estado.
        </p>
      </div>

      <div className="demo-area">
        <div className="parent-box">
          <span className="box-label">Padre</span>
          <p>Estado: {parentState}</p>
          <button onClick={() => setParentState(s => s + 1)}>
            Cambiar Estado del Padre
          </button>
          
          <div className="children-row">
            <ChildNormal name="Hijo A" />
            <ChildNormal name="Hijo B" />
            <ChildNormal name="Hijo C" />
          </div>
        </div>
      </div>

      <div className="result-note">
        💡 <strong>Resultado:</strong> Al hacer clic, los 3 hijos se re-renderizan 
        aunque ninguno usa <code>parentState</code>
      </div>
    </section>
  );
};

const ChildNormal = ({ name }: { name: string }) => {
  useTrackRender(name, 'FullRenderExample');
  return (
    <div className="child-box normal-child">
      <span>{name}</span>
      <small>(sin memo)</small>
    </div>
  );
};

/**
 * EJEMPLO 2: Renderizado Parcial con memo()
 * Solo se re-renderizan los componentes cuyas props cambian
 */
const PartialRenderExample = () => {
  useTrackRender('PartialRenderExample', 'RenderingExample');
  const [countA, setCountA] = useState(0);
  const [countB, setCountB] = useState(0);

  // useCallback para evitar que la función se recree en cada render
  const incrementA = useCallback(() => setCountA(c => c + 1), []);
  const incrementB = useCallback(() => setCountB(c => c + 1), []);

  return (
    <section className="example-section partial-render">
      <div className="section-header">
        <span className="section-icon">🟡</span>
        <h2>Renderizado Parcial (memo)</h2>
      </div>
      
      <div className="section-explanation">
        <p>
          Con <code>React.memo()</code>, un componente <strong>solo se re-renderiza 
          si sus props cambian</strong>. Compara referencias, no valores profundos.
        </p>
      </div>

      <div className="demo-area">
        <div className="parent-box">
          <span className="box-label">Padre</span>
          
          <div className="children-row">
            <MemoizedChild 
              name="Memo A" 
              count={countA} 
              onIncrement={incrementA}
            />
            <MemoizedChild 
              name="Memo B" 
              count={countB} 
              onIncrement={incrementB}
            />
          </div>
        </div>
      </div>

      <div className="result-note">
        💡 <strong>Resultado:</strong> Cada botón solo re-renderiza SU componente, 
        el otro permanece intacto gracias a <code>memo()</code>
      </div>
    </section>
  );
};

interface MemoizedChildProps {
  name: string;
  count: number;
  onIncrement: () => void;
}

const MemoizedChild = memo(({ name, count, onIncrement }: MemoizedChildProps) => {
  useTrackRender(name, 'PartialRenderExample');
  return (
    <div className="child-box memo-child">
      <span>{name}</span>
      <p>Cuenta: {count}</p>
      <button onClick={onIncrement}>+1</button>
      <small>(con memo)</small>
    </div>
  );
});

/**
 * EJEMPLO 3: Renderizado Aislado (3 niveles de profundidad)
 * El estado local de un hijo NO afecta al padre ni a sus hermanos
 */
const IsolatedRenderExample = () => {
  useTrackRender('IsolatedRenderExample', 'RenderingExample');

  return (
    <section className="example-section isolated-render">
      <div className="section-header">
        <span className="section-icon">🟢</span>
        <h2>Renderizado Aislado (3 niveles)</h2>
      </div>
      
      <div className="section-explanation">
        <p>
          El <strong>estado local</strong> de un componente solo provoca 
          re-render en <strong>ese componente y sus descendientes</strong>, 
          no en el padre, hermanos ni ancestros.
        </p>
      </div>

      <div className="demo-area">
        <div className="parent-box nested-hierarchy">
          <span className="box-label">Nivel 1: IsolatedRenderExample</span>
          
          <div className="children-row">
            <IsolatedLevel2 name="Nivel2-A" />
            <IsolatedLevel2 name="Nivel2-B" />
          </div>
        </div>
      </div>

      <div className="result-note">
        💡 <strong>Resultado:</strong> Observa cómo al hacer clic en un Nivel 3, 
        solo ese componente se re-renderiza. Sus padres y hermanos NO.
      </div>
    </section>
  );
};

// Nivel 2: Contenedor intermedio
const IsolatedLevel2 = ({ name }: { name: string }) => {
  useTrackRender(name, 'IsolatedRenderExample');

  return (
    <div className="child-box level2-child">
      <span className="level-label">📦 {name}</span>
      <small>(Nivel 2 - sin estado)</small>
      <div className="nested-children">
        <IsolatedLevel3 name={`${name}-Child1`} parentName={name} />
        <IsolatedLevel3 name={`${name}-Child2`} parentName={name} />
      </div>
    </div>
  );
};

// Nivel 3: Componente hoja con estado local
const IsolatedLevel3 = ({ name, parentName }: { name: string; parentName: string }) => {
  useTrackRender(name, parentName);
  const [localCount, setLocalCount] = useState(0);

  return (
    <div className="child-box isolated-child level3-child">
      <span>📄 {name}</span>
      <p>Clicks: {localCount}</p>
      <button onClick={() => setLocalCount(c => c + 1)}>+1</button>
      <small>(Nivel 3 - estado local)</small>
    </div>
  );
};

/**
 * Explicación de conceptos
 */
const ConceptsExplanation = () => {
  return (
    <div className="concepts-section">
      <h2>📚 Resumen de Conceptos</h2>
      
      <div className="concepts-grid">
        <div className="concept-card">
          <h3>🔴 Renderizado en Cascada</h3>
          <p>
            Por defecto, cuando un componente se re-renderiza, React también 
            re-renderiza todos sus hijos (el subárbol completo).
          </p>
          <code>Padre → Hijo A, Hijo B, Hijo C</code>
        </div>

        <div className="concept-card">
          <h3>🟡 Optimización con memo()</h3>
          <p>
            <code>React.memo()</code> memoriza un componente y evita re-renders 
            si las props no han cambiado (comparación superficial).
          </p>
          <code>memo(Component)</code>
        </div>

        <div className="concept-card">
          <h3>🟢 Estado Local Aislado</h3>
          <p>
            El estado local (<code>useState</code>) solo afecta al componente 
            donde se define y a sus descendientes, no a padres ni hermanos.
          </p>
          <code>const [state] = useState()</code>
        </div>

        <div className="concept-card">
          <h3>⚡ useCallback & useMemo</h3>
          <p>
            Memorizan funciones y valores para evitar que se recreen en cada 
            render, importante cuando se pasan como props a componentes memo.
          </p>
          <code>useCallback(fn, deps)</code>
        </div>
      </div>
    </div>
  );
};

/**
 * Árbol visual de dependencia de componentes
 */
const ComponentDependencyTree = () => {
  return (
    <div className="dependency-tree-section">
      <h2>🌳 Árbol de Dependencia de Componentes</h2>
      <p className="tree-description">
        Esta vista muestra la jerarquía completa de componentes de esta página y cómo se relacionan entre sí.
      </p>
      
      <div className="visual-tree">
        {/* Raíz */}
        <div className="tree-level root-level">
          <div className="tree-node root-node">
            <span className="node-icon">🏠</span>
            <span className="node-name">App</span>
          </div>
        </div>

        {/* Nivel 1 */}
        <div className="tree-connector-vertical"></div>
        <div className="tree-level">
          <div className="tree-node page-node">
            <span className="node-icon">📄</span>
            <span className="node-name">RenderingExample</span>
          </div>
        </div>

        {/* Nivel 2 - Los 3 ejemplos */}
        <div className="tree-connector-vertical"></div>
        <div className="tree-branch-container">
          <div className="tree-horizontal-line"></div>
          <div className="tree-level examples-level">
            {/* Full Render */}
            <div className="tree-branch">
              <div className="tree-node example-node full">
                <span className="node-icon">🔴</span>
                <span className="node-name">FullRenderExample</span>
              </div>
              <div className="tree-connector-vertical small"></div>
              <div className="tree-children">
                <div className="tree-node leaf-node">Hijo A</div>
                <div className="tree-node leaf-node">Hijo B</div>
                <div className="tree-node leaf-node">Hijo C</div>
              </div>
            </div>

            {/* Partial Render */}
            <div className="tree-branch">
              <div className="tree-node example-node partial">
                <span className="node-icon">🟡</span>
                <span className="node-name">PartialRenderExample</span>
              </div>
              <div className="tree-connector-vertical small"></div>
              <div className="tree-children">
                <div className="tree-node leaf-node memo">Memo A</div>
                <div className="tree-node leaf-node memo">Memo B</div>
              </div>
            </div>

            {/* Isolated Render */}
            <div className="tree-branch">
              <div className="tree-node example-node isolated">
                <span className="node-icon">🟢</span>
                <span className="node-name">IsolatedRenderExample</span>
              </div>
              <div className="tree-connector-vertical small"></div>
              <div className="tree-children level2">
                <div className="tree-subtree">
                  <div className="tree-node intermediate-node">Nivel2-A</div>
                  <div className="tree-connector-vertical tiny"></div>
                  <div className="tree-grandchildren">
                    <div className="tree-node leaf-node isolated">Child1</div>
                    <div className="tree-node leaf-node isolated">Child2</div>
                  </div>
                </div>
                <div className="tree-subtree">
                  <div className="tree-node intermediate-node">Nivel2-B</div>
                  <div className="tree-connector-vertical tiny"></div>
                  <div className="tree-grandchildren">
                    <div className="tree-node leaf-node isolated">Child1</div>
                    <div className="tree-node leaf-node isolated">Child2</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="tree-legend">
        <h4>Leyenda:</h4>
        <div className="legend-items">
          <div className="legend-item">
            <span className="legend-color full"></span>
            <span>Renderizado completo (sin optimizar)</span>
          </div>
          <div className="legend-item">
            <span className="legend-color partial"></span>
            <span>Optimizado con memo()</span>
          </div>
          <div className="legend-item">
            <span className="legend-color isolated"></span>
            <span>Estado local aislado</span>
          </div>
        </div>
      </div>
    </div>
  );
};
