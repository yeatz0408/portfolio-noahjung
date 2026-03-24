import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Home from './pages/Home.tsx'

function App() {
  return (
    <div className="p-10 bg-red-500 text-white text-3xl">
      <Home />
    </div>
  )
}

export default App
