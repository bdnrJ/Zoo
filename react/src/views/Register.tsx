import { useState } from 'react'
import axiosClient from '../axios-client'
import {useForm} from 'react-hook-form'
import {z} from "zod"
import { ZodType } from 'zod/lib'
import { zodResolver} from '@hookform/resolvers/zod'
import { Link, redirect, useNavigate } from 'react-router-dom'

type User={
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    confirmPwd: string
}

const Register = () => {
    const [registerErr, setRegisterErr] = useState("");
    const [success, setSuccess] = useState("");
    const [disabled, setDisabled] = useState(false);
    const navigate = useNavigate();

    const schema: ZodType<User> = z.object({
        firstname: z.string().min(1, 'Required'),
        lastname: z.string().min(1, 'Required'),
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

    const { register, handleSubmit,watch, formState: { errors } } = useForm<User>({resolver: zodResolver(schema)});

    const onSubmit = (data: User) => handleRegister(data);

    const handleRegister = async (data: User) =>{
        setSuccess("");
        try{
        const response = await axiosClient.post('http://localhost:8000/api/register',
        {
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            password: data.password,
            confirmPwd: data.confirmPwd
        });

        setSuccess("Registered succesfully");
        setRegisterErr("");
        setDisabled(true);
        setTimeout(() => navigate('/'), 1500);
        }catch(err: any){
            setRegisterErr(err.response.data.message);
        }
    }

    return (
        <div className="register">
            <div className="register-form">
                <div className="form-header">
                    <div className="form-header-error">
                        {registerErr && <span className='register-error' >{registerErr}</span> }
                        {success && <span className='register-success'>{success}</span> }
                    </div>
                    <div className="form-header-title">
                        Sign up
                    </div>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-inputwrapper">
                        <span>Firstname</span>
                        <label htmlFor="firstname">
                            <input className={`_formInput ${errors.firstname && "--error"}`} type="text" {...register("firstname", {required: true})}/>
                            {errors.firstname && <span className={`_inputError`}>{errors.firstname.message}</span>}
                        </label>
                    </div>
                    <div className="form-inputwrapper">
                        <span>Lastname</span>
                        <label htmlFor="lastname">
                            <input className={`_formInput ${errors.lastname && "--error"}`} type="text" {...register("lastname", {required: true})}/>
                            {errors.lastname && <span className={`_inputError`}>{errors.lastname.message}</span>}
                        </label>
                    </div>
                    <div className="form-inputwrapper">
                        <span>Email</span>
                        <label htmlFor="email">
                            <input className={`_formInput ${errors.email && "--error"}`} type="text" {...register("email", {required: true})}/>
                            {errors.email && <span className={`_inputError`}>{errors.email.message}</span>}
                        </label>
                    </div>
                    <div className="form-inputwrapper">
                        <span>Password</span>
                        <label htmlFor="password">
                            <input className={`_formInput ${errors.password && "--error"}`} type="password" {...register("password", {required: true})}/>
                            {errors.password && <span className={`_inputError`}>{errors.password.message}</span>}
                        </label>
                        <span className="password-requirements" >At least 8 characters, one lower letter, one upper letter</span>
                    </div>
                    <div className="form-inputwrapper">
                        <span>Confirm Password</span>
                        <label htmlFor="confirmPwd">
                            <input className={`_formInput ${errors.confirmPwd && "--error"}`} type="password" {...register("confirmPwd", {required: true})}/>
                            {errors.confirmPwd && <span className={`_inputError`}>{errors.confirmPwd.message}</span>}
                        </label>
                    </div>

                    <div className="login-form-button">
                        <input disabled={disabled} type="submit" value="Sign up" className='_confirmButton' />
                    </div>
                </form>
                <div className="register-form-redirect">
                    <span>Already have an account?</span>
                    <span>
                        {disabled ? <span className='_link'>Log in</span>
                                :<Link className='_link' to="/login">Log in</Link>}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Register
