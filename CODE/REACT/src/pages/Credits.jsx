import React from 'react'
import Credit_Card from '../component/credit_card/Credit_Card.jsx'
import "./Credits.css"
const Credits = () => {
  return (
    <>
    <div className="details">
    <h2>Credits</h2>
    <p>Special thanks to the team of ABES Autonomy</p>
    </div>
    <div className="credits-container">
    <Credit_Card name="Mayank Kotuli" year="2nd Year" description="A passionate learner chasing big dreams, turning curiosity into code and every challenge into an opportunity to grow." image="/BADDIEE.jpeg" />
    <Credit_Card name="Mayank Kumar" year="2nd Year" description="Believes consistency beats talent, learning something new every day while building skills for a brighter future." image="/BADDIEE.jpeg" />
    <Credit_Card name="Mukul Yadav" year="2nd Year" description="An ambitious mind with endless curiosity, always ready to learn, improve, and create something meaningful." image="/BADDIEE.jpeg" />
    </div>
    </>
  )
}

export default Credits
