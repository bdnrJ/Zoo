import {useState, useEffect, useContext} from 'react';
import logo from '../../assets/logo.gif';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import NoUser from './NoUser';
import LoggedUser from './LoggedUser';
import UserButtons from './UserButtons';
import AdminButtons from './AdminButtons';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState<boolean>(false);
    const {currentUser} = useContext(AuthContext);
    const navigate = useNavigate();

    //navbar scroll style change after scrolling from top
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            scrollPosition > 120 ? setIsScrolled(true) : setIsScrolled(false);
        }

        window.addEventListener('scroll', handleScroll);

        return () => {
        window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
            <div className="navbar-content">
                <div className="navbar-logo" onClick={() => navigate('/')}>
                    <img src={logo} alt="logo" />
                </div>
                <div className="navbar-rightside">
                    <div className="navbar-rightside-links">
                        {!currentUser?.role
                            ? <UserButtons />
                            : <AdminButtons />
                        }
                    </div>
                    <div className="navbar-rightside-user">
                        { currentUser
                            ? <LoggedUser user={currentUser} />
                            : <NoUser />
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
