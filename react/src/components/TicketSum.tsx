import React, { useContext } from 'react'
import { TicketContext } from '../context/TicketContext'

type props ={
    date: Date
    addClass?: string
}

const TicketSum = ({date, addClass}: props) => {
    const {userTickets} = useContext(TicketContext);
    //Date formating
    const dayOfWeek = date.toLocaleString('en-US', { weekday: 'long' });
    const month = date.toLocaleString('en-US', { month: 'long' });
    const dayOfMonth = date.toLocaleString('en-US', { day: 'numeric' });
    const year = date.getFullYear();
    const formattedDate = `${dayOfWeek}, ${month} ${dayOfMonth}, ${year}`;

    const calculateTotalPrice = (): number => {
        return userTickets.reduce((acc, curr) => acc + (curr.price * curr.amount), 0);
    }

    return (
        <div className={`ticketsum --${addClass}`}>
            <div className="ticketsum-title">
                <h2>Ticketing</h2>
            </div>
            <div className="ticketsum-bottom">
                <div className="ticketsum-tickets">
                    <div className="ticketsum-tickets-date">
                        <span>{formattedDate}</span>
                    </div>
                    <div className="ticketsum-tickets-acutaltickets">
                        {userTickets.map((ticket) => {
                            if(ticket.amount === 0 ) return;
                            return (
                                <span key={ticket.name} >{`${ticket.name} - $${ticket.price} x ${ticket.amount}`}</span>
                            );
                        })}
                    </div>
                </div>
                <hr />
                <div className="ticketsum-sum">
                    <div className="ticketsum-sum-block">
                        <span>Subtotal: </span> <span>${calculateTotalPrice().toFixed(2)}</span>
                    </div>
                    <div className="ticketsum-sum-block">
                        {calculateTotalPrice() != 0 && <><span>Service fee: </span> <span>$5</span></>}
                    </div>
                    <div className="ticketsum-sum-block">
                        <span className='ticketsum-sum-block-total'>Total: </span>
                        <span className='ticketsum-sum-block-total'>
                            ${calculateTotalPrice() == 0 ? 0 : (calculateTotalPrice()+5).toFixed(2)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TicketSum
