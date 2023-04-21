import {GoLocation} from 'react-icons/Go'
import {GiTicket} from 'react-icons/gi'
import { BsTelephoneFill } from 'react-icons/Bs'

const HomeInfo = () => {
    return (
        <div className="home_info">

            <div className="home_info-title">
                <h3>How to get to our ZOO?</h3>
            </div>

            <div className="home_info-rest">
                <div className="home_info-rest-wrapper">

                    <div className="home_info-info">
                        <div className="home_info-info-title">
                            Opening hours
                        </div>
                        <div className="home_info-info-content">
                            <span>Monday 10AM - 6PM</span>
                            <span>Tuesday 10AM - 6PM</span>
                            <span>Wednesday 11AM - 5PM</span>
                            <span>Thursday 10AM - 6PM</span>
                            <span>Friday 9AM - 6PM</span>
                            <span>Saturdary 9AM - 7PM</span>
                            <span>Sunday 9AM - 7PM</span>
                        </div>
                    </div>

                    <div className="home_info-info">
                        <div className="home_info-info-title">
                            Address
                        </div>
                        <div className="home_info-info-content">
                            <span>591 McKinley St .100, South Stildol, Iowa</span>
                        </div>
                        <label htmlFor="borderbtn">
                            <button name="borderbtn" className='border-button' >See the details</button>
                        </label>
                    </div>

                </div>

                <div className="home_info-map">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15810.124473949514!2d22.00452150926875!3d50.03197884882488!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473cfaf83c5a9833%3A0x432f7dd9b86f7a01!2sUniwersytet%20Rzeszowski%20(UR)!5e0!3m2!1spl!2spl!4v1682102815267!5m2!1spl!2spl"
                    width="600"
                    height="450"
                    allowfullscreen=""
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                    className='home_info-map_object'
                >
                </iframe>
                </div>

            </div>
        </div>
    )
}

export default HomeInfo
