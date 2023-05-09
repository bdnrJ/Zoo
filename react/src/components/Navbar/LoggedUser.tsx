import { useNavigate } from 'react-router-dom'
import {useState, useEffect, useRef, useContext} from 'react'
import { User } from '../../types/types'
import { AuthContext } from '../../context/AuthContext'

type props = {
    user: User
}

const LoggedUser = ({user}: props) => {
    const [visible, setVisible] = useState(false);
    const popupRef = useRef<any>(null);
    const navigate = useNavigate();
    const {logout} = useContext(AuthContext);


    //handling popup visibility
    useEffect(() => {
        function handleClickOutside(event: Event) {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setVisible(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [popupRef]);


    //this only exists beacuse i cant use navigate('login') inside AuthContext
    const handleLogout = async () => {
        try{
            await logout();
        }catch(err){
            navigate('/login');
        }
    }

    return (
        <div className='loggeduser' >
            <button className='loggeduser-button' onClick={() => setVisible(true)}>{user.firstname}</button>
            {visible && <div className='navbar-user-popup' ref={popupRef}>
                <span>{user.firstname + "  " + user.lastname}</span>
                <span>{user.email}</span>
                <hr />
                <button onClick={() => navigate('/my_account')} >My account</button>
                <button>My tickets</button>
                <button onClick={handleLogout} >Logout</button>
            </div>}
        </div>
    )
}

export default LoggedUser
