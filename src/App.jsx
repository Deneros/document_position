import './App.css'
import { Routes, Route } from "react-router-dom";
import Positioning from './pages/Positioning/Positioning';
import Signing from './pages/Signing/Signing';

function App() {
  // <Signing></Signing>

  return (
    <>
      <Routes>
        <Route element={<Signing />} path="/signing/:id"></Route>
        <Route element={<Positioning />} path="/positioning" />
      </Routes>
    </>
  )
}

export default App
