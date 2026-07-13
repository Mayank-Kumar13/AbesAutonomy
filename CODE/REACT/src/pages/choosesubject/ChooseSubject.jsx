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
  const [activeSem, setActiveSem] = useState(1);

  const subjects = [
    {
      heading: "DSA",
      para: "Data Structures and Algorithms",
      icon: <LineChart size={35} strokeWidth={1.5} />
    },
    {
      heading: "MATHS",
      para: "Mathematics for Problem Solving",
      // Added fontSize: '28px' and lineHeight: '1' to keep it contained in the circle
      icon: <span style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontWeight: 'bold', fontSize: '28px', lineHeight: '1' }}>f(x)</span>
    },
    {
      heading: "AI",
      para: "Artificial Intelligence Fundamentals",
      icon: <BrainCircuit size={35} strokeWidth={1.5} />
    },
    {
      heading: "MECHANICS",
      para: "Engineering Mechanics and Dynamics",
      icon: <Cog size={35} strokeWidth={1.5} />
    },
    {
      heading: "DT",
      para: "Digital Techniques and Logic Design",
      icon: <Monitor size={35} strokeWidth={1.5} />
    },
    {
      heading: "SOFT SKILL",
      para: "Soft Skills and Personal Development",
      icon: <Code size={35} strokeWidth={1.5} />
    },
    {
      heading: "PHYSICS",
      para: "Engineering Physics and Applications",
      icon: <Atom size={35} strokeWidth={1.5} />
    },
    {
      heading: "ELECTRICAL",
      para: "Basic Electrical Engineering",
      icon: <Zap size={35} strokeWidth={1.5} />
    },
    {
      heading: "ELECTRONICS",
      para: "Fundamentals of Electronics Engineering",
      icon: <Cpu size={35} strokeWidth={1.5} />
    },
    {
      heading: "EVS",
      para: "Environmental Studies and Sustainability",
      icon: <Leaf size={35} strokeWidth={1.5} />
    }
  ];

  return (
    <div className="choose-subject-wrapper">
      <div className="choose-subject-container">
        
        {/* Header Area */}
        <div className="header-section">
          <div className="title-container">
            <h1 className="page-title">CHOOSE SUBJECT</h1>
            <p className="page-subtitle">
              Select a subject to explore all related resources, notes, previous papers and more.
            </p>
          </div>

          {/* Semester Selector */}
          <div className="semester-container">
            <span className="semester-label">SEMESTER</span>
            <div className="semester-buttons">
              <button 
                className={`sem-btn ${activeSem === 1 ? 'active' : ''}`}
                onClick={() => setActiveSem(1)}
              >
                1
              </button>
              <button 
                className={`sem-btn ${activeSem === 2 ? 'active' : ''}`}
                onClick={() => setActiveSem(2)}
              >
                2
              </button>
            </div>
          </div>
        </div>

        {/* The Grid mapping your teammate's Unicard */}
        <div className="subject-grid">
          {subjects.map((subject, index) => (
            <Link to="/Subject" style={{ textDecoration: 'none', color: 'inherit' }} key={index}>
            <Unicard 
              key={index}
              heading={subject.heading}
              para={subject.para}
              icon={subject.icon}
              btnn={
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  Explore <ArrowRight size={16} />
                </div>
              }
            />
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ChooseSubject;