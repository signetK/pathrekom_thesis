import { Routes, Route } from 'react-router-dom'
import './index.css'
import Home from './pages/Home.jsx'
import ProgramSelect from './pages/ProgramSelect.jsx'
import GradeInput from './pages/GradeInput.jsx'
import Result from './pages/Result.jsx'
import About from './pages/AboutUs.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/grade-input" element={<GradeInput />} />
      <Route path="/result" element={<Result />} />
      <Route path="/about" element={<About />} />
    </Routes>
  )
}

export default App