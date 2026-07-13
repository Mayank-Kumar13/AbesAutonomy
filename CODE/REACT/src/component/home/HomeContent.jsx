import React from "react";
import "./HomeContent.css";
import buildingPhoto from "../../../IMAGES/BUILDING.png";

import {
  Search,
  ClipboardList,
  FlaskConical,
  Copy,
  BookOpen,
  ArrowRight,
} from "lucide-react";

const cards = [
  {
    title: "ASSIGNMENTS",
    description: "Homework, problem sets and project assignments.",
    icon: <ClipboardList size={34} />,
  },
  {
    title: "LAB MANUALS",
    description: "Practical manuals, experiment records and lab guides.",
    icon: <FlaskConical size={34} />,
  },
  {
    title: "PREVIOUS PAPERS",
    description: "Previous year question papers and exam resources.",
    icon: <Copy size={34} />,
  },
  {
    title: "SUBJECTS",
    description: "Browse all subjects and course materials.",
    icon: <BookOpen size={34} />,
  },
];

const HomeContent = () => {
  return (
    <main className="home">

      {/* SEARCH SECTION */}
      <section className="search-section">

        <h1 className="search-heading">
          WHAT ARE YOU SEARCHING FOR?
        </h1>

        <div className="search-box">

          <Search className="search-icon" size={22} />

          <input
            type="text"
            placeholder="Search for subjects, courses, notes, PYQs..."
          />

        </div>

      </section>

      {/* ABOUT SECTION */}

      <section className="about-section">

        <div className="about-card">

          <pre className="why">WHY ABES AUTONOMY
            
            <p>
               IS 
               </p>
              <pre className="important">
            IMPORTANT?
            </pre>
            </pre>

          <div className="quote-mark">“</div>

          <p>
            Education is not just about learning,
            it's about building a better tomorrow.
          </p>

          <span>– ABES Autonomy</span>

        </div>

        <div className="building-card">

          <img
            src={buildingPhoto}
            alt="ABES Building"
          />

        </div>

      </section>

      {/* RESOURCE CARDS */}

      <section className="resource-section">

        {cards.map((card, index) => (

          <div className="resource-card" key={index}>

            <div className="card-icon">
              {card.icon}
            </div>

            <h3>{card.title}</h3>

            <p>{card.description}</p>

            <button>

              <ArrowRight size={18} />

            </button>

          </div>

        ))}

      </section>

    </main>
  );
};

export default HomeContent;