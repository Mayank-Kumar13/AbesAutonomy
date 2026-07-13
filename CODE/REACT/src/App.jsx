import React from 'react';
import Navbar from './component/navbar/Navbar';
import Credits from './pages/Credits';
import HomeContent from './component/home/HomeContent';
import { Routes, Route } from "react-router-dom";
import Resources from './pages/Resources';
import Amcat from './pages/Amcat';
import Footer from './component/footer/Footer';
import ChooseSubject from './pages/choosesubject/ChooseSubject';
import Scroll from "./component/Scroll";
const App = () => {
  return (
    <>
    <Navbar />
    <Scroll />
    <Routes>
        <Route path="/" element={<HomeContent />} />
         <Route path="/resources" element={<Resources/>} />
        <Route path="/credits" element={<Credits />} />
        <Route path="/amcat" element={<Amcat />} />
        <Route path="/Choosesubject" element={<ChooseSubject />} />
      </Routes>
      <Footer />
    </>
  )
}
export default App;