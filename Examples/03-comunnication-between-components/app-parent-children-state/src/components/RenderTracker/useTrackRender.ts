import { useEffect } from 'react';
import { useRenderLogger } from './RenderContext';

// Contador global por componente (fuera del ciclo de React)
const renderCounts: Map<string, number> = new Map();

/**
 * Hook personalizado para rastrear cuándo un componente se renderiza.
 * Úsalo al inicio de cualquier componente funcional para ver cuándo se renderiza.
 * 
 * Este hook NO causa re-renders adicionales - solo registra los renders que ya ocurren.
 * 
 * @param componentName - Nombre del componente a rastrear
 * @param parentComponent - Nombre del componente padre (opcional)
 * 
 * @example
 * function MiComponente() {
 *   useTrackRender('MiComponente', 'App');
 *   return <div>Hola</div>;
 * }
 */
export const useTrackRender = (componentName: string, parentComponent?: string) => {
  const { logRender } = useRenderLogger();
  
  // Usamos useEffect para registrar el render (evita acceso a refs durante render)
  useEffect(() => {
    // Incrementar contador global
    const count = (renderCounts.get(componentName) || 0) + 1;
    renderCounts.set(componentName, count);
    
    logRender(componentName, parentComponent);
    
    // Log en consola para depuración
    console.log(
      `%c🔄 RENDER: ${componentName} %c(#${count})`,
      'color: #61dafb; font-weight: bold;',
      'color: #888;'
    );
  });

  // Limpiar contador cuando el componente se desmonta
  useEffect(() => {
    return () => {
      const current = renderCounts.get(componentName) || 0;
      if (current > 0) {
        renderCounts.set(componentName, current - 1);
      }
    };
  }, [componentName]);

  return renderCounts.get(componentName) || 0;
};
