import { createContext,ReactNode, useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { User } from "../types/types";

type Props = {
    children: ReactNode,
}

type Inputs = {
    email: string,
    password: string,
}

interface AuthContext{
    currentUser: User | null,
    login: (inputs: Inputs) => void,
    logout: () => void,
}

export const AuthContext = createContext<AuthContext>({
    currentUser: null,
    login: () => {},
    logout: () => {}
})

export const AuthProvider = ({children}: Props) => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const [currentUser, setCurrentUser] = useState<User | null>(user || null);

    useEffect(() => {
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }, [currentUser])

    const login = async (inputs: Inputs) => {
        const response = await axiosClient.post('http://localhost:8000/api/login',
        {
            email: inputs.email,
            password: inputs.password,
        },{
            withCredentials: true,
        })

        console.log(response);

        setCurrentUser(response.data.user);
    }

    const logout = async () => {
        try{
            const res = await axiosClient.post('http://localhost:8000/api/logout',
            {},
            {withCredentials: true});
            setCurrentUser(null);
            console.log(res);
        }catch(err){
            console.log(err);
        }
    }

    return (
        <AuthContext.Provider value={{currentUser, logout, login}}>
            {children}
        </AuthContext.Provider>
    )
}
