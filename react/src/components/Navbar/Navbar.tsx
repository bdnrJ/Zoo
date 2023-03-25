import axios from 'axios';
import {useState, useEffect, useContext} from 'react';
import logo from '../../assets/logo.gif';
import axiosClient from '../../axios-client';
import { AuthContext } from '../../context/AuthContext';
import {AiOutlineUser} from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import NoUser from './NoUser';
import LoggedUser from './LoggedUser';
import { User } from '../../types/types';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
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

    const TEST_request = async () => {
        const res = await axiosClient.get('http://localhost:8000/api/user', {withCredentials: true});
        console.log(res);
    }

    return (
        <div className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
            <div className="navbar-content">
                <div className="navbar-logo">
                    <img src={logo} alt="logo" />
                </div>
                <div className="navbar-rightside">
                    <div className="navbar-rightside-links">
                        <button>some</button>
                        <button>random</button>
                        <button>buttons</button>
                        <button onClick={TEST_request} >TEST</button>
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
