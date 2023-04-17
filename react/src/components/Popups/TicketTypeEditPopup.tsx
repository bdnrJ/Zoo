import React, {useContext, useEffect} from 'react'
import { TicketContext, normalTicket } from '../../context/TicketContext'
import {useForm} from 'react-hook-form'
import {z} from "zod"
import { ZodType } from 'zod/lib'
import { zodResolver} from '@hookform/resolvers/zod'
import axiosClient from '../../axios-client'


type Props = {
    ticketType: normalTicket
    onClose?: () => void;
}

type ticketType = {
    name: string,
    age_info: string,
    price: number,
    is_active: boolean
}


const TicketTypeEditPopup = ({ticketType, onClose}: Props) => {
    const {getAllTickets} = useContext(TicketContext)

    const schema: ZodType<ticketType> = z.object({
        name: z.string().max(15, 'too long'),
        age_info: z.string().max(15, 'too long'),
        price: z.number(),
        is_active: z.boolean(),
    })

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<ticketType>({resolver: zodResolver(schema)});

    const onSubmit = async (data: ticketType) => {
        console.log(data.price.toString());
        console.log(ticketType.price.toString());

        if (
            data.name === ticketType.name &&
            data.age_info === ticketType.age_info &&
            parseFloat(data.price) ===  parseFloat(ticketType.price) &&
            data.is_active === (ticketType.is_active === 0 ? false : true)
            ) {
                alert('No changes were made.');
                console.log('No changes were made.');
                if(onClose)
                onClose();
                return;
            }

        try {
            const response = await axiosClient.put(`/ticket_types/${ticketType.id}`, data, {withCredentials: true});
            if (response.status === 200) {
                alert('Ticket type updated successfully.');
                getAllTickets();
                if(onClose)
                onClose();
            }
        } catch (error) {
            console.error('Error updating ticket type:', error);
            alert('Error updating ticket type.');
            if(onClose)
            onClose();
        }
    };

    useEffect(() => {
        setValue('name', ticketType.name);
        setValue('age_info', ticketType.age_info);
        setValue('price', ticketType.price);
        setValue('is_active', ticketType.is_active === 0 ? false : true);
    }, [setValue, ticketType]);

    return (
        <div className="edit_ticket_type">
            <h1>Edit</h1>
            <h3>{"Id: "+ticketType.id + " Name: " + ticketType.name}</h3>
            <hr />
            <form className='__form' onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="name">
                    <input type="text" className={`${errors.name && "--error"}`} {...register('name', {required: true})} />
                    {errors.name && <span className={`_inputError`}>{errors.name.message}</span>}
                </label>
                <label htmlFor="age_info">
                    <input type="text" {...register('age_info', {required: true})} />
                    {errors.age_info && <span className={`_inputError`}>{errors.age_info.message}</span>}
                </label>
                <label htmlFor="price">
                    <input type="number" step="any" {...register('price', {required: true, valueAsNumber: true})} />
                    {errors.price && <span className={`_inputError`}>{errors.price.message}</span>}
                </label>
                <label htmlFor="is_active">
                    <span>Is active: </span>
                    <input className='form-checkbox' type="checkbox" {...register('is_active')} />
                </label>
                <button type='submit'>
                    Confirm
                </button>
            </form>
        </div>
    )
}

export default TicketTypeEditPopup
