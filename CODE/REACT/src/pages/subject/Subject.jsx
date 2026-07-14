import React from "react";
import "./Subject.css";
import { useLocation } from "react-router-dom";
import { FileText, Download } from "lucide-react";

const Subject = () => {
  const location = useLocation();

  const { heading, para } = location.state || {
    heading: "SUBJECT",
    para: "Subject Resources",
  };

  const units = [
    {
      id: 1,
      title: "Unit 1",
    },
    {
      id: 2,
      title: "Unit 2",
    },
    {
      id: 3,
      title: "Unit 3",
    },
    {
      id: 4,
      title: "Unit 4",
    },
    {
      id: 5,
      title: "Unit 5",
    },
  ];

  return (
    <main className="subject-page">
      <div className="subject-container">

    
        <div className="subject-heading">
          <h1>{heading}</h1>

          <p>
            Download all {para} study materials
            <br />
            organized by units.
          </p>
        </div>

    
        <button className="download-all">
          <Download size={22} />
          <span>DOWNLOAD ALL</span>
        </button>

    
        <div className="units-grid">
          {units.map((unit) => (
            <div className="unit-card" key={unit.id}>

              <FileText className="file-icon" />

              <h2>{unit.title}</h2>

              <button className="unit-download-btn">
                <span>Preview</span>
              </button>

            </div>
          ))}
        </div>

      </div>
    </main>
  );
};

export default Subject;