import React from 'react'
import Credit_Card from '../component/credit_card/Credit_Card.jsx'
import "./Credits.css"
const Credits = () => {
    let linkedin=["0","https://www.linkedin.com/in/mayank-kumar-206209377/","2"]
    let instagram=["0","https://www.instagram.com/tomar.13?igsh=MWFmeWp0azkzYzZiOA==","2"]
    let github=["0","https://github.com/Mayank-Kumar13","2"]
    let description=["0","Believes consistency beats talent, learning something new every day while building skills for a brighter future.","2"]
  return (
    <>
    <div className="details">
    <h2>Credits</h2>
    <p>Special thanks to the team of ABES Autonomy</p>
    </div>
    <div className="credits-container">
    <Credit_Card name="Mayank Kotuli" year="2nd Year" description={description[0]} image="/KOTULI.png" github={github[0]} linkedin={linkedin[0]} instagram={instagram[0]}  />
    <Credit_Card name="Mayank Kumar" year="2nd Year" description={description[1]} image="/TOMAR.png" github={github[1]} linkedin={linkedin[1]} instagram={instagram[1]}  />
    <Credit_Card name="Mukul Yadav" year="2nd Year" description={description[2]} image="/BADDIEE.jpeg" github={github[2]} linkedin={linkedin[2]} instagram={instagram[2]} />
    </div>
    </>
  )
}

export default Credits
