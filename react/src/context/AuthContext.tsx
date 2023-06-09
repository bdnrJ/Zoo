import { createContext,Dispatch,ReactNode, SetStateAction, useEffect, useState } from "react";
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
    setCurrentUser: Dispatch<SetStateAction<User | null>>,
}

export const AuthContext = createContext<AuthContext>({
    currentUser: null,
    login: () => {},
    logout: () => {},
    isAdmin: false,
    setCurrentUser: () => {}
})

export const AuthProvider = ({children}: Props) => {
    const user = JSON.parse(localStorage.getItem('currentUser') || null);
    const [currentUser, setCurrentUser] = useState<User | null>(user || null);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);


    useEffect(() => {
        const isAdmin = async () => {
            try{
                await axiosClient.get('/isadmin',
                {
                headers: { "X-Check-Admin": "true" },
                withCredentials: true
                });
                setIsAdmin(true);
            }catch(err: any){
                setIsAdmin(false);
            }
        }
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        isAdmin();

    }, [currentUser])

    const login = async (inputs: Inputs) => {
        const response = await axiosClient.post('/login',
        {
            email: inputs.email,
            password: inputs.password,
        },{
            withCredentials: true,
        })


        setCurrentUser(response.data.user);
    }

    const logout = async () => {
        try{
            const res = await axiosClient.post('/logout',
            {},
            {withCredentials: true});
            setCurrentUser(null);
        }catch(err: any){
            if(err.response.status === 401){
                setCurrentUser(null);
                //epxired token or manually removed one
                //throw this to handle error in <LoggedUser.tsx />
                throw new Error("Something went wrong");
            }

        }
    }

    return (
        <AuthContext.Provider value={{currentUser, logout, login, isAdmin, setCurrentUser}}>
            {children}
        </AuthContext.Provider>
    )
}
