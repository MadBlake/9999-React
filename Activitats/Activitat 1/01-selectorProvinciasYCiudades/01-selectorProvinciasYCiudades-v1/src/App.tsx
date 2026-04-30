import { useState } from 'react'
import ProvinceSelector from './components/ProvinceSelector'
import './App.css'

function App() {
  return (
    <div className="app-container">
      <h1>Selector de Provincias y Ciudades</h1>
      <ProvinceSelector />
    </div>
  )
}

export default App
