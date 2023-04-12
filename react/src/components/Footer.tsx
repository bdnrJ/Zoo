import React from 'react'
import {FaFacebookF, FaTwitter, FaYoutube, FaInstagram} from 'react-icons/fa'
import logo from '../assets/logo.gif'

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-buttons">
                <button>some</button>
                <button>radnom</button>
                <button>buttons</button>
                <button>idk</button>
            </div>
            <div className="footer-socials">
                <button><FaFacebookF /></button>
                <button><FaTwitter /></button>
                <button><FaYoutube /></button>
                <button><FaInstagram /></button>
            </div>
            <div className="footer-general">
                <img src={logo} alt="logo" />
                <div className="footer-general-info">
                    <span>987 Memorial Urz</span>
                    <span>Resovia, RZE 77901 </span>
                    <span>ZooProject@email.com</span>
                    <span>Hours: 10AM - 4PM </span>
                    <span>Phone: +123 123 123 321</span>
                </div>
            </div>
            <div className="footer-copyright">
                <span>©2023 Zoo Project</span>
                <span>All photos ©Pixabay</span>
            </div>
        </div>
    )
}

export default Footer
