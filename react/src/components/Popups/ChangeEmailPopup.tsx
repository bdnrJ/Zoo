// ChangeEmailPopup.tsx
import React, { useContext, useState } from 'react';
import axiosClient from '../../axios-client';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthContext } from '../../context/AuthContext';
import { User } from '../../types/types';

type props = {
    closePopup: () => void;
    refreshUserData: () => void,
};

type EmailData = {
    newEmail: string;
    confirmPassword: string;
};

const ChangeEmailPopup = ({ closePopup, refreshUserData }: props) => {
    const [updateError, setUpdateError] = useState('');
    const { setCurrentUser, currentUser } = useContext(AuthContext);

    const schema = z.object({
        newEmail: z.string().email('Invalid email address'),
        confirmPassword: z.string().min(8, 'Password must be at least 8 characters long'),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<EmailData>({ resolver: zodResolver(schema) });

    const onSubmit = (data: EmailData) => handleChangeEmail(data);

    const handleChangeEmail = async (data: EmailData) => {
        try {
            const response = await axiosClient.put('/user/update/email', {
                newEmail: data.newEmail,
                confirmPassword: data.confirmPassword,
            }, { withCredentials: true });

            const newUser: User = { ...currentUser, email: data.newEmail };

            setUpdateError('');
            closePopup();
            setCurrentUser(newUser);
            refreshUserData();
        } catch (err: any) {
            console.log(err);
            setUpdateError(err.response.data.message);
        }
    };

    return (
        <div className="change-email-popup">
            <h2>Change Email</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-inputwrapper">
                    <label htmlFor="currentEmail">
                        <input
                            className="_formInput"
                            type="email"
                            value={currentUser.email}
                            disabled
                            placeholder="Current Email"
                        />
                    </label>
                </div>
                <div className="form-inputwrapper">
                    <label htmlFor="newEmail">
                        <input
                            className={`_formInput ${errors.newEmail && '--error'}`}
                            type="email"
                            {...register('newEmail', { required: true })}
                            placeholder="New Email"
                        />
                        {errors.newEmail && (
                            <span className={`_inputError`}>{errors.newEmail.message}</span>
                        )}
                    </label>
                </div>
                <div className="form-inputwrapper">
                    <label htmlFor="confirmPassword">
                        <input
                            className={`_formInput ${errors.confirmPassword && '--error'}`}
                            type="password"
                            {...register('confirmPassword', { required: true })}
                            placeholder="Confirm Password"
                        />
                        {errors.confirmPassword && (
                            <span className={`_inputError`}>{errors.confirmPassword.message}</span>
                        )}
                    </label>
                </div>
                <div className="form-inputwrapper">
                    <label htmlFor="savebtn" className="__orange-button-label">
                        <input type="submit" value="Save" />
                    </label>
                </div>
            </form>
            {updateError && (
                <div className="update-error">
                    <span>{updateError}</span>
                </div>
            )}
        </div>
    );
};

export default ChangeEmailPopup;
