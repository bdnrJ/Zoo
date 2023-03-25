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

    return (
        <div className='loggeduser' >
            <button onClick={() => setVisible(true)}>{user.firstname}</button>
            {visible && <div className='navbar-user-popup' ref={popupRef}>
                <span>{user.firstname + "  " + user.lastname}</span>
                <span>{user.email}</span>
                <hr />
                <button>Settings</button>
                <button>Transactions</button>
                <button>cos tam</button>
                <button onClick={logout} >Logout</button>
            </div>}
        </div>
    )
}

export default LoggedUser
