// ChangePasswordPopup.tsx
import React, { useState } from 'react';
import axiosClient from '../../axios-client';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import SuccessPopupTemplate from './SuccessPopupTemplate';

type props = {
    closePopup: () => void;
    refreshUserData: () => void;
};

type PasswordData = {
    current_password: string;
    new_password: string;
    confirm_new_password: string;
};

const ChangePasswordPopup = ({ closePopup, refreshUserData }: props) => {
    const [updateError, setUpdateError] = useState('');
    const [isSuccessPopupOn, setIsSuccessPopupOn] = useState<boolean>(false);


    const schema = z.object({
        current_password: z.string().min(1, 'required'),
        new_password: z.string().min(8, 'at least 8 characters'),
        confirm_new_password: z.string().min(8, 'at least 8 characters'),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<PasswordData>({ resolver: zodResolver(schema) });

    const onSubmit = (data: PasswordData) => handleChangePassword(data);

    const handleChangePassword = async (data: PasswordData) => {
        if (data.new_password !== data.confirm_new_password) {
            setUpdateError('New passwords do not match');
            return;
        }

        try {
            const response = await axiosClient.put('/users/password', {
                current_password: data.current_password,
                new_password: data.new_password,
                confirm_new_password: data.confirm_new_password
            }, { withCredentials: true });

            setUpdateError('');
            setIsSuccessPopupOn(true);
            refreshUserData();
        } catch (err: any) {
            console.log(err);
            setUpdateError(err.response.data.message);
        }
    };

    return (
        <div className="change-user_data-popup">
            <h2>Change Password</h2>
            <form onSubmit={handleSubmit(onSubmit)} className='__form smallerGap'>
                    <div className="input-wrapper">
                        <p>Current password</p>
                        <label htmlFor="current_password">
                            <input
                                className={`_formInput ${errors.current_password && '--error'}`}
                                type="password"
                                {...register('current_password', { required: true })}
                                placeholder="Current password"
                                autoComplete="off"
                            />
                            {errors.current_password && (
                                <span className={`_inputError`}>{errors.current_password.message}</span>
                            )}
                        </label>
                    </div>
                    <div className="input-wrapper">
                        <p>New password</p>
                        <label htmlFor="new_password">
                            <input
                                className={`_formInput ${errors.new_password && '--error'}`}
                                type="password"
                                {...register('new_password', { required: true })}
                                placeholder="New password"
                            />
                            {errors.new_password && (
                                <span className={`_inputError`}>{errors.new_password.message}</span>
                            )}
                        </label>
                    </div>
                    <div className="input-wrapper">
                        <p>Confirm New Password</p>
                        <label htmlFor="confirm_new_password">
                            <input
                                className={`_formInput ${errors.confirm_new_password && '--error'}`}
                                type="password"
                                {...register('confirm_new_password', { required: true })}
                                placeholder="Confirm new password"
                            />
                            {errors.confirm_new_password && (
                                <span className={`_inputError`}>{errors.confirm_new_password.message}</span>
                            )}
                        </label>
                    </div>
                    <label htmlFor="savebtn" className="__orange-button-label">
                        <button type="submit">Save</button>
                    </label>
            </form>
            {updateError && (
                <div className="update-error">
                    <span>{updateError}</span>
                </div>
            )}
            {isSuccessPopupOn &&
                <SuccessPopupTemplate closePopup={() => setIsSuccessPopupOn(false)} text='Password has been changed successfully' closeOriginPopup={closePopup}/>
            }
        </div>
    );
};

export default ChangePasswordPopup;
