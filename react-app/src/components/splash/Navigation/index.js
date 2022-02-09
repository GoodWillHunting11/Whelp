import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import './SplashNavigation.css'

import logo from '../../../img/mobile-logo.png'

function SplashNavigation() {

    return (
        <>
        <div className='main-logged'>
            <div className='main'>
                <div className='quick'>
                    <Link to='/login' className='header-button'>Add a Business</Link>
                    <a href="https://github.com/GoodWillHunting11/Whelp" className='header-button' target='_blank' rel="noreferrer">GitHub Repo</a>
                    <div className="dropdown">
                        <button className="dropbtn">LinkedIn
                            <i className="fa fa-caret-down"></i>
                        </button>
                        <div className="dropdown-content">
                            <a href="#" rel="noreferrer">Seth Corbett</a>
                            <a href="https://www.linkedin.com/in/aaron-short-780446179/" target="_blank" rel="noreferrer">Aaron Short</a>
                            <a href="https://www.linkedin.com/in/andres-aguilar-6408aa227/" target="_blank" rel="noreferrer">Andres Aguilar</a>
                            <a href="https://www.linkedin.com/in/thien-dang-ct/" target="_blank" rel="noreferrer">Thien Dang</a>
                        </div>
                    </div>
                </div>

                <div className='splash-navigation'>
                    <Link className='login-button' to='/login'> Log in</Link>
                    <Link className='signup-button' to='/signup'> Sign up</Link>
                </div>
            </div>

            <div className='responsive-nav'>
            <div className='drop-button'>
                <img className='mobile-logo' alt='mobile-logo' src={logo} />
                <Link to='/login' className='res-nav-bar-links'>Add a Business</Link>
                <a href="https://github.com/GoodWillHunting11/Whelp" className='res-nav-bar-links' target='_blank' rel="noreferrer">GitHub Repo</a>
                <Link className='res-nav-bar-links' to='/login'> Log in</Link>
                <Link className='res-nav-bar-links' to='/signup'> Sign up</Link>
            </div>
            </div>
            </div>
        </>
    )
}

export default SplashNavigation
