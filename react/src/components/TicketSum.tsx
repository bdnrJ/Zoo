import React, { useContext } from 'react'
import { TicketContext, normalTicket, normalUserTicket, userService } from '../context/TicketContext'

type props ={
    date: Date
    addClass?: string
    ticketType: "normal" | "group";
}

const TicketSum = ({ date, addClass, ticketType,}: props) => {
    const {normalUserTickets, availableGroupTicket, groupUserTransaction, userServices, discount} = useContext(TicketContext);

    const groupUserTicket: normalUserTicket[] = [{
        id: availableGroupTicket.id,
        name: availableGroupTicket.name,
        age_info: availableGroupTicket.age_info,
        price: availableGroupTicket.price,
        amount: 0,
        is_active: 1,
    }]

    if(ticketType === 'group'){
        groupUserTicket[0].amount = groupUserTransaction.items[0].amount;
    }

    //Date formating
    const dayOfWeek = date.toLocaleString('en-US', { weekday: 'long' });
    const month = date.toLocaleString('en-US', { month: 'long' });
    const dayOfMonth = date.toLocaleString('en-US', { day: 'numeric' });
    const year = date.getFullYear();
    const formattedDate = `${dayOfWeek}, ${month} ${dayOfMonth}, ${year}`;

    const calculateTotalPrice = (): number => {
        const tickets = ticketType === "normal" ? normalUserTickets : groupUserTicket;

        let ticketTotal = tickets.reduce((acc, curr) => acc + curr.price * curr.amount, 0) || 0;

        if (ticketType === 'group' && userServices) {
            const selectedServices = userServices.filter(service => service.is_choosen);
            const serviceTotal = selectedServices.reduce((acc, curr) => acc + parseFloat(curr.price_per_customer) * groupUserTicket[0].amount, 0);
            return ticketTotal + serviceTotal;
        }
        return ticketTotal;
    };

    const calculateTotalDiscount = (total: number) => {
        return total * (discount / 100);
    }

    const totalDiscount = calculateTotalDiscount(calculateTotalPrice()+5);
    const finalPrice = calculateTotalPrice() > 0 ? calculateTotalPrice() + 5 - totalDiscount : 0;

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
                        { ticketType==='group' && userServices.map(service => (
                            service.is_choosen && (
                                <div key={service.id} className="ticketsum-service">
                                    <span>{`${service.name} - $${service.price_per_customer} x ${groupUserTransaction.items[0].amount}`}</span>
                                </div>
                            )
                        ))}
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
                    {discount > 0 &&
                        <div className="ticketsum-sum-block">
                            {discount > 0 && <><span>Discount: </span> <span>{discount}%</span></>}
                        </div>
                    }
                    <div className="ticketsum-sum-block">
                        <span className='ticketsum-sum-block-total'>Total: </span>
                        <span className='ticketsum-sum-block-total --dolar'>
                            ${finalPrice.toFixed(2)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TicketSum
