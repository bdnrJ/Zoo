import React, { useContext } from 'react'
import { TicketContext, normalTicket, normalUserTicket } from '../context/TicketContext'

type props ={
    date: Date
    addClass?: string
    ticketType: "normal" | "group";
}

const TicketSum = ({ date, addClass, ticketType }: props) => {
    const {normalUserTickets, availableGroupTicket, groupUserTransaction} = useContext(TicketContext);
    const groupUserTicket: normalUserTicket[] = [{
        id: availableGroupTicket.id,
        name: availableGroupTicket.name,
        age_info: availableGroupTicket.age_info,
        price: availableGroupTicket.price,
        amount: groupUserTransaction.items[0].amount,
        is_active: 1,
    }]
    console.log(normalUserTickets);
    console.log(availableGroupTicket);
    console.log(groupUserTransaction);



    //Date formating
    const dayOfWeek = date.toLocaleString('en-US', { weekday: 'long' });
    const month = date.toLocaleString('en-US', { month: 'long' });
    const dayOfMonth = date.toLocaleString('en-US', { day: 'numeric' });
    const year = date.getFullYear();
    const formattedDate = `${dayOfWeek}, ${month} ${dayOfMonth}, ${year}`;

    const calculateTotalPrice = (): number => {
        const tickets = ticketType === "normal" ? normalUserTickets : groupUserTicket;

        return tickets.reduce((acc, curr) => acc + curr.price * curr.amount, 0);
    };

    return (
        <div className={`ticketsum --${ticketType}`}>
            <div className={`ticketsum-title --${ticketType}`}>
                <h2>Ticketing</h2>
            </div>
            <div className="ticketsum-bottom">
                <div className="ticketsum-tickets">
                    <div className="ticketsum-tickets-date">
                        <span>{formattedDate}</span>
                    </div>
                    <div className="ticketsum-tickets-acutaltickets">
                        {(ticketType === "normal" ? normalUserTickets : groupUserTicket).map(
                            (ticket) => {
                            if (ticket.amount === 0) return;
                            return (
                                <span key={ticket.name}>
                                {`${ticket.name} - $${ticket.price} x ${ticket.amount}`}
                                </span>
                            );
                            }
                        )}
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
                        <span className='ticketsum-sum-block-total --dolar'>
                            ${calculateTotalPrice() == 0 ? 0 : (calculateTotalPrice()+5).toFixed(2)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TicketSum
