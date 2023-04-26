import blueTicketBg from '../../../assets/blueTicketBg.png'
import greenTicketBg from '../../../assets/greenTicketBg.png'
import {Link} from 'react-router-dom';


const Tickets = () => {
    return (
        <div className="tickets">
            <div className="tickets-header">
                TICKETS
            </div>
            <div className="tickets-main">
                <div className="tickets-main-title">
                    <span>A zoo account is required to purchase tickets. </span>
                    <span>Please log in and then choose the type of ticket you want to purchase</span>
                </div>
                <div className="tickets-main-info">
                    <span>How does purchase of tickets work?</span>
                    <span>1. Log in to your account. You don't have a profile in our zoo yet? Sign up now</span>
                    <span>2. Select the ticket you want to purches</span>
                    <span>3. Fill in the details about the type, number of tickets and the date of the visit</span>
                    <span>4. Choose a payment method and buy tickets</span>
                    <span>5. After purchase, you will find your tickets on your profile in the “My Tickets” tab</span>
                    <span>6. On the day of your visit, open your e-ticket at the entrance to the zoo and display the QR code so that the cashier can scan it</span>
                </div>
                <div className="tickets-main-subinfo">
                    <span>Attention! Out of concern for the environment, it is not possible to purchase a paper ticket or print an e-ticket</span>
                    <span className='subinfo-bold'>Before purchase of tickets, please read the statute of the zoo</span>
                </div>
                <div className="tickets-main-tickets">

                    <div className="main-tickets-ticket">
                        <div className="main-tickets-ticket_wrapper">
                            <div className="main-tickets-ticket-img_normal">
                                NORMAL TICKETS
                            </div>
                            <div className="main-tickets-ticket-desc">
                                Available regular and discounted tickets
                            </div>
                        </div>
                        <Link to={'/tickets/normal'}  className='__noUnderline'>
                            <label htmlFor="normalTicketButton" className='main-tickets-ticket-button_label' >
                                    <button name='normalTicketButton'>Buy normal tickets</button>
                            </label>
                        </Link>
                    </div>

                    <div className="main-tickets-ticket">
                        <div className="main-tickets-ticket_wrapper">
                            <div className="main-tickets-ticket-img_group">
                                GROUP TICKET
                            </div>
                            <div className="main-tickets-ticket-desc">
                                Groups from 15 up to 40 people
                            </div>
                        </div>
                        <Link to={'/tickets/group'} className='__noUnderline' >
                            <label htmlFor="groupTicketButton" className='main-tickets-ticket-button_label __green' >
                                    <button name='groupTicketButton'>Buy group ticket</button>
                            </label>
                        </Link>
                    </div>

                </div>
                <div className="tickets-main-contact">
                    <span>*If you are interested in organizing trips for organized groups or all kinds of events, please contact us by e-mail or telephone</span>
                </div>
            </div>
        </div>
    )
}

export default Tickets
