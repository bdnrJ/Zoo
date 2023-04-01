import {BsCircle} from 'react-icons/Bs'
import { Link } from 'react-router-dom'

const Welcome = () => {
    return (
        <div className="welcome">
            <div className="welcome-title">
                <h2>Welcome!</h2>
            </div>
            <div className="welcome-desc">
                <span>
                    We warmly welcome you and appreciate your visiting the ZOO! &nbsp;
                    At our world-renowned facility, you'll have the opportunity to witness some of the most magnificent creatures from all corners of the globe. &nbsp;
                    Our team of dedicated professionals works tirelessly to ensure the health and happiness of each and every one of our animals.
                </span>
            </div>
            <div className="welcome-info">

                <div className="welcome-info-block">
                    <div className="info-block-mark">
                        <BsCircle />
                    </div>
                    <div className="info-block-desc">
                        <h3>1998</h3>
                        <span>year of foundation</span>
                        <Link to={'/'}>History</Link>
                    </div>
                </div>

                <div className="welcome-info-block">
                    <div className="info-block-mark">
                        <BsCircle />
                    </div>
                    <div className="info-block-desc">
                        <h3>78 ha</h3>
                        <span>area</span>
                        <Link to={'/'}>History</Link>
                    </div>
                </div>

                <div className="welcome-info-block">
                    <div className="info-block-mark">
                        <BsCircle />
                    </div>
                    <div className="info-block-desc">
                        <h3>123</h3>
                        <span>species</span>
                        <Link to={'/'}>History</Link>
                    </div>
                </div>

                <div className="welcome-info-block">
                    <div className="info-block-mark">
                        <BsCircle />
                    </div>
                    <div className="info-block-desc">
                        <h3>692</h3>
                        <span>animals</span>
                        <Link to={'/'}>History</Link>
                    </div>
                </div>

            </div>
            <div className="welcome-seeyou">
                <h2>See you at the <span className="yellowt" >ZOO!</span></h2>
            </div>
        </div>
    )
}

export default Welcome
