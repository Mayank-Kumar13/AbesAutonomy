import React from 'react'
import Navbar from './component/navbar/Navbar'
import Credits from './pages/Credits'
import { Routes, Route } from "react-router-dom";
import Resources from './pages/Resources';
import Amcat from './pages/Amcat';
const App = () => {
  return (
    <>
    <Navbar />
    <Routes>
         <Route path="/resources" element={<Resources/>} />
        <Route path="/credits" element={<Credits />} />
        <Route path="/amcat" element={<Amcat />} />
      </Routes>
    </>
  )
}
export default App