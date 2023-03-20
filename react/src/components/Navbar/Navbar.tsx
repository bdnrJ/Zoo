import {useState, useEffect} from 'react';
import logo from '../../assets/logo.gif';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);

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
                <div className="navbar-logo">
                    <img src={logo} alt="logo" />
                </div>
                <div className="navbar-rightside">
                    <div className="navbar-rightside-links">
                        <button>some</button>
                        <button>random</button>
                        <button>buttons</button>
                    </div>
                    <div className="navbar-rightside-user">
                        <button>user</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
