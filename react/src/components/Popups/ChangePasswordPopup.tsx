// ChangePasswordPopup.tsx
import React, { useState } from 'react';
import axiosClient from '../../axios-client';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

type props = {
    closePopup: () => void;
    refreshUserData: () => void;
};

type PasswordData = {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
};

const ChangePasswordPopup = ({ closePopup, refreshUserData }: props) => {
    const [updateError, setUpdateError] = useState('');

    const schema = z.object({
        currentPassword: z.string().min(1, 'required'),
        newPassword: z.string().min(8, 'at least 8 characters'),
        confirmNewPassword: z.string().min(8, 'at least 8 characters'),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<PasswordData>({ resolver: zodResolver(schema) });

    const onSubmit = (data: PasswordData) => handleChangePassword(data);

    const handleChangePassword = async (data: PasswordData) => {
        if (data.newPassword !== data.confirmNewPassword) {
            setUpdateError('New passwords do not match');
            return;
        }

        try {
            const response = await axiosClient.put('/users/password', {
                currentPassword: data.currentPassword,
                newPassword: data.newPassword,
                confirmNewPassword: data.confirmNewPassword
            }, { withCredentials: true });

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
            <h2>Change Password</h2>
            <form onSubmit={handleSubmit(onSubmit)} className='__form'>
                    <label htmlFor="currentPassword">
                        <input
                            className={`_formInput ${errors.currentPassword && '--error'}`}
                            type="password"
                            {...register('currentPassword', { required: true })}
                            placeholder="Current password"
                            autoComplete="off"
                        />
                        {errors.currentPassword && (
                            <span className={`_inputError`}>{errors.currentPassword.message}</span>
                        )}
                    </label>
                    <label htmlFor="newPassword">
                        <input
                            className={`_formInput ${errors.newPassword && '--error'}`}
                            type="password"
                            {...register('newPassword', { required: true })}
                            placeholder="New password"
                        />
                        {errors.newPassword && (
                            <span className={`_inputError`}>{errors.newPassword.message}</span>
                        )}
                    </label>
                    <label htmlFor="confirmNewPassword">
                        <input
                            className={`_formInput ${errors.confirmNewPassword && '--error'}`}
                            type="password"
                            {...register('confirmNewPassword', { required: true })}
                            placeholder="Confirm new password"
                        />
                        {errors.confirmNewPassword && (
                            <span className={`_inputError`}>{errors.confirmNewPassword.message}</span>
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

export default ChangePasswordPopup;
