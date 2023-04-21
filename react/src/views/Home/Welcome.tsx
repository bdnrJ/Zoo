import { SetStateAction, useState, useEffect } from 'react'
import {BsCircle} from 'react-icons/Bs'
import { Link } from 'react-router-dom'

type props = {
    currentIdx: number,
    setCurrentIdx: React.Dispatch<SetStateAction<number>>,
}

type message = {
    title: string,
    description: string
}

const Welcome = ({currentIdx, setCurrentIdx}: props) => {
    const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
    const messages: message[] = [
        {
        title: "14 070 animals",
        description: "is under ZOO care"
        },
        {
        title: "1 460 species",
        description: "from different environments from all over the world"
        },
        {
        title: "37 ha",
        description: "an area on which there is a home for thousands of animals"
        },
        {
        title: "7 453 000$",
        description: "donated for saving animals"
        },
        {
        title: "over 270 000 animals",
        description: `has been rescued thanks to fundation "Save wildlife" `
        }
    ]


    return (
        <div className="welcome">
            <div className="welcome-item-wrapper">
                {messages.map((item, index) => (
                    <div
                    key={index}
                    className={`welcome-item ${index === currentIdx ? 'active' : ''} ${
                        index === currentIdx - 1 ? 'entering' : ''}`
                    }
                    >
                        <div className="welcome-title">{item.title}</div>
                        <div className="welcome-desc">{item.description}</div>
                    </div>
                ))}
            </div>
        </div>
    );
    };


export default Welcome
