import type { ReactNode } from 'react';
import { useTrackRender } from './RenderTracker';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

const Container = ({ children, className }: ContainerProps) => {
  // Hook para rastrear el renderizado de este componente
  useTrackRender('Container', 'HomePage');
  
  return <div className={className}>{children}</div>;
};

export default Container;