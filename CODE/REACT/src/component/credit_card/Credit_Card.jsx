import React from 'react'
const Credit_Card = (props) => {
  return (
    <div>
        <div>
        </div>
        <p>{props.name}</p>
        <p>{props.year}</p>
        <p>{props.description}</p>
        <div className="social-media">
            <div className="github"></div>
            <div className="linkedin"></div>
            <div className="insta"></div>
        </div>

    </div>
  )
}

export default Credit_Card
