import { useTrackRender } from './RenderTracker';

interface WelcomeProps {
    name: string;
}

const Welcome = ({ name }: WelcomeProps) => {
    // Hook para rastrear el renderizado de este componente
    useTrackRender('Welcome', 'HomePage');
    
    return (
        <div className="welcome-container">
            <h2>My Welcome Component, {name}</h2>
        </div>
    );
}

export default Welcome