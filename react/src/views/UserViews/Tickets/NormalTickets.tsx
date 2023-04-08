import { useContext, useState } from 'react';
import BackButton from '../../../components/BackButton'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TicketChooser from '../../../components/TicketChooser';
import TicketSum from '../../../components/TicketSum';
import { useNavigate } from 'react-router-dom';
import { TicketContext, transaction, transactionTickets } from '../../../context/TicketContext';

export const NormalTickets = () => {
    const {userTickets, setUserTickets, setUserTransaction} = useContext(TicketContext);
    const [ticketExpDate, setTicketExpDate] = useState(new Date());
    const navigate = useNavigate();
    const SERVICE_FEE = 5;

    const handleAddition = (idx: number) => {
        const newTickets = userTickets;
        const modifiedTicketIdx = userTickets.findIndex((ticket) => ticket.id === idx);

        if(modifiedTicketIdx === -1){
            alert("cannot increase amount on a ticket that does not exist");
            return;
        }

        newTickets[modifiedTicketIdx].amount = Math.min(newTickets[modifiedTicketIdx].amount + 1, 10);
        setUserTickets([...newTickets]);
    }

    const handleSubstitution = (idx: number) => {
        const newTickets = userTickets;
        const modifiedTicketIdx = userTickets.findIndex((ticket) => ticket.id === idx);

        if(modifiedTicketIdx === -1){
            alert("cannot decrease amount on a ticket that does not exist");
            return;
        }

        newTickets[modifiedTicketIdx].amount = Math.max(newTickets[modifiedTicketIdx].amount - 1, 0);
        setUserTickets([...newTickets]);
    }

    const handleContiuneToCheckout = () => {
        //extract only api usefull data from userTickets to transactionTickets
        const transactionNormalTickets: transactionTickets[] = userTickets.map((ticket) => (
            {
                ticket_type_id: ticket.id,
                amount: ticket.amount
            }
            )).filter((transactionTicket) => transactionTicket.amount !== 0);

        if(transactionNormalTickets.length === 0){
            alert("To contiune you must at least have one ticket!");
        }

        const totalCost = userTickets.reduce((acc, curr) => acc + (curr.price * curr.amount), 0);

        const transaction: transaction ={
            buy_date: new Date(),
            exp_date: ticketExpDate,
            total_cost: totalCost + SERVICE_FEE,
            type: 'normal',
            normal_tickets: transactionNormalTickets
        }

        setUserTransaction(transaction);
        navigate('/tickets/normal/checkout')
    }

    //Date formating
    const dayOfWeek = ticketExpDate.toLocaleString('en-US', { weekday: 'long' });
    const month = ticketExpDate.toLocaleString('en-US', { month: 'long' });
    const dayOfMonth = ticketExpDate.toLocaleString('en-US', { day: 'numeric' });
    const year = ticketExpDate.getFullYear();
    const formattedDate = `${dayOfWeek}, ${month} ${dayOfMonth}, ${year}`;
    return (
        <div className="normal">
            <div className="normal-title">
                <h1>Normal Tickets</h1>
            </div>
            <div className="normal-wrapper">
                <div className="backbtn">
                    <BackButton direction='/tickets' />
                </div>
                <div className="normal-buying">
                    <div className="normal-select">

                        <div className="normal-select-title">
                            <h3>You have chosen normal tickets. <br/>
                            Please complete your ticket details below.</h3>
                        </div>

                        <div className="normal-select-date">
                            <div className="normal-select-label">
                                <h4>Select Date</h4>
                            </div>
                            <DatePicker
                                minDate={new Date()}
                                selected={ticketExpDate}
                                onChange={(date: Date) => setTicketExpDate(date)}
                                value={formattedDate}
                            />
                        </div>

                        <div className="normal-select-tickets-wrapper">
                            <div className="normal-select-label">
                                <h4>Select Tickets</h4>
                            </div>
                            <div className="normal-select-tickets">
                                {userTickets.map((ticket) => (
                                    <TicketChooser
                                        key={ticket.name}
                                        idx={ticket.id}
                                        amount={ticket.amount}
                                        title={ticket.name}
                                        ageInfo={ticket.age_info}
                                        price={ticket.price}
                                        handleAdd={handleAddition}
                                        handleSub={handleSubstitution}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="normal_tickets-cart">
                        <TicketSum date={ticketExpDate}/>
                    </div>
                </div>
            </div>
            <button
                disabled={userTickets.reduce((acc, curr) => acc + (curr.price * curr.amount), 0) === 0}
                onClick={handleContiuneToCheckout}
                >
                    Contiune
            </button>
        </div>
    )
}
