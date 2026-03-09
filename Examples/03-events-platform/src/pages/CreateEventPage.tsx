import EventForm from '../components/Events/EventForm'
import './CreateEventPage.css'

function CreateEventPage() {
  return (
    <div className="create-event-page">
      <div className="create-event-header">
        <h1>✨ Crear Nuevo Evento</h1>
        <p>Completa los datos de tu evento para publicarlo</p>
      </div>

      <EventForm />
    </div>
  )
}

export default CreateEventPage
