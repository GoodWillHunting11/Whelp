import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, Link, useHistory } from 'react-router-dom';

// Import components
import AppNavigation from './Navigation';
import Footer from '../splash/Footer';

import './App.css'


const HomeApp = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const businesses = useSelector(state => state.businessState.entries)

    return (
        <div className='app-container'>
            <AppNavigation />
            <Footer />
        </div>
    )
}

export default HomeApp
