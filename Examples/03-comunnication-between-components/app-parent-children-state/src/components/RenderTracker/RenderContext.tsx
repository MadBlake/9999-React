import { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';

interface RenderLog {
  id: string;
  componentName: string;
  timestamp: number;
  renderCount: number;
  parentComponent?: string;
}

// Contexto para ESCRIBIR logs (no causa re-renders en los componentes)
interface RenderLoggerContextType {
  logRender: (componentName: string, parentComponent?: string) => void;
}

// Datos del snapshot
interface RenderSnapshot {
  logs: RenderLog[];
  componentCounts: Record<string, number>;
}

// Contexto para LEER logs (solo lo usa el Visualizer)
interface RenderDataContextType {
  getSnapshot: () => RenderSnapshot;
  clearLogs: () => void;
  isTrackingEnabled: boolean;
  toggleTracking: () => void;
  subscribe: (listener: () => void) => () => void;
}

const RenderLoggerContext = createContext<RenderLoggerContextType | undefined>(undefined);
const RenderDataContext = createContext<RenderDataContextType | undefined>(undefined);

// Store global para los datos (fuera del ciclo de React)
const renderStore = {
  logs: [] as RenderLog[],
  componentCounts: {} as Record<string, number>,
  isTrackingEnabled: true,
  listeners: new Set<() => void>(),
  
  notify() {
    this.listeners.forEach(listener => listener());
  }
};

export const RenderProvider = ({ children }: { children: ReactNode }) => {
  const [isTracking, setIsTracking] = useState(true);

  // Función para registrar renders (NO actualiza estado de React)
  const logRender = useCallback((componentName: string, parentComponent?: string) => {
    if (!renderStore.isTrackingEnabled) return;
    
    // Actualizar store global
    const newCount = (renderStore.componentCounts[componentName] || 0) + 1;
    renderStore.componentCounts[componentName] = newCount;
    
    const newLog: RenderLog = {
      id: `${componentName}-${Date.now()}-${Math.random()}`,
      componentName,
      timestamp: Date.now(),
      renderCount: newCount,
      parentComponent
    };
    
    renderStore.logs = [...renderStore.logs.slice(-49), newLog];
    
    // Notificar a los listeners (el Visualizer)
    renderStore.notify();
  }, []);

  const clearLogs = useCallback(() => {
    renderStore.logs = [];
    renderStore.componentCounts = {};
    renderStore.notify();
  }, []);

  const toggleTracking = useCallback(() => {
    renderStore.isTrackingEnabled = !renderStore.isTrackingEnabled;
    setIsTracking(renderStore.isTrackingEnabled);
  }, []);

  const subscribe = useCallback((listener: () => void) => {
    renderStore.listeners.add(listener);
    return () => {
      renderStore.listeners.delete(listener);
    };
  }, []);

  // Función para obtener datos actuales del store
  const getSnapshot = useCallback(() => ({
    logs: renderStore.logs,
    componentCounts: renderStore.componentCounts
  }), []);

  return (
    <RenderLoggerContext.Provider value={{ logRender }}>
      <RenderDataContext.Provider value={{ 
        getSnapshot,
        clearLogs,
        isTrackingEnabled: isTracking,
        toggleTracking,
        subscribe
      }}>
        {children}
      </RenderDataContext.Provider>
    </RenderLoggerContext.Provider>
  );
};

// Hook para componentes que SOLO quieren registrar renders (no causa re-renders)
export const useRenderLogger = () => {
  const context = useContext(RenderLoggerContext);
  if (!context) {
    throw new Error('useRenderLogger debe usarse dentro de RenderProvider');
  }
  return context;
};

// Hook para el Visualizer que necesita LEER los datos
export const useRenderData = () => {
  const context = useContext(RenderDataContext);
  if (!context) {
    throw new Error('useRenderData debe usarse dentro de RenderProvider');
  }
  return context;
};

// Hook legacy para compatibilidad
export const useRenderTracker = () => {
  const logger = useRenderLogger();
  const data = useRenderData();
  return { ...logger, ...data };
};
