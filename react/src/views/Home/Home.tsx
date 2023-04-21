import React, {useState} from 'react'
import SlideShow from './SlideShow'
import AnimalGallery from './AnimalGallery'
import HomeInfo from './HomeInfo'
import Welcome from './Welcome'

const Home = () => {

    const [currentIdx, setCurrentIdx] = useState<number>(0);

    return (
        <div className="home">
            <SlideShow
                currentIdx={currentIdx}
                setCurrentIdx={setCurrentIdx}
            />
            <Welcome
                currentIdx={currentIdx}
            />
            <AnimalGallery />
            <HomeInfo />
        </div>
    )
}

export default Home
