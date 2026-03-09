import { useEffect, useState } from 'react';
import { useRenderData } from './RenderContext';
import './ComponentTree.css';

interface TreeNode {
  name: string;
  children: TreeNode[];
}

/**
 * Visualiza el árbol de componentes de React.
 * Muestra la jerarquía de componentes y cuántas veces se han renderizado.
 */
export const ComponentTree = () => {
  const { getSnapshot, subscribe } = useRenderData();
  const [, forceUpdate] = useState(0);

  // Suscribirse a los cambios del store
  useEffect(() => {
    const unsubscribe = subscribe(() => {
      forceUpdate(n => n + 1);
    });
    return unsubscribe;
  }, [subscribe]);

  // Obtener snapshot actual
  const { componentCounts, logs } = getSnapshot();

  // Generar árbol dinámicamente basado en los componentes registrados
  const buildDynamicTree = (): TreeNode => {
    const childrenMap: Map<string, Set<string>> = new Map();
    const allComponents = new Set<string>();
    const hasParent = new Set<string>();
    
    // Procesar logs para encontrar relaciones padre-hijo
    logs.forEach(log => {
      allComponents.add(log.componentName);
      if (log.parentComponent) {
        allComponents.add(log.parentComponent);
        hasParent.add(log.componentName);
        
        if (!childrenMap.has(log.parentComponent)) {
          childrenMap.set(log.parentComponent, new Set());
        }
        childrenMap.get(log.parentComponent)!.add(log.componentName);
      }
    });

    // Encontrar componentes raíz (sin padre)
    const rootComponents = [...allComponents].filter(c => !hasParent.has(c));

    // Construir nodo recursivamente
    const buildNode = (name: string): TreeNode => {
      const children = childrenMap.get(name) || new Set();
      return {
        name,
        children: [...children].map(childName => buildNode(childName))
      };
    };

    // Si hay componentes, crear árbol
    if (rootComponents.length > 0) {
      // Si solo hay un root, usarlo directamente
      if (rootComponents.length === 1) {
        return buildNode(rootComponents[0]);
      }
      // Si hay varios roots, crear un nodo App virtual
      return {
        name: 'Root',
        children: rootComponents.map(name => buildNode(name))
      };
    }

    // Si no hay componentes, mostrar mensaje
    return { name: 'Sin componentes', children: [] };
  };

  const tree = buildDynamicTree();

  const renderNode = (node: TreeNode, isLast: boolean = true, depth: number = 0) => {
    const count = componentCounts[node.name] || 0;
    const isRendered = count > 0;
    const hasChildren = node.children.length > 0;
    
    return (
      <div key={node.name} className={`tree-node ${isLast ? 'last-child' : ''}`}>
        {depth > 0 && (
          <span className="tree-branch-line">
            {isLast ? '└── ' : '├── '}
          </span>
        )}
        <div className={`node-content ${isRendered ? 'rendered' : ''}`}>
          <span className="node-icon">
            {hasChildren ? '📦' : '📄'}
          </span>
          <span className="node-name">{`<${node.name} />`}</span>
          {count > 0 && (
            <span className={`node-count ${count > 1 ? 'multiple' : ''}`}>
              {count}x
            </span>
          )}
        </div>
        {hasChildren && (
          <div className="tree-children-group">
            {node.children.map((child, i) => 
              renderNode(child, i === node.children.length - 1, depth + 1)
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="component-tree">
      <h3>🌳 Árbol de Componentes</h3>
      <p className="tree-description">
        Visualización de la jerarquía de componentes
      </p>
      <div className="tree-container">
        {renderNode(tree)}
      </div>
      <div className="tree-legend">
        <span className="legend-item">
          <span className="legend-dot rendered"></span> Renderizado
        </span>
        <span className="legend-item">
          <span className="legend-dot multiple"></span> Re-renderizado
        </span>
      </div>
    </div>
  );
};
