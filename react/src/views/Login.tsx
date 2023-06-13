import { useContext, useState } from 'react'
import axiosClient from '../axios-client'
import {useForm} from 'react-hook-form'
import {z} from "zod"
import { ZodType } from 'zod/lib'
import { zodResolver} from '@hookform/resolvers/zod'
import { Link, redirect, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { LoadingContext } from '../context/LoadingContext'
type User={
    email: string,
    password: string,
}

const Login = () => {
    const [loginErr, setLoginErr] = useState("");
    const [disabled, setDisabled] = useState(false);
    const navigate = useNavigate();
    const {login} = useContext(AuthContext);
    const {setLoading} = useContext(LoadingContext);


    const schema: ZodType<User> = z.object({
        email: z.string().min(1, 'required'),
        password: z.string().min(1, 'required'),
    })

    const { register, handleSubmit, watch, formState: { errors } } = useForm<User>({resolver: zodResolver(schema)});

    const onSubmit = async (data: User) => {
        setLoading(true);
        try{
            await login(data);
            setLoading(false);
            navigate(-1);
        }catch(err: any){
            setLoading(false);
            setLoginErr(err.response.data.message);
        }
    }

    const handleLogin = async (data: User) =>{
        try{
        const response = await axiosClient.post('/login',
        {
            email: data.email,
            password: data.password,
        },)

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
                        Good to see you back!
                    </div>
                    <div className="form-header-subtitle">
                        Log in to buy tickets and view past transactions
                    </div>
                    <hr />
                </div>

                <form onSubmit={handleSubmit(onSubmit)} >
                    <div className="form-inputwrapper">
                        <label htmlFor="email">
                            <input className={`_formInput ${errors.email && "--error"}`} type="text" {...register("email", {required: true})} placeholder='Email'/>
                            {errors.email && <span className={`_inputError`}>{errors.email.message}</span>}
                        </label>
                    </div>

                    <div className="form-inputwrapper">
                        <label htmlFor="password">
                            <input className={`_formInput ${errors.password && "--error"}`} type="password" {...register("password", {required: true})} placeholder='Password'/>
                            {errors.password && <span className={`_inputError`}>{errors.password.message}</span>}
                        </label>
                    </div>

                    <label htmlFor="loginbtn" className='__orange-button-label'>
                        <input disabled={disabled} type="submit" value="Login"/>
                    </label>

                </form>
                <div className="login-form-redirect">
                    <span>Don’t have an account yet? Sign up</span>
                    <span>
                        {disabled ? <span className='_link'>Sign up</span>
                                :<Link className='_link' to="/register">Sign up</Link>}
                    </span>
                </div>
                <div className="login-form-info">
                    <span>Why do I need an account?</span>
                    45% of the income from tickets sold goes to our "Save wildlife"
                    foundation, which is why it is so important for us to verify our
                    guests. Thank you for your understanding and we wish you a pleasant visit to the zoo!
                </div>
            </div>
        </div>
    )
}

export default Login
