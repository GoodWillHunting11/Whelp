import React from 'react'
import { Link } from 'react-router-dom'
import './SplashNavigation.css'



function SplashNavigation() {

    return (
        <div className='main'>
            <div className='quick'>
                <Link to='/login' className='header-button'>Write a Review</Link>
                <a href="https://github.com/GoodWillHunting11/Whelp" className='header-button' target='_blank'>GitHub Repo</a>
                <div class="dropdown">
                    <button class="dropbtn">LinkedIn
                    <i class="fa fa-caret-down"></i>
                    </button>
                    <div class="dropdown-content">
                    <a href="#">Seth Corbett</a>
                    <a href="https://www.linkedin.com/in/aaron-short-780446179/" target="_blank">Aaron Short</a>
                    <a href="https://www.linkedin.com/in/andres-aguilar-6408aa227/" target="_blank">Andres Aguilar</a>
                    <a href="https://www.linkedin.com/in/thien-dang-ct/" target="_blank">Thien Dang</a>
                    </div>
                </div>
            </div>

            <div className='splash-navigation'>
                <Link className='login-button' to='/login'> Log in</Link>
                <Link className='signup-button' to='/signup'> Sign up</Link>
            </div>
        </div>
    )
}

export default SplashNavigation
