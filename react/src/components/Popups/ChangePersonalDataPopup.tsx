import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { ZodType } from 'zod/lib';
import { zodResolver } from '@hookform/resolvers/zod';
import axiosClient from '../../axios-client';
import { AuthContext } from '../../context/AuthContext';
import { User } from '../../types/types';
import SuccessPopupTemplate from './SuccessPopupTemplate';

type props = {
    closePopup: () => void,
    refreshUserData: () => void,
}

type PersonalData = {
    firstname: string;
    lastname: string;
};

const ChangePersonalDataPopup = ({ closePopup, refreshUserData }: props) => {
    const [updateError, setUpdateError] = useState('');
    const [disabled, setDisabled] = useState(false);
    const { setCurrentUser, currentUser } = useContext(AuthContext);
    const [isSuccessPopupOn, setIsSuccessPopupOn] = useState<boolean>(false);



    const schema: ZodType<PersonalData> = z.object({
        firstname: z.string().min(1, 'Required').max(30, 'Too long'),
        lastname: z.string().min(1, 'Required').max(30, 'Too long'),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } =  useForm<PersonalData>({ resolver: zodResolver(schema), defaultValues: { firstname: currentUser.firstname, lastname: currentUser.lastname } });

    const onSubmit = (data: PersonalData) => handleUpdate(data);

    const handleUpdate = async (data: PersonalData) => {
        try {
            const response = await axiosClient.put('/users/credentials', {
                firstname: data.firstname,
                lastname: data.lastname,
            }, { withCredentials: true });

            const newUser: User = { ...currentUser, firstname: data.firstname, lastname: data.lastname };

            setUpdateError('');
            setDisabled(true);
            setIsSuccessPopupOn(true);
            setCurrentUser(newUser);
            refreshUserData();
        } catch (err: any) {
            setUpdateError(err.response.data.message);
        }
    };

    return (
        <div className="change-user_data-popup">
            <h2>Change Personal Data</h2>
            <form onSubmit={handleSubmit(onSubmit)} className='__form'>
                    <div className="input-wrapper">
                        <p>Firstname</p>
                        <label htmlFor="firstname">
                            <input
                                className={`_formInput ${errors.firstname && '--error'}`}
                                type="text"
                                {...register('firstname', { required: true })}
                                placeholder="First name"
                            />
                            {errors.firstname && (
                                <span className={`_inputError`}>{errors.firstname.message}</span>
                            )}
                        </label>
                    </div>
                    <div className="input-wrapper">
                        <p>Lastname</p>
                        <label htmlFor="lastname">
                            <input
                                className={`_formInput ${errors.lastname && '--error'}`}
                                type="text"
                                {...register('lastname', { required: true })}
                                placeholder="Last name"
                            />
                            {errors.lastname && (
                                <span className={`_inputError`}>{errors.lastname.message}</span>
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
                <SuccessPopupTemplate closePopup={() => setIsSuccessPopupOn(false)} text='Your credentials has been changed successfully' closeOriginPopup={closePopup}/>
            }
        </div>
    );
};

export default ChangePersonalDataPopup;
