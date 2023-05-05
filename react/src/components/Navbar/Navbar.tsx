import {useState, useEffect, useContext} from 'react';
import logo from '../../assets/logoBlack.png';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import NoUser from './NoUser';
import LoggedUser from './LoggedUser';
import UserButtons from './UserButtons';
import AdminButtons from './AdminButtons';
import BurgerMenu from './BurgerMenu';
import BurgerPopup from './BurgerPopup';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState<boolean>(false);
    const {currentUser} = useContext(AuthContext);
    const [isBurgerPopupOn, setIsBurgerPopupOn] = useState<boolean>(false);
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

    const togglePopup = () => {
        setIsBurgerPopupOn(!isBurgerPopupOn);
    }

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
                    <div className="navbar-rightside-burger">
                        <BurgerMenu isActive={isBurgerPopupOn} showPopup={togglePopup}/>
                        { isBurgerPopupOn &&
                            <BurgerPopup hideBurger={togglePopup}>
                                {!currentUser?.role
                                    ? <UserButtons />
                                    : <AdminButtons />
                                }
                            </BurgerPopup>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
