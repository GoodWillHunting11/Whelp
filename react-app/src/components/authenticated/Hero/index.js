import { Link, useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaw, faStethoscope, faCut, faDog, faBone, faBell } from '@fortawesome/free-solid-svg-icons'

import './Hero.css'
import logo from '../../../img/splash-logo.png'

function HeroImage() {

    const handleForm = (e) => {
        e.preventDefault()
        console.log('Do your thing')
    }

    return (
        <div className='hero-container'>
            <div className='hero-content'>
                <div className='hero-logo-container'>
                    <img className='logo-img' src={logo} />
                </div>
                <div className='hero-form-container'>
                    <form className='hero-search' >
                            <label  htmlFor="search" >
                                <input className='hero-search' id="search" placeholder='Find'>

                                </input>
                            </label>
                            <label  htmlFor="location" >
                                <input className='location-search' id="location" placeholder='Near'></input>
                            </label>
                            <button className='hero-submit' onClick={handleForm}><FontAwesomeIcon icon={faPaw} className='fa-paw' /></button>
                            <div className='hero-links-container'>
                                <Link to='/login' className='hero-links'><FontAwesomeIcon icon={faCut} className='fa-nav' />Groomers</Link>
                                <Link to='/login' className='hero-links'><FontAwesomeIcon icon={faDog} className='fa-nav' />Parks</Link>
                                <Link to='/login' className='hero-links'><FontAwesomeIcon icon={faBell} className='fa-nav' />Walkers</Link>
                                <Link to='/login' className='hero-links'><FontAwesomeIcon icon={faStethoscope} className='fa-nav' />Veterinarians</Link>
                                <Link to='/login' className='hero-links'><FontAwesomeIcon icon={faBone} className='fa-nav' />Pet Stores</Link>
                            </div>
                        </form>

                </div>

            </div>
        </div>
    )
}

export default HeroImage
