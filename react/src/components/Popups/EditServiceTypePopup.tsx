import React, {useContext, useEffect, useState} from 'react'
import {useForm} from 'react-hook-form'
import {z} from "zod"
import { ZodType } from 'zod/lib'
import { zodResolver} from '@hookform/resolvers/zod'
import axiosClient from '../../axios-client'
import { TicketContext, serviceType } from '../../context/TicketContext'
import SuccessPopupTemplate from './SuccessPopupTemplate'
import { LoadingContext } from '../../context/LoadingContext'

type Props = {
    service: serviceType,
    closePopup: () => void
}

type serviceFormType = {
    name: string,
    description: string,
    price_per_customer: number,
    is_active: boolean,
    confirm_password: string
}


const ServiceTypeEditPopup = ({service, closePopup}: Props) => {
    const [isSuccessPopupOn, setIsSuccessPopupOn] = useState<boolean>(false);
    const [isFailPopupOn, setIsFailPopupOn] = useState<boolean>(false);
    const [isNoChangesPopupOn, setIsNoChangesPopupOn] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const {setLoading} = useContext(LoadingContext);


    const {resetServices} = useContext(TicketContext);

    const schema: ZodType<serviceFormType> = z.object({
        name: z.string().max(45, 'too long').min(1, 'required'),
        description: z.string().max(500, 'too long').min(1, 'required'),
        price_per_customer: z.number(),
        is_active: z.boolean(),
        confirm_password: z.string().min(1, 'required'),
    })

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<serviceFormType>({resolver: zodResolver(schema)});

    const onSubmit = async (data: serviceFormType) => {
        if (
            data.name === service.name &&
            //technically it's wrong, but it works as intended
            parseFloat(data.price_per_customer) ===  parseFloat(service.price_per_customer) &&
            data.is_active === (service.is_active === 0 ? false : true)
            ) {
                setIsNoChangesPopupOn(true);
                return;
            }

        try {
            setLoading(true);
            const response = await axiosClient.put(`/service-types/${service.id}`, data, {withCredentials: true});
            resetServices();
            setLoading(false);
            setIsSuccessPopupOn(true);
        } catch (error: any) {
            setLoading(false);
            const message =  'Failed to update service type, ' + error.response?.data?.message;
            setErrorMessage(message);
            setIsFailPopupOn(true);
        }
    };

    useEffect(() => {
        setValue('name', service.name);
        setValue('description', service.description);
        setValue('price_per_customer', service.price_per_customer);
        setValue('is_active', service.is_active === 0 ? false : true);
    }, [setValue, service]);

    return (
        <div className="edit_service_type">
            <h1>Edit</h1>
            <h3>{"Id: "+service.id + " Name: " + service.name}</h3>
            <hr />
            <form className='__form smallerGap' onSubmit={handleSubmit(onSubmit)}>
                <div className="input-wrapper">
                    <p>Name:</p>
                    <label htmlFor="name">
                        <input type="text" className={`${errors.name && "--error"}`} {...register('name', {required: true})} />
                        {errors.name && <span className={`_inputError --big`}>{errors.name.message}</span>}
                    </label>
                </div>
                <div className="input-wrapper">
                    <p>Description:</p>
                    <label htmlFor="description">
                        <textarea className={`${errors.description && "--error"}`} {...register('description', {required: true})} />
                        {errors.description && <span className={`_inputError --big`}>{errors.description.message}</span>}
                    </label>
                </div>
                <div className="input-wrapper">
                        <p>Current Price:</p>
                    <label htmlFor="price_per_customer">
                        <input type="number" className={`${errors.price_per_customer && "--error"}`} step="any" {...register('price_per_customer', {required: true, valueAsNumber: true})} />
                        {errors.price_per_customer && <span className={`_inputError --big`}>{errors.price_per_customer.message}</span>}
                    </label>
                </div>
                <label htmlFor="is_active" className='__form-is_active'>
                    <span>Is active: </span>
                    <input className='form-checkbox' type="checkbox" {...register('is_active')} />
                </label>
                <div className="input-wrapper">
                    <p>Current password:</p>
                    <label htmlFor="confirm_password">
                        <input type="password" placeholder='Current password' className={`${errors.confirm_password && "--error"}`} {...register('confirm_password', {required: true})} />
                        {errors.confirm_password && <span className={`_inputError --big`}>{errors.confirm_password.message}</span>}
                    </label>
                </div>
                <label htmlFor="savebtn" className="__orange-button-label">
                    <button type='submit' >Update</button>
                </label>
            </form>
            {isSuccessPopupOn &&
                <SuccessPopupTemplate closePopup={() => setIsSuccessPopupOn(false)} text='Service type updated successfully' closeOriginPopup={closePopup}/>
            }
            {isFailPopupOn &&
                <SuccessPopupTemplate closePopup={() => setIsFailPopupOn(false)} text={errorMessage} closeOriginPopup={closePopup}/>
            }
            {isNoChangesPopupOn &&
                <SuccessPopupTemplate closePopup={() => setIsFailPopupOn(false)} text="No changes were made" closeOriginPopup={closePopup}/>
            }
        </div>
    );
}

export default ServiceTypeEditPopup;
