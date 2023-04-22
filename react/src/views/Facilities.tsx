import park from '../assets/facilities/park.png'
import cafe from '../assets/facilities/cafe.png'
import garden from '../assets/facilities/garden.png'
import playground from '../assets/facilities/playground.png'
import restaurant from '../assets/facilities/restaurant.png'
import Facility from '../components/Facility'

type facility = {
    image: string,
    description: string
}

const Facilities = () => {

    const facilities: facility[] = [
        {
            image: park,
            description: "A large park which is perfect place for a walk, picnic and rest with your family and friends after visiting the zoo"
        },
        {
            image: restaurant,
            description: "Restaurant where you will find dishes from all over the world"
        },
        {
            image: cafe,
            description: "A cafe where you will find various sweets and imported coffee and tea"
        },
        {
            image: playground,
            description: "Playground with various facilities adapted to children of all ages"
        },
        {
            image: garden,
            description: "Beautiful gardens with plants and flowers from all over the world"
        },


    ]

    return (
        <div className="facilities">
            <div className="facilities-image">
                <h1>FACILITIES</h1>
            </div>
            <div className="facilities-content">
                <div className="facilities-content-title">
                    <h2>In addition to animal enclosures in our zoo there are facilities such as:</h2>
                </div>
                <div className="facilities-content-sections">
                    {facilities.map((facility) => (
                        <Facility
                            key={facility.image}
                            image={facility.image}
                            desc={facility.description}
                        />
                    ))}
                </div>
                <div className="facilities-content-footer">
                    <span>A map of the zoo is available at the entrance and at information points located throughout the zoo</span>
                </div>
            </div>
        </div>
    )
}

export default Facilities
