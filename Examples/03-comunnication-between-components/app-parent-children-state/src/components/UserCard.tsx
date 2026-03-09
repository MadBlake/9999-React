import { useTrackRender } from './RenderTracker';

interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
}

interface UserCardProps {
  user: User;
  onEdit: (id: number) => void;
}

export const UserCard = ({ user, onEdit }: UserCardProps) => {
  // Hook para rastrear el renderizado de este componente
  useTrackRender('UserCard', 'Container');
  
  return (
    <div className="card">
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <button onClick={() => onEdit(user.id)}>Editar</button>
    </div>
  );
};