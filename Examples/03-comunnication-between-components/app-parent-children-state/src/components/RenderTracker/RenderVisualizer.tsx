import { useEffect, useState, type ReactNode } from 'react';
import { useRenderData } from './RenderContext';
import './RenderVisualizer.css';

/**
 * Componente que muestra visualmente los renderizados de React.
 * Útil para que los alumnos entiendan cuándo y por qué se re-renderizan los componentes.
 */
export const RenderVisualizer = () => {
  const { getSnapshot, clearLogs, isTrackingEnabled, toggleTracking, subscribe } = useRenderData();
  const [, forceUpdate] = useState(0);
  const [isCollapsed, setIsCollapsed] = useState(true);

  // Suscribirse a los cambios del store para forzar re-render
  useEffect(() => {
    const unsubscribe = subscribe(() => {
      forceUpdate(n => n + 1);
    });
    return unsubscribe;
  }, [subscribe]);

  // Obtener snapshot actual de los datos
  const { logs, componentCounts } = getSnapshot();

  const getColorForComponent = (name: string) => {
    const colors = [
      '#61dafb', '#f0db4f', '#68a063', '#e34c26', 
      '#663399', '#ff6b6b', '#4ecdc4', '#ffd93d'
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  return (
    <div className={`render-visualizer ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="render-header">
        <h3>🔍 Monitor de Renderizado</h3>
        <div className="render-controls">
          <button 
            className={`toggle-btn ${isTrackingEnabled ? 'active' : ''}`}
            onClick={toggleTracking}
          >
            {isTrackingEnabled ? '⏸️ Pausar' : '▶️ Reanudar'}
          </button>
          <button className="clear-btn" onClick={clearLogs}>
            🗑️ Limpiar
          </button>
          <button 
            className="collapse-btn" 
            onClick={() => setIsCollapsed(!isCollapsed)}
            title={isCollapsed ? 'Expandir' : 'Minimizar'}
          >
            {isCollapsed ? '🔼' : '🔽'}
          </button>
        </div>
      </div>

      {!isCollapsed && (
        <>
      <div className="render-stats">
        <h4>🌳 Jerarquía de Componentes</h4>
        <div className="hierarchy-tree">
          {(() => {
            // Construir mapa de relaciones padre-hijo
            const childrenMap: Map<string, string[]> = new Map();
            const hasParent = new Set<string>();
            
            logs.forEach(log => {
              if (log.parentComponent) {
                hasParent.add(log.componentName);
                const children = childrenMap.get(log.parentComponent) || [];
                if (!children.includes(log.componentName)) {
                  children.push(log.componentName);
                  childrenMap.set(log.parentComponent, children);
                }
              }
            });

            // Encontrar componentes raíz
            const roots = Object.keys(componentCounts).filter(name => !hasParent.has(name));

            // Renderizar nodo del árbol recursivamente
            const renderTreeNode = (name: string, isLast: boolean = true, depth: number = 0): ReactNode => {
              const count = componentCounts[name] || 0;
              const children = childrenMap.get(name) || [];
              const hasChildren = children.length > 0;
              
              return (
                <div key={name} className={`tree-node-item ${isLast ? 'last-child' : ''}`}>
                  <div className="tree-node-row">
                    {depth > 0 && (
                      <span className="tree-connector">
                        {isLast ? '└─ ' : '├─ '}
                      </span>
                    )}
                    <div 
                      className="tree-node-content"
                      style={{ borderLeftColor: getColorForComponent(name) }}
                    >
                      <span className="tree-icon">{hasChildren ? '📦' : '📄'}</span>
                      <span className="tree-name">{name}</span>
                      <span className="tree-count">{count}x</span>
                    </div>
                  </div>
                  {hasChildren && (
                    <div className="tree-node-children">
                      {children.map((child, i) => 
                        renderTreeNode(child, i === children.length - 1, depth + 1)
                      )}
                    </div>
                  )}
                </div>
              );
            };

            if (roots.length === 0) {
              return <p className="no-logs">No hay componentes registrados...</p>;
            }

            return roots.map(root => renderTreeNode(root));
          })()}
        </div>
      </div>

      <div className="render-timeline">
        <h4>📜 Timeline de Renderizados</h4>
        <div className="timeline-container">
          {logs.length === 0 ? (
            <p className="no-logs">No hay renderizados registrados aún...</p>
          ) : (
            logs.slice().reverse().map((log) => (
              <div 
                key={log.id} 
                className="timeline-item"
                style={{ borderLeftColor: getColorForComponent(log.componentName) }}
              >
                <div className="timeline-content">
                  <span className="timeline-component">{log.componentName}</span>
                  {log.parentComponent && (
                    <span className="timeline-parent">← {log.parentComponent}</span>
                  )}
                </div>
                <span className="timeline-time">
                  {new Date(log.timestamp).toLocaleTimeString()}
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="render-explanation">
        <h4>💡 ¿Por qué se re-renderiza un componente?</h4>
        <ul>
          <li><strong>Cambio de estado (useState)</strong>: Cuando el estado interno cambia</li>
          <li><strong>Cambio de props</strong>: Cuando las props que recibe cambian</li>
          <li><strong>Re-render del padre</strong>: Cuando el componente padre se re-renderiza</li>
          <li><strong>Cambio de contexto</strong>: Cuando un contexto que consume cambia</li>
        </ul>
      </div>
        </>
      )}
    </div>
  );
};
