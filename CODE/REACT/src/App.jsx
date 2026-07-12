import React from 'react';
import Navbar from './component/navbar/Navbar';
import Credits from './pages/Credits';
import HomeContent from './component/home/HomeContent';
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div className="bg-[#080b0e] min-h-screen w-full flex flex-col">
      
      {/* Navbar stays full-width at the top */}
      <Navbar />
      
      {/* This wrapper automatically limits the width and centers everything below the Navbar */}
      <div className="w-full flex-grow flex flex-col">
        <Routes>
          <Route path="/" element={<HomeContent />} />
          <Route path="/credits" element={<Credits />} />
        </Routes>
      </div>
      </div>

    
  );
}

export default App;