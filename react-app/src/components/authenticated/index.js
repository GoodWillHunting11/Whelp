import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, Link, useHistory } from 'react-router-dom';

// Import components
import HeroImage from './Hero';
import BusinessRoll from './BusinessRoll';

import './App.css'


const HomeApp = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const businesses = useSelector(state => state.businessState.entries)
    console.log('businesses', businesses)
    return (
            <>
                <HeroImage />
                <div className='business-roll'>
                    {businesses.map((biz, idx) => (
                        <BusinessRoll biz={biz} key={idx} />
                    ))}
                </div>
            </>
    )
}

export default HomeApp
