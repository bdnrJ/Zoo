import { createContext,ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
    isAdmin: boolean
}

export const AuthContext = createContext<AuthContext>({
    currentUser: null,
    login: () => {},
    logout: () => {},
    isAdmin: false
})

export const AuthProvider = ({children}: Props) => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const [currentUser, setCurrentUser] = useState<User | null>(user || null);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);



    useEffect(() => {
        const isAdmin = async () => {
            try{
                await axiosClient.get('http://localhost:8000/api/isadmin', {withCredentials: true});
                setIsAdmin(true);
            }catch(err: any){
                setIsAdmin(false);
            }
        }
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        isAdmin();

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
        }catch(err: any){
            console.log(err);
            if(err.response.status === 401){
                setCurrentUser(null);
                //epxired token or manually removed one
                //throw this to handle error in <LoggedUser.tsx />
                throw new Error("Something went wrong");
            }

        }
    }

    return (
        <AuthContext.Provider value={{currentUser, logout, login, isAdmin}}>
            {children}
        </AuthContext.Provider>
    )
}
