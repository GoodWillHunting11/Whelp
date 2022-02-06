import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, Link, useHistory } from 'react-router-dom';

// Import components
import HeroImage from './Hero';

import './App.css'


const HomeApp = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const businesses = useSelector(state => state.businessState.entries)

    return (
            <HeroImage />
    )
}

export default HomeApp
