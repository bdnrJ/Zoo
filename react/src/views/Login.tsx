import { useState } from 'react'
import axiosClient from '../axios-client'
import {useForm} from 'react-hook-form'
import {z} from "zod"
import { ZodType } from 'zod/lib'
import { zodResolver} from '@hookform/resolvers/zod'
import { Link, redirect, useNavigate } from 'react-router-dom'
type User={
    email: string,
    pwd: string,
}

const Login = () => {
    const [loginErr, setLoginErr] = useState("");
    const [disabled, setDisabled] = useState(false);
    const navigate = useNavigate();

    const schema: ZodType<User> = z.object({
        email: z.string().min(1, 'required'),
        pwd: z.string().min(1, 'required'),
    })

    const { register, handleSubmit, watch, formState: { errors } } = useForm<User>({resolver: zodResolver(schema)});

    const onSubmit = (data: User) => handleRegister(data);

    const handleRegister = async (data: User) =>{
        try{
        const response = await axiosClient.post('http://localhost:8000/api/login',
        {
            email: data.email,
            pwd: data.pwd,
        });

        navigate('/');
        }catch(err: any){
            setLoginErr(err.response.data.message);
        }
    }

    return (
        <div className="login">
            <div className="login-form">
                <div className="form-header">
                    <div className="form-header-error">
                        {loginErr && <span className='login-error' >{loginErr}</span> }
                    </div>
                    <div className="form-header-title">
                        Login
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} >
                    <div className="form-inputwrapper">
                        <span>Email</span>
                        <label htmlFor="email">
                            <input className={`_formInput ${errors.email && "--error"}`} type="text" {...register("email", {required: true})}/>
                            {errors.email && <span className={`_inputError`}>{errors.email.message}</span>}
                        </label>
                    </div>

                    <div className="form-inputwrapper">
                        <span>Password</span>
                        <label htmlFor="pwd">
                            <input className={`_formInput ${errors.pwd && "--error"}`} type="text" {...register("pwd", {required: true})}/>
                            {errors.pwd && <span className={`_inputError`}>{errors.pwd.message}</span>}
                        </label>
                    </div>
                    <div className="register-form-button">
                        <input disabled={disabled} type="submit" value="Login" className='_confirmButton' />
                    </div>
                </form>
                <div className="login-form-redirect">
                    <span>Dont have an account?</span>
                    <span>
                        {disabled ? <span className='_link'>Sign up</span>
                                :<Link className='_link' to="/register">Sign up</Link>}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Login
