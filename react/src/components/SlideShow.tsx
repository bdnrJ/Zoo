import {useState, useEffect} from 'react'
import fishImage from "../assets/home_fish.jpg";
import idkImage from '../assets/home_idkcoto.jpg'
import koalaImage from '../assets/home_koala.jpg'
import parrotImage from '../assets/home_parrots.jpg'
import lionImage from '../assets/home_lion.jpg'


const SlideShow = () => {
    const imageArray = [lionImage, idkImage, parrotImage, fishImage, koalaImage];

    const [currentIdx, setCurrentIdx] = useState(0);

    const goToNext = () => {
        const idx = imageArray.length-1 === currentIdx ? 0 : currentIdx+1;
        setCurrentIdx(idx);
    }

    const goToPrev= () => {
        const idx = currentIdx-1 === -1 ? imageArray.length-1 : currentIdx-1;
        setCurrentIdx(idx);
    }

    useEffect(() => {
        const interval = setInterval(() => {
            goToNext();
        }, 5000)

        return () => {
            clearInterval(interval);
        }
    }, [currentIdx])


    return (
        <div className="slideshow" style={{backgroundImage: `url(${imageArray[currentIdx]})`}}>
            <div className="slideshow-gradientwrapper">
                <div className="slideshow-content">
                    <div className="slideshow-content-text">
                        <h1>Explore biggest ZOO in the country!</h1>
                    </div>
                    <div className="slideshow-content-button">
                        <button>Do something</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SlideShow
