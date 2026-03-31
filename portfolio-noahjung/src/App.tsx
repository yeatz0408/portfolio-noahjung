import './App.css'
import Home from './pages/Home.tsx'
import TestArea from './pages/TestArea.tsx'
import { Routes, Route } from "react-router-dom"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/testarea" element={<TestArea />} />
    </Routes>
  )
}

export default App
