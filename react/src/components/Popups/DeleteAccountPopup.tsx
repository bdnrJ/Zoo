import React, { useState } from 'react';
import axiosClient from '../../axios-client';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

type props = {
    closePopup: () => void;
    refreshUserData: () => void;
};

type DeleteAccountData = {
    password: string;
};

const DeleteAccountPopup = ({ closePopup, refreshUserData }: props) => {
    const [deleteError, setDeleteError] = useState('');

    const schema = z.object({
        password: z.string().min(1, 'required'),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<DeleteAccountData>({ resolver: zodResolver(schema) });

    const onSubmit = (data: DeleteAccountData) => handleDeleteAccount(data);

    const handleDeleteAccount = async (data: DeleteAccountData) => {
        try {
            const response = await axiosClient.delete('/user/delete', {
                data: { password: data.password },
                withCredentials: true,
            });

            closePopup();
            refreshUserData();
        } catch (err: any) {
            setDeleteError(err.response.data.message);
        }
    };

    return (
        <div className="change-user_data-popup">
            <h2>Delete Account</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="__form">
                <label htmlFor="password">
                    <input
                        className={`_formInput ${errors.password && '--error'}`}
                        type="password"
                        {...register('password', { required: true })}
                        placeholder="Password"
                        autoComplete="off"
                    />
                    {errors.password && (
                        <span className={`_inputError`}>{errors.password.message}</span>
                    )}
                </label>
                <div className="button-wrapper">
                        <button onClick={closePopup} type="button" className="__cancel-button">Cancel</button>
                    <button type="submit" className="__delete-button">Delete</button>
                </div>
            </form>
            {deleteError && (
                <div className="delete-error">
                    <span>{deleteError}</span>
                </div>
            )}
        </div>
    );
};

export default DeleteAccountPopup;
