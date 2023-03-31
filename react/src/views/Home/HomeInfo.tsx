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

            </div>
        </div>
    )
}

export default HomeInfo
