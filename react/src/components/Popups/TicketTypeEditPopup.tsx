import React, {useContext, useEffect, useState} from 'react'
import { TicketContext, normalTicket } from '../../context/TicketContext'
import {useForm} from 'react-hook-form'
import {z} from "zod"
import { ZodType } from 'zod/lib'
import { zodResolver} from '@hookform/resolvers/zod'
import axiosClient from '../../axios-client'
import SuccessPopupTemplate from './SuccessPopupTemplate'
import { LoadingContext } from '../../context/LoadingContext'


type Props = {
    ticketType: normalTicket
    onClose?: () => void;
}

type ticketType = {
    name: string,
    age_info: string,
    price: number,
    is_active: boolean,
    confirm_password: string
}


const TicketTypeEditPopup = ({ticketType, onClose}: Props) => {
    const {getAllTickets} = useContext(TicketContext)
    const [isSuccessPopupOn, setIsSuccessPopupOn] = useState<boolean>(false);
    const [isFailPopupOn, setIsFailPopupOn] = useState<boolean>(false);
    const [isNoChangesPopupOn, setIsNoChangesPopupOn] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const {setLoading} = useContext(LoadingContext);



    const schema: ZodType<ticketType> = z.object({
        name: z.string().max(15, 'too long').min(1, 'required'),
        age_info: z.string().max(15, 'too long').min(1, 'required'),
        price: z.number(),
        is_active: z.boolean(),
        confirm_password: z.string().min(1, 'required'),
    })

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<ticketType>({resolver: zodResolver(schema)});

    const onSubmit = async (data: ticketType) => {
        console.log(data.price.toString());
        console.log(ticketType.price.toString());

        if (
            data.name === ticketType.name &&
            data.age_info === ticketType.age_info &&
            //technically it's wrong, but it works as intended
            parseFloat(data.price) ===  parseFloat(ticketType.price) &&
            data.is_active === (ticketType.is_active === 0 ? false : true)
            ) {
                setIsNoChangesPopupOn(true);
                return;
            }

        try {
            setLoading(true)
            const response = await axiosClient.put(`/ticket_types/${ticketType.id}`, data, {withCredentials: true});
            if (response.status === 200) {
                getAllTickets();
                setIsSuccessPopupOn(true);
            }
            setLoading(false);
        } catch (error: any) {
            const message =  'Failed to update service type, ' + error.response?.data?.message;
            setErrorMessage(message);
            setIsFailPopupOn(true);
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
            <form className='__form smallerGap' onSubmit={handleSubmit(onSubmit)} >
                <div className="input-wrapper">
                    <p>Name:</p>
                    <label htmlFor="name">
                        <input type="text" className={`${errors.name && "--error"}`} {...register('name', {required: true})} />
                        {errors.name && <span className={`_inputError --big`}>{errors.name.message}</span>}
                    </label>
                </div>
                <div className="input-wrapper">
                    <p>Age info:</p>
                    <label htmlFor="age_info">
                        <input type="text" className={`${errors.age_info && "--error"}`} {...register('age_info', {required: true})} />
                        {errors.age_info && <span className={`_inputError --big`}>{errors.age_info.message}</span>}
                    </label>
                </div>
                <div className="input-wrapper">
                    <p>Price:</p>
                    <label htmlFor="price">
                        <input type="number" className={`${errors.price && "--error"}`} step="any" {...register('price', {required: true, valueAsNumber: true})} />
                        {errors.price && <span className={`_inputError --big`}>{errors.price.message}</span>}
                    </label>
                </div>
                <label htmlFor="is_active" className='__form-is_active'>
                    <span>Is active: </span>
                    <input className='form-checkbox' type="checkbox" {...register('is_active')} />
                </label>
                <div className="input-wrapper">
                    <p>Confirm Password:</p>
                    <label htmlFor="confirm_password">
                        <input type="password" className={`${errors.confirm_password && "--error"}`} {...register('confirm_password', {required: true})} placeholder="Confirm Password" />
                        {errors.confirm_password && <span className={`_inputError --big`}>{errors.confirm_password.message}</span>}
                    </label>
                </div>

                <label htmlFor="savebtn" className="__orange-button-label">
                        <button type="submit">Confirm</button>
                </label>
            </form>
            {isSuccessPopupOn &&
                <SuccessPopupTemplate closePopup={() => setIsSuccessPopupOn(false)} text='Service type updated successfully' closeOriginPopup={onClose}/>
            }
            {isFailPopupOn &&
                <SuccessPopupTemplate closePopup={() => setIsFailPopupOn(false)} text={errorMessage} closeOriginPopup={onClose}/>
            }
            {isNoChangesPopupOn &&
                <SuccessPopupTemplate closePopup={() => setIsFailPopupOn(false)} text="No changes were made" closeOriginPopup={onClose}/>
            }
        </div>
    )
}

export default TicketTypeEditPopup
