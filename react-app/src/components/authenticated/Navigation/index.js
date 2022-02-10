import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faCaretSquareDown } from '@fortawesome/free-solid-svg-icons'
import { logout } from '../../../store/session';

import LogoutButton from '../../auth/LogoutButton'

import logo from '../../../img/mobile-logo.png'
import './Navigation.css'



function AppNavigation() {
    const dispatch = useDispatch()
    const history = useHistory()
    const [show, setShow] = useState(false)

    const handleMenu = (e) => {
        e.preventDefault()
        setShow(!show)
    }

    const handleHideLink = e => {
        setShow(!show)
    }

    const onLogout = async (e) => {
        await dispatch(logout());
        history.push('/')
      };

    return (
        <>
            <div className='main-logged-nav'>
                <div className='main-nav'>
                    <div className='quick'>
                        <Link to='/' className='header-button'>Home</Link>
                        <Link to='/businesses/new' className='header-button'>Add a Business</Link>
                        <a href="https://github.com/GoodWillHunting11/Whelp" className='header-button' target='_blank' rel="noreferrer">GitHub Repo</a>
                        <div className="dropdown">
                            <button className="dropbtn">LinkedIn
                            <i className="fa fa-caret-down"></i>
                            </button>
                            <div className="dropdown-content">
                            <a href="https://github.com/scorbz9" target="_blank" rel="noreferrer">Seth Corbett</a>
                            <a href="https://www.linkedin.com/in/aaron-short-780446179/" target="_blank" rel="noreferrer">Aaron Short</a>
                            <a href="https://www.linkedin.com/in/andres-aguilar-6408aa227/" target="_blank" rel="noreferrer">Andres Aguilar</a>
                            <a href="https://www.linkedin.com/in/thien-dang-ct/" target="_blank" rel="noreferrer">Thien Dang</a>
                            </div>
                        </div>
                    </div>

                    <div className='splash-navigation'>
                        <LogoutButton />
                    </div>
                </div>

                <div className='responsive-nav'>
                    <div className='drop-button' >
                        <img className='mobile-logo' alt='mobile-logo' src={logo} />
                        {show === false ? <button className='res-nav-bar-links res-margin' onClick={handleMenu}>Menu <FontAwesomeIcon icon={faBars} className='fa-nav-res' /></button>:<button className='res-nav-bar-links res-margin' onClick={handleMenu}>Menu <FontAwesomeIcon icon={faCaretSquareDown} className='fa-nav-res' /></button>}
                        {show === true ? <Link to='/' className='res-nav-bar-links' onClick={handleHideLink}>Home</Link>: <></>}
                        {show === true ? <Link to='/businesses/new' className='res-nav-bar-links' onClick={handleHideLink}>Add a Business</Link>: <></>}
                        {show === true ? <a href="https://github.com/GoodWillHunting11/Whelp" className='res-nav-bar-links' target='_blank' rel="noreferrer">GitHub Repo</a>: <></>}
                        {show === true ? <div className='res-nav-bar-links' onClick={onLogout}>Logout</div>: <></>}
                    </div>
                </div>
            </div>



        </>
    )
}

export default AppNavigation
