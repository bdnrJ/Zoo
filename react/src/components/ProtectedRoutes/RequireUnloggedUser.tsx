import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth"

type props = {
    children: ReactNode;
}

const RequireUnloggedUser = ({children}: props): any => {
    const {currentUser} = useAuth();
    const location = useLocation();

    return  !currentUser
                ?  children
                :  <Navigate to='/' state={{ from: location}} replace />

}

export default RequireUnloggedUser
