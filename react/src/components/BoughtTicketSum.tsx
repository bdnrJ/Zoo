import React, { useEffect, useState } from 'react'
import { ticket } from '../views/UserViews/UserTickets'

type serviceType = {
    name: string,
    price_per_customer: number,
}

type service = {
    service_type: serviceType
}

type props = {
    tickets: ticket[],
    services?: service[], // services are optional
    exp_date: string,
    total_cost: number,
    type: string,
    isPrevious: boolean
}

const BoughtTicketSum = ({tickets, services, exp_date, total_cost, type, isPrevious}: props) => {

    const [amount, setAmount] = useState<number>(0);

    console.log(services);

    useEffect(() => {
        if(type === 'group'){
            setAmount(tickets[0].amount);
        }
    }, [])

    return (
        <div className="bought_ticket_sum">
            <div className={`bought_ticket_sum-image ${isPrevious && '--previous'}`}>

            </div>
            <div className="bought_ticket_sum-rest">
                <div className="bought_ticket_sum-rest-ticket_type">
                    <h3>{type.toUpperCase()} TICKET</h3>
                    <hr />
                </div>
                <div className="bought_ticket_sum-rest-info">
                    <span>Date: {new Date(exp_date).toLocaleDateString()}</span>
                    {
                        tickets.map((ticket, index) => (
                            <p key={index}>{ticket.ticket_type.name} x {ticket.amount}</p>
                        ))
                    }
                    {services?.length !== 0 && "services:"}
                    {
                        services?.map((service, index) => (
                            <p key={index}>{service.service_type.name}</p>
                        ))
                    }
                </div>
                <div className="bought_ticket_sum-rest-cost">
                    <span>Total cost: ${total_cost}</span>
                </div>
            </div>
        </div>
    )
}

export default BoughtTicketSum
