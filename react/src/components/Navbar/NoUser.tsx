import {useState, useEffect, useRef} from 'react'
import {AiOutlineUser} from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import {BiLogIn, BiUserPlus} from 'react-icons/bi'



const NoUser = () => {
    const [visible, setVisible] = useState(false);
    const popupRef = useRef<any>(null);
    const navigate = useNavigate();


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
        <div className="no-user">
            <button className={`login-btn ${visible && '--active'}`} onClick={() => setVisible(true)} ><AiOutlineUser/></button>
            { visible && <div className="navbar-user-popup" ref={popupRef}>
                <button onClick={() => navigate('/login')}><BiLogIn /> Log in</button>
                <button onClick={() => navigate('/register')}><BiUserPlus />  Sign up</button>
            </div>}
        </div>
    )
}

export default NoUser
