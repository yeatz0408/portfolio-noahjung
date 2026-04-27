import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.tsx';
import TestArea from './pages/TestArea.tsx';
import Career from './pages/Career.tsx';
import Workout from './pages/Workout.tsx';
import About from './pages/About.tsx';
import Contact from './pages/Contact.tsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/testarea" element={<TestArea />} />
      <Route path="/career" element={<Career />} />
      <Route path="/workout" element={<Workout />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
}

export default App;
