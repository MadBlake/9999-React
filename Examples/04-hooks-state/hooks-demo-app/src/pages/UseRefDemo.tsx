import { useState, useRef, useEffect } from 'react'
import FocusDemo from '../components/useRef/FocusDemo'
import ValorAnterior from '../components/useRef/ValorAnterior'
import ComptadorRenders from '../components/useRef/ComptadorRenders'
import Cronometre from '../components/useRef/Cronometre'

export default function UseRefDemo() {
  return (
    <>
      <h1>useRef</h1>
      <p className="subtitle">Referències al DOM i variables persistents silencioses</p>

      <div className="demo-section">
        <h2>Accés al DOM — Focus </h2>
        <FocusDemo />
        <div className="code-preview">
          {`const inputRef = useRef<HTMLInputElement>(null);
// ...
<input ref={inputRef} />
inputRef.current?.focus();`}
        </div>
      </div>

      <div className="demo-section">
        <h2>Variable mutable — Cronòmetre</h2>
        <Cronometre />
        <div className="code-preview">
          {`const intervalRef = useRef<number | null>(null);
// L'ID de l'interval persisteix sense causar re-renders`}
        </div>
      </div>

      <div className="demo-section">
        <h2>Comptador de renders (silent ref)</h2>
        <ComptadorRenders />
      </div>

      <div className="demo-section">
        <h2>Guardar valor anterior</h2>
        <ValorAnterior />
        <div className="code-preview">
          {`const prevRef = useRef(valor);
useEffect(() => { prevRef.current = valor }, [valor]);`}
        </div>
      </div>
    </>
  )
}
