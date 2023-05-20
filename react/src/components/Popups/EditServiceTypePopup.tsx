import React, {useContext, useEffect} from 'react'
import {useForm} from 'react-hook-form'
import {z} from "zod"
import { ZodType } from 'zod/lib'
import { zodResolver} from '@hookform/resolvers/zod'
import axiosClient from '../../axios-client'
import { TicketContext, serviceType } from '../../context/TicketContext'

type Props = {
    service: serviceType,
    closePopup: () => void
}

type serviceFormType = {
    name: string,
    description: string,
    price_per_customer: number,
    is_active: boolean,
    confirmPassword: string
}


const ServiceTypeEditPopup = ({service, closePopup}: Props) => {

    const {resetServices} = useContext(TicketContext);

    const schema: ZodType<serviceFormType> = z.object({
        name: z.string().max(45, 'too long').min(1, 'required'),
        description: z.string().max(500, 'too long').min(1, 'required'),
        price_per_customer: z.number(),
        is_active: z.boolean(),
        confirmPassword: z.string().min(1, 'required'),
    })

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<serviceFormType>({resolver: zodResolver(schema)});

    const onSubmit = async (data: serviceFormType) => {
        if (
            data.name === service.name &&
            //technically it's wrong, but it works as intended
            parseFloat(data.price_per_customer) ===  parseFloat(service.price_per_customer) &&
            data.is_active === (service.is_active === 0 ? false : true)
            ) {
                alert('No changes were made.');
                closePopup();
            }

        try {
            const response = await axiosClient.put(`/service_types/${service.id}`, data, {withCredentials: true});
            console.log(response);
            alert('Service updated successfully.');
            resetServices();
            closePopup();
        } catch (error: any) {
            alert('Error updating service. ' +  error.response.statusText);
            closePopup();
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
                    <label htmlFor="confirmPassword">
                        <input type="password" placeholder='Current password' className={`${errors.confirmPassword && "--error"}`} {...register('confirmPassword', {required: true})} />
                        {errors.confirmPassword && <span className={`_inputError --big`}>{errors.confirmPassword.message}</span>}
                    </label>
                </div>
                <label htmlFor="savebtn" className="__orange-button-label">
                    <button type='submit' >Update</button>
                </label>
            </form>
        </div>
    );
}

export default ServiceTypeEditPopup;
