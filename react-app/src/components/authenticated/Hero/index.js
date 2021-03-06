import { Link, useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaw, faStethoscope, faCut, faDog, faBone, faBell } from '@fortawesome/free-solid-svg-icons'

import './Hero.css'
import logo from '../../../img/splash-logo.png'
import { useState } from 'react'


function HeroImage() {
    const [search, setSearch] = useState("")
    const history = useHistory()

    const handleForm = async (e) => {
        e.preventDefault()

        if(search.length > 0){
            history.push(`/search/${search}`)
        }
        else{
            history.push(`/`)
        }
    }
    return (
        <div className='hero-container'>
            <div className='hero-content'>
                <div className='hero-logo-container'>
                    <img alt='logo' className='logo-img' src={logo} />
                </div>
                <div className='hero-form-container'>
                    <form className='hero-search' >
                            <label  htmlFor="search" >
                                <input className='hero-search-input' autoComplete="off"
                                id="search"
                                placeholder='Find'
                                value={search}
                                required
                                onChange={e => setSearch(e.target.value)}
                                >

                                </input>
                            </label>

                            <button className='hero-submit' onClick={handleForm}><FontAwesomeIcon icon={faPaw} className='fa-paw' /></button>
                            <div className='hero-links-container'>
                                <Link to='/categories/3' className='hero-links'><FontAwesomeIcon icon={faCut} className='fa-nav' />Groomers</Link>
                                <Link to='/categories/1' className='hero-links'><FontAwesomeIcon icon={faDog} className='fa-nav' />Parks</Link>
                                <Link to='/categories/5' className='hero-links'><FontAwesomeIcon icon={faBell} className='fa-nav' />Walkers</Link>
                                <Link to='/categories/4' className='hero-links'><FontAwesomeIcon icon={faStethoscope} className='fa-nav' />Veterinarians</Link>
                                <Link to='/categories/2' className='hero-links'><FontAwesomeIcon icon={faBone} className='fa-nav' />Pet Stores</Link>
                            </div>
                        </form>

                </div>

            </div>
        </div>
    )
}

export default HeroImage
