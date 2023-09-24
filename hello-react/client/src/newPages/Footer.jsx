import { useState } from 'react'
import './Footer.css'
import facebookIcon from './assets/Icons/Facebook.png'
import pinterestIcon from './assets/Icons/Pinterest.png'
import instagramIcon from './assets/Icons/Instagram.png'



function Footer() {

    return (
        <footer>
            <div className='footerCard contact'>
                <p className="contactName">
                    Lifetimes Travel Incorporated
                </p>
                <p className="contactAddress">
                    123 Travel Avenue,<br></br> Lifeville, IL, 98765
                </p>
                <p className="contactNumber">
                    (555) 555 - 5555
                </p>
            </div>
            <div className='footerCard notification'>
                <h1>
                    Event Notification Sign Up
                </h1>
                <div className="eventNotificationSignUp">
                    <label htmlFor="signUpSearch"></label>
                    <input type="text" id="signUpSearch" placeholder="Email Address"></input>
                    <button id="signUpButton">Sign Up</button>
                </div>
            </div>
            <div className='footerCard socials'>
                <a href="/ourstory">
                    <h3 className="whiteText thinText">About</h3>
                </a>
                <a href="/login">
                    <h3 className="whiteText thinText">Get Involved</h3>
                </a>
                <div className="socialsLogos">
                    <img className="socialsLogo" src={facebookIcon}></img>
                    <img className="socialsLogo" src={instagramIcon}></img>
                    <img className="socialsLogo" src={pinterestIcon}></img>
                </div>
            </div>
        </footer>

    )
}


export default Footer
