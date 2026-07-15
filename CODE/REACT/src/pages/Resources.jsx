import React from "react";
import "./Resources.css";
import { Search } from "lucide-react";
import { useState } from "react";
import {
  FileText,
  ClipboardList,
  FlaskConical,
  CircleHelp,
  Notebook,
  Info
} from "lucide-react";
import { Link } from "react-router-dom";


const Resources = () => {
  const [selectedYear, setSelectedYear] = useState(1);
  const resourceCards = [
  {
    id: 1,
    title: "THEORY NOTES",
    description: "Academic notes & lecture slides",
    icon: FileText,
  },
  {
    id: 2,
    title: "ASSIGNMENTS",
    description: "Problem sets & projects",
    icon: ClipboardList,
  },
  {
    id: 3,
    title: "LAB MANUALS",
    description: "Manuals & experimentation logs",
    icon: FlaskConical,
  },
  {
    id: 4,
    title: "PYQ QUESTION",
    description: "Previous year exam papers",
    icon: CircleHelp,
  },
  {
    id: 5,
    title: "HANDWRITTEN NOTES",
    description: "Handwritten notes by Topper Student [10 SGPA]",
    icon: Notebook,
  },
  {
    id: 6,
    title: "INFO",
    description: "Important information & guidelines",
    icon: Info,
  },
];

  return (
    <div className="main">

      <div className="hero_section">
        <h1>RESOURCES</h1>

        <p>
          Your one-stop destination for academic materials, notes, labs,
          <br />
          assignments, and previous year papers.
        </p>
      </div>

      <section className="search-section">

        <div className="search-box">
          <Search className="search-icon" size={22} />

          <input
            type="text"
            placeholder="Search for subjects, courses, notes, PYQs..."
          />
        </div>
      </section>

      {/* <div className="year-selector">

  <span className="year-label">
    YEAR
  </span>

  {[1, 2, 3, 4].map((year) => (
    <button
      key={year}
      className={`year-button ${
        selectedYear === year ? "active" : ""
      }`}
      onClick={() => setSelectedYear(year)}
    >
      {year}
    </button>
  ))}

</div> */}
<section className="resources-section">

  <div className="resources-grid">

    {resourceCards.map((card) => {

      const Icon = card.icon;

      return (
        <Link to="/ChooseSubject" style={{ textDecoration: 'none', color: 'inherit' }} key={card.id}>
        <div className="resource-card" key={card.id}>

          <div className="resource-icon">
            <Icon size={42} strokeWidth={1.5} />
          </div>
          <h2>{card.title}</h2>
          <p>{card.description}</p>
          <button className="explore-button">
            Explore
            <span>→</span>
          </button>

        </div>
        </Link>
      );

    })}

  </div>

</section>

    </div>
  );
};

export default Resources;