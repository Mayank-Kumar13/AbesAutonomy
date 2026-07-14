import React from 'react';
import Navbar from './component/navbar/Navbar';
import Credits from './pages/Credits';
import HomeContent from './component/home/HomeContent';
import { Routes, Route } from "react-router-dom";
import Resources from './pages/Resources';
// import Amcat from './pages/Amcat';
import Footer from './component/footer/Footer';
import ChooseSubject from './pages/choosesubject/ChooseSubject';
import Scroll from "./component/Scroll";
import Subject from './pages/subject/Subject';
import Pdfpreview from "./pages/Pdfpreview";
import { useLocation } from "react-router-dom";
import LoginPage from './pages/loginPage/LoginPage';
import Profile from './pages/profile/Profile';
const App = () => {
  return (
    <>
    
    {useLocation().pathname !== "/amcat" && <Navbar />} 
    <Scroll />
    <Routes>
        <Route path="/" element={<HomeContent />} />
         <Route path="/resources" element={<Resources/>} />
        <Route path="/credits" element={<Credits />} />
        {/* <Route path="/amcat" element={<Amcat />} /> */}
        <Route path="/Choosesubject" element={<ChooseSubject />} />
        <Route path="/Subject" element={<Subject />} />
        <Route path="/amcat" element={<Pdfpreview />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Footer />
    </>
  )
}
export default App;