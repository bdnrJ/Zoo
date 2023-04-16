import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";
import axiosClient from "../axios-client";

type props = {
    children: ReactNode
}

export type normalTicket = {
    age_info: string,
    created_at: Date | null,
    id: number,
    is_active: number,
    name: string,
    price: number,
    updated_at: Date | null,
    type: string
}

type normalUserTicket = {
    age_info: string,
    id: number,
    is_active: number,
    name: string,
    price: number,
    amount: number,
}

export interface normalTransactionTickets {
    ticket_type_id: number
    amount: number
}

export interface transaction {
    buy_date: Date,
    exp_date: Date,
    total_cost: number,
    type: string,
    items: normalTransactionTickets[]
}

interface TicketContext{
    availableNormalTickets: normalTicket[],
    allNormalTicketTypes: normalTicket[],
    normalUserTickets: normalUserTicket[],
    normalUserTransaction: transaction,
    setNormalUserTickets: Dispatch<SetStateAction<normalUserTicket[]>>,
    setNormalUserTransaction: Dispatch<SetStateAction<transaction>>,
    resetAllNormal: () => void
    refetchAllNormalTicketTypes: () => void
}

const normalTransactionSample: transaction ={
    buy_date: new Date(),
    exp_date: new Date(),
    total_cost: 0,
    type: 'normal',
    items: []
}

const groupTransactionSample: transaction ={
    buy_date: new Date(),
    exp_date: new Date(),
    total_cost: 0,
    type: 'group',
    items: []
}


export const TicketContext = createContext<TicketContext>({
    availableNormalTickets: [],
    allNormalTicketTypes: [],
    normalUserTickets: [],
    setNormalUserTickets: () => {},
    normalUserTransaction: normalTransactionSample,
    setNormalUserTransaction: () => {},
    resetAllNormal: () => {},
    refetchAllNormalTicketTypes: () => {}
});

export const TicketProvider = ({children}: props) => {
    const [allNormalTicketTypes, setAllNormalTicketTypes] = useState<normalTicket[]>([]);
    const [availableNormalTickets, setAvailableNormalTickets] = useState<normalTicket[]>([]);
    const [normalUserTickets, setNormalUserTickets] = useState<normalUserTicket[]>([]);
    const [normalUserTransaction, setNormalUserTransaction] = useState<transaction>(normalTransactionSample);

    useEffect(() => {
        const getAllTickets = async () => {
            const res = await axiosClient.get('/ticket_types');
            setAllNormalTicketTypes(res.data);
            const avaliableTicketsTemp: normalTicket[] = res.data.filter((ticket: normalTicket) => (ticket.is_active === 1 && ticket.type !== 'group'));
            setAvailableNormalTickets(avaliableTicketsTemp);
            const userTicketsTemp: normalUserTicket[] = avaliableTicketsTemp.map((ticket: normalTicket) => ({
                ...ticket,
                amount: 0
            }));
            setNormalUserTickets(userTicketsTemp);
        }

        getAllTickets();
    }, []);

    const resetAllNormal = () => {
        //resets userTickets to default state
        setNormalUserTickets(availableNormalTickets.map((ticket: normalTicket) => ({
            ...ticket,
            amount: 0
        })))

        //resets userTransaction to default state
        setNormalUserTransaction(normalTransactionSample);
    }

    const refetchAllNormalTicketTypes = async () => {
        const res = await axiosClient.get('/ticket_types');
            setAllNormalTicketTypes(res.data);
            const avaliableTicketsTemp: normalTicket[] = res.data.filter((ticket: normalTicket) => (ticket.is_active === 1 && ticket.type !== 'group'));
            setAvailableNormalTickets(avaliableTicketsTemp);
            const userTicketsTemp: normalUserTicket[] = avaliableTicketsTemp.map((ticket: normalTicket) => ({
                ...ticket,
                amount: 0
            }));
            setNormalUserTickets(userTicketsTemp);
    }


    return (
        <TicketContext.Provider value={{availableNormalTickets, normalUserTickets,
        setNormalUserTickets, allNormalTicketTypes, normalUserTransaction, setNormalUserTransaction, resetAllNormal, refetchAllNormalTicketTypes}}>
            {children}
        </TicketContext.Provider>
    )
}
