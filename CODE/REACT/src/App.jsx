import React from 'react'
import Navbar from './component/navbar/Navbar'
import Credits from './pages/Credits'
import { Routes, Route } from "react-router-dom";
import Resources from './pages/Resources';
const App = () => {
  return (
    <>
    <Navbar />
    <Routes>
         <Route path="/resources" element={<Resources/>} />
        <Route path="/credits" element={<Credits />} />
      </Routes>
    </>
  )
}
export default App