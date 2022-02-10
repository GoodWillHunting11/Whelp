import React from 'react';
import { useSelector } from 'react-redux'

// Import components
import HeroImage from './Hero';
import BusinessRoll from './BusinessRoll';

import './App.css'


const HomeApp = () => {

    const businesses = useSelector(state => state.businessState.entries)
    let longRoll = []
    if (businesses[7]) {
        for (let i = 0; i < 8; i++) {
            longRoll.push(businesses[i])
        }
    }

    if (longRoll[1]) {
        return (
            <>
                <HeroImage />
                <h1 className='roll-heading'>Your Next Review Awaits</h1>
                <div className='business-roll'>
                    {longRoll.map((biz, idx) => (
                        <BusinessRoll biz={biz} key={idx} />
                    ))}
                </div>
            </>
    )
    }


    return (
            <>
                <HeroImage />
                <h1 className='roll-heading'>Your Next Review Awaits</h1>
                <div className='business-roll'>
                    {businesses.map((biz, idx) => (
                        <BusinessRoll biz={biz} key={idx} />
                    ))}
                </div>
            </>
    )
}

export default HomeApp
