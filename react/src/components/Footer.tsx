import React from 'react'
import {FaPhoneAlt, FaTwitter, FaYoutube, FaInstagram, FaFacebookF} from 'react-icons/fa'
import {HiMail, HiPhone, HiLocationMarker} from 'react-icons/hi'
import logo from '../assets/logoWhite.png'

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-contact">
                <h3>CONTACT</h3>

                <div className="footer-contact-element">
                    <div className="element-icon">
                        <HiPhone />
                    </div>
                    <div className="element-text">
                        +48 123 123 123
                    </div>
                </div>

                <div className="footer-contact-element">
                    <div className="element-icon">
                        <HiMail />
                    </div>
                    <div className="element-text">
                        projectzoo@email.com
                    </div>
                </div>

                <div className="footer-contact-element">
                    <div className="element-icon">
                        <HiLocationMarker />
                    </div>
                    <div className="element-text">
                        UR
                    </div>
                </div>
            </div>
            <div className="footer-logo">
                <img src={logo} alt="white logo" />
            </div>
            <div className="footer-socials">
                <h3>SOCIAL MEDIA</h3>
                    <div className="footer-socials-icons">
                        <div className="socials-icons-icon">
                            <FaInstagram />
                        </div>
                        <div className="socials-icons-icon">
                            <FaFacebookF />
                        </div>
                        <div className="socials-icons-icon">
                            <FaTwitter />
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default Footer
