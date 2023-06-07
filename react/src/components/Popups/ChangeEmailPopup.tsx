import React, { useContext, useState } from 'react';
import axiosClient from '../../axios-client';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthContext } from '../../context/AuthContext';
import { User } from '../../types/types';
import SuccessPopupTemplate from './SuccessPopupTemplate';
import { LoadingContext } from '../../context/LoadingContext';

type props = {
    closePopup: () => void;
    refreshUserData: () => void,
};

type EmailData = {
    newEmail: string;
    confirm_password: string;
};

const ChangeEmailPopup = ({ closePopup, refreshUserData }: props) => {
    const [updateError, setUpdateError] = useState('');
    const [isSuccessPopupOn, setIsSuccessPopupOn] = useState<boolean>(false);
    const { setCurrentUser, currentUser } = useContext(AuthContext);
    const {setLoading} = useContext(LoadingContext);

    const schema = z.object({
        newEmail: z.string().email('invalid email format'),
        confirm_password: z.string().min(1, 'required'),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<EmailData>({ resolver: zodResolver(schema) });

    const onSubmit = (data: EmailData) => handleChangeEmail(data);

    const handleChangeEmail = async (data: EmailData) => {
        try {
            setLoading(true);
            const response = await axiosClient.put('/users/email', {
                newEmail: data.newEmail,
                confirm_password: data.confirm_password,
            }, { withCredentials: true });

            const newUser: User = { ...currentUser, email: data.newEmail };

            setUpdateError('');
            setCurrentUser(newUser);
            refreshUserData();
            setLoading(false);
            setIsSuccessPopupOn(true);
        } catch (err: any) {
            setLoading(false);
            console.log(err);
            setUpdateError(err.response.data.message);
        }
    };

    return (
        <div className="change-user_data-popup">
            <h2>Change Email</h2>
            <form onSubmit={handleSubmit(onSubmit)} className='__form'>
                    <div className="input-wrapper">
                        <p>Current Email</p>
                        <label htmlFor="currentEmail">
                            <input
                                className="_formInput"
                                type="email"
                                value={currentUser?.email}
                                disabled
                                placeholder="Current Email"
                            />
                        </label>
                    </div>
                    <div className="input-wrapper">
                        <p>New email</p>
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
                    <div className="input-wrapper">
                        <p>Confirm Password</p>
                        <label htmlFor="confirm_password">
                            <input
                                className={`_formInput ${errors.confirm_password && '--error'}`}
                                type="password"
                                {...register('confirm_password', { required: true })}
                                placeholder="Confirm Password"
                            />
                            {errors.confirm_password && (
                                <span className={`_inputError`}>{errors.confirm_password.message}</span>
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
                <SuccessPopupTemplate closePopup={() => setIsSuccessPopupOn(false)} text='Email has been changed successfully' closeOriginPopup={closePopup}/>
            }
        </div>
    );
};

export default ChangeEmailPopup;
