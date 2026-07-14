import React, { useState } from 'react';
import './ChooseSubject.css';
import Unicard from "../../component/universal_card/Unicard";
import {Link} from 'react-router-dom';
import { 
  LineChart, 
  BrainCircuit, 
  Cog, 
  Monitor, 
  Code, 
  ArrowRight,
  Atom,     // For Physics
  Zap,      // For Electrical
  Cpu,      // For Electronics
  Leaf      // For EVS
} from 'lucide-react';

const ChooseSubject = () => {
  const [activeGroup, setActiveGroup] = useState('electrical');

  const allSubjects = {
    dsa: { heading: "DSA", para: "Data Structures and Algorithms", icon: <LineChart size={35} strokeWidth={1.5} /> },
    maths: { heading: "MATHS", para: "Mathematics for Problem Solving", icon: <span style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontWeight: 'bold', fontSize: '28px', lineHeight: '1' }}>f(x)</span> },
    physics: { heading: "PHYSICS", para: "Engineering Physics and Applications", icon: <Atom size={35} strokeWidth={1.5} /> },
    evs: { heading: "EVS", para: "Environmental Studies and Sustainability", icon: <Leaf size={35} strokeWidth={1.5} /> },
    ai: { heading: "AI", para: "Artificial Intelligence Fundamentals", icon: <BrainCircuit size={35} strokeWidth={1.5} /> },
    electrical: { heading: "ELECTRICAL", para: "Basic Electrical Engineering", icon: <Zap size={35} strokeWidth={1.5} /> },
    softSkill: { heading: "SOFT SKILL", para: "Soft Skills and Personal Development", icon: <Code size={35} strokeWidth={1.5} /> },
    dt: { heading: "DT", para: "Digital Techniques and Logic Design", icon: <Monitor size={35} strokeWidth={1.5} /> },
    mechanics: { heading: "MECHANICS", para: "Engineering Mechanics and Dynamics", icon: <Cog size={35} strokeWidth={1.5} /> },
    electronics: { heading: "ELECTRONICS", para: "Fundamentals of Electronics Engineering", icon: <Cpu size={35} strokeWidth={1.5} /> }
  };

  const electricalCurriculum = [allSubjects.dsa, allSubjects.maths, allSubjects.physics, allSubjects.evs, allSubjects.ai, allSubjects.electrical];
  const electronicsCurriculum = [allSubjects.dsa, allSubjects.maths, allSubjects.softSkill, allSubjects.dt, allSubjects.mechanics, allSubjects.electronics];

  const displayedSubjects = activeGroup === 'electrical' ? electricalCurriculum : electronicsCurriculum;

  return (
    <div className="choose-subject-wrapper">
      <div className="choose-subject-container">
        <div className="header-section">
          <div className="title-container">
            <h1 className="page-title">CHOOSE SUBJECT</h1>
            <p className="page-subtitle">Select a subject to explore all related resources, notes, previous papers and more.</p>
          </div>
          <div className="semester-container">
            <span className="semester-label">GROUP</span>
            <div className="semester-buttons">
              <button className={`sem-btn ${activeGroup === 'electrical' ? 'active' : ''}`} onClick={() => setActiveGroup('electrical')}>Electrical</button>
              <button className={`sem-btn ${activeGroup === 'electronics' ? 'active' : ''}`} onClick={() => setActiveGroup('electronics')}>Electronics</button>
            </div>
          </div>
        </div>
        <div className="subject-grid">
          {displayedSubjects.map((subject, index) => (
            <Link
  to="/subject"
  state={{
    heading: subject.heading,
    para: subject.para
  }}
  style={{ textDecoration: 'none', color: 'inherit' }}
  key={index}
>
              <Unicard 
                key={index} heading={subject.heading} para={subject.para} icon={subject.icon}
                btnn={<div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>Explore <ArrowRight size={16} /></div>}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChooseSubject;