import React from 'react'
import Navbar from './component/navbar/Navbar'
import Home from './pages/Home'
import { Routes, Route } from "react-router-dom";
const App = () => {
  return (
    <>
    <Navbar />
    <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  )
}

export default App
