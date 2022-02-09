import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faCaretSquareDown } from '@fortawesome/free-solid-svg-icons'
import './SplashNavigation.css'

import logo from '../../../img/mobile-logo.png'

function SplashNavigation() {
    const [show, setShow] = useState(false)

    const handleMenu = (e) => {
        e.preventDefault()
        setShow(!show)
    }

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
            <div className='drop-button' >
                <img className='mobile-logo' alt='mobile-logo' src={logo} />
                {show === false ? <a className='res-nav-bar-links' onClick={handleMenu}>Menu <FontAwesomeIcon icon={faBars} className='fa-nav-res' /></a>:<a className='res-nav-bar-links' onClick={handleMenu}>Menu <FontAwesomeIcon icon={faCaretSquareDown} className='fa-nav-res' /></a>}
                {show === true ? <Link to='/login' className='res-nav-bar-links'>Add a Business</Link>: <></>}
                {show === true ? <a href="https://github.com/GoodWillHunting11/Whelp" className='res-nav-bar-links' target='_blank' rel="noreferrer">GitHub Repo</a>: <></>}
                {show === true ? <Link className='res-nav-bar-links' to='/login'> Log in</Link>: <></>}
                {show === true ? <Link className='res-nav-bar-links' to='/signup'> Sign up</Link>: <></>}
            </div>
            </div>
            </div>
        </>
    )
}

export default SplashNavigation
