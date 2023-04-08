import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";
import axiosClient from "../axios-client";

type props = {
    children: ReactNode
}

type ticket = {
    age_info: string,
    created_at: Date | null,
    id: number,
    is_active: number,
    name: string,
    price: number,
    updated_at: Date | null,
}

type userTicket = {
    age_info: string,
    id: number,
    is_active: number,
    name: string,
    price: number,
    amount: number,
}

export interface transactionTickets {
    ticket_type_id: number
    amount: number
}

export interface transaction {
    buy_date: Date,
    exp_date: Date,
    total_cost: number,
    type: string,
    normal_tickets: transactionTickets[]
}

interface TicketContext{
    availableTickets: ticket[],
    allTicketTypes: ticket[],
    userTickets: userTicket[],
    userTransaction: transaction,
    setUserTickets: Dispatch<SetStateAction<userTicket[]>>,
    setUserTransaction: Dispatch<SetStateAction<transaction>>,
}

const transactionSample: transaction ={
    buy_date: new Date(),
    exp_date: new Date(),
    total_cost: 0,
    type: 'normal',
    normal_tickets: []
}

export const TicketContext = createContext<TicketContext>({
    availableTickets: [],
    allTicketTypes: [],
    userTickets: [],
    userTransaction: transactionSample,
    setUserTickets: () => {},
    setUserTransaction: () => {}
});

export const TicketProvider = ({children}: props) => {
    const [allTicketTypes, setAllTicketTypes] = useState<ticket[]>([]);
    const [availableTickets, setAvailableTickets] = useState<ticket[]>([]);
    const [userTickets, setUserTickets] = useState<userTicket[]>([]);
    const [userTransaction, setUserTransaction] = useState<transaction>(transactionSample);

    useEffect(() => {
        const getAllTickets = async () => {
            const res = await axiosClient.get('/ticket_types');
            setAllTicketTypes(res.data);
            const avaliableTicketsTemp: ticket[] = res.data.filter((ticket: ticket) => ticket.is_active === 1 );
            setAvailableTickets(avaliableTicketsTemp);
            const userTicketsTemp: userTicket[] = avaliableTicketsTemp.map((ticket: ticket) => ({
                ...ticket,
                amount: 0
            }));
            setUserTickets(userTicketsTemp);
        }

        getAllTickets();
    }, []);


    return (
        <TicketContext.Provider value={{availableTickets, userTickets, setUserTickets, allTicketTypes, userTransaction, setUserTransaction}}>
            {children}
        </TicketContext.Provider>
    )
}
