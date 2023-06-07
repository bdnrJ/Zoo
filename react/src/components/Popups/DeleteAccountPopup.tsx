import React, { useContext, useState } from 'react';
import axiosClient from '../../axios-client';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import PopupForm from './PopupForm';
import DeleteAccountSuccessPopup from './DeleteAccountSuccessPopup';
import { LoadingContext } from '../../context/LoadingContext';

type props = {
    closePopup: () => void;
    refreshUserData: () => void;
};

type DeleteAccountData = {
    password: string;
};

const DeleteAccountPopup = ({ closePopup, refreshUserData }: props) => {
    const [deleteError, setDeleteError] = useState<string>('');
    const {setCurrentUser} = useContext(AuthContext);
    const [isDeleteSuccessPopupOn, setIsDeleteSuccessPopupOn] = useState<boolean>(false);
    const navigate = useNavigate();
    const {setLoading} = useContext(LoadingContext);

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
            setLoading(true);
            const response = await axiosClient.delete('/users/delete', {
                data: { password: data.password },
                withCredentials: true,
            });
            setLoading(false);
            setIsDeleteSuccessPopupOn(true);
        } catch (err: any) {
            setLoading(false);
            setDeleteError(err.response.data.message);
        }
    };

    return (
        <div className="change-user_data-popup">
            <h2>Delete Account</h2>
            <span className='change-user_data-popup-delete_warn' >Are you sure you want to delete your account? <br/>
            This action is irreversible and will permanently delete all your data associated with the account</span>
            <form onSubmit={handleSubmit(onSubmit)} className="__form">
                <label htmlFor="password">
                    <input
                        className={`_formInput ${errors.password && '--error'}`}
                        type="password"
                        {...register('password', { required: true })}
                        placeholder="Confirm Password"
                        autoComplete="off"
                    />
                    {errors.password && (
                        <span className={`_inputError`}>{errors.password.message}</span>
                    )}
                </label>
                <div className="button-wrapper">
                    <button onClick={closePopup} type="button" className="delete-cancel-button">Cancel</button>
                    <button type="submit" className="delete-confirm-button">Delete</button>
                </div>
            </form>
            {deleteError && (
                <div className="delete-error">
                    <span>{deleteError}</span>
                </div>
            )}
            {
                isDeleteSuccessPopupOn &&
                <PopupForm closePopup={() => setIsDeleteSuccessPopupOn(false)} >
                    <DeleteAccountSuccessPopup refreshUserData={refreshUserData}/>
                </PopupForm>
            }
        </div>
    );
};

export default DeleteAccountPopup;
