import { useState } from 'react';
import InputBasico from './components/01-InputBasico';
import TextAreaDemo from './components/02-TextArea';
import SelectDropdown from './components/03-SelectDropdown';
import CheckboxRadio from './components/04-CheckboxRadio';
import FormularioCompleto from './components/05-FormularioCompleto';
import FormularioAvanzado from './components/06-FormularioAvanzado';
import FormularioReactHookForm from './components/07-FormularioReactHookForm';
import FormularioFormik from './components/08-FormularioFormik';
import './App.css';

export default function App() {
  const [demo, setDemo] = useState(0);

  const demos = [
    { id: 0, nombre: 'Input Básico', component: InputBasico },
    { id: 1, nombre: 'Textarea', component: TextAreaDemo },
    { id: 2, nombre: 'Select', component: SelectDropdown },
    { id: 3, nombre: 'Checkboxes & Radios', component: CheckboxRadio },
    { id: 4, nombre: 'Formulario Completo', component: FormularioCompleto },
    { id: 5, nombre: 'Avanzado (onBlur)', component: FormularioAvanzado },
    { id: 6, nombre: 'React Hook Form', component: FormularioReactHookForm },
    { id: 7, nombre: 'Formik', component: FormularioFormik },
  ];

  const CurrentDemo = demos[demo].component;

  return (
    <div className="app">
      <header className="header">
        <h1>📋 Formularios Controlados en React</h1>
        <p>Aprende cómo manejar inputs, textareas, selects, checkboxes y radio buttons</p>
      </header>

      <nav className="nav-demos">
        {demos.map((d) => (
          <button
            key={d.id}
            className={`nav-btn ${demo === d.id ? 'active' : ''}`}
            onClick={() => setDemo(d.id)}
          >
            {d.nombre}
          </button>
        ))}
      </nav>

      <main className="main-content">
        <CurrentDemo />
      </main>

      <footer className="footer">
        <p>
          ✨ Conceptos cubiertos: <code>useState</code>, <code>onChange</code>,
          <code>value</code>, <code>checked</code>, Computed Properties, <code>onBlur</code>, Touched,
          <code>react-hook-form</code>, <code>Formik</code>, <code>Yup</code>
        </p>
      </footer>
    </div>
  );
}
