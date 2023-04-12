import {GoLocation} from 'react-icons/Go'
import {GiTicket} from 'react-icons/gi'
import { BsTelephoneFill } from 'react-icons/Bs'

const HomeInfo = () => {
    return (
        <div className="home-info">
            <div className="info-wrapper">
                <div className="info-block">
                    <div className="info-block-icon yellow">
                        <GoLocation />
                    </div>
                    <div className="info-block-title tyellow">
                        Getting Here
                    </div>
                    <div className="info-block-desc">
                        <span>Check how to find us</span>
                    </div>
                </div>

                <div className="info-block">
                    <div className="info-block-icon green">
                        <BsTelephoneFill />
                    </div>
                    <div className="info-block-title tgreen">
                        Contact
                    </div>
                    <div className="info-block-desc">
                        <span>+123 123 123 321</span>
                        <span>ZooProjekt@email.com</span>
                    </div>
                </div>

                <div className="info-block">
                    <div className="info-block-icon red">
                        <GiTicket/>
                    </div>
                    <div className="info-block-title tred">
                        Tickets
                    </div>
                    <div className="info-block-desc">
                        <span>Informations about tickets</span>
                    </div>
                </div>
                {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12916.450716350626!2d22.011280484144613!3d50.031059458023975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473cfaf83c5a9833%3A0x432f7dd9b86f7a01!2sUniwersytet%20Rzeszowski%20(UR)!5e0!3m2!1spl!2spl!4v1681289812109!5m2!1spl!2spl" width="600" height="450"
                 allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> */}
            </div>
        </div>
    )
}

export default HomeInfo
