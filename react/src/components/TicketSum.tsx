import React from 'react'

type ticket = {
    idx: number,
    amount: number,
    title: string,
    ageInfo: string,
    price: number,
}

type props ={
    tickets: ticket[],
    date: Date
}


const TicketSum = ({tickets, date}: props) => {

    //Date formating
    const dayOfWeek = date.toLocaleString('en-US', { weekday: 'long' });
    const month = date.toLocaleString('en-US', { month: 'long' });
    const dayOfMonth = date.toLocaleString('en-US', { day: 'numeric' });
    const year = date.getFullYear();

    const formattedDate = `${dayOfWeek}, ${month} ${dayOfMonth}, ${year}`;

    function calculateTotalPrice(tickets: ticket[]): number {
        let totalPrice = 0;

        for (const ticket of tickets) {
        totalPrice += ticket.price * ticket.amount;
        }

        return totalPrice;
    }


    return (
        <div className="ticketsum">
            <div className="ticketsum-title">
                <h2>Ticketing</h2>
            </div>
            <div className="ticketsum-tickets">
                <div className="ticketsum-tickets-date">
                    <span>{formattedDate}</span>
                </div>
                <div className="ticketsum-tickets-acutaltickets">
                    {tickets.map((ticket) => {
                        if(ticket.amount === 0 ) return;
                        return (
                            <span>{`${ticket.title} - $${ticket.price} x ${ticket.amount}`}</span>
                        );
                    })}
                </div>
                <hr />
            </div>
            <div className="ticketsum-sum">
                <div className="ticketsum-sum-block">
                    <span>Subtotal: </span> <span>${calculateTotalPrice(tickets)}</span>
                </div>
                <div className="ticketsum-sum-block">
                    {calculateTotalPrice(tickets) != 0 && <><span>Service fee: </span> <span>$5</span></>}
                </div>
                <div className="ticketsum-sum-block">
                    <span className='ticketsum-sum-block-total'>Total: </span>
                    <span className='ticketsum-sum-block-total'>${calculateTotalPrice(tickets) == 0 ? 0 : calculateTotalPrice(tickets)+5}</span>
                </div>
            </div>
            <div className="ticketsum-contiune">

            </div>
        </div>
    )
}

export default TicketSum
