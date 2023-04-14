import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";
import axiosClient from "../axios-client";

type props = {
    children: ReactNode
}

type normalTicket = {
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

export interface normalTransaction {
    buy_date: Date,
    exp_date: Date,
    total_cost: number,
    type: string,
    normal_tickets: normalTransactionTickets[]
}
export interface groupTransactionTicket{
    people: number,
    educational_materials: boolean,
    guided_tour: boolean,
    food_included: boolean
}
export interface groupTransaction {
    buy_date: Date,
    exp_date: Date,
    total_cost: number,
    type: string,
    group_ticket: groupTransactionTicket
}


interface TicketContext{
    availableNormalTickets: normalTicket[],
    allNormalTicketTypes: normalTicket[],
    normalUserTickets: normalUserTicket[],
    normalUserTransaction: normalTransaction,
    setNormalUserTickets: Dispatch<SetStateAction<normalUserTicket[]>>,
    setNormalUserTransaction: Dispatch<SetStateAction<normalTransaction>>,
    resetAllNormal: () => void
}

const normalTransactionSample: normalTransaction ={
    buy_date: new Date(),
    exp_date: new Date(),
    total_cost: 0,
    type: 'normal',
    normal_tickets: []
}

const groupTransactionSample: groupTransaction ={
    buy_date: new Date(),
    exp_date: new Date(),
    total_cost: 0,
    type: 'group',
    group_ticket: {
        people: 10,
        educational_materials: false,
        guided_tour: false,
        food_included: false
    }
}

export const TicketContext = createContext<TicketContext>({
    availableNormalTickets: [],
    allNormalTicketTypes: [],
    normalUserTickets: [],
    setNormalUserTickets: () => {},
    normalUserTransaction: normalTransactionSample,
    setNormalUserTransaction: () => {},
    resetAllNormal: () => {}
});

export const TicketProvider = ({children}: props) => {
    const [allNormalTicketTypes, setAllNormalTicketTypes] = useState<normalTicket[]>([]);
    const [availableNormalTickets, setAvailableNormalTickets] = useState<normalTicket[]>([]);
    const [normalUserTickets, setNormalUserTickets] = useState<normalUserTicket[]>([]);
    const [normalUserTransaction, setNormalUserTransaction] = useState<normalTransaction>(normalTransactionSample);
    const [groupUserTransaction, setGroupUserTransaction] = useState<groupTransaction>(groupTransactionSample);

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


    return (
        <TicketContext.Provider value={{availableNormalTickets, normalUserTickets,
        setNormalUserTickets, allNormalTicketTypes, normalUserTransaction, setNormalUserTransaction, resetAllNormal}}>
            {children}
        </TicketContext.Provider>
    )
}
