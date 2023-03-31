import React, {useState} from 'react'
import SlideShow from './SlideShow'

import AnimalGallery from './AnimalGallery'
import HomeInfo from './HomeInfo'

const Home = () => {
    return (
        <div className="home">
            <SlideShow />
            <HomeInfo />
            <AnimalGallery />
        </div>
    )
}

export default Home
