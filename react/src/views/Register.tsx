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
    pwd: string,
    confirmPwd: string
}

const Register = () => {
    const [registerErr, setRegisterErr] = useState("");
    const [success, setSuccess] = useState("");
    const [disabled, setDisabled] = useState(false);
    const navigate = useNavigate();

    const schema: ZodType<User> = z.object({
        firstname: z.string().min(1, 'required'),
        lastname: z.string().min(1, 'required'),
        email: z.string().email(),
        pwd: z.string().min(8, 'too short').max(30, 'too long').regex(
            /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
            "at least one upper/lowercase letter"
        ),
        confirmPwd: z.string().min(1, 'required')
    }).refine((data) => data.pwd === data.confirmPwd, {
        message: "Passwords dont match",
        path: ["confirmPassword"],
    })

    const { register, watch, formState: { errors } } = useForm<User>({resolver: zodResolver(schema)});

    console.log(watch(['firstname','lastname','email','pwd','confirmPwd']));


    const onSubmit = (e: any) =>{
        e.preventDefault();


        // axiosClient.post('http://localhost:8000/api/register', payload)
        //     .then(({data}) => {
        //         console.log("then part of register");
        //         console.log(data);
        //     })
        //     .catch(err => {
        //         console.log(err);
        //         const res = err.response;
        //         console.log(res);
        //     })
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
                <form onSubmit={onSubmit}>
                    <div className="form-inputwrapper">
                        <span>Firstname</span>
                        <label htmlFor="firstname">
                            <input className={`_formInput`} type="text" {...register("firstname", {required: true})}/>
                            {errors.firstname && <span className={`_inputError`}>{errors.firstname.message}</span>}
                        </label>
                    </div>
                    <div className="form-inputwrapper">
                        <span>Lastname</span>
                        <label htmlFor="lastname">
                            <input className={`_formInput`} type="text" {...register("lastname", {required: true})}/>
                            {errors.lastname && <span className={`_inputError`}>{errors.lastname.message}</span>}
                        </label>
                    </div>
                    <div className="form-inputwrapper">
                        <span>Email</span>
                        <label htmlFor="email">
                            <input className={`_formInput`} type="text" {...register("email", {required: true})}/>
                            {errors.email && <span className={`_inputError`}>{errors.email.message}</span>}
                        </label>
                    </div>
                    <div className="form-inputwrapper">
                        <span>Password</span>
                        <label htmlFor="pwd">
                            <input className={`_formInput`} type="text" {...register("pwd", {required: true})}/>
                            {errors.pwd && <span className={`_inputError`}>{errors.pwd.message}</span>}
                        </label>
                    </div>
                    <div className="form-inputwrapper">
                        <span>Confirm Password</span>
                        <label htmlFor="confirmPwd">
                            <input className={`_formInput`} type="text" {...register("confirmPwd", {required: true})}/>
                            {errors.confirmPwd && <span className={`_inputError`}>{errors.confirmPwd.message}</span>}
                        </label>
                    </div>

                    <div className="register-form-button">
                        <input type="submit" value="Sign in" />
                    </div>
                </form>
                <div className="register-form-redirect">
                    <span>Already have an account?</span>
                    <span><Link className='_styledLink' to="/login">Log in</Link></span>
                </div>
            </div>
        </div>
    )
}

export default Register
