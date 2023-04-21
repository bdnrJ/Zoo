import {useState, useEffect, SetStateAction} from 'react'
import fishImage from "../../assets/home_fish.jpg";
import idkImage from '../../assets/home_idkcoto.jpg'
import koalaImage from '../../assets/home_koala.jpg'
import parrotImage from '../../assets/home_parrots.jpg'
import lionImage from '../../assets/home_lion.jpg'
import {BsChevronLeft, BsChevronRight} from 'react-icons/Bs';

type props = {
    currentIdx: number,
    setCurrentIdx: React.Dispatch<SetStateAction<number>>;
}

const SlideShow = ({currentIdx, setCurrentIdx}: props) => {

    const imageArray = [lionImage, idkImage, parrotImage, fishImage, koalaImage];

    const goToNextImg = () => {
        const idx = imageArray.length-1 === currentIdx ? 0 : currentIdx+1;
        setCurrentIdx(idx);
    }
    const goToPrevImg= () => {
        const idx = currentIdx-1 === -1 ? imageArray.length-1 : currentIdx-1;
        setCurrentIdx(idx);
    }

    //each 5 seconds switches image
    useEffect(() => {
        const interval = setInterval(() => {
            goToNextImg();
        }, 5000)

        return () => {
            clearInterval(interval);
        }
    }, [currentIdx])

    const switchIndex = (currentImage: string) => {
        const idxOfImageToSwitchTo = imageArray.findIndex((image) => image === currentImage);
        setCurrentIdx(idxOfImageToSwitchTo);
    }

    return (
        <div className="slideshow">
            <div className="slideshow-images">
                {imageArray.map((image, index) => (
                    <div
                        key={image}
                        className={`slideshow-image ${
                            index === currentIdx ? 'active' : ''
                        }`}
                        style={{ backgroundImage: `url(${image})` }}
                    ></div>
                ))}
            </div>
            <div className="slideshow-gradientwrapper">
                <div className="slideshow-gradientwrapper-slidecontrolls">
                    <button className='slidecontrolls-btn' onClick={goToPrevImg} ><BsChevronLeft /></button>
                    <div className="slidecontrolls-balls">
                        {imageArray.map((image) => {
                            return(
                            <span
                                key={image}
                                id={image}
                                className={`slidecontrolls-ball ${imageArray[currentIdx] === image ? "--active" : ""}`}
                                onClick={() => switchIndex(image)}>
                            </span>
                        )})}
                    </div>
                    <button className='slidecontrolls-btn' onClick={goToNextImg}><BsChevronRight/></button>
                </div>
                <div className="slideshow-content">
                    <div className="slideshow-content-text">
                        <h1>Explore the biggest ZOO in the country!</h1>
                    </div>
                    <div className="slideshow-content-button">
                        <button className='__border-button' >EXPLORE</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SlideShow
