import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Home from './pages/Home.tsx'

function App() {
  return (
    <div className="min-h-screen w-full bg-[url('./assets/img/paper-texture.jpg')] bg-repeat bg-auto">
      <Home />
    </div>
  )
}

export default App
