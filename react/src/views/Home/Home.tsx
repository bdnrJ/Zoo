import React, {useState} from 'react'
import SlideShow from './SlideShow'

import AnimalGallery from './AnimalGallery'
import HomeInfo from './HomeInfo'
import Welcome from './Welcome'

const Home = () => {
    return (
        <div className="home">
            <SlideShow />
            <Welcome />
            <AnimalGallery />
            <HomeInfo />
        </div>
    )
}

export default Home
