// ChangeUserByAdminPopup.tsx
import React, { useState } from 'react';
import axiosClient from '../../axios-client';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

type props = {
    closePopup: () => void;
    refreshUserData: () => void;
    user: any; // adjust according to your user type
};

type UserData = {
    firstname: string;
    lastname: string;
    email: string;
};

const ChangeUserByAdminPopup = ({ closePopup, refreshUserData, user }: props) => {
    const [updateError, setUpdateError] = useState('');

    const schema = z.object({
        firstname: z.string().min(1, 'required'),
        lastname: z.string().min(1, 'required'),
        email: z.string().email('Invalid email'),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm<UserData>({ resolver: zodResolver(schema) });

    React.useEffect(() => {
        setValue('firstname', user.firstname);
        setValue('lastname', user.lastname);
        setValue('email', user.email);
    }, [user, setValue]);

    const onSubmit = (data: UserData) => handleUpdateUser(data);

    const handleUpdateUser = async (data: UserData) => {
        try {
            const response = await axiosClient.put(`/users/${user.id}`, data, { withCredentials: true });

            setUpdateError('');
            closePopup();
            refreshUserData();
        } catch (err: any) {
            console.log(err);
            setUpdateError(err.response.data.message);
        }
    };

    return (
        <div className="change-user_data-popup">
            <h2>Update User Information</h2>
            <form onSubmit={handleSubmit(onSubmit)} className='__form'>
                    <label htmlFor="firstname">
                        <input
                            className={`_formInput ${errors.firstname && '--error'}`}
                            {...register('firstname', { required: true })}
                            placeholder="First name"
                            autoComplete="off"
                        />
                        {errors.firstname && (
                            <span className={`_inputError`}>{errors.firstname.message}</span>
                        )}
                    </label>
                    <label htmlFor="lastname">
                        <input
                            className={`_formInput ${errors.lastname && '--error'}`}
                            {...register('lastname', { required: true })}
                            placeholder="Last name"
                        />
                        {errors.lastname && (
                            <span className={`_inputError`}>{errors.lastname.message}</span>
                        )}
                    </label>
                    <label htmlFor="email">
                        <input
                            className={`_formInput ${errors.email && '--error'}`}
                            {...register('email', { required: true })}
                            placeholder="Email"
                        />
                        {errors.email && (
                            <span className={`_inputError`}>{errors.email.message}</span>
                        )}
                    </label>
                    <label htmlFor="savebtn" className="__orange-button-label">
                        <button type="submit">Save</button>
                    </label>
            </form>
            {updateError && (
                <div className="update-error">
                    <span>{updateError}</span>
                </div>
            )}
        </div>
    );
};

export default ChangeUserByAdminPopup;
