import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z, ZodType } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axiosClient from '../../axios-client';
import { TicketContext } from '../../context/TicketContext';

type TicketType = {
  name: string;
  age_info: string;
  price: number;
  type: 'normal' | 'group';
};

type props = {
    closePopup: () => void;
}

const AddTicketType = ({closePopup}: props) => {
  const { getAllTickets } = useContext(TicketContext);
  const [disabled, setDisabled] = useState(false);

  const schema: ZodType<TicketType> = z.object({
    name: z.string().max(45, 'Too long').min(1, 'Required'),
    age_info: z.string().max(100, 'Too long').min(1, 'Required'),
    price: z.number().min(0, 'Price must be non-negative'),
    type: z.enum(['normal', 'group']),
  });

  const { register, handleSubmit, formState: { errors } } = useForm<TicketType>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: TicketType) => {
    try {
      const response = await axiosClient.post('/ticket_types', {
        ...data,
        is_active: 0
      }, {withCredentials: true});
      setDisabled(true);
      alert("Created new ticket type succesfully");
      setTimeout(() => getAllTickets(), 1500);
      closePopup();
    } catch (err) {
      console.error('Error adding ticket type:', err);
      alert('Error adding ticket type.');
    }
  };

  return (
    <div className="add_ttype">
      <h1>Add Ticket Type</h1>
      <hr />
      <form className='__form' onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">
          <input type="text" placeholder='name' className={`${errors.name && "--error"}`} {...register('name', { required: true })} />
          {errors.name && <span className={`_inputError --big`}>{errors.name.message}</span>}
        </label>
        <label htmlFor="age_info">
          <input type="text" placeholder='age info' className={`${errors.age_info && "--error"}`} {...register('age_info', { required: true })} />
          {errors.age_info && <span className={`_inputError --big`}>{errors.age_info.message}</span>}
        </label>
        <label htmlFor="price">
          <input type="number" placeholder='price' className={`${errors.price && "--error"}`} step="0.01" {...register('price', { required: true, valueAsNumber: true })} />
          {errors.price && <span className={`_inputError --big`}>{errors.price.message}</span>}
        </label>
        <label htmlFor="type" className='select-type'>
        Choose Type:
        <select className='custom-select' {...register('type')} disabled={disabled}>
            <option value="normal">Normal</option>
            <option value="group">Group</option>
          </select>
          {errors.type && <span className={`_inputError --big`}>{errors.type.message}</span>}
        </label>
        <label htmlFor="submitbtn" className="__orange-button-label">
            <button disabled={disabled} type="submit">Add Ticket Type</button>
        </label>
      </form>
    </div>
  )
}

export default AddTicketType;
