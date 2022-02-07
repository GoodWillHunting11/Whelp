import React from 'react'
import { Link } from 'react-router-dom'
import LogoutButton from '../../auth/LogoutButton'

// Import states
import { getAllBusinesses } from '../../../store/business'
import './Navigation.css'



function AppNavigation() {

    return (
        <div className='main-logged'>
            <div className='main-nav'>
                <div className='quick'>
                    <Link to='/' className='header-button'>Home</Link>
                    <Link to='/businesses/new' className='header-button'>Add a Business</Link>
                    <a href="https://github.com/GoodWillHunting11/Whelp" className='header-button' target='_blank'>GitHub Repo</a>
                    <div className="dropdown">
                        <button className="dropbtn">LinkedIn
                        <i className="fa fa-caret-down"></i>
                        </button>
                        <div className="dropdown-content">
                        <a href="#">Seth Corbett</a>
                        <a href="https://www.linkedin.com/in/aaron-short-780446179/" target="_blank">Aaron Short</a>
                        <a href="https://www.linkedin.com/in/andres-aguilar-6408aa227/" target="_blank">Andres Aguilar</a>
                        <a href="https://www.linkedin.com/in/thien-dang-ct/" target="_blank">Thien Dang</a>
                        </div>
                    </div>
                </div>

                <div className='splash-navigation'>
                    <LogoutButton />
                </div>
            </div>
        </div>
    )
}

export default AppNavigation
