import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { FaSmileBeam } from "react-icons/fa";

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

export type serviceType = {
    id: number,
    name: string,
    type?: string,
    price_per_customer: string,
    is_active: number,
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
    resetAllNormal: () => void,
    getAllTickets: () => void,
    availableGroupTicket: normalTicket
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

const tempGroupTicket: normalTicket = {
    id: -1,
    age_info: "",
    name: "",
    created_at: null,
    updated_at: null,
    is_active: 0,
    type: "",
    price: 0,
}


export const TicketContext = createContext<TicketContext>({
    availableNormalTickets: [],
    allNormalTicketTypes: [],
    normalUserTickets: [],
    setNormalUserTickets: () => {},
    normalUserTransaction: normalTransactionSample,
    setNormalUserTransaction: () => {},
    resetAllNormal: () => {},
    getAllTickets: () => {},
    availableGroupTicket: tempGroupTicket
});

export const TicketProvider = ({children}: props) => {
    const [allNormalTicketTypes, setAllNormalTicketTypes] = useState<normalTicket[]>([]);
    const [availableNormalTickets, setAvailableNormalTickets] = useState<normalTicket[]>([]);
    const [normalUserTickets, setNormalUserTickets] = useState<normalUserTicket[]>([]);
    const [normalUserTransaction, setNormalUserTransaction] = useState<transaction>(normalTransactionSample);

    const [availableGroupTicket, setAvailableGroupTicket] = useState<normalTicket>(tempGroupTicket);

    const [serviceTypes, setServiceTypes] = useState<serviceType[]>([]);

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

        const availableGroupTicket: normalTicket = res.data.find((ticket: normalTicket) => (ticket.is_active === 1 && ticket.type === 'group'));
        setAvailableGroupTicket(availableGroupTicket);
    }

    useEffect(() => {
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
        <TicketContext.Provider value={{
            availableNormalTickets,
            normalUserTickets,
            setNormalUserTickets,
            allNormalTicketTypes,
            normalUserTransaction,
            setNormalUserTransaction,
            resetAllNormal,
            getAllTickets,
            availableGroupTicket,
            }}>
            {children}
        </TicketContext.Provider>
    )
}
