import React from 'react'
import Credit_Card from '../component/credit_card/Credit_Card.jsx'

const Credits = () => {
  return (
    <>
    <h2>Credits</h2>
    <p>Special thanks to the team of ABES Autonomy</p>
    <Credit_Card name="John Doe" year="2023" description="Frontend Developer" />
    <Credit_Card name="Jane Smith" year="2023" description="Backend Developer" />
    <Credit_Card name="Alice Johnson" year="2023" description="UI/UX Designer" />
    </>
  )
}

export default Credits
