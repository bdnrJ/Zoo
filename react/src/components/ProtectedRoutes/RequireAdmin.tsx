import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth"

type props = {
    children: ReactNode;
}

const RequireAdmin = ({children}: props): any => {
    const {isAdmin} = useAuth();
    const location = useLocation();

    return isAdmin
                ?  children
                :  <Navigate to='/' state={{ from: location}} replace />
}

export default RequireAdmin
