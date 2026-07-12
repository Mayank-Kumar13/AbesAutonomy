import React from 'react'
import Credit_Card from '../component/credit_card/Credit_Card.jsx'
import "./Credits.css"
const Credits = () => {
<<<<<<< HEAD
    let linkedin=["0","https://www.linkedin.com/in/mayank-kumar-206209377/","2"]
    let instagram=["0","https://www.instagram.com/tomar.13?igsh=MWFmeWp0azkzYzZiOA==","2"]
    let github=["0","https://github.com/Mayank-Kumar13","2"]
    let description=["Passionate about technology and innovation, constantly learning, building, and turning ideas into impactful solutions while growing into a better developer every day.","Believes consistency beats talent, learning something new every day while building skills for a brighter future.","2"]
=======
    let linkedin=["https://www.linkedin.com/in/mayank-kotuli-445891363/","https://www.linkedin.com/in/mayank-kumar-206209377/","2"]
    let instagram=["https://www.instagram.com/_mayank099_/","https://www.instagram.com/tomar.13?igsh=MWFmeWp0azkzYzZiOA==","2"]
    let github=["https://github.com/mayankkotuli099","https://github.com/Mayank-Kumar13","2"]
    let description=["","Believes consistency beats talent, learning something new every day while building skills for a brighter future.","2"]
>>>>>>> e45a02bb0024768c3644a0b04530852b89204f5b
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
