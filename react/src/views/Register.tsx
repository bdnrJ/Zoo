import { useContext, useState } from 'react'
import axiosClient from '../axios-client'
import { useForm } from 'react-hook-form'
import { z } from "zod"
import { ZodType } from 'zod/lib'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, redirect, useNavigate } from 'react-router-dom'
import PopupForm from '../components/Popups/PopupForm'
import LinkDonationsPopup from '../components/Popups/LinkDonationsPopup'
import { LoadingContext } from '../context/LoadingContext'

type User = {
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    confirmPwd: string
}

const Register = () => {
    const [registerErr, setRegisterErr] = useState("");
    const [disabled, setDisabled] = useState(false);
    const navigate = useNavigate();
    const [isDonationsPopupOn, setIsDonationPopupOn] = useState<boolean>(false);
    const [user, setUser] = useState<any>();
    const {setLoading} = useContext(LoadingContext);


    const schema: ZodType<User> = z.object({
        firstname: z.string().min(1, 'Required').max(30, 'too long'),
        lastname: z.string().min(1, 'Required').max(30, 'too long'),
        email: z.string().email(),
        password: z.string().min(8, 'Too short').max(30, 'Too long').regex(
            /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
            "bad format"
        ),
        confirmPwd: z.string().min(1, 'required')
    }).refine((data) => data.password === data.confirmPwd, {
        message: "Not equals",
        path: ["confirmPwd"],
    })

    const { register, handleSubmit, watch, formState: { errors } } = useForm<User>({ resolver: zodResolver(schema) });

    const onSubmit = (data: User) => handleRegister(data);

    const handleRegister = async (data: User) => {
        try {
            setLoading(true);
            const response = await axiosClient.post('/register',
                {
                    firstname: data.firstname,
                    lastname: data.lastname,
                    email: data.email,
                    password: data.password,
                    confirmPwd: data.confirmPwd
                });

            if (response.data.previous_donations_exist) {
                setUser(response.data.user);
                setLoading(false);
                setIsDonationPopupOn(true);
            } else {
                setRegisterErr("");
                setDisabled(true);
                console.log(response);
                setLoading(false);
                setTimeout(() => navigate('/login'), 1500);
            }
        } catch (err: any) {
            setLoading(false);
            setRegisterErr(err.response.data.message);
        }
    }

    return (
        <div className="register">
            <div className="register-form">
                <div className="form-header">
                    <div className="form-header-error">
                        {registerErr && <span className='register-error' >{registerErr}</span>}
                    </div>
                    <div className="form-header-title">
                        Create an account
                    </div>
                    <hr />
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-inputwrapper">
                        <label htmlFor="firstname">
                            <input className={`_formInput ${errors.firstname && "--error"}`} type="text" {...register("firstname", { required: true })} placeholder='Firstname' />
                            {errors.firstname && <span className={`_inputError`}>{errors.firstname.message}</span>}
                        </label>
                    </div>
                    <div className="form-inputwrapper">
                        <label htmlFor="lastname">
                            <input className={`_formInput ${errors.lastname && "--error"}`} type="text" {...register("lastname", { required: true })} placeholder='Lastname' />
                            {errors.lastname && <span className={`_inputError`}>{errors.lastname.message}</span>}
                        </label>
                    </div>
                    <div className="form-inputwrapper">
                        <label htmlFor="email">
                            <input className={`_formInput ${errors.email && "--error"}`} type="text" {...register("email", { required: true })} placeholder='Email' />
                            {errors.email && <span className={`_inputError`}>{errors.email.message}</span>}
                        </label>
                    </div>
                    <div className="form-inputwrapper">
                        <label htmlFor="password">
                            <input className={`_formInput ${errors.password && "--error"}`} type="password" {...register("password", { required: true })} placeholder='Password' />
                            {errors.password && <span className={`_inputError`}>{errors.password.message}</span>}
                        </label>
                        <span className="password-requirements" >At least 8 characters, one lower letter, one upper letter</span>
                    </div>
                    <div className="form-inputwrapper">
                        <label htmlFor="confirmPwd">
                            <input className={`_formInput ${errors.confirmPwd && "--error"}`} type="password" {...register("confirmPwd", { required: true })} placeholder='Confirm Password' />
                            {errors.confirmPwd && <span className={`_inputError`}>{errors.confirmPwd.message}</span>}
                        </label>
                    </div>

                    <label htmlFor="loginbtn" className='__orange-button-label'>
                        <input disabled={disabled} type="submit" value="Sign up" />
                    </label>

                </form>
                <div className="register-form-redirect">
                    <span>Already have an account?</span>
                    <span>
                        {disabled ? <span className='_link'>Log in</span>
                            : <Link className='_link' to="/login">Log in</Link>}
                    </span>
                </div>
                <div className="login-form-info">
                    <span>Why do I need an account?</span>
                    45% of the income from tickets sold goes to our "Save wildlife"
                    foundation, which is why it is so important for us to verify our
                    guests. Thank you for your understanding and we wish you a pleasant visit to the zoo!
                </div>
            </div>
            {isDonationsPopupOn &&
                <PopupForm closePopup={() => setIsDonationPopupOn(false)}>
                    <LinkDonationsPopup user={user}/>
                </PopupForm>
            }
        </div>
    )
}

export default Register
