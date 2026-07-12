import React from 'react'
import Navbar from './component/navbar/Navbar'
import Credits from './pages/Credits'
import { Routes, Route } from "react-router-dom";
const App = () => {
  return (
    <>
    <Navbar />
    <Routes>
        
        <Route path="/credits" element={<Credits />} />
      </Routes>
    </>
  )
}
export default App