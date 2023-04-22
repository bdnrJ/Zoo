import React from 'react'
import cafe from "../assets/facilities/cafe.png"

type props = {
    image: string,
    desc: string
}

const Facility = ({image, desc}: props) => {
    console.log(image);
    return (
        <div className="facility">
            <div className="facility-image">
                <img src={image} alt="" />
            </div>
            <div className="facility-desc">
                {desc}
            </div>
        </div>
    )
}

export default Facility
